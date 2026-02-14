/**
 * Media Archive Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface GalleryItemLarge {
  category: string
  title: string
  gradient: string
}

export interface GalleryItemSmall {
  label: string
  gradient: string
}

export interface PressKitItem {
  icon: Icon
  iconBg: string
  iconColor: string
  title: string
  description: string
  buttonColor: string
}
