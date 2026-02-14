/**
 * Work With Us Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface FacultyMember {
  name: string
  title: string
  description: string
  image: string
}

export interface JobOpening {
  title: string
  type: string
  location: string
  posted: string
  description: string
}

export interface WorkBenefit {
  icon: Icon
  title: string
  description: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
}
