import type { NextApiRequest, NextApiResponse } from 'next'

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
    utm_source = '',
    utm_medium = '',
    utm_campaign = '',
    utm_term = '',
    utm_content = '',
    landing_page = '',
    referrer = '',
    current_page = '',
    // CRITICAL: Click IDs for Google/Meta Ads offline conversion attribution
    gclid = '',
    first_gclid = '',
    fbclid = '',
    first_fbclid = '',
    gbraid = '',
    wbraid = ''
  } = req.body

  // Validate required fields with more specific error messages
  const missingFields = []
  if (!email?.trim()) missingFields.push('email')
  if (!firstName?.trim()) missingFields.push('firstName')
  if (!lastName?.trim()) missingFields.push('lastName')
  if (!phone?.trim()) missingFields.push('phone')
  if (!courseName?.trim()) missingFields.push('courseName')

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(', ')}`
    })
  }

  const API_KEY = process.env.BREVO_API_KEY as string
  const LIST_ID = process.env.BREVO_LIST_ID as string

  // Debug logging for environment variables
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    hasBrevoApiKey: !!API_KEY,
    hasBrevoListId: !!LIST_ID,
    brevoApiKeyPrefix: API_KEY ? API_KEY.substring(0, 10) + '...' : 'undefined',
    brevoListId: LIST_ID || 'undefined',
    allEnvKeys: Object.keys(process.env)
      .filter((key) => key.includes('BREVO'))
      .join(', ')
  })

  if (!API_KEY || !LIST_ID) {
    console.error('Missing Brevo configuration:', { API_KEY: !!API_KEY, LIST_ID: !!LIST_ID })
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const BREVO_URL = 'https://api.brevo.com/v3/contacts'

  const payload: any = {
    attributes: {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      EMAIL: email,
      SMS: phone,
      PREFERRED_COURSE: courseName,
      COURSE_INTERESTED_IN: [courseName],
      UTM_SOURCE: utm_source,
      UTM_MEDIUM: utm_medium,
      UTM_CAMPAIGN: utm_campaign,
      UTM_TERM: utm_term,
      UTM_CONTENT: utm_content,
      PAGE: current_page || landing_page, // Current page where form was submitted
      REFERRER: referrer, // Original referrer
      LANDING_PAGE: landing_page, // First page visited
      // CRITICAL: Click IDs for Google/Meta Ads offline conversion attribution
      GCLID: gclid || '', // Google Click ID (last touch)
      FIRST_GCLID: first_gclid || gclid || '', // Original Google click (first touch)
      FBCLID: fbclid || '', // Facebook/Meta Click ID
      FIRST_FBCLID: first_fbclid || fbclid || '', // Original Meta click
      GBRAID: gbraid || '', // Google App campaigns
      WBRAID: wbraid || '' // Google Web-to-App
    },
    listIds: [parseInt(LIST_ID)],
    updateEnabled: true
  }

  try {
    const response = await fetch(BREVO_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        console.error('Error parsing Brevo API response:', e)
        errorData = { message: 'Unknown error from Brevo API' }
      }

      console.error('Brevo API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      })

      // Handle duplicate contact error with user-friendly message
      if (
        response.status === 400 &&
        errorData.message &&
        (errorData.message.includes('already associated') ||
          errorData.message.includes('SMS is already associated') ||
          errorData.message.includes('duplicate'))
      ) {
        return res.status(200).json({
          message: 'existing_contact',
          friendlyMessage:
            'Your record is already with us! For further assistance, please email us at admissions@admi.africa or contact us via WhatsApp.'
        })
      }

      // Handle phone number validation errors with user-friendly message
      if (
        response.status === 400 &&
        errorData.message &&
        (errorData.message.includes('Invalid phone number') ||
          errorData.message.includes('phone') ||
          errorData.message.includes('SMS'))
      ) {
        return res.status(400).json({
          error: 'Please enter a valid phone number. Make sure to include the correct country code and number format.'
        })
      }

      // Handle other validation errors
      if (response.status === 400) {
        return res.status(400).json({
          error: 'Please check your information and try again. Make sure all fields are filled correctly.'
        })
      }

      return res.status(response.status).json({
        error: 'Unable to submit your enquiry at this time. Please try again later or contact us directly.'
      })
    }

    return res.status(201).json({ message: 'Lead added successfully' })
  } catch (error) {
    console.error('Brevo API error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
