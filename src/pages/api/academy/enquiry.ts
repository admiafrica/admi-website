import type { NextApiRequest, NextApiResponse } from 'next'

type Payload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  company?: string
  program: string
  programTitle?: string
  timeline: string
  goals: string
  questions?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    role,
    company = '',
    program,
    programTitle,
    timeline,
    goals,
    questions = '',
    utm_source = 'direct',
    utm_medium = 'none',
    utm_campaign = 'organic',
    utm_term = '',
    utm_content = ''
  }: Payload = req.body

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !program ||
    !timeline ||
    !goals ||
    !role
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  const API_KEY = process.env.BREVO_API_KEY as string
  if (!API_KEY) {
    console.error('Missing Brevo API key')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const programName = programTitle || program
  const summary = `Role: ${role} | Company: ${company || 'N/A'} | Timeline: ${timeline} | Goal: ${goals} | Note: ${questions || 'N/A'}`

  const contactPayload = {
    email: email.trim(),
    attributes: {
      FIRSTNAME: firstName.trim(),
      LASTNAME: lastName.trim(),
      SMS: phone.trim(),
      COURSE_INTERESTED_IN: `AI Academy - ${programName}`,
      PREFERRED_COURSE: `AI Academy - ${programName}`,
      CONVERSATION_SUMMARY: summary,
      UTM_SOURCE: utm_source,
      UTM_MEDIUM: utm_medium,
      UTM_CAMPAIGN: utm_campaign,
      UTM_TERM: utm_term,
      UTM_CONTENT: utm_content
    },
    listIds: [2],
    updateEnabled: true
  }

  try {
    const createContactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactPayload)
    })

    if (!createContactResponse.ok) {
      const errorData = await createContactResponse.json()
      console.error('Brevo academy enquiry failed:', errorData)
      return res.status(createContactResponse.status).json({ error: errorData?.message || 'Failed to push to CRM' })
    }

    return res.status(200).json({ message: 'success' })
  } catch (error) {
    console.error('Academy enquiry submission error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
