/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAI = require('openai')
const fs = require('fs')
const path = require('path')
const axios = require('axios')
require('dotenv').config()

/**
 * API-Driven FAQ Optimizer
 *
 * This script uses your existing API structure to fetch analytics data
 * and optimize FAQs based on real user behavior data.
 */

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY || process.env.OPENAI_API_KEY
})

// Base URL for your local API
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001'

/**
 * Fetch analytics data from your APIs
 */
async function fetchAnalyticsData() {
  try {
    console.log('📊 Fetching analytics data from APIs...')

    const [metricsResponse, queriesResponse, reportResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/api/analytics/faq-metrics`),
      axios.get(`${API_BASE_URL}/api/analytics/search-queries?limit=30`),
      axios.get(`${API_BASE_URL}/api/analytics/optimization-report`)
    ])

    if (!metricsResponse.data.success || !queriesResponse.data.success || !reportResponse.data.success) {
      throw new Error('Failed to fetch analytics data from APIs')
    }

    return {
      faqMetrics: metricsResponse.data.data,
      searchQueries: queriesResponse.data.data.searchQueries,
      topKeywords: queriesResponse.data.data.topKeywords,
      optimizationReport: reportResponse.data.data
    }
  } catch (error) {
    console.error('❌ Error fetching analytics data:', error.message)
    return null
  }
}

/**
 * Generate FAQ content based on real search queries
 */
async function generateSearchDrivenFAQs(searchQueries, courseSlug = null) {
  try {
    console.log('🤖 Generating search-driven FAQs...')

    // Filter queries relevant to the course if specified
    const relevantQueries = courseSlug
      ? searchQueries.filter(
          (q) =>
            q.query.toLowerCase().includes(courseSlug.replace('-', ' ')) ||
            q.query.toLowerCase().includes(courseSlug.split('-')[0])
        )
      : searchQueries

    if (relevantQueries.length === 0) {
      console.log('⚠️  No relevant search queries found')
      return []
    }

    const topQueries = relevantQueries.slice(0, 8).map((q) => q.query)

    const prompt = `Based on real search queries from ADMI's Google Analytics, generate comprehensive FAQs that directly address what prospective students are searching for.

REAL USER SEARCH QUERIES:
${topQueries.map((query, i) => `${i + 1}. "${query}"`).join('\n')}

${courseSlug ? `TARGET COURSE: ${courseSlug}` : 'TARGET: General ADMI Institution FAQs'}

REQUIREMENTS:
1. Address the EXACT search intent behind each query
2. Use natural language that matches how users search
3. Include specific details that users are seeking
4. Focus on decision-making factors (fees, requirements, job prospects, duration)
5. Make answers comprehensive but scannable

Generate 6-8 FAQs that directly answer these search queries. Each FAQ should:
- Use the search query language in the question
- Provide specific, actionable answers
- Include relevant details that help users make decisions

Return a JSON array with this format:
[
  {
    "question": "Question that matches search intent",
    "answer": "Comprehensive answer with specific details",
    "searchQuery": "Original search query this addresses",
    "priority": "high|medium|low"
  }
]`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a search data analyst and content strategist specializing in educational institutions. Create FAQs that directly address real user search queries and search intent.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    })

    const response = completion.choices[0].message.content

    // Parse JSON response
    try {
      // Try to find JSON array in the response
      const jsonMatches = [
        response.match(/\\[[\\s\\S]*\\]/),
        response.match(/```json\\s*([\\s\\S]*?)\\s*```/),
        response.match(/```\\s*([\\s\\S]*?)\\s*```/)
      ]

      for (const match of jsonMatches) {
        if (match) {
          const jsonStr = match[1] || match[0]
          try {
            return JSON.parse(jsonStr)
          } catch (e) {
            continue
          }
        }
      }

      // If no JSON found, try to parse the entire response
      return JSON.parse(response)
    } catch (parseError) {
      console.error('Failed to parse FAQ response:', parseError)
      console.log('Raw response:', response.substring(0, 500))

      // Return fallback FAQs based on search queries
      return topQueries.slice(0, 6).map((query, i) => ({
        question: `What about ${query}?`,
        answer: `Based on your search for "${query}", here's what you need to know about ADMI's programs and requirements.`,
        searchQuery: query,
        priority: i < 3 ? 'high' : 'medium'
      }))
    }
  } catch (error) {
    console.error('Error generating search-driven FAQs:', error)
    return []
  }
}

/**
 * Update main FAQ page with API-driven content
 */
async function updateMainFAQPageFromAPI() {
  try {
    console.log('🔄 Updating main FAQ page with API data...')

    const analyticsData = await fetchAnalyticsData()

    if (!analyticsData) {
      console.log('⚠️  Using existing optimization (analytics not available)')
      return false
    }

    console.log('📈 Analytics Summary:')
    console.log(`   FAQ Page Views: ${analyticsData.faqMetrics.pageViews}`)
    console.log(`   Bounce Rate: ${analyticsData.faqMetrics.bounceRate}%`)
    console.log(`   Top Search Keywords: ${analyticsData.topKeywords.slice(0, 5).join(', ')}`)
    console.log(`   Optimization Score: ${analyticsData.optimizationReport.overallScore}/100`)

    // Generate FAQs based on real search data
    const searchDrivenFAQs = await generateSearchDrivenFAQs(analyticsData.searchQueries)

    if (searchDrivenFAQs.length === 0) {
      console.log('❌ No FAQs generated from search data')
      return false
    }

    // Generate the updated FAQ page component
    const faqPageContent = generateAPIFAQPageComponent(searchDrivenFAQs, analyticsData)

    // Save to file for review
    const outputPath = path.join(__dirname, '../ai/api-optimized-main-faq-page.tsx')
    fs.writeFileSync(outputPath, faqPageContent)

    console.log(`📄 API-optimized FAQ page saved to: ${outputPath}`)
    console.log('\\n📋 Generated FAQs:')

    searchDrivenFAQs.forEach((faq, index) => {
      console.log(`\\n${index + 1}. ${faq.question}`)
      console.log(`   Based on: "${faq.searchQuery}"`)
      console.log(`   Priority: ${faq.priority}`)
      console.log(`   ${faq.answer.substring(0, 100)}...`)
    })

    return searchDrivenFAQs
  } catch (error) {
    console.error('❌ Error updating main FAQ page:', error)
    return false
  }
}

/**
 * Generate FAQ page component with API-driven content
 */
function generateAPIFAQPageComponent(faqs, analyticsData) {
  const faqSchemaItems = faqs
    .map(
      (faq) => `      {
        '@type': 'Question',
        name: '${faq.question.replace(/'/g, "\\\\'")}',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '${faq.answer.replace(/'/g, "\\\\'").replace(/"/g, '\\\\"')}'
        }
      }`
    )
    .join(',\\n')

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
    .join('\\n\\n')

  const keywords = analyticsData.topKeywords.join(', ')
  const optimizationScore = analyticsData.optimizationReport.overallScore

  return `// Generated by API-driven FAQ optimizer
