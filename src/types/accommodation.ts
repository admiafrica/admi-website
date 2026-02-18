/**
 * Accommodation Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface Residence {
  name: string
  price: string
  description: string
  image: string
  link?: string
}

export interface Amenity {
  label: string
  Icon: Icon
}

/** CMS shape: icon stored as string ID, resolved at render time */
export interface AmenityCMS {
  label: string
  icon: string
}

export interface BookingStep {
  number: string
  title: string
  description: string
}

/** Full page data shape returned by the /api/v3/accommodation endpoint */
export interface AccommodationPageData {
  heroTitle: string
  heroDescription: string
  heroImage: string
  residences: Residence[]
  amenities: AmenityCMS[]
  bookingSteps: BookingStep[]
  neighborhoodHighlights: string[]
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  ctaButtonUrl: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}
