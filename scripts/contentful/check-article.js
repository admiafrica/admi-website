const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}`,
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
})

async function checkArticle() {
  try {
    const entryId = '1ddR18DnZ6OIz6G19rIvDA'

    console.log(`Fetching article: ${entryId}\n`)

    const response = await client.get(`/entries/${entryId}`)
    const article = response.data.fields
    const sys = response.data.sys

    console.log('Article Details:')
    console.log(`Title: ${article.title}`)
    console.log(`Slug: ${article.slug}`)
    console.log(`Status: ${sys.publishedVersion ? 'PUBLISHED ✓' : 'DRAFT (Not published)'}`)
    console.log(`Created: ${sys.createdAt}`)
    console.log(`Published At: ${sys.publishedAt || 'Not published'}`)
    console.log(`Entry ID: ${sys.id}`)
    console.log(`Version: ${sys.version}`)

    if (!sys.publishedVersion) {
      console.log('\n⚠️  Article is NOT published - it will not show on the website!')
      console.log('Action: Publish the article in Contentful')
    } else {
      console.log('\n✓ Article is published')
      console.log(`Published URL: https://admi.africa/resources/${article.slug}`)

      // Check if article has content
      if (!article.body || !article.body.content || article.body.content.length === 0) {
        console.log('\n⚠️  Article has no body content!')
      }

      if (!article.excerpt) {
        console.log('\n⚠️  Article has no excerpt (summary)')
      }

      if (!article.featuredImage) {
        console.log('\n⚠️  Article has no featured image')
      }
    }

    console.log('\nFull article metadata:')
    console.log(JSON.stringify(article, null, 2))
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
    process.exit(1)
  }
}

checkArticle()
