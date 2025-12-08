const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE}`,
  headers: { Authorization: `Bearer ${TOKEN}` }
})

async function verify() {
  try {
    const article = await client.get('/entries/1ddR18DnZ6OIz6G19rIvDA')
    const tags = article.data.fields.tags
    
    console.log('✓ Article tags:\n')
    tags.forEach(tag => console.log(`  • ${tag}`))
    console.log(`\nTotal tags: ${tags.length}`)
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

verify()
