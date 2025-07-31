import { NextResponse } from 'next/server'
import { PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { s3Client, S3_CONFIG } from '@/lib/aws-config'

export async function POST() {
  try {
    console.log('Setting up S3 media archive folder structure...')

    // Create the main folder structure
    const foldersToCreate = [
      'media-archive/',
      'media-archive/images/',
      'media-archive/audio/',
      'media-archive/audio/metadata/'
    ]

    const results = []

    for (const folder of foldersToCreate) {
      try {
        const command = new PutObjectCommand({
          Bucket: S3_CONFIG.BUCKET_NAME,
          Key: folder,
          Body: '',
          ContentType: 'application/x-directory'
        })

        await s3Client.send(command)
        results.push({ folder, status: 'created', success: true })
        console.log(`Created folder: ${folder}`)
      } catch (error) {
        console.error(`Error creating folder ${folder}:`, error)
        results.push({
          folder,
          status: 'error',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    // Create sample metadata files to demonstrate structure
    const sampleMetadata = [
      {
        key: 'media-archive/audio/metadata/sample-podcast.json',
        content: {
          title: 'Sample ADMI Podcast Episode',
          description: 'This is a sample metadata file showing the expected structure for audio content.',
          speaker: 'ADMI Team',
          category: 'Podcast',
          duration: '25:30',
          type: 'Podcast'
        }
      },
      {
        key: 'media-archive/images/sample-album/metadata.json',
        content: {
          title: 'Sample Photo Album',
          description: 'This is a sample metadata file showing the expected structure for image albums.',
          date: new Date().toISOString().split('T')[0],
          category: 'Event',
          photographer: 'ADMI Team'
        }
      }
    ]

    // Create sample metadata files
    for (const metadata of sampleMetadata) {
      try {
        const command = new PutObjectCommand({
          Bucket: S3_CONFIG.BUCKET_NAME,
          Key: metadata.key,
          Body: JSON.stringify(metadata.content, null, 2),
          ContentType: 'application/json'
        })

        await s3Client.send(command)
        results.push({
          folder: metadata.key,
          status: 'metadata created',
          success: true
        })
        console.log(`Created metadata: ${metadata.key}`)
      } catch (error) {
        console.error(`Error creating metadata ${metadata.key}:`, error)
        results.push({
          folder: metadata.key,
          status: 'metadata error',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    // Verify the folder structure was created
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Prefix: S3_CONFIG.MEDIA_ARCHIVE_PREFIX,
      Delimiter: '/'
    })

    const listResult = await s3Client.send(listCommand)
    const folders = listResult.CommonPrefixes?.map((prefix) => prefix.Prefix) || []
    const files = listResult.Contents?.map((obj) => obj.Key) || []

    return NextResponse.json({
      success: true,
      message: 'S3 media archive folder structure setup completed',
      bucketName: S3_CONFIG.BUCKET_NAME,
      region: S3_CONFIG.REGION,
      prefix: S3_CONFIG.MEDIA_ARCHIVE_PREFIX,
      results,
      verification: {
        folders,
        files,
        totalFolders: folders.length,
        totalFiles: files.length
      }
    })
  } catch (error) {
    console.error('Error setting up S3 folder structure:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to setup S3 folder structure'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check current folder structure
export async function GET() {
  try {
    console.log('Checking S3 media archive folder structure...')

    const listCommand = new ListObjectsV2Command({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Prefix: S3_CONFIG.MEDIA_ARCHIVE_PREFIX
    })

    const result = await s3Client.send(listCommand)
    const allItems = result.Contents || []

    // Organize items by type
    const structure = {
      folders: [] as string[],
      imageAlbums: [] as string[],
      audioFiles: [] as string[],
      metadataFiles: [] as string[],
      otherFiles: [] as string[]
    }

    allItems.forEach((item) => {
      if (!item.Key) return

      if (item.Key.endsWith('/')) {
        structure.folders.push(item.Key)
      } else if (item.Key.includes('/images/') && !item.Key.includes('metadata')) {
        structure.imageAlbums.push(item.Key)
      } else if (item.Key.includes('/audio/') && !item.Key.includes('metadata')) {
        structure.audioFiles.push(item.Key)
      } else if (item.Key.includes('metadata')) {
        structure.metadataFiles.push(item.Key)
      } else {
        structure.otherFiles.push(item.Key)
      }
    })

    return NextResponse.json({
      success: true,
      bucketName: S3_CONFIG.BUCKET_NAME,
      region: S3_CONFIG.REGION,
      prefix: S3_CONFIG.MEDIA_ARCHIVE_PREFIX,
      structure,
      totalItems: allItems.length,
      message: 'S3 folder structure retrieved successfully'
    })
  } catch (error) {
    console.error('Error checking S3 folder structure:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to check S3 folder structure'
      },
      { status: 500 }
    )
  }
}
