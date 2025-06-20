import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Base URL from environment variable
    let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'
    baseUrl = baseUrl.replace(/\/$/, '')
    if (!baseUrl.startsWith('http')) {
      baseUrl = `https://${baseUrl}`
    }

    console.log('News sitemap baseUrl:', baseUrl)

    // Fetch news articles from Contentful
    const newsResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=article&fields.category[match]=News&order=-sys.createdAt&limit=1000&include=2`
    )

    if (!newsResponse.ok) {
      throw new Error(`Failed to fetch news: ${newsResponse.status}`)
    }

    const newsData = await newsResponse.json()

    // Helper function to resolve asset references
    const resolveAsset = (assetRef: any) => {
      if (!assetRef?.sys?.id || !newsData.includes?.Asset) return null
      return newsData.includes.Asset.find((asset: any) => asset.sys.id === assetRef.sys.id)
    }

    // Helper function to escape XML special characters
    const escapeXml = (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    }

    // Generate news sitemap entries
    const newsEntries =
      newsData.items
        ?.filter((item: any) => item.fields?.slug && item.fields?.title)
        .map((item: any) => {
          const slug = item.fields.slug
          const title = escapeXml(item.fields.title || '')
          const lastModified = new Date(item.sys.updatedAt).toISOString()
          const publishDate = item.fields.publishDate
            ? new Date(item.fields.publishDate).toISOString()
            : new Date(item.sys.createdAt).toISOString()

          // Extract description from content
          let description = ''
          if (item.fields.excerpt) {
            description = escapeXml(item.fields.excerpt.substring(0, 200))
          } else if (item.fields.content?.content) {
            const textContent = item.fields.content.content
              .map((block: any) => block.content?.map((content: any) => content.value).join(' '))
              .join(' ')
              .substring(0, 200)
            description = escapeXml(textContent)
          }

          // Get featured image using asset resolution
          const featuredImageAsset = resolveAsset(item.fields.featuredImage)
          const coverImageAsset = resolveAsset(item.fields.coverImage)

          const imageUrl = featuredImageAsset?.fields?.file?.url
            ? `https:${featuredImageAsset.fields.file.url}`
            : coverImageAsset?.fields?.file?.url
              ? `https:${coverImageAsset.fields.file.url}`
              : `${baseUrl}/logo.png`

          return `  <url>
    <loc>${baseUrl}/news-events/news/${slug}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <news:news>
      <news:publication>
        <news:name>Africa Digital Media Institute</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${publishDate}</news:publication_date>
      <news:title><![CDATA[${title}]]></news:title>
      <news:keywords>ADMI, Africa Digital Media Institute, creative media, technology training, digital media education, Kenya, Africa</news:keywords>
    </news:news>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title><![CDATA[${title}]]></image:title>
      <image:caption><![CDATA[${description}]]></image:caption>
    </image:image>
  </url>`
        })
        .join('\n') || ''

    const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${newsEntries}
</urlset>`

    return new NextResponse(newsSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating news sitemap:', error)

    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
</urlset>`

    return new NextResponse(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300'
      }
    })
  }
}
