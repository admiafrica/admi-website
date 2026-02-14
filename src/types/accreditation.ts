/**
 * Accreditation Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface Accreditation {
  title: string
  subtitle: string
  description: string
  Icon: Icon
  borderColor: string
  accentColor: string
  iconBg: string
  tagBg: string
  tags: string[]
}

export interface QualityStandard {
  title: string
  description: string
  Icon: Icon
  iconColor: string
}

export interface AccreditationBenefit {
  title: string
  description: string
  Icon: Icon
  iconColor: string
}
