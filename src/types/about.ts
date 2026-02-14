/**
 * About Page Types
 */

export interface AboutStat {
  value: string
  label: string
  color: string
}

export interface AboutValue {
  title: string
  desc: string
  color: string
  bg: string
}

export interface AboutTimelineEvent {
  year: string
  title: string
  desc: string
  color: string
  border: string
  highlight?: boolean
}

export interface AboutFounder {
  name: string
  role: string
  desc: string
  image: string
}

export interface AboutBoardMember {
  name: string
  role: string
  desc: string
  color: string
}

export interface AboutTeamMember {
  name: string
  role: string
  roleColor: string
  desc: string
  image: string
}

export interface AboutFacility {
  name: string
  desc: string
  image: string
  wide?: boolean
}

export interface AboutPartner {
  name: string
  desc: string
  bg: string
}
