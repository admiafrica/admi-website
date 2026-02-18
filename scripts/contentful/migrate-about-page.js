#!/usr/bin/env node

/**
 * Migrate About Page to Contentful
 *
 * Creates:
 *   - `teamMember` shared content type (reused by work-with-us)
 *   - `aboutPage` singleton with stats, values, timeline, facilities, partners
 *   - 5 teamMember entries (2 founders + 3 academic staff)
 *
 * Usage:
 *   npm run contentful:migrate-about
 *   or
 *   node -r dotenv/config scripts/contentful/migrate-about-page.js
 */

const { ensureContentType, ensureEntry, ensureEntries, localize } = require('./utils/contentful-helpers')

// ---------- teamMember shared type ----------

async function createTeamMemberType() {
  return ensureContentType('teamMember', {
    name: 'Team Member',
    description: 'Shared content type for founders, academic staff, and faculty',
    displayField: 'name',
    fields: [
      { id: 'name', name: 'Name', type: 'Symbol', required: true, validations: [{ unique: true }] },
      { id: 'role', name: 'Role / Title', type: 'Symbol', required: true },
      { id: 'category', name: 'Category', type: 'Symbol', required: true, validations: [{ in: ['founder', 'academic', 'faculty', 'board', 'staff'] }] },
      { id: 'description', name: 'Short Bio', type: 'Text', required: false, validations: [{ size: { max: 500 } }] },
      { id: 'image', name: 'Photo URL', type: 'Symbol', required: false },
      { id: 'roleColor', name: 'Role Badge Color', type: 'Symbol', required: false },
      { id: 'sortOrder', name: 'Sort Order', type: 'Integer', required: false }
    ]
  })
}

// ---------- aboutPage singleton ----------

async function createAboutPageType() {
  return ensureContentType('aboutPage', {
    name: 'About Page',
    description: 'Singleton page content for the About ADMI page',
    displayField: 'internalName',
    fields: [
      { id: 'internalName', name: 'Internal Name', type: 'Symbol', required: true, validations: [{ unique: true }] },
      { id: 'stats', name: 'Stats', type: 'Object', required: false },
      { id: 'values', name: 'Core Values', type: 'Object', required: false },
      { id: 'timeline', name: 'Timeline Events', type: 'Object', required: false },
      { id: 'facilities', name: 'Campus Facilities', type: 'Object', required: false },
      { id: 'partners', name: 'Partners & Accreditation', type: 'Object', required: false },
      { id: 'seoTitle', name: 'SEO Title', type: 'Symbol', required: false, validations: [{ size: { max: 70 } }] },
      { id: 'seoDescription', name: 'SEO Description', type: 'Symbol', required: false, validations: [{ size: { max: 160 } }] }
    ]
  })
}

// ---------- Seed Data ----------

const teamMemberSeeds = [
  localize({ name: 'Laila Macharia', role: 'Co-Founder and Chair', category: 'founder', description: 'Visionary leader driving ADMI\u2019s strategic growth and Pan-African expansion.', image: 'https://images.unsplash.com/photo-1580867398114-a567342074de?auto=format&fit=crop&w=600&q=80', sortOrder: 1 }),
  localize({ name: 'Wilfred Kiumi', role: 'Co-Founder', category: 'founder', description: 'Pioneering creative education in Africa with deep industry expertise and passion.', image: 'https://images.unsplash.com/photo-1731377209672-c7606ba26c25?auto=format&fit=crop&w=600&q=80', sortOrder: 2 }),
  localize({ name: 'Carolyne Sila', role: 'Head of School', category: 'academic', description: 'Leading academic excellence and curriculum development across all creative media programmes.', image: 'https://images.unsplash.com/photo-1616409000123-b36064d90ed4?auto=format&fit=crop&w=600&q=80', roleColor: '#0A3D3D', sortOrder: 3 }),
  localize({ name: 'Raji Ilangovan', role: 'Student Programs', category: 'academic', description: 'Ensuring students have the support, resources, and mentorship to thrive from day one to graduation.', image: 'https://images.unsplash.com/photo-1624354865933-4b9bdb3cb338?auto=format&fit=crop&w=600&q=80', roleColor: '#F76335', sortOrder: 4 }),
  localize({ name: 'Ciku Munuku', role: 'Faculty Affairs', category: 'academic', description: 'Managing faculty development, industry partnerships, and ensuring teaching quality across departments.', image: 'https://images.unsplash.com/photo-1688841167159-bed18ddaeb44?auto=format&fit=crop&w=600&q=80', roleColor: '#BA2E36', sortOrder: 5 })
]

