/**
 * Alumni Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface AlumniStat {
  value: string
  label: string
}

export interface FeaturedAlumni {
  name: string
  role: string
  programme: string
  quote: string
  image: string
}

export interface CompanyRow {
  names: string[]
}

export interface NetworkBenefit {
  icon: Icon
  title: string
  desc: string
}
