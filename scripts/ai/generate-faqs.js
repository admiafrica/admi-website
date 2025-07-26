/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAI = require('openai')
const contentful = require('contentful-management')

require('dotenv').config()

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY || process.env.OPENAI_API_KEY
})

// Course-specific context templates
const COURSE_CONTEXTS = {
  'music-production-diploma': {
    industry: 'Music Production',
    level: 'Diploma (2 years)',
    equipment: 'SSL, Neve, API consoles, Pro Tools HDX, vintage analog gear',
    specializations: 'Audio Engineering, Mixing, Mastering, Beat Production, Live Sound',
    market: 'African music industry, global music production',
    careers: 'Recording Engineer, Mixing Engineer, Beat Producer, Studio Owner'
  },
  'digital-marketing-certificate': {
    industry: 'Digital Marketing',
    level: 'Certificate (6 months)',
    tools: 'Google Ads, Facebook Business Manager, Google Analytics, SEMrush',
    specializations: 'Social Media Marketing, SEM/SEO, Content Marketing, E-commerce',
    market: 'Kenyan digital landscape, East African markets',
    careers: 'Digital Marketing Specialist, Social Media Manager, SEO Specialist'
  },
  'graphic-design-certificate': {
    industry: 'Graphic Design',
    level: 'Certificate (6 months)',
    tools: 'Adobe Creative Cloud, Figma, Procreate, Cinema 4D',
    specializations: 'Brand Design, UI/UX Design, Print Design, Digital Illustration',
    market: 'African design aesthetics, global design standards',
    careers: 'Graphic Designer, UI/UX Designer, Brand Designer, Freelance Designer'
  }
}

/**
 * Generate FAQ prompts for OpenAI based on course context
 */
function createFAQPrompt(courseSlug, courseData, context) {
  return `You are an expert educational consultant for Africa Digital Media Institute (ADMI), a leading creative education institution in Kenya. Generate 8-10 comprehensive, specific FAQs for the ${courseData.name} program.

COURSE CONTEXT:
- Program: ${courseData.name}
- Level: ${context.level}
- Industry: ${context.industry}
- Duration: ${courseData.duration || 'Variable'}
- Fee: ${courseData.tuitionFees || 'Contact for pricing'}
- Award Level: ${courseData.awardLevel}
- Educational Level: ${courseData.educationalLevel}

PROGRAM DETAILS:
- Tools/Equipment: ${context.tools || context.equipment}
- Specializations: ${context.specializations}
- Target Market: ${context.market}
- Career Paths: ${context.careers}

REQUIREMENTS:
1. Focus on prospective student concerns and decision-making factors
2. Include specific details about ADMI's unique advantages
3. Address practical questions about career outcomes and industry relevance
4. Cover admission requirements, curriculum depth, and hands-on experience
5. Mention African market context and global standards
6. Include salary expectations and employment rates where relevant
7. Address portfolio building and industry connections

FORMAT: Return a JSON array of objects with "question" and "answer" fields.
Each answer should be 2-3 sentences, informative, and conversion-focused.

Example question types to include:
- What makes ADMI's [program] different from other schools?
- What specific [tools/software/equipment] will I master?
- How does this program prepare me for the [African/Kenyan] market?
- What career opportunities and salary ranges can I expect?
- What real projects will I work on during the program?
- How strong is the industry connection and job placement support?

Generate FAQs now:`
}

/**
 * Generate FAQs using OpenAI
 */
async function generateFAQsWithAI(courseSlug, courseData) {
  const context = COURSE_CONTEXTS[courseSlug]

  if (!context) {
    console.log(`⚠️  No context template found for ${courseSlug}, using generic approach`)
    return generateGenericFAQs(courseSlug, courseData)
  }

  try {
    console.log(`🤖 Generating AI-powered FAQs for ${courseSlug}...`)

    const prompt = createFAQPrompt(courseSlug, courseData, context)

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            "You are an expert educational content creator specializing in African creative education. Always provide accurate, helpful, and conversion-focused responses that highlight ADMI's unique value proposition."
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

    // Parse the JSON response
    let faqs
    try {
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        faqs = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON array found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError)
      console.log('Raw response:', response)
      return []
    }

    console.log(`✅ Generated ${faqs.length} FAQs for ${courseSlug}`)
    return faqs
  } catch (error) {
    console.error(`Error generating FAQs for ${courseSlug}:`, error)
    return []
  }
}

