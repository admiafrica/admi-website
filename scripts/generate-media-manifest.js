#!/usr/bin/env node

/**
 * Generate static JSON manifests for media archive
 * Runs at build time to create static files instead of using serverless APIs
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const path = require('path')
/* eslint-enable @typescript-eslint/no-var-requires */

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'us-east-1',
  // Use profile when running locally
  ...(process.env.AWS_PROFILE && {
    credentials: undefined // Let AWS SDK use profile
  })
})

const S3_CONFIG = {
  BUCKET_NAME: process.env.S3_BUCKET_NAME || 'admi-media-archive-381492234121',
  REGION: process.env.S3_REGION || 'us-east-1',
  MEDIA_ARCHIVE_PREFIX: 'media-archive/',
  CLOUDFRONT_DOMAIN: 'd17qqznw1g499t.cloudfront.net'
}

async function generateAlbumsManifest() {
  console.log('🖼️ Generating albums manifest...')

  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Prefix: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/`,
      Delimiter: '/'
    })

    const response = await s3Client.send(listCommand)
    const albumFolders =
      response.CommonPrefixes?.map(
        (prefix) => prefix.Prefix?.replace(`${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/`, '').replace('/', '') || ''
      ).filter((name) => name) || []

    const albums = []

    for (const folderName of albumFolders) {
      console.log(`  Processing album: ${folderName}`)

      // Get images in folder
      const imagesCommand = new ListObjectsV2Command({
        Bucket: S3_CONFIG.BUCKET_NAME,
        Prefix: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/${folderName}/`
      })

      const imagesResponse = await s3Client.send(imagesCommand)
      const imageFiles =
        imagesResponse.Contents?.filter(
          (obj) =>
            obj.Key &&
            (obj.Key.endsWith('.jpg') ||
              obj.Key.endsWith('.jpeg') ||
              obj.Key.endsWith('.png') ||
              obj.Key.endsWith('.webp'))
        ) || []

      if (imageFiles.length === 0) {
        console.log('    ⚠️ No images found, skipping')
        continue
      }

      // Get metadata if exists
      let metadata = {
        title: folderName.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        description: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        photographer: ''
      }

      try {
        const metadataCommand = new GetObjectCommand({
          Bucket: S3_CONFIG.BUCKET_NAME,
          Key: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}images/${folderName}/metadata.json`
        })
        const metadataResponse = await s3Client.send(metadataCommand)
        const metadataContent = await metadataResponse.Body?.transformToString()
        if (metadataContent) {
          const parsedMetadata = JSON.parse(metadataContent)
          metadata = { ...metadata, ...parsedMetadata }
        }
      } catch (error) {
        console.log('    No metadata found, using defaults')
      }

      const firstImage = imageFiles[0]
      const thumbnailUrl = `https://${S3_CONFIG.CLOUDFRONT_DOMAIN}/${firstImage.Key}`

      albums.push({
        id: folderName,
        slug: folderName,
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        category: metadata.category,
        photographer: metadata.photographer,
        event: metadata.title,
        thumbnail: thumbnailUrl,
        imageCount: imageFiles.length,
        isAlbum: true
      })

      console.log(`    ✅ Added ${imageFiles.length} images`)
    }

    // Sort by date
    albums.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Write manifest
    const manifestPath = path.join(process.cwd(), 'public', 'api', 'media-archive')
    fs.mkdirSync(manifestPath, { recursive: true })

    const manifest = {
      success: true,
      albums,
      count: albums.length,
      generated: new Date().toISOString(),
      source: 'static'
    }

    fs.writeFileSync(path.join(manifestPath, 'albums.json'), JSON.stringify(manifest, null, 2))

    console.log(`✅ Generated albums manifest: ${albums.length} albums`)
    return albums.length
  } catch (error) {
    console.error('❌ Error generating albums manifest:', error)
    throw error
  }
}

