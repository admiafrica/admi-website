import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL from environment variable
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'
  
  // Core pages
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
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Fetch courses from Contentful
  let coursePages: MetadataRoute.SitemapEntry[] = []
  try {
    const coursesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=course`
    )
    const coursesData = await coursesResponse.json()

    if (coursesData.items) {
      coursePages = coursesData.items.map((item: any) => ({
        url: `${baseUrl}/courses/${item.fields.slug}`,
        lastModified: new Date(item.sys.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        // Add image extension for courses
        images: [
          {
            loc: `https:${item.fields.coverImage?.fields?.file?.url}`,
            title: item.fields.name,
          }
        ]
      }))
    }
  } catch (error) {
    console.error('Error fetching courses for sitemap:', error)
  }

  // Fetch news articles from Contentful
  let newsPages: any[] = []
  try {
    const newsResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=article`
    )
    const newsData = await newsResponse.json()

    if (newsData.items) {
      newsPages = newsData.items.map((item: any) => ({
        url: `${baseUrl}/news/${item.fields.slug}`,
        lastModified: new Date(item.sys.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        // Add image extension for news articles
        images: [
          {
            loc: `https:${item.fields.featuredImage?.fields?.file?.url}`,
            title: item.fields.title,
          }
        ]
      }))
    }
  } catch (error) {
    console.error('Error fetching news for sitemap:', error)
  }

  // Fetch resources from Contentful
  let resourcePages: any[] = []
  try {
    const resourcesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=resource`
    )
    const resourcesData = await resourcesResponse.json()

    if (resourcesData.items) {
      resourcePages = resourcesData.items.map((item: any) => ({
        url: `${baseUrl}/resources/${item.fields.slug}`,
        lastModified: new Date(item.sys.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    console.error('Error fetching resources for sitemap:', error)
  }

  return [...staticPages, ...coursePages, ...newsPages, ...resourcePages]
}
