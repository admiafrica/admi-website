/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAI = require('openai')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

/**
 * Intelligent FAQ Content Generator
 * Uses OpenAI Assistant with vector store to create targeted FAQ responses based on actual search queries
 */

class IntelligentFAQGenerator {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY || process.env.NEXT_OPENAI_API_KEY

    if (!this.openaiApiKey) {
      throw new Error('OpenAI API key not found. Check OPENAI_API_KEY or NEXT_OPENAI_API_KEY in .env')
    }

    this.openai = new OpenAI({
      apiKey: this.openaiApiKey
    })

    // ADMI Assistant ID (configured with vector store containing all course information)
    this.assistantId = process.env.OPENAI_ASSISTANT_ID || 'asst_0OjBfvO64gzZaQIz21SzY23D'
  }

  /**
   * Generate intelligent FAQ response using OpenAI Assistant with vector store
   */
  async generateFAQResponse(searchQuery, courseContext = null) {
    try {
      console.log(`🤖 Generating FAQ response for: "${searchQuery}"`)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const unusedCourseContext = courseContext

      // Create a thread for this conversation
      const thread = await this.openai.beta.threads.create()

      console.log('Thread created:', thread.id)

      // Create a message with the search query
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const message = await this.openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: `Create a comprehensive FAQ response for this search query from a prospective ADMI student: "${searchQuery}"

REQUIREMENTS:
- Answer the EXACT question asked in the search query
- Use accurate information from ADMI's course catalog and documents in your knowledge base
- Provide specific details (fees, duration, requirements, job opportunities, salaries)
- Include enrollment information and next steps
- Maintain professional, encouraging tone appropriate for prospective students
- Include clear call-to-action for enrollment or course inquiry
- Be concise but comprehensive (200-300 words)
- Format as Question and Answer

The response should directly address what the student is searching for and guide them toward enrollment.`
      })

      // Run the assistant
      const run = await this.openai.beta.threads.runs.create(thread.id, {
        assistant_id: this.assistantId,
        instructions:
          "You are ADMI's educational advisor. Use the comprehensive course information in your knowledge base to create accurate, helpful FAQ responses that encourage enrollment while providing genuine value to prospective students."
      })

      console.log('Run created:', run.id)

      // Wait for completion with proper debugging
      let runStatus
      try {
        runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id)
        console.log('Initial run status:', runStatus.status)
      } catch (error) {
        console.error('Error retrieving run status:', error.message)
        return null
      }

      while (runStatus.status === 'queued' || runStatus.status === 'in_progress') {
        console.log(`Waiting... Status: ${runStatus.status}`)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        try {
          runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id)
        } catch (error) {
          console.error('Error during polling:', error.message)
          break
        }
      }

      if (runStatus.status === 'completed') {
        // Retrieve the assistant's response
        const messages = await this.openai.beta.threads.messages.list(thread.id)
        const assistantMessage = messages.data.find((msg) => msg.role === 'assistant')

        if (assistantMessage && assistantMessage.content[0] && assistantMessage.content[0].text) {
          return assistantMessage.content[0].text.value
        }
      } else {
        console.error('Assistant run failed:', runStatus.status, runStatus.last_error)
      }

      return null
    } catch (error) {
      console.error('Error generating FAQ response with assistant:', error.message)
      return null
    }
  }

  /**
   * Generate multiple FAQ responses for top search queries
   */
  async generateTopSearchFAQs(searchQueries) {
    const generatedFAQs = []

    for (const queryData of searchQueries) {
      console.log(`\n📝 Processing query: "${queryData.query}" (${queryData.sessions} sessions)`)

      // Determine course context from query
      const courseContext = this.detectCourseContext(queryData.query)

      const faqResponse = await this.generateFAQResponse(queryData.query, courseContext)

      if (faqResponse) {
        generatedFAQs.push({
          query: queryData.query,
          sessions: queryData.sessions,
          users: queryData.users,
          courseContext,
          response: faqResponse,
          priority: this.calculatePriority(queryData.sessions)
        })

        // Add small delay to respect API limits
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    return generatedFAQs
  }

  /**
   * Detect which course context a search query relates to
   */
  detectCourseContext(query) {
    const queryLower = query.toLowerCase()

    if (queryLower.includes('music') || queryLower.includes('production') || queryLower.includes('sound')) {
      return 'Music Production'
    }
    if (queryLower.includes('film') || queryLower.includes('television') || queryLower.includes('video')) {
      return 'Film & Television Production'
    }
    if (queryLower.includes('graphic') || queryLower.includes('design') || queryLower.includes('visual')) {
      return 'Graphic Design'
    }
    if (queryLower.includes('animation') || queryLower.includes('motion') || queryLower.includes('3d')) {
      return 'Animation & Motion Graphics'
    }
    if (
      queryLower.includes('digital marketing') ||
      queryLower.includes('marketing') ||
      queryLower.includes('social media')
    ) {
      return 'Digital Marketing'
    }
    if (queryLower.includes('photography') || queryLower.includes('photo')) {
      return 'Photography'
    }
    if (queryLower.includes('game') || queryLower.includes('gaming') || queryLower.includes('development')) {
      return 'Video Game Development'
    }

    return null // General query
  }

  /**
   * Calculate priority based on search volume
   */
  calculatePriority(sessions) {
    if (sessions >= 40) return 'high'
    if (sessions >= 20) return 'medium'
    return 'low'
  }

  /**
   * Format FAQs for Contentful integration
   */
  formatForContentful(generatedFAQs) {
    return generatedFAQs.map((faq) => ({
      question: this.extractQuestion(faq.response),
      answer: this.extractAnswer(faq.response),
      searchQuery: faq.query,
      priority: faq.priority,
      sessions: faq.sessions,
      courseContext: faq.courseContext,
      category: 'Admissions', // Default category
      tags: this.generateTags(faq.query, faq.courseContext)
    }))
  }

  /**
   * Extract question from generated response
   */
  extractQuestion(response) {
    const lines = response.split('\n')
    const questionLine = lines.find(
      (line) => line.includes('?') && (line.includes('Q:') || line.includes('Question:') || line.trim().endsWith('?'))
    )

    if (questionLine) {
      return questionLine.replace(/^(Q:|Question:|\*\*Question:\*\*)\s*/i, '').trim()
    }

    // Fallback: generate question from first line
    const firstLine = lines[0].trim()
    return firstLine.includes('?') ? firstLine : `${firstLine}?`
  }

  /**
   * Extract answer from generated response
   */
  extractAnswer(response) {
    const lines = response.split('\n')
    const answerStart = lines.findIndex(
      (line) => line.includes('A:') || line.includes('Answer:') || line.includes('**Answer:**')
    )

    if (answerStart > -1) {
      return lines
        .slice(answerStart)
        .join('\n')
        .replace(/^(A:|Answer:|\*\*Answer:\*\*)\s*/i, '')
        .trim()
    }

    // Fallback: everything after first line
    return lines.slice(1).join('\n').trim() || response
  }

  /**
   * Generate relevant tags for FAQ
   */
  generateTags(query, courseContext) {
    const tags = []
    const queryLower = query.toLowerCase()

    if (queryLower.includes('fees') || queryLower.includes('cost') || queryLower.includes('price')) {
      tags.push('fees')
    }
    if (queryLower.includes('requirements') || queryLower.includes('admission')) {
      tags.push('requirements')
    }
    if (queryLower.includes('duration') || queryLower.includes('long') || queryLower.includes('time')) {
      tags.push('duration')
    }
    if (queryLower.includes('job') || queryLower.includes('career') || queryLower.includes('salary')) {
      tags.push('careers')
    }

    if (courseContext) {
      tags.push(courseContext.replace('-', ' '))
    }

    return tags
  }

  /**
   * Save generated FAQs to file
   */
  async saveGeneratedFAQs(generatedFAQs, filename = null) {
    try {
      const timestamp = new Date().toISOString().split('T')[0]
      const fileName = filename || `generated-faqs-${timestamp}.json`
      const filePath = path.join(__dirname, fileName)

      const formattedFAQs = this.formatForContentful(generatedFAQs)

      const output = {
        generatedAt: new Date().toISOString(),
        totalFAQs: formattedFAQs.length,
        metadata: {
          source: 'OpenAI GPT-4',
          basedOnSearchQueries: true,
          averageSessions: Math.round(generatedFAQs.reduce((sum, faq) => sum + faq.sessions, 0) / generatedFAQs.length)
        },
        faqs: formattedFAQs
      }

      fs.writeFileSync(filePath, JSON.stringify(output, null, 2))

      console.log(`\n✅ Generated FAQs saved to: ${filePath}`)
      console.log(`📊 Total FAQs: ${formattedFAQs.length}`)
      console.log(`🎯 High Priority: ${formattedFAQs.filter((f) => f.priority === 'high').length}`)
      console.log(`🎯 Medium Priority: ${formattedFAQs.filter((f) => f.priority === 'medium').length}`)
      console.log(`🎯 Low Priority: ${formattedFAQs.filter((f) => f.priority === 'low').length}`)

      return filePath
    } catch (error) {
      console.error('Error saving generated FAQs:', error.message)
      return null
    }
  }

  /**
   * Generate comprehensive FAQ improvement suggestions
   */
  async generateImprovementSuggestions(currentFAQs, searchData) {
    try {
      const prompt = `As ADMI's educational advisor, analyze the current FAQ performance and search data to provide actionable improvement suggestions.

CURRENT FAQ PERFORMANCE:
- Page Views: ${searchData.faqMetrics?.pageViews || 'N/A'}
- Users: ${searchData.faqMetrics?.users || 'N/A'}
- Bounce Rate: ${searchData.faqMetrics?.bounceRate || 'N/A'}%
- FAQ to Course Conversion: ${searchData.conversionData?.faqToCourseConversionRate || 'N/A'}%

TOP SEARCH QUERIES:
${searchData.searchQueries?.map((q) => `- "${q.query}" (${q.sessions} sessions, ${q.users} users)`).join('\n') || 'No search data available'}

Provide 5 specific, actionable recommendations to:
1. Improve FAQ content based on search intent
2. Increase FAQ to course conversion rate
3. Reduce bounce rate
4. Better address user needs
5. Optimize for search queries

Format as numbered list with specific implementation steps.`

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 600,
        temperature: 0.8
      })

      return response.choices[0].message.content.trim()
    } catch (error) {
      console.error('Error generating improvement suggestions:', error.message)
      return null
    }
  }
}

