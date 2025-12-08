const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'
const MGMT_TOKEN = 'CFPAT-U3mhKrmNy028PP7NyzBWVCS-cloXq5bA6lv05YFhOEs'

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE}`,
  headers: { Authorization: `Bearer ${TOKEN}` }
})

const mgmtClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE}`,
  headers: {
    Authorization: `Bearer ${MGMT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

async function debug() {
  try {
    // Step 1: Check what field types exist on article
    console.log('1. Getting article content type definition:')
    const contentType = await client.get('/content_types/article')
    const categoryField = contentType.data.fields.find(f => f.id === 'category')
    console.log('Category field definition:')
    console.log('  Type:', categoryField?.type)
    console.log('  LinkType:', categoryField?.linkType)
    console.log('  Validations:', categoryField?.validations)
    console.log()

    // Step 2: Get the Resources category entry
    console.log('2. Finding Resources category:')
    const categories = await client.get('/entries', {
      params: {
        content_type: 'article_category',
        'fields.name': 'Resources',
        limit: 10
      }
    })
    console.log(`Found ${categories.data.items.length} Resources categories:`)
    if (categories.data.items.length > 0) {
      const resourcesCat = categories.data.items[0]
      console.log('  ID:', resourcesCat.sys.id)
      console.log('  Name:', resourcesCat.fields.name)
    }
    console.log()

    // Step 3: Check specific article structure
    console.log('3. Checking animator article raw structure:')
    const article = await client.get('/entries/1ddR18DnZ6OIz6G19rIvDA', {
      params: { include: 2 }
    })
    console.log('Fields available:')
    Object.keys(article.data.fields).forEach(key => {
      const val = article.data.fields[key]
      if (val?.sys?.id) {
        console.log(`  ${key}: linked to ${val.sys.id}`)
      } else if (typeof val === 'object') {
        console.log(`  ${key}: ${JSON.stringify(val).substring(0, 50)}...`)
      } else {
        console.log(`  ${key}: ${val?.substring?.(0, 50) || val}`)
      }
    })
    console.log()

    // Step 4: Check if category field is being used at all
    console.log('4. Checking how many articles have a category set:')
    const allArticles = await client.get('/entries', {
      params: {
        content_type: 'article',
        limit: 200
      }
    })
    const withCategory = allArticles.data.items.filter(a => a.fields.category)
    console.log(`Articles with category: ${withCategory.length}/${allArticles.data.items.length}`)
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
  }
}

debug()
