const { createClient } = require('contentful-management')
require('dotenv').config()

async function createAndPublishTestArticle() {
  try {
    console.log('🚀 Creating and publishing a test article with image...\n')

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

    // First, let's check if there are any existing assets we can use
    console.log('📋 Checking for existing assets...')
    const assets = await environment.getAssets({ limit: 1 })

    let assetId = null

    if (assets.items.length > 0) {
      // Use existing asset
      assetId = assets.items[0].sys.id
      console.log(`Using existing asset: ${assets.items[0].fields.title['en-US']} (${assetId})`)
    } else {
      // Create a new asset
      console.log('Creating a placeholder image asset...')

      const assetData = {
        fields: {
          title: {
            'en-US': 'Test Article Cover Image'
          },
          description: {
            'en-US': 'Placeholder image for test article'
          },
          file: {
            'en-US': {
              contentType: 'image/jpeg',
              fileName: 'test-image.jpg',
              upload: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop'
            }
          }
        }
      }

      const asset = await environment.createAsset(assetData)
      await asset.processForAllLocales()
      await asset.publish()

      assetId = asset.sys.id
      console.log(`Created and published asset: ${assetId}`)
    }

    // Create article data
    const articleData = {
      fields: {
        title: {
          'en-US': 'Test Article: Welcome to ADMI Digital Innovation'
        },
        slug: {
          'en-US': 'test-article-admi-digital-innovation-' + Date.now()
        },
        summary: {
          'en-US':
            "This is a test article showcasing ADMI's digital innovation capabilities and our commitment to transforming education in Africa."
        },
        body: {
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
                    value:
                      'This is a test article created programmatically to verify our Contentful integration. It demonstrates our ability to create, manage, and publish content dynamically.',
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
                      'Africa Digital Media Institute (ADMI) is a leading creative media and technology training institution, offering practical courses in Film & TV, Music, Animation, Gaming, Graphic Design, and Digital Marketing.',
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
                    value: 'Our Mission',
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
                      'We are committed to nurturing creative talent and equipping students with industry-relevant skills that prepare them for successful careers in the digital economy.',
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        },
        publishedDate: {
          'en-US': new Date().toISOString()
        },
        category: {
          'en-US': 'news'
        },
        coverImage: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: assetId
            }
          }
        },
        featured: {
          'en-US': false
        }
      }
    }

    // Create the article
    console.log('\n✅ Creating article entry...')
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

    console.log(
      '\n💡 Note: It may take a few moments for the article to appear on the website due to caching and build processes.'
    )
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
