/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAI = require('openai')
const { createClient } = require('contentful-management')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Intelligent Content Optimizer
 * Automated system for continuous website improvement using GA4 data
 * Generates FAQs and articles based on actual user search behavior
 */

class IntelligentContentOptimizer {
  constructor() {
    // OpenAI setup
    this.openaiApiKey = process.env.OPENAI_API_KEY || process.env.NEXT_OPENAI_API_KEY
    this.openai = new OpenAI({
      apiKey: this.openaiApiKey
    })

    // ADMI Assistant ID (configured with vector store containing all course information)
    this.assistantId = process.env.OPENAI_ASSISTANT_ID || 'asst_0OjBfvO64gzZaQIz21SzY23D'

    // Contentful setup
    this.contentfulToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    this.spaceId = process.env.CONTENTFUL_SPACE_ID
    this.environmentId = process.env.CONTENTFUL_ENVIRONMENT || 'master'

    // Analytics API setup - use Next.js server
    this.baseUrl = process.env.ANALYTICS_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://admi.africa'

    this.contentfulClient = null

    // Thresholds for content generation
    this.thresholds = {
      faqMinSessions: 5, // Minimum sessions to generate FAQ
      articleMinSessions: 15, // Minimum sessions to generate article
      highPriority: 30, // High priority threshold
      mediumPriority: 15 // Medium priority threshold
    }
  }

  async initialize() {
    try {
      console.log('🚀 Initializing Intelligent Content Optimizer...')

      // Initialize Contentful
      if (this.contentfulToken && this.spaceId) {
        const client = createClient({
          accessToken: this.contentfulToken
        })

        const space = await client.getSpace(this.spaceId)
        this.contentfulClient = await space.getEnvironment(this.environmentId)
        console.log('✅ Contentful client initialized')
      }

      return true
    } catch (error) {
      console.error('❌ Failed to initialize:', error.message)
      return false
    }
  }

  /**
   * Fetch current analytics data from GA4 API
   */
  async fetchAnalyticsData() {
    try {
      console.log('📊 Fetching latest GA4 analytics data...')

      // Fetch search queries, FAQ metrics, and optimization report
      const [searchQueriesResponse, faqMetricsResponse, reportResponse] = await Promise.all([
        axios.get(`${this.baseUrl}/api/analytics/search-queries?limit=50&refresh=true`),
        axios.get(`${this.baseUrl}/api/analytics/faq-metrics?refresh=true`),
        axios.get(`${this.baseUrl}/api/analytics/optimization-report`)
      ])

      const searchQueries = searchQueriesResponse.data.success ? searchQueriesResponse.data.data.searchQueries : []
      const faqMetrics = faqMetricsResponse.data.success ? faqMetricsResponse.data.data : null
      const report = reportResponse.data.success ? reportResponse.data.data : null

      console.log(`✅ Fetched ${searchQueries.length} search queries`)

      return {
        searchQueries,
        faqMetrics,
        report,
        fetchedAt: new Date().toISOString()
      }
    } catch (error) {
      console.error('❌ Error fetching analytics data:', error.message)
      return null
    }
  }

