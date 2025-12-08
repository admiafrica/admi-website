const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

const deliveryClient = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
})

const managementClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

const coursesToUpdate = [
  {
    slug: 'music-production-diploma',
    price: 'KES 200,000'
  },
  {
    slug: 'sound-engineering-diploma',
    price: 'KES 150,000'
  },
  {
    slug: 'digital-content-creation-certificate',
    price: 'KES 50,000'
  },
  {
    slug: 'digital-marketing-certificate',
    price: 'KES 80,000'
  }
]

async function updatePrices() {
  try {
    for (const courseData of coursesToUpdate) {
      console.log(`\n📝 ${courseData.slug}`)

      // Get published entry with full fields
      const searchResponse = await deliveryClient.get('/entries', {
        params: {
          content_type: 'course',
          'fields.slug': courseData.slug
        }
      })

      if (searchResponse.data.items.length === 0) {
        console.log('  ❌ Not found')
        continue
      }

      const publishedEntry = searchResponse.data.items[0]
      const courseId = publishedEntry.sys.id

      // Get management API version
      const mgmtEntry = await managementClient.get(`/entries/${courseId}`)
      const version = mgmtEntry.data.sys.version

      console.log(`  Current price: ${publishedEntry.fields.tuitionFees}`)

      // Build update - convert delivery API links to management format
      const updatePayload = {
        ...publishedEntry.fields
      }
      
      // Convert linked entries/assets from delivery API to management API format
      Object.keys(updatePayload).forEach(key => {
        if (updatePayload[key]?.sys?.type === 'Link') {
          // Already in link format, good
        } else if (Array.isArray(updatePayload[key])) {
          updatePayload[key] = updatePayload[key].map(item => 
            item?.sys?.type === 'Link' ? item : 
            (item?.sys ? { sys: { type: 'Link', linkType: item.sys.linkType, id: item.sys.id } } : item)
          )
        }
      })

      updatePayload.tuitionFees = courseData.price

      console.log(`  Payload keys: ${Object.keys(updatePayload).join(', ').substring(0, 100)}`)

      // Update
      const updateResp = await managementClient.put(
        `/entries/${courseId}`,
        updatePayload,
        {
          headers: {
            'X-Contentful-Content-Type': 'course',
            'X-Contentful-Version': version
          }
        }
      )

      console.log(`  ✓ Updated to: ${courseData.price}`)

      // Publish
      await managementClient.put(
        `/entries/${courseId}/published`,
        {},
        {
          headers: {
            'X-Contentful-Version': updateResp.data.sys.version
          }
        }
      )

      console.log(`  ✓ Published`)
    }

    console.log('\n✅ Done!')
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data?.message || error.message)
    if (error.response?.data?.details?.errors) {
      error.response.data.details.errors.slice(0, 3).forEach(e => {
        console.error('  -', e.details)
      })
    }
    process.exit(1)
  }
}

updatePrices()
