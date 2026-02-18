'use client'

import { trackWhatsAppClick } from '@/utils/utm-tracking'
import { ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

interface WhatsAppLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> {
  /** Phone number without + prefix (e.g., "254741132751") */
  phoneNumber?: string
  /** Location identifier for tracking (e.g., "footer", "contact_page", "form") */
  trackingLocation?: string
  /** Link content/children */
  children: React.ReactNode
  /** Custom class name */
  className?: string
  /** Color shorthand (kept for backward compat, applied via style) */
  c?: string
  /** Font weight shorthand (kept for backward compat, applied via style) */
  fw?: string | number
}

/**
 * Tracked WhatsApp link component
 * Captures attribution data before user clicks through to WhatsApp
 */
export function WhatsAppLink({
  phoneNumber = ADMI_WHATSAPP_NUMBER,
  trackingLocation = 'unknown',
  children,
  className,
  c,
  fw,
  ...props
}: WhatsAppLinkProps) {
  const handleClick = () => {
    // Track the click with current attribution context
    trackWhatsAppClick(phoneNumber, trackingLocation)
  }

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`text-blue-700 hover:underline ${className || ''}`}
      style={{ color: c, fontWeight: fw }}
      {...props}
    >
      {children}
    </a>
  )
}

/**
 * Plain HTML anchor version for use in non-Mantine contexts
 */
export function WhatsAppLinkPlain({
  phoneNumber = ADMI_WHATSAPP_NUMBER,
  trackingLocation = 'unknown',
  children,
  className,
  ...props
}: Omit<WhatsAppLinkProps, 'c' | 'fw'> & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = () => {
    trackWhatsAppClick(phoneNumber, trackingLocation)
  }

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}

export default WhatsAppLink
