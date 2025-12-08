const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

const deliveryClient = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}`,
  headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
})

const managementClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/json'
  }
})

const updates = [
  { slug: 'music-production-diploma', price: 'KES 200,000' },
  { slug: 'sound-engineering-diploma', price: 'KES 150,000' },
  { slug: 'digital-content-creation-certificate', price: 'KES 50,000' },
  { slug: 'digital-marketing-certificate', price: 'KES 80,000' }
]

async function run() {
  try {
    for (const update of updates) {
      console.log(`\n📝 ${update.slug}`)

      // Get ID from delivery API
      const search = await deliveryClient.get('/entries', {
        params: { content_type: 'course', 'fields.slug': update.slug }
      })

      if (search.data.items.length === 0) {
        console.log('  ❌ Not found')
        continue
      }

      const id = search.data.items[0].sys.id
      const published = search.data.items[0].fields

      console.log(`  Current: ${published.tuitionFees}`)

      // Get draft version
      const draft = await managementClient.get(`/entries/${id}`)
      const version = draft.data.sys.version

      // Only update the simple fields we know about
      const payload = {
        slug: published.slug,
        name: published.name,
        tuitionFees: update.price,
        awardLevel: published.awardLevel,
        creditHours: published.creditHours,
        coverImage: published.coverImage,
        programType: published.programType,
        intakes: published.intakes || [],
        description: published.description,
        aboutTheCourse: published.aboutTheCourse,
        learningOutcomes: published.learningOutcomes || {},
        careerOptions: published.careerOptions,
        courseVideo: published.courseVideo,
        courseBenefits: published.courseBenefits || [],
        courseLeadersMentors: published.courseLeadersMentors || [],
        faqs: published.faqs || [],
        applicationProcesses: published.applicationProcesses || [],
        educationalLevel: published.educationalLevel,
        totalHistoricalEnrollment: published.totalHistoricalEnrollment
      }

      const resp = await managementClient.put(
        `/entries/${id}`,
        payload,
        {
          headers: {
            'X-Contentful-Content-Type': 'course',
            'X-Contentful-Version': version
          }
        }
      )

      console.log(`  ✓ Updated to: ${update.price}`)

      await managementClient.put(
        `/entries/${id}/published`,
        {},
        { headers: { 'X-Contentful-Version': resp.data.sys.version } }
      )

      console.log(`  ✓ Published`)
    }

    console.log('\n✅ Done!')
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data?.message || error.message)
    if (error.response?.data?.details?.errors?.[0]) {
      console.error('  Details:', error.response.data.details.errors[0].details)
    }
    process.exit(1)
  }
}

run()
