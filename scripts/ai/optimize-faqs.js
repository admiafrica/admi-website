/* eslint-disable @typescript-eslint/no-var-requires */
const contentful = require('contentful-management')

require('dotenv').config()

/**
 * Optimize existing FAQs without OpenAI (fallback approach)
 * This analyzes current FAQs and suggests improvements
 */
async function analyzeFAQs() {
  try {
    console.log('🔍 Analyzing existing FAQs for optimization opportunities...')

    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID

    if (!managementToken || !spaceId) {
      console.error('❌ Missing Contentful credentials')
      process.exit(1)
    }

    const client = contentful.createClient({
      accessToken: managementToken
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment(process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master')

    // Get all FAQs
    const faqsResponse = await environment.getEntries({
      content_type: '2aEawNi41H2x8BXE8J2I9a',
      include: 2,
      limit: 1000
    })

    const faqs = faqsResponse.items
    console.log(`Found ${faqs.length} FAQs to analyze`)

    // Group by course
    const faqsByCourse = {}

    for (const faq of faqs) {
      const courseId = faq.fields.course?.['en-US']?.sys?.id
      const courseName = faq.fields.course?.['en-US']?.fields?.name?.['en-US']
      const question = faq.fields.question?.['en-US']
      const answer = extractTextFromRichText(faq.fields.answer?.['en-US'])

      if (!courseId || !courseName) continue

      if (!faqsByCourse[courseId]) {
        faqsByCourse[courseId] = {
          courseName,
          faqs: []
        }
      }

      faqsByCourse[courseId].faqs.push({
        id: faq.sys.id,
        question,
        answer,
        length: answer.length,
        wordCount: answer.split(' ').length
      })
    }

    // Analyze each course's FAQs
    console.log('\n📊 FAQ Analysis Report:')
    console.log('='.repeat(60))

    for (const [, courseData] of Object.entries(faqsByCourse)) {
      console.log(`\n🎯 ${courseData.courseName}`)
      console.log(`   Total FAQs: ${courseData.faqs.length}`)

      const avgLength = courseData.faqs.reduce((sum, faq) => sum + faq.length, 0) / courseData.faqs.length
      const avgWords = courseData.faqs.reduce((sum, faq) => sum + faq.wordCount, 0) / courseData.faqs.length

      console.log(`   Average answer length: ${Math.round(avgLength)} characters`)
      console.log(`   Average word count: ${Math.round(avgWords)} words`)

      // Check for short answers that could be expanded
      const shortAnswers = courseData.faqs.filter((faq) => faq.wordCount < 20)
      if (shortAnswers.length > 0) {
        console.log(`   ⚠️  ${shortAnswers.length} FAQs have short answers (< 20 words)`)
      }

      // Check for very long answers that might need splitting
      const longAnswers = courseData.faqs.filter((faq) => faq.wordCount > 100)
      if (longAnswers.length > 0) {
        console.log(`   📝 ${longAnswers.length} FAQs have long answers (> 100 words)`)
      }

      // Look for potential gaps in common questions
      const questions = courseData.faqs.map((faq) => faq.question.toLowerCase())
      const commonTopics = [
        'admission',
        'requirement',
        'fee',
        'cost',
        'salary',
        'career',
        'job',
        'duration',
        'schedule',
        'equipment',
        'software',
        'portfolio',
        'placement'
      ]

      const missingTopics = commonTopics.filter((topic) => !questions.some((q) => q.includes(topic)))

      if (missingTopics.length > 0) {
        console.log(`   🔍 Potential missing topics: ${missingTopics.join(', ')}`)
      }
    }

    console.log('\n💡 Optimization Recommendations:')
    console.log('1. Expand short answers with more specific details')
    console.log('2. Add FAQs for missing common topics')
    console.log('3. Include salary ranges and employment statistics')
    console.log('4. Add course-specific tool/software questions')
    console.log('5. Include industry-specific career path details')
  } catch (error) {
    console.error('❌ FAQ analysis failed:', error)
  }
}

/**
 * Extract plain text from Contentful rich text
 */
function extractTextFromRichText(richText) {
  if (!richText || !richText.content) return ''

  return richText.content
    .map((block) => {
      if (block.content) {
        return block.content.map((content) => content.value || '').join(' ')
      }
      return ''
    })
    .join(' ')
    .trim()
}

/**
 * Generate FAQ improvement suggestions based on patterns
 */
function generateImprovementSuggestions(courseSlug) {
  const suggestions = {
    'music-production-diploma': [
      {
        question: 'What salary can I expect after graduating from the Music Production Diploma?',
        answer:
          "Music Production Diploma graduates typically earn KES 60,000-150,000 monthly, with experienced producers and engineers earning significantly more. Freelance producers often exceed these ranges, especially when working with established artists. ADMI's strong industry connections help graduates secure well-paying positions in recording studios, radio stations, and with independent artists."
      },
      {
        question: 'Do I need my own equipment to study Music Production at ADMI?',
        answer:
          'No, ADMI provides all professional equipment including SSL AWS 948, Neve 8816, and API Legacy Plus consoles, plus Pro Tools HDX systems. However, having your own laptop and headphones is recommended for practice sessions and personal projects outside class hours.'
      }
    ],
    'digital-marketing-certificate': [
      {
        question: 'Which digital marketing certifications will I earn alongside my ADMI certificate?',
        answer:
          'The program prepares you for Google Ads certification, Google Analytics Individual Qualification, Facebook Blueprint certification, and HubSpot Content Marketing certification. These industry-recognized credentials significantly enhance your employability and earning potential in the digital marketing field.'
      }
    ]
  }

  return suggestions[courseSlug] || []
}

// Run analysis
if (require.main === module) {
  analyzeFAQs()
}

module.exports = {
  analyzeFAQs,
  generateImprovementSuggestions
}
