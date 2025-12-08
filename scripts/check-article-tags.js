const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE}`,
  headers: { Authorization: `Bearer ${TOKEN}` }
})

async function checkArticleStructure() {
  try {
    console.log('Checking article content type structure...\n')
    
    const contentType = await client.get('/content_types/article')
    const fields = contentType.data.fields
    
    console.log('Available fields in article:')
    fields.forEach(field => {
      console.log(`  - ${field.id} (${field.type}${field.items ? ` of ${field.items.type}` : ''})`)
    })
    
    const tagsField = fields.find(f => f.id === 'tags')
    if (tagsField) {
      console.log('\n✓ Tags field exists!')
      console.log('  Type:', tagsField.type)
      console.log('  Items:', tagsField.items)
    } else {
      console.log('\n❌ No tags field found in content type')
    }
    
  } catch (error) {
    console.error('Error:', error.response?.data?.message || error.message)
  }
}

checkArticleStructure()
