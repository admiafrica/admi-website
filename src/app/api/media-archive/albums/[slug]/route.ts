import { NextResponse } from 'next/server'
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { s3Client, S3_CONFIG } from '@/lib/aws-config'

type RouteParams = {
  params: Promise<{ slug: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params

    // Get album metadata
    const metadataKey = `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/${slug}/metadata.json`
    let albumMetadata = {
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      description: `Photos from ${slug.replace(/-/g, ' ')}`,
      date: new Date().toISOString().split('T')[0],
      category: 'Event',
      photographer: 'ADMI Team'
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
        albumMetadata = { ...albumMetadata, ...parsedMetadata }
      }
    } catch (error) {
      console.log(`No metadata found for ${slug}, using defaults`)
    }

    // List all images in the album folder
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Prefix: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/${slug}/`
    })

    const response = await s3Client.send(listCommand)

    // Filter and process images
    const images =
      response.Contents?.filter(
        (obj) =>
          obj.Key &&
          !obj.Key.endsWith('/') && // Exclude folder markers
          !obj.Key.includes('metadata.json') && // Exclude metadata files
          (obj.Key.endsWith('.jpg') ||
            obj.Key.endsWith('.jpeg') ||
            obj.Key.endsWith('.png') ||
            obj.Key.endsWith('.webp'))
      ).map(async (obj, index) => {
        const fileName = obj.Key?.split('/').pop() || `image-${index + 1}`
        const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
        const title = nameWithoutExt.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

        // Generate direct S3 URL for the image
        const imageUrl = `https://${S3_CONFIG.BUCKET_NAME}.s3.${S3_CONFIG.REGION}.amazonaws.com/${obj.Key}`

        return {
          id: `${slug}-${index + 1}`,
          title,
          filename: fileName,
          thumbnail: imageUrl,
          fullSize: imageUrl,
          downloadUrl: imageUrl,
          size: obj.Size || 0,
          lastModified: obj.LastModified?.toISOString() || albumMetadata.date
        }
      }) || []

    // Wait for all images to be processed
    const processedImages = await Promise.all(images)

    // Sort images by filename or last modified date
    processedImages.sort((a, b) => a.filename.localeCompare(b.filename))

    const album = {
      slug,
      title: albumMetadata.title,
      description: albumMetadata.description,
      date: albumMetadata.date,
      category: albumMetadata.category,
      photographer: albumMetadata.photographer,
      images: processedImages,
      imageCount: processedImages.length
    }

    return NextResponse.json({
      success: true,
      album
    })
  } catch (error) {
    console.error(`Error fetching album ${await (await params).slug}:`, error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch album',
        album: null
      },
      { status: 500 }
    )
  }
}
