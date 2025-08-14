/* eslint-disable @typescript-eslint/no-var-requires */
const { createClient } = require('contentful-management')
const fs = require('fs')
require('dotenv').config()

/**
 * Push AI-Generated FAQs to Contentful
 * Uploads the generated FAQ content directly to Contentful CMS
 */

class ContentfulFAQUploader {
  constructor() {
    this.contentfulToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    this.spaceId = process.env.CONTENTFUL_SPACE_ID
    this.environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master'

    if (!this.contentfulToken || !this.spaceId) {
      throw new Error(
        'Contentful credentials not found. Check CONTENTFUL_MANAGEMENT_TOKEN and CONTENTFUL_SPACE_ID in .env'
      )
    }

    this.contentfulClient = null
  }

  async initialize() {
    try {
      const client = createClient({
        accessToken: this.contentfulToken
      })

      const space = await client.getSpace(this.spaceId)
      this.contentfulClient = await space.getEnvironment(this.environmentId)

      console.log('✅ Contentful client initialized successfully')
      return true
    } catch (error) {
      console.error('❌ Failed to initialize Contentful:', error.message)
      return false
    }
  }

  /**
   * Convert markdown/text to Contentful Rich Text format
   */
  convertToRichText(text) {
    // Split by paragraphs and handle basic formatting
    const paragraphs = text.split('\n\n').filter((p) => p.trim())

    const richTextNodes = paragraphs.map((paragraph) => {
      const trimmed = paragraph.trim()

      // Handle bold text (**text**)
      if (trimmed.includes('**')) {
        const parts = trimmed.split('**')
        const content = []

        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            // Regular text
            if (parts[i]) {
              content.push({
                nodeType: 'text',
                value: parts[i],
                marks: [],
                data: {}
              })
            }
          } else {
            // Bold text
            if (parts[i]) {
              content.push({
                nodeType: 'text',
                value: parts[i],
                marks: [{ type: 'bold' }],
                data: {}
              })
            }
          }
        }

        return {
          nodeType: 'paragraph',
          data: {},
          content: content
        }
      } else {
        // Regular paragraph
        return {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: trimmed,
              marks: [],
              data: {}
            }
          ]
        }
      }
    })

    return {
      nodeType: 'document',
      data: {},
      content: richTextNodes
    }
  }

  /**
   * Create FAQ entry in Contentful
   */
  async createFAQEntry(faq) {
    try {
      console.log(`📤 Creating FAQ: "${faq.question}"`)

      const richTextAnswer = this.convertToRichText(faq.answer)

      // Use only the fields that exist in the Contentful FAQ content type
      const entryData = {
        fields: {
          question: {
            'en-US': faq.question
          },
          answer: {
            'en-US': richTextAnswer
          }
        }
      }

      // Create the entry (but don't publish - leave as draft for review)
      const entry = await this.contentfulClient.createEntry('faq', entryData)

      console.log(`✅ Created FAQ entry: ${entry.sys.id}`)

      return {
        id: entry.sys.id,
        question: faq.question,
        status: 'draft',
        createdAt: entry.sys.createdAt
      }
    } catch (error) {
      console.error(`❌ Error creating FAQ entry: ${error.message}`)
      if (error.response && error.response.data) {
        console.error('Error details:', JSON.stringify(error.response.data, null, 2))
      }
      return null
    }
  }

  /**
   * Upload all FAQs to Contentful
   */
  async uploadFAQs(faqs) {
    const results = []

    for (const faq of faqs) {
      const result = await this.createFAQEntry(faq)
      if (result) {
        results.push(result)
      }

      // Add small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return results
  }
}

/**
 * Main upload function
 */
async function pushFAQsToContentful() {
  try {
    console.log('🚀 Starting FAQ upload to Contentful...\n')

    // Read generated FAQs
    const generatedFile = 'generated-faqs-direct-2025-08-14.json'
    if (!fs.existsSync(generatedFile)) {
      throw new Error(`Generated FAQs file not found: ${generatedFile}`)
    }

    const generatedData = JSON.parse(fs.readFileSync(generatedFile, 'utf8'))
    const faqs = generatedData.faqs

    console.log(`📊 Found ${faqs.length} FAQs to upload`)

    // Initialize Contentful uploader
    const uploader = new ContentfulFAQUploader()
    const initialized = await uploader.initialize()

    if (!initialized) {
      throw new Error('Failed to initialize Contentful client')
    }

    // Upload FAQs
    console.log('\n📤 Uploading FAQs to Contentful...')
    const uploadResults = await uploader.uploadFAQs(faqs)

    // Generate summary
    const successful = uploadResults.filter((r) => r !== null)
    const failed = faqs.length - successful.length

    console.log('\n📋 Upload Summary:')
    console.log(`✅ Successfully uploaded: ${successful.length} FAQs`)
    console.log(`❌ Failed uploads: ${failed} FAQs`)
    console.log('📝 Status: All entries created as drafts for review')

    // Save upload results
    const uploadSummary = {
      uploadedAt: new Date().toISOString(),
      totalFAQs: faqs.length,
      successful: successful.length,
      failed: failed,
      results: successful,
      status: 'draft'
    }

    fs.writeFileSync('contentful-upload-results.json', JSON.stringify(uploadSummary, null, 2))

    if (successful.length > 0) {
      console.log('\n🎉 FAQ upload completed!')
      console.log('\n📋 Next Steps:')
      console.log('1. Review the drafted FAQs in Contentful')
      console.log('2. Edit/customize any responses as needed')
      console.log('3. Publish approved FAQs')
      console.log('4. Monitor FAQ engagement and conversions')

      console.log('\n📊 Uploaded FAQs:')
      successful.forEach((result, i) => {
        const originalFAQ = faqs.find((f) => f.question === result.question)
        console.log(`${i + 1}. [${originalFAQ?.priority?.toUpperCase()}] ${result.question}`)
        console.log(`   Entry ID: ${result.id}`)
        console.log(`   Search Volume: ${originalFAQ?.sessions} sessions`)
        console.log('')
      })
    }

    return successful.length > 0
  } catch (error) {
    console.error('❌ Error uploading FAQs to Contentful:', error.message)
    return false
  }
}

// Run the upload
pushFAQsToContentful()
  .then((success) => {
    if (success) {
      console.log('✨ FAQs successfully uploaded to Contentful!')
      process.exit(0)
    } else {
      console.log('❌ FAQ upload failed')
      process.exit(1)
    }
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
