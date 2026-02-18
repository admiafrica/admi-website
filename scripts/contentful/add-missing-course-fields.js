#!/usr/bin/env node

/**
 * Add missing fields to existing course-related content types
 *
 * This script:
 * 1. Adds projectUrl field to studentPortfolio (for YouTube/Vimeo links)
 * 2. Adds displayOrder to multiple content types
 * 3. Adds missing fields to testimonial (cohort, currentRole, company)
 * 4. Adds missing fields to courseLeaderMentor (specialization, industryExperience)
 * 5. Adds missing fields to faq (category, displayOrder)
 *
 * Safe to run multiple times - will skip if fields already exist
 */

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

if (!MANAGEMENT_TOKEN) {
  console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN environment variable is required')
  console.error('   Get it from: https://app.contentful.com/spaces/' + SPACE_ID + '/api/keys')
  process.exit(1)
}

const client = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
})

/**
 * Get current content type definition
 */
async function getContentType(contentTypeId) {
  try {
    const response = await client.get(`/content_types/${contentTypeId}`)
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      return null
    }
    throw error
  }
}

/**
 * Update content type with new fields
 */
async function updateContentType(contentTypeId, updatedDefinition) {
  try {
    const response = await client.put(`/content_types/${contentTypeId}`, updatedDefinition, {
      headers: {
        'X-Contentful-Version': updatedDefinition.sys.version
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error updating ${contentTypeId}:`, error.response?.data || error.message)
    throw error
  }
}

/**
 * Publish content type
 */
async function publishContentType(contentTypeId, version) {
  try {
    const response = await client.put(
      `/content_types/${contentTypeId}/published`,
      {},
      {
        headers: {
          'X-Contentful-Version': version
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(`Error publishing ${contentTypeId}:`, error.response?.data || error.message)
    throw error
  }
}

/**
 * Check if field exists
 */
function hasField(contentType, fieldId) {
  return contentType.fields.some((f) => f.id === fieldId)
}

/**
 * Add fields to studentPortfolio
 */
async function updateStudentPortfolio() {
  console.log('\n📦 Updating studentPortfolio...')

  const contentType = await getContentType('studentPortfolio')
  if (!contentType) {
    console.log('   ⚠️  studentPortfolio not found - skipping')
    return
  }

  let modified = false
  const fieldsToAdd = []

  // Add projectUrl (CRITICAL - for YouTube/Vimeo links)
  if (!hasField(contentType, 'projectUrl')) {
    fieldsToAdd.push({
      id: 'projectUrl',
      name: 'Project URL',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding projectUrl field (for YouTube/Vimeo links)')
    modified = true
  }

  // Add projectTitle
  if (!hasField(contentType, 'projectTitle')) {
    fieldsToAdd.push({
      id: 'projectTitle',
      name: 'Project Title',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding projectTitle field')
    modified = true
  }

  // Add cohort
  if (!hasField(contentType, 'cohort')) {
    fieldsToAdd.push({
      id: 'cohort',
      name: 'Cohort',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding cohort field (e.g., "Class of 2024")')
    modified = true
  }

  // Add description
  if (!hasField(contentType, 'description')) {
    fieldsToAdd.push({
      id: 'description',
      name: 'Description',
      type: 'Text',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding description field')
    modified = true
  }

  // Add thumbnail
  if (!hasField(contentType, 'thumbnail')) {
    fieldsToAdd.push({
      id: 'thumbnail',
      name: 'Thumbnail',
      type: 'Link',
      localized: false,
      required: false,
      validations: [{ linkMimetypeGroup: ['image'] }],
      disabled: false,
      omitted: false,
      linkType: 'Asset'
    })
    console.log('   ➕ Adding thumbnail field')
    modified = true
  }

  // Add displayOrder
  if (!hasField(contentType, 'displayOrder')) {
    fieldsToAdd.push({
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding displayOrder field')
    modified = true
  }

  if (modified) {
    contentType.fields.push(...fieldsToAdd)
    const updated = await updateContentType('studentPortfolio', contentType)
    await publishContentType('studentPortfolio', updated.sys.version)
    console.log('   ✅ studentPortfolio updated and published')
  } else {
    console.log('   ✅ studentPortfolio already has all required fields')
  }
}

/**
 * Add fields to testimonial
 */
async function updateTestimonial() {
  console.log('\n📦 Updating testimonial...')

  const contentType = await getContentType('testimonial')
  if (!contentType) {
    console.log('   ⚠️  testimonial not found - skipping')
    return
  }

  let modified = false
  const fieldsToAdd = []

  // Add program
  if (!hasField(contentType, 'program')) {
    fieldsToAdd.push({
      id: 'program',
      name: 'Program',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding program field')
    modified = true
  }

  // Add cohort
  if (!hasField(contentType, 'cohort')) {
    fieldsToAdd.push({
      id: 'cohort',
      name: 'Cohort',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding cohort field (e.g., "Class of 2024")')
    modified = true
  }

  // Add currentRole
  if (!hasField(contentType, 'currentRole')) {
    fieldsToAdd.push({
      id: 'currentRole',
      name: 'Current Role',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding currentRole field')
    modified = true
  }

  // Add company
  if (!hasField(contentType, 'company')) {
    fieldsToAdd.push({
      id: 'company',
      name: 'Company',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding company field')
    modified = true
  }

  // Add displayOrder
  if (!hasField(contentType, 'displayOrder')) {
    fieldsToAdd.push({
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding displayOrder field')
    modified = true
  }

  if (modified) {
    contentType.fields.push(...fieldsToAdd)
    const updated = await updateContentType('testimonial', contentType)
    await publishContentType('testimonial', updated.sys.version)
    console.log('   ✅ testimonial updated and published')
  } else {
    console.log('   ✅ testimonial already has all required fields')
  }
}

/**
 * Add fields to courseLeaderMentor
 */
async function updateCourseLeaderMentor() {
  console.log('\n📦 Updating courseLeaderMentor...')

  const contentType = await getContentType('courseLeaderMentor')
  if (!contentType) {
    console.log('   ⚠️  courseLeaderMentor not found - skipping')
    return
  }

  let modified = false
  const fieldsToAdd = []

  // Add specialization
  if (!hasField(contentType, 'specialization')) {
    fieldsToAdd.push({
      id: 'specialization',
      name: 'Specialization',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding specialization field')
    modified = true
  }

  // Add industryExperience
  if (!hasField(contentType, 'industryExperience')) {
    fieldsToAdd.push({
      id: 'industryExperience',
      name: 'Industry Experience (years)',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding industryExperience field')
    modified = true
  }

  // Add linkedInUrl (rename socialMediaLink if needed)
  if (!hasField(contentType, 'linkedInUrl')) {
    fieldsToAdd.push({
      id: 'linkedInUrl',
      name: 'LinkedIn URL',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding linkedInUrl field')
    modified = true
  }

  // Add displayOrder
  if (!hasField(contentType, 'displayOrder')) {
    fieldsToAdd.push({
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding displayOrder field')
    modified = true
  }

  if (modified) {
    contentType.fields.push(...fieldsToAdd)
    const updated = await updateContentType('courseLeaderMentor', contentType)
    await publishContentType('courseLeaderMentor', updated.sys.version)
    console.log('   ✅ courseLeaderMentor updated and published')
  } else {
    console.log('   ✅ courseLeaderMentor already has all required fields')
  }
}

/**
 * Add fields to faq
 */
async function updateFaq() {
  console.log('\n📦 Updating faq...')

  const contentType = await getContentType('faq')
  if (!contentType) {
    console.log('   ⚠️  faq not found - skipping')
    return
  }

  let modified = false
  const fieldsToAdd = []

  // Add category
  if (!hasField(contentType, 'category')) {
    fieldsToAdd.push({
      id: 'category',
      name: 'Category',
      type: 'Symbol',
      localized: false,
      required: false,
      validations: [
        {
          in: [
            'Admission',
            'Fees & Payment',
            'Duration & Schedule',
            'Career Outcomes',
            'Equipment & Facilities',
            'General'
          ]
        }
      ],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding category field')
    modified = true
  }

  // Add displayOrder
  if (!hasField(contentType, 'displayOrder')) {
    fieldsToAdd.push({
      id: 'displayOrder',
      name: 'Display Order',
      type: 'Integer',
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false
    })
    console.log('   ➕ Adding displayOrder field')
    modified = true
  }

  if (modified) {
    contentType.fields.push(...fieldsToAdd)
    const updated = await updateContentType('faq', contentType)
    await publishContentType('faq', updated.sys.version)
    console.log('   ✅ faq updated and published')
  } else {
    console.log('   ✅ faq already has all required fields')
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🔧 Adding Missing Fields to Existing Content Types')
  console.log(`📦 Space: ${SPACE_ID}`)
  console.log(`🌍 Environment: ${ENVIRONMENT}`)
  console.log('\n' + '='.repeat(80))

  try {
    await updateStudentPortfolio()
    await updateTestimonial()
    await updateCourseLeaderMentor()
    await updateFaq()

    console.log('\n' + '='.repeat(80))
    console.log('\n✅ All updates completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('   1. Content team can now add projectUrl links to student portfolios')
    console.log('   2. Add displayOrder values to sort content')
    console.log('   3. Add cohort, currentRole, company to testimonials')
    console.log('   4. Add specialization and experience to faculty')
    console.log('   5. Categorize FAQs for better organization')
    console.log('\n💡 Run the create-new-content-types.js script next to add missing content types\n')
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    process.exit(1)
  }
}

main()
