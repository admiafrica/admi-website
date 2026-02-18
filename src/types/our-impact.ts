/**
 * Our Impact Page Types
 */

export interface HeroStat {
  value: string
  label: string
  color: string
}

export interface IncomeYearCard {
  badge: string
  badgeBg: string
  badgeColor: string
  value: string
  valueColor: string
  subtitle: string
  subtitleColor: string
  description: string
  descColor: string
  bgColor: string
}

export interface ProgrammeOutcome {
  name: string
  value: string
  color: string
  barWidth: string
  note: string
}

export interface BenchmarkCard {
  value: string
  valueColor: string
  label: string
  labelColor: string
  description: string
  descColor: string
  bgColor: string
}

export interface CareerTimelineItem {
  dotColor: string
  text: string
  textColor: string
}

export interface CareerPathCard {
  percentage: string
  percentColor: string
  label: string
  labelColor: string
  bgColor: string
  borderColor?: string
  timeline: CareerTimelineItem[]
}

export interface CompanyPill {
  name: string
}

export interface AlumniStory {
  image: string
  name: string
  role: string
  roleColor: string
  quote: string
  meta: string
}

export interface AwardTagPill {
  text: string
  textColor: string
  bgColor: string
  borderColor?: string
}

export interface AwardRow {
  bgColor: string
  imageUrl: string
  imageSide: 'left' | 'right'
  badge: string
  badgeColor: string
  badgeBg: string
  title: string
  titleColor: string
  description: string
  descColor: string
  tags: AwardTagPill[]
  stats?: { value: string; label: string }[]
}

export interface MethodologyStat {
  value: string
  label: string
  description: string
}

export interface CtaBottomStat {
  value: string
  label: string
}
