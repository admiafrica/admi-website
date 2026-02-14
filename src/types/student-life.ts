/**
 * Student Life Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface HubCard {
  icon: Icon
  title: string
  desc: string
  link: string
  linkText: string
  image: string
}

export interface CampusFeature {
  icon: Icon
  title: string
  desc: string
}
