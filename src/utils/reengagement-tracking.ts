/**
 * Re-engagement Tracking Utility
 *
 * Client-side utility for tracking when existing contacts return to the website.
 * Captures GA_CLIENT_ID and sends it to Brevo to backfill attribution data.
 *
 * Integration points:
 * - Chat widget open/interaction
 * - Form pre-fill detection
 * - Returning user identification
 *
 * Usage:
 *   import { trackReengagement, checkAndTrackReengagement } from '@/utils/reengagement-tracking'
 *
 *   // When you identify a returning user (e.g., chat widget)
 *   trackReengagement({
 *     email: 'user@example.com',
 *     source: 'chat'
 *   })
 *
 *   // Automatic check based on stored email
 *   checkAndTrackReengagement('chat')
 */

import { getStoredUTMs } from './utm-tracking'

// Local storage key for tracked re-engagements (to avoid duplicate calls)
const REENGAGEMENT_TRACKED_KEY = 'admi_reengagement_tracked'
const LAST_TRACKED_KEY = 'admi_last_reengagement'

interface ReengagementOptions {
  email?: string
  phone?: string
  contactId?: number
  source: 'chat' | 'form' | 'whatsapp' | 'page_view' | 'other'
}

interface ReengagementResult {
  success: boolean
  message: string
  attributionUpdated?: boolean
}

/**
 * Get GA4 Client ID from cookies (duplicated from utm-tracking for independence)
 */
function getGA4ClientID(): string | null {
  if (typeof document === 'undefined') return null

  try {
    const cookies = document.cookie.split(';')
    const gaCookie = cookies.find((c) => {
      const trimmed = c.trim()
      return trimmed.startsWith('_ga=') && !trimmed.includes('_ga_')
    })

    if (gaCookie) {
      const value = gaCookie.split('=')[1]?.trim()
      if (!value) return null

      const parts = value.split('.')
      if (parts.length >= 4) {
        const clientId = `${parts[2]}.${parts[3]}`
        // Validate format: digits.digits
        if (/^\d+\.\d+$/.test(clientId)) {
          return clientId
        }
      }
    }

    return null
  } catch {
    return null
  }
}

/**
 * Check if we've already tracked this email recently (within 24 hours)
 */
function hasRecentlyTracked(email: string): boolean {
  if (typeof localStorage === 'undefined') return false

  try {
    const tracked = localStorage.getItem(REENGAGEMENT_TRACKED_KEY)
    if (!tracked) return false

    const trackedData = JSON.parse(tracked)
    const lastTracked = trackedData[email]

    if (!lastTracked) return false

    // Check if tracked within last 24 hours
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000
    return lastTracked > twentyFourHoursAgo
  } catch {
    return false
  }
}

/**
 * Mark email as tracked
 */
function markAsTracked(email: string): void {
  if (typeof localStorage === 'undefined') return

  try {
    const tracked = localStorage.getItem(REENGAGEMENT_TRACKED_KEY)
    const trackedData = tracked ? JSON.parse(tracked) : {}

    trackedData[email] = Date.now()

    // Clean up old entries (older than 7 days)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    Object.keys(trackedData).forEach((key) => {
      if (trackedData[key] < sevenDaysAgo) {
        delete trackedData[key]
      }
    })

    localStorage.setItem(REENGAGEMENT_TRACKED_KEY, JSON.stringify(trackedData))
    localStorage.setItem(LAST_TRACKED_KEY, new Date().toISOString())
  } catch {
    // Ignore storage errors
  }
}

/**
 * Get stored email from previous form submissions
 */
export function getStoredEmail(): string | null {
  if (typeof localStorage === 'undefined') return null

  try {
    // Check various places where email might be stored
    const formEmail = localStorage.getItem('admi_user_email')
    if (formEmail) return formEmail

    // Check UTM data for email
    const utmData = localStorage.getItem('admi_utms')
    if (utmData) {
      const parsed = JSON.parse(utmData)
      if (parsed.email) return parsed.email
    }

    return null
  } catch {
    return null
  }
}