const aboutPageSeed = localize({
  internalName: 'About Page',
  stats: [
    { value: '15+', label: 'Years of Excellence', color: '#08F6CF' },
    { value: '4,500+', label: 'Graduates', color: '#ffffff' },
    { value: '10+', label: 'Countries Represented', color: '#F76335' },
    { value: '500+', label: 'Industry Partners', color: '#BA2E36' }
  ],
  values: [
    { title: 'Global', desc: 'International education benchmarks with curriculum aligned to EU and Kenyan standards.', color: '#BA2E36', bg: '#FFF0F0' },
    { title: 'Practical', desc: 'Learn-and-Work model combining production training with real industry projects.', color: '#0A3D3D', bg: '#EEF9F7' },
    { title: 'Digital', desc: 'Paperless campus with e-learning tools and industry-standard digital workflows.', color: '#F76335', bg: '#FFF8F0' },
    { title: 'Value-Driven', desc: 'Ethics, psycho-social support, and academic counselling woven into every programme.', color: '#1a1a4e', bg: '#EEF0FF' },
    { title: 'Transformational', desc: 'A defining experience that builds creative professionals ready to shape industries.', color: '#0A3D3D', bg: '#EEFFF9' }
  ],
  timeline: [
    { year: '2011', title: 'The Beginning', desc: 'Wilfred Kiumi establishes JFTA with a vision to build Africa\u2019s creative media talent pipeline.', color: '#BA2E36', border: '#BA2E3644' },
    { year: '2014', title: 'First Campus', desc: 'ADMI\u2019s first dedicated campus opens in Nairobi CBD with purpose-built studios and labs.', color: '#08F6CF', border: '#0A3D3D44' },
    { year: '2015', title: 'Rebranded to ADMI', desc: 'JFTA rebrands to Africa Digital Media Institute with 6 core programmes launched.', color: '#F76335', border: '#F7633544' },
    { year: '2018', title: '1,000th Student', desc: 'Major milestone as ADMI enrols its 1,000th student from across Africa and beyond.', color: '#ffffff', border: '#ffffff22' },
    { year: '2019', title: '$1M+ Revenue, Rubika Partnership', desc: 'Crossed $1M annual revenue, secured AFD $1M investment, and partnered with Rubika International.', color: '#BA2E36', border: '#BA2E3644' },
    { year: '2022', title: '10th Anniversary', desc: 'A decade of impact celebrated with 3,000+ alumni and expanded programme offerings.', color: '#08F6CF', border: '#08F6CF44' },
    { year: '2023', title: 'GOYN and Google.org', desc: 'Partnered with Global Opportunity Youth Network and Google.org to scale youth employment.', color: '#F76335', border: '#F7633544' },
    { year: '2026', title: 'Pan-African Vision', desc: 'EU-accredited degree pathways, Top 10 SME recognition, and 4,500+ graduates shaping industries.', color: '#ffffff', border: 'transparent', highlight: true }
  ],
  facilities: [
    { name: 'Film & Music Studios', desc: 'Soundproofed recording and filming stages', image: 'https://images.unsplash.com/photo-1659083475067-8ab6af362082?auto=format&fit=crop&w=800&q=80', wide: true },
    { name: 'Mac & PC Labs', desc: 'Industry-standard software and hardware', image: 'https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?auto=format&fit=crop&w=800&q=80', wide: true },
    { name: 'Equipment Vault', desc: 'Cameras, lenses, audio gear', image: 'https://images.unsplash.com/photo-1769699167687-540cce99f744?auto=format&fit=crop&w=600&q=80' },
    { name: 'Creative Spaces', desc: 'Collaborative work areas', image: 'https://images.unsplash.com/photo-1765812515298-f299f9e29b68?auto=format&fit=crop&w=600&q=80' },
    { name: 'Resource Library', desc: 'Books, journals, and digital archives', image: 'https://images.unsplash.com/photo-1760035989402-f4b2661a05fd?auto=format&fit=crop&w=600&q=80' }
  ],
  partners: [
    { name: 'Woolf University', desc: 'EU-accredited degree pathways with ECTS credits', bg: '#EEF9F7' },
    { name: 'TVETA Kenya', desc: 'Registered with Kenya\u2019s TVET Authority', bg: '#FFF0F0' },
    { name: 'Rubika International', desc: 'Global creative arts network for animation and gaming', bg: '#EEF0FF' },
    { name: 'Google.org and GOYN', desc: 'Youth employment and digital skills partnerships', bg: '#FFF8F0' }
  ],
  seoTitle: 'About ADMI | Africa Digital Media Institute',
  seoDescription: 'Since 2011, ADMI has pioneered creative media education in East Africa. Learn about our story, mission, leadership, campus, and accreditation.'
})

// ---------- Main ----------

async function main() {
  console.log('=== About Page Migration ===\n')

  await createTeamMemberType()
  await createAboutPageType()

  // Seed team members
  await ensureEntries('teamMember', teamMemberSeeds, { uniqueField: 'name' })

  // Seed about page
  await ensureEntry('aboutPage', aboutPageSeed)

  console.log('\nDone! About page content is ready in Contentful.')
}

main().catch((err) => {
  console.error('Migration failed:', err.message || err)
  if (err.details?.errors) {
    console.error('Details:', JSON.stringify(err.details.errors, null, 2))
  }
  process.exit(1)
})
