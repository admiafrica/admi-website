/**
 * WhatsApp Multi-Touch Attribution
 *
 * Handles attribution for leads that come through WhatsApp messaging,
 * especially those who previously visited the website via paid ads.
 *
 * Key feature: Matches existing contacts by phone number to preserve
 * first-touch attribution (e.g., Google Ads) while capturing WhatsApp
 * as the last-touch conversion point.
 */

import type { UTMData } from './utm-tracking'
import { trackWhatsAppClick as trackWhatsAppClickFromUTM } from './utm-tracking'

// ADMI WhatsApp number (from footer)
export const ADMI_WHATSAPP_NUMBER = '254741132751'

// Re-export trackWhatsAppClick for convenience
export const trackWhatsAppClick = trackWhatsAppClickFromUTM

/**
 * Clean and normalize phone number for matching
 * Handles various formats: +254741132751, 254741132751, 0741132751
 */
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return ''

  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')

  // Handle Kenya numbers (254 country code)
  if (digits.startsWith('0') && digits.length === 10) {
    // 0711486581 -> 254711486581 (skip leading 0, add country code)
    return `254${digits.substring(1)}`
  } else if (digits.length === 9) {
    // 711486581 -> 254711486581 (add country code)
    return `254${digits}`
  } else if (digits.startsWith('254')) {
    // Already in international format
    return digits
  }

  // Return as-is if can't normalize
  return digits
}

/**
 * Create WhatsApp attribution data for new contacts
 * (contacts that have no prior website visits)
 */
export function createWhatsAppAttribution(): UTMData {
  return {
    utm_source: 'whatsapp',
    utm_medium: 'messaging',
    utm_campaign: 'whatsapp-organic',
    landing_page: 'WhatsApp Chat',
    referrer: 'WhatsApp Business'
  }
}

/**
 * Create multi-touch WhatsApp attribution for returning contacts
 * Preserves first-touch data while setting WhatsApp as last-touch
 */
export function createMultiTouchWhatsAppAttribution(existingContact: {
  attributes: Record<string, any>
}): Partial<UTMData> {
  const attrs = existingContact.attributes || {}

  return {
    // Last-touch: WhatsApp (how they converted today)
    utm_source: 'whatsapp',
    utm_medium: 'messaging',
    utm_campaign: 'whatsapp-organic',

    // First-touch: Preserve from earlier visit (e.g., Google Ads)
    first_touch_source: attrs.FIRST_TOUCH_SOURCE || attrs.UTM_SOURCE || '',
    first_touch_medium: attrs.FIRST_TOUCH_MEDIUM || attrs.UTM_MEDIUM || '',
    first_touch_campaign: attrs.FIRST_TOUCH_CAMPAIGN || attrs.UTM_CAMPAIGN || '',
    first_touch_term: attrs.FIRST_TOUCH_TERM || '',
    first_touch_content: attrs.FIRST_TOUCH_CONTENT || '',
    first_touch_timestamp: attrs.FIRST_TOUCH_TIMESTAMP || '',

    // GA tracking: Preserve if exists
    ga_client_id: attrs.GA_CLIENT_ID || '',

    // Journey info
    landing_page: attrs.LANDING_PAGE || 'WhatsApp Chat',
    referrer: 'WhatsApp Business', // Last-touch referrer
    first_touch_referrer: attrs.REFERRER || attrs.FIRST_TOUCH_REFERRER || '' // Preserve original
  }
}

/**
 * Check if a contact already exists by phone number
 * This helps identify users who visited website first, then messaged on WhatsApp
 */
