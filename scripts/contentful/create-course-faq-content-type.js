/* eslint-disable @typescript-eslint/no-var-requires */
const contentful = require('contentful-management')
require('dotenv').config()

async function createCourseFAQContentType() {
  try {
    console.log('🚀 Creating courseFaq content type in Contentful...')

    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID

    if (!managementToken || !spaceId) {
      console.error('❌ Missing required environment variables:')
      console.error('   - CONTENTFUL_MANAGEMENT_TOKEN:', managementToken ? '✅' : '❌')
      console.error('   - ADMI_CONTENTFUL_SPACE_ID:', spaceId ? '✅' : '❌')
      process.exit(1)
    }

    const client = contentful.createClient({
      accessToken: managementToken
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment(process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master')

    // Check if courseFaq content type already exists
    try {
      await environment.getContentType('courseFaq')
      console.log('✅ courseFaq content type already exists!')
      return
    } catch (error) {
      // Content type doesn't exist, we'll create it
      console.log('📝 courseFaq content type not found, creating...')
    }

    // Create the courseFaq content type
    const courseFaqContentType = await environment.createContentType({
      sys: {
        id: 'courseFaq'
      },
      name: 'Course FAQ',
      description: 'Frequently Asked Questions specific to courses',
      displayField: 'question',
      fields: [
        {
          id: 'question',
          name: 'Question',
          type: 'Symbol',
          required: true,
          validations: [
            {
              size: {
                min: 10,
                max: 300
              }
            }
          ]
        },
        {
          id: 'answer',
          name: 'Answer',
          type: 'RichText',
          required: true,
          validations: [
            {
              nodes: {
                'embedded-entry-block': [],
                'embedded-entry-inline': []
              }
            }
          ]
        },
        {
          id: 'course',
          name: 'Related Course',
          type: 'Link',
          linkType: 'Entry',
          required: true,
          validations: [
            {
              linkContentType: ['course']
            }
          ]
        },
        {
          id: 'displayOrder',
          name: 'Display Order',
          type: 'Integer',
          required: false,
          validations: [
            {
              range: {
                min: 1,
                max: 100
              }
            }
          ]
        }
      ]
    })

    // Publish the content type
    await courseFaqContentType.publish()

    console.log('✅ courseFaq content type created and published successfully!')
    console.log('\n📋 Content type details:')
    console.log('   - ID: courseFaq')
    console.log('   - Name: Course FAQ')
    console.log('   - Fields: question, answer, course, displayOrder')
    console.log('\n🎉 Ready to migrate course-specific FAQs!')
  } catch (error) {
    console.error('❌ Failed to create courseFaq content type:', error.message)
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2))
    }
    process.exit(1)
  }
}

// Run the script
createCourseFAQContentType()
