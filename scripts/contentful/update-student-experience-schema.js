/* Update Student Experience schema without deleting
 *
 * This will try to add new fields to existing content types
 * Run: node scripts/contentful/update-student-experience-schema.js
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createClient } = require('contentful-management')
require('dotenv').config()

const spaceId = process.env.CONTENTFUL_SPACE_ID || process.env.ADMI_CONTENTFUL_SPACE_ID
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN

async function updateSchema() {
  console.log(`🔄 Attempting to update Student Experience schema (env: ${environmentId})\n`)
  const client = createClient({ accessToken: managementToken })
  const space = await client.getSpace(spaceId)
  const environment = await space.getEnvironment(environmentId)

  try {
    // 1. Update studentExperienceSection - add new fields
    console.log('📝 Updating studentExperienceSection...')
    const section = await environment.getContentType('studentExperienceSection')

    // Add content field (RichText)
    const hasContent = section.fields.find((f) => f.id === 'content')
    if (!hasContent) {
      section.fields.push({
        id: 'content',
        name: 'Content',
        type: 'RichText',
        required: false,
        validations: [
          {
            enabledNodeTypes: [
              'heading-2',
              'heading-3',
              'paragraph',
              'unordered-list',
              'ordered-list',
              'blockquote',
              'hyperlink',
              'entry-hyperlink',
              'asset-hyperlink'
            ]
          }
        ]
      })
      console.log('   ✅ Added "content" field')
    }

    // Add image field
    const hasImage = section.fields.find((f) => f.id === 'image')
    if (!hasImage) {
      section.fields.push({
        id: 'image',
        name: 'Image',
        type: 'Link',
        linkType: 'Asset',
        validations: [{ linkMimetypeGroup: ['image'] }]
      })
      console.log('   ✅ Added "image" field')
    }

    // Add imagePosition field
    const hasImagePosition = section.fields.find((f) => f.id === 'imagePosition')
    if (!hasImagePosition) {
      section.fields.push({
        id: 'imagePosition',
        name: 'Image Position',
        type: 'Symbol',
        validations: [{ in: ['left', 'right', 'top', 'bottom'] }]
      })
      console.log('   ✅ Added "imagePosition" field')
    }

    // Add backgroundColor field
    const hasBackgroundColor = section.fields.find((f) => f.id === 'backgroundColor')
    if (!hasBackgroundColor) {
      section.fields.push({
        id: 'backgroundColor',
        name: 'Background Color',
        type: 'Symbol',
        validations: [{ in: ['white', 'gray', 'blue', 'dark'] }]
      })
      console.log('   ✅ Added "backgroundColor" field')
    }

    const updatedSection = await section.update()
    await updatedSection.publish()
    console.log('   ✅ Published studentExperienceSection updates\n')

    // 2. Update studentExperiencePage - add heroImage
    console.log('📝 Updating studentExperiencePage...')
    const page = await environment.getContentType('studentExperiencePage')

    const hasHeroImage = page.fields.find((f) => f.id === 'heroImage')
    if (!hasHeroImage) {
      page.fields.push({
        id: 'heroImage',
        name: 'Hero Image',
        type: 'Link',
        linkType: 'Asset',
        validations: [{ linkMimetypeGroup: ['image'] }]
      })
      console.log('   ✅ Added "heroImage" field')
    }

    const updatedPage = await page.update()
    await updatedPage.publish()
    console.log('   ✅ Published studentExperiencePage updates\n')

    // 3. Update quickLinkCard - add icon
    console.log('📝 Updating quickLinkCard...')
    const card = await environment.getContentType('quickLinkCard')

    const hasIcon = card.fields.find((f) => f.id === 'icon')
    if (!hasIcon) {
      card.fields.push({
        id: 'icon',
        name: 'Icon',
        type: 'Link',
        linkType: 'Asset',
        validations: [{ linkMimetypeGroup: ['image'] }]
      })
      console.log('   ✅ Added "icon" field')
    }

    const updatedCard = await card.update()
    await updatedCard.publish()
    console.log('   ✅ Published quickLinkCard updates\n')

    console.log('🎉 Schema update complete!')
    console.log('\n💡 What changed:')
    console.log('   ✅ studentExperienceSection now has: content (RichText), image, imagePosition, backgroundColor')
    console.log('   ✅ studentExperiencePage now has: heroImage')
    console.log('   ✅ quickLinkCard now has: icon')
    console.log('\n📝 Note: Old fields (paragraphs, bullets) are still there for backward compatibility')
    console.log('   You can migrate content from paragraphs → content in Contentful UI')
  } catch (err) {
    console.error('❌ Schema update failed:', err.message)
    throw err
  }
}

updateSchema().catch(console.error)
