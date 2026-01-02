import type { NextApiRequest, NextApiResponse } from 'next'

interface EnhancedLeadData {
  firstName: string
  lastName: string
  email: string
  phone: string
  courseName: string
  studyTimeline: string
  programType: string
  investmentRange?: string
  careerGoals: string
  experienceLevel: string
  // Last-touch attribution
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  landing_page?: string
  referrer?: string
  current_page?: string
  // First-touch attribution (NEW!)
  first_touch_source?: string
  first_touch_medium?: string
  first_touch_campaign?: string
  first_touch_term?: string
  first_touch_content?: string
  first_touch_timestamp?: string
  // GA Client ID for cross-session tracking (NEW!)
  ga_client_id?: string
  // Lead scoring
  leadScore: number
  formType: string
  submissionDate: string
}

// Calculate lead score on server side as backup
function calculateLeadScore(data: EnhancedLeadData): number {
  let score = 0

  // Timeline scoring (0-5 points)
  switch (data.studyTimeline) {
    case 'january-2026':
      score += 5
      break
    case 'may-2026':
      score += 4
      break
    case 'september-2026':
      score += 3
      break
    case 'researching':
      score += 1
      break
  }

  // Program type scoring (0-4 points)
  switch (data.programType) {
    case 'full-time-diploma':
      score += 4
      break
    case 'professional-certificate':
      score += 3
      break
    case 'foundation-certificate':
      score += 2
      break
    case 'weekend-parttime':
      score += 1
      break
  }

  // Investment range scoring (0-4 points)
  switch (data.investmentRange) {
    case '500k-plus':
      score += 4
      break
    case '300k-500k':
      score += 3
      break
    case '100k-300k':
      score += 2
      break
    case 'under-100k':
      score += 1
      break
    case 'need-discussion':
      score += 2
      break
  }

  // Career goals scoring (0-4 points)
  switch (data.careerGoals) {
    case 'career-change':
      score += 4
      break
    case 'start-business':
      score += 4
      break
    case 'skill-upgrade':
      score += 3
      break
    case 'university-prep':
      score += 2
      break
    case 'personal-interest':
      score += 1
      break
  }

  // Experience level scoring (0-3 points)
  switch (data.experienceLevel) {
    case 'professional-upgrade':
      score += 3
      break
    case 'intermediate':
      score += 2
      break
    case 'some-experience':
      score += 2
      break
    case 'complete-beginner':
      score += 1
      break
    case 'formal-training':
      score += 2
      break
  }

  return Math.min(score, 20) // Cap at 20 points
}

/**
 * Sanitize UTM parameter values to prevent test data contamination
 * Removes any text after common delimiters like " Expected" or special patterns
 */
