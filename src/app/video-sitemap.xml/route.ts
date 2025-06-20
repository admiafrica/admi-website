import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'

  try {
    // Fetch courses with videos from Contentful
    const coursesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=course&include=2`
    )
    const coursesData = await coursesResponse.json()

    if (!coursesData.items) {
      throw new Error('No courses found')
    }

    // Helper function to resolve asset references
    const resolveAsset = (assetRef: any) => {
      if (!assetRef?.sys?.id || !coursesData.includes?.Asset) return null
      return coursesData.includes.Asset.find((asset: any) => asset.sys.id === assetRef.sys.id)
    }

    // Filter courses that have valid video files (resolve asset references)
    const coursesWithVideos = coursesData.items.filter((course: any) => {
      if (!course.fields?.slug || !course.fields?.courseVideo) return false

      const videoAsset = resolveAsset(course.fields.courseVideo)
      return videoAsset?.fields?.file?.url
    })

    console.log(`Total courses: ${coursesData.items.length}`)
    console.log(`Courses with videos: ${coursesWithVideos.length}`)

    // If no courses with videos, return empty sitemap
    if (coursesWithVideos.length === 0) {
      console.log('No courses with videos found')
      const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
</urlset>`

      return new NextResponse(emptySitemap, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=300, s-maxage=300'
        }
      })
    }

    // Helper function to escape XML entities and handle special characters
    const escapeXml = (str: string) => {
      if (!str) return ''
      return (
        str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;')
          // Remove or replace other problematic characters
          .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
          .replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD]/g, '')
      ) // Keep only valid XML characters
    }

    // Generate video sitemap XML
    const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${coursesWithVideos
  .map((course: any) => {
    const slug = course.fields.slug
    const videoAsset = resolveAsset(course.fields.courseVideo)
    const coverImageAsset = resolveAsset(course.fields.coverImage)

    // Safely extract and clean all content
    const courseName = course.fields.name || 'Course'
    const awardLevel = course.fields.awardLevel || 'course'

    const videoTitle = `${courseName} - Course Preview`
    const videoDescription = `Watch this comprehensive preview of ${courseName} at Africa Digital Media Institute. Learn about the curriculum, facilities, career opportunities, and what makes this ${awardLevel} program special.`

    const thumbnailUrl = coverImageAsset?.fields?.file?.url
      ? `https:${coverImageAsset.fields.file.url}`
      : `${baseUrl}/logo.png`
    const contentUrl = `https:${videoAsset.fields.file.url}`
    const watchPageUrl = `${baseUrl}/watch/${slug}`
    // For player_loc, we'll use the watch page URL which contains the video player
    const playerUrl = watchPageUrl
    const lastModified = new Date(course.sys.updatedAt).toISOString()

    return `  <url>
    <loc>${watchPageUrl}</loc>
    <lastmod>${lastModified}</lastmod>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title><![CDATA[${videoTitle}]]></video:title>
      <video:description><![CDATA[${videoDescription}]]></video:description>
      <video:content_loc>${contentUrl}</video:content_loc>
      <video:player_loc>${playerUrl}</video:player_loc>
      <video:duration>150</video:duration>
      <video:publication_date>${lastModified}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${baseUrl}">Africa Digital Media Institute</video:uploader>
      <video:live>no</video:live>
      <video:requires_subscription>no</video:requires_subscription>
      <video:category>Education</video:category>
      <video:tag>education</video:tag>
      <video:tag>course preview</video:tag>
      <video:tag>ADMI</video:tag>
      <video:tag>${escapeXml(course.fields.slug)}</video:tag>
      <video:tag>Kenya</video:tag>
      <video:tag>Africa</video:tag>
      <video:tag>digital media</video:tag>
      <video:tag>creative training</video:tag>
    </video:video>
  </url>`
  })
  .join('\n')}
</urlset>`

    return new NextResponse(videoSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating video sitemap:', error)

    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
</urlset>`

    return new NextResponse(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300'
      }
    })
  }
}
