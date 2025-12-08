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

async function checkValidation() {
  try {
    const entryId = '1ddR18DnZ6OIz6G19rIvDA'
    
    // Get the current entry
    console.log('Getting entry...')
    const response = await client.get(`/entries/${entryId}`)
    const entry = response.data
    
    console.log('\nEntry fields:')
    Object.keys(entry.fields).forEach(key => {
      const val = entry.fields[key]
      if (typeof val === 'object' && val['en-US'] !== undefined) {
        if (typeof val['en-US'] === 'object') {
          console.log(`  ${key}: [object] ${JSON.stringify(val['en-US']).substring(0, 50)}...`)
        } else {
          console.log(`  ${key}: ${val['en-US']?.substring?.(0, 80) || val['en-US']}`)
        }
      } else {
        console.log(`  ${key}: [missing locale]`)
      }
    })
    
    // Try to publish
    console.log('\nAttempting to publish...')
    try {
      await client.put(`/entries/${entryId}/published`, {}, {
        headers: {
          'X-Contentful-Version': entry.sys.version
        }
      })
      console.log('✓ Published successfully!')
    } catch (publishError) {
      console.log('✗ Publish failed with errors:')
      const errors = publishError.response?.data?.details?.errors || []
      errors.forEach((err, idx) => {
        console.log(`  ${idx + 1}. ${err.details?.value?.[0] || err.message}`)
        console.log(`     Field: ${err.path?.join('.')}`)
      })
    }
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
  }
}

checkValidation()
