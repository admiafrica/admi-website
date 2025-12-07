/**
 * Academic Pathways and Partner Types
 */

export interface AcademicPathwaysBenefit {
  title: string
  description: string
  icon: string
}

export interface AcademicPathwaysPartner {
  sys: {
    id: string
    type: string
  }
  fields: {
    partnerName?: string
    name?: string // Fallback for compatibility
    description?: string
    logo?: {
      sys: {
        id: string
      }
    }
    websiteUrl?: string
    website?: string // Fallback for compatibility
    partnerType?: string
    type?: string // Fallback for compatibility
  }
}

export interface AcademicPathwaysPage {
  sys: {
    id: string
    type: string
  }
  fields: {
    title: string
    slug: string
    description: string
    heroTitle: string
    heroDescription: string
    heroImage?: {
      fields: {
        file: {
          url: string
        }
      }
    }
    partners: AcademicPathwaysPartner[]
    benefits: AcademicPathwaysBenefit[]
    ctaText: string
    ctaUrl: string
    metadata: {
      metaTitle: string
      metaDescription: string
      keywords: string
    }
    benefitsTitle: string
    woolfMembershipTitle: string
    woolfMembershipDescription: string
    woolfMembershipSecondDescription: string
    globalOpportunitiesTitle: string
    globalOpportunitiesDescription: string
    globalOpportunitiesSecondDescription: string
  }
}

export interface AcademicPathwaysResponse {
  items: AcademicPathwaysPage[]
  includes?: {
    Asset?: Array<{
      sys: { id: string }
      fields: {
        file: {
          url: string
        }
      }
    }>
    Entry?: AcademicPathwaysPartner[]
  }
}
