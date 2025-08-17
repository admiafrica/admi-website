const AWS = require('aws-sdk')
const https = require('https')
const crypto = require('crypto')

const s3 = new AWS.S3()
const cloudfront = new AWS.CloudFront()

/**
 * Sync hero images from Contentful to S3/CloudFront
 */
exports.sync = async (event, context) => {
  console.log('🖼️ Starting hero image sync process')
  console.log('Event:', JSON.stringify(event, null, 2))

  try {
    const {
      ADMI_CONTENTFUL_SPACE_ID,
      ADMI_CONTENTFUL_ACCESS_TOKEN,
      ADMI_CONTENTFUL_ENVIRONMENT,
      HERO_IMAGES_BUCKET,
      CLOUDFRONT_DISTRIBUTION_ID
    } = process.env

    if (!ADMI_CONTENTFUL_SPACE_ID || !ADMI_CONTENTFUL_ACCESS_TOKEN) {
      throw new Error('Missing required Contentful environment variables')
    }

    if (!HERO_IMAGES_BUCKET || !CLOUDFRONT_DISTRIBUTION_ID) {
      throw new Error('Missing required S3/CloudFront environment variables')
    }

    // Fetch homepage data from Contentful
    console.log('📡 Fetching homepage data from Contentful...')
    const contentfulUrl = `https://cdn.contentful.com/spaces/${ADMI_CONTENTFUL_SPACE_ID}/environments/${ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=homepage&include=10`

    const homepageData = await fetchFromUrl(contentfulUrl)

    if (!homepageData.items || homepageData.items.length === 0) {
      console.log('⚠️ No homepage data found')
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No homepage data found' })
      }
    }

    const homepage = homepageData.items[0]
    const assets = homepageData.includes?.Asset || []

    // Find hero image
    const coverImageId = homepage.fields?.coverImage?.sys?.id
    if (!coverImageId) {
      console.log('⚠️ No cover image found in homepage data')
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No cover image found' })
      }
    }

    const heroImageAsset = assets.find((asset) => asset.sys.id === coverImageId)
    if (!heroImageAsset?.fields?.file?.url) {
      console.log('⚠️ Hero image asset not found or missing file URL')
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hero image asset not found' })
      }
    }

    // Download and upload hero image
    const imageUrl = `https:${heroImageAsset.fields.file.url}`
    const fileName = heroImageAsset.fields.file.fileName || 'hero-image.jpg'
    const contentType = heroImageAsset.fields.file.contentType || 'image/jpeg'

    console.log(`🖼️ Processing hero image: ${fileName}`)
    console.log(`📥 Downloading from: ${imageUrl}`)

    // Download image from Contentful
    const imageBuffer = await downloadImage(imageUrl)

    // Generate optimized file names
    const fileExtension = fileName.split('.').pop()
    const baseFileName = 'hero-image'
    const s3Key = `${baseFileName}.${fileExtension}`

    // Upload to S3
    console.log(`☁️ Uploading to S3: ${s3Key}`)
    await s3
      .putObject({
        Bucket: HERO_IMAGES_BUCKET,
        Key: s3Key,
        Body: imageBuffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000', // 1 year cache
        Metadata: {
          'original-url': imageUrl,
          'contentful-id': coverImageId,
          'sync-timestamp': new Date().toISOString()
        }
      })
      .promise()

    // Create CloudFront invalidation
    console.log('🔄 Creating CloudFront invalidation...')
    const invalidationParams = {
      DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: `hero-image-sync-${Date.now()}`,
        Paths: {
          Quantity: 1,
          Items: [`/${s3Key}`]
        }
      }
    }

    const invalidation = await cloudfront.createInvalidation(invalidationParams).promise()
    console.log('✅ CloudFront invalidation created:', invalidation.Invalidation.Id)

    const result = {
      success: true,
      heroImage: {
        s3Key,
        s3Bucket: HERO_IMAGES_BUCKET,
        cloudFrontUrl: `https://cdn.admi.africa/${s3Key}`,
        originalUrl: imageUrl,
        contentfulId: coverImageId,
        fileName,
        contentType,
        size: imageBuffer.length
      },
      invalidationId: invalidation.Invalidation.Id,
      timestamp: new Date().toISOString()
    }

    console.log('🎉 Hero image sync completed successfully')
    console.log('Result:', JSON.stringify(result, null, 2))

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result)
    }
  } catch (error) {
    console.error('❌ Hero image sync failed:', error)

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    }
  }
}

/**
 * Download image from URL
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    console.log(`📥 Downloading image from: ${url}`)

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image. Status: ${response.statusCode}`))
          return
        }

        const chunks = []
        response.on('data', (chunk) => chunks.push(chunk))
        response.on('end', () => {
          const buffer = Buffer.concat(chunks)
          console.log(`✅ Downloaded ${buffer.length} bytes`)
          resolve(buffer)
        })
        response.on('error', reject)
      })
      .on('error', reject)
  })
}

/**
 * Fetch data from URL
 */
function fetchFromUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`))
          return
        }

        let data = ''
        response.on('data', (chunk) => (data += chunk))
        response.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (error) {
            reject(new Error(`Invalid JSON response: ${error.message}`))
          }
        })
        response.on('error', reject)
      })
      .on('error', reject)
  })
}
