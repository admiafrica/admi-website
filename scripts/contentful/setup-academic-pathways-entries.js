#!/usr/bin/env node

/**
 * Create Academic Pathways Entries in Contentful
 * 
 * This script creates:
 * 1. Woolf University Partner Entry
 * 2. Academic Pathways Page Entry with Woolf Partnership reference
 * 
 * Usage: node scripts/contentful/setup-academic-pathways-entries.js
 * 
 * Required env vars:
 * - CONTENTFUL_SPACE_ID
 * - CONTENTFUL_MANAGEMENT_TOKEN
 */

const axios = require('axios')

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
    'Content-Type': 'application/vnd.contentful.management.v1+json'
  },
  timeout: 10000
})

/**
 * Ensure Academic Pathways Content Type exists and is published
 */
async function ensureAcademicPathwaysContentType() {
  console.log('📝 Ensuring Academic Pathways Content Type exists...')

  const contentTypeDefinition = {
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
        id: 'partners',
        name: 'Partners',
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
        type: 'Text',
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
      }
    ]
  }

  try {
    // Try to get existing content type
    const response = await client.get('/content_types/academicPathways')
    
    if (response.data.sys.publishedVersion) {
      console.log('✅ Academic Pathways Content Type already exists and is published')
      return response.data.sys.id
    }

    // Publish it if not published
    await client.put(
      '/content_types/academicPathways/published',
      {},
      {
        headers: {
          'X-Contentful-Version': response.data.sys.version
        }
      }
    )
    console.log('✅ Academic Pathways Content Type published')
    return response.data.sys.id
  } catch (error) {
    if (error.response?.status === 404) {
      // Create new content type
      try {
        const createResponse = await client.post('/content_types', contentTypeDefinition)
        const ctId = createResponse.data.sys.id
        console.log(`✅ Academic Pathways Content Type created with ID: ${ctId}`)
        
        // Publish it
        await client.put(
          `/content_types/${ctId}/published`,
          {},
          {
            headers: {
              'X-Contentful-Version': createResponse.data.sys.version
            }
          }
        )
        console.log('✅ Academic Pathways Content Type published')
        return ctId
      } catch (createError) {
        console.error('❌ Error creating Academic Pathways Content Type:')
        console.error(JSON.stringify(createError.response?.data, null, 2))
        throw createError
      }
    } else {
      throw error
    }
  }
}

/**
 * Ensure Partner Content Type is published
 */
async function ensurePartnerContentTypePublished() {
  console.log('📝 Ensuring Partner Content Type is published...')

  try {
    // Get the partner content type
    const response = await client.get('/content_types/11GIFlaTgpnZEWEr6AElPr')
    
    if (response.data.sys.publishedVersion) {
      console.log('✅ Partner Content Type is already published')
      return
    }

    // Publish it
    await client.put(
      '/content_types/11GIFlaTgpnZEWEr6AElPr/published',
      {},
      {
        headers: {
          'X-Contentful-Version': response.data.sys.version
        }
      }
    )
    console.log('✅ Partner Content Type published')
  } catch (error) {
    console.error('⚠️  Warning: Could not publish Partner Content Type:')
    console.error(error.response?.data?.message || error.message)
  }
}

/**
 * Create Woolf University Partner Entry
 */
async function createWoolfPartner() {
  console.log('🎓 Creating/Updating Woolf University Partner Entry...')

  const entryData = {
    fields: {
      name: {
        'en-US': 'Woolf University'
      },
      description: {
        'en-US': 'Woolf University is a world-class online university offering globally-recognised degrees. ADMI students benefit from Woolf\'s rigorous academic standards and access to world-class education. Our quality assurance and articulation (credit transfer) arrangement with Woolf University guarantees full recognition of your ADMI diploma towards a university degree in Europe under the European Credit Transfer System (ECTS).'
      },
      website: {
        'en-US': 'https://www.woolf.university'
      },
      type: {
        'en-US': 'University'
      }
    }
  }

  try {
    // Create new entry without search - just post directly
    const response = await client.post('/entries', entryData, {
      params: {
        skipValidation: false
      },
      headers: {
        'X-Contentful-Content-Type': '11GIFlaTgpnZEWEr6AElPr' // Use actual Partner content type ID
      }
    })
    
    console.log(`✅ Woolf entry created: ${response.data.sys.id}`)
    
    // Publish the entry
    await client.put(
      `/entries/${response.data.sys.id}/published`,
      {},
      {
        headers: {
          'X-Contentful-Version': response.data.sys.version
        }
      }
    )
    console.log('✅ Woolf entry published')
    
    return response.data
  } catch (error) {
    console.error('❌ Error creating Woolf entry:')
    if (error.response?.data) {
      console.error(JSON.stringify(error.response.data, null, 2))
    } else {
      console.error(error.message)
    }
    throw error
  }
}

