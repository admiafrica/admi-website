const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE}`,
  headers: { Authorization: `Bearer ${TOKEN}` }
})

async function test() {
  try {
    console.log('Testing if article now appears in Resources filter...\n')
    
    const articles = await client.get('/entries', {
      params: {
        content_type: 'article',
        'fields.category': 'Resources',
        limit: 10
      }
    })
    
    console.log(`Found ${articles.data.items.length} articles in Resources category\n`)
    
    const animator = articles.data.items.find(a => a.sys.id === '1ddR18DnZ6OIz6G19rIvDA')
    if (animator) {
      console.log('✓ Found the animator article!')
      console.log('  Title:', animator.fields.title)
      console.log('  Slug:', animator.fields.slug)
      console.log('  Category:', animator.fields.category)
      console.log('\n✨ Article is now visible on the resources page!')
    } else {
      console.log('❌ Article not found in Resources category yet')
      console.log('Articles found:')
      articles.data.items.slice(0, 3).forEach(a => {
        console.log(`  - ${a.fields.title}`)
      })
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

test()
