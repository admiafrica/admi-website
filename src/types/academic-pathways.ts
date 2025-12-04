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
    name: string
    description?: string
    logo?: {
      fields: {
        file: {
          url: string
        }
      }
    }
    website?: string
    type?: string
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
