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
  FIRST_VISIT: 'admi_first_visit'
}

export interface UTMData {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  landing_page?: string
  referrer?: string
  first_visit?: string
}

/**
 * Capture UTM parameters from current URL and store in sessionStorage
 * Call this on initial page load (in layout or _app)
 */
export function captureUTMsFromURL(): UTMData {
  if (typeof window === 'undefined') return {}

  try {
    const urlParams = new URLSearchParams(window.location.search)
    const utmData: UTMData = {}

    // Capture UTM parameters from URL
    UTM_PARAMS.forEach((param) => {
      const value = urlParams.get(param)
      if (value) {
        utmData[param] = value
        sessionStorage.setItem(param, value)
      }
    })

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
 * Call this when user submits a form
 */
export function getStoredUTMs(): UTMData {
  if (typeof window === 'undefined') return {}

  try {
    const utmData: UTMData = {}

    // Retrieve stored UTM parameters
    UTM_PARAMS.forEach((param) => {
      const value = sessionStorage.getItem(param)
      if (value) {
        utmData[param] = value
      }
    })

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
    referrer: utmData.referrer || pageInfo.current_referrer
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
