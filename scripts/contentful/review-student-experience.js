/* Review Student Experience content in Contentful
 *
 * Run: node scripts/contentful/review-student-experience.js
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createClient } = require('contentful-management')
require('dotenv').config()

const spaceId = process.env.CONTENTFUL_SPACE_ID || process.env.ADMI_CONTENTFUL_SPACE_ID
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN

async function review() {
  console.log(`🔍 Reviewing Student Experience content in Contentful (env: ${environmentId})\n`)
  const client = createClient({ accessToken: managementToken })
  const space = await client.getSpace(spaceId)
  const environment = await space.getEnvironment(environmentId)

  // Review content types
  console.log('📋 CONTENT TYPES:\n')
  const contentTypes = ['studentExperiencePage', 'studentExperienceSection', 'quickLinkCard']

  for (const ctId of contentTypes) {
    try {
      const ct = await environment.getContentType(ctId)
      console.log(`\n🔷 ${ct.name} (${ct.sys.id})`)
      console.log('   Fields:')
      ct.fields.forEach((field) => {
        const required = field.required ? '(required)' : ''
        const itemType = field.items ? ` of ${field.items.type}` : ''
        console.log(`   - ${field.id}: ${field.type}${itemType} ${required}`)
      })
    } catch (err) {
      console.log(`   ⚠️  Content type ${ctId} not found`)
    }
  }

  // Review entries
  console.log('\n\n📄 ENTRIES:\n')

  try {
    const pages = await environment.getEntries({
      content_type: 'studentExperiencePage',
      limit: 100
    })

    console.log(`Found ${pages.items.length} pages:\n`)

    for (const page of pages.items) {
      const slug = page.fields.slug?.['en-US']
      const title = page.fields.heroTitle?.['en-US']
      const hasSections = page.fields.sections?.['en-US']?.length || 0
      const hasQuickLinks = page.fields.quickLinks?.['en-US']?.length || 0

      console.log(`📄 ${slug}`)
      console.log(`   Title: ${title}`)
      console.log(`   Sections: ${hasSections}`)
      console.log(`   Quick Links: ${hasQuickLinks}`)
      console.log(`   Entry ID: ${page.sys.id}`)
      console.log(`   Published: ${page.sys.publishedVersion ? 'Yes' : 'No'}\n`)
    }
  } catch (err) {
    console.log('   ⚠️  No pages found')
  }

  // Check for any existing assets/images
  console.log('\n🖼️  ASSETS:\n')
  try {
    const assets = await environment.getAssets({
      limit: 10,
      'metadata.tags.sys.id[in]': 'studentExperience'
    })
    console.log(`Found ${assets.items.length} assets tagged with 'studentExperience'`)

    if (assets.items.length === 0) {
      console.log('   💡 No images/assets found yet. You can add them via Contentful UI.')
    }
  } catch (err) {
    console.log('   ⚠️  Could not fetch assets')
  }

  console.log('\n✨ Review complete')
}

review().catch(console.error)
