/**
 * Accommodation Page Types
 */

import type { Icon } from '@tabler/icons-react'

export interface Residence {
  name: string
  price: string
  description: string
  image: string
  link?: string
}

export interface Amenity {
  label: string
  Icon: Icon
}

export interface BookingStep {
  number: string
  title: string
  description: string
}
