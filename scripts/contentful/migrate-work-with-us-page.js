#!/usr/bin/env node

/**
 * Migrate Work With Us Page to Contentful
 *
 * Creates the `workWithUsPage` content type and seeds it with the
 * current hardcoded data from src/pages/work-with-us.tsx.
 *
 * Usage:
 *   npm run contentful:migrate-work-with-us
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-work-with-us-page.js
 */

const { ensureContentType, ensureEntry, localize } = require('./utils/contentful-helpers')

const CONTENT_TYPE_ID = 'workWithUsPage'

// ---------- Content Type Definition ----------

const contentTypeDefinition = {
  name: 'Work With Us Page',
  description: 'Singleton page content for the Work With Us / Careers page',
  displayField: 'internalName',
  fields: [
    {
      id: 'internalName',
      name: 'Internal Name',
      type: 'Symbol',
      required: true,
      validations: [{ unique: true }]
    },
    // Faculty members (JSON array)
    {
      id: 'faculty',
      name: 'Faculty Members',
      type: 'Object',
      required: true
    },
    // Job openings (JSON array)
    {
      id: 'openings',
      name: 'Open Positions',
      type: 'Object',
      required: true
    },
    // Benefits (JSON array with icon string IDs)
    {
      id: 'benefits',
      name: 'Benefits',
      type: 'Object',
      required: true
    },
    // Team members (JSON array)
    {
      id: 'teamMembers',
      name: 'Team Members',
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
    },
    {
      id: 'seoKeywords',
      name: 'SEO Keywords',
      type: 'Symbol',
      required: false,
      validations: [{ size: { max: 300 } }]
    }
  ]
}

// ---------- Seed Data (mirrors current hardcoded data) ----------

const seedData = localize({
  internalName: 'Work With Us Page',
  faculty: [
    {
      name: 'Prof. Michael Otieno',
      title: 'Head of Film & TV',
      description:
        'Award-winning filmmaker with over 15 years of experience in East African cinema and broadcast television.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Sarah Kamau',
      title: 'Lead, Digital Design',
      description:
        'Former creative director at a leading Nairobi agency, specialising in brand identity and UX for African markets.',
      image:
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'James Mwangi',
      title: 'Director, Music Production',
      description:
        'Grammy-nominated producer and sound engineer who has shaped the Kenyan music scene for over a decade.',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
    }
  ],
  openings: [
    {
      title: 'Film Production Lecturer',
      type: 'Full-time',
      location: 'Nairobi',
      posted: 'Posted Jan 2026',
      description:
        'Deliver practical modules across screenwriting, cinematography, and post-production workflows for diploma learners.'
    },
    {
      title: 'Motion Graphics Instructor',
      type: 'Full-time / Contract',
      location: 'Nairobi',
      posted: 'Posted Jan 2026',
      description:
        'Teach motion design principles using After Effects, Cinema 4D, and emerging real-time tools.'
    },
    {
      title: 'Graphic Design Instructor',
      type: 'Full-time',
      location: 'Hybrid',
      posted: 'Posted Feb 2026',
      description:
        'Guide learners through brand identity, editorial layout, and digital illustration projects.'
    },
    {
      title: 'Sound Engineering Lab Technician',
      type: 'Full-time',
      location: 'Nairobi',
      posted: 'Posted Feb 2026',
      description:
        'Maintain studio equipment, support practical sessions, and ensure lab readiness for audio production classes.'
    }
  ],
  benefits: [
    {
      icon: 'bulb',
      title: 'Creative Environment',
      description:
        'Work alongside industry professionals in state-of-the-art studios and labs.'
    },
    {
      icon: 'rocket',
      title: 'Impact-Driven',
      description: 'Shape the future of creative education across East Africa.'
    },
    {
      icon: 'briefcase',
      title: 'Professional Growth',
      description:
        'Access to industry events, workshops, and continuous learning opportunities.'
    },
    {
      icon: 'heart',
      title: 'Strong Community',
      description:
        'Join a diverse team of passionate educators and creatives.'
    }
  ],
  teamMembers: [
    {
      name: 'Angela Ndegwa',
      role: 'Director of Admissions',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'David Ochieng',
      role: 'Head of Student Affairs',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Fatima Hassan',
      role: 'HR & People Lead',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Brian Kiplagat',
      role: 'Operations Manager',
      image:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
    }
  ],
  seoTitle: 'Work With Us',
  seoDescription:
    "Join ADMI's award-winning faculty and team. Explore open positions in film, design, music production, and creative education in Nairobi, Kenya.",
  seoKeywords:
    'ADMI careers, work at ADMI, creative education jobs, teaching jobs Nairobi, film lecturer, design instructor'
})

// ---------- Main ----------

async function main() {
  console.log('=== Work With Us Page Migration ===\n')

  await ensureContentType(CONTENT_TYPE_ID, contentTypeDefinition)
  await ensureEntry(CONTENT_TYPE_ID, seedData)

  console.log('\nDone! Work With Us page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
