const { createClient } = require('contentful-management')
const axios = require('axios')
const { getRandomTopic, generateContentBrief } = require('./blog-topics-database')
const AWS = require('aws-sdk')
const OpenAI = require('openai')
require('dotenv').config()

class SEORocketBlogGenerator {
  constructor() {
    this.perplexityApiKey = process.env.PERPLEXITY_API_KEY
    this.firecrawlApiKey = process.env.FIRECRAWL_API_KEY
    this.dataforseoLogin = process.env.DATAFORSEO_LOGIN
    this.dataforseoPassword = process.env.DATAFORSEO_PASSWORD

    // Contentful setup
    this.contentfulToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    this.spaceId = process.env.CONTENTFUL_SPACE_ID
    this.environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master'

    // OpenAI setup for DALL-E 3
    this.openaiApiKey = process.env.OPENAI_API_KEY || process.env.NEXT_OPENAI_API_KEY
    this.openai = new OpenAI({
      apiKey: this.openaiApiKey
    })

    // AWS S3 setup
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION || 'us-east-1'
    })
    this.s3BucketName = process.env.S3_BLOG_IMAGES_BUCKET || 'admi-blog-images'

    this.contentfulClient = null
    this.initializeContentful()
  }

  async initializeContentful() {
    if (this.contentfulToken && this.spaceId) {
      const client = createClient({
        accessToken: this.contentfulToken
      })

      const space = await client.getSpace(this.spaceId)
      this.contentfulClient = await space.getEnvironment(this.environmentId)
    }
  }

  // Research current trends using Perplexity
  async researchTopic(topic, keywords) {
    try {
      console.log(`🔍 Researching topic: ${topic}`)

      const researchPrompt = `Research educational and teaching content about "${topic}" in the context of Africa's creative and tech economy. Focus on:
      - Step-by-step learning approaches and methodologies
      - Practical skills and techniques that can be taught
      - Common mistakes beginners make and how to avoid them
      - Progressive learning paths from beginner to advanced
      - Hands-on exercises and practical applications
      - Tools, resources, and learning materials needed
      - Real-world examples that demonstrate concepts clearly
      - Assessment methods and success metrics
      
      Keywords to focus on: ${keywords.join(', ')}
      
      Gather information that would help someone learn and master this topic, with emphasis on practical education rather than just industry news or trends.`

      const response = await axios.post(
        'https://api.perplexity.ai/chat/completions',
        {
          model: 'sonar',
          messages: [
            {
              role: 'system',
              content:
                "You are an expert researcher specializing in Africa's creative and technology sectors. Provide factual, current, and actionable insights."
            },
            {
              role: 'user',
              content: researchPrompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${this.perplexityApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.data.choices[0].message.content
    } catch (error) {
      console.error('Error researching topic:', error.message)
      return null
    }
  }

  // Get SEO insights using DataForSEO (if available)
  async getSEOInsights(keywords) {
    try {
      if (!this.dataforseoLogin || !this.dataforseoPassword) {
        console.log('📊 DataForSEO credentials not available, skipping SEO research')
        return null
      }

      console.log('📊 Gathering SEO insights...')

      // This would integrate with DataForSEO API for keyword research
      // For now, we'll return mock data structure
      return {
        searchVolume: Math.floor(Math.random() * 5000) + 100,
        competition: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        relatedKeywords: keywords.map((k) => [`${k} tips`, `${k} guide`, `${k} trends`]).flat()
      }
    } catch (error) {
      console.error('Error getting SEO insights:', error.message)
      return null
    }
  }

  // Generate comprehensive blog content using Perplexity
  async generateBlogContent(contentBrief, researchData) {
    try {
      console.log('✍️ Generating 1000-word blog article...')

      const contentPrompt = `Write a comprehensive 1000-word educational tutorial article about "${contentBrief.title}" for ADMI (Africa Digital Media Institute) website.

EDUCATIONAL RESEARCH CONTEXT:
${researchData}

REQUIREMENTS:
- Target audience: Prospective students interested in creative and tech careers in Africa
- Tone: Educational, inspiring, and conversion-focused - like a mentor guiding career decisions
- Approach: STUDENT ACQUISITION FOCUSED - teach valuable skills while highlighting the need for formal training
- Structure: Use clear headings (H2, H3) for learning progression
- Word count: Exactly 1000 words
- Include step-by-step instructions and practical exercises
- Strategically demonstrate the complexity and value of professional training
- Always include specific ADMI course recommendations and enrollment CTAs
- SEO-optimized with natural keyword integration: ${contentBrief.keywords.join(', ')}

STUDENT ACQUISITION ARTICLE STRUCTURE:
1. Hook: Success Story - Graduate who mastered this skill and their career transformation
2. What You'll Learn Today - Clear learning objectives that build interest
3. Industry Overview - Why this skill is in high demand and well-paid
4. Getting Started: Basic Steps Anyone Can Take
   - Simple exercises to try at home
   - Free tools and resources
5. The Reality Check - Where self-learning hits limitations
6. Professional Skills Deep Dive - What industry experts really need to know
7. Common Beginner Mistakes - What happens without proper guidance
8. Career Opportunities - Specific job roles and salary ranges in Africa
9. Why Professional Training Matters - Benefits of structured learning
10. ADMI Course Spotlight - Specific program that teaches this skill professionally
11. Success Stories - ADMI graduates working in this field
12. Strong CTA - Enrollment deadline, limited seats, or special offer

STUDENT ACQUISITION APPROACH:
- Start with inspiration and possibility
- Provide genuine value through basic tutorials
- Gradually reveal the complexity and depth needed for professional success
- Create urgency around career opportunities and market demand
- Position ADMI as the bridge between interest and professional competence
- Include specific course names, duration, and enrollment details
- Always end with a clear, compelling call-to-action

MANDATORY ELEMENTS:
- Reference the specific ADMI course: "${contentBrief.targetCourse || 'relevant ADMI program'}"
- Career paths to highlight: "${contentBrief.careerPath || 'relevant career opportunities'}"
- Include enrollment CTAs with course details and application deadlines
- Mention ADMI's industry connections and job placement support
- Highlight the gap between self-learning and professional training
- Include specific salary ranges for mentioned career paths in Kenya/Africa
- Reference ADMI's modern facilities, industry-standard equipment, and expert instructors

CONVERSION ELEMENTS:
- Create urgency around course enrollment (limited seats, application deadlines)
- Mention scholarship opportunities or payment plans
- Include success metrics (employment rates, average salaries of graduates)
- Strong closing CTA with specific enrollment steps

Write as a career advisor who wants to help readers achieve their dreams while clearly showing why ADMI is their best path to success.`

      const response = await axios.post(
        'https://api.perplexity.ai/chat/completions',
        {
          model: 'sonar',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert content writer specializing in creative industries and technology in Africa. Write engaging, SEO-optimized blog articles that provide real value to readers.'
            },
            {
              role: 'user',
              content: contentPrompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.8
        },
        {
          headers: {
            Authorization: `Bearer ${this.perplexityApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      return response.data.choices[0].message.content
    } catch (error) {
      console.error('Error generating blog content:', error.message)
      return null
    }
  }

  // Convert markdown content to Contentful Rich Text format
  convertToRichText(content) {
    // Simple conversion - in production, you might want to use a proper markdown parser
    const paragraphs = content.split('\n\n').filter((p) => p.trim())

    const richTextNodes = paragraphs.map((paragraph) => {
      const trimmed = paragraph.trim()

      // Handle headings
      if (trimmed.startsWith('## ')) {
        return {
          nodeType: 'heading-2',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: trimmed.replace('## ', ''),
              marks: [],
              data: {}
            }
          ]
        }
      } else if (trimmed.startsWith('### ')) {
        return {
          nodeType: 'heading-3',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: trimmed.replace('### ', ''),
              marks: [],
              data: {}
            }
          ]
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

  // Generate SEO-friendly slug
  generateSlug(title) {
    return (
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-') +
      '-' +
      Date.now()
    )
  }

  // Generate images using DALL-E 3
  async generateImages(contentBrief, blogContent) {
    const images = {
      featured: null,
      inArticle: []
    }

    try {
      console.log('🎨 Generating images with DALL-E 3...')

      // Generate featured header image
      const featuredPrompt = `Professional blog header image for an article about ${contentBrief.title}. 
      Show African students or professionals engaged in ${contentBrief.category} activities in a modern, 
      well-equipped learning environment. The image should be vibrant, inspiring, and aspirational, 
      featuring modern technology and creative tools. Style: professional photography, bright and optimistic, 
      showcasing diversity and innovation in African tech/creative education.`

      console.log('  📸 Generating featured header image...')
      const featuredResponse = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: featuredPrompt,
        size: '1792x1024',
        quality: 'standard',
        n: 1
      })

      images.featured = featuredResponse.data[0].url
      console.log('  ✅ Featured image generated')

      // Extract key concepts from blog content for in-article images
      const contentSections = blogContent.split('## ').slice(1, 4) // Get first 3 main sections

      // Generate 2-3 in-article images based on content sections
      for (let i = 0; i < Math.min(3, contentSections.length); i++) {
        const sectionTitle = contentSections[i].split('\n')[0]
        const inArticlePrompt = `Educational infographic or illustration for a blog section about "${sectionTitle}" 
        in the context of ${contentBrief.category}. Show practical examples, tools, or concepts being taught. 
        Include visual elements that help explain the concept clearly. African context preferred. 
        Style: clean, modern, educational illustration or diagram.`

        console.log(`  📸 Generating in-article image ${i + 1}...`)
        const inArticleResponse = await this.openai.images.generate({
          model: 'dall-e-3',
          prompt: inArticlePrompt,
          size: '1024x1024',
          quality: 'standard',
          n: 1
        })

        images.inArticle.push({
          url: inArticleResponse.data[0].url,
          caption: `Illustration: ${sectionTitle}`,
          position: i + 1
        })
        console.log(`  ✅ In-article image ${i + 1} generated`)
      }

      console.log(`✅ Generated ${images.inArticle.length + 1} images total`)
      return images
    } catch (error) {
      console.error('❌ Error generating images:', error.message)
      // Return null images but don't fail the entire process
      return images
    }
  }

  // Upload image to S3
  async uploadImageToS3(imageUrl, fileName) {
    try {
      // Download image from URL
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer'
      })
      const buffer = Buffer.from(response.data, 'binary')

      // Upload to S3
      const s3Params = {
        Bucket: this.s3BucketName,
        Key: `blog-images/${fileName}`,
        Body: buffer,
        ContentType: 'image/png'
        // ACL removed - bucket policy handles public access
      }

      const uploadResult = await this.s3.upload(s3Params).promise()
      return uploadResult.Location
    } catch (error) {
      console.error('Error uploading to S3:', error.message)
      return null
    }
  }

  // Create Contentful asset from image URL
  async createContentfulAsset(imageUrl, title, description) {
    try {
      const asset = await this.contentfulClient.createAsset({
        fields: {
          title: {
            'en-US': title
          },
          description: {
            'en-US': description
          },
          file: {
            'en-US': {
              contentType: 'image/png',
              fileName: `${title.toLowerCase().replace(/\s+/g, '-')}.png`,
              upload: imageUrl
            }
          }
        }
      })

      // Process the asset
      await asset.processForAllLocales()

      // Wait for processing to complete
      let processedAsset = await this.contentfulClient.getAsset(asset.sys.id)
      let attempts = 0
      while (processedAsset.fields.file['en-US'].url === undefined && attempts < 10) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        processedAsset = await this.contentfulClient.getAsset(asset.sys.id)
        attempts++
      }

      // Publish the asset
      await processedAsset.publish()

      return processedAsset
    } catch (error) {
      console.error('Error creating Contentful asset:', error.message)
      return null
    }
  }

  // Save article as draft in Contentful
  async saveToDrafts(contentBrief, blogContent, researchData, images = null) {
    try {
      if (!this.contentfulClient) {
        console.error('❌ Contentful client not initialized')
        return null
      }

      console.log('💾 Saving article as draft in Contentful...')

      const slug = this.generateSlug(contentBrief.title)
      const richTextContent = this.convertToRichText(blogContent)

      // Extract a summary from the first paragraph
      const firstParagraph = blogContent.split('\n\n')[0] || ''
      const summary = firstParagraph.length > 200 ? firstParagraph.substring(0, 197) + '...' : firstParagraph

      const articleData = {
        fields: {
          title: {
            'en-US': contentBrief.title
          },
          slug: {
            'en-US': slug
          },
          summary: {
            'en-US': summary
          },
          body: {
            'en-US': richTextContent
          },
          publishedDate: {
            'en-US': new Date().toISOString()
          },
          category: {
            'en-US': 'tech-creative-economy'
          },
          featured: {
            'en-US': false
          }
        }
      }

      // Add featured image if available
      if (images && images.featured) {
        console.log('📤 Uploading featured image to S3...')
        const featuredS3Url = await this.uploadImageToS3(images.featured, `featured-${slug}.png`)

        if (featuredS3Url) {
          console.log('🖼️ Creating Contentful asset for featured image...')
          const featuredAsset = await this.createContentfulAsset(
            featuredS3Url,
            `Featured: ${contentBrief.title}`,
            `Featured header image for ${contentBrief.title}`
          )

          if (featuredAsset) {
            articleData.fields.coverImage = {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Asset',
                  id: featuredAsset.sys.id
                }
              }
            }
            console.log('✅ Featured image added to article')
          }
        }
      }

      // Insert in-article images into the rich text content
      if (images && images.inArticle.length > 0) {
        const contentNodes = richTextContent.content

        for (const inArticleImage of images.inArticle) {
          console.log(`📤 Uploading in-article image ${inArticleImage.position} to S3...`)
          const inArticleS3Url = await this.uploadImageToS3(
            inArticleImage.url,
            `article-${slug}-img${inArticleImage.position}.png`
          )

          if (inArticleS3Url) {
            console.log(`🖼️ Creating Contentful asset for in-article image ${inArticleImage.position}...`)
            const inArticleAsset = await this.createContentfulAsset(
              inArticleS3Url,
              inArticleImage.caption,
              `In-article image: ${inArticleImage.caption}`
            )

            if (inArticleAsset) {
              // Insert embedded asset into the content at appropriate positions
              const insertPosition = Math.min(inArticleImage.position * 3 + 1, contentNodes.length - 1)

              const embeddedAsset = {
                nodeType: 'embedded-asset-block',
                data: {
                  target: {
                    sys: {
                      type: 'Link',
                      linkType: 'Asset',
                      id: inArticleAsset.sys.id
                    }
                  }
                },
                content: []
              }

              contentNodes.splice(insertPosition, 0, embeddedAsset)
              console.log(`✅ In-article image ${inArticleImage.position} embedded`)
            }
          }
        }
      }

      // Create the article entry (but don't publish - leave as draft)
      const entry = await this.contentfulClient.createEntry('article', articleData)

      console.log('✅ Article saved as draft successfully!')
      console.log(`📝 Title: ${contentBrief.title}`)
      console.log(`🆔 Entry ID: ${entry.sys.id}`)
      console.log(`🔗 Slug: ${slug}`)
      console.log('📋 Status: Draft (ready for review and cover image)')
      console.log(`👁️  Preview at: https://campaigns-staging.admi.africa/resources?preview=true`)

      return {
        entryId: entry.sys.id,
        title: contentBrief.title,
        slug: slug,
        status: 'draft',
        createdAt: entry.sys.createdAt,
        previewUrl: `https://campaigns-staging.admi.africa/resources?preview=true`
      }
    } catch (error) {
      console.error('Error saving to Contentful:', error.message)
      if (error.response) {
        console.error('Response details:', error.response.data || error.response)
      }
      return null
    }
  }

  // Main function to generate a complete blog article
  async generateBlogArticle(topicOverride = null) {
    try {
      console.log('🚀 Starting SEO Rocket Blog Generation...\n')

      // Step 1: Select topic
      const selectedTopic = topicOverride || getRandomTopic()
      const contentBrief = generateContentBrief(selectedTopic)

      console.log('📋 Selected Topic:')
      console.log(`   Title: ${contentBrief.title}`)
      console.log(`   Category: ${contentBrief.category}`)
      console.log(`   Keywords: ${contentBrief.keywords.join(', ')}`)
      console.log(`   Difficulty: ${contentBrief.difficulty}\n`)

      // Step 2: Research the topic
      const researchData = await this.researchTopic(contentBrief.title, contentBrief.keywords)

      if (!researchData) {
        throw new Error('Failed to research topic')
      }

      // Step 3: Get SEO insights
      const seoInsights = await this.getSEOInsights(contentBrief.keywords)

      // Step 4: Generate blog content
      const blogContent = await this.generateBlogContent(contentBrief, researchData)

      if (!blogContent) {
        throw new Error('Failed to generate blog content')
      }

      // Step 5: Generate images with DALL-E 3
      const images = await this.generateImages(contentBrief, blogContent)

      // Step 6: Save as draft in Contentful with images
      const draftResult = await this.saveToDrafts(contentBrief, blogContent, researchData, images)

      if (!draftResult) {
        throw new Error('Failed to save draft to Contentful')
      }

      console.log('\n🎉 Blog generation completed successfully!')
      console.log('📄 Next steps:')
      console.log('   1. Review the draft in Contentful')
      console.log('   2. Add an appropriate cover image')
      console.log('   3. Review and edit content if needed')
      console.log('   4. Publish when ready')

      return draftResult
    } catch (error) {
      console.error('❌ Error in blog generation process:', error.message)
      return null
    }
  }
}

module.exports = SEORocketBlogGenerator

// CLI usage
if (require.main === module) {
  const generator = new SEORocketBlogGenerator()
  generator
    .generateBlogArticle()
    .then((result) => {
      if (result) {
        console.log('\n✨ Blog article generated and saved as draft!')
        process.exit(0)
      } else {
        console.log('\n❌ Failed to generate blog article')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('Fatal error:', error)
      process.exit(1)
    })
}
