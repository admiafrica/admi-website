#!/usr/bin/env node

/**
 * Migrate Student Showcase Page to Contentful
 *
 * Creates the `studentShowcasePage` content type and seeds it with the
 * current hardcoded data from src/pages/student-showcase.tsx.
 *
 * Usage:
 *   npm run contentful:migrate-student-showcase
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-student-showcase-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'studentShowcasePage'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Student Showcase Page',
  description: 'Singleton page content for the student showcase page',
  displayField: 'internalName',
  fields: [
    {
      id: 'internalName',
      name: 'Internal Name',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    // Featured Projects (JSON array)
    {
      id: 'featuredProjects',
      name: 'Featured Projects',
      type: 'Object',
      required: true
    },
    // Discipline Sections (JSON array of sections with nested projects)
    {
      id: 'disciplineSections',
      name: 'Discipline Sections',
      type: 'Object',
      required: true
    },
    // Student Voices (JSON array of testimonials)
    {
      id: 'studentVoices',
      name: 'Student Voices',
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
  internalName: 'Student Showcase Page',
  featuredProjects: [
    {
      title: 'Shifting Horizons',
      student: 'Achieng O.',
      programme: 'Film Production Diploma',
      type: 'Short Documentary',
      image: 'https://images.unsplash.com/photo-1630816631475-8ca50f59ba28?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Urban Pulse',
      student: 'Brian K.',
      programme: 'Graphic Design',
      type: 'Brand Campaign',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Echoes of Tomorrow',
      student: 'Maureen T.',
      programme: 'Animation',
      type: '3D Short Film',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    }
  ],
  disciplineSections: [
    {
      title: 'Film & Video Production',
      bg: '#ffffff',
      projects: [
        { title: 'Shifting Horizons', student: 'Achieng O.', type: 'Short Documentary', image: 'https://images.unsplash.com/photo-1630816631475-8ca50f59ba28?auto=format&fit=crop&w=600&q=80' },
        { title: 'City Lights', student: 'Kevin M.', type: 'Music Video', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80' },
        { title: 'The Last Mile', student: 'Faith W.', type: 'Short Film', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    {
      title: 'Animation & VFX',
      bg: '#F9F9F9',
      projects: [
        { title: 'Dreamscape', student: 'Maureen T.', type: '3D Animation', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80' },
        { title: 'Wireframe World', student: 'James K.', type: 'Motion Graphics', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80' },
        { title: 'Neon Genesis', student: 'Lucy A.', type: 'VFX Reel', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    {
      title: 'Graphic Design & Branding',
      bg: '#ffffff',
      projects: [
        { title: 'Urban Pulse', student: 'Brian K.', type: 'Brand Identity', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80' },
        { title: 'Savannah Studio', student: 'Grace N.', type: 'Logo & Packaging', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80' },
        { title: 'Craft & Co', student: 'Dennis O.', type: 'Brand Campaign', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    {
      title: 'Music & Audio Production',
      bg: '#F9F9F9',
      projects: [
        { title: 'Bassline Theory', student: 'Samuel M.', type: 'EP Production', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80' },
        { title: 'Sound of Nairobi', student: 'Diana K.', type: 'Podcast Series', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80' },
        { title: 'Studio Sessions', student: 'Peter W.', type: 'Sound Design', image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80' }
      ]
    }
  ],
  studentVoices: [
    {
      quote: 'My final-year project became my first paid client campaign two months before graduation.',
      name: 'Achieng O.',
      discipline: 'Graphic Design'
    },
    {
      quote: 'We pitched to a real brand, got feedback from agency creatives, and shipped the campaign live.',
      name: 'Brian K.',
      discipline: 'Film Production'
    },
    {
      quote: 'Mentors treated us like studio teams, so we left with confidence and a body of work we are proud of.',
      name: 'Maureen T.',
      discipline: 'Animation'
    }
  ],
  seoTitle: 'Student Showcase | ADMI',
  seoDescription:
    'Explore film, animation, design and audio work produced by ADMI students through hybrid learning.'
})

// ---------- Main ----------

async function main() {
  console.log('=== Student Showcase Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)
  await ensureEntry(CONTENT_TYPE_ID, seedData)

  console.log('\nDone! Student Showcase page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
