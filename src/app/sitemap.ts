import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment variable - ensure it's properly formatted
  let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'

  // Ensure baseUrl doesn't have trailing slash and has proper protocol
  baseUrl = baseUrl.replace(/\/$/, '')
  if (!baseUrl.startsWith('http')) {
    baseUrl = `https://${baseUrl}`
  }

  console.log('Sitemap baseUrl:', baseUrl)

  // Core pages with African market focus
  const staticPages = [
    '',
    '/about',
    '/courses',
    '/news',
    '/contact',
    '/resources',
    '/events',
    '/admissions',
    '/careers',
    '/faculty',
    '/alumni',
    '/partners',
    '/facilities',
    '/africa', // African market page
    '/online-learning', // For remote African students
    '/scholarships' // African scholarship opportunities
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route === '/africa' ? 0.9 : 0.8
  }))

  // Add language-specific pages for African markets
  const languagePages = ['sw', 'fr', 'ar', 'pt'].flatMap((lang) =>
    ['', '/courses', '/about', '/contact'].map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  )

  // Fetch courses from Contentful
  let coursePages: any[] = []
  let videoWatchPages: any[] = []
  try {
    const coursesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=course`
    )
    const coursesData = await coursesResponse.json()

    if (coursesData.items) {
      coursePages = coursesData.items
        .filter((item: any) => item.fields?.slug) // Only include items with valid slugs
        .map((item: any) => {
          // Higher priority for diploma programs (2-year courses)
          const isDiploma =
            item.fields.awardLevel?.toLowerCase().includes('diploma') ||
            item.fields.programType?.fields?.duration?.includes('2 year')

          // Return simple sitemap entry without images to avoid [object Object] issues
          return {
            url: `${baseUrl}/courses/${item.fields.slug}`,
            lastModified: new Date(item.sys.updatedAt),
            changeFrequency: 'weekly' as const,
            priority: isDiploma ? 0.95 : 0.9 // Higher priority for diplomas
          }
        })

      // Generate video watch pages for courses with videos
      videoWatchPages = coursesData.items
        .filter((item: any) => item.fields?.slug && item.fields?.courseVideo) // Only courses with videos
        .map((item: any) => ({
          url: `${baseUrl}/watch/${item.fields.slug}`,
          lastModified: new Date(item.sys.updatedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.8 // High priority for video content
        }))
    }
  } catch (error) {
    console.error('Error fetching courses for sitemap:', error)
    // Ensure arrays are always defined
    coursePages = []
    videoWatchPages = []
  }

  // Fetch news articles from Contentful
  let newsPages: any[] = []
  try {
    const newsResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=article&fields.category[match]=News`
    )
    const newsData = await newsResponse.json()

    if (newsData.items) {
      newsPages = newsData.items
        .filter((item: any) => item.fields?.slug) // Only include items with valid slugs
        .map((item: any) => ({
          url: `${baseUrl}/news-events/news/${item.fields.slug}`,
          lastModified: new Date(item.sys.updatedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.7
        }))
    }
  } catch (error) {
    console.error('Error fetching news for sitemap:', error)
    // Ensure newsPages is always an array
    newsPages = []
  }

  // Fetch resources from Contentful
  let resourcePages: any[] = []
  try {
    const resourcesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=article&fields.category=Resources`
    )
    const resourcesData = await resourcesResponse.json()

    if (resourcesData.items) {
      resourcePages = resourcesData.items
        .filter((item: any) => item.fields?.slug) // Only include items with valid slugs
        .map((item: any) => ({
          url: `${baseUrl}/resources/${item.fields.slug}`,
          lastModified: new Date(item.sys.updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.6
        }))
    }
  } catch (error) {
    console.error('Error fetching resources for sitemap:', error)
    // Ensure resourcePages is always an array
    resourcePages = []
  }

  // Filter out any invalid entries and ensure all URLs are properly formatted
  const allPages = [
    ...staticPages,
    ...languagePages,
    ...coursePages,
    ...videoWatchPages,
    ...newsPages,
    ...resourcePages
  ]
    .filter((page) => page && page.url && typeof page.url === 'string')
    .map((page) => ({
      ...page,
      // Ensure URL is properly formatted
      url: page.url.replace(/\/$/, '') || baseUrl, // Just remove trailing slash, don't mess with protocol
      lastModified: page.lastModified || new Date(),
      changeFrequency: page.changeFrequency || 'monthly',
      priority: typeof page.priority === 'number' ? page.priority : 0.5
    }))

  console.log(`Generated sitemap with ${allPages.length} pages`)
  return allPages
}