async function generateAudioManifest() {
  console.log('🎵 Generating audio manifest...')

  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: S3_CONFIG.BUCKET_NAME,
      Prefix: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}audio/`
    })

    const response = await s3Client.send(listCommand)
    const audioFiles =
      response.Contents?.filter(
        (obj) =>
          obj.Key &&
          !obj.Key.endsWith('/') &&
          !obj.Key.includes('metadata/') &&
          (obj.Key.endsWith('.mp3') ||
            obj.Key.endsWith('.wav') ||
            obj.Key.endsWith('.m4a') ||
            obj.Key.endsWith('.aac') ||
            obj.Key.endsWith('.ogg'))
      ) || []

    const audio = []

    for (let i = 0; i < audioFiles.length; i++) {
      const obj = audioFiles[i]
      const fileName = obj.Key?.split('/').pop() || `audio-${i + 1}`
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
      const title = nameWithoutExt.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())

      console.log(`  Processing audio: ${fileName}`)

      // Get metadata if exists
      let metadata = {
        title,
        description: '',
        category: '',
        speaker: '',
        student: null,
        course: null,
        genre: null,
        duration: 'Unknown',
        type: ''
      }

      try {
        const metadataCommand = new GetObjectCommand({
          Bucket: S3_CONFIG.BUCKET_NAME,
          Key: `${S3_CONFIG.MEDIA_ARCHIVE_PREFIX}audio/metadata/${nameWithoutExt}.json`
        })
        const metadataResponse = await s3Client.send(metadataCommand)
        const metadataContent = await metadataResponse.Body?.transformToString()
        if (metadataContent) {
          const parsedMetadata = JSON.parse(metadataContent)
          metadata = { ...metadata, ...parsedMetadata }
        }
      } catch (error) {
        console.log('    No metadata found, using defaults')
      }

      const audioUrl = `https://${S3_CONFIG.CLOUDFRONT_DOMAIN}/${obj.Key}`
      const fileExtension = obj.Key?.split('.').pop()?.toLowerCase()

      // Determine category from filename
      let audioType = metadata.type
      if (fileName.toLowerCase().includes('podcast')) audioType = 'Podcast'
      else if (fileName.toLowerCase().includes('interview')) audioType = 'Interview'
      else if (fileName.toLowerCase().includes('lecture')) audioType = 'Tech Talk'
      else if (fileName.toLowerCase().includes('music')) audioType = 'Music'

      audio.push({
        id: `audio-${i + 1}`,
        title: metadata.title,
        description: metadata.description,
        filename: fileName,
        audioUrl,
        duration: metadata.duration || 'Unknown',
        date: obj.LastModified?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        category: audioType,
        speaker: metadata.speaker || '',
        student: metadata.student || null,
        course: metadata.course || null,
        genre: metadata.genre || null,
        plays: 0,
        size: obj.Size || 0,
        format: fileExtension?.toUpperCase() || 'UNKNOWN',
        lastModified: obj.LastModified?.toISOString() || new Date().toISOString()
      })

      console.log('    ✅ Added audio file')
    }

    // Sort by date
    audio.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Write manifest
    const manifestPath = path.join(process.cwd(), 'public', 'api', 'media-archive')
    fs.mkdirSync(manifestPath, { recursive: true })

    const manifest = {
      success: true,
      audio,
      count: audio.length,
      generated: new Date().toISOString(),
      source: 'static'
    }

    fs.writeFileSync(path.join(manifestPath, 'audio.json'), JSON.stringify(manifest, null, 2))

    console.log(`✅ Generated audio manifest: ${audio.length} files`)
    return audio.length
  } catch (error) {
    console.error('❌ Error generating audio manifest:', error)
    throw error
  }
}

async function main() {
  console.log('🚀 Generating media archive manifests...')

  try {
    const [albumCount, audioCount] = await Promise.all([generateAlbumsManifest(), generateAudioManifest()])

    console.log('\n✅ Successfully generated manifests:')
    console.log(`   📸 Albums: ${albumCount}`)
    console.log(`   🎵 Audio: ${audioCount}`)
    console.log('\n📁 Static files created:')
    console.log('   - public/api/media-archive/albums.json')
    console.log('   - public/api/media-archive/audio.json')
    console.log('\n🌐 Accessible at:')
    console.log('   - /api/media-archive/albums.json')
    console.log('   - /api/media-archive/audio.json')
  } catch (error) {
    console.error('❌ Failed to generate manifests:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { generateAlbumsManifest, generateAudioManifest }
