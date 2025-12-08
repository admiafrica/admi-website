const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const MGMT_TOKEN = 'CFPAT-U3mhKrmNy028PP7NyzBWVCS-cloXq5bA6lv05YFhOEs'

const client = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE}`,
  headers: {
    Authorization: `Bearer ${MGMT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

async function addTagsField() {
  try {
    console.log('Getting article content type...')
    const response = await client.get('/content_types/article')
    const contentType = response.data
    const currentVersion = contentType.sys.version
    
    console.log('Current version:', currentVersion)
    console.log('Current fields:', contentType.fields.map(f => f.id))
    
    // Check if tags already exists
    if (contentType.fields.find(f => f.id === 'tags')) {
      console.log('✓ Tags field already exists!')
      return
    }
    
    console.log('\nAdding tags field...')
    
    // Add tags field
    contentType.fields.push({
      id: 'tags',
      name: 'Tags',
      type: 'Array',
      items: {
        type: 'Symbol'
      },
      required: false,
      localized: false
    })
    
    // Update content type
    const updateResponse = await client.put('/content_types/article', contentType, {
      headers: {
        'X-Contentful-Version': currentVersion
      }
    })
    
    console.log('✓ Content type updated')
    const newVersion = updateResponse.data.sys.version
    
    // Publish the content type
    console.log('Publishing content type...')
    await client.put('/content_types/article/published', {}, {
      headers: {
        'X-Contentful-Version': newVersion
      }
    })
    
    console.log('✓ Content type published!')
    console.log('\n✨ Tags field has been added to article content type')
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
    if (error.response?.data?.details) {
      console.error('Details:', error.response.data.details)
    }
  }
}

addTagsField()
