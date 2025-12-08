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
    name: 'ADMI - Music Production Diploma',
    price: 'KES 200,000'
  },
  {
    slug: 'sound-engineering-diploma',
    name: 'Sound Engineering Diploma',
    price: 'KES 150,000'
  },
  {
    slug: 'digital-content-creation-certificate',
    name: 'Digital Content Creation Certificate',
    price: 'KES 50,000',
    courseCategory: 'professional-certificate'
  },
  {
    slug: 'digital-marketing-certificate',
    name: 'Digital Marketing Certificate',
    price: 'KES 80,000',
    courseCategory: 'professional-certificate'
  }
]

async function updateCoursePrices() {
  try {
    for (const courseData of coursesToUpdate) {
      console.log(`\n📝 Processing: ${courseData.name}`)

      // Fetch from delivery API to get ID
      const searchResponse = await deliveryClient.get('/entries', {
        params: {
          content_type: 'course',
          'fields.slug': courseData.slug,
          limit: 1
        }
      })

      if (searchResponse.data.items.length === 0) {
        console.log(`  ❌ Not found`)
        continue
      }

      const courseId = searchResponse.data.items[0].sys.id

      // Fetch full entry from management API to get version
      const entry = await managementClient.get(`/entries/${courseId}`)
      const version = entry.data.sys.version
      const currentFields = entry.data.fields

      console.log(`  ✓ Found (ID: ${courseId})`)
      console.log(`  Current price: ${currentFields.tuitionFees || 'Not set'}`)

      // Update only the fields we need
      const updatePayload = {
        ...currentFields,
        tuitionFees: courseData.price
      }

      if (courseData.courseCategory) {
        updatePayload.courseCategory = courseData.courseCategory
        console.log(`  Current category: ${currentFields.courseCategory || 'Not set'}`)
      }

      // Try update
      const updateResponse = await managementClient.put(
        `/entries/${courseId}`,
        updatePayload,
        {
          headers: {
            'X-Contentful-Content-Type': 'course',
            'X-Contentful-Version': version
          }
        }
      )

      console.log(`  ✓ Updated - new version: ${updateResponse.data.sys.version}`)

      // Publish
      const publishResponse = await managementClient.put(
        `/entries/${courseId}/published`,
        {},
        {
          headers: {
            'X-Contentful-Version': updateResponse.data.sys.version
          }
        }
      )

      console.log(`  ✓ Published successfully`)
    }

    console.log('\n✅ All courses processed!')
  } catch (error) {
    if (error.response?.data?.details?.errors) {
      console.error('\n❌ Validation errors:')
      error.response.data.details.errors.forEach(err => {
        console.error('  -', err.message || JSON.stringify(err))
      })
    } else if (error.response?.data) {
      console.error('\n❌ Error:', error.response.data.message || JSON.stringify(error.response.data))
    } else {
      console.error('\n❌ Error:', error.message)
    }
    process.exit(1)
  }
}

updateCoursePrices()
