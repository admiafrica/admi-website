/**
 * Accreditation Page Types
 */

/** CMS shape: icon stored as string ID, resolved at render time via getIcon() */
export interface AccreditationCMS {
  title: string
  subtitle: string
  description: string
  icon: string
  borderColor: string
  accentColor: string
  iconBg: string
  tagBg: string
  tags: string[]
}

/** CMS shape: icon stored as string ID */
export interface QualityStandardCMS {
  title: string
  description: string
  icon: string
  iconColor: string
}

/** CMS shape: icon stored as string ID */
export interface AccreditationBenefitCMS {
  title: string
  description: string
  icon: string
  iconColor: string
}

/** Full page data shape returned by the /api/v3/accreditation endpoint */
export interface AccreditationPageData {
  accreditations: AccreditationCMS[]
  qualityStandards: QualityStandardCMS[]
  benefits: AccreditationBenefitCMS[]
  seoTitle: string
  seoDescription: string
}
