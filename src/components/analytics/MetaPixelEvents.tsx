'use client'

import { useEffect, useRef } from 'react'

/**
 * Generate a unique event ID for deduplication between
 * browser-side Meta Pixel and server-side CAPI (via sGTM).
 */
function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

interface MetaPixelEventsProps {
  eventName: 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Lead' | 'CompleteRegistration'
  eventData: {
    content_name?: string
    content_ids?: string[]
    content_type?: 'product' | 'product_group'
    content_category?: string
    value?: number
    currency?: string
    contents?: Array<{
      id: string
      quantity: number
    }>
  }
}

/**
 * Meta Pixel Event Tracking Component (with sGTM CAPI deduplication)
 *
 * Fires the event via both:
 * 1. Browser-side fbq() — for immediate pixel tracking
 * 2. dataLayer push — so sGTM can forward to Meta CAPI server-side
 *
 * Both events share the same event_id so Meta deduplicates them.
 *
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
 */
export function MetaPixelEvents({ eventName, eventData }: MetaPixelEventsProps) {
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true

    if (typeof window === 'undefined') return

    const eventId = generateEventId()

    // 1. Browser-side pixel with event_id for deduplication
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, eventData, { eventID: eventId })
    }

    // 2. Push to dataLayer so sGTM can forward to Meta CAPI
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: `meta_${eventName.toLowerCase()}`,
      meta_event_name: eventName,
      meta_event_id: eventId,
      ...eventData,
    })
  }, [eventName, eventData])

  return null
}

/**
 * Course View Event — fires on course detail pages.
 * Provides product data for Meta Dynamic Product Ads (DPA) on Instagram.
 */
export function CourseViewEvent({
  courseId,
  courseName,
  price,
  currency,
  category
}: {
  courseId: string
  courseName: string
  price: number
  currency: string
  category?: string
}) {
  return (
    <MetaPixelEvents
      eventName="ViewContent"
      eventData={{
        content_name: courseName,
        content_ids: [courseId],
        content_type: 'product',
        content_category: category,
        value: price,
        currency: currency,
        contents: [{ id: courseId, quantity: 1 }]
      }}
    />
  )
}

/**
 * Enquiry Form Event — fires when user submits enquiry.
 */
export function EnquiryEvent({
  courseId,
  courseName,
  price,
  currency
}: {
  courseId: string
  courseName: string
  price: number
  currency: string
}) {
  return (
    <MetaPixelEvents
      eventName="Lead"
      eventData={{
        content_name: courseName,
        content_ids: [courseId],
        content_type: 'product',
        value: price,
        currency: currency
      }}
    />
  )
}

/**
 * Application Started Event — fires when user clicks "Apply Now".
 */
export function ApplicationStartedEvent({
  courseId,
  courseName,
  price,
  currency
}: {
  courseId: string
  courseName: string
  price: number
  currency: string
}) {
  return (
    <MetaPixelEvents
      eventName="InitiateCheckout"
      eventData={{
        content_name: courseName,
        content_ids: [courseId],
        content_type: 'product',
        value: price,
        currency: currency
      }}
    />
  )
}
