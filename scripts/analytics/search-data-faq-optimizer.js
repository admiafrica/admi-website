/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAI = require('openai')
// const contentful = require('contentful-management')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY || process.env.OPENAI_API_KEY
})

/**
 * Google Analytics / Search Console Data Integration for FAQ Optimization
 *
 * This script analyzes search query data to optimize FAQs based on actual user questions
 * Note: Requires Google Analytics and Search Console API access
 */

// Sample search query patterns (replace with actual GA/GSC data)
const SAMPLE_SEARCH_QUERIES = [
  // Course-specific queries
  'music production course fees admi',
  'film production diploma requirements',
  'graphic design course duration',
  'animation course job opportunities',
  'digital marketing certificate salary',
  'photography course equipment',
  'sound engineering admission requirements',

  // General institutional queries
  'admi location nairobi',
  'admi accreditation pearson',
  'admi payment plans installments',
  'admi job placement rate',
  'admi vs other media schools',
  'admi online courses available',
  'admi scholarship opportunities',
  'admi industry partnerships',

  // Career-focused queries
  'creative jobs kenya salary',
  'film industry jobs nairobi',
  'graphic designer salary kenya',
  'music producer career prospects',
  'animation jobs east africa',
  'digital marketing jobs remote',

  // Practical queries
  'admi course start dates 2025',
  'admi application deadline',
  'admi campus facilities tour',
  'admi student accommodation',
  'admi part time courses',
  'admi evening classes available'
]

/**
 * Analyze search queries to identify FAQ gaps and optimization opportunities
 */
function analyzeSearchQueries(queries) {
  const analysis = {
    courseSpecific: [],
    institutional: [],
    careerFocused: [],
    practical: [],
    missingTopics: []
  }

  // Categorize queries
  queries.forEach((query) => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes('course') || lowerQuery.includes('diploma') || lowerQuery.includes('certificate')) {
      analysis.courseSpecific.push(query)
    } else if (lowerQuery.includes('job') || lowerQuery.includes('salary') || lowerQuery.includes('career')) {
      analysis.careerFocused.push(query)
    } else if (
      lowerQuery.includes('admi') &&
      (lowerQuery.includes('location') || lowerQuery.includes('accreditation') || lowerQuery.includes('payment'))
    ) {
      analysis.institutional.push(query)
    } else {
      analysis.practical.push(query)
    }
  })

  // Identify common themes
  const themes = extractCommonThemes(queries)
  analysis.commonThemes = themes

  return analysis
}

/**
 * Extract common themes from search queries
 */
function extractCommonThemes(queries) {
  const themes = {}

  const keywords = [
    'fees',
    'cost',
    'price',
    'payment',
    'requirements',
    'admission',
    'application',
    'duration',
    'time',
    'schedule',
    'jobs',
    'career',
    'salary',
    'employment',
    'location',
    'campus',
    'facilities',
    'accreditation',
    'certification',
    'recognition',
    'online',
    'remote',
    'hybrid',
    'equipment',
    'tools',
    'software',
    'scholarship',
    'financial aid',
    'loan'
  ]

  keywords.forEach((keyword) => {
    const count = queries.filter((query) => query.toLowerCase().includes(keyword)).length

    if (count > 0) {
      themes[keyword] = count
    }
  })

  return Object.entries(themes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([keyword, count]) => ({ keyword, count }))
}

/**
 * Generate FAQ suggestions based on search data analysis
 */
