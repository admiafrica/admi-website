const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

if (!SPACE_ID || !ACCESS_TOKEN || !MANAGEMENT_TOKEN) {
  console.error('Missing required Contentful env vars')
  console.error('ADMI_CONTENTFUL_SPACE_ID:', !!SPACE_ID)
  console.error('ADMI_CONTENTFUL_ACCESS_TOKEN:', !!ACCESS_TOKEN)
  console.error('CONTENTFUL_MANAGEMENT_TOKEN:', !!MANAGEMENT_TOKEN)
  process.exit(1)
}

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

async function updateCoursePrices() {
  try {
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

    for (const courseData of coursesToUpdate) {
      console.log(`\n📝 Processing: ${courseData.name}`)

      // First, search by slug using delivery API to get the ID
      const searchResponse = await deliveryClient.get('/entries', {
        params: {
          content_type: 'course',
          'fields.slug': courseData.slug,
          limit: 1
        }
      })

      if (searchResponse.data.items.length === 0) {
        console.log(`  ❌ Not found in Contentful`)
        continue
      }

      const courseId = searchResponse.data.items[0].sys.id

      // Now fetch the full entry with version from management API
      const course = await managementClient.get(`/entries/${courseId}`)
      const version = course.data.sys.version

      console.log(`  ✓ Found (ID: ${courseId}, Version: ${version})`)
      console.log(`  Current price: ${course.data.fields.tuitionFees || 'Not set'}`)
      console.log(`  Current category: ${course.data.fields.courseCategory || 'Not set'}`)

      // Prepare updated fields
      const updatedFields = {
        ...course.data.fields,
        tuitionFees: courseData.price
      }

      if (courseData.courseCategory) {
        updatedFields.courseCategory = courseData.courseCategory
      }

      // Update via management API
      const updateResponse = await managementClient.put(
        `/entries/${courseId}`,
        updatedFields,
        {
          headers: {
            'X-Contentful-Content-Type': 'course',
            'X-Contentful-Version': version
          }
        }
      )

      console.log(`  ✓ Updated price to: ${courseData.price}`)
      if (courseData.courseCategory) {
        console.log(`  ✓ Updated category to: ${courseData.courseCategory}`)
      }

      // Publish the entry
      const newVersion = updateResponse.data.sys.version
      await managementClient.put(
        `/entries/${courseId}/published`,
        {},
        {
          headers: {
            'X-Contentful-Version': newVersion
          }
        }
      )

      console.log(`  ✓ Published successfully`)
    }

    console.log('\n✅ All courses updated and published!')
  } catch (error) {
    if (error.response?.data) {
      console.error('\n❌ Error:', error.response.data)
    } else {
      console.error('\n❌ Error:', error.message)
    }
    process.exit(1)
  }
}

updateCoursePrices()
