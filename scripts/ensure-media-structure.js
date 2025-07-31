#!/usr/bin/env node

/**
 * Ensure media archive directory structure exists
 * Creates minimal fallback files if they don't exist
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
/* eslint-enable @typescript-eslint/no-var-requires */

function ensureMediaStructure() {
  console.log('📁 Ensuring media archive directory structure...')

  const manifestPath = path.join(process.cwd(), 'public', 'api', 'media-archive')

  // Create directory if it doesn't exist
  if (!fs.existsSync(manifestPath)) {
    fs.mkdirSync(manifestPath, { recursive: true })
    console.log('✅ Created media-archive directory')
  }

  // Ensure albums.json exists
  const albumsPath = path.join(manifestPath, 'albums.json')
  if (!fs.existsSync(albumsPath)) {
    const albumsManifest = {
      success: true,
      albums: [],
      count: 0,
      generated: new Date().toISOString(),
      source: 'structure-fallback'
    }
    fs.writeFileSync(albumsPath, JSON.stringify(albumsManifest, null, 2))
    console.log('✅ Created fallback albums.json')
  }

  // Ensure audio.json exists
  const audioPath = path.join(manifestPath, 'audio.json')
  if (!fs.existsSync(audioPath)) {
    const audioManifest = {
      success: true,
      audio: [],
      count: 0,
      generated: new Date().toISOString(),
      source: 'structure-fallback'
    }
    fs.writeFileSync(audioPath, JSON.stringify(audioManifest, null, 2))
    console.log('✅ Created fallback audio.json')
  }

  console.log('✅ Media archive structure verified')
}

if (require.main === module) {
  ensureMediaStructure()
}

module.exports = { ensureMediaStructure }
