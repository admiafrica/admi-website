const axios = require('axios')

const DELIVERY_SPACE = 'qtu3mga6n6gc'
const DELIVERY_TOKEN = 'FVloClhmfLd5KMZPmkoEoLsgEqod5LB-MBjSh-1afrc'
const MANAGEMENT_SPACE = 'qtu3mga6n6gc'
const MANAGEMENT_TOKEN = 'CFPAT-U3mhKrmNy028PP7NyzBWVCS-cloXq5bA6lv05YFhOEs'

const deliveryClient = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${DELIVERY_SPACE}`,
  headers: { Authorization: `Bearer ${DELIVERY_TOKEN}` }
})

const managementClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${MANAGEMENT_SPACE}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

async function fixArticle() {
  try {
    const entryId = '1ddR18DnZ6OIz6G19rIvDA'

    // Get published version from delivery API
    const published = await deliveryClient.get(`/entries/${entryId}`)
    const publishedFields = published.data.fields

    console.log('Article analysis:')
    console.log('Title:', publishedFields.title ? '✓' : '✗')
    console.log('Slug:', publishedFields.slug ? '✓' : '✗')
    console.log('Summary:', publishedFields.summary ? '✓' : '✗')
    console.log('Body:', publishedFields.body ? '✓' : '✗')
    console.log('Category:', publishedFields.category ? '✓ (' + (publishedFields.category.sys?.id || 'linked') + ')' : '✗')
    console.log('Cover Image:', publishedFields.coverImage ? '✓' : '✗ MISSING!')
    console.log('Featured:', publishedFields.featured ? '✓' : '✗')

    if (!publishedFields.coverImage) {
      console.log('\n❌ Article is missing a cover image!')
      console.log('This is likely why it\'s not displaying on the website.')
      console.log('\nAction: Add a cover image in Contentful and republish.')
    }

    // Category appears to be a link, not a string
    if (publishedFields.category && publishedFields.category.sys) {
      console.log('\nCategory is a linked entry:', publishedFields.category.sys.id)
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
  }
}

fixArticle()
