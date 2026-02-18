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

/* ------------------------------------------------------------------ */
/*  Phase 6 CMS Page Data Types                                        */
/* ------------------------------------------------------------------ */

export interface PathwayStep {
  step: number
  duration: string
  title: string
  description: string
  credits: string
  price: string | null
  certification: string
  borderColor: string
  bgColor: string
}

/** CMS shape: icon stored as string ID, resolved at render time via getIcon() */
export interface ArticulationCardCMS {
  icon: string
  iconColor: string
  iconBg: string
  title: string
  description: string
}

export interface CreditCard {
  value: string
  valueColor: string
  description: string
}

/** Full page data shape returned by the /api/v3/academic-pathways endpoint */
export interface AcademicPathwaysPageData {
  pathwaySteps: PathwayStep[]
  articulationCards: ArticulationCardCMS[]
  creditCards: CreditCard[]
  seoTitle: string
  seoDescription: string
}