export async function findContactByPhone(
  phone: string,
  apiKey: string
): Promise<{
  exists: boolean
  id?: number
  attributes?: Record<string, any>
}> {
  try {
    const normalizedPhone = normalizePhoneNumber(phone)
    if (!normalizedPhone) {
      return { exists: false }
    }

    // Search by phone in Brevo
    // Note: This is a simplified approach. For production, consider:
    // 1. Creating a custom contact attribute for normalized phone
    // 2. Using Brevo's advanced search API
    // 3. Implementing database-level phone matching

    const response = await fetch('https://api.brevo.com/v3/contacts?limit=100&sort=id:desc', {
      method: 'GET',
      headers: {
        'api-key': apiKey,
        accept: 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Error searching contacts:', response.status)
      return { exists: false }
    }

    const data = await response.json()
    const contacts = data.contacts || []

    // Find matching contact by phone number
    for (const contact of contacts) {
      const contactPhone = contact.attributes?.SMS || ''
      if (normalizePhoneNumber(contactPhone) === normalizedPhone) {
        return {
          exists: true,
          id: contact.id,
          attributes: contact.attributes
        }
      }
    }

    return { exists: false }
  } catch (error) {
    console.error('Error finding contact by phone:', error)
    return { exists: false }
  }
}

/**
 * Handle WhatsApp contact submission
 * Determines if this is a new user or returning visitor
 */
export async function handleWhatsAppContactSubmission(
  contactData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    courseName: string
    [key: string]: any
  },
  apiKey: string
): Promise<{
  isNew: boolean
  existingContactId?: number
  attributionData: Partial<UTMData>
}> {
  // Check if contact exists by phone
  const existingContact = await findContactByPhone(contactData.phone, apiKey)

  if (existingContact.exists && existingContact.attributes) {
    // Returning visitor: Preserve first-touch, use WhatsApp as last-touch
    return {
      isNew: false,
      existingContactId: existingContact.id,
      attributionData: createMultiTouchWhatsAppAttribution({
        attributes: existingContact.attributes
      })
    }
  } else {
    // New visitor: No prior website data, WhatsApp is both first and last touch
    return {
      isNew: true,
      attributionData: createWhatsAppAttribution()
    }
  }
}

/**
 * Merge WhatsApp contact data with existing contact in Brevo
 * Updates last-touch attribution while preserving first-touch
 */
export async function updateWhatsAppContact(
  contactId: number,
  contactData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    courseName: string
    [key: string]: any
  },
  attributionData: Partial<UTMData>,
  apiKey: string
): Promise<{ success: boolean; message: string }> {
  try {
    const payload = {
      attributes: {
        FIRSTNAME: contactData.firstName.trim(),
        LASTNAME: contactData.lastName.trim(),
        SMS: contactData.phone.trim(),
        PREFERRED_COURSE: contactData.courseName.trim(),

        // Last-touch: WhatsApp
        UTM_SOURCE: attributionData.utm_source || 'whatsapp',
        UTM_MEDIUM: attributionData.utm_medium || 'messaging',
        UTM_CAMPAIGN: attributionData.utm_campaign || 'whatsapp-organic',

        // Preserve first-touch (only update if not already set)
        FIRST_TOUCH_SOURCE: attributionData.first_touch_source || '',
        FIRST_TOUCH_MEDIUM: attributionData.first_touch_medium || '',
        FIRST_TOUCH_CAMPAIGN: attributionData.first_touch_campaign || '',
        FIRST_TOUCH_TERM: attributionData.first_touch_term || '',
        FIRST_TOUCH_CONTENT: attributionData.first_touch_content || '',
        FIRST_TOUCH_TIMESTAMP: attributionData.first_touch_timestamp || '',
        FIRST_TOUCH_REFERRER: attributionData.first_touch_referrer || '', // Preserve original referrer

        // Preserve GA tracking
        GA_CLIENT_ID: attributionData.ga_client_id || '',

        // Journey tracking
        LANDING_PAGE: attributionData.landing_page || 'WhatsApp Chat',
        REFERRER: attributionData.referrer || 'WhatsApp Business' // Last-touch referrer
      },
      updateEnabled: true
    }

    const response = await fetch(`https://api.brevo.com/v3/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Error updating contact:', error)
      return {
        success: false,
        message: `Failed to update contact: ${error.message}`
      }
    }

    return {
      success: true,
      message: `Contact #${contactId} updated with WhatsApp attribution`
    }
  } catch (error) {
    console.error('Error updating WhatsApp contact:', error)
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Complete WhatsApp lead flow
 * 1. Checks if contact exists by phone
 * 2. If exists: Updates with WhatsApp as last-touch, preserves first-touch
 * 3. If new: Creates new contact with WhatsApp attribution
 */
export async function processWhatsAppLead(
  contactData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    courseName: string
    [key: string]: any
  },
  apiKey: string
): Promise<{
  success: boolean
  isNew: boolean
  contactId?: number
  message: string
}> {
  try {
    // Check if contact exists
    const result = await handleWhatsAppContactSubmission(contactData, apiKey)

    if (!result.isNew && result.existingContactId) {
      // Update existing contact with WhatsApp as last-touch
      const updateResult = await updateWhatsAppContact(
        result.existingContactId,
        contactData,
        result.attributionData,
        apiKey
      )

      return {
        success: updateResult.success,
        isNew: false,
        contactId: result.existingContactId,
        message: updateResult.message
      }
    } else {
      // New contact - handled by normal lead flow
      // Just return attribution data to be used in API call
      return {
        success: true,
        isNew: true,
        message: 'New WhatsApp contact - use normal lead creation flow'
      }
    }
  } catch (error) {
    console.error('Error processing WhatsApp lead:', error)
    return {
      success: false,
      isNew: true,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}
