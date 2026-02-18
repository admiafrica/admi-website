/**
 * Student Life Page Types
 */

/** CMS shape: icon stored as string ID, resolved at render time via getIcon() */
export interface HubCardCMS {
  icon: string
  title: string
  desc: string
  link: string
  linkText: string
  image: string
}

/** CMS shape: icon stored as string ID */
export interface CampusFeatureCMS {
  icon: string
  title: string
  desc: string
}

/** Full page data shape returned by the /api/v3/student-life endpoint */
export interface StudentLifePageData {
  hubCards: HubCardCMS[]
  campusFeatures: CampusFeatureCMS[]
  seoTitle: string
  seoDescription: string
}
