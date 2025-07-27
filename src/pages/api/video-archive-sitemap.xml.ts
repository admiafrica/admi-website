import type { NextApiRequest, NextApiResponse } from 'next'
import { readVideoCache, readVideoCacheRaw, getCacheStats, getProductionFallbackCache } from '@/utils/video-cache'

// Helper to escape characters for XML
const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      case '"':
        return '&quot;'
      default:
        return c
    }
  })
}

// Helper to sanitize content for CDATA
const sanitizeForCDATA = (str: string) => {
  if (!str) return ''
  return str.replace(/]]>/g, ']]&gt;')
}

// Helper function to convert duration to seconds for sitemap
function convertDurationToSeconds(duration: string): number {
  if (!duration || duration === 'N/A') return 0

  const parts = duration.split(':').map(Number)
  let totalSeconds = 0

  if (parts.length === 2) {
    // MM:SS format
    totalSeconds = parts[0] * 60 + parts[1]
  } else if (parts.length === 3) {
    // HH:MM:SS format
    totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2]
  }

  // Validate duration - exclude videos longer than 2 hours (7200 seconds)
  // Return 0 for invalid durations (negative, NaN, or too long)
  if (isNaN(totalSeconds) || totalSeconds <= 0 || totalSeconds > 7200) {
    return 0
  }

  return totalSeconds
}

// Helper function to convert view count to number
function convertViewCountToNumber(viewCount: string): number {
  if (!viewCount || viewCount === 'N/A') return 0

  const cleanCount = viewCount.replace(/[^\d.]/g, '')
  const num = parseFloat(cleanCount)

  if (viewCount.includes('M')) {
    return Math.floor(num * 1000000)
  } else if (viewCount.includes('K')) {
    return Math.floor(num * 1000)
  }

  return Math.floor(num) || 0
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    // Set headers first - ensure XML content type
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
    res.setHeader('X-Content-Type-Options', 'nosniff')

    // Get all cached videos from YouTube channel (try normal cache first, then raw cache)
    let cache = readVideoCache()
    const cacheStats = getCacheStats()

    if (!cache) {
      // If normal cache is expired, try raw cache as fallback
      console.log('⏰ Cache expired, trying raw cache as fallback for video archive sitemap')
      cache = readVideoCacheRaw()
    }

    if (!cache || !cache.videos || cache.videos.length === 0) {
      // As a last resort, use production fallback data
      console.log('🔄 No cache available, using production fallback for video archive sitemap')
      cache = getProductionFallbackCache()
    }

    if (!cache || !cache.videos || cache.videos.length === 0) {
      // Log detailed information for debugging
      console.log('❌ No video data available for video archive sitemap (even fallback failed)')
      console.log('📊 Cache stats:', cacheStats)
      console.log('🔧 Environment:', process.env.NODE_ENV)
      console.log('📁 Cache exists:', cacheStats.exists)
      console.log('⏰ Cache valid:', cacheStats.isValid)

      // Return empty sitemap if no videos found
      const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
</urlset>`

      return res.status(200).send(emptySitemap)
    }

    console.log(
      `📊 Video archive sitemap: Using cache with ${cache.videos.length} videos (valid: ${cacheStats.isValid})`
    )

    const baseUrl = 'https://admi.africa'

    // Video Archive Sitemap: Include ALL videos from the /videos page
    // Apply the same 24-month filter as the videos page
    const twentyFourMonthsAgo = new Date()
    twentyFourMonthsAgo.setMonth(twentyFourMonthsAgo.getMonth() - 24)

    const videos = cache.videos.filter((video) => {
      const publishedDate = new Date(video.publishedAt)
      const durationInSeconds = convertDurationToSeconds(video.duration)
      // Same filters as videos page: >60 seconds AND within 24 months
      return durationInSeconds > 60 && publishedDate >= twentyFourMonthsAgo
    })

    // Generate video archive sitemap XML pointing to the videos gallery page
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${baseUrl}/videos</loc>
    <lastmod>${cache.lastUpdated || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    ${videos
      .map((video) => {
        const duration = convertDurationToSeconds(video.duration)
        // Skip videos with invalid durations or longer than 2 hours (0 means invalid)
        if (duration === 0 || duration > 7200) {
          return null
        }

        return `
    <video:video>
      <video:thumbnail_loc>${escapeXml(video.thumbnail.high || video.thumbnail.medium || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`)}</video:thumbnail_loc>
      <video:title><![CDATA[${sanitizeForCDATA(video.title)}]]></video:title>
      <video:description><![CDATA[${sanitizeForCDATA(video.description.substring(0, 2048))}]]></video:description>
      <video:content_loc>${baseUrl}/videos?v=${video.id}</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/${video.id}</video:player_loc>
      <video:duration>${duration}</video:duration>
      <video:publication_date>${video.publishedAt}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:view_count>${convertViewCountToNumber(video.viewCount)}</video:view_count>
      <video:uploader info="${baseUrl}">Africa Digital Media Institute</video:uploader>
      <video:tag>ADMI</video:tag>
      <video:tag>education</video:tag>
      <video:tag>creative media</video:tag>
      <video:live>no</video:live>
    </video:video>`
      })
      .filter(Boolean)
      .join('')}
  </url>
</urlset>`

    return res.status(200).send(sitemap)
  } catch (error) {
    console.error('❌ Video archive sitemap generation error:', error)
    return res.status(500).json({ error: 'Failed to generate video archive sitemap' })
  }
}
