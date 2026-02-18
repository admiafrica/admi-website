/**
 * Lightweight GA4 event tracking helper.
 * Fires via dataLayer (GTM) with gtag fallback.
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return

  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params })
  } else if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params)
  }
}

/**
 * Track a CTA button click with standardised parameters.
 */
export function trackCTAClick(
  ctaType: 'apply' | 'prospectus' | 'whatsapp' | 'enquiry' | 'banner',
  location: string,
  courseName?: string
) {
  trackEvent('cta_click', {
    cta_type: ctaType,
    cta_location: location,
    course_name: courseName || '',
  })
}

/**
 * Fire Meta Pixel event (if pixel is loaded).
 */
export function trackMetaEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params)
  }
}
