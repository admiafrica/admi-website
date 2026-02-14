/**
 * Student Support Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface SupportCard {
  title: string
  desc: string
}

export interface SupportTab {
  key: string
  label: string
  Icon: Icon
  color: string
  title: string
  desc: string
  cards: SupportCard[]
}

export interface FeeCard {
  badge: string
  badgeBg: string
  badgeColor: string
  title: string
  price: string
  priceColor: string
  details: string
  btnBg: string
}

export interface HelpDesk {
  title: string
  desc: string
}
