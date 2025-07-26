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
 * Create or update OpenAI Assistant with ADMI knowledge base
 */
async function createADMIAssistant() {
  try {
    console.log('🤖 Setting up ADMI FAQ Verification Assistant...')

    // First, upload knowledge base files
    const knowledgeFiles = await uploadKnowledgeBase()

    // Create or update the assistant
    const assistant = await openai.beta.assistants.create({
      name: 'ADMI FAQ Verification Assistant',
      description:
        'Verifies and improves FAQs for ADMI courses based on official course materials and institutional knowledge.',
      model: 'gpt-4o',
      tools: [{ type: 'file_search' }],
      tool_resources: {
        file_search: {
          vector_store_ids: knowledgeFiles.vectorStoreId ? [knowledgeFiles.vectorStoreId] : undefined
        }
      },
      instructions: `You are the official ADMI FAQ Verification Assistant. Your role is to verify, improve, and generate accurate FAQs for Africa Digital Media Institute courses.

CORE RESPONSIBILITIES:
1. Verify FAQ accuracy against official course materials
2. Improve FAQ content for clarity and completeness
3. Generate new FAQs based on common student inquiries
4. Ensure all information is current and accurate

ADMI CONTEXT:
- Africa Digital Media Institute (ADMI) - Kenya's leading creative education institution
- Located in Nairobi with state-of-the-art facilities
- Pearson-assured programs with international recognition
- Strong industry partnerships and high employment rates
- Programs: Diplomas (2 years) and Certificates (6 months)

VERIFICATION STANDARDS:
- Accuracy: All facts must be verifiable from knowledge base
- Completeness: Answers should be comprehensive but concise
- Relevance: Focus on prospective student decision-making factors
- Conversion: Highlight ADMI's unique value propositions
- Specificity: Include concrete details (fees, duration, equipment, careers)

RESPONSE FORMAT:
For verification: Provide accuracy score (1-10) and specific corrections needed
For improvement: Suggest enhanced version with reasoning
For generation: Create new FAQs based on knowledge base insights`
    })

    console.log(`✅ Assistant created: ${assistant.id}`)

    // Save assistant ID for future use
    const configPath = path.join(__dirname, 'assistant-config.json')
    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          assistantId: assistant.id,
          vectorStoreId: knowledgeFiles.vectorStoreId,
          createdAt: new Date().toISOString()
        },
        null,
        2
      )
    )

    return assistant.id
  } catch (error) {
    console.error('❌ Failed to create assistant:', error)
    throw error
  }
}

/**
 * Upload ADMI knowledge base files to OpenAI
 */
async function uploadKnowledgeBase() {
  try {
    console.log('📚 Uploading ADMI knowledge base...')

    // Create vector store for knowledge base
    const vectorStore = await openai.beta.vectorStores.create({
      name: 'ADMI Course Knowledge Base'
    })

    // Prepare knowledge base content
    const knowledgeContent = generateKnowledgeBase()

    // Write to temporary file
    const tempFilePath = path.join(__dirname, 'admi-knowledge-base.txt')
    fs.writeFileSync(tempFilePath, knowledgeContent)

    // Upload file to OpenAI
    const file = await openai.files.create({
      file: fs.createReadStream(tempFilePath),
      purpose: 'assistants'
    })

    // Add file to vector store
    await openai.beta.vectorStores.files.create(vectorStore.id, {
      file_id: file.id
    })

    // Clean up temp file
    fs.unlinkSync(tempFilePath)

    console.log(`✅ Knowledge base uploaded: ${file.id}`)

    return {
      fileId: file.id,
      vectorStoreId: vectorStore.id
    }
  } catch (error) {
    console.error('❌ Failed to upload knowledge base:', error)
    throw error
  }
}

/**
 * Generate comprehensive ADMI knowledge base content
 */
