#!/usr/bin/env node

/**
 * Link Analytics FAQs to the Analytics course
 * This adds the course reference field to each FAQ so they appear via the API
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')

const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID || 'qtu3mga6n6gc'
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'
const COURSE_ID = '4mkZY8VFkMHERw1J3fzlLN' // Data Analytics and Predictive Insights

const FAQ_CONFIGS = [
  {
    id: '2uPOGx58BbE5DmT6YlXCVW',
    question: 'How long is the Data Analytics program?',
    answer:
      'The program runs for 12 weeks with a flexible, self-paced learning structure. You can complete coursework on your own schedule while meeting weekly milestone deadlines. Most students dedicate 8-12 hours per week to succeed.'
  },
  {
    id: '4nJwQNwQ7ygaTerWEf6VFI',
    question: 'Do I need programming experience to enroll?',
    answer:
      'No programming experience is required. The course starts with Python and SQL basics, teaching you from the ground up. We focus on practical, accessible techniques rather than complex mathematics. If you can use Excel, you can learn analytics with us.'
  },
  {
    id: 'adpyy49BRvGhw7hPu4nHh',
    question: 'What tools and skills will I learn in this analytics program?',
    answer:
      'You will master: Python (pandas, numpy) for data manipulation, SQL for database queries, Excel for quick analysis and reporting, Statistical analysis (correlation, regression, distributions), Data visualization with charts and dashboards'
  },
  {
    id: '1sok9GVafsQAzl8snws0P6',
    question: 'What jobs can I get after this program?',
    answer:
      'Graduates transition into Data Analyst, Business Intelligence Analyst, or Analytics Coordinator roles. You will have practical Python, SQL, and statistical analysis skills that employers seek.'
  },
  {
    id: 'AvrFHluTZINfuvDIDmTiN',
    question: 'How do I earn the certificate?',
    answer:
      'Achieve 70% overall: weekly assignments (60%), mid-course project (15%), final capstone (25%). Your capstone becomes a portfolio piece for job applications.'
  }
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

function createRichText(plainText) {
  // Handle list items
  if (plainText.includes(':')) {
    const [intro, ...listItems] = plainText.split(', ')
    const hasIntro = intro.includes(':')

    if (hasIntro) {
      const content = [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: intro,
              marks: [],
              data: {}
            }
          ],
          data: {}
        },
        {
          nodeType: 'unordered-list',
          content: listItems.map((item) => ({
            nodeType: 'list-item',
            content: [
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: item.trim(),
                    marks: [],
                    data: {}
                  }
                ],
                data: {}
              }
            ],
            data: {}
          })),
          data: {}
        }
      ]

      return {
        nodeType: 'document',
        content,
        data: {}
      }
    }
  }

  // Simple paragraph
  return {
    nodeType: 'document',
    content: [
      {
        nodeType: 'paragraph',
        content: [
          {
            nodeType: 'text',
            value: plainText,
            marks: [],
            data: {}
          }
        ],
        data: {}
      }
    ],
    data: {}
  }
}

async function updateFAQ(faqConfig) {
  try {
    // Get current version
    const { data: current } = await contentfulClient.get(`/entries/${faqConfig.id}`)
    const version = current.sys.version

    console.log(`Updating FAQ: ${faqConfig.question}`)

    // Update with course reference
    const { data: updated } = await contentfulClient.put(
      `/entries/${faqConfig.id}`,
      {
        fields: {
          question: { 'en-US': faqConfig.question },
          answer: { 'en-US': createRichText(faqConfig.answer) },
          course: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: COURSE_ID } } }
        }
      },
      {
        headers: { 'X-Contentful-Version': version }
      }
    )

    console.log(`  ✓ Updated to version ${updated.sys.version}`)

    // Publish
    await contentfulClient.put(`/entries/${faqConfig.id}/published`, null, {
      headers: { 'X-Contentful-Version': updated.sys.version }
    })

    console.log('  ✓ Published')
  } catch (error) {
    console.error(`  ✗ Error updating FAQ ${faqConfig.id}:`, error.response?.data || error.message)
    throw error
  }
}

async function main() {
  console.log('🔗 Linking Analytics FAQs to course...\n')

  for (const faqConfig of FAQ_CONFIGS) {
    await updateFAQ(faqConfig)
  }

  console.log('\n✅ All FAQs updated and published!')
  console.log('\nTest the API:')
  console.log(
    'curl "https://admi.africa/api/v3/course-faqs?slug=data-analytics-and-predictive-insights" | jq \'.items[0].fields.question\''
  )
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
