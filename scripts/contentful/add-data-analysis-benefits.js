#!/usr/bin/env node

/**
 * Add Course Benefits to Certificate in Data Analysis Course
 * This script creates 4 benefit entries and links them to the course
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

if (!MANAGEMENT_TOKEN) {
  console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN is required')
  process.exit(1)
}

const contentfulClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    'X-Contentful-Content-Type': 'courseBenefit'
  }
})

const BENEFITS_DATA = [
  {
    title: 'Industry-Recognized Certificate',
    text: 'Earn a credential valued by leading employers in Kenya and East Africa. Get recognized for mastering data analysis and visualization tools used in real-world analytics teams.'
  },
  {
    title: '85%+ Job Placement Rate',
    text: 'Direct access to employers actively hiring data analysts. Our structured placement support and internship partnerships ensure career acceleration for our graduates.'
  },
  {
    title: 'Real-World Projects',
    text: 'Build a professional portfolio through hands-on projects using real datasets and industry tools like Power BI and Tableau. Showcase your work to potential employers.'
  },
  {
    title: 'Expert Mentor Support',
    text: 'Learn from industry practitioners with 5+ years of experience. Get personalized guidance on technical skills, portfolio development, and interview preparation.'
  }
]

const ICON_IDS = [
  '3tBKb7pN4M8hYqZ1vPxR2q', // Industry certificate icon
  '32ec3Jmj5WNio82cbeJ2Pf', // Skills/target icon
  '4ATO3TNfGHddpnZ5MG85T0', // Code/project icon
  '54MFcQfBvHYoW6j4vu49W6' // Mentor/support icon
]

async function createBenefit(benefitData, iconId, index) {
  try {
    console.log(`\n📝 Creating benefit ${index + 1}: "${benefitData.title}"...`)

    const entry = {
      fields: {
        title: {
          'en-US': benefitData.title
        },
        text: {
          'en-US': {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: benefitData.text,
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        },
        icon: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: iconId
            }
          }
        }
      }
    }

    const response = await contentfulClient.post('/entries', entry)
    const entryId = response.data.sys.id
    const version = response.data.sys.version
    console.log(`✅ Created entry: ${entryId}`)

    // Publish the entry
    console.log('   Publishing entry...')
    await contentfulClient.put(
      `/entries/${entryId}/published`,
      {},
      {
        headers: {
          'X-Contentful-Version': version
        }
      }
    )
    console.log(`✅ Published entry: ${entryId}`)

    return entryId
  } catch (error) {
    console.error('❌ Error creating benefit:', error.response?.data?.details || error.response?.data || error.message)
    throw error
  }
}

async function updateCourseWithBenefits(courseId, benefitIds) {
  try {
    console.log('\n🔗 Fetching course entry...')
    const courseResponse = await contentfulClient.get(`/entries/${courseId}`)
    const course = courseResponse.data
    const version = course.sys.version

    console.log(`📊 Current version: ${version}`)
    console.log(`   Adding ${benefitIds.length} benefits to course...`)

    // Link benefits to the course
    const updatedFields = {
      ...course.fields,
      courseBenefits: {
        'en-US': benefitIds.map((id) => ({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: id
          }
        }))
      }
    }

    const updateResponse = await contentfulClient.put(
      `/entries/${courseId}`,
      {
        fields: updatedFields
      },
      {
        headers: {
          'X-Contentful-Version': version
        }
      }
    )

    console.log('✅ Updated course entry with benefits')

    // Publish the updated course
    console.log('   Publishing updated course...')
    const newVersion = updateResponse.data.sys.version
    await contentfulClient.put(
      `/entries/${courseId}/published`,
      {},
      {
        headers: {
          'X-Contentful-Version': newVersion
        }
      }
    )
    console.log('✅ Published updated course')
  } catch (error) {
    console.error('❌ Error updating course:', error.response?.data || error.message)
    throw error
  }
}

async function findCourseBySlug(slug) {
  try {
    console.log(`\n🔍 Finding course with slug: ${slug}...`)
    const response = await contentfulClient.get('/entries', {
      params: {
        content_type: 'course',
        'fields.slug': slug
      }
    })

    if (response.data.items.length === 0) {
      throw new Error(`Course not found with slug: ${slug}`)
    }

    const courseId = response.data.items[0].sys.id
    const courseName = response.data.items[0].fields.name['en-US']
    console.log(`✅ Found course: "${courseName}" (ID: ${courseId})`)
    return courseId
  } catch (error) {
    console.error('❌ Error finding course:', error.response?.data || error.message)
    throw error
  }
}

async function main() {
  try {
    console.log('🚀 Starting Certificate Data Analysis Benefits Setup\n')
    console.log(`📦 Space ID: ${SPACE_ID}`)
    console.log(`🌍 Environment: ${ENVIRONMENT}`)

    // Step 1: Find the course
    const courseId = await findCourseBySlug('certificate-data-analysis-presentation')

    // Step 2: Create benefits
    console.log('\n📚 Creating course benefits...')
    const benefitIds = []
    for (let i = 0; i < BENEFITS_DATA.length; i++) {
      const entryId = await createBenefit(BENEFITS_DATA[i], ICON_IDS[i], i)
      benefitIds.push(entryId)
    }

    // Step 3: Link benefits to course
    await updateCourseWithBenefits(courseId, benefitIds)

    console.log('\n✨ All done! Course benefits have been added successfully.')
    console.log('\n📍 Course will now display 4 benefit cards in the "Why you should take this course" section.')
    console.log('\n🔗 Course URL: https://admi.africa/courses/certificate-data-analysis-presentation')
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message)
    process.exit(1)
  }
}

main()