/**
 * Fallback generic FAQ generation
 */
async function generateGenericFAQs(courseSlug, courseData) {
  const genericPrompt = `Generate 6-8 FAQs for ${courseData.name} at ADMI Kenya. Focus on:
- Admission requirements
- Career prospects
- Course content
- Industry relevance
- Portfolio building
- Fee structure

Return as JSON array with question/answer objects.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: genericPrompt }],
      temperature: 0.7,
      max_tokens: 2000
    })

    const response = completion.choices[0].message.content
    const jsonMatch = response.match(/\[[\s\S]*\]/)

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    return []
  } catch (error) {
    console.error('Error in generic FAQ generation:', error)
    return []
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
 * Main function to generate and upload FAQs
 */
async function generateAndUploadFAQs() {
  try {
    console.log('🚀 Starting AI-powered FAQ generation...')

    // Check required environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY is required')
      process.exit(1)
    }

    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID

    if (!managementToken || !spaceId) {
      console.error('❌ Missing Contentful credentials')
      process.exit(1)
    }

    // Initialize Contentful
    const client = contentful.createClient({
      accessToken: managementToken
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment(process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master')

    // Get all courses
    console.log('📚 Fetching courses from Contentful...')
    const coursesResponse = await environment.getEntries({
      content_type: 'course',
      limit: 100
    })

    const courses = coursesResponse.items
    console.log(`Found ${courses.length} courses`)

    // Process each course (or specific courses)
    const targetCourses = process.argv[2] ? [process.argv[2]] : null

    for (const course of courses) {
      const courseSlug = course.fields.slug?.['en-US']
      const courseName = course.fields.name?.['en-US']

      if (!courseSlug || !courseName) continue

      // Filter to specific courses if provided
      if (targetCourses && !targetCourses.includes(courseSlug)) continue

      console.log(`\n🎯 Processing ${courseName} (${courseSlug})...`)

      // Extract course data for AI context
      const courseData = {
        name: courseName,
        awardLevel: course.fields.awardLevel?.['en-US'],
        tuitionFees: course.fields.tuitionFees?.['en-US'],
        educationalLevel: course.fields.educationalLevel?.['en-US'],
        duration: course.fields.programType?.['en-US']?.fields?.duration
      }

      // Generate FAQs with AI
      const generatedFAQs = await generateFAQsWithAI(courseSlug, courseData)

      if (generatedFAQs.length === 0) {
        console.log(`⚠️  No FAQs generated for ${courseSlug}`)
        continue
      }

      // Remove existing FAQs
      console.log('🗑️  Removing existing FAQs...')
      const existingFAQs = await environment.getEntries({
        content_type: '2aEawNi41H2x8BXE8J2I9a',
        'fields.course.sys.id': course.sys.id
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

      // Create new AI-generated FAQs
      console.log(`📝 Creating ${generatedFAQs.length} AI-generated FAQs...`)

      for (let i = 0; i < generatedFAQs.length; i++) {
        const faq = generatedFAQs[i]

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
                    id: course.sys.id
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

      console.log(`✅ Completed ${courseSlug} - ${generatedFAQs.length} AI FAQs created`)
    }

    console.log('\n🎉 AI-powered FAQ generation completed!')
  } catch (error) {
    console.error('❌ FAQ generation failed:', error)
    process.exit(1)
  }
}

// Usage examples in comments:
// node scripts/ai/generate-faqs.js                    # Generate for all courses
// node scripts/ai/generate-faqs.js music-production-diploma  # Generate for specific course

// Run the script
if (require.main === module) {
  generateAndUploadFAQs()
}

module.exports = {
  generateFAQsWithAI,
  generateAndUploadFAQs
}
