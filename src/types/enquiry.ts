/**
 * Enquiry Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface SidebarCard {
  icon: Icon
  iconBg: string
  title: string
  desc: string
  link: string
  linkText: string
  linkColor: string
  external: boolean
}
