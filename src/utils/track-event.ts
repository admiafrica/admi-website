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
 * Fire Meta Pixel event with sGTM CAPI deduplication.
 * Sends via both browser fbq() and dataLayer (for server-side forwarding).
 */
export function trackMetaEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return

  const eventId = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

  // Browser-side pixel with deduplication event_id
  if (typeof window.fbq === 'function') {
    window.fbq('track', eventName, params, { eventID: eventId })
  }

  // Push to dataLayer so sGTM forwards to Meta CAPI
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: `meta_${eventName.toLowerCase()}`,
    meta_event_name: eventName,
    meta_event_id: eventId,
    ...params,
  })
}
