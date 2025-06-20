import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Base URL from environment variable
    let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'
    baseUrl = baseUrl.replace(/\/$/, '')
    if (!baseUrl.startsWith('http')) {
      baseUrl = `https://${baseUrl}`
    }

    console.log('Resources sitemap baseUrl:', baseUrl)

    // Fetch resources from Contentful
    const resourcesResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=article&fields.category=Resources&order=-sys.createdAt&limit=1000&include=2`
    )

    if (!resourcesResponse.ok) {
      throw new Error(`Failed to fetch resources: ${resourcesResponse.status}`)
    }

    const resourcesData = await resourcesResponse.json()

    // Helper function to resolve asset references
    const resolveAsset = (assetRef: any) => {
      if (!assetRef?.sys?.id || !resourcesData.includes?.Asset) return null
      return resourcesData.includes.Asset.find((asset: any) => asset.sys.id === assetRef.sys.id)
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

    // Generate resources sitemap entries
    const resourceEntries =
      resourcesData.items
        ?.filter((item: any) => item.fields?.slug && item.fields?.title)
        .map((item: any) => {
          const slug = item.fields.slug
          const title = escapeXml(item.fields.title || '')
          const lastModified = new Date(item.sys.updatedAt).toISOString()

          // Extract description from content
          let description = ''
          if (item.fields.excerpt) {
            description = escapeXml(item.fields.excerpt.substring(0, 200))
          } else if (item.fields.summary) {
            description = escapeXml(item.fields.summary.substring(0, 200))
          } else if (item.fields.body?.content) {
            const textContent = item.fields.body.content
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

          // Determine priority based on content type
          const priority = item.fields.featured ? '0.8' : '0.6'

          return `  <url>
    <loc>${baseUrl}/resources/${slug}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title><![CDATA[${title}]]></image:title>
      <image:caption><![CDATA[${description}]]></image:caption>
    </image:image>
  </url>`
        })
        .join('\n') || ''

    const resourcesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${resourceEntries}
</urlset>`

    return new NextResponse(resourcesSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating resources sitemap:', error)

    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
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
