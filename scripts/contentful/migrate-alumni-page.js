#!/usr/bin/env node

/**
 * Migrate Alumni Page to Contentful
 *
 * Creates:
 *   - `alumniProfile` shared content type (for featured alumni)
 *   - `alumniPage` singleton with stats, company rows, network benefits
 *   - 3 alumniProfile entries (Grace Muthoni, David Kimani, Wanjiku Njeri)
 *
 * Usage:
 *   npm run contentful:migrate-alumni
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-alumni-page.js
 */

const { ensureContentType, ensureEntry, ensureEntries, localize } = require('./utils/contentful-helpers')

// ---------- alumniProfile shared type ----------

async function createAlumniProfileType() {
  return ensureContentType('alumniProfile', {
    name: 'Alumni Profile',
    description: 'Shared content type for featured alumni on the alumni page',
    displayField: 'name',
    fields: [
      { id: 'name', name: 'Name', type: 'Symbol', required: true, validations: [{ unique: true }] },
      { id: 'role', name: 'Role / Position', type: 'Symbol', required: true },
      { id: 'programme', name: 'Programme', type: 'Symbol', required: false },
      { id: 'quote', name: 'Testimonial Quote', type: 'Text', required: false },
      { id: 'image', name: 'Photo URL', type: 'Symbol', required: false },
      { id: 'sortOrder', name: 'Sort Order', type: 'Integer', required: false }
    ]
  })
}

// ---------- alumniPage singleton ----------

async function createAlumniPageType() {
  return ensureContentType('alumniPage', {
    name: 'Alumni Page',
    description: 'Singleton page content for the Alumni page',
    displayField: 'internalName',
    fields: [
      { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true, validations: [{ unique: true }] },
      { id: 'stats', name: 'Stats', type: 'Object', required: false },
      { id: 'companyRows', name: 'Company Rows', type: 'Object', required: false },
      { id: 'networkBenefits', name: 'Network Benefits', type: 'Object', required: false },
      { id: 'seoTitle', name: 'SEO Title', type: 'Symbol', required: false, validations: [{ size: { max: 70 } }] },
      { id: 'seoDescription', name: 'SEO Description', type: 'Symbol', required: false, validations: [{ size: { max: 160 } }] }
    ]
  })
}

// ---------- Seed Data ----------

const alumniProfileSeeds = [
  localize({
    name: 'Grace Muthoni',
    role: 'Senior Editor at NTV Kenya',
    programme: 'Film Production Diploma, Class of 2022',
    quote:
      'The hands-on training at ADMI gave me the confidence to walk into a professional newsroom and deliver from day one. I was editing broadcast-ready packages within my first month at NTV.',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
    sortOrder: 1
  }),
  localize({
    name: 'David Kimani',
    role: 'Creative Director at Ogilvy Africa',
    programme: 'Graphic Design Diploma, Class of 2021',
    quote:
      'My portfolio coming out of ADMI was stronger than what most agencies see from candidates with years of experience. The faculty pushed us to think beyond templates and create original work.',
    image: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?auto=format&fit=crop&w=800&q=80',
    sortOrder: 2
  }),
  localize({
    name: 'Wanjiku Njeri',
    role: 'Sound Engineer at Ogopa DJs',
    programme: 'Sound Engineering Diploma, Class of 2023',
    quote:
      'ADMI connected me directly to the industry. By the time I graduated, I already had freelance clients and a clear path into one of Kenya\u2019s biggest music production houses.',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    sortOrder: 3
  })
]

const alumniPageSeed = localize({
  internalName: 'Alumni Page',
  stats: [
    { value: '4,000+', label: 'Graduates' },
    { value: '87%', label: 'Employment Rate' },
    { value: '15+', label: 'Countries Reached' },
    { value: '200+', label: 'Partner Companies' }
  ],
  companyRows: [
    { names: ['NTV Kenya', 'Ogilvy Africa', 'MSC Cruises', 'Ogopa DJs', 'Sensorflick'] },
    { names: ['Citizen TV', 'Scanad Kenya', 'inABLE', 'BBC Africa'] }
  ],
  networkBenefits: [
    {
      icon: 'briefcase',
      title: 'Career Support',
      desc: 'Access job boards, CV reviews, and career coaching exclusively for ADMI graduates. Our careers team works with 200+ partner companies to match alumni with opportunities.'
    },
    {
      icon: 'users',
      title: 'Networking Events',
      desc: 'Quarterly meetups, industry mixers, and annual homecoming events that keep you connected to fellow graduates and industry leaders across East Africa.'
    },
    {
      icon: 'heart-handshake',
      title: 'Mentorship Programme',
      desc: 'Give back by mentoring current students or connect with senior alumni for guidance. Our structured mentorship programme pairs graduates across disciplines and experience levels.'
    },
    {
      icon: 'speakerphone',
      title: 'Alumni Spotlight',
      desc: 'Get featured on our platforms and amplify your work. From social media takeovers to campus talks, we celebrate alumni achievements and help you build your public profile.'
    }
  ],
  seoTitle: 'Our Alumni | Africa Digital Media Institute',
  seoDescription: 'Meet 4,000+ ADMI graduates building Africa\u2019s creative future. Discover alumni stories, career outcomes, and the network that connects creative professionals.'
})

// ---------- Main ----------

async function main() {
  console.log('=== Alumni Page Migration ===\n')

  await createAlumniProfileType()
  await createAlumniPageType()

  // Seed alumni profiles
  await ensureEntries('alumniProfile', alumniProfileSeeds, { uniqueField: 'name' })

  // Seed alumni page
  await ensureEntry('alumniPage', alumniPageSeed)

  console.log('\nDone! Alumni page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
