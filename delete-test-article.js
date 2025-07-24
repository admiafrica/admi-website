const { createClient } = require('contentful-management')
require('dotenv').config()

async function deleteTestArticle() {
  try {
    console.log('🗑️  Deleting the test article...\n')

    // Get environment variables
    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.CONTENTFUL_SPACE_ID
    const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master'

    // Article ID from the previous creation
    const articleId = '47QGXgjHmDqnVnZfvPvZFz'

    if (!managementToken || !spaceId) {
      throw new Error('Missing required environment variables')
    }

    // Create management client
    const client = createClient({
      accessToken: managementToken
    })

    // Get space and environment
    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment(environmentId)

    // Get the article entry
    console.log(`📋 Fetching article with ID: ${articleId}`)
    const entry = await environment.getEntry(articleId)
    console.log(`Found article: ${entry.fields.title['en-US']}`)

    // First, unpublish the article
    console.log('\n📢 Unpublishing article...')
    await entry.unpublish()
    console.log('Article unpublished successfully')

    // Then delete the article
    console.log('\n🗑️  Deleting article...')
    await entry.delete()
    console.log('Article deleted successfully!')

    console.log('\n✅ Test article has been removed from Contentful.')
  } catch (error) {
    console.error('❌ Error deleting article:')
    console.error(error.message)
    if (error.response) {
      console.error('Response details:', error.response.data || error.response)
    }
    process.exit(1)
  }
}

// Run the script
deleteTestArticle()
