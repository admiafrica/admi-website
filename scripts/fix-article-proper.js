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

async function fixArticle() {
  try {
    const entryId = '1ddR18DnZ6OIz6G19rIvDA'
    
    // Get PUBLISHED version from delivery API (has all fields)
    console.log('1. Getting published version from delivery API...')
    const publishedData = await deliveryClient.get(`/entries/${entryId}`)
    const publishedFields = publishedData.data.fields
    
    console.log('   Fields found:', Object.keys(publishedFields))
    
    // Get draft version from management API (to get current version number)
    console.log('\n2. Getting draft version from management API...')
    const draftData = await mgmtClient.get(`/entries/${entryId}`)
    const draftVersion = draftData.data.sys.version
    const draftFields = draftData.data.fields
    
    console.log('   Draft version:', draftVersion)
    console.log('   Draft fields:', Object.keys(draftFields))
    
    // Build proper locale-based update
    console.log('\n3. Building update with all fields...')
    const updatedFields = {}
    
    // Copy all fields from published version into proper locale structure
    Object.keys(publishedFields).forEach(fieldName => {
      const fieldValue = publishedFields[fieldName]
      if (fieldValue !== null && fieldValue !== undefined) {
        updatedFields[fieldName] = {
          'en-US': fieldValue
        }
      }
    })
    
    // Now update the category
    updatedFields.category = {
      'en-US': 'Resources'
    }
    
    console.log('   Fields to update:', Object.keys(updatedFields))
    
    // Update the entry
    console.log('\n4. Updating entry...')
    const updateResponse = await mgmtClient.put(`/entries/${entryId}`, {
      fields: updatedFields
    }, {
      headers: {
        'X-Contentful-Version': draftVersion
      }
    })
    
    const newVersion = updateResponse.data.sys.version
    console.log('   ✓ Entry updated, new version:', newVersion)
    
    // Publish the entry
    console.log('\n5. Publishing entry...')
    await mgmtClient.put(`/entries/${entryId}/published`, {}, {
      headers: {
        'X-Contentful-Version': newVersion
      }
    })
    
    console.log('   ✓ Entry published successfully!')
    console.log('\n✨ Article category changed to "Resources" and published!')
    console.log('   Article will now appear on: https://admi.africa/resources')
    
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data?.message || error.message)
    if (error.response?.data?.details?.errors) {
      console.error('Details:')
      error.response.data.details.errors.forEach((err, idx) => {
        console.error(`  ${idx + 1}. ${err.message || JSON.stringify(err)}`)
      })
    }
  }
}

fixArticle()
