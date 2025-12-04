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
  DIPLOMA: { price: 145000, currency: 'KES' },
  CERTIFICATE_PROFESSIONAL: { price: 93100, currency: 'KES' },
  CERTIFICATE_FOUNDATIONAL: { price: 93100, currency: 'KES' },
  SHORT_COURSE: { price: 75000, currency: 'KES' }
}

// Specific course pricing (overrides defaults)
export const COURSE_PRICING: Record<string, CoursePricing> = {
  // Diploma Programs (2 year / 5-6 terms + internship) - 145,000 KES per term
  'film-production': { price: 145000, currency: 'KES' },
  'film-and-television-production': { price: 145000, currency: 'KES' },
  'animation-and-motion-graphics': { price: 145000, currency: 'KES' },
  'graphic-design': { price: 145000, currency: 'KES' },
  'music-production': { price: 145000, currency: 'KES' },
  'sound-engineering': { price: 145000, currency: 'KES' },
  photography: { price: 145000, currency: 'KES' },
  'digital-marketing': { price: 145000, currency: 'KES' },
  'ui-ux-design': { price: 145000, currency: 'KES' },
  'video-game-development': { price: 145000, currency: 'KES' },
  'entertainment-business': { price: 145000, currency: 'KES' },
  'digital-content-creation': { price: 145000, currency: 'KES' },

  // Professional Certificates (1 term) - Varies by course
  'digital-marketing-certificate': { price: 47500, currency: 'KES' },
  'graphic-design-certificate': { price: 47500, currency: 'KES' },
  'sports-business': { price: 47500, currency: 'KES' },
  'data-analysis-presentation': { price: 47500, currency: 'KES' },
  'video-production-certificate': { price: 93100, currency: 'KES' },

  // Foundational Certificates (1 term) - 93,100 KES
  'multimedia-certificate': { price: 93100, currency: 'KES' },
  'photography-certificate': { price: 93100, currency: 'KES' },
  'music-sound-certificate': { price: 93100, currency: 'KES' },
  '2d-animation-certificate-rubika': { price: 93100, currency: 'KES' },
  'drawing-fundamentals-certificate': { price: 93100, currency: 'KES' }
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
    } else if (level.includes('foundational') || level.includes('foundation')) {
      return DEFAULT_PRICING.CERTIFICATE_FOUNDATIONAL
    } else if (level.includes('professional')) {
      return DEFAULT_PRICING.CERTIFICATE_PROFESSIONAL
    } else if (level.includes('certificate')) {
      // Default to professional if no type specified
      return DEFAULT_PRICING.CERTIFICATE_PROFESSIONAL
    }
  }

  // No pricing available
  return null
}
