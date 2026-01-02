/**
 * WhatsApp Lead API Endpoint
 *
 * POST /api/v3/push-whatsapp-lead
 *
 * Handles leads coming from WhatsApp messaging with multi-touch attribution.
 *
 * Workflow:
 * 1. Receive WhatsApp lead with phone, name, email, course interest
 * 2. Check if contact already exists in Brevo by phone number
 * 3. If exists: Update with WhatsApp as last-touch, preserve first-touch (e.g., Google Ads)
 * 4. If new: Create contact with WhatsApp attribution
 * 5. Return success/failure response
 *
 * Example request body:
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "email": "john@example.com",
 *   "phone": "+254711486581",
 *   "courseName": "Music Production Diploma",
 *   "message": "I'm interested in learning music production"
 * }
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import { processWhatsAppLead, normalizePhoneNumber, createWhatsAppAttribution } from '@/utils/whatsapp-attribution'

interface ResponseData {
  success: boolean
  isNew: boolean
  contactId?: number
  message: string
  attributionData?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      isNew: true,
      message: 'Method not allowed'
    })
  }

  try {
    // Validate required fields
    const { firstName, lastName, email, phone, courseName, message } = req.body

    if (!firstName || !lastName || !phone || !courseName) {
      return res.status(400).json({
        success: false,
        isNew: true,
        message: 'Missing required fields: firstName, lastName, phone, courseName'
      })
    }

    // Validate and normalize phone number
    const normalizedPhone = normalizePhoneNumber(phone)
    if (!normalizedPhone) {
      return res.status(400).json({
        success: false,
        isNew: true,
        message: 'Invalid phone number format'
      })
    }

    // Get Brevo API key
    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      console.error('BREVO_API_KEY not configured')
      return res.status(500).json({
        success: false,
        isNew: true,
        message: 'CRM configuration error'
      })
    }

    // Process WhatsApp lead (check existing contact, handle multi-touch)
    const whatsAppResult = await processWhatsAppLead(
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email ? email.trim() : '',
        phone: normalizedPhone,
        courseName: courseName.trim(),
        message: message || ''
      },
      apiKey
    )

    if (whatsAppResult.success && !whatsAppResult.isNew) {
      // Existing contact was updated with WhatsApp as last-touch
      return res.status(200).json({
        success: true,
        isNew: false,
        contactId: whatsAppResult.contactId,
        message: whatsAppResult.message,
        attributionData: {
          lastTouch: 'whatsapp',
          preserved: 'first-touch data from original website visit'
        }
      })
    }

    // New contact or error - create via normal flow
    if (whatsAppResult.success && whatsAppResult.isNew) {
      // Create new contact with WhatsApp attribution
      const attributionData = createWhatsAppAttribution()

      const createPayload = {
        email: email || `whatsapp-${normalizedPhone}@admi.africa`,
        attributes: {
          FIRSTNAME: firstName.trim(),
          LASTNAME: lastName.trim(),
          SMS: normalizedPhone,
          PREFERRED_COURSE: courseName.trim(),
          SOURCE: 'whatsapp',
          CONTACT_STATUS: 'lead',

          // Last-touch: WhatsApp
          UTM_SOURCE: attributionData.utm_source,
          UTM_MEDIUM: attributionData.utm_medium,
          UTM_CAMPAIGN: attributionData.utm_campaign,

          // First-touch: Also WhatsApp (no prior website visit)
          FIRST_TOUCH_SOURCE: attributionData.utm_source,
          FIRST_TOUCH_MEDIUM: attributionData.utm_medium,
          FIRST_TOUCH_CAMPAIGN: attributionData.utm_campaign,
          FIRST_TOUCH_TIMESTAMP: new Date().toISOString(),

          LANDING_PAGE: attributionData.landing_page,
          REFERRER: attributionData.referrer
        }
      }

      try {
        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(createPayload)
        })

        if (brevoResponse.ok) {
          const brevoData = await brevoResponse.json()
          return res.status(200).json({
            success: true,
            isNew: true,
            contactId: brevoData.id,
            message: 'New WhatsApp contact created successfully',
            attributionData
          })
        } else {
          const error = await brevoResponse.json()
          console.error('Brevo API error:', error)
          return res.status(500).json({
            success: false,
            isNew: true,
            message: `CRM creation error: ${error.message || 'Unknown error'}`
          })
        }
      } catch (brevoError) {
        console.error('Error creating contact in Brevo:', brevoError)
        return res.status(500).json({
          success: false,
          isNew: true,
          message: 'Error creating contact in CRM'
        })
      }
    }

    // Handle error case
    return res.status(500).json({
      success: false,
      isNew: true,
      message: whatsAppResult.message || 'Error processing WhatsApp lead'
    })
  } catch (error) {
    console.error('WhatsApp lead endpoint error:', error)
    return res.status(500).json({
      success: false,
      isNew: true,
      message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
}
