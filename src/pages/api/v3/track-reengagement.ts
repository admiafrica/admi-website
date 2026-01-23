import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Track Re-engagement API
 *
 * This endpoint is called when an existing contact re-engages with the website
 * (via chat widget, form interaction, etc.). It captures the GA_CLIENT_ID
 * and updates their attribution data if it was missing.
 *
 * Use cases:
 * - Existing contact opens chat widget
 * - Existing contact submits another form
 * - WhatsApp lead returns to website
 *
 * The GA_CLIENT_ID can then be used to:
 * 1. Correlate with Google Analytics data
 * 2. Send enhanced conversions to Google Ads
 * 3. Build accurate attribution reports
 */

interface ReengagementData {
  // Contact identifier (required - at least one)
  email?: string
  phone?: string
  contactId?: number

  // Attribution data to capture
  ga_client_id?: string

  // Optional: current UTM data (last-touch)
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string

  // Re-engagement context
  reengagement_source: 'chat' | 'form' | 'whatsapp' | 'page_view' | 'other'
  landing_page?: string
  referrer?: string
}

interface ResponseData {
  success: boolean
  message: string
  contact?: {
    email?: string
    id?: number
    attributionUpdated: boolean
    previousGaClientId?: string
    newGaClientId?: string
  }
}

/**
 * Validate GA Client ID format
 * Expected: digits.digits (e.g., 1234567890.9876543210)
 */
function isValidGaClientId(gaClientId: string): boolean {
  if (!gaClientId || typeof gaClientId !== 'string') return false
  return /^\d+\.\d+$/.test(gaClientId)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed'
    })
  }

  const {
    email,
    phone,
    contactId,
    ga_client_id,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    reengagement_source,
    landing_page,
    referrer
  }: ReengagementData = req.body

  // Validate: need at least one identifier
  if (!email && !phone && !contactId) {
    return res.status(400).json({
      success: false,
      message: 'Missing contact identifier. Provide email, phone, or contactId.'
    })
  }

  // Validate: need GA Client ID to proceed
  if (!ga_client_id) {
    return res.status(400).json({
      success: false,
      message: 'Missing ga_client_id. Cannot update attribution without it.'
    })
  }

  // Validate GA Client ID format
  if (!isValidGaClientId(ga_client_id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid ga_client_id format: "${ga_client_id}". Expected: digits.digits`
    })
  }

  // Validate reengagement source
  const validSources = ['chat', 'form', 'whatsapp', 'page_view', 'other']
  if (!reengagement_source || !validSources.includes(reengagement_source)) {
    return res.status(400).json({
      success: false,
      message: `Invalid reengagement_source. Must be one of: ${validSources.join(', ')}`
    })
  }

  const API_KEY = process.env.BREVO_API_KEY

  if (!API_KEY) {
    console.error('Missing Brevo API key')
    return res.status(500).json({
      success: false,
      message: 'Server configuration error'
    })
  }

  try {
    // Step 1: Find the contact
    let existingContact = null
    let contactIdentifier = ''

    if (email) {
      contactIdentifier = email
      const searchResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      })

      if (searchResponse.ok) {
        existingContact = await searchResponse.json()
      }
    } else if (contactId) {
      contactIdentifier = `ID:${contactId}`
      const searchResponse = await fetch(`https://api.brevo.com/v3/contacts/${contactId}`, {
        method: 'GET',
        headers: {
          'api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      })

      if (searchResponse.ok) {
        existingContact = await searchResponse.json()
      }
    }

    // If contact not found
    if (!existingContact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found: ${contactIdentifier}`
      })
    }

    // Step 2: Check if contact already has GA_CLIENT_ID
    const existingGaClientId = existingContact.attributes?.GA_CLIENT_ID
    const needsAttributionUpdate = !existingGaClientId || !isValidGaClientId(existingGaClientId)

    // Step 3: Build update payload
    const updatePayload: Record<string, unknown> = {
      attributes: {
        // Always update re-engagement tracking
        REENGAGEMENT_DATE: new Date().toISOString(),
        REENGAGEMENT_SOURCE: reengagement_source,

        // Update GA Client ID if missing or invalid
        ...(needsAttributionUpdate && {
          GA_CLIENT_ID: ga_client_id,
          ATTRIBUTION_UPDATED: true,
          NEEDS_ATTRIBUTION_UPDATE: false
        }),

        // Update last-touch UTM data if provided
        ...(utm_source && { UTM_SOURCE: utm_source }),
        ...(utm_medium && { UTM_MEDIUM: utm_medium }),
        ...(utm_campaign && { UTM_CAMPAIGN: utm_campaign }),
        ...(utm_term && { UTM_TERM: utm_term }),
        ...(utm_content && { UTM_CONTENT: utm_content }),
        ...(landing_page && { LANDING_PAGE: landing_page }),
        ...(referrer && { REFERRER: referrer })
      }
    }

    // Step 4: Update contact in Brevo
    const contactEmail = existingContact.email
    const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(contactEmail)}`, {
      method: 'PUT',
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatePayload)
    })

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      console.error('Brevo contact update failed:', errorData)
      return res.status(500).json({
        success: false,
        message: 'Failed to update contact in CRM'
      })
    }

    // Step 5: Log for tracking
    console.log(
      `✅ Re-engagement tracked: ${contactEmail} | Source: ${reengagement_source} | GA Updated: ${needsAttributionUpdate}`
    )

    return res.status(200).json({
      success: true,
      message: needsAttributionUpdate
        ? 'Contact attribution updated successfully'
        : 'Re-engagement tracked (attribution already present)',
      contact: {
        email: contactEmail,
        id: existingContact.id,
        attributionUpdated: needsAttributionUpdate,
        previousGaClientId: existingGaClientId || undefined,
        newGaClientId: needsAttributionUpdate ? ga_client_id : existingGaClientId
      }
    })
  } catch (error) {
    console.error('Re-engagement tracking error:', error)
    return res.status(500).json({
      success: false,
      message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
}
