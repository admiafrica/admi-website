#!/usr/bin/env node

/**
 * Link Visualisation FAQs to the Data Analysis and Visualisation course
 * This adds the course reference field to each FAQ so they appear via the API
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'
const COURSE_ID = '78CwDqUzJv4QKo3wVAs9h8' // Data Analysis and Visualisation

const FAQ_IDS = [
  '1ueRwTBo40hh1GUIIcNU4P',
  '5lbJNMvyvtyYZ88P3DeNpr',
  'KWYsQelh8vZMPWXiPr9Rv',
  '66EI8CwwbXaIZ3kahiERyx',
  '70UYSB7PpZvLrm98BiYlPX'
]

if (!MANAGEMENT_TOKEN) {
  console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN is required')
  process.exit(1)
}

const contentfulClient = axios.create({
  baseURL: `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
  headers: {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  }
})

async function linkFAQToCourse(faqId) {
  try {
    // Get current FAQ
    const { data: current } = await contentfulClient.get(`/entries/${faqId}`)
    const version = current.sys.version
    const question = current.fields.question['en-US']
    const answer = current.fields.answer['en-US']

    console.log(`Linking FAQ: ${question}`)

    // Add course reference to existing fields
    const updatedFields = {
      question: { 'en-US': question },
      answer: { 'en-US': answer },
      course: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: COURSE_ID } } }
    }

    // Update entry
    const { data: updated } = await contentfulClient.put(
      `/entries/${faqId}`,
      {
        fields: updatedFields
      },
      {
        headers: { 'X-Contentful-Version': version }
      }
    )

    console.log(`  ✓ Updated to version ${updated.sys.version}`)

    // Publish
    await contentfulClient.put(`/entries/${faqId}/published`, null, {
      headers: { 'X-Contentful-Version': updated.sys.version }
    })

    console.log('  ✓ Published')
  } catch (error) {
    console.error(`  ✗ Error linking FAQ ${faqId}:`, error.response?.data || error.message)
    throw error
  }
}

async function main() {
  console.log('🔗 Linking Data Analysis and Visualisation FAQs to course...\n')

  for (const faqId of FAQ_IDS) {
    await linkFAQToCourse(faqId)
  }

  console.log('\n✅ All FAQs linked and published!')
  console.log('\nTest the API:')
  console.log(
    'curl "https://admi.africa/api/v3/course-faqs?slug=certificate-data-analysis-presentation" | jq \'.items[0].fields.question\''
  )
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
