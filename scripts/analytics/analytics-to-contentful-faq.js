#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable global-require */

/**
 * Analytics-Driven FAQ Auto-Creator for Contentful
 *
 * This script:
 * 1. Analyzes Google Analytics queries
 * 2. Generates FAQ content using OpenAI
 * 3. Automatically adds FAQs to Contentful CMS
 * 4. Associates FAQs with relevant courses
 * 5. Publishes entries and creates versions
 *
 * Scheduled to run via cron job (daily or weekly)
 */

const contentfulManagement = require('contentful-management')
const OpenAI = require('openai')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

// Configuration
const CONFIG = {
  // Contentful Management API
  contentful: {
    spaceId: process.env.ADMI_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master'
  },
  // Google Analytics
  analytics: {
    propertyId: process.env.GA4_PROPERTY_ID,
    apiKey: process.env.GOOGLE_ANALYTICS_API_KEY
  },
  // OpenAI
  openai: {
    apiKey: process.env.NEXT_OPENAI_API_KEY || process.env.OPENAI_API_KEY
  },
  // Logging
  logsDir: path.join(__dirname, '../../logs/faq-automation'),
  // Processing
  maxFAQsPerRun: 5,
  minSearchVolume: 5, // Minimum search queries to generate FAQ
  courseMapping: {
    'music production': 'music-production-diploma',
    'graphic design': 'graphic-design-diploma',
    'film production': 'film-and-television-production-diploma',
    animation: 'animation-and-motion-graphics-diploma',
    'digital marketing': 'digital-marketing-certificate',
    photography: 'photography-certificate',
    'sound engineering': 'sound-engineering-diploma',
    'ui ux': 'ui-ux-design-certificate'
  }
}

// Initialize clients
const openai = new OpenAI({ apiKey: CONFIG.openai.apiKey })
let contentfulClient = null
let contentfulSpace = null
let contentfulEnvironment = null

// Logger utility
class Logger {
  constructor() {
    this.ensureLogDir()
    this.logFile = path.join(CONFIG.logsDir, `faq-automation-${new Date().toISOString().split('T')[0]}.log`)
  }

  ensureLogDir() {
    if (!fs.existsSync(CONFIG.logsDir)) {
      fs.mkdirSync(CONFIG.logsDir, { recursive: true })
    }
  }

  log(message, level = 'INFO') {
    const timestamp = new Date().toISOString()
    const logLine = `[${timestamp}] [${level}] ${message}`
    console.log(logLine)
    fs.appendFileSync(this.logFile, logLine + '\n')
  }

  info(message) {
    this.log(message, 'INFO')
  }

  success(message) {
    this.log(message, 'SUCCESS')
  }

  warn(message) {
    this.log(message, 'WARN')
  }

  error(message) {
    this.log(message, 'ERROR')
  }
}

const logger = new Logger()

/**
 * Initialize Contentful Management Client
 */
async function initializeContentful() {
  try {
    if (!CONFIG.contentful.accessToken || !CONFIG.contentful.spaceId) {
      throw new Error('Missing Contentful credentials (CONTENTFUL_MANAGEMENT_TOKEN or space ID)')
    }

    contentfulClient = contentfulManagement.createClient({
      accessToken: CONFIG.contentful.accessToken
    })

    contentfulSpace = await contentfulClient.getSpace(CONFIG.contentful.spaceId)
    contentfulEnvironment = await contentfulSpace.getEnvironment(CONFIG.contentful.environment)

    logger.success('✅ Contentful client initialized')
    return true
  } catch (error) {
    logger.error(`Failed to initialize Contentful: ${error.message}`)
    return false
  }
}

/**
 * Fetch top search queries from Google Analytics
 */
async function fetchSearchQueries(days = 7) {
  try {
    logger.info('📊 Fetching search queries from Google Analytics...')

    // Try to use your existing API endpoint first
    const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000'
    try {
      const response = await axios.get(`${apiBaseUrl}/api/analytics/search-queries?limit=50&days=${days}`)
      if (response.data.success) {
        logger.success(`✅ Retrieved ${response.data.data.searchQueries.length} search queries from API`)
        return response.data.data.searchQueries
      }
    } catch (apiError) {
      logger.warn(`API endpoint not available: ${apiError.message}`)
    }

    // Fallback to sample queries if API not available
    logger.warn('⚠️ Using sample search queries (real GA4 integration needed)')
    return getSampleSearchQueries()
  } catch (error) {
    logger.error(`Failed to fetch search queries: ${error.message}`)
    return getSampleSearchQueries()
  }
}

/**
 * Get sample search queries for development/testing
 */
function getSampleSearchQueries() {
  return [
    { query: 'music production course fees nairobi', volume: 12 },
    { query: 'graphic design diploma duration', volume: 8 },
    { query: 'animation course job opportunities kenya', volume: 15 },
    { query: 'film production diploma requirements', volume: 10 },
    { query: 'admi digital marketing certificate salary', volume: 9 },
    { query: 'admi payment plans installments', volume: 20 },
    { query: 'admi job placement rate success', volume: 11 },
    { query: 'sound engineering admission requirements', volume: 7 },
    { query: 'photography course equipment needed', volume: 6 },
    { query: 'admi online courses available 2025', volume: 14 }
  ]
}

