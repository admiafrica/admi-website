/**
 * ADMI Attribution Tracking Script
 * Loaded via Google Tag Manager
 * Captures first-touch and last-touch attribution data
 */
;(function () {
  'use strict'

  const STORAGE_KEY = 'admi_attribution'
  const FIRST_TOUCH_KEY = 'admi_first_touch'
  const SESSION_KEY = 'admi_session'
  const COOKIE_DAYS = 30

  // UTM parameters to track
  const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

  // Google Ads click IDs
  const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid']

  /**
   * Get URL parameters
   */
  function getUrlParams() {
    const params = {}
    const search = window.location.search.substring(1)
    if (!search) return params

    const pairs = search.split('&')
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=')
      if (pair.length === 2) {
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
      }
    }
    return params
  }

  /**
   * Set cookie with expiration
   */
  function setCookie(name, value, days) {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value)) + expires + '; path=/; SameSite=Lax'
  }

  /**
   * Get cookie value
   */
  function getCookie(name) {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(nameEQ) === 0) {
        try {
          return JSON.parse(decodeURIComponent(c.substring(nameEQ.length)))
        } catch (e) {
          return null
        }
      }
    }
    return null
  }

  /**
   * Store in localStorage with fallback to cookie
   */
  function store(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      setCookie(key, value, COOKIE_DAYS)
    }
  }

  /**
   * Retrieve from localStorage with fallback to cookie
   */
  function retrieve(key) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : getCookie(key)
    } catch (e) {
      return getCookie(key)
    }
  }

  /**
   * Determine traffic source from referrer
   */
  function getSourceFromReferrer(referrer) {
    if (!referrer) return { source: 'direct', medium: 'none' }

    let hostname = ''
    try {
      hostname = new URL(referrer).hostname.toLowerCase()
    } catch (e) {
      return { source: 'direct', medium: 'none' }
    }

    // Search engines
    if (hostname.includes('google.')) return { source: 'google', medium: 'organic' }
    if (hostname.includes('bing.')) return { source: 'bing', medium: 'organic' }
    if (hostname.includes('yahoo.')) return { source: 'yahoo', medium: 'organic' }
    if (hostname.includes('duckduckgo.')) return { source: 'duckduckgo', medium: 'organic' }

    // Social
    if (hostname.includes('facebook.') || hostname.includes('fb.')) return { source: 'facebook', medium: 'social' }
    if (hostname.includes('instagram.')) return { source: 'instagram', medium: 'social' }
    if (hostname.includes('twitter.') || hostname.includes('t.co')) return { source: 'twitter', medium: 'social' }
    if (hostname.includes('linkedin.')) return { source: 'linkedin', medium: 'social' }
    if (hostname.includes('youtube.')) return { source: 'youtube', medium: 'social' }
    if (hostname.includes('tiktok.')) return { source: 'tiktok', medium: 'social' }
    if (hostname.includes('whatsapp.')) return { source: 'whatsapp', medium: 'social' }

    // Self-referral
    if (hostname.includes('admi.africa') || hostname.includes('admi.ac.ke')) {
      return { source: 'direct', medium: 'none' }
    }

    return { source: hostname, medium: 'referral' }
  }

  /**
   * Build attribution data from current page
   */
  function buildAttributionData() {
    const params = getUrlParams()
    const referrer = document.referrer
    const data = {
      timestamp: new Date().toISOString(),
      landing_page: window.location.pathname,
      page_url: window.location.href,
      referrer: referrer || ''
    }

    // Check for UTM parameters
    let hasUtm = false
    for (let i = 0; i < UTM_PARAMS.length; i++) {
      const param = UTM_PARAMS[i]
      if (params[param]) {
        data[param] = params[param]
        hasUtm = true
      }
    }

    // Check for click IDs (Google Ads, Facebook, etc.)
    for (let j = 0; j < CLICK_IDS.length; j++) {
      const clickId = CLICK_IDS[j]
      if (params[clickId]) {
        data[clickId] = params[clickId]

        // Auto-detect source from click ID
        if (clickId === 'gclid' || clickId === 'gbraid' || clickId === 'wbraid') {
          if (!data.utm_source) data.utm_source = 'google'
          if (!data.utm_medium) data.utm_medium = 'cpc'
        }
        if (clickId === 'fbclid') {
          if (!data.utm_source) data.utm_source = 'facebook'
          if (!data.utm_medium) data.utm_medium = 'cpc'
        }
        if (clickId === 'msclkid') {
          if (!data.utm_source) data.utm_source = 'bing'
          if (!data.utm_medium) data.utm_medium = 'cpc'
        }
      }
    }

    // If no UTM/click params, derive from referrer
    if (!hasUtm && !data.gclid && !data.fbclid) {
      const derived = getSourceFromReferrer(referrer)
      data.utm_source = derived.source
      data.utm_medium = derived.medium
    }

    return data
  }

  /**
   * Main tracking function
   */
  function trackAttribution() {
    const currentData = buildAttributionData()

    // Always update last-touch (session) attribution
    store(SESSION_KEY, currentData)
    store(STORAGE_KEY, currentData)

    // Only set first-touch if not already set
    const firstTouch = retrieve(FIRST_TOUCH_KEY)
    if (!firstTouch) {
      store(FIRST_TOUCH_KEY, currentData)
    }

    // Push to dataLayer for GTM
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'attribution_captured',
      attribution: {
        first_touch: retrieve(FIRST_TOUCH_KEY),
        last_touch: currentData
      }
    })

    // Log for debugging (remove in production if desired)
    if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
      console.log('[ADMI Attribution] First Touch:', retrieve(FIRST_TOUCH_KEY))
      console.log('[ADMI Attribution] Last Touch:', currentData)
    }
  }

  /**
   * Get attribution data (for forms to use)
   */
  function getAttribution() {
    return {
      first_touch: retrieve(FIRST_TOUCH_KEY) || {},
      last_touch: retrieve(STORAGE_KEY) || {},
      session: retrieve(SESSION_KEY) || {}
    }
  }

  // Expose globally for forms
  window.ADMIAttribution = {
    get: getAttribution,
    getFirstTouch: function () {
      return retrieve(FIRST_TOUCH_KEY) || {}
    },
    getLastTouch: function () {
      return retrieve(STORAGE_KEY) || {}
    },
    track: trackAttribution
  }

  // Run tracking on load
  trackAttribution()
})()
