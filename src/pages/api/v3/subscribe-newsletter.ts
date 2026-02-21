import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { email } = req.body

  if (!email?.trim()) {
    return res.status(400).json({ error: 'Email is required' })
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address' })
  }

  const API_KEY = process.env.BREVO_API_KEY as string
  const LIST_ID = process.env.BREVO_NEWSLETTER_LIST_ID as string

  if (!API_KEY || !LIST_ID) {
    console.error('Missing Brevo newsletter configuration:', { hasApiKey: !!API_KEY, hasListId: !!LIST_ID })
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const BREVO_URL = 'https://api.brevo.com/v3/contacts'

  const payload = {
    email: email.trim(),
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
      } catch {
        errorData = { message: 'Unknown error from Brevo API' }
      }

      console.error('Brevo newsletter API error:', {
        status: response.status,
        error: errorData
      })

      // Contact already exists — add them to the newsletter list
      if (response.status === 400 && errorData.message?.includes('Contact already exist')) {
        try {
          const updateResponse = await fetch(`${BREVO_URL}/${encodeURIComponent(email.trim())}`, {
            method: 'PUT',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'api-key': API_KEY
            },
            body: JSON.stringify({ listIds: [parseInt(LIST_ID)] })
          })

          if (updateResponse.ok || updateResponse.status === 204) {
            return res.status(200).json({ message: 'subscribed', alreadyExisted: true })
          }
        } catch (updateError) {
          console.error('Error updating existing contact for newsletter:', updateError)
        }
      }

      if (response.status === 400) {
        return res.status(400).json({ error: 'Please check your email and try again.' })
      }

      return res.status(response.status).json({
        error: 'Unable to subscribe at this time. Please try again later.'
      })
    }

    return res.status(201).json({ message: 'subscribed' })
  } catch (error) {
    console.error('Brevo newsletter error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
