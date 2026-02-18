/**
 * Student Support Page Types
 */

export interface SupportCard {
  title: string
  desc: string
}

/** CMS shape: icon stored as string ID, resolved at render time via getIcon() */
export interface SupportTabCMS {
  key: string
  label: string
  icon: string
  color: string
  title: string
  desc: string
  cards: SupportCard[]
}

export interface FeeCard {
  badge: string
  badgeBg: string
  badgeColor: string
  title: string
  price: string
  priceColor: string
  details: string
  btnBg: string
}

export interface HelpDesk {
  title: string
  desc: string
}

/** Full page data shape returned by the /api/v3/student-support endpoint */
export interface StudentSupportPageData {
  supportTabs: SupportTabCMS[]
  feeCards: FeeCard[]
  helpDesks: HelpDesk[]
  seoTitle: string
  seoDescription: string
}