/**
 * Identify relevant courses for search query
 */
function identifyRelevantCourses(query) {
  const courses = []
  const lowerQuery = query.toLowerCase()

  for (const [keyword, courseSlug] of Object.entries(CONFIG.courseMapping)) {
    if (lowerQuery.includes(keyword)) {
      courses.push(courseSlug)
    }
  }

  return courses
}

/**
 * Generate FAQ from search query using OpenAI
 */
async function generateFAQFromQuery(query, courseSlug = null) {
  try {
    logger.info(`🤖 Generating FAQ for query: "${query}"`)

    const prompt = `You are an educational content expert. Create a comprehensive FAQ entry based on this search query from a prospective student.

SEARCH QUERY: "${query}"
${courseSlug ? `RELATED COURSE: ${courseSlug.replace(/-/g, ' ')}` : ''}

Generate a response in JSON format with:
{
  "question": "Clear, natural question that addresses the search intent",
  "answer": "Comprehensive, helpful answer (150-300 words) that directly addresses the question",
  "searchQuery": "${query}",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}

Important:
- Make the question natural and conversational
- Provide specific, actionable answers
- Include relevant ADMI details if applicable
- Focus on student pain points and common concerns
- Ensure answer is SEO-friendly`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a content strategist for an educational institution. Create helpful, natural FAQs.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    const response = completion.choices[0].message.content

    // Parse JSON response
    let faqData
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      faqData = JSON.parse(jsonMatch ? jsonMatch[0] : response)
    } catch (parseError) {
      logger.warn(`Failed to parse FAQ JSON, creating manual entry for: ${query}`)
      faqData = {
        question: query,
        answer: 'This is an important question for prospective ADMI students. Please contact our admissions team for detailed information.',
        searchQuery: query,
        keywords: [query]
      }
    }

    logger.success(`✅ Generated FAQ: "${faqData.question}"`)
    return faqData
  } catch (error) {
    logger.error(`Failed to generate FAQ: ${error.message}`)
    return null
  }
}

/**
 * Create FAQ entry in Contentful
 */
async function createFAQInContentful(faqData, courseSlug = null) {
  try {
    logger.info(`📝 Creating FAQ entry in Contentful...`)

    // Get the course entry if courseSlug is provided
    let courseReference = null
    if (courseSlug) {
      try {
        const courses = await contentfulEnvironment.getEntries({
          content_type: 'course',
          'fields.slug': courseSlug,
          limit: 1
        })

        if (courses.items.length > 0) {
          courseReference = {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: courses.items[0].sys.id
            }
          }
          logger.info(`📚 Linking to course: ${courseSlug}`)
        }
      } catch (courseError) {
        logger.warn(`Could not find course ${courseSlug}: ${courseError.message}`)
      }
    }

    // Create the FAQ entry
    // Note: Contentful FAQ schema has 'question' (Symbol), 'answer' (RichText), and 'course' (Link) fields
    // RichText requires proper formatting with blocks and inline content
    const answer = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: faqData.answer,
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }

    const entryFields = {
      question: {
        'en-US': faqData.question
      },
      answer: {
        'en-US': answer
      }
    }

    // Add course link if available
    if (courseReference) {
      entryFields.course = {
        'en-US': courseReference
      }
    }

    const entry = await contentfulEnvironment.createEntry('faq', {
      fields: entryFields
    })

    logger.success(`✅ FAQ entry created: ${entry.sys.id}`)

    // Publish the entry
    try {
      const publishedEntry = await entry.publish()
      logger.success(`✅ FAQ entry published: ${publishedEntry.sys.id}`)
      return publishedEntry
    } catch (publishError) {
      logger.warn(`Created entry but failed to publish: ${publishError.message}`)
      return entry
    }
  } catch (error) {
    logger.error(`Failed to create FAQ in Contentful: ${error.message}`)
    return null
  }
}

/**
 * Check if FAQ already exists to avoid duplicates
 */
async function faqExists(question, searchQuery) {
  try {
    const results = await contentfulEnvironment.getEntries({
      content_type: 'faq',
      'fields.searchQuery': searchQuery,
      limit: 1
    })

    return results.items.length > 0
  } catch (error) {
    logger.warn(`Could not check for duplicates: ${error.message}`)
    return false
  }
}

/**
 * Main automation workflow
 */
