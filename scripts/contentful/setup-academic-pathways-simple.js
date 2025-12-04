#!/usr/bin/env node

/**
 * Create Academic Pathways Entries in Contentful
 * 
 * Simplified version that assumes content types already exist
 * 
 * Usage: node scripts/contentful/setup-academic-pathways-simple.js
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
 * Main function
 */
async function main() {
  console.log('\n🚀 Starting Academic Pathways Entry Creation...\n')
  console.log(`Space ID: ${SPACE_ID}`)
  console.log(`Environment: ${ENVIRONMENT}\n`)

  try {
    // Get all content types to find the IDs
    console.log('📋 Fetching content types...')
    const ctResponse = await client.get('/content_types?limit=100')
    const partnerCT = ctResponse.data.items.find(ct => ct.name === 'Partner')
    const academicPathwaysCT = ctResponse.data.items.find(ct => ct.name === 'Academic Pathways')

    if (!partnerCT || !academicPathwaysCT) {
      console.error('❌ Required content types not found!')
      console.error(`Partner: ${partnerCT ? partnerCT.sys.id : 'NOT FOUND'}`)
      console.error(`Academic Pathways: ${academicPathwaysCT ? academicPathwaysCT.sys.id : 'NOT FOUND'}`)
      process.exit(1)
    }

    console.log(`✅ Found Partner CT: ${partnerCT.sys.id}`)
    console.log(`✅ Found Academic Pathways CT: ${academicPathwaysCT.sys.id}\n`)

    // Create Woolf Partner Entry
    console.log('🎓 Creating Woolf University Partner Entry...')
    const woolfEntry = {
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

    let woolfPartnerId
    try {
      const woolfResponse = await client.post('/entries', woolfEntry, {
        headers: {
          'X-Contentful-Content-Type': partnerCT.sys.id
        }
      })
      woolfPartnerId = woolfResponse.data.sys.id
      console.log(`✅ Woolf entry created: ${woolfPartnerId}`)

      // Publish
      await client.put(
        `/entries/${woolfPartnerId}/published`,
        {},
        {
          headers: {
            'X-Contentful-Version': woolfResponse.data.sys.version
          }
        }
      )
      console.log('✅ Woolf entry published')
    } catch (error) {
      console.error('❌ Error creating Woolf entry:', error.response?.data?.message || error.message)
      throw error
    }

    // Create Academic Pathways Page Entry
    console.log('\n📄 Creating Academic Pathways Page Entry...')
    const pathwaysEntry = {
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
      const pathwaysResponse = await client.post('/entries', pathwaysEntry, {
        headers: {
          'X-Contentful-Content-Type': academicPathwaysCT.sys.id
        }
      })
      const pathwaysId = pathwaysResponse.data.sys.id
      console.log(`✅ Academic Pathways entry created: ${pathwaysId}`)

      // Publish
      await client.put(
        `/entries/${pathwaysId}/published`,
        {},
        {
          headers: {
            'X-Contentful-Version': pathwaysResponse.data.sys.version
          }
        }
      )
      console.log('✅ Academic Pathways entry published')

      console.log('\n✅ Academic Pathways setup complete!\n')
      console.log('📋 Summary:')
      console.log(`   - Woolf University Partner: ✅ Created (${woolfPartnerId})`)
      console.log(`   - Academic Pathways Page: ✅ Created (${pathwaysId})`)
      console.log('\n📖 View in Contentful:')
      console.log(`   https://app.contentful.com/spaces/${SPACE_ID}/entries/${pathwaysId}`)
      console.log('\n')
    } catch (error) {
      console.error('❌ Error creating Academic Pathways entry:')
      console.error(JSON.stringify(error.response?.data, null, 2) || error.message)
      throw error
    }
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message)
    process.exit(1)
  }
}

// Run the script
main()
