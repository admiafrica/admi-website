import type { NextApiRequest, NextApiResponse } from 'next'
import { readVideoCache } from '@/utils/video-cache'

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

// Helper to convert ISO 8601 duration to seconds
const convertISO8601ToSeconds = (duration: string): number => {
  if (!duration || typeof duration !== 'string') return 0
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0

  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')

  return hours * 3600 + minutes * 60 + seconds
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
    res.setHeader('X-Content-Type-Options', 'nosniff')

    const cache = readVideoCache()

    if (!cache || !cache.videos || cache.videos.length === 0) {
      const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
</urlset>`
      return res.status(200).send(emptySitemap)
    }

    const baseUrl = 'https://admi.africa'
    const videos = cache.videos

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos
  .map((video) => {
    const pageUrl = `${baseUrl}/videos?id=${video.id}`
    const embedUrl = `https://www.youtube.com/embed/${video.id}`
    const thumbnailUrl = escapeXml(video.thumbnail.high || video.thumbnail.medium)
    const duration = convertISO8601ToSeconds(video.duration)

    if (duration === 0) {
      return null // Skip videos with invalid duration
    }

    return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <lastmod>${new Date(video.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title><![CDATA[${sanitizeForCDATA(video.title)}]]></video:title>
      <video:description><![CDATA[${sanitizeForCDATA(video.description.substring(0, 2048))}]]></video:description>
      <video:player_loc>${escapeXml(embedUrl)}</video:player_loc>
      <video:duration>${duration}</video:duration>
      <video:publication_date>${video.publishedAt}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:view_count>${convertViewCountToNumber(video.viewCount)}</video:view_count>
      <video:uploader info="${baseUrl}">Africa Digital Media Institute</video:uploader>
      ${(video.tags || ['ADMI', 'education', 'creative media'])
        .slice(0, 32)
        .map((tag) => `      <video:tag>${escapeXml(tag)}</video:tag>`)
        .join('\n')}
      <video:live>no</video:live>
    </video:video>
  </url>`
  })
  .filter(Boolean)
  .join('\n')}
</urlset>`

    return res.status(200).send(sitemap)
  } catch (error) {
    console.error('❌ Video sitemap generation error:', error)
    return res.status(500).json({ error: 'Failed to generate video sitemap' })
  }
}

function convertViewCountToNumber(viewCount: string): number {
  if (!viewCount || viewCount === 'N/A') return 0
  const cleanCount = viewCount.replace(/[^\d.]/g, '')
  const num = parseFloat(cleanCount)
  if (viewCount.includes('M')) return Math.floor(num * 1000000)
  if (viewCount.includes('K')) return Math.floor(num * 1000)
  return Math.floor(num) || 0
}
