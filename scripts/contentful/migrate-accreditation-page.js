#!/usr/bin/env node

/**
 * Migrate Accreditation Page to Contentful
 *
 * Creates the `accreditationPage` content type and seeds it with the
 * current hardcoded data from src/pages/accreditation.tsx.
 *
 * Usage:
 *   npm run contentful:migrate-accreditation
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-accreditation-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'accreditationPage'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Accreditation Page',
  description: 'Singleton page content for the accreditation page',
  displayField: 'internalName',
  fields: [
    {
      id: 'internalName',
      name: 'Internal Name',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    // Accreditations (JSON array of objects with icon strings)
    {
      id: 'accreditations',
      name: 'Accreditations',
      type: 'Object',
      required: true
    },
    // Quality Standards (JSON array of objects with icon strings)
    {
      id: 'qualityStandards',
      name: 'Quality Standards',
      type: 'Object',
      required: true
    },
    // Benefits (JSON array of objects with icon strings)
    {
      id: 'benefits',
      name: 'Benefits',
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
  internalName: 'Accreditation Page',
  accreditations: [
    {
      title: 'Woolf University',
      subtitle: 'EU-Accredited Degree Partner',
      description:
        'Woolf is an EU-accredited, degree-granting institution. Through our partnership, ADMI diploma graduates can earn ECTS credits recognised across the European Higher Education Area.',
      icon: 'school',
      borderColor: '#08F6CF',
      accentColor: '#0A3D3D',
      iconBg: '#08F6CF22',
      tagBg: '#08F6CF22',
      tags: ['ECTS Credits', 'EU Accredited', 'International']
    },
    {
      title: 'TVETA Kenya',
      subtitle: 'National Technical Education Authority',
      description:
        "Registered with Kenya's Technical and Vocational Education and Training Authority. All programmes meet national quality standards and comply with KNQF requirements.",
      icon: 'shield-check',
      borderColor: '#BA2E36',
      accentColor: '#BA2E36',
      iconBg: '#BA2E3622',
      tagBg: '#BA2E3622',
      tags: ['KNQF Compliant', 'National Recognition']
    },
    {
      title: 'Pearson BTEC',
      subtitle: 'Globally Recognised Professional Certification',
      description:
        'Professional certificates carry Pearson BTEC certification, globally recognised by employers and universities as a mark of vocational excellence.',
      icon: 'award',
      borderColor: '#F76335',
      accentColor: '#F76335',
      iconBg: '#F7633522',
      tagBg: '#F7633522',
      tags: ['Employer Recognised', 'Global Standard']
    }
  ],
  qualityStandards: [
    {
      title: 'ECTS Credits',
      description:
        'European Credit Transfer System ensures your qualifications are portable and recognised across the continent.',
      icon: 'certificate',
      iconColor: '#08F6CF'
    },
    {
      title: 'KNQF Level Mapping',
      description:
        'Each programme maps to specific KNQF levels, ensuring alignment with national education standards and employer expectations.',
      icon: 'layers-subtract',
      iconColor: '#0A3D3D'
    },
    {
      title: 'Quality Assurance',
      description:
        'Rigorous internal and external quality processes ensure curriculum relevance, teaching excellence, and student success.',
      icon: 'clipboard-check',
      iconColor: '#BA2E36'
    },
    {
      title: 'Industry Advisory Board',
      description:
        'Leading creative industry professionals review and guide programme content to ensure graduates are career-ready.',
      icon: 'users',
      iconColor: '#F76335'
    }
  ],
  benefits: [
    {
      title: 'International Recognition',
      description:
        'Your qualifications are recognised across Europe and beyond through ECTS credit alignment.',
      icon: 'globe',
      iconColor: '#08F6CF'
    },
    {
      title: 'Credit Transfer',
      description:
        'Seamlessly transfer credits between ADMI programmes and towards international degree pathways.',
      icon: 'arrows-exchange',
      iconColor: '#0A3D3D'
    },
    {
      title: 'Employer Confidence',
      description:
        'Accredited qualifications give employers confidence in the standards and rigour of your education.',
      icon: 'briefcase',
      iconColor: '#BA2E36'
    },
    {
      title: 'Pathway to Degrees',
      description:
        'Progress from certificate to diploma to degree through a structured, credit-bearing academic pathway.',
      icon: 'trending-up',
      iconColor: '#F76335'
    },
    {
      title: 'Government-Registered Programmes',
      description:
        'All programmes are registered with TVETA Kenya, meeting the national standards for technical and vocational education.',
      icon: 'checklist',
      iconColor: '#0A3D3D'
    },
    {
      title: 'Student Protection Standards',
      description:
        'Robust quality frameworks safeguard your learning experience with regular audits and transparent reporting.',
      icon: 'shield-check',
      iconColor: '#BA2E36'
    }
  ],
  seoTitle: 'Accreditation',
  seoDescription:
    'ADMI holds accreditation from Woolf University (EU-accredited ECTS credits), TVETA Kenya, and Pearson BTEC.'
})

// ---------- Main ----------

async function main() {
  console.log('=== Accreditation Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)
  await ensureEntry(CONTENT_TYPE_ID, seedData)

  console.log('\nDone! Accreditation page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
