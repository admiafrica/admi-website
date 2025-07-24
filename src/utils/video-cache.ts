import fs from 'fs'
import path from 'path'

export interface CachedVideo {
  id: string
  title: string
  description: string
  thumbnail: {
    default: string
    medium: string
    high: string
    maxres?: string
  }
  publishedAt: string
  duration: string
  viewCount: string
  likeCount: string
  channelTitle: string
  tags: string[]
  categoryId: string
}

export interface VideoCache {
  videos: CachedVideo[]
  lastUpdated: string
  totalVideos: number
  channelInfo: {
    title: string
    description: string
    subscriberCount: string
    videoCount: string
    viewCount: string
  }
}

const CACHE_FILE_PATH = path.join(process.cwd(), 'data', 'admi-videos-cache.json')
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Ensure cache directory exists
function ensureCacheDirectory() {
  const cacheDir = path.dirname(CACHE_FILE_PATH)
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true })
  }
}

// Read cache from file
export function readVideoCache(): VideoCache | null {
  try {
    ensureCacheDirectory()

    if (!fs.existsSync(CACHE_FILE_PATH)) {
      console.log('📁 No cache file found')
      return null
    }

    const cacheData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    const cache: VideoCache = JSON.parse(cacheData)

    const lastUpdated = new Date(cache.lastUpdated)
    const now = new Date()
    const timeDiff = now.getTime() - lastUpdated.getTime()

    if (timeDiff > CACHE_DURATION) {
      console.log('⏰ Cache expired, needs refresh')
      return null
    }

    console.log(`📚 Cache valid, ${cache.videos.length} videos loaded from cache`)
    return cache
  } catch (error) {
    console.error('❌ Error reading cache:', error)
    return null
  }
}

// Read cache from file regardless of expiration (for fallback)
export function readVideoCacheRaw(): VideoCache | null {
  try {
    ensureCacheDirectory()

    if (!fs.existsSync(CACHE_FILE_PATH)) {
      console.log('📁 No cache file found')
      return null
    }

    const cacheData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    const cache: VideoCache = JSON.parse(cacheData)

    console.log(`📚 Raw cache read, ${cache.videos?.length || 0} videos loaded`)
    return cache
  } catch (error) {
    console.error('❌ Error reading raw cache:', error)
    return null
  }
}

// Write cache to file
export function writeVideoCache(cache: VideoCache): void {
  try {
    ensureCacheDirectory()

    const cacheData = JSON.stringify(cache, null, 2)
    fs.writeFileSync(CACHE_FILE_PATH, cacheData, 'utf-8')

    console.log(`💾 Cache saved with ${cache.videos.length} videos`)
  } catch (error) {
    console.error('❌ Error writing cache:', error)
  }
}

// Check if cache is valid
export function isCacheValid(): boolean {
  try {
    if (!fs.existsSync(CACHE_FILE_PATH)) {
      return false
    }

    const cacheData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    const cache: VideoCache = JSON.parse(cacheData)

    const lastUpdated = new Date(cache.lastUpdated)
    const now = new Date()
    const timeDiff = now.getTime() - lastUpdated.getTime()

    return timeDiff <= CACHE_DURATION
  } catch (error) {
    console.error('❌ Error checking cache validity:', error)
    return false
  }
}

// Get cache stats
export function getCacheStats(): { exists: boolean; lastUpdated?: string; videoCount?: number; isValid?: boolean } {
  try {
    if (!fs.existsSync(CACHE_FILE_PATH)) {
      return { exists: false }
    }

    const cacheData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    const cache: VideoCache = JSON.parse(cacheData)

    const lastUpdated = new Date(cache.lastUpdated)
    const now = new Date()
    const timeDiff = now.getTime() - lastUpdated.getTime()
    const isValid = timeDiff <= CACHE_DURATION

    return {
      exists: true,
      lastUpdated: cache.lastUpdated,
      videoCount: cache.videos.length,
      isValid
    }
  } catch (error) {
    console.error('❌ Error getting cache stats:', error)
    return { exists: false }
  }
}
