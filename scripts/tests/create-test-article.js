const { createClient } = require('contentful-management')
require('dotenv').config()

async function createAndPublishTestArticle() {
  try {
    console.log('🚀 Creating and publishing a test article...\n')

    // Get environment variables
    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.CONTENTFUL_SPACE_ID
    const environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master'

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

    // First, let's examine the Article content type structure
    console.log('📋 Fetching Article content type structure...')
    const articleContentType = await environment.getContentType('article')

    console.log('Article fields:')
    articleContentType.fields.forEach((field) => {
      console.log(`  - ${field.name} (${field.id}): ${field.type}${field.required ? ' [Required]' : ''}`)
    })
    console.log('\n')

    // Create article data based on the content type structure
    const articleData = {
      fields: {
        title: {
          'en-US': 'Test Article: Welcome to ADMI Digital Innovation'
        },
        slug: {
          'en-US': 'test-article-admi-digital-innovation-' + Date.now()
        }
      }
    }

    // Add other required fields based on the content type
    articleContentType.fields.forEach((field) => {
      if (field.required && !articleData.fields[field.id]) {
        switch (field.type) {
          case 'Text':
            articleData.fields[field.id] = {
              'en-US':
                field.id === 'excerpt'
                  ? "This is a test article showcasing ADMI's digital innovation capabilities."
                  : `Test content for ${field.name}`
            }
            break
          case 'RichText':
            articleData.fields[field.id] = {
              'en-US': {
                nodeType: 'document',
                data: {},
                content: [
                  {
                    nodeType: 'paragraph',
                    data: {},
                    content: [
                      {
                        nodeType: 'text',
                        value: 'This is a test article created programmatically to verify our Contentful integration.',
                        marks: [],
                        data: {}
                      }
                    ]
                  },
                  {
                    nodeType: 'heading-2',
                    data: {},
                    content: [
                      {
                        nodeType: 'text',
                        value: 'About ADMI',
                        marks: [],
                        data: {}
                      }
                    ]
                  },
                  {
                    nodeType: 'paragraph',
                    data: {},
                    content: [
                      {
                        nodeType: 'text',
                        value:
                          'Africa Digital Media Institute (ADMI) is a leading creative media and technology training institution.',
                        marks: [],
                        data: {}
                      }
                    ]
                  }
                ]
              }
            }
            break
          case 'Date':
            articleData.fields[field.id] = {
              'en-US': new Date().toISOString()
            }
            break
          case 'Boolean':
            articleData.fields[field.id] = {
              'en-US': true
            }
            break
          case 'Symbol':
            articleData.fields[field.id] = {
              'en-US': `test-${field.id}`
            }
            break
        }
      }
    })

    // Create the article
    console.log('✅ Creating article entry...')
    const entry = await environment.createEntry('article', articleData)
    console.log(`Created article with ID: ${entry.sys.id}`)
    console.log(`Article title: ${entry.fields.title['en-US']}`)
    console.log(`Article slug: ${entry.fields.slug['en-US']}`)

    // Publish the article
    console.log('\n📢 Publishing article...')
    const publishedEntry = await entry.publish()
    console.log('Article published successfully!')

    // Construct the URL
    const articleUrl = `https://admi.africa/news-events/news/${entry.fields.slug['en-US']}`

    console.log('\n🎉 Success! Your test article has been created and published.')
    console.log('📄 Article details:')
    console.log(`   - Title: ${entry.fields.title['en-US']}`)
    console.log(`   - ID: ${entry.sys.id}`)
    console.log(`   - Status: Published`)
    console.log(`   - Created: ${entry.sys.createdAt}`)
    console.log('\n🔗 View your article at:')
    console.log(`   ${articleUrl}`)

    console.log('\n💡 Note: It may take a few moments for the article to appear on the website due to caching.')
  } catch (error) {
    console.error('❌ Error creating article:')
    console.error(error.message)
    if (error.response) {
      console.error('Response details:', error.response.data || error.response)
    }
    process.exit(1)
  }
}

// Run the script
createAndPublishTestArticle()