  /**
   * Analyze queries to determine content gaps and opportunities
   */
  async analyzeContentOpportunities(analyticsData) {
    try {
      console.log('🔍 Analyzing content opportunities...')

      const { searchQueries } = analyticsData

      // Check for existing content to avoid duplicates
      const existingFAQs = await this.getExistingFAQs()
      const existingArticles = await this.getExistingArticles()

      const opportunities = {
        newFAQs: [],
        newArticles: [],
        contentGaps: [],
        trending: []
      }

      for (const query of searchQueries) {
        const sessions = query.sessions || 0

        // Check if we already have content for this query
        const hasExistingFAQ = existingFAQs.some(
          (faq) =>
            faq.question.toLowerCase().includes(query.query.toLowerCase()) ||
            query.query.toLowerCase().includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' '))
        )

        const hasExistingArticle = existingArticles.some(
          (article) =>
            article.title.toLowerCase().includes(query.query.toLowerCase()) ||
            query.query.toLowerCase().includes(article.title.toLowerCase().split(' ').slice(0, 3).join(' '))
        )

        // Determine content type needed
        if (!hasExistingFAQ && sessions >= this.thresholds.faqMinSessions) {
          if (sessions >= this.thresholds.articleMinSessions && !hasExistingArticle) {
            // Complex query - needs article
            opportunities.newArticles.push({
              ...query,
              priority: sessions >= this.thresholds.highPriority ? 'high' : 'medium',
              contentType: 'article',
              reason: 'High search volume requires comprehensive article'
            })
          } else {
            // Simple query - FAQ is sufficient
            opportunities.newFAQs.push({
              ...query,
              priority:
                sessions >= this.thresholds.highPriority
                  ? 'high'
                  : sessions >= this.thresholds.mediumPriority
                    ? 'medium'
                    : 'low',
              contentType: 'faq',
              reason: 'New search query needs FAQ response'
            })
          }
        }

        // Track trending topics
        if (sessions >= this.thresholds.mediumPriority) {
          opportunities.trending.push(query)
        }

        // Identify content gaps (queries with no existing content)
        if (!hasExistingFAQ && !hasExistingArticle && sessions >= 3) {
          opportunities.contentGaps.push(query)
        }
      }

      console.log('📈 Analysis complete:')
      console.log(`   New FAQs needed: ${opportunities.newFAQs.length}`)
      console.log(`   New Articles needed: ${opportunities.newArticles.length}`)
      console.log(`   Content gaps: ${opportunities.contentGaps.length}`)
      console.log(`   Trending topics: ${opportunities.trending.length}`)

