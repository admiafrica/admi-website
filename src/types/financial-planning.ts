/**
 * Financial Planning Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface FeeCard {
  title: string
  price: string
  duration: string
  badge: string
  borderColor: string
  features: string[]
}

export interface PaymentPlan {
  title: string
  subtitle: string
  description: string
  tag: string | null
  tagColor: string | null
}

export interface Scholarship {
  title: string
  description: string
  coverage: string
  bgColor: string
  iconColor: string
  Icon: Icon
}

/** CMS shape: icon stored as string ID, resolved at render time */
export interface ScholarshipCMS {
  title: string
  description: string
  coverage: string
  bgColor: string
  iconColor: string
  icon: string
}

export interface FinancialFaqItem {
  q: string
  a: string
}

/** Full page data shape returned by the /api/v3/financial-planning endpoint */
export interface FinancialPlanningPageData {
  feeCards: FeeCard[]
  paymentPlans: PaymentPlan[]
  scholarships: ScholarshipCMS[]
  faqItems: FinancialFaqItem[]
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}
