#!/usr/bin/env node

/**
 * Contentful Asset Migration to S3
 *
 * Migrates all Contentful assets (images, videos, PDFs) to S3 to reduce
 * Contentful bandwidth usage and avoid quota blocks.
 *
 * This script:
 * 1. Fetches all assets from Contentful
 * 2. Downloads each asset
 * 3. Uploads to S3 with proper content types
 * 4. Generates a URL mapping file for rewriting asset URLs
 *
 * Usage:
 *   node scripts/migrate-assets-to-s3.js
 *   node scripts/migrate-assets-to-s3.js --dry-run
 *   node scripts/migrate-assets-to-s3.js --create-bucket
 *
 * Environment Variables:
 *   CONTENTFUL_SPACE_ID / ADMI_CONTENTFUL_SPACE_ID
 *   CONTENTFUL_ACCESS_TOKEN / ADMI_CONTENTFUL_ACCESS_TOKEN
 *   AWS_ACCESS_KEY_ID
 *   AWS_SECRET_ACCESS_KEY
 *   S3_ASSETS_BUCKET (default: admi-contentful-assets)
 *   CLOUDFRONT_DOMAIN (optional, for CDN URLs)
 */

const { S3Client, CreateBucketCommand, PutObjectCommand, HeadBucketCommand, PutBucketPolicyCommand, PutBucketCorsCommand } = require('@aws-sdk/client-s3')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

// Configuration
const S3_BUCKET = process.env.S3_ASSETS_BUCKET || 'admi-contentful-assets'
const S3_REGION = process.env.AWS_REGION || 'us-east-1'
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_ASSETS_DOMAIN || null

// Contentful configuration
const CONTENTFUL_SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID
const CONTENTFUL_ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN
const CONTENTFUL_ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

// Parse command line arguments
const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const CREATE_BUCKET = args.includes('--create-bucket')
const HELP = args.includes('--help') || args.includes('-h')
const LIMIT = args.find(a => a.startsWith('--limit='))?.split('=')[1] || null

if (HELP) {
  console.log(`
Contentful Asset Migration to S3
=================================

Migrates all Contentful assets to S3 to reduce bandwidth costs.

Usage:
  node scripts/migrate-assets-to-s3.js [options]

Options:
  --create-bucket  Create the S3 bucket if it doesn't exist
  --dry-run        Show what would be done without making changes
  --limit=N        Only migrate first N assets (for testing)
  --help, -h       Show this help message

Environment Variables:
  ADMI_CONTENTFUL_SPACE_ID      Contentful space ID
  ADMI_CONTENTFUL_ACCESS_TOKEN  Contentful access token
  AWS_ACCESS_KEY_ID             Your AWS access key
  AWS_SECRET_ACCESS_KEY         Your AWS secret key
  S3_ASSETS_BUCKET              S3 bucket name (default: admi-contentful-assets)
  CLOUDFRONT_ASSETS_DOMAIN      CloudFront domain for CDN URLs (optional)

Output:
  Creates data/asset-url-mapping.json with Contentful → S3 URL mappings
`)
  process.exit(0)
}

// Initialize S3 client
const s3Client = new S3Client({
  region: S3_REGION,
  ...(process.env.AWS_ACCESS_KEY_ID && {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
  })
})

// Statistics
const stats = {
  total: 0,
  migrated: 0,
  skipped: 0,
  failed: 0,
  totalSize: 0
}

/**
 * Check if bucket exists
 */
async function bucketExists() {
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: S3_BUCKET }))
    return true
  } catch (error) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
      return false
    }
    throw error
  }
}

/**
 * Create S3 bucket (CloudFront will be used for public access)
 */
async function createBucket() {
  console.log(`📦 Creating S3 bucket: ${S3_BUCKET}`)

  if (DRY_RUN) {
    console.log('   [DRY RUN] Would create bucket')
    return
  }

  // Create bucket
  try {
    await s3Client.send(new CreateBucketCommand({
      Bucket: S3_BUCKET,
      ...(S3_REGION !== 'us-east-1' && {
        CreateBucketConfiguration: {
          LocationConstraint: S3_REGION
        }
      })
    }))
    console.log('   ✅ Bucket created')
  } catch (error) {
    if (error.name === 'BucketAlreadyOwnedByYou') {
      console.log('   ℹ️ Bucket already exists and is owned by you')
    } else {
      throw error
    }
  }

  // Try to set CORS for web access (this might work even with Block Public Access)
  try {
    await s3Client.send(new PutBucketCorsCommand({
      Bucket: S3_BUCKET,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'HEAD'],
            AllowedOrigins: ['*'],
            ExposeHeaders: ['ETag'],
            MaxAgeSeconds: 86400
          }
        ]
      }
    }))
    console.log('   ✅ CORS configuration applied')
  } catch (error) {
    console.log(`   ⚠️ Could not set CORS (may need CloudFront): ${error.message}`)
  }

  console.log('\n   📋 NOTE: For public access, set up CloudFront distribution:')
  console.log('      1. Create CloudFront distribution with S3 origin')
  console.log('      2. Use Origin Access Control (OAC) for secure access')
  console.log('      3. Add CLOUDFRONT_ASSETS_DOMAIN to .env')
}

