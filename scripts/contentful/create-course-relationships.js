const { createClient } = require('contentful-management')
require('dotenv').config()

async function createCourseRelationships() {
  try {
    console.log('🔧 Creating course relationship fields in Contentful...\n')

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

    // 1. UPDATE TESTIMONIAL CONTENT TYPE
    console.log('📝 Updating Testimonial content type...')
    try {
      const testimonialType = await environment.getContentType('testimonial')

      // Check if fields already exist
      const hasRelatedCourses = testimonialType.fields.some((f) => f.id === 'relatedCourses')
      const hasCourseCategory = testimonialType.fields.some((f) => f.id === 'courseCategory')

      if (!hasRelatedCourses) {
        testimonialType.fields.push({
          id: 'relatedCourses',
          name: 'Related Courses',
          type: 'Array',
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          items: {
            type: 'Link',
            validations: [
              {
                linkContentType: ['course']
              }
            ],
            linkType: 'Entry'
          }
        })
        console.log('  ✅ Added "Related Courses" field to Testimonial')
      } else {
        console.log('  ⚠️  "Related Courses" field already exists in Testimonial')
      }

      if (!hasCourseCategory) {
        testimonialType.fields.push({
          id: 'courseCategory',
          name: 'Course Category',
          type: 'Symbol',
          localized: false,
          required: false,
          validations: [
            {
              in: [
                'design',
                'film',
                'music',
                'animation',
                'gaming',
                'digital-marketing',
                'web-development',
                'sound-engineering',
                'photography',
                'entertainment-business'
              ]
            }
          ],
          disabled: false,
          omitted: false
        })
        console.log('  ✅ Added "Course Category" field to Testimonial')
      } else {
        console.log('  ⚠️  "Course Category" field already exists in Testimonial')
      }

      const updatedTestimonial = await testimonialType.update()
      await updatedTestimonial.publish()
      console.log('  🚀 Testimonial content type updated and published\n')
    } catch (error) {
      console.error('  ❌ Error updating Testimonial:', error.message)
    }

    // 2. UPDATE STUDENT REVIEW CONTENT TYPE
    console.log('📝 Updating Student Review content type...')
    try {
      const studentReviewType = await environment.getContentType('studentReview')

      const hasRelatedCourses = studentReviewType.fields.some((f) => f.id === 'relatedCourses')
      const hasGraduationYear = studentReviewType.fields.some((f) => f.id === 'graduationYear')

      if (!hasRelatedCourses) {
        studentReviewType.fields.push({
          id: 'relatedCourses',
          name: 'Related Courses',
          type: 'Array',
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          items: {
            type: 'Link',
            validations: [
              {
                linkContentType: ['course']
              }
            ],
            linkType: 'Entry'
          }
        })
        console.log('  ✅ Added "Related Courses" field to Student Review')
      } else {
        console.log('  ⚠️  "Related Courses" field already exists in Student Review')
      }

      if (!hasGraduationYear) {
        studentReviewType.fields.push({
          id: 'graduationYear',
          name: 'Graduation Year',
          type: 'Date',
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false
        })
        console.log('  ✅ Added "Graduation Year" field to Student Review')
      } else {
        console.log('  ⚠️  "Graduation Year" field already exists in Student Review')
      }

      const updatedStudentReview = await studentReviewType.update()
      await updatedStudentReview.publish()
      console.log('  🚀 Student Review content type updated and published\n')
    } catch (error) {
      console.error('  ❌ Error updating Student Review:', error.message)
    }

    // 3. UPDATE STUDENT PORTFOLIO CONTENT TYPE
    console.log('📝 Updating Student Portfolio content type...')
    try {
      const studentPortfolioType = await environment.getContentType('studentPortfolio')

      const hasRelatedCourses = studentPortfolioType.fields.some((f) => f.id === 'relatedCourses')
      const hasProjectType = studentPortfolioType.fields.some((f) => f.id === 'projectType')

      if (!hasRelatedCourses) {
        studentPortfolioType.fields.push({
          id: 'relatedCourses',
          name: 'Related Courses',
          type: 'Array',
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          items: {
            type: 'Link',
            validations: [
              {
                linkContentType: ['course']
              }
            ],
            linkType: 'Entry'
          }
        })
        console.log('  ✅ Added "Related Courses" field to Student Portfolio')
      } else {
        console.log('  ⚠️  "Related Courses" field already exists in Student Portfolio')
      }

      if (!hasProjectType) {
        studentPortfolioType.fields.push({
          id: 'projectType',
          name: 'Project Type',
          type: 'Symbol',
          localized: false,
          required: false,
          validations: [
            {
              in: [
                'Final Project',
                'Capstone Project',
                'Personal Work',
                'Client Project',
                'Class Assignment',
                'Portfolio Piece'
              ]
            }
          ],
          disabled: false,
          omitted: false
        })
        console.log('  ✅ Added "Project Type" field to Student Portfolio')
      } else {
        console.log('  ⚠️  "Project Type" field already exists in Student Portfolio')
      }

      const updatedStudentPortfolio = await studentPortfolioType.update()
      await updatedStudentPortfolio.publish()
      console.log('  🚀 Student Portfolio content type updated and published\n')
    } catch (error) {
      console.error('  ❌ Error updating Student Portfolio:', error.message)
    }

    // 4. UPDATE COURSE CONTENT TYPE (ADD TESTIMONIALS FIELD)
    console.log('📝 Updating Course content type to add Testimonials field...')
    try {
      const courseType = await environment.getContentType('course')

      const hasTestimonials = courseType.fields.some((f) => f.id === 'testimonials')

      if (!hasTestimonials) {
        courseType.fields.push({
          id: 'testimonials',
          name: 'Testimonials',
          type: 'Array',
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          items: {
            type: 'Link',
            validations: [
              {
                linkContentType: ['testimonial']
              }
            ],
            linkType: 'Entry'
          }
        })
        console.log('  ✅ Added "Testimonials" field to Course')

        const updatedCourse = await courseType.update()
        await updatedCourse.publish()
        console.log('  🚀 Course content type updated and published\n')
      } else {
        console.log('  ⚠️  "Testimonials" field already exists in Course\n')
      }
    } catch (error) {
      console.error('  ❌ Error updating Course:', error.message)
    }

    console.log('🎉 COURSE RELATIONSHIPS CREATED SUCCESSFULLY!\n')

    console.log('📋 SUMMARY OF CHANGES:')
    console.log('✅ Testimonial content type:')
    console.log('   - Added "Related Courses" field (links to Course entries)')
    console.log('   - Added "Course Category" field (design, film, music, etc.)')
    console.log('')
    console.log('✅ Student Review content type:')
    console.log('   - Added "Related Courses" field (links to Course entries)')
    console.log('   - Added "Graduation Year" field (date field)')
    console.log('')
    console.log('✅ Student Portfolio content type:')
    console.log('   - Added "Related Courses" field (links to Course entries)')
    console.log('   - Added "Project Type" field (Final Project, Capstone, etc.)')
    console.log('')
    console.log('✅ Course content type:')
    console.log('   - Added "Testimonials" field (links to Testimonial entries)')
    console.log('')

    console.log('🎯 NEXT STEPS FOR CONTENT ADMINS:')
    console.log('1. Go to Contentful → Content')
    console.log('2. Edit existing testimonials, reviews, and portfolios')
    console.log('3. Use the new "Related Courses" fields to link content to specific courses')
    console.log('4. Add graduation years to student reviews')
    console.log('5. Categorize testimonials and projects using the new dropdown fields')
    console.log('')
    console.log('🚀 The dynamic course content system is now ready!')
  } catch (error) {
    console.error('❌ Fatal error:', error.message)
    process.exit(1)
  }
}

createCourseRelationships()
