#!/usr/bin/env node
const axios = require('axios')

const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID
const accessToken = process.env.ADMI_CONTENTFUL_ACCESS_TOKEN
const environment = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

async function testFetch(pageType) {
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=pageContent&fields.pageType=${pageType}&limit=1`

  try {
    const res = await axios.get(url)
    const item = res.data.items[0]
    if (!item) {
      console.log(pageType.padEnd(22), 'NO ENTRY FOUND')
      return
    }

    const fields = item.fields
    const contentKeys = fields.content ? Object.keys(fields.content) : []
    console.log(pageType.padEnd(22), 'OK  content keys:', contentKeys.join(', '))
  } catch (e) {
    console.log(pageType.padEnd(22), 'ERROR:', e.response?.status || e.message)
  }
}

async function main() {
  console.log('Testing Contentful CDN fetch for all page types...\n')

  const types = [
    'about', 'alumni', 'impact', 'accreditation', 'work-with-us',
    'financial-planning', 'student-showcase', 'student-support',
    'student-life', 'fellowship', 'academic-pathways', 'accommodation'
  ]

  for (const t of types) {
    await testFetch(t)
  }

  // Also test teamMember and alumniProfile
  console.log('\nTesting shared types...')
  try {
    const teamUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=teamMember&order=fields.sortOrder`
    const teamRes = await axios.get(teamUrl)
    console.log('teamMember'.padEnd(22), 'OK ', teamRes.data.items.length, 'entries')
  } catch (e) {
    console.log('teamMember'.padEnd(22), 'ERROR:', e.response?.status || e.message)
  }

  try {
    const alumniUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=alumniProfile`
    const alumniRes = await axios.get(alumniUrl)
    console.log('alumniProfile'.padEnd(22), 'OK ', alumniRes.data.items.length, 'entries')
  } catch (e) {
    console.log('alumniProfile'.padEnd(22), 'ERROR:', e.response?.status || e.message)
  }

  try {
    const faqUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?access_token=${accessToken}&content_type=pageFaq&order=fields.sortOrder`
    const faqRes = await axios.get(faqUrl)
    console.log('pageFaq'.padEnd(22), 'OK ', faqRes.data.items.length, 'entries')
  } catch (e) {
    console.log('pageFaq'.padEnd(22), 'ERROR:', e.response?.status || e.message)
  }
}

main()
