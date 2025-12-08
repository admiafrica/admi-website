const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

const client = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

async function fixArticleCategory() {
  try {
    const entryId = '1ddR18DnZ6OIz6G19rIvDA'

    console.log('Fetching article...')
    const entry = await client.get(`/entries/${entryId}`)
    const version = entry.data.sys.version
    const fields = entry.data.fields

    console.log(`Current category: ${fields.category}`)

    // Update category to Resources
    const updatedFields = {
      ...fields,
      category: 'Resources'
    }

    console.log('Updating category to: Resources')
    const updateResp = await client.put(
      `/entries/${entryId}`,
      updatedFields,
      {
        headers: {
          'X-Contentful-Content-Type': 'article',
          'X-Contentful-Version': version
        }
      }
    )

    console.log('✓ Updated')

    // Publish the entry
    console.log('Publishing article...')
    await client.put(
      `/entries/${entryId}/published`,
      {},
      {
        headers: {
          'X-Contentful-Version': updateResp.data.sys.version
        }
      }
    )

    console.log('✓ Published')
    console.log('\n✅ Article fixed! It should now show on the website.')
    console.log(`URL: https://admi.africa/resources/animation-career-admi-training-africa`)
  } catch (error) {
    if (error.response?.data?.details?.errors) {
      console.error('Validation errors:')
      error.response.data.details.errors.forEach(e => {
        console.error(`  - ${e.details}`)
      })
    } else {
      console.error('Error:', error.response?.data?.message || error.message)
    }
    process.exit(1)
  }
}

fixArticleCategory()
