import { GetServerSideProps } from 'next'

const NewsSitemap = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://admi.africa'

  try {
    // Fetch news articles from Contentful
    const newsResponse = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.ADMI_CONTENTFUL_SPACE_ID}/environments/${process.env.ADMI_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.ADMI_CONTENTFUL_ACCESS_TOKEN}&content_type=news&order=-sys.createdAt&limit=100`
    )
    const newsData = await newsResponse.json()

    // Generate news sitemap XML
    const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${(newsData.items || [])
    .filter((news: any) => news.fields?.slug && news.fields?.title)
    .map((news: any) => {
      const publishDate = new Date(news.sys.createdAt || news.sys.updatedAt)
      const title = news.fields.title || 'News Article'
      const keywords = news.fields.tags?.join(', ') || 'ADMI, news, education, creative media'
      
      return `
    <url>
      <loc>${baseUrl}/news/${news.fields.slug}</loc>
      <news:news>
        <news:publication>
          <news:name>Africa Digital Media Institute News</news:name>
          <news:language>en</news:language>
        </news:publication>
        <news:publication_date>${publishDate.toISOString()}</news:publication_date>
        <news:title>${escapeXml(title)}</news:title>
        <news:keywords>${escapeXml(keywords)}</news:keywords>
      </news:news>
    </url>`
    })
    .join('')}
</urlset>`

    res.setHeader('Content-Type', 'text/xml')
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate')
    res.write(newsSitemap)
    res.end()

  } catch (error) {
    console.error('Error generating news sitemap:', error)
    
    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
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

export default NewsSitemap