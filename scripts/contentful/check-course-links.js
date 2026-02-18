#!/usr/bin/env node
/**
 * Check what content types the course links point to
 */

require('dotenv').config()
const axios = require('axios')

const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'
const baseUrl = 'https://cdn.contentful.com'

async function checkLinkedContentTypes() {
  console.log('\n🔗 Checking linked content types from course fields...\n')
  
  // Get one course entry to see what it links to
  const url = `${baseUrl}/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=course&limit=1&include=1`
  
  try {
    const res = await axios.get(url)
    const course = res.data.items[0]
    const includes = res.data.includes
    
    console.log('📚 Sample Course:', course.fields.name)
    console.log('\n📎 Linked Fields and their Content Types:\n')
    
    // Check each array link field
    const linkFields = [
      'courseBenefits',
      'courseLeadersMentors', 
      'studentPortfolio',
      'studentReviews',
      'faqs',
      'applicationProcesses',
      'testimonials'
    ]
    
    for (const field of linkFields) {
      const links = course.fields[field]
      if (links && links.length > 0) {
        const linkedId = links[0].sys.id
        const linkedEntry = includes?.Entry?.find(e => e.sys.id === linkedId)
        const contentType = linkedEntry?.sys?.contentType?.sys?.id || 'unknown'
        console.log(`   ${field.padEnd(25)} → ${contentType} (${links.length} linked)`)
      } else {
        console.log(`   ${field.padEnd(25)} → (empty)`)
      }
    }
    
    // List all unique content types found
    console.log('\n📋 All Content Types Found in Includes:\n')
    if (includes?.Entry) {
      const contentTypes = [...new Set(includes.Entry.map(e => e.sys.contentType.sys.id))]
      contentTypes.forEach(ct => {
        const count = includes.Entry.filter(e => e.sys.contentType.sys.id === ct).length
        console.log(`   • ${ct} (${count} entries)`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkLinkedContentTypes()