async function generateDataDrivenFAQs(searchAnalysis, courseSlug = null) {
  try {
    console.log('🔍 Generating data-driven FAQ suggestions...')

    const prompt = `Based on real search query data from ADMI's website analytics, generate 5-8 FAQs that address the most common user questions and search intent.

SEARCH QUERY ANALYSIS:
Most Common Themes: ${searchAnalysis.commonThemes.map((t) => `${t.keyword} (${t.count} queries)`).join(', ')}

Course-Specific Queries: ${searchAnalysis.courseSpecific.slice(0, 5).join(', ')}
Career-Focused Queries: ${searchAnalysis.careerFocused.slice(0, 5).join(', ')}
Institutional Queries: ${searchAnalysis.institutional.slice(0, 5).join(', ')}
Practical Queries: ${searchAnalysis.practical.slice(0, 5).join(', ')}

${courseSlug ? `TARGET COURSE: ${courseSlug}` : 'TARGET: General ADMI Institution FAQs'}

REQUIREMENTS:
1. Address the most frequently searched topics
2. Use natural language that matches search intent
3. Include specific details that users are seeking
4. Focus on conversion and decision-making factors
5. Incorporate trending concerns and questions

${courseSlug ? 'Create course-specific FAQs that answer search queries about this particular program.' : 'Create institutional FAQs that answer general questions about ADMI.'}

Return a JSON array with this format:
[
  {
    "question": "Question matching search intent",
    "answer": "Comprehensive answer addressing user concerns",
    "searchKeywords": ["keyword1", "keyword2"],
    "priority": "high|medium|low"
  }
]`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a search data analyst and FAQ optimization expert. Create FAQs that directly address user search intent and improve conversion rates.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2500
    })

    const response = completion.choices[0].message.content

    // Parse JSON response
    try {
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      throw new Error('No JSON found')
    } catch (parseError) {
      console.error('Failed to parse FAQ response:', parseError)
      return []
    }
  } catch (error) {
    console.error('Error generating data-driven FAQs:', error)
    return []
  }
}

/**
 * Generate optimized general FAQs for the main FAQ page
 */
async function generateOptimizedGeneralFAQs() {
  const searchAnalysis = analyzeSearchQueries(SAMPLE_SEARCH_QUERIES)
  const dataDrivenFAQs = await generateDataDrivenFAQs(searchAnalysis)

  return dataDrivenFAQs
}

/**
 * Update the main FAQ page with data-driven content
 */
async function updateMainFAQPage() {
  try {
    console.log('📊 Generating data-driven FAQs for main FAQ page...')

    const optimizedFAQs = await generateOptimizedGeneralFAQs()

    if (optimizedFAQs.length === 0) {
      console.error('❌ No FAQs generated')
      return
    }

    // Generate the updated FAQ page component
    const faqPageContent = generateFAQPageComponent(optimizedFAQs)

    // Save to file for review
    const outputPath = path.join(__dirname, '../ai/optimized-main-faq-page.tsx')
    fs.writeFileSync(outputPath, faqPageContent)

    console.log(`📄 Optimized FAQ page saved to: ${outputPath}`)
    console.log('\n📋 Generated FAQs:')

    optimizedFAQs.forEach((faq, index) => {
      console.log(`\n${index + 1}. ${faq.question}`)
      console.log(`   Priority: ${faq.priority}`)
      console.log(`   Keywords: ${faq.searchKeywords?.join(', ') || 'N/A'}`)
      console.log(`   ${faq.answer.substring(0, 100)}...`)
    })

    return optimizedFAQs
  } catch (error) {
    console.error('❌ Error updating main FAQ page:', error)
  }
}

/**
 * Generate the FAQ page React component
 */
function generateFAQPageComponent(faqs) {
  const faqSchemaItems = faqs
    .map(
      (faq) => `      {
        '@type': 'Question',
        name: '${faq.question.replace(/'/g, "\\'")}',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '${faq.answer.replace(/'/g, "\\'").replace(/"/g, '\\"')}'
        }
      }`
    )
    .join(',\n')

  const faqAccordionItems = faqs
    .map(
      (faq) => `          <Accordion.Item key="${faq.question}" value="${faq.question}">
            <Accordion.Control>
              <Text fw={500}>${faq.question}</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text>
                ${faq.answer}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>`
    )
    .join('\n\n')

  return `import React from 'react'
import { Container, Title, Accordion, Text } from '@mantine/core'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'

const FAQPage = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
${faqSchemaItems}
    ]
  }

  return (
    <MainLayout>
      <PageSEO
        title="Frequently Asked Questions - ADMI"
        description="Get answers to the most common questions about ADMI courses, fees, admission requirements, and career prospects based on what prospective students search for most."
        canonical="https://admi.africa/frequently-asked-questions"
        keywords="admi faq, digital media institute questions, course fees, admission requirements, ${faqs
          .map((f) => f.searchKeywords?.join(', '))
          .filter(Boolean)
          .join(', ')}"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="xl">
          Frequently Asked Questions
        </Title>

        <Text size="lg" ta="center" mb="xl" c="dimmed">
          Answers to the most common questions from prospective ADMI students
        </Text>

        <Accordion variant="separated">
${faqAccordionItems}
        </Accordion>
      </Container>
    </MainLayout>
  )
}

export default FAQPage
`
}

