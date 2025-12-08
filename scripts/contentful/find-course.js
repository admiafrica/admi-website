const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.error('Missing ADMI_CONTENTFUL_SPACE_ID or ADMI_CONTENTFUL_ACCESS_TOKEN')
  process.exit(1)
}

const client = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
})

async function findCourse() {
  try {
    console.log('Searching for Digital Content Creation Certificate...\n')

    const response = await client.get('/entries', {
      params: {
        content_type: 'course',
        'fields.slug': 'digital-content-creation-certificate',
        include: 2,
        limit: 1
      }
    })

    if (response.data.items.length === 0) {
      console.log('❌ Course not found')
      return
    }

    const course = response.data.items[0]
    console.log('Course found:\n')
    console.log(JSON.stringify(course.fields, null, 2))
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
    process.exit(1)
  }
}

findCourse()
