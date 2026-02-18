/**
 * Fellowship Page Types
 */

/** CMS shape: icon stored as string ID, resolved at render time via getIcon() */
export interface FellowshipBenefitCMS {
  icon: string
  iconColor: string
  title: string
  description: string
}

export interface ApplicationStep {
  number: string
  bgColor: string
  title: string
  description: string
}

/** Full page data shape returned by the /api/v3/fellowship endpoint */
export interface FellowshipPageData {
  benefits: FellowshipBenefitCMS[]
  eligibilityCriteria: string[]
  applicationSteps: ApplicationStep[]
  seoTitle: string
  seoDescription: string
}
