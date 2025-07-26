/* eslint-disable @typescript-eslint/no-var-requires */
const OpenAI = require('openai')
const contentful = require('contentful-management')

require('dotenv').config()

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY || process.env.OPENAI_API_KEY
})

// ADMI Knowledge Base (embedded in script for simplicity)
const ADMI_KNOWLEDGE = `
# ADMI - Africa Digital Media Institute Knowledge Base

## MUSIC PRODUCTION DIPLOMA
- Duration: 2 years
- Level: Level 6 Diploma
- Fee: KES 145,000
- Intakes: January, May, September
- Equipment: SSL AWS 948, Neve 8816, API Legacy Plus console, Pro Tools HDX
- Software: Pro Tools, Logic Pro X, Ableton Live, FL Studio, Reaper
- Specializations: Audio Engineering, Mixing, Mastering, Beat Production, Live Sound
- Career Salary: KES 60,000-150,000 monthly
- Employment Rate: 85% within 6 months
- Career Paths: Recording Engineer, Mixing Engineer, Beat Producer, Sound Designer

## DIGITAL MARKETING CERTIFICATE
- Duration: 6 months
- Fee: KES 85,000
- Tools: Google Ads, Facebook Business Manager, Google Analytics, SEMrush
- Specializations: Social Media Marketing, SEM/SEO, Content Marketing
- Certifications: Google Ads, Google Analytics, Facebook Blueprint, HubSpot
- Career Salary: KES 40,000-100,000 monthly
- Employment Rate: 75% within 3 months

## GRAPHIC DESIGN CERTIFICATE
- Duration: 6 months
- Fee: KES 75,000
- Software: Adobe Creative Cloud, Figma, Procreate, Cinema 4D
- Facilities: Mac workstations, Wacom tablets, large format printers
- Specializations: Brand Design, UI/UX Design, Print Design
- Portfolio: 15-20 professional projects

## INSTITUTION INFO
- Location: Nairobi, Kenya
- Accreditation: Pearson-assured programs
- Focus: Practical, hands-on creative education
- Industry Connections: Strong partnerships with major employers
- Facilities: Professional studios, state-of-the-art equipment
`

/**
 * Generate FAQs using OpenAI Chat Completions
 */
async function generateFAQsForCourse(courseSlug) {
  try {
    console.log(`🤖 Generating FAQs for: ${courseSlug}`)

    const courseInfo = await getCourseInfo(courseSlug)
    if (!courseInfo) {
      console.error(`❌ Course not found: ${courseSlug}`)
      return []
    }

    const prompt = `You are an expert FAQ generator for ADMI (Africa Digital Media Institute). Generate 8-10 comprehensive FAQs for the ${courseInfo.name} program.

COURSE CONTEXT:
${ADMI_KNOWLEDGE}

SPECIFIC COURSE: ${courseInfo.name}
- Duration: ${courseInfo.duration || 'Variable'}
- Fee: ${courseInfo.fee || 'Contact for pricing'}
- Level: ${courseInfo.awardLevel}

REQUIREMENTS:
1. Focus on prospective student decision-making factors
2. Include specific ADMI advantages and unique selling points
3. Address practical concerns (costs, career outcomes, requirements)
4. Make answers conversion-focused but informative (2-3 sentences each)
5. Include concrete details (equipment, software, salary ranges)

Generate FAQs covering:
- Program uniqueness and ADMI advantages
- Career outcomes and salary expectations
- Tools/equipment/software mastered
- Admission requirements and process
- Course structure and hands-on experience
- Industry connections and job placement
- Specialization options available
- Portfolio development

Return ONLY a JSON array in this exact format:
[
  {
    "question": "Clear, specific question here",
    "answer": "Comprehensive 2-3 sentence answer with specific details"
  }
]`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert educational content creator for ADMI. Always provide accurate, helpful, and conversion-focused responses in valid JSON format.'
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
    let faqs
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        faqs = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON array found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      console.log('Raw response:', response)
      return []
    }

    console.log(`✅ Generated ${faqs.length} FAQs`)
    return faqs
  } catch (error) {
    console.error('Error generating FAQs:', error)
    return []
  }
}

/**
 * Get course information from Contentful
 */
async function getCourseInfo(courseSlug) {
  try {
    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID

    if (!managementToken || !spaceId) {
      console.error('❌ Missing Contentful credentials')
      return null
    }

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
 * Update FAQs in Contentful
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
        console.log(`   Deleted: ${faq.fields.question?.['en-US']?.substring(0, 50)}...`)
      } catch (error) {
        console.log(`   Warning: Could not delete FAQ ${faq.sys.id}`)
      }
    }

    // Create new FAQs
    console.log(`📝 Creating ${faqs.length} new FAQs...`)

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
 * Main function
 */
async function main() {
  const courseSlug = process.argv[2]
  const autoUpdate = process.argv.includes('--update')

  if (!courseSlug) {
    console.log('Usage: node simple-faq-generator.js <course-slug> [--update]')
    console.log('Examples:')
    console.log('  node simple-faq-generator.js music-production-diploma')
    console.log('  node simple-faq-generator.js digital-marketing-certificate --update')
    return
  }

  if (!process.env.NEXT_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
    console.error('❌ NEXT_OPENAI_API_KEY or OPENAI_API_KEY environment variable is required')
    return
  }

  try {
    console.log(`🚀 Starting AI FAQ generation for: ${courseSlug}`)

    // Generate FAQs
    const faqs = await generateFAQsForCourse(courseSlug)

    if (faqs.length === 0) {
      console.error('❌ No FAQs generated')
      return
    }

    // Save to file for review
    const fs = require('fs')
    const path = require('path')
    const outputPath = path.join(__dirname, `generated-faqs-${courseSlug}.json`)
    fs.writeFileSync(outputPath, JSON.stringify(faqs, null, 2))
    console.log(`📄 FAQs saved to: ${outputPath}`)

    // Display generated FAQs
    console.log('\n📋 Generated FAQs:')
    faqs.forEach((faq, index) => {
      console.log(`\n${index + 1}. ${faq.question}`)
      console.log(`   ${faq.answer}`)
    })

    if (autoUpdate) {
      await updateFAQsInContentful(courseSlug, faqs)
      console.log('\n🎉 FAQs successfully generated and updated in Contentful!')
    } else {
      console.log('\n💡 To update Contentful, run with --update flag')
      console.log(`   node scripts/ai/simple-faq-generator.js ${courseSlug} --update`)
    }
  } catch (error) {
    console.error('❌ FAQ generation failed:', error)
  }
}

if (require.main === module) {
  main()
}

module.exports = {
  generateFAQsForCourse,
  updateFAQsInContentful
}