function sanitizeUTMValue(value: string): string {
  if (!value || typeof value !== 'string') return ''

  // Remove any text after common test indicators
  let sanitized = value.split(/\s+Expected/i)[0] // Remove "Expected First-Touch:" patterns
  sanitized = sanitized.split(/\s+Test/i)[0] // Remove test patterns
  sanitized = sanitized.trim()

  // Remove any excessively long values (UTM params should be < 200 chars)
  if (sanitized.length > 200) {
    console.warn(`⚠️ UTM value exceeded 200 characters, truncating: ${value.substring(0, 50)}...`)
    sanitized = sanitized.substring(0, 200)
  }

  return sanitized
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    courseName,
    studyTimeline,
    programType,
    investmentRange = '',
    careerGoals,
    experienceLevel,
    // Last-touch attribution
    utm_source = 'direct',
    utm_medium = 'none',
    utm_campaign = 'organic',
    utm_term = '',
    utm_content = '',
    landing_page = '',
    referrer = '',
    current_page = '',
    // First-touch attribution (NEW!)
    first_touch_source = '',
    first_touch_medium = '',
    first_touch_campaign = '',
    first_touch_term = '',
    first_touch_content = '',
    first_touch_timestamp = '',
    // GA Client ID (NEW!)
    ga_client_id = '',
    // Lead scoring
    leadScore: clientLeadScore,
    formType,
    submissionDate
  }: EnhancedLeadData = req.body

  // Sanitize all UTM values to prevent test data contamination
  const sanitizedUTMs = {
    utm_source: sanitizeUTMValue(utm_source),
    utm_medium: sanitizeUTMValue(utm_medium),
    utm_campaign: sanitizeUTMValue(utm_campaign),
    utm_term: sanitizeUTMValue(utm_term),
    utm_content: sanitizeUTMValue(utm_content),
    first_touch_source: sanitizeUTMValue(first_touch_source),
    first_touch_medium: sanitizeUTMValue(first_touch_medium),
    first_touch_campaign: sanitizeUTMValue(first_touch_campaign),
    first_touch_term: sanitizeUTMValue(first_touch_term),
    first_touch_content: sanitizeUTMValue(first_touch_content),
    ga_client_id: sanitizeUTMValue(ga_client_id)
  }

  // Map form values to human-readable labels
  const timelineLabels: { [key: string]: string } = {
    'january-2026': 'January 2026 intake',
    'may-2026': 'May 2026 intake',
    'september-2026': 'September 2026 intake',
    researching: 'Just researching'
  }

  const programLabels: { [key: string]: string } = {
    'full-time-diploma': 'Full-time Diploma (2 years)',
    'professional-certificate': 'Professional Certificate (6-12 months)',
    'foundation-certificate': 'Foundation Certificate (3-6 months)',
    'weekend-parttime': 'Weekend/Part-time classes'
  }

  const investmentLabels: { [key: string]: string } = {
    'under-100k': 'Under 100,000 KES',
    '100k-300k': '100,000 - 300,000 KES',
    '300k-500k': '300,000 - 500,000 KES',
    '500k-plus': '500,000+ KES',
    'need-discussion': 'Need to discuss payment options'
  }

  const goalLabels: { [key: string]: string } = {
    'career-change': 'Career change to creative industry',
    'skill-upgrade': 'Upgrade skills in current role',
    'start-business': 'Start my own creative business',
    'university-prep': 'Prepare for university studies',
    'personal-interest': 'Personal interest/hobby'
  }

  const experienceLabels: { [key: string]: string } = {
    'complete-beginner': 'Complete beginner',
    'some-experience': 'Some basic experience',
    intermediate: 'Intermediate level',
    'professional-upgrade': 'Professional looking to upgrade',
    'formal-training': 'Have formal training elsewhere'
  }

  // Recalculate lead score on server side for security
  const leadScore = calculateLeadScore({
    firstName,
    lastName,
    email,
    phone,
    courseName,
    studyTimeline,
    programType,
    investmentRange,
    careerGoals,
    experienceLevel,
    utm_source: sanitizedUTMs.utm_source || 'direct',
    utm_medium: sanitizedUTMs.utm_medium || 'none',
    utm_campaign: sanitizedUTMs.utm_campaign || 'organic',
    utm_term: sanitizedUTMs.utm_term || '',
    utm_content: sanitizedUTMs.utm_content || '',
    leadScore: clientLeadScore,
    formType,
    submissionDate
  })

  // Validate required fields
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !courseName?.trim() ||
    !studyTimeline?.trim() ||
    !programType?.trim() ||
    !careerGoals?.trim() ||
    !experienceLevel?.trim()
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  const API_KEY = process.env.BREVO_API_KEY as string

  if (!API_KEY) {
    console.error('Missing Brevo API key')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    // Check if contact already exists by email
    const searchResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    })

    if (searchResponse.ok) {
      // Contact exists, return existing contact message
      return res.status(200).json({
        message: 'existing_contact',
        leadScore,
        qualificationData: {
          studyTimeline: timelineLabels[studyTimeline] || studyTimeline,
          programType: programLabels[programType] || programType,
          investmentRange: investmentRange ? investmentLabels[investmentRange] || investmentRange : 'Not specified',
          careerGoals: goalLabels[careerGoals] || careerGoals,
          experienceLevel: experienceLabels[experienceLevel] || experienceLevel
        }
      })
    }

    // Determine lead category based on score
    let leadCategory = 'Cold Lead'
    let leadPriority = 'Low'

    if (leadScore >= 15) {
      leadCategory = 'Hot Lead'
      leadPriority = 'High'
    } else if (leadScore >= 10) {
      leadCategory = 'Warm Lead'
      leadPriority = 'Medium'
    } else if (leadScore >= 5) {
      leadCategory = 'Cold Lead'
      leadPriority = 'Low'
    } else {
      leadCategory = 'Unqualified'
      leadPriority = 'Very Low'
    }

    // Create contact in Brevo with enhanced data
    const contactPayload = {
      email: email.trim(),
      attributes: {
        FIRSTNAME: firstName.trim(),
        LASTNAME: lastName.trim(),
        SMS: phone.trim(), // Phone number field

        // Course and program details
        PREFERRED_COURSE: courseName.trim(),
        COURSE_INTERESTED_IN: courseName.trim(),

        // Lead scoring and categorization
        QUALIFICATION_SCORE: leadScore, // Maps to QUALIFICATION_SCORE field in Brevo
        SCORE: leadScore, // Also map to SCORE field
        QUALIFICATION_STATUS: leadCategory, // Hot Lead / Warm Lead / Cold Lead / Unqualified
        LEAD_STATUS: leadPriority, // High / Medium / Low / Very Low

        // Last-touch attribution (what converted them) - SANITIZED
        UTM_SOURCE: sanitizedUTMs.utm_source || 'direct',
        UTM_MEDIUM: sanitizedUTMs.utm_medium || 'none',
        UTM_CAMPAIGN: sanitizedUTMs.utm_campaign || 'organic',
        UTM_TERM: sanitizedUTMs.utm_term || '',
        UTM_CONTENT: sanitizedUTMs.utm_content || '',
        PAGE: current_page || landing_page, // Current page where form was submitted
        REFERRER: referrer, // Original referrer
        LANDING_PAGE: landing_page, // First page visited

        // First-touch attribution (what originally brought them) - SANITIZED & NEW!
        FIRST_TOUCH_SOURCE: sanitizedUTMs.first_touch_source || sanitizedUTMs.utm_source || 'direct',
        FIRST_TOUCH_MEDIUM: sanitizedUTMs.first_touch_medium || sanitizedUTMs.utm_medium || 'none',
        FIRST_TOUCH_CAMPAIGN: sanitizedUTMs.first_touch_campaign || sanitizedUTMs.utm_campaign || 'organic',
        FIRST_TOUCH_TERM: sanitizedUTMs.first_touch_term || '',
        FIRST_TOUCH_CONTENT: sanitizedUTMs.first_touch_content || '',
        FIRST_TOUCH_TIMESTAMP: first_touch_timestamp || '',

        // GA Client ID for cross-session tracking - SANITIZED & NEW!
        GA_CLIENT_ID: sanitizedUTMs.ga_client_id || '',

        // Summary of pre-qualification responses
        CONVERSATION_SUMMARY: `Timeline: ${timelineLabels[studyTimeline] || studyTimeline} | Program: ${programLabels[programType] || programType} | Investment: ${investmentRange ? investmentLabels[investmentRange] : 'Not specified'} | Goals: ${goalLabels[careerGoals] || careerGoals} | Experience: ${experienceLabels[experienceLevel] || experienceLevel}`
      },
      listIds: [2], // Add to main contact list (adjust ID as needed)
      updateEnabled: true
    }

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
      console.error('Brevo contact creation failed:', errorData)
      return res.status(500).json({ error: 'Failed to create contact in CRM' })
    }

    // Create a deal in the appropriate pipeline based on timeline
    let pipelineId = '68e60a790c87b5f2cbfec788' // Default to January 2026 Pipeline

    switch (studyTimeline) {
      case 'january-2026':
        pipelineId = '68e60a790c87b5f2cbfec788' // January 2026 Pipeline
        break
      case 'may-2026':
        // You might want to create a May 2026 pipeline or use existing one
        pipelineId = '68e60a790c87b5f2cbfec788' // For now, use January 2026
        break
      case 'september-2026':
        pipelineId = '686e36380a6f48f74068574c' // Sept. 2025 Pipeline (or create new Sept 2026)
        break
      default:
        pipelineId = '68e60a790c87b5f2cbfec788' // Default pipeline
    }

    // Estimate deal value based on program type and investment range
    let dealValue = 150000 // Default value in KES

    if (investmentRange === '500k-plus') dealValue = 500000
    else if (investmentRange === '300k-500k') dealValue = 400000
    else if (investmentRange === '100k-300k') dealValue = 200000
    else if (investmentRange === 'under-100k') dealValue = 80000

    if (programType === 'full-time-diploma') dealValue *= 1.5
    else if (programType === 'foundation-certificate') dealValue *= 0.6

    const dealPayload = {
      name: `${firstName} ${lastName} - ${courseName}`,
      attributes: {
        deal_value: dealValue,
        pipeline: pipelineId
        // Remove invalid attributes that Brevo doesn't recognize
        // Only include basic deal attributes
      }
    }

    const createDealResponse = await fetch('https://api.brevo.com/v3/crm/deals', {
      method: 'POST',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dealPayload)
    })

    if (!createDealResponse.ok) {
      const dealErrorData = await createDealResponse.json()
      console.error('Brevo deal creation failed:', dealErrorData)
      // Don't fail the whole request if deal creation fails
    }

    // Send notification email to admissions team for high-priority leads
    if (leadScore >= 15) {
      const notificationPayload = {
        sender: {
          name: 'ADMI Enhanced Enquiry System',
          email: 'noreply@admi.africa'
        },
        to: [
          {
            email: 'admissions@admi.africa',
            name: 'ADMI Admissions Team'
          }
        ],
        subject: `🔥 HOT LEAD ALERT: ${firstName} ${lastName} - Score: ${leadScore}/20`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #d32f2f; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">🔥 Hot Lead Alert</h1>
            </div>
            
            <div style="padding: 20px; background-color: #f8f9fa;">
              <h2 style="color: #d32f2f;">Lead Score: ${leadScore}/20 - ${leadCategory}</h2>
              
              <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h3>Contact Information:</h3>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
              </div>
              
              <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h3>Course Interest:</h3>
                <p><strong>Course:</strong> ${courseName}</p>
                <p><strong>Timeline:</strong> ${timelineLabels[studyTimeline] || studyTimeline}</p>
                <p><strong>Program Type:</strong> ${programLabels[programType] || programType}</p>
                <p><strong>Investment Range:</strong> ${investmentRange ? investmentLabels[investmentRange] || investmentRange : 'Not specified'}</p>
              </div>
              
              <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h3>Goals & Experience:</h3>
                <p><strong>Career Goals:</strong> ${goalLabels[careerGoals] || careerGoals}</p>
                <p><strong>Experience Level:</strong> ${experienceLabels[experienceLevel] || experienceLevel}</p>
              </div>
              
              <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h3>Lead Source:</h3>
                <p><strong>Source:</strong> ${utm_source}</p>
                <p><strong>Medium:</strong> ${utm_medium}</p>
                <p><strong>Campaign:</strong> ${utm_campaign}</p>
              </div>
              
              <div style="text-align: center; margin: 20px 0;">
                <p style="color: #d32f2f; font-weight: bold;">⚡ IMMEDIATE ACTION REQUIRED ⚡</p>
                <p>This is a high-priority lead. Contact within 1 hour for best conversion rates.</p>
              </div>
            </div>
          </div>
        `
      }

      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationPayload)
      })
    }

    return res.status(200).json({
      message: 'success',
      leadScore,
      leadCategory,
      leadPriority,
      qualificationData: {
        studyTimeline: timelineLabels[studyTimeline] || studyTimeline,
        programType: programLabels[programType] || programType,
        investmentRange: investmentRange ? investmentLabels[investmentRange] || investmentRange : 'Not specified',
        careerGoals: goalLabels[careerGoals] || careerGoals,
        experienceLevel: experienceLabels[experienceLevel] || experienceLevel
      }
    })
  } catch (error) {
    console.error('Enhanced lead submission error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