      return opportunities
    } catch (error) {
      console.error('❌ Error analyzing opportunities:', error.message)
      return null
    }
  }

  /**
   * Generate FAQ content using OpenAI Assistant with vector store
   */
  async generateFAQ(queryData) {
    let thread, run
    try {
      console.log(`🤖 Generating FAQ for: "${queryData.query}" using vector store`)

      // Create a thread for this conversation
      thread = await this.openai.beta.threads.create()

      if (!thread || !thread.id) {
        throw new Error('Failed to create OpenAI thread')
      }

      console.log(`  ✅ Thread created: ${thread.id}`)

      // Create a message with the search query
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const message = await this.openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: `Create a comprehensive FAQ response for this search query from a prospective ADMI student: "${queryData.query}"

REQUIREMENTS:
- Answer the EXACT question asked in the search query
- Use accurate information from ADMI's course catalog and documents in your knowledge base
- Provide specific details (fees, duration, requirements, job opportunities, salaries)
- Include enrollment information and next steps
- Maintain professional, encouraging tone appropriate for prospective students
- Include clear call-to-action for enrollment or course inquiry
- Be concise but comprehensive (200-300 words)
- Format as: **Question:** followed by detailed answer

Search volume: ${queryData.sessions} sessions, indicating ${queryData.priority} priority.
The response should directly address what the student is searching for and guide them toward enrollment.`
      })

      // Run the assistant
      console.log(`  🚀 Creating run with thread ID: ${thread.id}`)
      console.log(`  🤖 Assistant ID: ${this.assistantId}`)

      run = await this.openai.beta.threads.runs.create(thread.id, {
        assistant_id: this.assistantId,
        instructions:
          "You are ADMI's educational advisor. Use the comprehensive course information in your knowledge base to create accurate, helpful FAQ responses that encourage enrollment while providing genuine value to prospective students."
      })

      console.log(`  ✅ Run created: ${run.id}`)

      // Wait for completion
      console.log(`  ⏳ Checking run status with thread ID: ${thread.id}, run ID: ${run.id}`)
      let runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id)

      let attempts = 0
      const maxAttempts = 30

      while ((runStatus.status === 'queued' || runStatus.status === 'in_progress') && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id)
        attempts++
      }

      if (runStatus.status === 'completed') {
        // Retrieve the assistant's response
        const messages = await this.openai.beta.threads.messages.list(thread.id)
        const assistantMessage = messages.data.find((msg) => msg.role === 'assistant')

        if (assistantMessage && assistantMessage.content[0] && assistantMessage.content[0].text) {
          const content = assistantMessage.content[0].text.value

          // Extract question and answer
          const parts = content.split('**Question:**')
          let question = queryData.query + '?'
          let answer = content

          if (parts.length > 1) {
            const remaining = parts[1].trim()
            const answerStart = remaining.indexOf('\n')
            if (answerStart > -1) {
              question = remaining.substring(0, answerStart).trim()
              answer = remaining.substring(answerStart + 1).trim()
            }
          }

          return {
            question: question,
            answer: answer,
            searchQuery: queryData.query,
            sessions: queryData.sessions,
            priority: queryData.priority,
            generatedAt: new Date().toISOString(),
            usedVectorStore: true
          }
        }
      } else {
        console.error('Assistant run failed:', runStatus.status, runStatus.last_error)
      }

      return null
    } catch (error) {
      console.error('❌ Error generating FAQ with vector store:', error.message)
      console.error('❌ Error details - thread.id:', thread?.id, 'run.id:', run?.id)
      return null
    }
  }

  /**
   * Generate article content for complex queries using OpenAI Assistant with vector store
   */
  async generateArticle(queryData) {
    try {
      console.log(`📝 Generating article for: "${queryData.query}" using vector store`)

      // Create a thread for this conversation
      const thread = await this.openai.beta.threads.create()

      if (!thread || !thread.id) {
        throw new Error('Failed to create OpenAI thread for article')
      }

      console.log(`  ✅ Thread created: ${thread.id}`)

      // Create a message with the search query
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const message = await this.openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: `Create a comprehensive 800-word educational article about "${queryData.query}" for ADMI website.

REQUIREMENTS:
- SEO-optimized title that includes the search query
- Use accurate information from ADMI's course catalog and documents in your knowledge base
- Comprehensive coverage of the topic with practical insights
- Include specific ADMI course recommendations with accurate details
- Add job market insights and salary information for Kenya/Africa
- Include enrollment CTAs throughout the article
- Professional, educational tone that inspires action
- Format with clear headings (H2, H3) for readability
- 800+ words of valuable, actionable content

This query has ${queryData.sessions} search sessions, indicating high user interest.

Structure suggestions:
1. Engaging introduction that hooks the reader
2. Comprehensive topic coverage with practical examples
3. ADMI course connections with specific program details
4. Career opportunities and realistic salary ranges in Kenya
5. Success stories or case studies if available in your knowledge
6. Next steps and clear enrollment information
7. Strong closing call-to-action

The article should educate while demonstrating why ADMI is the best choice for achieving career goals in this field.`
      })

      // Run the assistant
      const run = await this.openai.beta.threads.runs.create(thread.id, {
        assistant_id: this.assistantId,
        instructions:
          "You are ADMI's content strategist and educational expert. Use the comprehensive information in your knowledge base to create engaging, educational articles that provide real value while encouraging course enrollment. Focus on accurate course details, realistic career prospects, and actionable insights."
      })

      // Wait for completion
      let runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id)

      let attempts = 0
      const maxAttempts = 45 // Longer timeout for articles

      while ((runStatus.status === 'queued' || runStatus.status === 'in_progress') && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 3000)) // Longer delay for articles
        runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id)
        attempts++
      }

      if (runStatus.status === 'completed') {
        // Retrieve the assistant's response
        const messages = await this.openai.beta.threads.messages.list(thread.id)
        const assistantMessage = messages.data.find((msg) => msg.role === 'assistant')

        if (assistantMessage && assistantMessage.content[0] && assistantMessage.content[0].text) {
          const content = assistantMessage.content[0].text.value

          // Extract title (first line or H1)
          const lines = content.split('\n')
          let title = queryData.query
          let body = content

          if (lines[0].startsWith('#')) {
            title = lines[0].replace(/^#+\s*/, '')
            body = lines.slice(1).join('\n').trim()
          } else if (lines[0].length < 100 && !lines[0].includes('.')) {
            title = lines[0]
            body = lines.slice(1).join('\n').trim()
          }

          return {
            title: title,
            body: body,
            searchQuery: queryData.query,
            sessions: queryData.sessions,
            priority: queryData.priority,
            generatedAt: new Date().toISOString(),
            usedVectorStore: true
          }
        }
      } else {
        console.error('Assistant run failed for article:', runStatus.status, runStatus.last_error)
      }

      return null
    } catch (error) {
      console.error('❌ Error generating article with vector store:', error.message)
      return null
    }
  }

  /**
   * Convert text to Contentful Rich Text format
   */
  convertToRichText(text) {
    const paragraphs = text.split('\n\n').filter((p) => p.trim())

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

  /**
   * Upload FAQ to Contentful
   */
  async uploadFAQToContentful(faqData) {
    try {
      if (!this.contentfulClient) return null

      const richTextAnswer = this.convertToRichText(faqData.answer)

      const entryData = {
        fields: {
          question: { 'en-US': faqData.question },
          answer: { 'en-US': richTextAnswer }
        }
      }

      const entry = await this.contentfulClient.createEntry('faq', entryData)

      // Auto-publish FAQs (they go to the general FAQ page)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const publishedEntry = await entry.publish()

      console.log(`✅ FAQ uploaded and auto-published to Contentful: ${entry.sys.id}`)

      return entry.sys.id
    } catch (error) {
      console.error('❌ Error uploading FAQ:', error.message)
      return null
    }
  }

  /**
   * Upload article to Contentful
   */
  async uploadArticleToContentful(articleData) {
    try {
      if (!this.contentfulClient) return null

      const richTextBody = this.convertToRichText(articleData.body)
      const slug = this.generateSlug(articleData.title)

      const entryData = {
        fields: {
          title: { 'en-US': articleData.title },
          slug: { 'en-US': slug },
          body: { 'en-US': richTextBody },
          publishedDate: { 'en-US': new Date().toISOString() },
          category: { 'en-US': 'Resources' },
          featured: { 'en-US': false }
        }
      }

      const entry = await this.contentfulClient.createEntry('article', entryData)

      // Keep articles as drafts for editorial review
      console.log(`✅ Article uploaded as DRAFT to Contentful: ${entry.sys.id}`)
      console.log('📝 Article requires editorial review before publishing')

      return entry.sys.id
    } catch (error) {
      console.error('❌ Error uploading article:', error.message)
      return null
    }
  }

  /**
   * Get existing FAQs from Contentful
   */
  async getExistingFAQs() {
    try {
      if (!this.contentfulClient) return []

      const entries = await this.contentfulClient.getEntries({
        content_type: 'faq',
        limit: 1000
      })

      return entries.items.map((item) => ({
        id: item.sys.id,
        question: item.fields.question ? item.fields.question['en-US'] : '',
        createdAt: item.sys.createdAt
      }))
    } catch (error) {
      console.error('❌ Error fetching existing FAQs:', error.message)
      return []
    }
  }

  /**
   * Get existing articles from Contentful
   */
  async getExistingArticles() {
    try {
      if (!this.contentfulClient) return []

      const entries = await this.contentfulClient.getEntries({
        content_type: 'article',
        limit: 1000
      })

      return entries.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.title ? item.fields.title['en-US'] : '',
        createdAt: item.sys.createdAt
      }))
    } catch (error) {
      console.error('❌ Error fetching existing articles:', error.message)
      return []
    }
  }

  /**
   * Generate SEO-friendly slug
   */
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

  /**
   * Save optimization report
   */
  async saveOptimizationReport(data, results) {
    try {
      const timestamp = new Date().toISOString().split('T')[0]
      const report = {
        generatedAt: new Date().toISOString(),
        analyticsData: data,
        optimizationResults: results,
        summary: {
          totalOpportunities: (results.newFAQs?.length || 0) + (results.newArticles?.length || 0),
          faqsGenerated: results.faqsCreated || 0,
          articlesGenerated: results.articlesCreated || 0,
          contentfulUploads: results.contentfulUploads || 0
        }
      }

      const reportDir = path.join(__dirname, '../../logs/content-optimization/')
      if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true })
      }

      const reportPath = path.join(reportDir, `optimization-report-${timestamp}.json`)
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

      console.log(`📊 Optimization report saved: ${reportPath}`)
      return reportPath
    } catch (error) {
      console.error('❌ Error saving report:', error.message)
      return null
    }
  }

  /**
   * Main optimization process
   */
  async runOptimization(options = {}) {
    try {
      console.log('\n🚀 Starting Intelligent Content Optimization...')
      console.log(`⏰ ${new Date().toISOString()}`)

      // Initialize
      const initialized = await this.initialize()
      if (!initialized) {
        throw new Error('Failed to initialize optimizer')
      }

      // Fetch latest analytics data
      const analyticsData = await this.fetchAnalyticsData()
      if (!analyticsData) {
        throw new Error('Failed to fetch analytics data')
      }

      // Analyze content opportunities
      const opportunities = await this.analyzeContentOpportunities(analyticsData)
      if (!opportunities) {
        throw new Error('Failed to analyze opportunities')
      }

      const results = {
        faqsCreated: 0,
        articlesCreated: 0,
        contentfulUploads: 0,
        newFAQs: [],
        newArticles: []
      }

      // Generate and upload FAQs (limit based on options)
      const maxFAQs = options.maxFAQs || 3
      const faqsToGenerate = opportunities.newFAQs.slice(0, maxFAQs)

      for (const queryData of faqsToGenerate) {
        const faq = await this.generateFAQ(queryData)
        if (faq) {
          results.faqsCreated++
          results.newFAQs.push(faq)

          // Upload to Contentful if enabled
          if (options.uploadToContentful !== false) {
            const entryId = await this.uploadFAQToContentful(faq)
            if (entryId) {
              results.contentfulUploads++
              faq.contentfulId = entryId
            }
          }
        }

        // Add delay between generations
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }

      // Generate and upload articles (limit based on options)
      const maxArticles = options.maxArticles || 1
      const articlesToGenerate = opportunities.newArticles.slice(0, maxArticles)

      for (const queryData of articlesToGenerate) {
        const article = await this.generateArticle(queryData)
        if (article) {
          results.articlesCreated++
          results.newArticles.push(article)

          // Upload to Contentful if enabled
          if (options.uploadToContentful !== false) {
            const entryId = await this.uploadArticleToContentful(article)
            if (entryId) {
              results.contentfulUploads++
              article.contentfulId = entryId
            }
          }
        }

        // Add delay between generations
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }

      // Save optimization report
      await this.saveOptimizationReport(analyticsData, results)

      // Summary
      console.log('\n🎉 Optimization Complete!')
      console.log('📊 Results:')
      console.log(`   FAQs Generated: ${results.faqsCreated} (auto-published to general FAQ page)`)
      console.log(`   Articles Generated: ${results.articlesCreated} (saved as drafts for review)`)
      console.log(`   Contentful Uploads: ${results.contentfulUploads}`)
      console.log(`   Total Content Pieces: ${results.faqsCreated + results.articlesCreated}`)
      console.log('\n📋 Publishing Status:')
      console.log('   ✅ FAQs: Auto-published and live on website')
      console.log('   📝 Articles: Saved as drafts, require editorial review')

      return results
    } catch (error) {
      console.error('❌ Optimization failed:', error.message)
      return null
    }
  }
}

// Export for use in cron jobs
module.exports = IntelligentContentOptimizer

// CLI usage
if (require.main === module) {
  const optimizer = new IntelligentContentOptimizer()

  const options = {
    maxFAQs: process.argv.includes('--max-faqs') ? parseInt(process.argv[process.argv.indexOf('--max-faqs') + 1]) : 3,
    maxArticles: process.argv.includes('--max-articles')
      ? parseInt(process.argv[process.argv.indexOf('--max-articles') + 1])
      : 1,
    uploadToContentful: !process.argv.includes('--no-upload')
  }

  optimizer
    .runOptimization(options)
    .then((results) => {
      if (results) {
        console.log('\n✨ Content optimization completed successfully!')
        process.exit(0)
      } else {
        console.log('\n❌ Content optimization failed')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('Fatal error:', error)
      process.exit(1)
    })
}
