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

export interface FinancialFaqItem {
  q: string
  a: string
}
