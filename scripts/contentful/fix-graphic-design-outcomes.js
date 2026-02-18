#!/usr/bin/env node
/**
 * Fix graphic-design-diploma outcomes linking
 */
require('dotenv').config()
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN

const api = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/master`,
  headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}` }
})

const courseId = '53H3cuBU18u0Bcn1r8jYlu'
const outcomeIds = ['27R6aCyLI4MF14V2pDUDWi', '3ZndXBHbCFZEAXOsQNOwrD', '56jXPvQj2FfcfOyq8Yy8Z9', '57UF3H30D1Bl9thaxas00d', '5PuNnQFB3TH1FtpgXUEhiN']

async function fixGraphicDesignLinking() {
  console.log('Fixing graphic-design-diploma learning outcomes linking...')
  
  try {
    // Get current entry
    const course = await api.get(`/entries/${courseId}`)
    console.log('Current version:', course.data.sys.version)
    console.log('Fields:', Object.keys(course.data.fields))
    
    // Get full fields to preserve them
    const fields = { ...course.data.fields }
    
    // Add learning outcomes list
    fields.learningOutcomesList = {
      'en-US': outcomeIds.map(id => ({
        sys: { type: 'Link', linkType: 'Entry', id }
      }))
    }
    
    // Remove broken studentReviews links (those entries were deleted)
    if (fields.studentReviews) {
      console.log('Removing broken studentReviews links...')
      delete fields.studentReviews
    }
    
    // Update entry preserving all existing fields
    const updated = await api.put(`/entries/${courseId}`, { fields }, {
      headers: { 
        'X-Contentful-Version': course.data.sys.version,
        'Content-Type': 'application/vnd.contentful.management.v1+json'
      }
    })
    
    console.log('Updated entry, new version:', updated.data.sys.version)
    
    // Publish
    await api.put(`/entries/${courseId}/published`, null, {
      headers: { 'X-Contentful-Version': updated.data.sys.version }
    })
    
    console.log('✅ Successfully linked outcomes to graphic-design-diploma')
  } catch (error) {
    console.error('Error:', error.response?.data || error.message)
    if (error.response?.data?.details) {
      console.error('Details:', JSON.stringify(error.response.data.details, null, 2))
    }
  }
}

fixGraphicDesignLinking()
