const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}`,
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
})

async function findArticle() {
  try {
    console.log('Fetching recent blog posts...\n')

    // Get all recent blog posts
    const recent = await client.get('/entries', {
      params: {
        content_type: 'blogPost',
        order: '-sys.createdAt',
        limit: 50
      }
    })

    if (recent.data.items.length === 0) {
      console.log('No blog posts found')
      return
    }

    console.log(`Found ${recent.data.items.length} blog posts:\n`)

    // Look for the article
    let found = false
    recent.data.items.forEach((item, index) => {
      const article = item.fields
      const isPublished = item.sys.publishedVersion ? 'Published' : 'Draft'
      const title = article.title || 'No title'

      if (title.includes('Sketches') || title.includes('Studios') || title.includes('Animator')) {
        console.log(`>>> MATCH <<<`)
        found = true
      }

      console.log(`${index + 1}. ${title}`)
      console.log(`   Slug: ${article.slug || 'No slug'}`)
      console.log(`   Status: ${isPublished}`)
      console.log(`   Published: ${item.sys.publishedAt || 'Not published'}`)
      console.log()
    })

    if (!found) {
      console.log('\n❌ Article not found. It may not be published yet or the title is different.')
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
    process.exit(1)
  }
}

findArticle()
