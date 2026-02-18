/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Seed Diploma Trust Elements to Contentful
 * 
 * This script creates entries in Contentful based on the hardcoded data
 * in our diploma course components. After running this, the content team
 * can edit the data in Contentful.
 * 
 * Usage: npm run contentful:seed-diploma
 * 
 * Prerequisites:
 * - CONTENTFUL_SPACE_ID
 * - CONTENTFUL_MANAGEMENT_TOKEN
 */

require('dotenv').config()

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = 'master'

// ============ HARDCODED DATA FROM COMPONENTS ============

const INTERNSHIP_PARTNERS = [
  { name: 'Nation Media Group', industry: 'Media & Broadcasting' },
  { name: 'Standard Group', industry: 'Media & Broadcasting' },
  { name: 'Homeboyz Entertainment', industry: 'Entertainment & Events' },
  { name: 'Ketebul Music', industry: 'Music Production' },
  { name: 'Safaricom', industry: 'Technology & Telecom' },
  { name: 'Radio Africa', industry: 'Media & Broadcasting' }
]

const INDUSTRY_QUOTES = [
  {
    quote: "ADMI graduates come prepared. They understand both the creative and technical sides of production. We don't need to teach them basics - they're ready to contribute from day one.",
    author: 'David Odhiambo',
    role: 'Head of Production',
    company: 'Nation Media Group'
  },
  {
    quote: "The practical experience they gain during bootcamps and internships shows. When we hire ADMI diploma graduates, we're hiring professionals who understand studio workflows.",
    author: 'Grace Muthoni',
    role: 'Studio Manager',
    company: 'Ketebul Music'
  },
  {
    quote: "We've hired 12 ADMI interns over the past two years. Eight of them are now full-time employees. That says everything about the quality of training they receive.",
    author: 'Michael Kamau',
    role: 'Creative Director',
    company: 'Homeboyz Entertainment'
  }
]

const ALUMNI_SUCCESS_STORIES = [
  {
    name: 'James Mwangi',
    role: 'Audio Engineer',
    company: 'Nation Media Group',
    story: 'Started as an intern during my 5th semester. Three months later, I was offered a full-time position. The hands-on training at ADMI prepared me for real studio work.',
    graduationYear: '2024'
  },
  {
    name: 'Sarah Ochieng',
    role: 'Assistant Director',
    company: 'Riverwood Studios',
    story: 'My internship turned into my career. The equipment access and bootcamp training meant I already knew the tools we use professionally.',
    graduationYear: '2023'
  }
]

const DIPLOMA_EXCLUSIVES = [
  {
    title: 'Professional Equipment Access',
    description: 'Full access to industry-standard cameras, sound equipment, editing suites, and production studios during in-person bootcamps.'
  },
  {
    title: 'Guaranteed Internship',
    description: '5th semester industry placement with leading media companies. Get real work experience before graduation.'
  },
  {
    title: 'Degree Pathway',
    description: 'Articulate directly into Year 2 of a BA degree at ADMI or partner universities. Your diploma counts.'
  },
  {
    title: 'Alumni Network',
    description: 'Join 2,000+ ADMI graduates working across Africa. Exclusive job boards, events, and mentorship opportunities.'
  },
  {
    title: 'Portfolio Development',
    description: 'Graduate with a professional portfolio of real projects. Reviewed by industry mentors to ensure market readiness.'
  },
  {
    title: 'Industry Mentorship',
    description: 'One-on-one guidance from working professionals in your field. Learn from people actively shaping the industry.'
  }
]

// ============ HELPER FUNCTIONS ============

