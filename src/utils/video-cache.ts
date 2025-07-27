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

// Use /tmp in serverless environments, data/ in development
const CACHE_FILE_PATH =
  process.env.NODE_ENV === 'production'
    ? path.join('/tmp', 'admi-videos-cache.json')
    : path.join(process.cwd(), 'data', 'admi-videos-cache.json')
const CACHE_DURATION = 72 * 60 * 60 * 1000 // 72 hours in milliseconds (extended temporarily)

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

    // In production, if cache system fails completely, return hardcoded fallback
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Using production fallback data')
      return getProductionFallbackCache()
    }

    return null
  }
}

// Fallback cache data for production when file system fails
export function getProductionFallbackCache(): VideoCache {
  return {
    videos: [
      {
        id: 'nXVF84Y3PbQ',
        title: 'S2: EP21: Lightning Round - This Is ADMI ft Ciku Munuku',
        description:
          'Welcome to "This Is ADMI", your inside look into Africa Digital Media Institute. In this series, we take you behind the scenes of one of Africa\'s leading creative and technical training institutions.',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/nXVF84Y3PbQ/default.jpg',
          medium: 'https://i.ytimg.com/vi/nXVF84Y3PbQ/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/nXVF84Y3PbQ/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/nXVF84Y3PbQ/maxresdefault.jpg'
        },
        publishedAt: '2025-07-25T07:05:36Z',
        duration: '8:13',
        viewCount: '4',
        likeCount: '0',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['admi', 'africa digital media institute', 'creative education', 'student showcase'],
        categoryId: '1'
      },
      {
        id: '41MF6Vk0Ku0',
        title: "S2: EP20: You Don't Get a Do-Over - This Is ADMI ft Ciku Munuku",
        description: 'Welcome to "This Is ADMI", your inside look into Africa Digital Media Institute.',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/41MF6Vk0Ku0/default.jpg',
          medium: 'https://i.ytimg.com/vi/41MF6Vk0Ku0/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/41MF6Vk0Ku0/hqdefault.jpg',
          maxres: 'https://i.ytimg.com/vi/41MF6Vk0Ku0/maxresdefault.jpg'
        },
        publishedAt: '2025-07-25T03:30:06Z',
        duration: '10:20',
        viewCount: '12',
        likeCount: '1',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['admi', 'africa digital media institute', 'creative education'],
        categoryId: '1'
      },
      {
        id: 'test-video-3',
        title: 'ADMI Student Showcase - Creative Media Projects',
        description: 'Discover amazing creative media projects by ADMI students.',
        thumbnail: {
          default: 'https://i.ytimg.com/vi/test-video-3/default.jpg',
          medium: 'https://i.ytimg.com/vi/test-video-3/mqdefault.jpg',
          high: 'https://i.ytimg.com/vi/test-video-3/hqdefault.jpg'
        },
        publishedAt: '2025-07-20T12:00:00Z',
        duration: '5:45',
        viewCount: '150',
        likeCount: '8',
        channelTitle: 'Africa Digital Media Institute - ADMI',
        tags: ['admi', 'student showcase', 'creative media'],
        categoryId: '1'
      }
    ],
    lastUpdated: new Date().toISOString(),
    totalVideos: 3,
    channelInfo: {
      title: 'Africa Digital Media Institute - ADMI',
      description: "Africa's premier digital media institute",
      subscriberCount: '4050',
      videoCount: '591',
      viewCount: '100000'
    }
  }
}

// Read cache from file regardless of expiration (for fallback)
export function readVideoCacheRaw(): VideoCache | null {
  try {
    ensureCacheDirectory()

    if (!fs.existsSync(CACHE_FILE_PATH)) {
      console.log('📁 No cache file found')

      // In production, return fallback instead of null
      if (process.env.NODE_ENV === 'production') {
        console.log('🔄 Using production fallback for raw cache')
        return getProductionFallbackCache()
      }

      return null
    }

    const cacheData = fs.readFileSync(CACHE_FILE_PATH, 'utf-8')
    const cache: VideoCache = JSON.parse(cacheData)

    console.log(`📚 Raw cache read, ${cache.videos?.length || 0} videos loaded`)
    return cache
  } catch (error) {
    console.error('❌ Error reading raw cache:', error)

    // In production, return fallback instead of null
    if (process.env.NODE_ENV === 'production') {
      console.log('🔄 Using production fallback for raw cache (error)')
      return getProductionFallbackCache()
    }

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
