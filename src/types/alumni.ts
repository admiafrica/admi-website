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

/** CMS-shaped network benefit where icon is a string ID instead of a component */
export interface NetworkBenefitCMS {
  icon: string
  title: string
  desc: string
}

/** Shape of data returned by getStaticProps for the alumni page */
export interface AlumniPageData {
  stats: AlumniStat[]
  featuredAlumni: FeaturedAlumni[]
  companyRows: CompanyRow[]
  networkBenefits: NetworkBenefitCMS[]
}