// Based on real Google Analytics search data
// Optimization Score: ${optimizationScore}/100
// Generated: ${new Date().toISOString()}

import React from 'react'
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
        description="Get answers to the most common questions about ADMI courses, fees, admission requirements, and career prospects based on real student search queries."
        canonical="https://admi.africa/frequently-asked-questions"
        keywords="admi faq, digital media institute questions, ${keywords}"
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
          Answers to the most common questions from prospective ADMI students based on real search data
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
 * Generate optimization report
 */
async function generateAPIOptimizationReport() {
  try {
    console.log('📊 Generating API-driven optimization report...')

    const analyticsData = await fetchAnalyticsData()

    if (!analyticsData) {
      console.log('❌ Analytics data not available')
      return null
    }

    const report = {
      timestamp: new Date().toISOString(),
      source: 'API-driven analytics',
      optimizationScore: analyticsData.optimizationReport.overallScore,
      faqMetrics: analyticsData.faqMetrics,
      searchInsights: {
        totalQueries: analyticsData.searchQueries.length,
        topQueries: analyticsData.searchQueries.slice(0, 10),
        topKeywords: analyticsData.topKeywords
      },
      recommendations: analyticsData.optimizationReport.recommendations,
      nextActions: generateNextActions(analyticsData)
    }

    // Save report
    const reportPath = path.join(
      __dirname,
      'reports',
      `api-optimization-${new Date().toISOString().split('T')[0]}.json`
    )
    const reportsDir = path.dirname(reportPath)

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true })
    }

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

    console.log('✅ API optimization report generated')
    console.log(`📄 Saved to: ${reportPath}`)
    console.log(`📈 Optimization Score: ${report.optimizationScore}/100`)
    console.log(`🔍 Top Search Keywords: ${report.searchInsights.topKeywords.join(', ')}`)

    return report
  } catch (error) {
    console.error('❌ Failed to generate API optimization report:', error)
    return null
  }
}

/**
 * Generate actionable next steps based on analytics data
 */
function generateNextActions(analyticsData) {
  const actions = []

  // Score-based actions
  if (analyticsData.optimizationReport.overallScore < 70) {
    actions.push('Implement high-priority recommendations to improve overall score')
  }

  // Bounce rate actions
  if (analyticsData.faqMetrics.bounceRate > 50) {
    actions.push('Optimize FAQ page loading speed and content structure')
  }

  // Conversion actions
  const conversionRate = parseFloat(analyticsData.faqMetrics.conversionFunnel.faqToCourseConversionRate)
  if (conversionRate < 35) {
    actions.push('Add more course links and CTAs within FAQ answers')
  }

  // Content actions based on search queries
  if (analyticsData.searchQueries.length > 5) {
    actions.push(
      `Create FAQs for top search queries: ${analyticsData.searchQueries
        .slice(0, 3)
        .map((q) => q.query)
        .join(', ')}`
    )
  }

  return actions
}

/**
 * Main execution
 */
async function main() {
  const command = process.argv[2]

  switch (command) {
    case 'optimize-main':
      await updateMainFAQPageFromAPI()
      break
    case 'report':
      await generateAPIOptimizationReport()
      break
    case 'test-api':
      console.log('🧪 Testing API connections...')
      const data = await fetchAnalyticsData()
      if (data) {
        console.log('✅ All APIs working correctly')
        console.log(`📊 FAQ Views: ${data.faqMetrics.pageViews}`)
        console.log(`🔍 Search Queries: ${data.searchQueries.length}`)
        console.log(`📈 Score: ${data.optimizationReport.overallScore}/100`)
      } else {
        console.log('❌ API test failed')
      }
      break
    default:
      console.log('🔄 API-Driven FAQ Optimizer')
      console.log('\\nUsage:')
      console.log('  npm run faq:api-optimize optimize-main # Optimize main FAQ page with API data')
      console.log('  npm run faq:api-optimize report        # Generate API-driven optimization report')
      console.log('  npm run faq:api-optimize test-api      # Test API connections')
      console.log('\\nFeatures:')
      console.log('  ✅ Uses your existing API structure')
      console.log('  ✅ Real Google Analytics search data')
      console.log('  ✅ AI-powered FAQ generation')
      console.log('  ✅ Performance optimization recommendations')
      console.log('  ✅ Seamless integration with current workflow')
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
}

module.exports = {
  fetchAnalyticsData,
  generateSearchDrivenFAQs,
  updateMainFAQPageFromAPI,
  generateAPIOptimizationReport
}
