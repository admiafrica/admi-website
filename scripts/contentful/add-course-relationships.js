const { createClient } = require('contentful-management')
require('dotenv').config()

async function addCourseRelationships() {
  try {
    console.log('🔧 Adding course relationship fields to content types...\n')

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

    console.log('📋 RECOMMENDED SOLUTION:\n')
    console.log('Since Course content type already has:')
    console.log('  ✅ studentPortfolio field (links to Student Portfolio)')
    console.log('  ✅ studentReviews field (links to Student Reviews)')
    console.log('  ❌ NO testimonials field\n')

    console.log('🎯 IMPLEMENTATION OPTIONS:\n')

    console.log('OPTION 1 - ADD COURSE REFERENCE FIELDS (Recommended):')
    console.log('Add "relatedCourse" field to each content type:\n')

    console.log('📝 Testimonial Content Type - Add:')
    console.log('  + relatedCourse (Reference to Course) - Optional, Multiple')
    console.log('  + courseCategory (Text) - For filtering by course type\n')

    console.log('📝 Student Review Content Type - Add:')
    console.log('  + relatedCourse (Reference to Course) - Optional, Multiple')
    console.log('  + graduationYear (Date) - When they completed the course\n')

    console.log('📝 Student Portfolio Content Type - Add:')
    console.log('  + relatedCourse (Reference to Course) - Optional, Multiple')
    console.log('  + projectType (Text) - Type of work (Final Project, Capstone, etc.)\n')

    console.log('OPTION 2 - ADD TESTIMONIALS FIELD TO COURSE:')
    console.log('Add "testimonials" field to Course content type to match the pattern\n')

    console.log('🚀 DYNAMIC USAGE EXAMPLES:\n')
    console.log('// Get testimonials for a specific course')
    console.log('const courseTestimonials = await getEntriesByField("testimonial", "relatedCourse", courseId);\n')

    console.log('// Get all portfolios for Graphic Design course')
    console.log(
      'const designPortfolios = await getEntriesByField("studentPortfolio", "relatedCourse", "graphic-design");\n'
    )

    console.log('// Get recent reviews for a course')
    console.log(
      'const recentReviews = await getEntriesByField("studentReview", "relatedCourse", courseId, { order: "-fields.graduationYear" });\n'
    )

    console.log('⚠️  NOTE: Content type modifications should be done carefully in Contentful UI')
    console.log('This script shows the recommended structure but does not modify existing content types.')

    // Show current course slugs for reference
    console.log('\n📚 CURRENT COURSES (for reference):')
    const courses = await environment.getEntries({
      content_type: 'course',
      limit: 20
    })

    if (courses.items.length > 0) {
      courses.items.forEach((course) => {
        console.log(`  - ${course.fields.name['en-US']} (slug: ${course.fields.slug['en-US']})`)
      })
    }

    console.log('\n🎯 IMPLEMENTATION STEPS:')
    console.log('1. Go to Contentful → Content Model')
    console.log('2. Edit each content type (Testimonial, Student Review, Student Portfolio)')
    console.log('3. Add "Related Course" field (type: Reference, multiple entries allowed)')
    console.log('4. Link to Course content type')
    console.log('5. Update existing entries to tag them with relevant courses')
    console.log('6. Use the dynamic fetching in your course pages')
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

addCourseRelationships()
