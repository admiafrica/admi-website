#!/usr/bin/env node
/**
 * Get full details of existing course-related content types
 */

require('dotenv').config()
const axios = require('axios')

const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN  
const previewToken = process.env.ADMI_CONTENTFUL_PREVIEW_TOKEN || accessToken
const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'
const baseUrl = 'https://cdn.contentful.com'

async function getContentTypeDetails(contentTypeId) {
  const url = `${baseUrl}/spaces/${spaceId}/environments/${environment}/content_types/${contentTypeId}?access_token=${previewToken}`
  
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    return null
  }
}

async function getEntryCount(contentTypeId) {
  const url = `${baseUrl}/spaces/${spaceId}/environments/${environment}/entries?access_token=${previewToken}&content_type=${contentTypeId}&limit=1`
  
  try {
    const res = await axios.get(url)
    return res.data.total
  } catch (error) {
    return 0
  }
}

function displayContentType(definition, count) {
  console.log(`\n${'='.repeat(80)}`)
  console.log(`📋 ${definition.name} (${definition.sys.id})`)
  console.log(`   Entries: ${count}`)
  console.log(`   Description: ${definition.description || 'No description'}`)
  console.log(`\n   Fields:`)
  
  definition.fields.forEach(field => {
    const required = field.required ? '✅' : '   '
    const disabled = field.disabled ? '⚠️ DISABLED' : ''
    const omitted = field.omitted ? '👻 OMITTED' : ''
    
    let type = field.type
    if (field.type === 'Link') {
      type = `Link(${field.linkType})`
      if (field.validations?.[0]?.linkContentType) {
        type += ` → ${field.validations[0].linkContentType.join(', ')}`
      }
    } else if (field.type === 'Array') {
      if (field.items?.type === 'Link') {
        type = `Array(Link(${field.items.linkType}))`
        if (field.items.validations?.[0]?.linkContentType) {
          type += ` → ${field.items.validations[0].linkContentType.join(', ')}`
        }
      } else {
        type = `Array(${field.items?.type || 'unknown'})`
      }
    }
    
    const status = [disabled, omitted].filter(Boolean).join(' ')
    console.log(`   ${required} ${field.id.padEnd(30)} ${type.padEnd(40)} ${status}`)
    if (field.validations && field.validations.length > 0 && field.validations[0].in) {
      console.log(`      ${' '.repeat(30)} Options: ${field.validations[0].in.join(', ')}`)
    }
  })
}

async function main() {
  console.log('\n🔍 FULL CONTENTFUL COURSE STRUCTURE ANALYSIS\n')
  console.log(`📦 Space: ${spaceId}`)
  console.log(`🌍 Environment: ${environment}\n`)
  
  const contentTypes = [
    'course',
    'courseBenefit',
    'courseLeaderMentor',
    'faq',
    'applicationProcess',
    'program',
    'studentPortfolio',
    'testimonial'
  ]
  
  for (const ctId of contentTypes) {
    const definition = await getContentTypeDetails(ctId)
    if (definition) {
      const count = await getEntryCount(ctId)
      displayContentType(definition, count)
    } else {
      console.log(`\n❌ ${ctId} - NOT FOUND`)
    }
  }
  
  console.log(`\n${'='.repeat(80)}\n`)
  console.log('✨ Analysis complete!\n')
}

main()
