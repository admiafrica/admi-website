#!/usr/bin/env node

/**
 * Migrate Academic Pathways Page to Contentful
 *
 * Creates the `academicPathwaysPage` content type and seeds it with the
 * current hardcoded data from src/pages/academic-pathways.tsx.
 *
 * Usage:
 *   npm run contentful:migrate-academic-pathways
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-academic-pathways-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'academicPathwaysPage'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Academic Pathways Page',
  description: 'Singleton page content for the academic pathways page',
  displayField: 'internalName',
  fields: [
    {
      id: 'internalName',
      name: 'Internal Name',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    // Pathway Steps (JSON array)
    {
      id: 'pathwaySteps',
      name: 'Pathway Steps',
      type: 'Object',
      required: true
    },
    // Articulation Cards (JSON array with icon strings)
    {
      id: 'articulationCards',
      name: 'Articulation Cards',
      type: 'Object',
      required: true
    },
    // Credit Cards (JSON array)
    {
      id: 'creditCards',
      name: 'Credit Cards',
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
  internalName: 'Academic Pathways Page',
  pathwaySteps: [
    {
      step: 1,
      duration: '3 MONTHS',
      title: 'Foundation Certificate',
      description:
        'Build core creative skills and discover your specialisation. Earn foundational credits that articulate directly into professional programmes.',
      credits: '15 ECTS Credits',
      price: 'KES 5,000/mo',
      certification: 'ADMI Certified',
      borderColor: '#F76335',
      bgColor: '#FFFFFF'
    },
    {
      step: 2,
      duration: '6 MONTHS',
      title: 'Professional Certificate',
      description:
        'Deepen your expertise in your chosen field. Industry-aligned curriculum with hands-on projects and professional portfolio development.',
      credits: '30 ECTS Credits',
      price: 'KES 8,500/mo',
      certification: 'Pearson BTEC',
      borderColor: '#0A3D3D',
      bgColor: '#FFFFFF'
    },
    {
      step: 3,
      duration: '18 MONTHS',
      title: 'Diploma Programme',
      description:
        'Comprehensive programme combining theory and practice. Graduate industry-ready with a nationally recognised qualification and substantial credit accumulation.',
      credits: '90 ECTS Credits',
      price: 'KES 15,000/mo',
      certification: 'Woolf ECTS',
      borderColor: '#BA2E36',
      bgColor: '#FFFFFF'
    },
    {
      step: 4,
      duration: 'DEGREE PATHWAY',
      title: 'Bachelor\u2019s Degree via Woolf University',
      description:
        'Articulate your ADMI credits into a full EU-accredited bachelor\u2019s degree through Woolf University. Study online with international recognition and ECTS credit transfer.',
      credits: '180 ECTS Credits  \u00b7  EU Accredited',
      price: null,
      certification: 'EU Accredited',
      borderColor: '#08F6CF',
      bgColor: '#F0FDFA'
    }
  ],
  articulationCards: [
    {
      icon: 'school',
      iconColor: '#0A3D3D',
      iconBg: 'bg-[#08F6CF]/15',
      title: 'Woolf University',
      description:
        'EU-accredited degree-granting institution. ADMI diploma graduates can articulate credits towards a full bachelor\u2019s degree with international recognition.'
    },
    {
      icon: 'shield-check',
      iconColor: '#BA2E36',
      iconBg: 'bg-[#BA2E36]/15',
      title: 'KNQF Alignment',
      description:
        'All ADMI programmes are aligned with the Kenya National Qualifications Framework, ensuring national recognition and seamless credit transfer.'
    },
    {
      icon: 'award',
      iconColor: '#F76335',
      iconBg: 'bg-[#F76335]/15',
      title: 'ECTS Credits',
      description:
        'European Credit Transfer System credits ensure your qualifications are recognised across Europe and beyond, enabling global mobility.'
    }
  ],
  creditCards: [
    {
      value: '100%',
      valueColor: '#F76335',
      description: 'Credit articulation between ADMI programmes'
    },
    {
      value: 'ECTS',
      valueColor: '#0A3D3D',
      description: 'European credits recognised in 48+ countries worldwide'
    },
    {
      value: 'KNQF',
      valueColor: '#BA2E36',
      description: 'Kenya National Qualifications Framework aligned for local recognition'
    }
  ],
  seoTitle: 'Academic Pathways',
  seoDescription:
    "ADMI offers an accredited academic pathway from foundation courses through to an internationally recognised bachelor's degree."
})

// ---------- Main ----------

async function main() {
  console.log('=== Academic Pathways Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)
  await ensureEntry(CONTENT_TYPE_ID, seedData)

  console.log('\nDone! Academic Pathways page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
