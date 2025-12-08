const axios = require('axios')

const SPACE = 'qtu3mga6n6gc'
const DELIVERY_TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'
const MGMT_TOKEN = 'CFPAT-U3mhKrmNy028PP7NyzBWVCS-cloXq5bA6lv05YFhOEs'

const deliveryClient = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE}`,
  headers: { Authorization: `Bearer ${DELIVERY_TOKEN}` }
})

const mgmtClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE}`,
  headers: {
    Authorization: `Bearer ${MGMT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

async function addTagsToArticle() {
  try {
    const entryId = '1ddR18DnZ6OIz6G19rIvDA'
    
    console.log('Adding tags to animator article...\n')
    
    // Get published version from delivery API (has all fields)
    const publishedData = await deliveryClient.get(`/entries/${entryId}`)
    const publishedFields = publishedData.data.fields
    
    // Get draft version from management API
    const draftData = await mgmtClient.get(`/entries/${entryId}`)
    const draftVersion = draftData.data.sys.version
    
    // Build proper locale-based update with all fields
    const updatedFields = {}
    Object.keys(publishedFields).forEach(fieldName => {
      const fieldValue = publishedFields[fieldName]
      if (fieldValue !== null && fieldValue !== undefined) {
        updatedFields[fieldName] = {
          'en-US': fieldValue
        }
      }
    })
    
    // Add relevant tags for animation article
    const tags = [
      'Animation',
      'Career Development',
      'Creative Skills',
      'ADMI Training',
      'Digital Art',
      'African Creatives',
      'Career Guide',
      'Industry Insights'
    ]
    
    updatedFields.tags = {
      'en-US': tags
    }
    
    console.log('Tags to add:')
    tags.forEach(tag => console.log(`  • ${tag}`))
    
    // Update the entry
    console.log('\nUpdating entry...')
    const updateResponse = await mgmtClient.put(`/entries/${entryId}`, {
      fields: updatedFields
    }, {
      headers: {
        'X-Contentful-Version': draftVersion
      }
    })
    
    const newVersion = updateResponse.data.sys.version
    console.log('✓ Entry updated, new version:', newVersion)
    
    // Publish the entry
    console.log('Publishing entry...')
    await mgmtClient.put(`/entries/${entryId}/published`, {}, {
      headers: {
        'X-Contentful-Version': newVersion
      }
    })
    
    console.log('✓ Entry published!')
    console.log('\n✨ Tags added to animator article successfully!')
    
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data?.message || error.message)
    if (error.response?.data?.details?.errors) {
      error.response.data.details.errors.forEach((err, idx) => {
        console.error(`  ${idx + 1}. ${err.message || JSON.stringify(err)}`)
      })
    }
  }
}

addTagsToArticle()
