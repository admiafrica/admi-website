import { GetServerSideProps } from 'next'
import { readVideoCache } from '@/utils/video-cache'

const VideoSitemap = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://admi.africa'

  try {
    // First, get all YouTube videos from cache to find course videos by title matching
    const cache = readVideoCache()
    const youtubeVideos = cache?.videos || []
    
    // Fetch courses from Contentful
    const coursesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=course&include=2`
    )
    const coursesData = await coursesResponse.json()

    // Helper function to resolve asset references
    const resolveAsset = (assetRef: any) => {
      if (!assetRef?.sys?.id || !coursesData.includes?.Asset) return null
      return coursesData.includes.Asset.find((asset: any) => asset.sys.id === assetRef.sys.id)
    }

    // Filter courses that have slugs (for watch pages)
    const coursesWithWatchPages = coursesData.items?.filter((course: any) => {
      return course.fields?.slug && course.fields?.name
    }) || []

    // Generate video sitemap XML for courses with watch pages
    const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${coursesWithWatchPages
    .map((course: any) => {
      const courseName = course.fields.name
      const coverImageAsset = resolveAsset(course.fields.coverImage)
      const thumbnailUrl = coverImageAsset?.fields?.file?.url
      
      // Try to find the corresponding YouTube video for this course
      const matchingVideo = youtubeVideos.find(video => 
        video.title.toLowerCase().includes(courseName.toLowerCase()) ||
        courseName.toLowerCase().includes(video.title.toLowerCase())
      )
      
      // If we have a matching YouTube video, use its data
      if (matchingVideo) {
        const description = course.fields.aboutTheCourse?.content?.[0]?.content?.[0]?.value || 
          matchingVideo.description ||
          `Watch the preview video for ${courseName} at Africa Digital Media Institute. Learn about the curriculum, facilities, and career opportunities.`
        
        return `
    <url>
      <loc>${baseUrl}/watch/${course.fields.slug}</loc>
      <video:video>
        <video:thumbnail_loc>${thumbnailUrl ? `https:${thumbnailUrl}` : matchingVideo.thumbnail.high || matchingVideo.thumbnail.medium}</video:thumbnail_loc>
        <video:title>${escapeXml(courseName)} - Course Preview</video:title>
        <video:description>${escapeXml(description.substring(0, 2048))}</video:description>
        <video:content_loc>https://www.youtube.com/watch?v=${matchingVideo.id}</video:content_loc>
        <video:player_loc>${baseUrl}/watch/${course.fields.slug}?embed=true</video:player_loc>
        <video:duration>${convertDurationToSeconds(matchingVideo.duration)}</video:duration>
        <video:publication_date>${matchingVideo.publishedAt}</video:publication_date>
        <video:family_friendly>yes</video:family_friendly>
        <video:requires_subscription>no</video:requires_subscription>
        <video:view_count>${convertViewCountToNumber(matchingVideo.viewCount)}</video:view_count>
        <video:live>no</video:live>
        <video:tag>education</video:tag>
        <video:tag>creative media</video:tag>
        <video:tag>ADMI course</video:tag>
        <video:tag>${escapeXml(course.fields.awardLevel || 'course')}</video:tag>
        <video:uploader info="${baseUrl}">Africa Digital Media Institute</video:uploader>
      </video:video>
    </url>`
      } else {
        // Fallback for courses without matching YouTube videos
        const description = course.fields.aboutTheCourse?.content?.[0]?.content?.[0]?.value || 
          `Watch the preview video for ${courseName} at Africa Digital Media Institute. Learn about the curriculum, facilities, and career opportunities.`
        
        return `
    <url>
      <loc>${baseUrl}/watch/${course.fields.slug}</loc>
      <video:video>
        <video:thumbnail_loc>${thumbnailUrl ? `https:${thumbnailUrl}` : `${baseUrl}/logo.png`}</video:thumbnail_loc>
        <video:title>${escapeXml(courseName)} - Course Preview</video:title>
        <video:description>${escapeXml(description.substring(0, 2048))}</video:description>
        <video:content_loc>${baseUrl}/watch/${course.fields.slug}</video:content_loc>
        <video:player_loc>${baseUrl}/watch/${course.fields.slug}?embed=true</video:player_loc>
        <video:duration>150</video:duration>
        <video:publication_date>${new Date(course.sys.updatedAt || course.sys.createdAt).toISOString().split('T')[0]}</video:publication_date>
        <video:family_friendly>yes</video:family_friendly>
        <video:requires_subscription>no</video:requires_subscription>
        <video:live>no</video:live>
        <video:tag>education</video:tag>
        <video:tag>creative media</video:tag>
        <video:tag>ADMI course</video:tag>
        <video:tag>${escapeXml(course.fields.awardLevel || 'course')}</video:tag>
        <video:uploader info="${baseUrl}">Africa Digital Media Institute</video:uploader>
      </video:video>
    </url>`
      }
    })
    .join('')}
</urlset>`

    res.setHeader('Content-Type', 'text/xml')
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
    res.write(videoSitemap)
    res.end()

  } catch (error) {
    console.error('Error generating video sitemap:', error)
    
    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
</urlset>`
    
    res.setHeader('Content-Type', 'text/xml')
    res.write(emptySitemap)
    res.end()
  }

  return { props: {} }
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Helper function to convert duration to seconds for sitemap
function convertDurationToSeconds(duration: string): number {
  if (!duration || duration === 'N/A') return 150 // Default to 2.5 minutes
  
  const parts = duration.split(':').map(Number)
  
  if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1]
  } else if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  
  return 150 // Default fallback
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

export default VideoSitemap