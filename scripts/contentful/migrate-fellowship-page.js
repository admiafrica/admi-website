#!/usr/bin/env node

/**
 * Migrate Fellowship Page to Contentful
 *
 * Creates the `fellowshipPage` content type and seeds it with the
 * current hardcoded data from src/pages/fellowship.tsx.
 *
 * Usage:
 *   npm run contentful:migrate-fellowship
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-fellowship-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'fellowshipPage'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Fellowship Page',
  description: 'Singleton page content for the fellowship page',
  displayField: 'internalName',
  fields: [
    {
      id: 'internalName',
      name: 'Internal Name',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    // Benefits (JSON array of objects with icon strings)
    {
      id: 'benefits',
      name: 'Benefits',
      type: 'Object',
      required: true
    },
    // Eligibility Criteria (JSON array of strings)
    {
      id: 'eligibilityCriteria',
      name: 'Eligibility Criteria',
      type: 'Object',
      required: true
    },
    // Application Steps (JSON array)
    {
      id: 'applicationSteps',
      name: 'Application Steps',
      type: 'Object',
      required: true
    },
    // SEO
    {
      id: 'seoTitle',
      name: 'SEO Title',
      type: 'Symbol',
      required: false,
      validations: [{ size: { max: 70 } }]
    },
    {
      id: 'seoDescription',
      name: 'SEO Description',
      type: 'Symbol',
      required: false,
      validations: [{ size: { max: 160 } }]
    }
  ]
}

// ---------- Seed Data (mirrors current hardcoded data) ----------

const seedData = localize({
  internalName: 'Fellowship Page',
  benefits: [
    {
      icon: 'users',
      iconColor: '#0A3D3D',
      title: 'Mentorship',
      description:
        'One-on-one guidance from industry leaders and seasoned creative professionals throughout the programme.'
    },
    {
      icon: 'cash',
      iconColor: '#BA2E36',
      title: 'Funding',
      description:
        'Financial support for creative projects, equipment, and professional development opportunities.'
    },
    {
      icon: 'network',
      iconColor: '#F76335',
      title: 'Industry Access',
      description:
        'Exclusive access to industry events, studio visits, networking opportunities, and potential internships.'
    },
    {
      icon: 'layout-grid',
      iconColor: '#08F6CF',
      title: 'Portfolio Development',
      description:
        'Structured support to build an industry-standard portfolio that showcases your unique creative vision.'
    }
  ],
  eligibilityCriteria: [
    'Graduate of any ADMI diploma or professional certificate programme',
    'Strong creative portfolio demonstrating technical skill and originality',
    'Demonstrated leadership potential and commitment to the creative industries',
    'Clear vision for a creative project or venture to develop during the fellowship',
    'Available to commit to the full 12-month programme'
  ],
  applicationSteps: [
    {
      number: '1',
      bgColor: '#F76335',
      title: 'Submit Application',
      description:
        'Complete the online application form with your personal details, creative statement, and project proposal.'
    },
    {
      number: '2',
      bgColor: '#0A3D3D',
      title: 'Portfolio Review',
      description:
        'Our panel of industry experts and faculty members review your portfolio and creative body of work.'
    },
    {
      number: '3',
      bgColor: '#BA2E36',
      title: 'Interview',
      description:
        'Shortlisted candidates are invited for a personal interview to discuss their vision, goals, and fellowship plans.'
    }
  ],
  seoTitle: 'Fellowship',
  seoDescription:
    'The ADMI Fellowship is a 12-month programme for outstanding graduates, offering mentorship, funding, industry access, and portfolio development.'
})

// ---------- Main ----------

async function main() {
  console.log('=== Fellowship Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)
  await ensureEntry(CONTENT_TYPE_ID, seedData)

  console.log('\nDone! Fellowship page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
