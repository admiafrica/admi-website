/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAI = require('openai')
const contentful = require('contentful-management')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY || process.env.OPENAI_API_KEY
})

/**
 * Generate new verified FAQs for a specific course
 */
async function generateVerifiedFAQs(courseSlug, assistantId) {
  try {
    console.log(`🎯 Generating verified FAQs for: ${courseSlug}`)

    // Get course information from Contentful
    const courseInfo = await getCourseInfo(courseSlug)
    if (!courseInfo) {
      console.error(`❌ Course not found: ${courseSlug}`)
      return []
    }

    // Create thread for FAQ generation
    const thread = await openai.beta.threads.create()

    // Request FAQ generation
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `Generate 8-10 comprehensive FAQs for the ${courseInfo.name} program.

COURSE DETAILS:
- Name: ${courseInfo.name}
- Duration: ${courseInfo.duration}
- Fee: ${courseInfo.fee}
- Level: ${courseInfo.awardLevel}
- Educational Level: ${courseInfo.educationalLevel}

REQUIREMENTS:
1. Focus on prospective student decision-making factors
2. Include specific ADMI advantages and unique selling points
3. Address practical concerns (costs, career outcomes, requirements)
4. Ensure all facts are accurate based on knowledge base
5. Make answers conversion-focused but informative

Return in this format:
QUESTION: [Clear, specific question]
ANSWER: [2-3 sentence comprehensive answer with specific details]

Generate FAQs covering these areas:
- Program uniqueness and ADMI advantages
- Career outcomes and salary expectations
- Tools/equipment/software covered
- Admission requirements and process
- Course structure and hands-on experience
- Industry connections and job placement
- Specialization options
- Portfolio development`
    })

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    })

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)

    while (runStatus.status !== 'completed') {
      if (runStatus.status === 'failed') {
        throw new Error('Assistant run failed: ' + runStatus.last_error?.message)
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }

    // Get the response
    const messages = await openai.beta.threads.messages.list(thread.id)
    const assistantResponse = messages.data[0].content[0].text.value

    // Parse FAQs from response
    const faqs = parseFAQsFromResponse(assistantResponse)

    console.log(`✅ Generated ${faqs.length} verified FAQs`)
    return faqs
  } catch (error) {
    console.error('Error generating FAQs:', error)
    return []
  }
}

/**
 * Parse FAQs from assistant response
 */
function parseFAQsFromResponse(response) {
  const faqs = []
  const lines = response.split('\n')

  let currentFAQ = null

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('QUESTION:')) {
      if (currentFAQ && currentFAQ.question && currentFAQ.answer) {
        faqs.push(currentFAQ)
      }
      currentFAQ = {
        question: trimmed.replace('QUESTION:', '').trim(),
        answer: ''
      }
    } else if (trimmed.startsWith('ANSWER:')) {
      if (currentFAQ) {
        currentFAQ.answer = trimmed.replace('ANSWER:', '').trim()
      }
    } else if (currentFAQ && currentFAQ.answer && trimmed) {
      // Continue answer on next line
      currentFAQ.answer += ' ' + trimmed
    }
  }

  // Add the last FAQ
  if (currentFAQ && currentFAQ.question && currentFAQ.answer) {
    faqs.push(currentFAQ)
  }

  return faqs.filter((faq) => faq.question && faq.answer)
}

/**
 * Get course information from Contentful
 */
