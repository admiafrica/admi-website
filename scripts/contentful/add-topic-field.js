#!/usr/bin/env node

/**
 * SAFE: Add topic field to Article content type
 *
 * This solves the category confusion:
 * - category: "Resources" vs "News" (content type filter)
 * - topic: "Music Production", "Animation", etc. (subject matter)
 *
 * This script:
 * 1. Adds optional "topic" field to Article content type
 * 2. Does NOT modify existing articles
 * 3. Backward compatible - existing filtering still works
 * 4. Can be run multiple times safely
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

if (!MANAGEMENT_TOKEN) {
  console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN environment variable is required')
  process.exit(1)
}

const client = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
})

// Same categories as courses
const VALID_TOPICS = [
  'Animation',
  'Film Production',
  'Music Production',
  'Photography',
  'Sound Engineering',
  'Graphic Design',
  'UI/UX Design',
  'Video Game Development',
  'Digital Marketing',
  'Entertainment Business',
  'General' // For articles that don't fit specific topics
]

async function addTopicToArticle() {
  try {
    console.log('\n📋 Fetching Article content type...')

    const response = await client.get('/content_types/article')
    const contentType = response.data

    console.log(`✅ Found Article content type (v${contentType.sys.version})`)

    // Check if topic field already exists
    const existingField = contentType.fields.find((f) => f.id === 'topic')

    if (existingField) {
      console.log('ℹ️  Topic field already exists on Article content type')
      console.log('   Current settings:', JSON.stringify(existingField, null, 2))
      return contentType
    }

    console.log('\n➕ Adding topic field to Article content type...')
    console.log('   This will NOT affect existing articles')
    console.log('   category field remains for filtering Resources vs News')

    // Add topic field (optional, with validation)
    contentType.fields.push({
      id: 'topic',
      name: 'Topic',
      type: 'Symbol',
      localized: false,
      required: false, // SAFE: Optional field
      validations: [
        {
          in: VALID_TOPICS
        }
      ],
      disabled: false,
      omitted: false
    })

    // Update the content type
    const updateResponse = await client.put(`/content_types/${contentType.sys.id}`, contentType, {
      headers: {
        'X-Contentful-Version': contentType.sys.version
      }
    })

    console.log('✅ Topic field added to Article content type')

    // Publish the content type
    console.log('📤 Publishing Article content type...')
    const publishResponse = await client.put(`/content_types/${contentType.sys.id}/published`, null, {
      headers: {
        'X-Contentful-Version': updateResponse.data.sys.version
      }
    })

    console.log('✅ Article content type published successfully')
    return publishResponse.data
  } catch (error) {
    if (error.response) {
      console.error('❌ Error adding topic to Article:', error.response.data)
    } else {
      console.error('❌ Error:', error.message)
    }
    throw error
  }
}

async function main() {
  console.log('🚀 ADMI Article Topic Field Setup')
  console.log('='.repeat(50))
  console.log(`Space: ${SPACE_ID}`)
  console.log(`Environment: ${ENVIRONMENT}`)
  console.log('='.repeat(50))
  console.log('\n📝 Field Structure:')
  console.log('   - category: "Resources" or "News" (unchanged)')
  console.log('   - topic: "Music Production", "Animation", etc. (NEW)')
  console.log('='.repeat(50))

  try {
    await addTopicToArticle()

    console.log('\n' + '='.repeat(50))
    console.log('✅ Topic field setup complete!')
    console.log('='.repeat(50))
    console.log('\nField usage:')
    console.log('  category = "Resources" (keeps existing filtering)')
    console.log('  topic = "Music Production" (new subject classification)')
    console.log('\nAvailable topics:')
    VALID_TOPICS.forEach((topic) => console.log(`   - ${topic}`))
    console.log('\nNext steps:')
    console.log('1. Update articles to set topic field')
    console.log('2. Update API to filter by topic instead of category')
    console.log('3. Keep category as "Resources" for backward compatibility')
  } catch (error) {
    console.error('\n❌ Setup failed')
    process.exit(1)
  }
}

main()
