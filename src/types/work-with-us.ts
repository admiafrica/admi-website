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

/** CMS shape: icon stored as string ID, resolved at render time */
export interface WorkBenefitCMS {
  icon: string
  title: string
  description: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
}

/** Full page data shape returned by the /api/v3/work-with-us endpoint */
export interface WorkWithUsPageData {
  faculty: FacultyMember[]
  openings: JobOpening[]
  benefits: WorkBenefitCMS[]
  teamMembers: TeamMember[]
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}