async function getCourseInfo(courseSlug) {
  try {
    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID

    const client = contentful.createClient({
      accessToken: managementToken
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment(process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master')

    const coursesResponse = await environment.getEntries({
      content_type: 'course',
      'fields.slug': courseSlug,
      include: 2
    })

    if (coursesResponse.items.length === 0) {
      return null
    }

    const course = coursesResponse.items[0]

    return {
      name: course.fields.name?.['en-US'],
      slug: courseSlug,
      awardLevel: course.fields.awardLevel?.['en-US'],
      fee: course.fields.tuitionFees?.['en-US'],
      educationalLevel: course.fields.educationalLevel?.['en-US'],
      duration: course.fields.programType?.['en-US']?.fields?.duration,
      sys: course.sys
    }
  } catch (error) {
    console.error('Error fetching course info:', error)
    return null
  }
}

/**
 * Update FAQs in Contentful with verified content
 */
async function updateFAQsInContentful(courseSlug, faqs) {
  try {
    console.log(`📝 Updating FAQs in Contentful for: ${courseSlug}`)

    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID

    const client = contentful.createClient({
      accessToken: managementToken
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment(process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master')

    // Get course
    const courseInfo = await getCourseInfo(courseSlug)
    if (!courseInfo) {
      console.error(`❌ Course not found: ${courseSlug}`)
      return
    }

    // Remove existing FAQs
    console.log('🗑️  Removing existing FAQs...')
    const existingFAQs = await environment.getEntries({
      content_type: '2aEawNi41H2x8BXE8J2I9a',
      'fields.course.sys.id': courseInfo.sys.id
    })

    for (const faq of existingFAQs.items) {
      try {
        if (faq.isPublished()) {
          await faq.unpublish()
        }
        await faq.delete()
      } catch (error) {
        console.log(`   Warning: Could not delete FAQ ${faq.sys.id}`)
      }
    }

    // Create new verified FAQs
    console.log(`📝 Creating ${faqs.length} verified FAQs...`)

    for (let i = 0; i < faqs.length; i++) {
      const faq = faqs[i]

      try {
        const faqEntry = await environment.createEntry('2aEawNi41H2x8BXE8J2I9a', {
          fields: {
            question: {
              'en-US': faq.question
            },
            answer: {
              'en-US': createRichTextFromPlainText(faq.answer)
            },
            course: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: courseInfo.sys.id
                }
              }
            },
            displayOrder: {
              'en-US': i + 1
            }
          }
        })

        await faqEntry.publish()
        console.log(`   ✅ Created: ${faq.question.substring(0, 60)}...`)
      } catch (error) {
        console.error(`   ❌ Failed to create FAQ: ${faq.question.substring(0, 50)}...`)
        console.error(`      Error: ${error.message}`)
      }
    }

    console.log(`✅ Successfully updated FAQs for ${courseSlug}`)
  } catch (error) {
    console.error('Error updating FAQs in Contentful:', error)
  }
}

/**
 * Convert plain text to Contentful rich text format
 */
function createRichTextFromPlainText(text) {
  return {
    nodeType: 'document',
    data: {},
    content: [
      {
        nodeType: 'paragraph',
        data: {},
        content: [
          {
            nodeType: 'text',
            value: text,
            marks: [],
            data: {}
          }
        ]
      }
    ]
  }
}

/**
 * Main function to regenerate verified FAQs for a course
 */
async function regenerateFAQs(courseSlug) {
  try {
    console.log(`🚀 Starting verified FAQ regeneration for: ${courseSlug}`)

    // Load assistant configuration
    const configPath = path.join(__dirname, 'assistant-config.json')

    if (!fs.existsSync(configPath)) {
      console.error('❌ Assistant not configured. Run setup first.')
      console.log('   npm run setup-assistant')
      return
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    const assistantId = config.assistantId

    // Generate verified FAQs
    const faqs = await generateVerifiedFAQs(courseSlug, assistantId)

    if (faqs.length === 0) {
      console.error('❌ No FAQs generated')
      return
    }

    // Save to file for review
    const outputPath = path.join(__dirname, `generated-faqs-${courseSlug}.json`)
    fs.writeFileSync(outputPath, JSON.stringify(faqs, null, 2))
    console.log(`📄 FAQs saved to: ${outputPath}`)

    // Ask for confirmation before updating Contentful
    console.log('\n📋 Generated FAQs:')
    faqs.forEach((faq, index) => {
      console.log(`\n${index + 1}. ${faq.question}`)
      console.log(`   ${faq.answer}`)
    })

    const confirm = process.argv.includes('--auto-update')

    if (confirm) {
      await updateFAQsInContentful(courseSlug, faqs)
      console.log('\n🎉 FAQs successfully regenerated and updated!')
    } else {
      console.log('\n💡 To update Contentful, run with --auto-update flag')
      console.log(`   node scripts/ai/assistant-faq-manager.js ${courseSlug} --auto-update`)
    }
  } catch (error) {
    console.error('❌ FAQ regeneration failed:', error)
  }
}

// Usage examples:
// node scripts/ai/assistant-faq-manager.js music-production-diploma
// node scripts/ai/assistant-faq-manager.js digital-marketing-certificate --auto-update

async function main() {
  const courseSlug = process.argv[2]

  if (!courseSlug) {
    console.log('Usage: node assistant-faq-manager.js <course-slug> [--auto-update]')
    console.log('Examples:')
    console.log('  node assistant-faq-manager.js music-production-diploma')
    console.log('  node assistant-faq-manager.js digital-marketing-certificate --auto-update')
    return
  }

  await regenerateFAQs(courseSlug)
}

if (require.main === module) {
  main()
}

module.exports = {
  generateVerifiedFAQs,
  updateFAQsInContentful,
  regenerateFAQs
}
