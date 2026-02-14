/**
 * Icon Map Utility
 *
 * Maps string icon IDs (stored in Contentful) to @tabler/icons-react components.
 * This allows CMS editors to reference icons by name without touching code.
 *
 * Usage:
 *   import { getIcon } from '@/utils/icon-map'
 *   const Icon = getIcon('wifi')  // returns IconWifi component
 */

import {
  IconAccessible,
  IconArrowDown,
  IconArrowRight,
  IconArrowsExchange,
  IconAward,
  IconBook,
  IconBrandWhatsapp,
  IconBriefcase,
  IconBulb,
  IconCalculator,
  IconCash,
  IconCertificate,
  IconCheck,
  IconChecklist,
  IconCircleCheckFilled,
  IconClipboardCheck,
  IconClock,
  IconDownload,
  IconGlobe,
  IconHeart,
  IconHeartHandshake,
  IconLayersSubtract,
  IconLayoutGrid,
  IconMail,
  IconMapPin,
  IconMessageCircle,
  IconMinus,
  IconMovie,
  IconNetwork,
  IconPalette,
  IconPlus,
  IconRocket,
  IconSchool,
  IconShield,
  IconShieldCheck,
  IconSpeakerphone,
  IconStar,
  IconToolsKitchen2,
  IconTrendingUp,
  IconUsers,
  IconWash,
  IconWifi
} from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'

const ICON_MAP: Record<string, Icon> = {
  accessible: IconAccessible,
  'arrow-down': IconArrowDown,
  'arrow-right': IconArrowRight,
  'arrows-exchange': IconArrowsExchange,
  award: IconAward,
  book: IconBook,
  'brand-whatsapp': IconBrandWhatsapp,
  briefcase: IconBriefcase,
  bulb: IconBulb,
  calculator: IconCalculator,
  cash: IconCash,
  certificate: IconCertificate,
  check: IconCheck,
  checklist: IconChecklist,
  'circle-check-filled': IconCircleCheckFilled,
  'clipboard-check': IconClipboardCheck,
  clock: IconClock,
  download: IconDownload,
  globe: IconGlobe,
  heart: IconHeart,
  'heart-handshake': IconHeartHandshake,
  'layers-subtract': IconLayersSubtract,
  'layout-grid': IconLayoutGrid,
  mail: IconMail,
  'map-pin': IconMapPin,
  'message-circle': IconMessageCircle,
  minus: IconMinus,
  movie: IconMovie,
  network: IconNetwork,
  palette: IconPalette,
  plus: IconPlus,
  rocket: IconRocket,
  school: IconSchool,
  shield: IconShield,
  'shield-check': IconShieldCheck,
  speakerphone: IconSpeakerphone,
  star: IconStar,
  'tools-kitchen-2': IconToolsKitchen2,
  'trending-up': IconTrendingUp,
  users: IconUsers,
  wash: IconWash,
  wifi: IconWifi
}

/**
 * Get a Tabler icon component by its string ID.
 * Returns undefined if the icon ID is not found.
 *
 * @param iconId - The icon identifier (e.g. 'wifi', 'shield', 'map-pin')
 */
export function getIcon(iconId: string | undefined | null): Icon | undefined {
  if (!iconId) return undefined
  return ICON_MAP[iconId.toLowerCase()]
}

/**
 * Get all available icon IDs (useful for validation)
 */
export function getAvailableIconIds(): string[] {
  return Object.keys(ICON_MAP)
}
