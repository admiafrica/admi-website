#!/usr/bin/env node
/**
 * Clean broken studentReviews links from all courses
 * The studentReview content type was deleted, so any existing links are broken
 */
require('dotenv').config()
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ACCESS_TOKEN = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN

const mgmt = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/master`,
  headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}` }
})

const cdn = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`,
  params: { access_token: ACCESS_TOKEN }
})

async function cleanBrokenLinks() {
  console.log('Checking all courses for broken studentReviews links...\n')
  
  // Get all courses
  const coursesRes = await cdn.get('/entries', {
    params: { content_type: 'course', limit: 50, select: 'sys.id,fields.name,fields.slug' }
  })
  
  console.log(`Found ${coursesRes.data.total} courses\n`)
  
  let fixed = 0
  for (const course of coursesRes.data.items) {
    try {
      // Get full course entry from management API
      const entry = await mgmt.get(`/entries/${course.sys.id}`)
      const fields = entry.data.fields
      
      if (fields.studentReviews && fields.studentReviews['en-US']?.length > 0) {
        console.log(`📍 ${course.fields.slug}: Has ${fields.studentReviews['en-US'].length} studentReviews links, removing...`)
        
        // Remove the broken links
        delete fields.studentReviews
        
        // Update entry
        const updated = await mgmt.put(`/entries/${course.sys.id}`, { fields }, {
          headers: { 
            'X-Contentful-Version': entry.data.sys.version,
            'Content-Type': 'application/vnd.contentful.management.v1+json'
          }
        })
        
        // Publish
        await mgmt.put(`/entries/${course.sys.id}/published`, null, {
          headers: { 'X-Contentful-Version': updated.data.sys.version }
        })
        
        console.log(`   ✅ Fixed and published`)
        fixed++
      }
      
      await new Promise(r => setTimeout(r, 200))
    } catch (error) {
      console.log(`   ⚠️  ${course.fields.slug}: ${error.response?.data?.message || error.message}`)
    }
  }
  
  console.log(`\n✅ Done! Fixed ${fixed} courses with broken studentReviews links.`)
}

cleanBrokenLinks().catch(e => {
  console.error('Error:', e.message)
  process.exit(1)
})
