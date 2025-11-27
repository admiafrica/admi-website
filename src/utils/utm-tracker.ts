/**
 * UTM Parameter Tracker
 * Captures UTM parameters from URL and persists them in sessionStorage
 * for attribution tracking across the user's session
 */

// UTM parameter keys we track
const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',         // Google Click ID
  'campaignid',    // From {campaignid}
  'adgroupid',     // From {adgroupid}
  'creative',      // From {creative} - Ad ID
  'matchtype',     // From {matchtype}
  'network',       // From {network}
  'device'         // From {device}
]

const UTM_STORAGE_KEY = 'admi_utm_params'
const UTM_FIRST_TOUCH_KEY = 'admi_utm_first_touch'

/**
 * Get UTM parameters from the current URL
 */
export function getUTMFromURL(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  const utmParams: Record<string, string> = {}
  
  UTM_PARAMS.forEach(param => {
    const value = params.get(param)
    if (value) {
      utmParams[param] = value
    }
  })
  
  return utmParams
}

/**
 * Get stored UTM parameters from sessionStorage
 */
export function getStoredUTM(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * Get first-touch UTM parameters from localStorage
 */
export function getFirstTouchUTM(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  
  try {
    const stored = localStorage.getItem(UTM_FIRST_TOUCH_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * Save UTM parameters to sessionStorage (last-touch)
 */
export function saveUTMToSession(params: Record<string, string>): void {
  if (typeof window === 'undefined') return
  
  try {
    const existing = getStoredUTM()
    const merged = { ...existing, ...params }
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged))
  } catch (e) {
    console.warn('Failed to save UTM params to sessionStorage:', e)
  }
}

/**
 * Save first-touch UTM parameters to localStorage (only if not already set)
 */
export function saveFirstTouchUTM(params: Record<string, string>): void {
  if (typeof window === 'undefined') return
  
  try {
    const existing = getFirstTouchUTM()
    if (Object.keys(existing).length === 0 && Object.keys(params).length > 0) {
      localStorage.setItem(UTM_FIRST_TOUCH_KEY, JSON.stringify({
        ...params,
        captured_at: new Date().toISOString()
      }))
    }
  } catch (e) {
    console.warn('Failed to save first-touch UTM params:', e)
  }
}

/**
 * Initialize UTM tracking - call this on page load
 * Captures UTM from URL and persists to storage
 */
export function initUTMTracking(): Record<string, string> {
  const urlParams = getUTMFromURL()
  
  if (Object.keys(urlParams).length > 0) {
    saveUTMToSession(urlParams)
    saveFirstTouchUTM(urlParams)
  }
  
  return getStoredUTM()
}

/**
 * Get UTM parameters for form submission
 * Returns the last-touch attribution params
 */
export function getUTMForSubmission(): Record<string, string> {
  const stored = getStoredUTM()
  const urlParams = getUTMFromURL()
  
  // Merge with URL params taking precedence (if user arrived via different link)
  return {
    utm_source: urlParams.utm_source || stored.utm_source || 'direct',
    utm_medium: urlParams.utm_medium || stored.utm_medium || 'none',
    utm_campaign: urlParams.utm_campaign || stored.utm_campaign || '',
    utm_term: urlParams.utm_term || stored.utm_term || '',
    utm_content: urlParams.utm_content || stored.utm_content || '',
    gclid: urlParams.gclid || stored.gclid || '',
    campaignid: urlParams.campaignid || stored.campaignid || '',
    adgroupid: urlParams.adgroupid || stored.adgroupid || '',
    creative: urlParams.creative || stored.creative || '',
    matchtype: urlParams.matchtype || stored.matchtype || '',
    network: urlParams.network || stored.network || '',
    device: urlParams.device || stored.device || ''
  }
}

/**
 * Get both first-touch and last-touch attribution
 * Useful for understanding the full customer journey
 */
export function getFullAttribution(): {
  firstTouch: Record<string, string>
  lastTouch: Record<string, string>
} {
  return {
    firstTouch: getFirstTouchUTM(),
    lastTouch: getUTMForSubmission()
  }
}

/**
 * Format UTM data for CRM submission
 * Creates flat attributes object for Brevo
 */
export function formatUTMForCRM(): Record<string, string> {
  const { firstTouch, lastTouch } = getFullAttribution()
  
  return {
    // Last touch (conversion attribution)
    UTM_SOURCE: lastTouch.utm_source,
    UTM_MEDIUM: lastTouch.utm_medium,
    UTM_CAMPAIGN: lastTouch.utm_campaign,
    UTM_TERM: lastTouch.utm_term,
    UTM_CONTENT: lastTouch.utm_content,
    GCLID: lastTouch.gclid,
    
    // Google Ads specific
    GOOGLE_CAMPAIGN_ID: lastTouch.campaignid,
    GOOGLE_ADGROUP_ID: lastTouch.adgroupid,
    GOOGLE_AD_ID: lastTouch.creative,
    GOOGLE_MATCH_TYPE: lastTouch.matchtype,
    GOOGLE_NETWORK: lastTouch.network,
    GOOGLE_DEVICE: lastTouch.device,
    
    // First touch (discovery attribution)
    FIRST_UTM_SOURCE: firstTouch.utm_source || '',
    FIRST_UTM_MEDIUM: firstTouch.utm_medium || '',
    FIRST_UTM_CAMPAIGN: firstTouch.utm_campaign || '',
    FIRST_CAPTURED_AT: firstTouch.captured_at || ''
  }
}

/**
 * React hook to use UTM tracking
 */
export function useUTMTracking() {
  if (typeof window === 'undefined') {
    return {
      utmParams: {},
      firstTouch: {},
      lastTouch: {},
      getForSubmission: () => ({})
    }
  }
  
  // Initialize on first call
  initUTMTracking()
  
  return {
    utmParams: getStoredUTM(),
    firstTouch: getFirstTouchUTM(),
    lastTouch: getUTMForSubmission(),
    getForSubmission: getUTMForSubmission
  }
}
