import { NextResponse } from 'next/server'
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { s3Client, S3_CONFIG } from '@/lib/aws-config'

// Fallback album data when S3 is not accessible
const getFallbackAlbums = () => {
  return [
    {
      id: 'admi-graduation-2024',
      slug: 'admi-graduation-2024',
      title: 'ADMI Graduation 2024',
      description: 'Celebrating our 2024 graduates and their creative achievements',
      date: '2024-12-15',
      category: 'Graduation',
      photographer: 'ADMI Team',
      event: 'ADMI Graduation 2024',
      thumbnail: 'https://via.placeholder.com/400x300/4C6EF5/ffffff?text=ADMI+Graduation+2024',
      imageCount: 45,
      isAlbum: true
    },
    {
      id: 'creative-showcase-2024',
      slug: 'creative-showcase-2024',
      title: 'Creative Showcase 2024',
      description: 'Student work exhibitions and creative presentations',
      date: '2024-11-20',
      category: 'Showcase',
      photographer: 'ADMI Team',
      event: 'Creative Showcase 2024',
      thumbnail: 'https://via.placeholder.com/400x300/10B981/ffffff?text=Creative+Showcase',
      imageCount: 38,
      isAlbum: true
    },
    {
      id: 'facility-tour-2024',
      slug: 'facility-tour-2024',
      title: 'ADMI Facilities Tour',
      description: 'Behind the scenes look at ADMI studios and workshops',
      date: '2024-10-10',
      category: 'Campus',
      photographer: 'ADMI Team',
      event: 'ADMI Facilities Tour',
      thumbnail: 'https://via.placeholder.com/400x300/F59E0B/ffffff?text=Facilities+Tour',
      imageCount: 52,
      isAlbum: true
    }
  ]
}

export async function GET() {
  try {
    console.log('🔧 S3 Albums API - Bucket:', S3_CONFIG.BUCKET_NAME, 'Region:', S3_CONFIG.REGION)

    // Try to access S3, fall back if it fails
    try {
      // List all objects in the media-archive/images prefix
      const listCommand = new ListObjectsV2Command({
        Bucket: S3_CONFIG.BUCKET_NAME,
        Prefix: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/`,
        Delimiter: '/'
      })

      const response = await s3Client.send(listCommand)

      // Extract album folders from common prefixes
      const albumFolders =
        response.CommonPrefixes?.map((prefix) => {
          const folderName =
            prefix.Prefix?.replace(`${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/`, '').replace('/', '') || ''
          return folderName
        }).filter((name) => name) || []

      // Get album metadata for each folder
      const albums = await Promise.all(
        albumFolders.map(async (folderName) => {
          try {
            // Try to get metadata.json for the album
            const metadataKey = `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/${folderName}/metadata.json`
            const metadataCommand = new GetObjectCommand({
              Bucket: S3_CONFIG.BUCKET_NAME,
              Key: metadataKey
            })

            let metadata = {
              title: folderName.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
              description: `Photos from ${folderName.replace(/-/g, ' ')}`,
              date: new Date().toISOString().split('T')[0],
              category: 'Event',
              photographer: 'ADMI Team'
            }

            try {
              const metadataResponse = await s3Client.send(metadataCommand)
              const metadataContent = await metadataResponse.Body?.transformToString()
              if (metadataContent) {
                const parsedMetadata = JSON.parse(metadataContent)
                metadata = { ...metadata, ...parsedMetadata }
              }
            } catch (error) {
              // Metadata file doesn't exist, use defaults
              console.log(`No metadata found for ${folderName}, using defaults`)
            }

            // Count images in the folder
            const imagesCommand = new ListObjectsV2Command({
              Bucket: S3_CONFIG.BUCKET_NAME,
              Prefix: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/${folderName}/`
            })

            const imagesResponse = await s3Client.send(imagesCommand)
            const imageCount =
              imagesResponse.Contents?.filter(
                (obj) =>
                  obj.Key &&
                  (obj.Key.endsWith('.jpg') ||
                    obj.Key.endsWith('.jpeg') ||
                    obj.Key.endsWith('.png') ||
                    obj.Key.endsWith('.webp'))
              ).length || 0

            // Get thumbnail image (first image in folder or thumbnail.jpg)
            const thumbnailKey = `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/${folderName}/thumbnail.jpg`
            const firstImageKey = imagesResponse.Contents?.find(
              (obj) =>
                obj.Key &&
                obj.Key !== thumbnailKey &&
                (obj.Key.endsWith('.jpg') ||
                  obj.Key.endsWith('.jpeg') ||
                  obj.Key.endsWith('.png') ||
                  obj.Key.endsWith('.webp'))
            )?.Key

            const thumbnailUrl = firstImageKey
              ? `https://${S3_CONFIG.BUCKET_NAME}.s3.${S3_CONFIG.REGION}.amazonaws.com/${firstImageKey}`
              : `https://via.placeholder.com/400x300/4C6EF5/ffffff?text=${encodeURIComponent(metadata.title)}`

            return {
              id: folderName,
              slug: folderName,
              title: metadata.title,
              description: metadata.description,
              date: metadata.date,
              category: metadata.category,
              photographer: metadata.photographer,
              event: metadata.title,
              thumbnail: thumbnailUrl,
              imageCount,
              isAlbum: true
            }
          } catch (error) {
            console.error(`Error processing album ${folderName}:`, error)
            return null
          }
        })
      )

      // Filter out any null albums and sort by date
      const validAlbums = albums
        .filter((album): album is NonNullable<typeof album> => album !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      return NextResponse.json({
        success: true,
        albums: validAlbums,
        count: validAlbums.length,
        source: 's3'
      })
    } catch (s3Error) {
      console.error('S3 access failed, using fallback albums:', s3Error)
      const fallbackAlbums = getFallbackAlbums()
      return NextResponse.json({
        success: true,
        albums: fallbackAlbums,
        count: fallbackAlbums.length,
        source: 'fallback'
      })
    }
  } catch (error) {
    console.error('Error fetching albums from S3:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch albums',
        albums: [],
        count: 0
      },
      { status: 500 }
    )
  }
}
