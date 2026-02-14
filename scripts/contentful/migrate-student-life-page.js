#!/usr/bin/env node

/**
 * Migrate Student Life Page to Contentful
 *
 * Creates the `studentLifePage` content type and seeds it with the
 * current hardcoded data from src/pages/student-life.tsx.
 *
 * Usage:
 *   npm run contentful:migrate-student-life
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-student-life-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'studentLifePage'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Student Life Page',
  description: 'Singleton page content for the student life page',
  displayField: 'internalName',
  fields: [
    {
      id: 'internalName',
      name: 'Internal Name',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    // Hub Cards (JSON array of objects with icon strings)
    {
      id: 'hubCards',
      name: 'Hub Cards',
      type: 'Object',
      required: true
    },
    // Campus Features (JSON array of objects with icon strings)
    {
      id: 'campusFeatures',
      name: 'Campus Features',
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
  internalName: 'Student Life Page',
  hubCards: [
    {
      icon: 'palette',
      title: 'Student Showcase',
      desc: 'Browse portfolios, films, animations, and design projects from current students and recent graduates.',
      link: '/student-showcase',
      linkText: 'Explore Showcase',
      image: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: 'heart-handshake',
      title: 'Student Support',
      desc: 'Academic advising, wellness resources, career coaching, and accessibility services \u2014 all in one place.',
      link: '/student-support',
      linkText: 'Get Support',
      image: 'https://images.unsplash.com/photo-1571055931484-22dce9d6c510?auto=format&fit=crop&w=800&q=80'
    },
    {
      icon: 'calculator',
      title: 'Financial Planning & Fees',
      desc: 'Fee structures, payment plans, scholarship opportunities, and financial aid options for every programme.',
      link: '/financial-planning',
      linkText: 'View Fees & Aid',
      image: 'https://images.unsplash.com/photo-1656049471454-ff3c59812741?auto=format&fit=crop&w=800&q=80'
    }
  ],
  campusFeatures: [
    {
      icon: 'movie',
      title: 'Studio Access',
      desc: 'Professional film, animation, audio, and design studios available for student projects and practice sessions.'
    },
    {
      icon: 'users',
      title: 'Community Events',
      desc: 'Regular showcases, hackathons, film screenings, and networking events connecting students with industry professionals.'
    },
    {
      icon: 'briefcase',
      title: 'Career Services',
      desc: 'CV workshops, interview prep, portfolio reviews, and direct introductions to employers across creative industries.'
    },
    {
      icon: 'wifi',
      title: 'Hybrid Learning',
      desc: 'Flexible online and on-campus learning model with digital tools, virtual studios, and remote collaboration support.'
    }
  ],
  seoTitle: 'Student Life | ADMI',
  seoDescription:
    'From creative studios to career support \u2014 everything you need to thrive as an ADMI student.'
})

// ---------- Main ----------

async function main() {
  console.log('=== Student Life Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)
  await ensureEntry(CONTENT_TYPE_ID, seedData)

  console.log('\nDone! Student Life page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
