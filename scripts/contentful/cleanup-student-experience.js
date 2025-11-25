/* Clean up Student Experience content types from Contentful
 *
 * Run: node scripts/contentful/cleanup-student-experience.js
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createClient } = require('contentful-management')
require('dotenv').config()

const spaceId = process.env.CONTENTFUL_SPACE_ID || process.env.ADMI_CONTENTFUL_SPACE_ID
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master'
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN

async function cleanup() {
  console.log(`🧹 Cleaning up Contentful (env: ${environmentId})`)
  const client = createClient({ accessToken: managementToken })
  const space = await client.getSpace(spaceId)
  const environment = await space.getEnvironment(environmentId)

  // Delete page entries first
  const contentTypes = ['studentExperiencePage', 'studentExperienceSection', 'quickLinkCard']

  for (const ctId of contentTypes) {
    try {
      const entries = await environment.getEntries({
        content_type: ctId,
        limit: 100
      })

      for (const entry of entries.items) {
        try {
          if (entry.isPublished()) {
            await entry.unpublish()
          }
          await entry.delete()
          console.log(`✅ Deleted ${ctId} entry ${entry.sys.id}`)
        } catch (err) {
          console.log(`⚠️  Failed to delete entry ${entry.sys.id}: ${err.message}`)
        }
      }
    } catch (err) {
      console.log(`⚠️  No entries found for ${ctId}`)
    }
  }

  // Now delete content types in reverse order
  for (const ctId of contentTypes.reverse()) {
    try {
      const ct = await environment.getContentType(ctId)
      if (ct.isPublished()) {
        await ct.unpublish()
        console.log(`📤 Unpublished content type ${ctId}`)
      }
      await ct.delete()
      console.log(`✅ Deleted content type ${ctId}`)
    } catch (err) {
      console.log(`⚠️  Failed to delete content type ${ctId}: ${err.message}`)
    }
  }

  console.log('✨ Cleanup complete')
}

cleanup().catch(console.error)
