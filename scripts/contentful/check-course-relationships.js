const { createClient } = require('contentful-management')
require('dotenv').config()

async function checkCourseRelationships() {
  try {
    console.log('🔍 Checking course relationships in content types...\n')

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

    // Get specific content types
    const contentTypes = await environment.getContentTypes()

    // Find course-related content types
    const courseType = contentTypes.items.find((ct) => ct.sys.id === 'course')
    const testimonialType = contentTypes.items.find((ct) => ct.sys.id === 'testimonial')
    const studentReviewType = contentTypes.items.find((ct) => ct.sys.id === 'studentReview')
    const studentPortfolioType = contentTypes.items.find((ct) => ct.sys.id === 'studentPortfolio')

    console.log('📋 CURRENT FIELD STRUCTURE:\n')

    if (courseType) {
      console.log('🎓 COURSE Content Type:')
      console.log(`   Fields: ${courseType.fields.map((f) => `${f.name} (${f.id})`).join(', ')}\n`)
    }

    if (testimonialType) {
      console.log('💬 TESTIMONIAL Content Type:')
      testimonialType.fields.forEach((field) => {
        console.log(`   - ${field.name} (${field.id}): ${field.type}`)
        if (field.type === 'Link' || field.type === 'Array') {
          console.log(`     └─ Link Type: ${field.linkType || 'N/A'}`)
          if (field.items) {
            console.log(`     └─ Items: ${field.items.linkType || field.items.type}`)
          }
        }
      })
      console.log('')
    }

    if (studentReviewType) {
      console.log('⭐ STUDENT REVIEW Content Type:')
      studentReviewType.fields.forEach((field) => {
        console.log(`   - ${field.name} (${field.id}): ${field.type}`)
        if (field.type === 'Link' || field.type === 'Array') {
          console.log(`     └─ Link Type: ${field.linkType || 'N/A'}`)
          if (field.items) {
            console.log(`     └─ Items: ${field.items.linkType || field.items.type}`)
          }
        }
      })
      console.log('')
    }

    if (studentPortfolioType) {
      console.log('🎨 STUDENT PORTFOLIO Content Type:')
      studentPortfolioType.fields.forEach((field) => {
        console.log(`   - ${field.name} (${field.id}): ${field.type}`)
        if (field.type === 'Link' || field.type === 'Array') {
          console.log(`     └─ Link Type: ${field.linkType || 'N/A'}`)
          if (field.items) {
            console.log(`     └─ Items: ${field.items.linkType || field.items.type}`)
          }
        }
      })
      console.log('')
    }

    // Check for existing course relationships
    console.log('🔗 CHECKING FOR EXISTING COURSE RELATIONSHIPS:\n')

    const typesToCheck = [
      { type: testimonialType, name: 'Testimonial' },
      { type: studentReviewType, name: 'Student Review' },
      { type: studentPortfolioType, name: 'Student Portfolio' }
    ]

    typesToCheck.forEach(({ type, name }) => {
      if (type) {
        const courseFields = type.fields.filter(
          (field) =>
            field.id.toLowerCase().includes('course') ||
            field.name.toLowerCase().includes('course') ||
            (field.type === 'Link' && field.linkType === 'Entry') ||
            (field.type === 'Array' && field.items && field.items.linkType === 'Entry')
        )

        if (courseFields.length > 0) {
          console.log(`✅ ${name} HAS course relationship fields:`)
          courseFields.forEach((field) => {
            console.log(`   - ${field.name} (${field.id}): ${field.type}`)
          })
        } else {
          console.log(`❌ ${name} has NO course relationship fields`)
        }
        console.log('')
      }
    })
  } catch (error) {
    console.error('❌ Error checking relationships:', error.message)
  }
}

checkCourseRelationships()
