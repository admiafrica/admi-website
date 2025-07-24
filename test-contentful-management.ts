import { createClient } from 'contentful-management'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function testContentfulManagement() {
  try {
    console.log('🚀 Testing Contentful Management API connection...\n')

    // Get environment variables
    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.CONTENTFUL_SPACE_ID
    const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master'

    if (!managementToken || managementToken === 'your_contentful_management_token_here') {
      throw new Error('CONTENTFUL_MANAGEMENT_TOKEN is not set or is still a placeholder')
    }

    if (!spaceId) {
      throw new Error('CONTENTFUL_SPACE_ID is not set')
    }

    console.log('📋 Configuration:')
    console.log(`Space ID: ${spaceId}`)
    console.log(`Environment: ${environmentId}`)
    console.log(`Token: ${managementToken.substring(0, 10)}...`)
    console.log('\n')

    // Create management client
    const client = createClient({
      accessToken: managementToken
    })

    // Test 1: Get space
    console.log('✅ Test 1: Fetching space information...')
    const space = await client.getSpace(spaceId)
    console.log(`Space Name: ${space.name}`)
    console.log(`Space ID: ${space.sys.id}`)
    console.log('\n')

    // Test 2: Get environment
    console.log('✅ Test 2: Fetching environment...')
    const environment = await space.getEnvironment(environmentId)
    console.log(`Environment: ${environment.name} (${environment.sys.id})`)
    console.log('\n')

    // Test 3: List content types
    console.log('✅ Test 3: Listing content types...')
    const contentTypes = await environment.getContentTypes()
    console.log(`Found ${contentTypes.items.length} content types:`)
    contentTypes.items.forEach((ct) => {
      console.log(`  - ${ct.name} (ID: ${ct.sys.id})`)
    })
    console.log('\n')

    // Test 4: Create a test entry (if a suitable content type exists)
    if (contentTypes.items.length > 0) {
      console.log('✅ Test 4: Creating a test entry...')

      // Find a simple content type (preferably one with just title/name field)
      const simpleContentType = contentTypes.items.find((ct) =>
        ct.fields.some((field) => field.id === 'title' || field.id === 'name')
      )

      if (simpleContentType) {
        console.log(`Using content type: ${simpleContentType.name}`)

        // Prepare entry data
        const entryData: any = {}
        simpleContentType.fields.forEach((field) => {
          if (field.id === 'title' || field.id === 'name') {
            entryData[field.id] = {
              'en-US': `Test Entry - ${new Date().toISOString()}`
            }
          } else if (field.required && field.type === 'Text') {
            entryData[field.id] = {
              'en-US': 'Test content'
            }
          }
        })

        // Create entry
        const entry = await environment.createEntry(simpleContentType.sys.id, {
          fields: entryData
        })

        console.log(`Created entry with ID: ${entry.sys.id}`)
        console.log('Entry fields:', JSON.stringify(entry.fields, null, 2))

        // Optional: Delete the test entry
        console.log('\nCleaning up: Deleting test entry...')
        await entry.delete()
        console.log('Test entry deleted successfully')
      } else {
        console.log('No suitable content type found for creating test entry')
      }
    }

    console.log('\n✨ All tests passed! Contentful Management API is working correctly.')
    console.log('You can now create, update, and delete content programmatically.')
  } catch (error) {
    console.error('❌ Error testing Contentful Management API:')
    if (error instanceof Error) {
      console.error(error.message)
      if ('response' in error && error.response) {
        console.error('Response details:', (error.response as any).data || error.response)
      }
    } else {
      console.error(error)
    }
    process.exit(1)
  }
}

// Run the test
testContentfulManagement()
