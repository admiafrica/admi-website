/**
 * S3-based Cache Utility for Contentful API Responses
 *
 * Provides persistent caching to reduce Contentful API calls by 95%+
 * Uses S3 as a cache store with in-memory fallback for fast access
 *
 * Cache Strategy:
 * 1. Check in-memory cache first (fastest)
 * 2. If miss, check S3 cache (persistent across deploys)
 * 3. If miss, fetch from Contentful and update both caches
 */

import { S3Client, GetObjectCommand, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'

// S3 Configuration
const S3_BUCKET = process.env.S3_CACHE_BUCKET || 'admi-contentful-cache'
const S3_REGION = process.env.AWS_REGION || 'us-east-1'
const CACHE_PREFIX = 'contentful-cache/'

// Cache durations (in milliseconds)
export const CACHE_DURATIONS = {
  homepage: 5 * 60 * 1000, // 5 minutes
  courses: 10 * 60 * 1000, // 10 minutes
  news: 15 * 60 * 1000, // 15 minutes
  resources: 15 * 60 * 1000, // 15 minutes
  events: 30 * 60 * 1000, // 30 minutes
  faqs: 60 * 60 * 1000, // 1 hour
  videos: 7 * 24 * 60 * 60 * 1000 // 7 days
} as const

export type CacheKey = keyof typeof CACHE_DURATIONS

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
  source: 'contentful' | 's3' | 'memory'
}

// In-memory cache for fast access
const memoryCache = new Map<string, CacheEntry<unknown>>()

// S3 Client singleton
let s3Client: S3Client | null = null

function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: S3_REGION,
      // Credentials are automatically picked up from environment or IAM role
      ...(process.env.AWS_ACCESS_KEY_ID && {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
        }
      })
    })
  }
  return s3Client
}

/**
 * Get cache key for S3
 */
function getS3Key(key: string): string {
  return `${CACHE_PREFIX}${key}.json`
}

/**
 * Check if cache entry is valid (not expired)
 */
function isCacheValid<T>(entry: CacheEntry<T> | null): entry is CacheEntry<T> {
  if (!entry) return false
  return Date.now() < entry.expiresAt
}

/**
 * Get data from S3 cache
 */
async function getFromS3<T>(key: string): Promise<CacheEntry<T> | null> {
  try {
    const client = getS3Client()
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: getS3Key(key)
    })

    const response = await client.send(command)
    const body = await response.Body?.transformToString()

    if (!body) return null

    const entry: CacheEntry<T> = JSON.parse(body)
    entry.source = 's3'
    return entry
  } catch (error: any) {
    if (error.name === 'NoSuchKey' || error.Code === 'NoSuchKey') {
      // Key doesn't exist - not an error
      return null
    }
    console.warn(`[S3 Cache] Error reading key "${key}":`, error.message)
    return null
  }
}

/**
 * Save data to S3 cache
 */
async function saveToS3<T>(key: string, entry: CacheEntry<T>): Promise<boolean> {
  try {
    const client = getS3Client()
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: getS3Key(key),
      Body: JSON.stringify(entry),
      ContentType: 'application/json',
      // Set S3 object to expire when cache expires
      Expires: new Date(entry.expiresAt)
    })

    await client.send(command)
    console.log(`[S3 Cache] Saved "${key}" to S3`)
    return true
  } catch (error: any) {
    console.warn(`[S3 Cache] Error saving key "${key}":`, error.message)
    return false
  }
}

/**
 * Check if S3 bucket is accessible
 */
export async function checkS3Connection(): Promise<boolean> {
  try {
    const client = getS3Client()
    const command = new HeadObjectCommand({
      Bucket: S3_BUCKET,
      Key: `${CACHE_PREFIX}_health_check`
    })

    try {
      await client.send(command)
    } catch (error: any) {
      // NoSuchKey is expected - bucket exists but key doesn't
      if (error.name === 'NotFound' || error.Code === 'NotFound') {
        return true
      }
      throw error
    }
    return true
  } catch (error: any) {
    console.warn('[S3 Cache] Connection check failed:', error.message)
    return false
  }
}