/**
 * Create Academic Pathways Page Entry
 */
async function createAcademicPathwaysPage(woolfPartnerId, academicPathwaysCtId) {
  console.log('📄 Creating/Updating Academic Pathways Page Entry...')

  const entryData = {
    fields: {
      title: {
        'en-US': 'Academic Pathways'
      },
      slug: {
        'en-US': 'main'
      },
      description: {
        'en-US': 'Explore ADMI\'s academic pathways and strategic partnerships with leading institutions. Discover seamless transitions for further studies and career opportunities in digital media and creative technology.'
      },
      heroTitle: {
        'en-US': 'Academic Pathways'
      },
      heroDescription: {
        'en-US': 'At Africa Digital Media Institute (ADMI), we are committed to providing our students with a world-class education that opens doors to endless possibilities. Through our strategic partnerships with leading institutions both locally and internationally, we offer seamless academic pathways.'
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
        'en-US': JSON.stringify([
          {
            title: 'Articulation Agreements',
            description: 'ADMI has established articulation agreements with reputable universities around the globe.',
            icon: 'globe'
          },
          {
            title: 'Alignment with KNQF',
            description: 'Our academic programs are designed to meet the standards set by the Kenya National Qualifications Framework.',
            icon: 'check'
          },
          {
            title: 'University Recognition',
            description: 'Our partnership with Woolf University guarantees full recognition of ADMI diplomas towards degrees in Europe.',
            icon: 'graduation'
          },
          {
            title: 'Pathways to Further Education',
            description: 'Seamless transition to further studies, both locally and internationally through our strategic partnerships.',
            icon: 'arrow'
          }
        ])
      },
      ctaText: {
        'en-US': 'Learn More'
      },
      ctaUrl: {
        'en-US': 'https://admi.africa/apply'
      }
    }
  }

  try {
    // Create new entry directly
    console.log(`  Using content type ID: ${academicPathwaysCtId}`)
    const response = await client.post('/entries', entryData, {
      params: {
        skipValidation: false
      },
      headers: {
        'X-Contentful-Content-Type': academicPathwaysCtId
      }
    })
    
    console.log(`✅ Academic Pathways page created: ${response.data.sys.id}`)
    
    // Publish the entry
    await client.put(
      `/entries/${response.data.sys.id}/published`,
      {},
      {
        headers: {
          'X-Contentful-Version': response.data.sys.version
        }
      }
    )
    console.log('✅ Academic Pathways page published')
    
    return response.data
  } catch (error) {
    // If entry already exists with conflict, try to get and update it
    if (error.response?.status === 409 || error.response?.data?.sys?.id === 'Conflict') {
      console.log('⚠️ Entry already exists, attempting to update...')
      try {
        // Try to find existing page entry
        const searchResponse = await client.get('/entries', {
          params: {
            content_type: academicPathwaysCtId,
            'fields.slug': 'main'
          }
        })

        if (searchResponse.data.items.length > 0) {
          const existingEntry = searchResponse.data.items[0]
          console.log(`✅ Found existing Academic Pathways page: ${existingEntry.sys.id}`)
          
          // Update it
          const updateResponse = await client.put(
            `/entries/${existingEntry.sys.id}`,
            { ...entryData, sys: existingEntry.sys },
            {
              headers: {
                'X-Contentful-Version': existingEntry.sys.version
              }
            }
          )
          console.log('✅ Academic Pathways page updated')
          return updateResponse.data
        }
      } catch (searchError) {
        console.error('❌ Could not find existing entry either')
        throw searchError
      }
    }
    
    console.error('❌ Error creating Academic Pathways page:')
    if (error.response?.data) {
      console.error(JSON.stringify(error.response.data, null, 2))
    } else {
      console.error(error.message)
    }
    throw error
  }
}

/**
 * Main function
 */
async function main() {
  console.log('\n🚀 Starting Academic Pathways Setup...\n')
  console.log(`Space ID: ${SPACE_ID}`)
  console.log(`Environment: ${ENVIRONMENT}\n`)

  try {
    // Ensure content types exist and are published
    const academicPathwaysCtId = await ensureAcademicPathwaysContentType()
    await ensurePartnerContentTypePublished()

    // Create entries
    const woolfPartner = await createWoolfPartner()
    const woolfId = woolfPartner.sys.id

    const academicPathways = await createAcademicPathwaysPage(woolfId, academicPathwaysCtId)

    console.log('\n✅ Academic Pathways setup complete!\n')
    console.log('📋 Summary:')
    console.log(`   - Woolf University Partner: ✅ Created/Updated (${woolfId})`)
    console.log(`   - Academic Pathways Page: ✅ Created/Updated (${academicPathways.sys.id})`)
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
