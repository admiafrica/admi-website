/**
 * Fellowship Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface FellowshipBenefit {
  Icon: Icon
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
