'use client'

import { useEffect } from 'react'

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
 * Meta Pixel Event Tracking Component
 *
 * Automatically fires Meta Pixel events for remarketing and conversion tracking.
 * Use this component on course pages to track user interactions for:
 * - Dynamic Product Ads (DPA)
 * - Custom Audiences
 * - Conversion optimization
 *
 * @see https://developers.facebook.com/docs/meta-pixel/reference
 */
export function MetaPixelEvents({ eventName, eventData }: MetaPixelEventsProps) {
  useEffect(() => {
    // Check if Meta Pixel (fbq) is loaded via GTM
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const fbq = (window as any).fbq

      // Fire the event
      fbq('track', eventName, eventData)

      console.log(`[Meta Pixel] ${eventName} event fired:`, eventData)
    } else {
      console.warn('[Meta Pixel] fbq not found - ensure Meta Pixel is loaded via GTM')
    }
  }, [eventName, eventData])

  return null // This component doesn't render anything
}

/**
 * Course View Event - Use on course detail pages
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
 * Enquiry Form Event - Use when user submits enquiry
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
 * Application Started Event - Use when user clicks "Apply Now"
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
