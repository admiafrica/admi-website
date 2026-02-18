import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY || process.env.OPENAI_API_KEY
})

// Course knowledge base
const COURSE_KNOWLEDGE = {
  'music-production-diploma': {
    name: 'Music Production Diploma',
    duration: '2 years',
    level: 'Level 6 Diploma',
    fee: 'KES 145,000',
    equipment: 'SSL AWS 948, Neve 8816, API Legacy Plus console, Pro Tools HDX',
    specializations: 'Audio Engineering, Mixing, Mastering, Beat Production, Live Sound',
    careerSalary: 'KES 60,000-150,000 monthly',
    intakes: 'January, May, September',
    placement: '85% employment rate within 6 months'
  },
  'digital-marketing-certificate': {
    name: 'Digital Marketing Certificate',
    duration: '6 months',
    level: 'Certificate',
    fee: 'KES 85,000',
    tools: 'Google Ads, Facebook Business Manager, Google Analytics, SEMrush',
    specializations: 'Social Media Marketing, SEM/SEO, Content Marketing',
    careerSalary: 'KES 40,000-100,000 monthly',
    intakes: 'Monthly intakes',
    placement: '75% employment rate within 3 months'
  }
  // Add more courses as needed
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { question, courseSlug } = req.body

  if (!question) {
    return res.status(400).json({ message: 'Question is required' })
  }

  if (!process.env.NEXT_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
    return res.status(500).json({ message: 'OpenAI API key not configured' })
  }

  try {
    const courseData = COURSE_KNOWLEDGE[courseSlug as keyof typeof COURSE_KNOWLEDGE]

    const systemPrompt = `You are Hawi, ADMI's helpful digital assistant. You help prospective students learn about ADMI's programs.

ADMI CONTEXT:
- Africa Digital Media Institute is Kenya's leading creative education institution
- Woolf University accredited and TVETA Kenya registered programs with international recognition
- Located in Nairobi with state-of-the-art facilities
- Strong industry connections and high employment rates
- Focus on practical, hands-on learning

${
  courseData
    ? `
CURRENT COURSE: ${courseData.name}
- Duration: ${courseData.duration}
- Level: ${courseData.level}
- Fee: ${courseData.fee}
- Tools/Equipment: ${(courseData as any).tools || (courseData as any).equipment}
- Career Salary Range: ${courseData.careerSalary}
- Intakes: ${courseData.intakes}
- Job Placement: ${courseData.placement}
`
    : ''
}

INSTRUCTIONS:
1. Answer questions about ADMI programs, admissions, careers, and student life
2. Be encouraging and highlight ADMI's unique advantages
3. If you don't know specific details, suggest contacting admissions
4. Keep responses concise (2-3 sentences) but informative
5. Always maintain a helpful, professional tone
6. For course-specific questions, focus on the current course context
7. Include practical next steps when appropriate (apply, visit, contact)

RESPONSE FORMAT: Provide direct, helpful answers that address the student's concern while showcasing ADMI's value.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    })

    const answer = completion.choices[0].message.content?.trim()

    // Log the interaction for analytics
    console.log(`FAQ Assistant - Course: ${courseSlug}, Question: ${question.substring(0, 100)}...`)

    res.status(200).json({
      question,
      answer,
      courseSlug,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('FAQ Assistant error:', error)
    res.status(500).json({
      message: 'Sorry, I encountered an error. Please try again or contact admissions for help.',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    })
  }
}