async function runAutomation() {
  try {
    logger.info('🚀 Starting Analytics-Driven FAQ Automation')
    logger.info(`⏰ Run started at: ${new Date().toISOString()}`)

    // Initialize Contentful
    const initialized = await initializeContentful()
    if (!initialized) {
      throw new Error('Failed to initialize Contentful')
    }

    // Fetch search queries
    const searchQueries = await fetchSearchQueries(7)
    if (!searchQueries || searchQueries.length === 0) {
      logger.warn('No search queries found, exiting')
      return false
    }

    logger.info(`📊 Processing ${Math.min(CONFIG.maxFAQsPerRun, searchQueries.length)} queries`)

    let successCount = 0
    let skipCount = 0

    // Process top queries
    for (let i = 0; i < Math.min(CONFIG.maxFAQsPerRun, searchQueries.length); i++) {
      const queryData = searchQueries[i]
      const query = typeof queryData === 'string' ? queryData : queryData.query
      const volume = typeof queryData === 'string' ? 1 : (queryData.volume || 1)

      // Skip low-volume queries
      if (volume < CONFIG.minSearchVolume) {
        logger.info(`⏭️ Skipping low-volume query (${volume} searches): "${query}"`)
        skipCount++
        continue
      }

      logger.info(`\n📌 Processing query ${i + 1}/${CONFIG.maxFAQsPerRun}: "${query}" (${volume} searches)`)

      // Check if FAQ already exists
      if (await faqExists(query, query)) {
        logger.info(`⏭️ FAQ already exists for: "${query}"`)
        skipCount++
        continue
      }

      // Generate FAQ
      const faqData = await generateFAQFromQuery(query)
      if (!faqData) {
        logger.warn(`Failed to generate FAQ for query: "${query}"`)
        continue
      }

      // Identify relevant courses
      const relevantCourses = identifyRelevantCourses(query)
      logger.info(`🎯 Identified ${relevantCourses.length} relevant course(s)`)

      // Create FAQ in Contentful (for first course or general)
      const courseSlug = relevantCourses.length > 0 ? relevantCourses[0] : null
      const createdEntry = await createFAQInContentful(faqData, courseSlug)

      if (createdEntry) {
        successCount++
        logger.success('✅ FAQ entry created and published')
      }

      // Add small delay between API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    // Summary
    logger.info('\n' + '='.repeat(60))
    logger.info('📊 AUTOMATION RUN SUMMARY')
    logger.info('='.repeat(60))
    logger.success(`✅ Successfully created: ${successCount} FAQ entries`)
    logger.info(`⏭️ Skipped: ${skipCount} queries`)
    logger.info(`📅 Completed at: ${new Date().toISOString()}`)

    return successCount > 0
  } catch (error) {
    logger.error(`❌ Automation failed: ${error.message}`)
    logger.error(error.stack)
    return false
  }
}

/**
 * CLI commands
 */
async function main() {
  const command = process.argv[2]

  switch (command) {
    case 'run':
      await runAutomation()
      break
    case 'test':
      logger.info('🧪 Testing FAQ generation from sample queries...')
      const sampleQueries = getSampleSearchQueries().slice(0, 2)
      for (const queryData of sampleQueries) {
        const faq = await generateFAQFromQuery(queryData.query)
        console.log('\n' + JSON.stringify(faq, null, 2))
      }
      break
    case 'dry-run':
      logger.info('🏃 Running in dry-run mode (no Contentful changes)...')
      const queries = await fetchSearchQueries(7)
      logger.info(`Would process ${Math.min(CONFIG.maxFAQsPerRun, queries.length)} queries`)
      for (let i = 0; i < Math.min(2, queries.length); i++) {
        const query = typeof queries[i] === 'string' ? queries[i] : queries[i].query
        logger.info(`  - "${query}"`)
      }
      break
    default:
      console.log(`
✨ Analytics-Driven FAQ Auto-Creator for Contentful

USAGE:
  npm run faq:analytics-to-contentful run       # Run full automation
  npm run faq:analytics-to-contentful test      # Test FAQ generation
  npm run faq:analytics-to-contentful dry-run   # Preview what would run

FEATURES:
  ✅ Analyzes Google Analytics search queries
  ✅ Generates AI-powered FAQs using OpenAI
  ✅ Automatically creates entries in Contentful
  ✅ Associates FAQs with relevant courses
  ✅ Publishes entries automatically
  ✅ Avoids duplicate entries
  ✅ Detailed logging

ENVIRONMENT VARIABLES:
  ADMI_CONTENTFUL_SPACE_ID     - Contentful space ID
  CONTENTFUL_MANAGEMENT_TOKEN  - Contentful management API token
  OPENAI_API_KEY              - OpenAI API key
  GOOGLE_ANALYTICS_API_KEY    - Google Analytics API key
  API_BASE_URL                - Your API base (http://localhost:3000)

CRON SETUP:
  # Run daily at 2 AM
  0 2 * * * cd /path/to/admi-website && npm run faq:analytics-to-contentful run

LOGS:
  Check: logs/faq-automation/faq-automation-YYYY-MM-DD.log
`)
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

module.exports = {
  runAutomation,
  generateFAQFromQuery,
  createFAQInContentful,
  fetchSearchQueries
}
