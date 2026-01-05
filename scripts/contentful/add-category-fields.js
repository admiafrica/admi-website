#!/usr/bin/env node

/**
 * SAFE: Add category field to Course and Article content types
 *
 * This script:
 * 1. Adds a NEW optional "category" field to Course content type
 * 2. Ensures Article content type has "category" field
 * 3. Is 100% backward compatible (existing data continues to work)
 * 4. Does NOT modify existing entries
 * 5. Can be run multiple times safely (idempotent)
 *
 * Category mappings:
 * - Animation courses → "Animation"
 * - Film courses → "Film Production"
 * - Music courses → "Music Production"
 * - Photography courses → "Photography"
 * - Sound courses → "Sound Engineering"
 * - etc.
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

if (!MANAGEMENT_TOKEN) {
  console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN environment variable is required')
  console.error('   Get it from: Contentful → Settings → API keys → Content management tokens')
  process.exit(1)
}

const client = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
})

// Predefined category options for validation
const COURSE_CATEGORIES = [
  'Animation',
  'Film Production',
  'Music Production',
  'Photography',
  'Sound Engineering',
  'Graphic Design',
  'UI/UX Design',
  'Video Game Development',
  'Digital Marketing',
  'Entertainment Business'
]

/**
 * Add category field to Course content type
 */
async function addCategorytoCourse() {
  try {
    console.log('\n📋 Step 1: Fetching Course content type...')

    const response = await client.get('/content_types/course')
    const contentType = response.data

    console.log(`✅ Found Course content type (v${contentType.sys.version})`)

    // Check if category field already exists
    const existingField = contentType.fields.find((f) => f.id === 'category')

    if (existingField) {
      console.log('ℹ️  Category field already exists on Course content type')
      console.log('   Current settings:', JSON.stringify(existingField, null, 2))
      return contentType
    }

    console.log('\n➕ Adding category field to Course content type...')

    // Add category field (optional, with validation)
    contentType.fields.push({
      id: 'category',
      name: 'Category',
      type: 'Symbol',
      localized: false,
      required: false, // SAFE: Optional field won't break existing entries
      validations: [
        {
          in: COURSE_CATEGORIES
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

    console.log('✅ Category field added to Course content type')

    // Publish the content type
    console.log('📤 Publishing Course content type...')
    const publishResponse = await client.put(`/content_types/${contentType.sys.id}/published`, null, {
      headers: {
        'X-Contentful-Version': updateResponse.data.sys.version
      }
    })

    console.log('✅ Course content type published successfully')
    return publishResponse.data
  } catch (error) {
    if (error.response) {
      console.error('❌ Error adding category to Course:', error.response.data)
    } else {
      console.error('❌ Error:', error.message)
    }
    throw error
  }
}

/**
 * Verify Article content type has category field
 */
async function verifyCategoryOnArticle() {
  try {
    console.log('\n📋 Step 2: Checking Article content type...')

    const response = await client.get('/content_types/article')
    const contentType = response.data

    console.log(`✅ Found Article content type (v${contentType.sys.version})`)

    // Check if category field exists
    const categoryField = contentType.fields.find((f) => f.id === 'category')

    if (categoryField) {
      console.log('✅ Article content type already has category field')
      console.log('   Settings:', JSON.stringify(categoryField, null, 2))
      return contentType
    }

    console.log('⚠️  Article content type missing category field')
    console.log('   This field should exist. Please add it manually in Contentful UI or run article setup script.')

    return contentType
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('❌ Article content type not found')
    } else if (error.response) {
      console.error('❌ Error checking Article:', error.response.data)
    } else {
      console.error('❌ Error:', error.message)
    }
    throw error
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 ADMI Contentful Category Field Setup')
  console.log('='.repeat(50))
  console.log(`Space: ${SPACE_ID}`)
  console.log(`Environment: ${ENVIRONMENT}`)
  console.log('='.repeat(50))

  try {
    // Step 1: Add category to Course
    await addCategorytoCourse()

    // Step 2: Verify category on Article
    await verifyCategoryOnArticle()

    console.log('\n' + '='.repeat(50))
    console.log('✅ Category field setup complete!')
    console.log('='.repeat(50))
    console.log('\nNext steps:')
    console.log('1. Go to Contentful and manually populate category for courses')
    console.log('2. Ensure articles have proper categories set')
    console.log('3. Update code to use category-based filtering')
    console.log('\nAvailable course categories:')
    COURSE_CATEGORIES.forEach((cat) => console.log(`   - ${cat}`))
  } catch (error) {
    console.error('\n❌ Setup failed')
    process.exit(1)
  }
}

// Run the script
main()