function generateKnowledgeBase() {
  return `
# ADMI - Africa Digital Media Institute Official Knowledge Base

## INSTITUTION OVERVIEW
- Name: Africa Digital Media Institute (ADMI)
- Location: Nairobi, Kenya
- Established: Leading creative education institution in East Africa
- Accreditation: Pearson-assured programs with international recognition
- Focus: Practical, hands-on creative education
- Industry Connections: Strong partnerships with major employers

## PROGRAM STRUCTURE
### Diplomas (2 years, Level 6)
- Duration: 2 academic years
- Level: Level 6 qualification
- Structure: Theoretical foundation + practical application
- Internship: Mandatory industry placement
- Portfolio: Professional portfolio development

### Certificates (6 months)
- Duration: 6 months intensive
- Level: Certificate level
- Structure: Practical skills focus
- Projects: Real-world project work
- Career Prep: Job placement assistance

## MUSIC PRODUCTION DIPLOMA
- Full Name: Diploma in Music Production
- Duration: 2 years
- Level: Level 6
- Fee: KES 145,000
- Credit Hours: 2,422
- Intakes: January, May, September
- Educational Level: Beginner (No prior knowledge needed)

### Equipment & Facilities:
- SSL AWS 948 console
- Neve 8816 console  
- API Legacy Plus console
- Pro Tools HDX systems
- Vintage analog gear
- Professional recording studios
- State-of-the-art production facilities

### Software Mastered:
- Pro Tools (primary DAW)
- Logic Pro X
- Ableton Live
- FL Studio
- Reaper

### Specialization Tracks (Year 2):
- Audio Engineering & Mixing
- Mastering & Post-Production
- Beat Production & Sound Design
- Live Sound Engineering

### Career Outcomes:
- Employment Rate: 85% within 6 months
- Salary Range: KES 60,000-150,000 monthly
- Career Paths: Recording Engineer, Mixing Engineer, Beat Producer, Sound Designer, Live Sound Engineer, Studio Owner
- Industry Focus: African music production, global standards

### Learning Outcomes:
- Master industry-standard DAWs and production software
- Develop audio recording, mixing, and mastering skills
- Gain expertise in music composition and arrangement
- Build proficiency in sound design and synthesis
- Learn advanced studio techniques and live sound production
- Understand music industry business aspects
- Cultivate critical listening skills
- Develop professional portfolio

## DIGITAL MARKETING CERTIFICATE
- Full Name: Digital Marketing Certificate
- Duration: 6 months
- Fee: KES 85,000
- Intakes: Monthly
- Educational Level: Beginner to Intermediate

### Tools & Platforms:
- Google Ads
- Facebook Business Manager
- Instagram for Business
- LinkedIn Campaign Manager
- Google Analytics 4
- SEMrush
- Hootsuite
- Mailchimp
- Canva
- WordPress

### Specializations:
- Social Media Marketing
- Search Engine Marketing (SEM/SEO)
- Content Marketing
- E-commerce Marketing

### Certifications Prepared For:
- Google Ads certification
- Google Analytics Individual Qualification
- Facebook Blueprint certification
- HubSpot Content Marketing certification

### Career Outcomes:
- Employment Rate: 75% within 3 months
- Salary Range: KES 40,000-100,000 monthly
- Career Paths: Digital Marketing Specialist, Social Media Manager, SEO Specialist, Content Marketing Manager

## GRAPHIC DESIGN CERTIFICATE
- Full Name: Graphic Design Certificate
- Duration: 6 months
- Fee: KES 75,000
- Accreditation: Pearson-assured program
- Facilities: Mac workstations, Wacom tablets, large format printers

### Software Mastered:
- Adobe Creative Cloud (Photoshop, Illustrator, InDesign, After Effects, XD)
- Figma (UI/UX design)
- Procreate (digital illustration)
- Cinema 4D (3D design)

### Specializations:
- Brand Design
- UI/UX Design
- Print Design
- Digital Illustration

### Portfolio Projects: 15-20 professional projects including:
- Brand identities
- Packaging designs
- Digital campaigns
- Publication layouts

## VIDEO PRODUCTION CERTIFICATE
- Duration: 6 months
- Equipment: Sony FX6, Canon C70, Blackmagic URSA, professional lighting, audio equipment
- Software: Adobe Premiere Pro, After Effects, DaVinci Resolve, Pro Tools
- Focus: YouTube content, social media video, commercial production

## ADMISSION REQUIREMENTS
### General Requirements:
- Minimum KCSE C (plain) or equivalent
- Passion for creative field
- Basic English proficiency
- Portfolio review (for some programs)

### Application Process:
1. Online application submission
2. Document verification
3. Portfolio review (where applicable)
4. Interview (for diploma programs)
5. Fee payment and enrollment

## FINANCIAL INFORMATION
### Payment Options:
- Full payment discount available
- Installment plans offered
- Scholarship opportunities
- Student loan partnerships

### Additional Costs:
- Registration fee
- Materials and equipment (minimal - most provided)
- Industry certification exam fees (optional)

## STUDENT SUPPORT SERVICES
- Academic counseling
- Career guidance
- Industry mentorship
- Job placement assistance
- Alumni network access
- Internship coordination

## FACILITIES
- Professional recording studios
- Video production suites
- Computer labs with latest software
- Design studios
- Industry-standard equipment
- Library and study spaces

## INDUSTRY PARTNERSHIPS
- Major employers in creative industries
- Internship placement partners
- Guest lecturer network
- Equipment manufacturer relationships
- Alumni employer network

## CONTACT INFORMATION
- Location: Nairobi, Kenya
- Website: admi.africa
- Application Portal: Available online
- Admissions WhatsApp: +254 706 349696
`
}