/**
 * Get cached data with multi-tier caching strategy
 *
 * @param key - Cache key (e.g., 'homepage', 'courses')
 * @param fetcher - Function to fetch fresh data if cache miss
 * @param options - Cache options (duration, force refresh)
 */
export async function getCached<T>(
  key: CacheKey | string,
  fetcher: () => Promise<T>,
  options: {
    duration?: number
    forceRefresh?: boolean
    useS3?: boolean
  } = {}
): Promise<{ data: T; source: 'memory' | 's3' | 'contentful'; age: number }> {
  const cacheKey = key
  const duration = options.duration || CACHE_DURATIONS[key as CacheKey] || 5 * 60 * 1000
  const useS3 = options.useS3 !== false // Default to true

  // 1. Check memory cache first (fastest)
  if (!options.forceRefresh) {
    const memEntry = memoryCache.get(cacheKey) as CacheEntry<T> | undefined
    if (memEntry && isCacheValid(memEntry)) {
      console.log(`[Cache] Memory HIT for "${cacheKey}"`)
      return {
        data: memEntry.data,
        source: 'memory',
        age: Date.now() - memEntry.timestamp
      }
    }
  }

  // 2. Check S3 cache (persistent)
  if (useS3 && !options.forceRefresh) {
    const s3Entry = await getFromS3<T>(cacheKey)
    if (isCacheValid(s3Entry)) {
      console.log(`[Cache] S3 HIT for "${cacheKey}"`)
      // Update memory cache for faster subsequent access
      memoryCache.set(cacheKey, s3Entry)
      return {
        data: s3Entry.data,
        source: 's3',
        age: Date.now() - s3Entry.timestamp
      }
    }
  }

  // 3. Fetch fresh data
  console.log(`[Cache] MISS for "${cacheKey}" - fetching from Contentful`)
  const data = await fetcher()
  const now = Date.now()

  const entry: CacheEntry<T> = {
    data,
    timestamp: now,
    expiresAt: now + duration,
    source: 'contentful'
  }

  // Update both caches
  memoryCache.set(cacheKey, entry)

  if (useS3) {
    // Don't await S3 save - do it in background
    saveToS3(cacheKey, entry).catch((err) => console.warn('[S3 Cache] Background save failed:', err))
  }

  return {
    data,
    source: 'contentful',
    age: 0
  }
}

/**
 * Invalidate cache for a specific key
 */
export async function invalidateCache(key: string): Promise<void> {
  memoryCache.delete(key)
  // Note: S3 objects will naturally expire, but we can force delete if needed
  console.log(`[Cache] Invalidated "${key}"`)
}

/**
 * Clear all memory cache
 */
export function clearMemoryCache(): void {
  memoryCache.clear()
  console.log('[Cache] Memory cache cleared')
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
  memoryEntries: number
  memorySizeEstimate: string
  entries: Array<{ key: string; age: number; expiresIn: number }>
} {
  const entries: Array<{ key: string; age: number; expiresIn: number }> = []
  const now = Date.now()

  memoryCache.forEach((entry, key) => {
    entries.push({
      key,
      age: now - entry.timestamp,
      expiresIn: entry.expiresAt - now
    })
  })

  // Rough estimate of memory size
  let totalSize = 0
  memoryCache.forEach((entry) => {
    totalSize += JSON.stringify(entry).length
  })

  return {
    memoryEntries: memoryCache.size,
    memorySizeEstimate: `${(totalSize / 1024).toFixed(2)} KB`,
    entries: entries.sort((a, b) => a.expiresIn - b.expiresIn)
  }
}

/**
 * Warm up cache by pre-fetching common data
 */
export async function warmUpCache(fetchers: Record<string, () => Promise<unknown>>): Promise<void> {
  console.log('[Cache] Warming up cache...')

  const results = await Promise.allSettled(
    Object.entries(fetchers).map(async ([key, fetcher]) => {
      await getCached(key, fetcher)
      return key
    })
  )

  const successful = results.filter((r) => r.status === 'fulfilled').length
  console.log(`[Cache] Warmed up ${successful}/${results.length} entries`)
}
