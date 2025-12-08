const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Missing ADMI_CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN')
  process.exit(1)
}

const client = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

const coursesToUpdate = [
  {
    name: 'ADMI - Music Production Diploma',
    price: 'KES 200,000'
  },
  {
    name: 'Sound Engineering Diploma',
    price: 'KES 150,000' // You may need to confirm this price
  },
  {
    name: 'Digital Marketing Certificate',
    price: 'KES 80,000'
  }
]

async function updateCoursePrices() {
  try {
    console.log('Fetching courses from Contentful...')

    // Fetch all courses
    const coursesResponse = await client.get('/entries', {
      params: {
        content_type: 'course',
        include: 2,
        limit: 100
      }
    })

    const courses = coursesResponse.data.items

    for (const courseToUpdate of coursesToUpdate) {
      // Find the course
      const course = courses.find(c => c.fields.title?.includes(courseToUpdate.name))

      if (!course) {
        console.log(`❌ Course not found: ${courseToUpdate.name}`)
        continue
      }

      console.log(`\nUpdating: ${courseToUpdate.name}`)
      console.log(`Current tuitionFees: ${course.fields.tuitionFees}`)
      console.log(`New tuitionFees: ${courseToUpdate.price}`)

      // Update the course
      const updatedCourse = {
        ...course.fields,
        tuitionFees: courseToUpdate.price
      }

      const updateResponse = await client.put(`/entries/${course.sys.id}`, updatedCourse, {
        headers: {
          'X-Contentful-Content-Type': 'course',
          'X-Contentful-Version': course.sys.version
        }
      })

      console.log(`✅ Updated successfully`)

      // Publish the entry
      await client.put(`/entries/${course.sys.id}/published`, {}, {
        headers: {
          'X-Contentful-Version': updateResponse.data.sys.version
        }
      })

      console.log(`✅ Published successfully`)
    }

    console.log('\n✅ All courses updated and published!')
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
    process.exit(1)
  }
}

updateCoursePrices()
