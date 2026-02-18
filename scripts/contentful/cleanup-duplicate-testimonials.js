#!/usr/bin/env node
/**
 * Clean up duplicate alumni testimonials
 */
require('dotenv').config()
const axios = require('axios')

const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
const token = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
const mgmtToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN

const cdn = axios.create({
  baseURL: `https://cdn.contentful.com/spaces/${spaceId}/environments/master`,
  params: { access_token: token }
})

const mgmt = axios.create({
  baseURL: `https://api.contentful.com/spaces/${spaceId}/environments/master`,
  headers: { 'Authorization': `Bearer ${mgmtToken}` }
})

async function cleanup() {
  // Get all alumni testimonials
  const res = await cdn.get('/entries', {
    params: { content_type: 'testimonial', 'fields.testimonialType': 'alumni', limit: 100 }
  })
  
  console.log('Alumni testimonials found:', res.data.total)
  
  // Group by name
  const byName = {}
  res.data.items.forEach(item => {
    const name = item.fields.fullName
    if (!byName[name]) byName[name] = []
    byName[name].push(item)
  })
  
  // Find duplicates
  const duplicates = []
  Object.entries(byName).forEach(([name, items]) => {
    if (items.length > 1) {
      console.log(`  ${name}: ${items.length} entries (keeping newest)`)
      // Sort by created date, keep the most recent
      items.sort((a, b) => new Date(b.sys.createdAt) - new Date(a.sys.createdAt))
      duplicates.push(...items.slice(1).map(i => ({ id: i.sys.id, name })))
    }
  })
  
  if (duplicates.length === 0) {
    console.log('No duplicates found')
    return
  }
  
  console.log(`\nDeleting ${duplicates.length} duplicates...`)
  for (const dup of duplicates) {
    try {
      const entry = await mgmt.get(`/entries/${dup.id}`)
      if (entry.data.sys.publishedVersion) {
        await mgmt.delete(`/entries/${dup.id}/published`)
      }
      const updated = await mgmt.get(`/entries/${dup.id}`)
      await mgmt.delete(`/entries/${dup.id}`, {
        headers: { 'X-Contentful-Version': updated.data.sys.version }
      })
      console.log(`  Deleted: ${dup.name} (${dup.id})`)
    } catch (e) {
      console.log(`  Failed: ${dup.name} - ${e.message}`)
    }
    await new Promise(r => setTimeout(r, 300))
  }
  console.log('Cleanup complete')
}

cleanup().catch(e => console.error(e.message))
