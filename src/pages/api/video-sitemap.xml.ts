import type { NextApiRequest, NextApiResponse } from 'next'
import { readVideoCache } from '@/utils/video-cache'

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

    // Get all cached videos from YouTube channel
    const cache = readVideoCache()

    if (!cache || !cache.videos || cache.videos.length === 0) {
      // Return empty sitemap if no videos found
      const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
</urlset>`

      return res.status(200).send(emptySitemap)
    }

    const baseUrl = 'https://admi.africa'
    const videos = cache.videos

    // Generate video sitemap XML with all YouTube videos
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${baseUrl}/videos</loc>
    <lastmod>${cache.lastUpdated || new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    ${videos
      .map(
        (video) => `
    <video:video>
      <video:thumbnail_loc>${video.thumbnail.high || video.thumbnail.medium || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${video.description.substring(0, 2048)}]]></video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${video.id}</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/${video.id}</video:player_loc>
      <video:duration>${convertDurationToSeconds(video.duration)}</video:duration>
      <video:publication_date>${video.publishedAt}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:view_count>${convertViewCountToNumber(video.viewCount)}</video:view_count>
      <video:uploader info="${baseUrl}">Africa Digital Media Institute</video:uploader>
      <video:tag>ADMI</video:tag>
      <video:tag>education</video:tag>
      <video:tag>creative media</video:tag>
      <video:live>no</video:live>
    </video:video>`
      )
      .join('')}
  </url>
</urlset>`

    return res.status(200).send(sitemap)
  } catch (error) {
    console.error('❌ Video sitemap generation error:', error)
    return res.status(500).json({ error: 'Failed to generate video sitemap' })
  }
}

// Helper function to convert duration to seconds for sitemap
function convertDurationToSeconds(duration: string): number {
  if (!duration || duration === 'N/A') return 0

  const parts = duration.split(':').map(Number)

  if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1]
  } else if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }

  return 0
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
