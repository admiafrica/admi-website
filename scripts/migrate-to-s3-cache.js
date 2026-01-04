#!/usr/bin/env node

/**
 * S3 Cache Migration Script
 *
 * Migrates local cache files to S3 and sets up persistent caching infrastructure.
 *
 * Usage:
 *   node scripts/migrate-to-s3-cache.js
 *   node scripts/migrate-to-s3-cache.js --create-bucket
 *   node scripts/migrate-to-s3-cache.js --dry-run
 *
 * Environment Variables Required:
 *   AWS_ACCESS_KEY_ID - AWS access key
 *   AWS_SECRET_ACCESS_KEY - AWS secret key
 *   AWS_REGION - AWS region (default: us-east-1)
 *   S3_CACHE_BUCKET - S3 bucket name (default: admi-contentful-cache)
 */

const { S3Client, CreateBucketCommand, PutBucketLifecycleConfigurationCommand, PutObjectCommand, ListObjectsV2Command, HeadBucketCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

// Configuration
const S3_BUCKET = process.env.S3_CACHE_BUCKET || 'admi-contentful-cache'
const S3_REGION = process.env.AWS_REGION || 'us-east-1'
const CACHE_PREFIX = 'contentful-cache/'

// Parse command line arguments
const args = process.argv.slice(2)
const CREATE_BUCKET = args.includes('--create-bucket')
const DRY_RUN = args.includes('--dry-run')
const HELP = args.includes('--help') || args.includes('-h')

if (HELP) {
  console.log(`
S3 Cache Migration Script
=========================

Migrates local cache files to S3 for persistent caching.

Usage:
  node scripts/migrate-to-s3-cache.js [options]

Options:
  --create-bucket  Create the S3 bucket if it doesn't exist
  --dry-run        Show what would be done without making changes
  --help, -h       Show this help message

Environment Variables:
  AWS_ACCESS_KEY_ID     Your AWS access key
  AWS_SECRET_ACCESS_KEY Your AWS secret key
  AWS_REGION            AWS region (default: us-east-1)
  S3_CACHE_BUCKET       S3 bucket name (default: admi-contentful-cache)

Examples:
  # Check migration status
  node scripts/migrate-to-s3-cache.js --dry-run

  # Create bucket and migrate
  node scripts/migrate-to-s3-cache.js --create-bucket

  # Migrate to existing bucket
  node scripts/migrate-to-s3-cache.js
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

// Cache files to migrate
const CACHE_FILES = [
  { local: 'data/admi-videos-cache.json', key: 'videos', ttlDays: 7 },
]

// Contentful data to pre-cache
const CONTENTFUL_ENDPOINTS = [
  { name: 'homepage', contentType: 'homepage', ttlMinutes: 5 },
  { name: 'courses', contentType: 'course', ttlMinutes: 10 },
  { name: 'news', contentType: 'article', filter: 'fields.category[match]=News', ttlMinutes: 15 },
  { name: 'resources', contentType: 'article', filter: 'fields.category=Resources', ttlMinutes: 15 },
  { name: 'faqs', contentType: 'faq', ttlMinutes: 60 },
]

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
 * Create S3 bucket with proper configuration
 */
async function createBucket() {
  console.log(`📦 Creating S3 bucket: ${S3_BUCKET}`)

  if (DRY_RUN) {
    console.log('   [DRY RUN] Would create bucket')
    return
  }

  try {
    // Create bucket
    await s3Client.send(new CreateBucketCommand({
      Bucket: S3_BUCKET,
      ...(S3_REGION !== 'us-east-1' && {
        CreateBucketConfiguration: {
          LocationConstraint: S3_REGION
        }
      })
    }))
    console.log('   ✅ Bucket created')

    // Set up lifecycle rules for automatic cache expiration
    await s3Client.send(new PutBucketLifecycleConfigurationCommand({
      Bucket: S3_BUCKET,
      LifecycleConfiguration: {
        Rules: [
          {
            ID: 'ExpireShortLivedCache',
            Filter: { Prefix: `${CACHE_PREFIX}` },
            Status: 'Enabled',
            Expiration: { Days: 7 }, // Cleanup old cache entries after 7 days
            NoncurrentVersionExpiration: { NoncurrentDays: 1 }
          }
        ]
      }
    }))
    console.log('   ✅ Lifecycle rules configured')

  } catch (error) {
    if (error.name === 'BucketAlreadyOwnedByYou') {
      console.log('   ℹ️ Bucket already exists and is owned by you')
    } else {
      throw error
    }
  }
}

/**
 * Migrate a local cache file to S3
 */
async function migrateFile(cacheFile) {
  const localPath = path.join(process.cwd(), cacheFile.local)
  const s3Key = `${CACHE_PREFIX}${cacheFile.key}.json`

  console.log(`\n📁 Migrating: ${cacheFile.local}`)
  console.log(`   → S3: s3://${S3_BUCKET}/${s3Key}`)

  if (!fs.existsSync(localPath)) {
    console.log('   ⚠️ File not found, skipping')
    return false
  }

  const fileContent = fs.readFileSync(localPath, 'utf-8')
  const fileSize = Buffer.byteLength(fileContent, 'utf-8')
  console.log(`   📊 Size: ${(fileSize / 1024).toFixed(2)} KB`)

  if (DRY_RUN) {
    console.log('   [DRY RUN] Would upload file')
    return true
  }

  try {
    // Parse the file to wrap with cache metadata
    const data = JSON.parse(fileContent)
    const now = Date.now()
    const ttlMs = cacheFile.ttlDays * 24 * 60 * 60 * 1000

    const cacheEntry = {
      data,
      timestamp: now,
      expiresAt: now + ttlMs,
      source: 'migration'
    }

    await s3Client.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: s3Key,
      Body: JSON.stringify(cacheEntry),
      ContentType: 'application/json',
      Expires: new Date(cacheEntry.expiresAt)
    }))

    console.log('   ✅ Uploaded successfully')
    return true
  } catch (error) {
    console.log(`   ❌ Upload failed: ${error.message}`)
    return false
  }
}