/**
 * Fetch all assets from Contentful
 */
async function fetchAllAssets() {
  console.log('\n📋 Fetching assets from Contentful...')

  const allAssets = []
  let skip = 0
  const limit = 100

  while (true) {
    const url = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/assets?access_token=${CONTENTFUL_ACCESS_TOKEN}&limit=${limit}&skip=${skip}`

    try {
      const response = await axios.get(url)
      const { items, total } = response.data

      allAssets.push(...items)

      console.log(`   Fetched ${allAssets.length}/${total} assets...`)

      if (allAssets.length >= total || items.length === 0) {
        break
      }

      skip += limit

      // Rate limiting - be nice to Contentful API
      await new Promise(resolve => setTimeout(resolve, 200))
    } catch (error) {
      console.error(`   ❌ Error fetching assets: ${error.message}`)
      break
    }
  }

  console.log(`   ✅ Found ${allAssets.length} assets`)
  return allAssets
}

/**
 * Download asset from Contentful
 */
async function downloadAsset(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 60000, // 60 second timeout for large files
      headers: {
        'User-Agent': 'ADMI-Asset-Migration/1.0'
      }
    })

    return {
      data: response.data,
      contentType: response.headers['content-type'],
      size: response.data.length
    }
  } catch (error) {
    throw new Error(`Download failed: ${error.message}`)
  }
}

/**
 * Upload asset to S3
 */
async function uploadToS3(key, data, contentType) {
  if (DRY_RUN) {
    return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${key}`
  }

  await s3Client.send(new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: data,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable' // 1 year cache
  }))

  // Return the S3 URL (or CloudFront URL if configured)
  if (CLOUDFRONT_DOMAIN) {
    return `https://${CLOUDFRONT_DOMAIN}/${key}`
  }
  return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${key}`
}

/**
 * Get S3 key from Contentful asset URL
 */
function getS3Key(contentfulUrl, assetId) {
  // Contentful URLs look like: //images.ctfassets.net/space_id/asset_id/hash/filename.jpg
  // We'll use: assets/asset_id/filename.jpg
  const urlParts = contentfulUrl.split('/')
  const filename = urlParts[urlParts.length - 1]
  return `assets/${assetId}/${filename}`
}

/**
 * Migrate a single asset
 */
async function migrateAsset(asset, index, total) {
  const assetId = asset.sys.id
  const title = asset.fields?.title?.['en-US'] || asset.fields?.title || 'Untitled'
  const fileInfo = asset.fields?.file?.['en-US'] || asset.fields?.file

  if (!fileInfo || !fileInfo.url) {
    console.log(`   ⚠️ [${index + 1}/${total}] ${title} - No file URL, skipping`)
    stats.skipped++
    return null
  }

  const contentfulUrl = fileInfo.url.startsWith('//') ? `https:${fileInfo.url}` : fileInfo.url
  const contentType = fileInfo.contentType
  const fileSize = fileInfo.details?.size || 0
  const s3Key = getS3Key(fileInfo.url, assetId)

  console.log(`   📦 [${index + 1}/${total}] ${title}`)
  console.log(`      Type: ${contentType}, Size: ${(fileSize / 1024).toFixed(1)} KB`)

  if (DRY_RUN) {
    console.log(`      [DRY RUN] Would upload to: ${s3Key}`)
    stats.migrated++
    stats.totalSize += fileSize
    return {
      assetId,
      title,
      contentfulUrl,
      s3Key,
      s3Url: `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${s3Key}`,
      contentType,
      size: fileSize
    }
  }

  try {
    // Download from Contentful
    const { data, size } = await downloadAsset(contentfulUrl)

    // Upload to S3
    const s3Url = await uploadToS3(s3Key, data, contentType)

    console.log(`      ✅ Migrated to S3`)
    stats.migrated++
    stats.totalSize += size

    return {
      assetId,
      title,
      contentfulUrl,
      s3Key,
      s3Url,
      contentType,
      size
    }
  } catch (error) {
    console.log(`      ❌ Failed: ${error.message}`)
    stats.failed++
    return null
  }
}

/**
 * Generate URL mapping file
 */
function generateMapping(migratedAssets) {
  const mapping = {}

  migratedAssets.forEach(asset => {
    if (asset) {
      // Create mapping from Contentful domain to S3
      // Original: //images.ctfassets.net/space/id/hash/file.jpg
      // Mapped to: https://bucket.s3.region.amazonaws.com/assets/id/file.jpg
      const contentfulPath = asset.contentfulUrl.replace(/^https?:/, '').replace(/^\/\//, '')
      mapping[contentfulPath] = asset.s3Url
    }
  })

  return mapping
}

/**
 * Save mapping to file
 */
function saveMapping(mapping) {
  const outputPath = path.join(process.cwd(), 'data', 'asset-url-mapping.json')

  // Ensure data directory exists
  const dataDir = path.dirname(outputPath)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2))
  console.log(`\n📝 URL mapping saved to: ${outputPath}`)

  // Also save a summary
  const summaryPath = path.join(process.cwd(), 'data', 'asset-migration-summary.json')
  fs.writeFileSync(summaryPath, JSON.stringify({
    migratedAt: new Date().toISOString(),
    bucket: S3_BUCKET,
    region: S3_REGION,
    cloudfrontDomain: CLOUDFRONT_DOMAIN,
    stats: {
      ...stats,
      totalSizeMB: (stats.totalSize / 1024 / 1024).toFixed(2)
    }
  }, null, 2))
  console.log(`📝 Migration summary saved to: ${summaryPath}`)
}

/**
 * Main migration function
 */
async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║         Contentful Asset Migration to S3                     ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')
  console.log()

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n')
  }

  // Validate configuration
  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
    console.error('❌ Missing Contentful credentials')
    console.error('   Set ADMI_CONTENTFUL_SPACE_ID and ADMI_CONTENTFUL_ACCESS_TOKEN')
    process.exit(1)
  }

  if (!process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_PROFILE) {
    console.log('⚠️ Warning: No AWS credentials found in environment')
    console.log('   Using IAM role or instance profile\n')
  }

  console.log(`📦 S3 Bucket: ${S3_BUCKET}`)
  console.log(`🌍 Region: ${S3_REGION}`)
  if (CLOUDFRONT_DOMAIN) {
    console.log(`🚀 CloudFront: ${CLOUDFRONT_DOMAIN}`)
  }
  console.log(`📄 Contentful Space: ${CONTENTFUL_SPACE_ID}`)

  // Check/create bucket
  const exists = await bucketExists()
  if (!exists) {
    console.log('\n❌ S3 bucket does not exist')
    if (CREATE_BUCKET) {
      await createBucket()
    } else {
      console.log('   Run with --create-bucket to create it')
      process.exit(1)
    }
  } else {
    console.log('\n✅ S3 bucket exists')
  }

  // Fetch all assets from Contentful
  let assets = await fetchAllAssets()
  stats.total = assets.length

  // Apply limit if specified
  if (LIMIT) {
    assets = assets.slice(0, parseInt(LIMIT))
    console.log(`\n📊 Limiting to first ${LIMIT} assets (for testing)`)
  }

  // Migrate assets
  console.log('\n🚀 Starting migration...')
  const migratedAssets = []

  for (let i = 0; i < assets.length; i++) {
    const result = await migrateAsset(assets[i], i, assets.length)
    migratedAssets.push(result)

    // Rate limiting - avoid overwhelming S3
    if (!DRY_RUN && (i + 1) % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  // Generate and save URL mapping
  const mapping = generateMapping(migratedAssets)
  saveMapping(mapping)

  // Print summary
  console.log('\n' + '═'.repeat(60))
  console.log('📊 MIGRATION SUMMARY')
  console.log('═'.repeat(60))
  console.log(`   Total assets:    ${stats.total}`)
  console.log(`   Migrated:        ${stats.migrated}`)
  console.log(`   Skipped:         ${stats.skipped}`)
  console.log(`   Failed:          ${stats.failed}`)
  console.log(`   Total size:      ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`)
  console.log('═'.repeat(60))

  if (DRY_RUN) {
    console.log('\n🔍 This was a dry run. Run without --dry-run to migrate.')
  } else {
    console.log('\n✅ Migration complete!')
    console.log('\n📋 Next Steps:')
    console.log('   1. Set up CloudFront distribution for S3 bucket (optional but recommended)')
    console.log('   2. Update CLOUDFRONT_ASSETS_DOMAIN in .env')
    console.log('   3. Deploy the asset URL rewriter middleware')
    console.log('   4. Test asset loading on staging')
    console.log('   5. Deploy to production')
  }
}

// Run migration
main().catch(error => {
  console.error('\n❌ Migration failed:', error.message)
  process.exit(1)
})