/**
 * Store email for future re-engagement tracking
 */
export function storeEmail(email: string): void {
  if (typeof localStorage === 'undefined') return

  try {
    localStorage.setItem('admi_user_email', email.toLowerCase().trim())
  } catch {
    // Ignore storage errors
  }
}

/**
 * Track re-engagement for an existing contact
 *
 * Call this when:
 * - Chat widget is opened by a returning user
 * - Form is pre-filled with known email
 * - User is identified through any mechanism
 */
export async function trackReengagement(options: ReengagementOptions): Promise<ReengagementResult> {
  const { email, phone, contactId, source } = options

  // Need at least one identifier
  if (!email && !phone && !contactId) {
    return {
      success: false,
      message: 'No contact identifier provided'
    }
  }

  // Get GA Client ID
  const gaClientId = getGA4ClientID()

  if (!gaClientId) {
    console.log('[Re-engagement] No GA Client ID available yet')
    return {
      success: false,
      message: 'GA Client ID not available'
    }
  }

  // Check if recently tracked (avoid duplicate API calls)
  if (email && hasRecentlyTracked(email)) {
    console.log('[Re-engagement] Already tracked recently:', email)
    return {
      success: true,
      message: 'Already tracked recently',
      attributionUpdated: false
    }
  }

  // Get current UTM data
  const utmData = getStoredUTMs()

  try {
    const response = await fetch('/api/v3/track-reengagement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        phone,
        contactId,
        ga_client_id: gaClientId,
        utm_source: utmData.utm_source,
        utm_medium: utmData.utm_medium,
        utm_campaign: utmData.utm_campaign,
        utm_term: utmData.utm_term,
        utm_content: utmData.utm_content,
        reengagement_source: source,
        landing_page: utmData.landing_page || window.location.href,
        referrer: document.referrer
      })
    })

    const result = await response.json()

    if (result.success) {
      // Mark as tracked to avoid duplicate calls
      if (email) {
        markAsTracked(email)
      }

      console.log('[Re-engagement] Tracked successfully:', {
        email,
        attributionUpdated: result.contact?.attributionUpdated
      })

      return {
        success: true,
        message: result.message,
        attributionUpdated: result.contact?.attributionUpdated
      }
    } else {
      console.log('[Re-engagement] Tracking failed:', result.message)
      return {
        success: false,
        message: result.message
      }
    }
  } catch (error) {
    console.error('[Re-engagement] API error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Automatically check for stored email and track re-engagement
 *
 * Call this on:
 * - Chat widget open
 * - Page load (for returning visitors)
 * - Form focus (when pre-fill detected)
 */
export async function checkAndTrackReengagement(
  source: ReengagementOptions['source']
): Promise<ReengagementResult | null> {
  const storedEmail = getStoredEmail()

  if (!storedEmail) {
    return null
  }

  return trackReengagement({
    email: storedEmail,
    source
  })
}

/**
 * Integration helper for chat widget
 *
 * Call this when chat widget is opened or message is sent
 */
export function onChatWidgetInteraction(email?: string): void {
  if (email) {
    storeEmail(email)
    trackReengagement({ email, source: 'chat' })
  } else {
    checkAndTrackReengagement('chat')
  }
}

/**
 * Integration helper for forms
 *
 * Call this when a form is submitted with a returning user
 */
export function onFormSubmission(email: string): void {
  storeEmail(email)
  trackReengagement({ email, source: 'form' })
}

/**
 * Debug function to log re-engagement state
 */
export function debugReengagementState(): void {
  if (typeof window === 'undefined') return

  console.group('🔄 Re-engagement Tracking State')
  console.log('GA Client ID:', getGA4ClientID())
  console.log('Stored Email:', getStoredEmail())
  console.log('Tracked Data:', localStorage.getItem(REENGAGEMENT_TRACKED_KEY))
  console.log('Last Tracked:', localStorage.getItem(LAST_TRACKED_KEY))
  console.groupEnd()
}

// Make debug function available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  ;(window as unknown as Record<string, unknown>).debugReengagement = debugReengagementState
}
