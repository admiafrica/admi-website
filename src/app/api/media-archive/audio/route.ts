import { NextResponse } from 'next/server'
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { s3Client, S3_CONFIG } from '@/lib/aws-config'

export async function GET() {
  try {
    // List all audio files in the audio prefix
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Prefix: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}audio/`
    })

    const response = await s3Client.send(listCommand)

    // Filter and process audio files
    const audioFiles =
      response.Contents?.filter(
        (obj) =>
          obj.Key &&
          !obj.Key.endsWith('/') && // Exclude folder markers
          !obj.Key.includes('metadata/') && // Exclude metadata folder
          (obj.Key.endsWith('.mp3') ||
            obj.Key.endsWith('.wav') ||
            obj.Key.endsWith('.m4a') ||
            obj.Key.endsWith('.aac') ||
            obj.Key.endsWith('.ogg'))
      ).map(async (obj, index) => {
        const fileName = obj.Key?.split('/').pop() || `audio-${index + 1}`
        const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
        const title = nameWithoutExt.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

        // Try to get metadata for this audio file
        const metadataKey = `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}audio/metadata/${nameWithoutExt}.json`
        let metadata = {
          title,
          description: `Audio recording: ${title}`,
          category: 'Audio',
          speaker: 'ADMI Team',
          student: null,
          course: null,
          genre: null,
          duration: 'Unknown',
          type: 'Recording'
        }

        try {
          const metadataCommand = new GetObjectCommand({
            Bucket: S3_CONFIG.BUCKET_NAME,
            Key: metadataKey
          })
          const metadataResponse = await s3Client.send(metadataCommand)
          const metadataContent = await metadataResponse.Body?.transformToString()
          if (metadataContent) {
            const parsedMetadata = JSON.parse(metadataContent)
            metadata = { ...metadata, ...parsedMetadata }
          }
        } catch (error) {
          // Metadata file doesn't exist, use defaults
          console.log(`No metadata found for ${fileName}, using defaults`)
        }

        // Generate direct S3 URL for audio streaming
        const audioUrl = `https://${S3_CONFIG.BUCKET_NAME}.s3.${S3_CONFIG.REGION}.amazonaws.com/${obj.Key}`
        const fileExtension = obj.Key?.split('.').pop()?.toLowerCase()

        // Determine audio type/category based on filename or metadata
        let audioType = metadata.type
        if (fileName.toLowerCase().includes('podcast')) audioType = 'Podcast'
        else if (fileName.toLowerCase().includes('interview')) audioType = 'Interview'
        else if (fileName.toLowerCase().includes('lecture') || fileName.toLowerCase().includes('talk'))
          audioType = 'Tech Talk'
        else if (fileName.toLowerCase().includes('radio')) audioType = 'Radio Show'
        else if (fileName.toLowerCase().includes('masterclass')) audioType = 'Masterclass'
        else if (fileName.toLowerCase().includes('music') || fileName.toLowerCase().includes('song'))
          audioType = 'Music'
        else if (fileName.toLowerCase().includes('soundtrack') || fileName.toLowerCase().includes('score'))
          audioType = 'Soundtrack'
        else if (fileName.toLowerCase().includes('student') || fileName.toLowerCase().includes('portfolio'))
          audioType = 'Student Work'
        else if (fileName.toLowerCase().includes('composition') || fileName.toLowerCase().includes('original'))
          audioType = 'Composition'
        else if (fileName.toLowerCase().includes('beat') || fileName.toLowerCase().includes('instrumental'))
          audioType = 'Music'

        return {
          id: `audio-${index + 1}`,
          title: metadata.title,
          description: metadata.description,
          filename: fileName,
          audioUrl,
          duration: metadata.duration || 'Unknown',
          date: obj.LastModified?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
          category: audioType,
          speaker: metadata.student || metadata.speaker || 'ADMI Team',
          student: metadata.student || null,
          course: metadata.course || null,
          genre: metadata.genre || null,
          plays: Math.floor(Math.random() * 1000), // In real app, this would be tracked
          size: obj.Size || 0,
          format: fileExtension?.toUpperCase() || 'UNKNOWN',
          lastModified: obj.LastModified?.toISOString() || new Date().toISOString()
        }
      }) || []

    // Wait for all metadata to be fetched
    const processedAudio = await Promise.all(audioFiles)

    // Sort by date (newest first)
    processedAudio.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({
      success: true,
      audio: processedAudio,
      count: processedAudio.length
    })
  } catch (error) {
    console.error('Error fetching audio from S3:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch audio content',
        audio: [],
        count: 0
      },
      { status: 500 }
    )
  }
}
