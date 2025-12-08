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

async function fixCategory() {
  try {
    const entryId = '1ddR18DnZ6OIz6G19rIvDA'
    
    // Get the current published entry
    console.log('1. Getting current entry...')
    const currentEntry = await client.get(`/entries/${entryId}`)
    const currentVersion = currentEntry.data.sys.version
    
    console.log('2. Current category:', currentEntry.data.fields.category)
    console.log('3. Current version:', currentVersion)
    
    // Update the category
    console.log('4. Updating category to "Resources"...')
    const updatedEntry = await client.put(`/entries/${entryId}`, {
      fields: {
        ...currentEntry.data.fields,
        category: {
          'en-US': 'Resources'  // Update to Resources
        }
      }
    }, {
      headers: {
        'X-Contentful-Version': currentVersion
      }
    })
    
    console.log('✓ Entry updated successfully')
    console.log('New version:', updatedEntry.data.sys.version)
    
    // Publish the entry
    console.log('\n5. Publishing entry...')
    const publishedEntry = await client.put(`/entries/${entryId}/published`, {}, {
      headers: {
        'X-Contentful-Version': updatedEntry.data.sys.version
      }
    })
    
    console.log('✓ Entry published successfully!')
    console.log('\nArticle should now appear on /resources page')
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
  }
}

fixCategory()
