/**
 * UTM Tracking Utility
 * Captures, stores, and retrieves UTM parameters to persist across multi-page journeys
 *
 * Issue: Only 45.3% of contacts have proper UTM tracking (232/512)
 * Solution: Use sessionStorage to preserve UTM parameters from landing page to form submission
 */

// UTM parameter names
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

// Storage keys
const STORAGE_KEYS = {
  LANDING_PAGE: 'admi_landing_page',
  REFERRER: 'admi_referrer',
  FIRST_VISIT: 'admi_first_visit',
  // First-touch attribution (persists across sessions)
  FIRST_TOUCH_SOURCE: 'admi_first_touch_source',
  FIRST_TOUCH_MEDIUM: 'admi_first_touch_medium',
  FIRST_TOUCH_CAMPAIGN: 'admi_first_touch_campaign',
  FIRST_TOUCH_TERM: 'admi_first_touch_term',
  FIRST_TOUCH_CONTENT: 'admi_first_touch_content',
  FIRST_TOUCH_TIMESTAMP: 'admi_first_touch_timestamp',
  GA_CLIENT_ID: 'admi_ga_client_id'
}

export interface UTMData {
  // Last-touch (current session)
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  landing_page?: string
  referrer?: string
  first_visit?: string
  // First-touch attribution
  first_touch_source?: string
  first_touch_medium?: string
  first_touch_campaign?: string
  first_touch_term?: string
  first_touch_content?: string
  first_touch_timestamp?: string
  first_touch_referrer?: string // Original referrer source
  // GA4 Client ID for cross-session tracking
  ga_client_id?: string
}

/**
 * Get GA4 Client ID from cookies
 * Format: _ga=GA1.1.{client_id_part1}.{client_id_part2}
 * Returns: {client_id_part1}.{client_id_part2}
 */