/**
 * Main execution function
 */
async function generateIntelligentFAQs() {
  try {
    console.log('🚀 Starting Intelligent FAQ Generation...\n')

    const generator = new IntelligentFAQGenerator()

    // Sample search queries (in production, fetch from analytics API)
    const topSearchQueries = [
      { query: 'admi music production course fees', sessions: 45, users: 38 },
      { query: 'film production diploma requirements', sessions: 32, users: 29 },
      { query: 'graphic design course duration', sessions: 28, users: 24 },
      { query: 'animation course job opportunities', sessions: 24, users: 21 },
      { query: 'digital marketing certificate salary', sessions: 19, users: 17 }
    ]

    // Generate FAQs for top search queries
    const generatedFAQs = await generator.generateTopSearchFAQs(topSearchQueries)

    // Save generated FAQs
    const savedFile = await generator.saveGeneratedFAQs(generatedFAQs)

    // Generate improvement suggestions
    const suggestions = await generator.generateImprovementSuggestions([], {
      faqMetrics: { pageViews: 2450, users: 1820, bounceRate: 42.3 },
      conversionData: { faqToCourseConversionRate: '37.0' },
      searchQueries: topSearchQueries
    })

    if (suggestions) {
      console.log('\n💡 FAQ Improvement Suggestions:')
      console.log(suggestions)
    }

    console.log('\n🎉 Intelligent FAQ generation completed!')
    console.log('\n📋 Next Steps:')
    console.log('1. Review generated FAQs in the saved file')
    console.log('2. Edit/customize responses as needed')
    console.log('3. Integrate approved FAQs into Contentful')
    console.log('4. Monitor performance improvements')

    return savedFile
  } catch (error) {
    console.error('❌ Error in FAQ generation process:', error.message)
    return null
  }
}

// CLI usage
if (require.main === module) {
  generateIntelligentFAQs()
    .then((result) => {
      if (result) {
        console.log(`\n✨ FAQs generated successfully: ${result}`)
        process.exit(0)
      } else {
        console.log('\n❌ Failed to generate FAQs')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('Fatal error:', error)
      process.exit(1)
    })
}

module.exports = IntelligentFAQGenerator
