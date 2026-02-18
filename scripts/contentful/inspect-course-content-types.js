#!/usr/bin/env node
/**
 * Inspect Contentful course-related content types
 * Checks what content types exist and their field structures
 * Uses Preview API to see draft content as well
 */

require('dotenv').config()
const axios = require('axios')

const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
// Use preview token if available, otherwise use regular token
const previewToken = process.env.ADMI_CONTENTFUL_PREVIEW_TOKEN || accessToken
const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

if (!accessToken) {
  console.error('❌ ADMI_CONTENTFUL_ACCESS_TOKEN environment variable is required')
  console.error('   Please set it in your .env file or environment')
  process.exit(1)
}

// Use preview API for unpublished/draft content
const baseUrl = process.env.USE_PREVIEW === 'true' 
  ? 'https://preview.contentful.com'
  : 'https://cdn.contentful.com'

console.log(`\n🔍 Inspecting Contentful course-related content types...`)
console.log(`📦 Space: ${spaceId}`)
console.log(`🌍 Environment: ${environment}`)
console.log(`🔌 API: ${baseUrl.includes('preview') ? 'Preview (includes drafts)' : 'CDN (published only)'}`)
console.log('\n' + '='.repeat(80) + '\n')

/**
 * Get content type definition (structure)
 */
async function getContentTypeDefinition(contentTypeId) {
  const url = `${baseUrl}/spaces/${spaceId}/environments/${environment}/content_types/${contentTypeId}?access_token=${previewToken}`
  
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    return null
  }
}

/**
 * Get entries for a content type
 */
async function getContentTypeEntries(contentTypeId, limit = 5) {
  const url = `${baseUrl}/spaces/${spaceId}/environments/${environment}/entries?access_token=${previewToken}&content_type=${contentTypeId}&limit=${limit}`
  
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    return null
  }
}

/**
 * Display content type information
 */
function displayContentType(definition, entries) {
  const name = definition.name
  const id = definition.sys.id
  const entryCount = entries ? entries.total : 0
  
  console.log(`📋 ${name}`)
  console.log(`   ID: ${id}`)
  console.log(`   Entries: ${entryCount}`)
  console.log(`   Fields:`)
  
  definition.fields.forEach(field => {
    const required = field.required ? '✅' : '  '
    const type = field.type === 'Link' 
      ? `Link(${field.linkType})${field.validations?.[0]?.linkContentType ? ` → ${field.validations[0].linkContentType.join(', ')}` : ''}`
      : field.type === 'Array'
        ? `Array(${field.items?.type || 'unknown'})`
        : field.type
    
    console.log(`   ${required} ${field.id.padEnd(25)} ${type}`)
  })
  
  console.log('')
}

/**
 * Main inspection function
 */
async function inspectCourseContentTypes() {
  // List of content types we're looking for
  const courseContentTypes = [
    'course',                    // Main course entry
    'courseLeader',              // Course leader/head
    'industryQuote',             // Industry testimonial/quote
    'courseBenefits',            // Why this course benefits
    'courseSemesters',           // Semester/curriculum structure
    'paymentPlans',              // Payment plan options
    'courseTestimonials',        // Student testimonials
    'courseFAQ',                 // Course-specific FAQs
    'careerOutcomes',            // Job outcomes/careers
    'courseMentors',             // Faculty/mentors
    'courseFacilities',          // Equipment/facilities
    'studentPortfolio',          // Student project showcase
    'alumniStories',             // Alumni success stories
    'industryPartners',          // Partner companies
    'industryTrends',            // Industry trend content
    'coursePhotos',              // Students in action photos
  ]

  console.log('🔎 Checking for course-related content types...\n')

  const results = {
    exists: [],
    missing: []
  }

  for (const contentTypeId of courseContentTypes) {
    const definition = await getContentTypeDefinition(contentTypeId)
    
    if (definition) {
      const entries = await getContentTypeEntries(contentTypeId)
      displayContentType(definition, entries)
      results.exists.push({
        id: contentTypeId,
        name: definition.name,
        count: entries ? entries.total : 0
      })
    } else {
      console.log(`❌ ${contentTypeId} - NOT FOUND\n`)
      results.missing.push(contentTypeId)
    }
  }

  // Summary
  console.log('='.repeat(80))
  console.log('\n📊 SUMMARY\n')
  console.log(`✅ Existing content types: ${results.exists.length}`)
  results.exists.forEach(ct => {
    console.log(`   • ${ct.name} (${ct.id}): ${ct.count} entries`)
  })
  
  console.log(`\n❌ Missing content types: ${results.missing.length}`)
  results.missing.forEach(id => {
    console.log(`   • ${id}`)
  })

  // Check main course content type fields
  if (results.exists.find(ct => ct.id === 'course')) {
    console.log('\n📝 Checking main "course" content type for important fields...\n')
    const courseDefinition = await getContentTypeDefinition('course')
    
    const importantFields = [
      'name',
      'slug',
      'coverImage',
      'aboutTheCourse',
      'programType',
      'awardLevel',
      'creditHours',
      'intakeMonths',
      'learningOutcomes',
      'careerOptions',
      'courseBenefits',
      'courseFaqs',
      'courseVideo'
    ]

    const existingFields = courseDefinition.fields.map(f => f.id)
    
    console.log('Important course fields:')
    importantFields.forEach(fieldId => {
      const exists = existingFields.includes(fieldId)
      const status = exists ? '✅' : '❌'
      console.log(`   ${status} ${fieldId}`)
    })
  }

  console.log('\n' + '='.repeat(80))
  console.log('\n✨ Inspection complete!\n')
  
  if (results.missing.length > 0) {
    console.log('💡 TIP: Run with USE_PREVIEW=true to check for unpublished content types:')
    console.log('   USE_PREVIEW=true node scripts/contentful/inspect-course-content-types.js\n')
  }
}

// Run inspection
inspectCourseContentTypes().catch(error => {
  console.error('\n❌ Error during inspection:', error.message)
  if (error.response) {
    console.error(`   Status: ${error.response.status}`)
    console.error(`   Detail: ${JSON.stringify(error.response.data, null, 2)}`)
  }
  process.exit(1)
})