function getGA4ClientID(): string | null {
  if (typeof document === 'undefined') return null

  try {
    const cookies = document.cookie.split(';')

    // Try to find _ga cookie (standard Google Analytics cookie)
    const gaCookie = cookies.find((c) => {
      const trimmed = c.trim()
      return trimmed.startsWith('_ga=') && !trimmed.includes('_ga_')
    })

    if (gaCookie) {
      // Format: _ga=GA1.1.{client_id_part1}.{client_id_part2}
      const value = gaCookie.split('=')[1]?.trim()
      if (!value) return null

      const parts = value.split('.')
      // GA1.1.{part1}.{part2} -> we want {part1}.{part2}
      if (parts.length >= 4) {
        const clientId = `${parts[2]}.${parts[3]}`
        // Validate format (should be numbers.numbers)
        if (/^\d+\.\d+$/.test(clientId)) {
          return clientId
        }
      }
    }

    // Try measurement ID cookies as fallback (newer GA4 format)
    const ga4Cookie = cookies.find((c) => {
      const trimmed = c.trim()
      return trimmed.startsWith('_ga_')
    })

    if (ga4Cookie) {
      // Format: _ga_XXXXXXXXXX=GS1.1.{timestamp}.{session_id}
      const value = ga4Cookie.split('=')[1]?.trim()
      if (!value) return null

      const parts = value.split('.')
      // GS1.1.{timestamp}.{session_id} -> return full value if valid
      if (parts.length >= 3 && /^\d+\.\d+$/.test(`${parts[2]}.${parts[3] || ''}`)) {
        return `${parts[2]}.${parts[3] || ''}`
      }
    }

    return null
  } catch (error) {
    console.error('Error extracting GA Client ID:', error)
    return null
  }
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

/**
 * Capture UTM parameters from current URL and store in sessionStorage
 * Also captures first-touch attribution in localStorage
 * Call this on initial page load (in layout or _app)
 */
export function captureUTMsFromURL(): UTMData {
  if (typeof window === 'undefined') return {}

  try {
    const urlParams = new URLSearchParams(window.location.search)
    const utmData: UTMData = {}

    // Capture UTM parameters from URL (LAST TOUCH)
    UTM_PARAMS.forEach((param) => {
      const rawValue = urlParams.get(param)
      if (rawValue) {
        const value = sanitizeUTMValue(rawValue)
        if (value) {
          utmData[param] = value
          sessionStorage.setItem(param, value)
        }
      }
    })

    // Capture FIRST TOUCH attribution in localStorage (persists across sessions)
    // Only set if not already set (i.e., this is truly the first visit)
    const hasFirstTouch = localStorage.getItem(STORAGE_KEYS.FIRST_TOUCH_TIMESTAMP)
    if (!hasFirstTouch) {
      const firstTouchTimestamp = new Date().toISOString()
      localStorage.setItem(STORAGE_KEYS.FIRST_TOUCH_TIMESTAMP, firstTouchTimestamp)

      // Store first-touch UTMs (with sanitization)
      const source = sanitizeUTMValue(urlParams.get('utm_source') || '') || 'direct'
      const medium = sanitizeUTMValue(urlParams.get('utm_medium') || '') || (document.referrer ? 'referral' : 'none')
      const campaign = sanitizeUTMValue(urlParams.get('utm_campaign') || '') || 'organic'

      localStorage.setItem(STORAGE_KEYS.FIRST_TOUCH_SOURCE, source)
      localStorage.setItem(STORAGE_KEYS.FIRST_TOUCH_MEDIUM, medium)
      localStorage.setItem(STORAGE_KEYS.FIRST_TOUCH_CAMPAIGN, campaign)

      const utmTerm = sanitizeUTMValue(urlParams.get('utm_term') || '')
      if (utmTerm) {
        localStorage.setItem(STORAGE_KEYS.FIRST_TOUCH_TERM, utmTerm)
      }

      const utmContent = sanitizeUTMValue(urlParams.get('utm_content') || '')
      if (utmContent) {
        localStorage.setItem(STORAGE_KEYS.FIRST_TOUCH_CONTENT, utmContent)
      }

      utmData.first_touch_timestamp = firstTouchTimestamp
    }

    // Capture GA4 Client ID
    const gaClientId = getGA4ClientID()
    if (gaClientId) {
      localStorage.setItem(STORAGE_KEYS.GA_CLIENT_ID, gaClientId)
      utmData.ga_client_id = gaClientId
    }

    // Capture landing page on first visit
    if (!sessionStorage.getItem(STORAGE_KEYS.LANDING_PAGE)) {
      const landingPage = window.location.href
      sessionStorage.setItem(STORAGE_KEYS.LANDING_PAGE, landingPage)
      utmData.landing_page = landingPage
    }

    // Capture referrer on first visit
    if (!sessionStorage.getItem(STORAGE_KEYS.REFERRER)) {
      const referrer = document.referrer || 'Direct'
      sessionStorage.setItem(STORAGE_KEYS.REFERRER, referrer)
      utmData.referrer = referrer
    }

    // Capture first visit timestamp
    if (!sessionStorage.getItem(STORAGE_KEYS.FIRST_VISIT)) {
      const timestamp = new Date().toISOString()
      sessionStorage.setItem(STORAGE_KEYS.FIRST_VISIT, timestamp)
      utmData.first_visit = timestamp
    }

    // Debug log - will be removed after testing
    if (Object.keys(utmData).length > 0) {
      console.log('✅ UTM Parameters Captured:', utmData)
    }

    return utmData
  } catch (error) {
    console.error('Error capturing UTM parameters:', error)
    return {}
  }
}

/**
 * Retrieve stored UTM parameters for form submission
 * Returns BOTH first-touch (original source) and last-touch (current session) attribution
 * Call this when user submits a form
 */
export function getStoredUTMs(): UTMData {
  if (typeof window === 'undefined') return {}

  try {
    const utmData: UTMData = {}

    // Retrieve LAST TOUCH UTM parameters (current session)
    UTM_PARAMS.forEach((param) => {
      const value = sessionStorage.getItem(param)
      if (value) {
        utmData[param] = value
      }
    })

    // Retrieve FIRST TOUCH attribution (persisted across sessions)
    const firstTouchSource = localStorage.getItem(STORAGE_KEYS.FIRST_TOUCH_SOURCE)
    const firstTouchMedium = localStorage.getItem(STORAGE_KEYS.FIRST_TOUCH_MEDIUM)
    const firstTouchCampaign = localStorage.getItem(STORAGE_KEYS.FIRST_TOUCH_CAMPAIGN)
    const firstTouchTerm = localStorage.getItem(STORAGE_KEYS.FIRST_TOUCH_TERM)
    const firstTouchContent = localStorage.getItem(STORAGE_KEYS.FIRST_TOUCH_CONTENT)
    const firstTouchTimestamp = localStorage.getItem(STORAGE_KEYS.FIRST_TOUCH_TIMESTAMP)

    if (firstTouchSource) utmData.first_touch_source = firstTouchSource
    if (firstTouchMedium) utmData.first_touch_medium = firstTouchMedium
    if (firstTouchCampaign) utmData.first_touch_campaign = firstTouchCampaign
    if (firstTouchTerm) utmData.first_touch_term = firstTouchTerm
    if (firstTouchContent) utmData.first_touch_content = firstTouchContent
    if (firstTouchTimestamp) utmData.first_touch_timestamp = firstTouchTimestamp

    // Retrieve GA Client ID
    const gaClientId = localStorage.getItem(STORAGE_KEYS.GA_CLIENT_ID) || getGA4ClientID()
    if (gaClientId) {
      utmData.ga_client_id = gaClientId
    }

    // Retrieve landing page
    const landingPage = sessionStorage.getItem(STORAGE_KEYS.LANDING_PAGE)
    if (landingPage) {
      utmData.landing_page = landingPage
    }

    // Retrieve referrer
    const referrer = sessionStorage.getItem(STORAGE_KEYS.REFERRER)
    if (referrer) {
      utmData.referrer = referrer
    }

    // Retrieve first visit timestamp
    const firstVisit = sessionStorage.getItem(STORAGE_KEYS.FIRST_VISIT)
    if (firstVisit) {
      utmData.first_visit = firstVisit
    }

    return utmData
  } catch (error) {
    console.error('Error retrieving stored UTM parameters:', error)
    return {}
  }
}

/**
 * Get current page and referrer information
 * Use this at form submission to capture user journey
 */
export function getCurrentPageInfo() {
  if (typeof window === 'undefined') {
    return {
      current_page: '',
      current_referrer: ''
    }
  }

  return {
    current_page: window.location.href,
    current_referrer: document.referrer || 'Direct'
  }
}

/**
 * Clear stored UTM data (useful for testing or after successful conversion)
 */
export function clearStoredUTMs(): void {
  if (typeof window === 'undefined') return

  try {
    UTM_PARAMS.forEach((param) => {
      sessionStorage.removeItem(param)
    })
    sessionStorage.removeItem(STORAGE_KEYS.LANDING_PAGE)
    sessionStorage.removeItem(STORAGE_KEYS.REFERRER)
    sessionStorage.removeItem(STORAGE_KEYS.FIRST_VISIT)
  } catch (error) {
    console.error('Error clearing stored UTM parameters:', error)
  }
}

/**
 * Create WhatsApp lead attribution data
 * Use this when creating contacts from WhatsApp integration
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
 * Validate and enrich UTM data
 * Ensures all UTM fields have values (fills with defaults if missing)
 */
export function enrichUTMData(utmData: UTMData): Required<Omit<UTMData, 'first_visit'>> {
  const pageInfo = getCurrentPageInfo()

  return {
    utm_source: utmData.utm_source || 'direct',
    utm_medium: utmData.utm_medium || 'none',
    utm_campaign: utmData.utm_campaign || 'organic',
    utm_term: utmData.utm_term || '',
    utm_content: utmData.utm_content || '',
    landing_page: utmData.landing_page || pageInfo.current_page,
    referrer: utmData.referrer || pageInfo.current_referrer,
    // First-touch attribution fields
    first_touch_source: utmData.first_touch_source || '',
    first_touch_medium: utmData.first_touch_medium || '',
    first_touch_campaign: utmData.first_touch_campaign || '',
    first_touch_term: utmData.first_touch_term || '',
    first_touch_content: utmData.first_touch_content || '',
    first_touch_timestamp: utmData.first_touch_timestamp || '',
    first_touch_referrer: utmData.first_touch_referrer || '',
    // GA Client ID
    ga_client_id: utmData.ga_client_id || ''
  }
}

/**
 * Debug function to log current UTM state
 * Useful for troubleshooting tracking issues
 */
export function debugUTMState(): void {
  if (typeof window === 'undefined') return

  const stored = getStoredUTMs()
  const current = getCurrentPageInfo()

  console.log('🔍 UTM Tracking Debug:', {
    stored_utms: stored,
    current_page_info: current,
    session_storage: {
      utm_source: sessionStorage.getItem('utm_source'),
      utm_medium: sessionStorage.getItem('utm_medium'),
      utm_campaign: sessionStorage.getItem('utm_campaign'),
      landing_page: sessionStorage.getItem(STORAGE_KEYS.LANDING_PAGE),
      referrer: sessionStorage.getItem(STORAGE_KEYS.REFERRER)
    }
  })
}
