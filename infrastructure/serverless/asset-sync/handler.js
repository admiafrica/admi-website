/**
 * Contentful Asset Sync Lambda
 *
 * Automatically syncs new Contentful assets to S3/CloudFront
 * Triggered by Contentful webhooks on asset publish/unpublish
 */

const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const https = require('https')
const fs = require('fs')
const path = require('path')

const s3Client = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })

const S3_BUCKET = process.env.S3_BUCKET || 'admi-contentful-assets'
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN || 'dq7z35wn8dhiz.cloudfront.net'
const WEBHOOK_SECRET = process.env.CONTENTFUL_WEBHOOK_SECRET

/**
 * Download file from URL to buffer
 */
async function downloadFile(url) {
  return new Promise((resolve, reject) => {
    // Ensure HTTPS
    const secureUrl = url.startsWith('//') ? `https:${url}` : url

    https
      .get(secureUrl, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          // Follow redirect
          return downloadFile(response.headers.location).then(resolve).catch(reject)
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`))
          return
        }

        const chunks = []
        response.on('data', (chunk) => chunks.push(chunk))
        response.on('end', () => resolve(Buffer.concat(chunks)))
        response.on('error', reject)
      })
      .on('error', reject)
  })
}

/**
 * Get content type from file extension
 */
function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase()
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.pdf': 'application/pdf',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav'
  }
  return types[ext] || 'application/octet-stream'
}

/**
 * Extract asset info from Contentful webhook payload
 */
function extractAssetInfo(payload) {
  const { sys, fields } = payload

  if (!fields?.file) {
    return null
  }

  // Get the file from the default locale (en-US) or first available
  const fileField = fields.file['en-US'] || fields.file[Object.keys(fields.file)[0]]

  if (!fileField?.url) {
    return null
  }

  return {
    id: sys.id,
    url: fileField.url,
    filename: fileField.fileName,
    contentType: fileField.contentType,
    title: fields.title?.['en-US'] || fields.title?.[Object.keys(fields.title)[0]] || fileField.fileName
  }
}

/**
 * Generate S3 key from Contentful URL
 */
function getS3Key(contentfulUrl) {
  // Extract path from URL: //images.ctfassets.net/xxx/yyy/zzz/filename.jpg
  const match = contentfulUrl.match(/\/\/[^/]+\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)/)
  if (match) {
    const [, spaceId, assetId, uploadId, filename] = match
    return `${spaceId}/${assetId}/${uploadId}/${filename}`
  }

  // Fallback: use the path after the domain
  const url = new URL(contentfulUrl.startsWith('//') ? `https:${contentfulUrl}` : contentfulUrl)
  return url.pathname.substring(1) // Remove leading slash
}

/**
 * Verify webhook signature (optional but recommended)
 */
function verifyWebhookSignature(headers, body) {
  if (!WEBHOOK_SECRET) {
    console.warn('CONTENTFUL_WEBHOOK_SECRET not set, skipping signature verification')
    return true
  }

  const signature = headers['x-contentful-signature']
  if (!signature) {
    console.warn('No signature in webhook request')
    return false
  }

  const crypto = require('crypto')
  const expectedSignature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(body).digest('hex')

  return signature === expectedSignature
}

/**
 * Handle asset publish - sync to S3
 */
async function handleAssetPublish(payload) {
  const assetInfo = extractAssetInfo(payload)

  if (!assetInfo) {
    console.log('No file data in payload, skipping')
    return { skipped: true, reason: 'No file data' }
  }

  console.log(`Syncing asset: ${assetInfo.title} (${assetInfo.id})`)
  console.log(`Contentful URL: ${assetInfo.url}`)

  // Download from Contentful
  const fileBuffer = await downloadFile(assetInfo.url)
  console.log(`Downloaded ${fileBuffer.length} bytes`)

  // Generate S3 key
  const s3Key = getS3Key(assetInfo.url)
  console.log(`S3 key: ${s3Key}`)

  // Upload to S3
  await s3Client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: s3Key,
      Body: fileBuffer,
      ContentType: assetInfo.contentType || getContentType(assetInfo.filename),
      CacheControl: 'public, max-age=31536000, immutable',
      Metadata: {
        'contentful-asset-id': assetInfo.id,
        'original-filename': assetInfo.filename,
        'synced-at': new Date().toISOString()
      }
    })
  )

  const cloudFrontUrl = `https://${CLOUDFRONT_DOMAIN}/${s3Key}`
  console.log(`Uploaded to CloudFront: ${cloudFrontUrl}`)

  return {
    success: true,
    assetId: assetInfo.id,
    contentfulUrl: assetInfo.url,
    cloudFrontUrl,
    size: fileBuffer.length
  }
}

/**
 * Handle asset unpublish - optionally delete from S3
 */
async function handleAssetUnpublish(payload) {
  const assetInfo = extractAssetInfo(payload)

  if (!assetInfo) {
    console.log('No file data in unpublish payload')
    return { skipped: true, reason: 'No file data' }
  }

  const s3Key = getS3Key(assetInfo.url)
  console.log(`Deleting asset from S3: ${s3Key}`)

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: S3_BUCKET,
        Key: s3Key
      })
    )

    console.log(`Deleted: ${s3Key}`)
    return { success: true, deleted: s3Key }
  } catch (error) {
    console.error(`Failed to delete ${s3Key}:`, error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Main Lambda handler
 */
exports.handler = async (event) => {
  console.log('Received webhook event')

  try {
    // Parse body
    const body = typeof event.body === 'string' ? event.body : JSON.stringify(event.body)
    const payload = typeof event.body === 'string' ? JSON.parse(event.body) : event.body

    // Verify signature
    if (!verifyWebhookSignature(event.headers || {}, body)) {
      console.error('Invalid webhook signature')
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid signature' })
      }
    }

    // Get webhook topic from headers
    const topic = event.headers?.['x-contentful-topic'] || event.headers?.['X-Contentful-Topic']
    console.log(`Webhook topic: ${topic}`)

    let result

    if (topic?.includes('Entry')) {
      // This is an entry webhook, not an asset
      console.log('Ignoring entry webhook')
      result = { skipped: true, reason: 'Entry webhook, not asset' }
    } else if (topic?.includes('publish') || topic?.includes('create')) {
      result = await handleAssetPublish(payload)
    } else if (topic?.includes('unpublish') || topic?.includes('delete')) {
      result = await handleAssetUnpublish(payload)
    } else {
      console.log(`Unknown topic: ${topic}, attempting publish handler`)
      result = await handleAssetPublish(payload)
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Webhook processed',
        ...result
      })
    }
  } catch (error) {
    console.error('Error processing webhook:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    }
  }
}

/**
 * Health check endpoint
 */
exports.healthCheck = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'healthy',
      service: 'contentful-asset-sync',
      bucket: S3_BUCKET,
      cloudfront: CLOUDFRONT_DOMAIN,
      timestamp: new Date().toISOString()
    })
  }
}
