import { NextResponse } from 'next/server'
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { s3Client, S3_CONFIG } from '@/lib/aws-config'

export async function GET() {
  try {
    console.log('🔧 S3 Albums API Debug:', {
      bucketName: S3_CONFIG.BUCKET_NAME,
      region: S3_CONFIG.REGION,
      prefix: S3_CONFIG.MEDIA_ARCHIVE_PREFIX,
      s3BucketEnv: process.env.S3_BUCKET_NAME,
      s3ArchiveEnv: process.env.S3_ARCHIVE_BUCKET,
      s3RegionEnv: process.env.S3_REGION,
      awsRegionEnv: process.env.AWS_REGION
    })

    // Try to access S3, fall back if it fails
    try {
      // List all objects in the media-archive/images prefix
      const listCommand = new ListObjectsV2Command({
        Bucket: S3_CONFIG.BUCKET_NAME,
        Prefix: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/`,
        Delimiter: '/'
      })

      console.log('📡 Sending S3 ListObjects command...')
      const response = await s3Client.send(listCommand)
      console.log('✅ S3 ListObjects response received:', response.CommonPrefixes?.length || 0, 'folders found')

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
              description: '',
              date: new Date().toISOString().split('T')[0],
              category: '',
              photographer: ''
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

            // Only return albums that have actual images - no placeholder thumbnails
            if (!firstImageKey) {
              console.log(`No images found for album ${folderName}, skipping`)
              return null
            }

            const thumbnailUrl = `https://d17qqznw1g499t.cloudfront.net/${firstImageKey}`

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
      console.error('❌ S3 access failed:', {
        error: s3Error,
        message: s3Error instanceof Error ? s3Error.message : 'Unknown error',
        name: s3Error instanceof Error ? s3Error.name : 'Unknown',
        code: (s3Error as any)?.Code || 'Unknown',
        statusCode: (s3Error as any)?.$metadata?.httpStatusCode || 'Unknown'
      })

      // Return user-friendly error message
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to load albums. Please try again later.',
          albums: [],
          count: 0
        },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error('Error fetching albums from S3:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to load albums. Please try again later.',
        albums: [],
        count: 0
      },
      { status: 503 }
    )
  }
}
