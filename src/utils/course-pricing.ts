/**
 * Course pricing configuration for structured data and Facebook catalog
 *
 * This file contains pricing information for all ADMI courses.
 * Prices are in KES (Kenyan Shillings) unless specified otherwise.
 */

export interface CoursePricing {
  price: number
  currency: string
  discountedPrice?: number
}

// Default pricing by program type
export const DEFAULT_PRICING = {
  DIPLOMA: { price: 450000, currency: 'KES' },
  CERTIFICATE: { price: 250000, currency: 'KES' },
  SHORT_COURSE: { price: 75000, currency: 'KES' }
}

// Specific course pricing (overrides defaults)
export const COURSE_PRICING: Record<string, CoursePricing> = {
  // Diploma Programs (2 year)
  'film-production': { price: 450000, currency: 'KES' },
  animation: { price: 450000, currency: 'KES' },
  'graphic-design': { price: 450000, currency: 'KES' },
  'music-production': { price: 450000, currency: 'KES' },
  'sound-engineering': { price: 450000, currency: 'KES' },
  photography: { price: 450000, currency: 'KES' },
  'digital-marketing': { price: 450000, currency: 'KES' },
  'ui-ux-design': { price: 450000, currency: 'KES' },
  'video-game-development': { price: 450000, currency: 'KES' },
  'entertainment-business': { price: 450000, currency: 'KES' }

  // Certificate Programs (1 year)
  // Add certificate course slugs here with pricing
}

/**
 * Get pricing for a course by slug
 * @param courseSlug - The course slug
 * @param awardLevel - Optional award level (diploma, certificate, etc)
 */
export function getCoursePricing(courseSlug: string, awardLevel?: string): CoursePricing | null {
  // Remove location suffix if present (e.g., "film-production-nairobi" -> "film-production")
  const baseSlug = courseSlug.replace(/-(?:nairobi|mombasa|kisumu|nakuru|eldoret)$/, '')

  // Check specific pricing first
  if (COURSE_PRICING[baseSlug]) {
    return COURSE_PRICING[baseSlug]
  }

  // Fall back to default pricing based on award level
  if (awardLevel) {
    const level = awardLevel.toLowerCase()
    if (level.includes('diploma')) {
      return DEFAULT_PRICING.DIPLOMA
    } else if (level.includes('certificate')) {
      return DEFAULT_PRICING.CERTIFICATE
    }
  }

  // No pricing available
  return null
}
