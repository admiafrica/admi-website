const { createClient } = require('contentful-management')
require('dotenv').config()

async function checkContentTypes() {
  try {
    console.log('🔍 Checking Contentful content types...\n')

    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.CONTENTFUL_SPACE_ID
    const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master'

    if (!managementToken || !spaceId) {
      throw new Error('Missing Contentful credentials')
    }

    const client = createClient({
      accessToken: managementToken
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment(environmentId)

    // Get all content types
    const contentTypes = await environment.getContentTypes()

    console.log(`📋 Found ${contentTypes.items.length} content types:\n`)

    // Check for testimonial/review related content types
    const testimonialTypes = []
    const reviewTypes = []

    contentTypes.items.forEach((ct) => {
      const name = ct.name.toLowerCase()
      const id = ct.sys.id.toLowerCase()

      console.log(`📄 ${ct.name} (ID: ${ct.sys.id})`)

      if (name.includes('testimonial') || id.includes('testimonial')) {
        testimonialTypes.push(ct)
      }

      if (name.includes('review') || id.includes('review')) {
        reviewTypes.push(ct)
      }
    })

    console.log('\n🎯 SEARCH RESULTS:')

    if (testimonialTypes.length > 0) {
      console.log(`\n✅ Found ${testimonialTypes.length} testimonial-related content type(s):`)
      testimonialTypes.forEach((ct) => {
        console.log(`   - ${ct.name} (ID: ${ct.sys.id})`)
        console.log(`     Fields: ${ct.fields.map((f) => f.id).join(', ')}`)
      })
    } else {
      console.log('\n❌ No testimonial content types found')
    }

    if (reviewTypes.length > 0) {
      console.log(`\n✅ Found ${reviewTypes.length} review-related content type(s):`)
      reviewTypes.forEach((ct) => {
        console.log(`   - ${ct.name} (ID: ${ct.sys.id})`)
        console.log(`     Fields: ${ct.fields.map((f) => f.id).join(', ')}`)
      })
    } else {
      console.log('\n❌ No review content types found')
    }

    // Also check for student-related content types that might contain testimonials
    console.log('\n🎓 Other potentially relevant content types:')
    const relevantTypes = contentTypes.items.filter((ct) => {
      const name = ct.name.toLowerCase()
      const id = ct.sys.id.toLowerCase()
      return (
        name.includes('student') ||
        name.includes('alumni') ||
        name.includes('success') ||
        name.includes('story') ||
        id.includes('student') ||
        id.includes('alumni')
      )
    })

    if (relevantTypes.length > 0) {
      relevantTypes.forEach((ct) => {
        console.log(`   - ${ct.name} (ID: ${ct.sys.id})`)
      })
    } else {
      console.log('   None found')
    }
  } catch (error) {
    console.error('❌ Error checking content types:', error.message)
  }
}

checkContentTypes()