/**
 * Verify FAQ accuracy using the assistant
 */
async function verifyFAQWithAssistant(assistantId, question, answer, courseContext) {
  try {
    // Create a thread for this verification
    const thread = await openai.beta.threads.create()

    // Send verification request
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `Please verify this FAQ for accuracy and suggest improvements:

COURSE: ${courseContext}
QUESTION: ${question}
ANSWER: ${answer}

Please provide:
1. Accuracy score (1-10)
2. Factual corrections needed
3. Improved version of the answer
4. Additional details that should be included`
    })

    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    })

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)

    while (runStatus.status !== 'completed') {
      if (runStatus.status === 'failed') {
        throw new Error('Assistant run failed')
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }

    // Get the response
    const messages = await openai.beta.threads.messages.list(thread.id)
    const assistantResponse = messages.data[0].content[0].text.value

    return {
      originalQuestion: question,
      originalAnswer: answer,
      verification: assistantResponse,
      threadId: thread.id
    }
  } catch (error) {
    console.error('Error verifying FAQ:', error)
    return null
  }
}

/**
 * Process all FAQs in Contentful for verification
 */
async function verifyAllFAQs() {
  try {
    console.log('🔍 Starting FAQ verification process...')

    // Load or create assistant
    const configPath = path.join(__dirname, 'assistant-config.json')
    let assistantId

    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      assistantId = config.assistantId
      console.log(`📋 Using existing assistant: ${assistantId}`)
    } else {
      assistantId = await createADMIAssistant()
    }

    // Get Contentful FAQs
    const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN
    const spaceId = process.env.ADMI_CONTENTFUL_SPACE_ID

    if (!managementToken || !spaceId) {
      console.error('❌ Missing Contentful credentials')
      return
    }

    const client = contentful.createClient({
      accessToken: managementToken
    })

    const space = await client.getSpace(spaceId)
    const environment = await space.getEnvironment(process.env.ADMI_CONTENTFUL_ENVIRONMENT || 'master')

    // Get all FAQs with course information
    const faqsResponse = await environment.getEntries({
      content_type: '2aEawNi41H2x8BXE8J2I9a',
      include: 2,
      limit: 100
    })

    console.log(`Found ${faqsResponse.items.length} FAQs to verify`)

    const verificationResults = []

    for (const faq of faqsResponse.items) {
      const question = faq.fields.question?.['en-US']
      const answer = extractTextFromRichText(faq.fields.answer?.['en-US'])
      const courseName = faq.fields.course?.['en-US']?.fields?.name?.['en-US']

      if (!question || !answer || !courseName) continue

      console.log(`\n🔍 Verifying: ${question.substring(0, 60)}...`)

      const verification = await verifyFAQWithAssistant(assistantId, question, answer, courseName)

      if (verification) {
        verificationResults.push({
          faqId: faq.sys.id,
          courseName,
          ...verification
        })
        console.log('✅ Verification completed')
      } else {
        console.log('❌ Verification failed')
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    // Save verification results
    const resultsPath = path.join(__dirname, 'faq-verification-results.json')
    fs.writeFileSync(resultsPath, JSON.stringify(verificationResults, null, 2))

    console.log(`\n📊 Verification completed! Results saved to: ${resultsPath}`)
    console.log(`Total FAQs verified: ${verificationResults.length}`)

    return verificationResults
  } catch (error) {
    console.error('❌ FAQ verification failed:', error)
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

// Usage examples:
// node scripts/ai/assistant-faq-verification.js setup    # Create assistant
// node scripts/ai/assistant-faq-verification.js verify   # Verify all FAQs

async function main() {
  const command = process.argv[2]

  switch (command) {
    case 'setup':
      await createADMIAssistant()
      break
    case 'verify':
      await verifyAllFAQs()
      break
    default:
      console.log('Usage: node assistant-faq-verification.js [setup|verify]')
  }
}

if (require.main === module) {
  main()
}

module.exports = {
  createADMIAssistant,
  verifyFAQWithAssistant,
  verifyAllFAQs
}