async function makeRequest(endpoint, method = 'GET', body = null) {
  const url = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}${endpoint}`
  
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json'
    }
  }
  
  if (body) {
    options.body = JSON.stringify(body)
  }
  
  const response = await fetch(url, options)
  
  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`API Error (${response.status}): ${errorBody}`)
  }
  
  return response.json()
}

async function createEntry(contentType, fields) {
  // Transform fields to Contentful format (add locale)
  const localizedFields = {}
  for (const [key, value] of Object.entries(fields)) {
    localizedFields[key] = { 'en-US': value }
  }
  
  return makeRequest(`/entries`, 'POST', {
    fields: localizedFields
  }, {
    'X-Contentful-Content-Type': contentType
  })
}

async function createAndPublishEntry(contentType, fields) {
  const url = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`
  
  // Transform fields to Contentful format (add locale)
  const localizedFields = {}
  for (const [key, value] of Object.entries(fields)) {
    localizedFields[key] = { 'en-US': value }
  }
  
  // Create entry
  const createResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      'X-Contentful-Content-Type': contentType
    },
    body: JSON.stringify({ fields: localizedFields })
  })
  
  if (!createResponse.ok) {
    const errorBody = await createResponse.text()
    throw new Error(`Create Error (${createResponse.status}): ${errorBody}`)
  }
  
  const entry = await createResponse.json()
  console.log(`  Created ${contentType}: ${fields.name || fields.title || fields.author || 'entry'}`)
  
  // Publish entry
  const publishUrl = `${url}/${entry.sys.id}/published`
  const publishResponse = await fetch(publishUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
      'X-Contentful-Version': entry.sys.version.toString()
    }
  })
  
  if (publishResponse.ok) {
    console.log(`  Published ${contentType}`)
  } else {
    console.log(`  Note: Could not auto-publish (may need manual publishing)`)
  }
  
  return entry
}

// ============ SEED FUNCTIONS ============

async function seedIndustryPartners() {
  console.log('\n📦 Seeding Industry Partners...')
  
  for (const partner of INTERNSHIP_PARTNERS) {
    try {
      await createAndPublishEntry('industryPartners', {
        name: partner.name,
        partnershipType: partner.industry,
        description: `Industry partner providing internship opportunities for ADMI diploma students.`
      })
    } catch (error) {
      console.log(`  Error creating partner ${partner.name}:`, error.message)
    }
  }
}

async function seedIndustryQuotes() {
  console.log('\n💬 Seeding Industry Quotes...')
  
  for (const quote of INDUSTRY_QUOTES) {
    try {
      await createAndPublishEntry('industryQuote', {
        quote: quote.quote,
        author: quote.author,
        role: quote.role,
        company: quote.company
      })
    } catch (error) {
      console.log(`  Error creating quote from ${quote.author}:`, error.message)
    }
  }
}

async function seedAlumniStories() {
  console.log('\n🎓 Seeding Alumni Stories...')
  
  for (const alumni of ALUMNI_SUCCESS_STORIES) {
    try {
      await createAndPublishEntry('alumniStories', {
        name: alumni.name,
        role: alumni.role,
        company: alumni.company,
        story: alumni.story,
        graduationYear: alumni.graduationYear
      })
    } catch (error) {
      console.log(`  Error creating alumni story for ${alumni.name}:`, error.message)
    }
  }
}

async function seedDiplomaExclusives() {
  console.log('\n✨ Seeding Course Benefits (Diploma Exclusives)...')
  console.log('  Note: courseBenefits content type uses title/description fields')
  
  for (const exclusive of DIPLOMA_EXCLUSIVES) {
    try {
      await createAndPublishEntry('courseBenefits', {
        title: exclusive.title,
        description: exclusive.description,
        icon: 'check-circle' // Default icon
      })
    } catch (error) {
      console.log(`  Error creating benefit ${exclusive.title}:`, error.message)
    }
  }
}

// ============ MAIN ============

async function main() {
  console.log('🌱 Contentful Seed Script - Diploma Trust Elements')
  console.log('================================================')
  console.log(`Space: ${SPACE_ID}`)
  console.log(`Environment: ${ENVIRONMENT}`)
  
  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    console.error('\n❌ Missing environment variables:')
    console.error('   CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN are required')
    process.exit(1)
  }
  
  console.log('\nNote: Make sure you have run npm run contentful:create-types first!')
  console.log('This script creates entries in the content types created by that script.')
  
  try {
    // Test connection
    console.log('\n🔌 Testing connection...')
    await makeRequest('/content_types?limit=1')
    console.log('  ✅ Connected to Contentful')
    
    // Seed data
    await seedIndustryPartners()
    await seedIndustryQuotes()
    await seedAlumniStories()
    await seedDiplomaExclusives()
    
    console.log('\n✅ Seed script complete!')
    console.log('\nNext steps:')
    console.log('1. Go to Contentful and review the created entries')
    console.log('2. Link entries to specific diploma courses')
    console.log('3. Add images where needed (partner logos, alumni photos)')
    console.log('4. Update placeholder text with real content')
    
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
