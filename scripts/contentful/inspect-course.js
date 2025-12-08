const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

const managementClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

async function inspectCourse() {
  try {
    // Get a course to inspect its structure - use delivery API which has published data
    const deliveryClient = axios.create({
      baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}`,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    })

    const courseId = '37hfuxxEHu46oVX6SFIOgI' // Music Production Diploma

    const course = await deliveryClient.get(`/entries/${courseId}`)
    console.log('Course from delivery API:')
    console.log(JSON.stringify(course.data.fields, null, 2))
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
  }
}

inspectCourse()
