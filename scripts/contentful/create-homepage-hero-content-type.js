#!/usr/bin/env node

/**
 * Create Homepage Hero Content Type in Contentful
 *
 * This script creates a new content type for managing homepage hero content
 * including title, description, and CTA text.
 *
 * Usage:
 *   npm run contentful:create-hero
 *   or
 *   node -r dotenv/config scripts/contentful/create-homepage-hero-content-type.js
 *
 * Required environment variables:
 *   - ADMI_CONTENTFUL_SPACE_ID
 *   - CONTENTFUL_MANAGEMENT_TOKEN
 *   - ADMI_CONTENTFUL_ENVIRONMENT (optional, defaults to 'master')
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const contentful = require('contentful-management')

// Environment configuration
const SPACE_ID = process.env.ADMI_CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Missing required environment variables:')
  if (!SPACE_ID) console.error('   - ADMI_CONTENTFUL_SPACE_ID')
  if (!MANAGEMENT_TOKEN) console.error('   - CONTENTFUL_MANAGEMENT_TOKEN')
  process.exit(1)
}

const CONTENT_TYPE_ID = 'homepageHero'

// Initial hero content entry
const initialHeroContent = {
  internalName: { 'en-US': 'Main Homepage Hero' },
  heroTitle: { 'en-US': 'Launch your career in Creative' },
  heroHighlightWord: { 'en-US': 'Media & Technology' },
  heroDescription: {
    'en-US':
      'ADMI (Africa Digital Media Institute) is a leading creative media and technology training institution based in Nairobi, Kenya. Our programmes are delivered through a flexible hybrid model that combines online learning with in person sessions, so you can study in a format that works for you. Explore our diploma and certificate courses and get started today.'
  },
  ctaButtonText: { 'en-US': 'Learn More' },
  searchPlaceholder: { 'en-US': 'What are you looking for?' },
  isActive: { 'en-US': true }
}

async function main() {
  console.log('🚀 Contentful Homepage Hero Content Type Setup')
  console.log('================================================')
  console.log(`Space ID: ${SPACE_ID}`)
  console.log(`Environment: ${ENVIRONMENT_ID}`)
  console.log('')

  try {
    // Initialize Contentful client
    const client = contentful.createClient({
      accessToken: MANAGEMENT_TOKEN
    })

    const space = await client.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    // Check if content type already exists
    let contentType
    try {
      contentType = await environment.getContentType(CONTENT_TYPE_ID)
      console.log('⚠️  Content type "homepageHero" already exists.')
      console.log('   Skipping content type creation...')
    } catch (error) {
      if (error.name === 'NotFound') {
        // Create content type
        console.log('📝 Creating content type...')
        contentType = await environment.createContentTypeWithId(CONTENT_TYPE_ID, {
          name: 'Homepage Hero',
          description: 'Hero section content for the homepage including title, description, and call-to-action',
          displayField: 'internalName',
          fields: [
            {
              id: 'internalName',
              name: 'Internal Name',
              type: 'Symbol',
              required: true,
              localized: false,
              validations: [{ unique: true }]
            },
            {
              id: 'heroTitle',
              name: 'Hero Title',
              type: 'Symbol',
              required: true,
              localized: false,
              validations: [{ size: { max: 100 } }]
            },
            {
              id: 'heroHighlightWord',
              name: 'Hero Highlight Word',
              type: 'Symbol',
              required: false,
              localized: false,
              validations: [{ size: { max: 50 } }]
            },
            {
              id: 'heroDescription',
              name: 'Hero Description',
              type: 'Text',
              required: true,
              localized: false,
              validations: [{ size: { max: 1000 } }]
            },
            {
              id: 'ctaButtonText',
              name: 'CTA Button Text',
              type: 'Symbol',
              required: false,
              localized: false,
              validations: [{ size: { max: 50 } }]
            },
            {
              id: 'searchPlaceholder',
              name: 'Search Placeholder',
              type: 'Symbol',
              required: false,
              localized: false,
              validations: [{ size: { max: 100 } }]
            },
            {
              id: 'isActive',
              name: 'Is Active',
              type: 'Boolean',
              required: false,
              localized: false
            }
          ]
        })
        console.log('✅ Content type created successfully')

        // Publish content type
        console.log('📤 Publishing content type...')
        await contentType.publish()
        console.log('✅ Content type published')
      } else {
        throw error
      }
    }

    // Check if an entry already exists
    const entries = await environment.getEntries({
      content_type: CONTENT_TYPE_ID,
      limit: 1
    })

    if (entries.items.length > 0) {
      console.log('⚠️  An entry already exists for homepageHero')
      console.log(`   Entry ID: ${entries.items[0].sys.id}`)
      console.log('   Skipping entry creation...')
    } else {
      // Create initial entry
      console.log('📄 Creating initial hero content entry...')
      const entry = await environment.createEntry(CONTENT_TYPE_ID, {
        fields: initialHeroContent
      })
      console.log('✅ Initial hero content entry created')

      // Publish entry
      console.log('📤 Publishing entry...')
      await entry.publish()
      console.log('✅ Entry published')
    }

    console.log('')
    console.log('🎉 Setup complete!')
    console.log('')
    console.log('Content Type Fields:')
    console.log('  - internalName: Internal identifier')
    console.log('  - heroTitle: Main title text')
    console.log('  - heroHighlightWord: Animated/highlighted word')
    console.log('  - heroDescription: Description paragraph')
    console.log('  - ctaButtonText: Button label')
    console.log('  - searchPlaceholder: Search input placeholder')
    console.log('  - isActive: Toggle to enable/disable')
    console.log('')
    console.log('You can now edit the hero content in Contentful!')
  } catch (error) {
    console.error('❌ Error:', error.message || error)
    if (error.details?.errors) {
      console.error('Details:', JSON.stringify(error.details.errors, null, 2))
    }
    process.exit(1)
  }
}

main()
