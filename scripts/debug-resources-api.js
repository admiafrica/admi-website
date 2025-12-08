const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE}`,
  headers: { Authorization: `Bearer ${TOKEN}` }
})

async function debug() {
  try {
    console.log('Testing Resources API filter...\n')

    // Test 1: Get all articles
    console.log('1. Getting ALL articles:')
    const allArticles = await client.get('/entries', {
      params: {
        content_type: 'article',
        limit: 100,
        skip: 0,
        select: 'fields.title,fields.slug,fields.category,sys.id'
      }
    })
    console.log(`Found ${allArticles.data.items.length} total articles`)
    allArticles.data.items.forEach(item => {
      const categoryLink = item.fields.category?.sys?.id || 'NO CATEGORY'
      console.log(`  - ${item.fields.title} (ID: ${item.sys.id}) → Category: ${categoryLink}`)
    })

    // Test 2: Get articles filtered by Resources category
    console.log('\n2. Getting articles with category=Resources:')
    const resourcesArticles = await client.get('/entries', {
      params: {
        content_type: 'article',
        'fields.category.sys.id': 'Resources',
        limit: 100,
        select: 'fields.title,fields.slug,fields.category,sys.id'
      }
    })
    console.log(`Found ${resourcesArticles.data.items.length} articles in Resources category`)
    resourcesArticles.data.items.forEach(item => {
      console.log(`  - ${item.fields.title}`)
    })

    // Test 3: Get the specific animator article
    console.log('\n3. Getting the animator article specifically:')
    const animatorArticle = await client.get('/entries/1ddR18DnZ6OIz6G19rIvDA', {
      params: {
        select: 'fields.title,fields.slug,fields.category,fields.coverImage,sys.id,sys.publishedAt'
      }
    })
    console.log('Article found:')
    console.log(`  Title: ${animatorArticle.data.fields.title}`)
    console.log(`  Slug: ${animatorArticle.data.fields.slug}`)
    console.log(`  Category ID: ${animatorArticle.data.fields.category?.sys?.id || 'NOT SET'}`)
    console.log(`  Category Name: ${animatorArticle.data.fields.category?.fields?.name || 'NOT SET'}`)
    console.log(`  Cover Image: ${animatorArticle.data.fields.coverImage?.sys?.id || 'NOT SET'}`)
    console.log(`  Published: ${animatorArticle.data.sys.publishedAt || 'NOT PUBLISHED'}`)

    // Test 4: List all available categories
    console.log('\n4. Available article categories:')
    const categories = await client.get('/entries', {
      params: {
        content_type: 'article_category',
        limit: 100,
        select: 'fields.name,sys.id'
      }
    })
    console.log(`Found ${categories.data.items.length} categories:`)
    categories.data.items.forEach(cat => {
      console.log(`  - ${cat.fields.name} (ID: ${cat.sys.id})`)
    })

  } catch (error) {
    console.error('Error:', error.response?.data?.message || error.message)
    if (error.response?.data) {
      console.error('Details:', error.response.data)
    }
  }
}

debug()