/**
 * List existing cache entries in S3
 */
async function listExistingCache() {
  console.log('\n📋 Existing cache entries in S3:')

  try {
    const response = await s3Client.send(new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: CACHE_PREFIX
    }))

    if (!response.Contents || response.Contents.length === 0) {
      console.log('   (none)')
      return []
    }

    response.Contents.forEach(item => {
      const key = item.Key.replace(CACHE_PREFIX, '').replace('.json', '')
      const size = (item.Size / 1024).toFixed(2)
      const modified = item.LastModified.toISOString()
      console.log(`   • ${key} (${size} KB, modified: ${modified})`)
    })

    return response.Contents
  } catch (error) {
    console.log(`   ⚠️ Could not list cache: ${error.message}`)
    return []
  }
}

/**
 * Generate environment configuration
 */
function generateEnvConfig() {
  console.log('\n📝 Add these to your .env file:')
  console.log('─'.repeat(50))
  console.log(`# S3 Cache Configuration`)
  console.log(`S3_CACHE_BUCKET=${S3_BUCKET}`)
  console.log(`AWS_REGION=${S3_REGION}`)
  console.log(`ENABLE_S3_CACHE=true`)
  console.log('─'.repeat(50))

  console.log('\n📝 Add these to AWS Amplify environment variables:')
  console.log('─'.repeat(50))
  console.log(`S3_CACHE_BUCKET=${S3_BUCKET}`)
  console.log(`ENABLE_S3_CACHE=true`)
  console.log('─'.repeat(50))
}

/**
 * Main migration function
 */
async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║           S3 Cache Migration for Contentful                 ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')
  console.log()

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n')
  }

  // Check AWS credentials
  if (!process.env.AWS_ACCESS_KEY_ID && !process.env.AWS_PROFILE) {
    console.log('⚠️ Warning: No AWS credentials found in environment')
    console.log('   Using IAM role or instance profile\n')
  } else {
    console.log('✅ AWS credentials configured')
  }

  console.log(`📦 Bucket: ${S3_BUCKET}`)
  console.log(`🌍 Region: ${S3_REGION}\n`)

  // Check if bucket exists
  const exists = await bucketExists()

  if (!exists) {
    console.log('❌ Bucket does not exist')
    if (CREATE_BUCKET) {
      await createBucket()
    } else {
      console.log('   Run with --create-bucket to create it')
      process.exit(1)
    }
  } else {
    console.log('✅ Bucket exists')
  }

  // List existing cache
  await listExistingCache()

  // Migrate local files
  console.log('\n🚀 Migrating local cache files...')
  let migratedCount = 0
  for (const cacheFile of CACHE_FILES) {
    const success = await migrateFile(cacheFile)
    if (success) migratedCount++
  }

  // Generate env config
  generateEnvConfig()

  // Summary
  console.log('\n📊 Migration Summary')
  console.log('─'.repeat(50))
  console.log(`   Files migrated: ${migratedCount}/${CACHE_FILES.length}`)
  console.log(`   S3 bucket: s3://${S3_BUCKET}`)
  console.log(`   Cache prefix: ${CACHE_PREFIX}`)

  if (DRY_RUN) {
    console.log('\n   Run without --dry-run to apply changes')
  } else {
    console.log('\n✅ Migration complete!')
    console.log('\n📋 Next Steps:')
    console.log('   1. Add S3_CACHE_BUCKET to your .env file')
    console.log('   2. Add S3_CACHE_BUCKET to AWS Amplify environment')
    console.log('   3. Deploy to staging: git push origin staging')
    console.log('   4. Verify cache is working: visit /api/cache-health')
  }
}

// Run migration
main().catch(error => {
  console.error('\n❌ Migration failed:', error.message)
  process.exit(1)
})