/**
 * Create a Google Analytics MCP integration script
 */
function generateGoogleAnalyticsMCPScript() {
  return `# Google Analytics MCP Integration for FAQ Optimization

## Setup Instructions

### 1. Install Google Analytics MCP Server
\`\`\`bash
npm install @mcp/google-analytics
\`\`\`

### 2. Configure MCP Server (in your mcp-server config)
\`\`\`json
{
  "mcpServers": {
    "google-analytics": {
      "command": "node",
      "args": ["node_modules/@mcp/google-analytics/dist/index.js"],
      "env": {
        "GOOGLE_ANALYTICS_PROPERTY_ID": "your-ga4-property-id",
        "GOOGLE_SERVICE_ACCOUNT_KEY": "path/to/service-account.json"
      }
    }
  }
}
\`\`\`

### 3. Search Console Integration
\`\`\`bash
npm install @mcp/search-console
\`\`\`

### 4. Usage Script
\`\`\`javascript
const { MCPClient } = require('@mcp/client')

async function getSearchQueries() {
  const client = new MCPClient()
  
  // Get search queries from Search Console
  const searchQueries = await client.call('search-console', 'getSearchQueries', {
    site: 'https://admi.africa',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    dimensions: ['query'],
    rowLimit: 1000
  })
  
  // Get popular pages from Google Analytics
  const popularPages = await client.call('google-analytics', 'getPageViews', {
    startDate: '30daysAgo',
    endDate: 'today',
    dimensions: ['pagePath', 'pageTitle'],
    metrics: ['screenPageViews']
  })
  
  return { searchQueries, popularPages }
}
\`\`\`

### 5. Automated FAQ Optimization
\`\`\`javascript
// Schedule this to run weekly
async function optimizeFAQsWithSearchData() {
  const { searchQueries, popularPages } = await getSearchQueries()
  
  // Analyze queries for course-specific patterns
  const courseQueries = searchQueries.filter(q => 
    q.query.includes('course') || 
    q.query.includes('diploma') || 
    q.query.includes('certificate')
  )
  
  // Generate new FAQs based on trending searches
  for (const courseSlug of COURSE_SLUGS) {
    const relevantQueries = courseQueries.filter(q => 
      q.query.includes(courseSlug.replace('-', ' '))
    )
    
    if (relevantQueries.length > 10) {
      await generateCourseSpecificFAQs(courseSlug, relevantQueries)
    }
  }
}
\`\`\`

## Analytics-Driven FAQ Features

### 1. Search Intent Analysis
- Identify question patterns in search queries
- Extract common concerns and information gaps
- Prioritize FAQs based on search volume

### 2. Performance Tracking
- Monitor FAQ page engagement metrics
- Track which FAQs are most viewed/expanded
- A/B test different FAQ formulations

### 3. Automated Updates
- Weekly analysis of new search queries
- Automatic FAQ generation for trending topics
- Content optimization based on user behavior

### 4. Course-Specific Optimization
- Match search queries to specific courses
- Generate targeted FAQs for high-traffic courses
- Optimize based on conversion funnel analysis
\`\`\`
`
}

/**
 * Main execution function
 */
async function main() {
  const command = process.argv[2]

  switch (command) {
    case 'optimize-main-faq':
      await updateMainFAQPage()
      break
    case 'analyze-queries':
      const analysis = analyzeSearchQueries(SAMPLE_SEARCH_QUERIES)
      console.log('📊 Search Query Analysis:', JSON.stringify(analysis, null, 2))
      break
    case 'generate-mcp-guide':
      const guide = generateGoogleAnalyticsMCPScript()
      fs.writeFileSync(path.join(__dirname, 'google-analytics-mcp-setup.md'), guide)
      console.log('📖 MCP setup guide created: google-analytics-mcp-setup.md')
      break
    default:
      console.log('Usage:')
      console.log('  node search-data-faq-optimizer.js optimize-main-faq')
      console.log('  node search-data-faq-optimizer.js analyze-queries')
      console.log('  node search-data-faq-optimizer.js generate-mcp-guide')
  }
}

if (require.main === module) {
  main()
}

module.exports = {
  analyzeSearchQueries,
  generateDataDrivenFAQs,
  updateMainFAQPage,
  generateOptimizedGeneralFAQs
}
