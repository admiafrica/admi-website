#!/usr/bin/env node

/**
 * Create Academic Pathways Page in Contentful
 * 
 * This script creates:
 * 1. Content Type: Academic Pathways Page
 * 2. Entry: Academic Pathways with Woolf University partnership info
 * 
 * Usage: node scripts/contentful/create-academic-pathways.js
 * 
 * Required env vars:
 * - CONTENTFUL_SPACE_ID
 * - CONTENTFUL_MANAGEMENT_TOKEN
 */

const axios = require('axios')
const fs = require('fs')
const path = require('path')

// Get environment variables
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master'

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Missing required environment variables:')
  console.error('   - CONTENTFUL_SPACE_ID')
  console.error('   - CONTENTFUL_MANAGEMENT_TOKEN')
  process.exit(1)
}

const API_BASE = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
    'Content-Type': 'application/vnd.contentful.management.v1+json',
    'X-Contentful-Content-Type': 'academicPathways'
  },
  timeout: 10000
})

/**
 * Create or update Content Type for Academic Pathways
 */
async function createContentType() {
  console.log('📝 Creating Content Type: Academic Pathways...')

  const contentTypeDefinition = {
    sys: {
      type: 'ContentType'
    },
    name: 'Academic Pathways',
    description: 'Page showcasing academic partnerships and educational pathways',
    displayField: 'title',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true
      },
      {
        id: 'slug',
        name: 'Slug',
        type: 'Symbol',
        required: true
      },
      {
        id: 'description',
        name: 'Description',
        type: 'Text',
        required: true
      },
      {
        id: 'heroTitle',
        name: 'Hero Title',
        type: 'Symbol',
        required: false
      },
      {
        id: 'heroDescription',
        name: 'Hero Description',
        type: 'Text',
        required: false
      },
      {
        id: 'heroImage',
        name: 'Hero Image',
        type: 'Link',
        linkType: 'Asset',
        required: false
      },
      {
        id: 'partners',
        name: 'Education Partners',
        type: 'Array',
        items: {
          type: 'Link',
          linkType: 'Entry'
        },
        required: false
      },
      {
        id: 'pathwaysSections',
        name: 'Pathways Sections',
        type: 'Array',
        items: {
          type: 'Link',
          linkType: 'Entry'
        },
        required: false
      },
      {
        id: 'benefits',
        name: 'Benefits',
        type: 'Array',
        items: {
          type: 'Object',
          properties: {
            title: { type: 'String' },
            description: { type: 'String' },
            icon: { type: 'String' }
          }
        },
        required: false
      },
      {
        id: 'testimonials',
        name: 'Testimonials',
        type: 'Array',
        items: {
          type: 'Link',
          linkType: 'Entry'
        },
        required: false
      },
      {
        id: 'ctaText',
        name: 'CTA Button Text',
        type: 'Symbol',
        required: false
      },
      {
        id: 'ctaUrl',
        name: 'CTA Button URL',
        type: 'Symbol',
        required: false
      },
      {
        id: 'metadata',
        name: 'SEO Metadata',
        type: 'Object',
        properties: {
          metaTitle: { type: 'String' },
          metaDescription: { type: 'String' },
          keywords: { type: 'String' }
        },
        required: false
      }
    ]
  }

  try {
    // Try to get existing content type
    try {
      const response = await client.get(`/content_types/academicPathways`)
      console.log('✅ Content Type already exists: academicPathways')
      return response.data
    } catch (error) {
      if (error.response?.status !== 404) throw error
      
      // Create new content type
      const response = await client.post('/content_types', contentTypeDefinition)
      console.log('✅ Content Type created: academicPathways')
      
      // Publish content type
      await client.put(
        `/content_types/academicPathways/published`,
        {},
        {
          headers: {
            'X-Contentful-Version': response.data.sys.version
          }
        }
      )
      console.log('✅ Content Type published')
      
      return response.data
    }
  } catch (error) {
    console.error('❌ Error creating content type:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Create Partner Content Type
 */
async function createPartnerContentType() {
  console.log('📝 Creating Content Type: Partner...')

  const contentTypeDefinition = {
    sys: {
      type: 'ContentType'
    },
    name: 'Partner',
    description: 'Education partner information',
    displayField: 'name',
    fields: [
      {
        id: 'name',
        name: 'Partner Name',
        type: 'Symbol',
        required: true
      },
      {
        id: 'description',
        name: 'Description',
        type: 'Text',
        required: false
      },
      {
        id: 'logo',
        name: 'Logo',
        type: 'Link',
        linkType: 'Asset',
        required: false
      },
      {
        id: 'website',
        name: 'Website URL',
        type: 'Symbol',
        required: false
      },
      {
        id: 'type',
        name: 'Partner Type',
        type: 'Symbol',
        required: false,
        validations: [
          {
            in: ['University', 'Organization', 'Employer', 'Certification Body']
          }
        ]
      }
    ]
  }

  try {
    try {
      const response = await client.get(`/content_types/partner`)
      console.log('✅ Content Type already exists: partner')
      return response.data
    } catch (error) {
      if (error.response?.status !== 404) throw error
      
      const response = await client.post('/content_types', contentTypeDefinition)
      console.log('✅ Content Type created: partner')
      
      await client.put(
        `/content_types/partner/published`,
        {},
        {
          headers: {
            'X-Contentful-Version': response.data.sys.version
          }
        }
      )
      console.log('✅ Content Type published')
      
      return response.data
    }
  } catch (error) {
    console.error('❌ Error creating partner content type:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Create Woolf University Partner Entry
 */
async function createWoolfPartner() {
  console.log('🎓 Creating Woolf University Partner Entry...')

  const entry = {
    fields: {
      name: {
        'en-US': 'Woolf University'
      },
      description: {
        'en-US': 'Woolf University is a world-class online university offering globally-recognised degrees. ADMI students benefit from Woolf\'s rigorous academic standards and access to world-class education.'
      },
      website: {
        'en-US': 'https://woolf.university/colleges/africa-digital-media-institute'
      },
      type: {
        'en-US': 'University'
      }
    }
  }

  try {
    // Check if Woolf entry already exists
    const searchResponse = await client.get('/entries?content_type=partner&fields.name=Woolf University')
    
    if (searchResponse.data.items.length > 0) {
      console.log('✅ Woolf University entry already exists')
      return searchResponse.data.items[0]
    }

    const response = await client.post('/entries', entry, {
      headers: {
        'X-Contentful-Content-Type': 'partner'
      }
    })
    
    const entryId = response.data.sys.id
    const version = response.data.sys.version

    // Publish entry
    await client.put(
      `/entries/${entryId}/published`,
      {},
      {
        headers: {
          'X-Contentful-Version': version
        }
      }
    )

    console.log('✅ Woolf University partner entry created and published:', entryId)
    return response.data
  } catch (error) {
    console.error('❌ Error creating Woolf partner entry:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Create Academic Pathways Page Entry
 */
async function createAcademicPathwaysPage(woolfPartnerId) {
  console.log('📖 Creating Academic Pathways Page Entry...')

  const entry = {
    fields: {
      title: {
        'en-US': 'Academic Pathways'
      },
      slug: {
        'en-US': 'academic-pathways'
      },
      description: {
        'en-US': 'Explore multiple academic pathways for your career advancement through partnerships with world-class institutions.'
      },
      heroTitle: {
        'en-US': 'World-Class Academic Pathways'
      },
      heroDescription: {
        'en-US': 'Access internationally-recognized qualifications through our strategic partnerships with leading educational institutions. Advance your creative career with credentials that matter globally.'
      },
      partners: {
        'en-US': [
          {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: woolfPartnerId
            }
          }
        ]
      },
      benefits: {
        'en-US': [
          {
            title: 'Globally Recognized Qualifications',
            description: 'Earn degrees and certifications recognized by employers worldwide',
            icon: '🎓'
          },
          {
            title: 'Flexible Learning',
            description: 'Study at your own pace with online and blended learning options',
            icon: '📚'
          },
          {
            title: 'Career Advancement',
            description: 'Access career pathways that lead to premium roles in the creative industry',
            icon: '🚀'
          },
          {
            title: 'Industry-Relevant Curriculum',
            description: 'Learn from up-to-date content aligned with industry demands',
            icon: '⚙️'
          },
          {
            title: 'Student Support',
            description: 'Get personalized support throughout your academic journey',
            icon: '🤝'
          },
          {
            title: 'Scholarship Opportunities',
            description: 'Access funding options to make education more affordable',
            icon: '💰'
          }
        ]
      },
      ctaText: {
        'en-US': 'Explore Academic Pathways'
      },
      ctaUrl: {
        'en-US': '/contact?subject=academic-pathways'
      },
      metadata: {
        'en-US': {
          metaTitle: 'Academic Pathways | ADMI & Woolf University Partnership',
          metaDescription: 'Advance your creative career with globally-recognized qualifications through ADMI\'s partnership with Woolf University.',
          keywords: 'academic pathways, Woolf University, ADMI partnership, creative education, online degrees, professional development'
        }
      }
    }
  }

  try {
    // Check if page already exists
    const searchResponse = await client.get('/entries?content_type=academicPathways&fields.slug=academic-pathways')
    
    if (searchResponse.data.items.length > 0) {
      console.log('✅ Academic Pathways page already exists')
      return searchResponse.data.items[0]
    }

    const response = await client.post('/entries', entry, {
      headers: {
        'X-Contentful-Content-Type': 'academicPathways'
      }
    })
    
    const entryId = response.data.sys.id
    const version = response.data.sys.version

    // Publish entry
    await client.put(
      `/entries/${entryId}/published`,
      {},
      {
        headers: {
          'X-Contentful-Version': version
        }
      }
    )

    console.log('✅ Academic Pathways page created and published:', entryId)
    return response.data
  } catch (error) {
    console.error('❌ Error creating Academic Pathways page:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🚀 Starting Academic Pathways Setup...\n')
  console.log(`Space ID: ${SPACE_ID}`)
  console.log(`Environment: ${ENVIRONMENT}\n`)

  try {
    // Create content types
    await createPartnerContentType()
    await createContentType()

    // Create entries
    const woolfPartner = await createWoolfPartner()
    const woolfId = woolfPartner.sys.id

    const academicPathways = await createAcademicPathwaysPage(woolfId)

    console.log('\n✅ Academic Pathways setup complete!\n')
    console.log('📋 Summary:')
    console.log(`   - Partner Content Type: ✅ Created`)
    console.log(`   - Academic Pathways Content Type: ✅ Created`)
    console.log(`   - Woolf University Partner: ✅ Created (${woolfId})`)
    console.log(`   - Academic Pathways Page: ✅ Created (${academicPathways.sys.id})`)
    console.log('\n📖 View in Contentful:')
    console.log(`   https://app.contentful.com/spaces/${SPACE_ID}/entries/${academicPathways.sys.id}`)
    console.log('\n')
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message)
    process.exit(1)
  }
}

// Run the script
main()
