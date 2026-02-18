'use client'

import { useState, useEffect, useRef } from 'react'

// Desktop breakpoint (matches Tailwind md: breakpoint)
const DESKTOP_BREAKPOINT = 768

/**
 * Custom hook replacing @/lib/tw-mantine-hooks useHeadroom.
 * Returns true (pinned/visible) when:
 *   - on desktop (always visible - no hide on scroll)
 *   - scroll position is less than fixedAt
 *   - user is scrolling up
 * Returns false (hidden) when scrolling down past fixedAt on mobile only.
 */
export function useHeadroom({ fixedAt = 120 }: { fixedAt?: number } = {}): boolean {
  const [pinned, setPinned] = useState(true)
  const lastScrollY = useRef(0)
  const isDesktopRef = useRef(true)

  // Check if we're on desktop (using ref to avoid hydration issues)
  useEffect(() => {
    const checkDesktop = () => {
      isDesktopRef.current = window.innerWidth >= DESKTOP_BREAKPOINT
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop, { passive: true })
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // On desktop, always keep header visible
      if (isDesktopRef.current) {
        setPinned(true)
        return
      }

      const currentScrollY = window.scrollY

      if (currentScrollY < fixedAt) {
        setPinned(true)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setPinned(true)
      } else {
        // Scrolling down past fixedAt
        setPinned(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fixedAt])

  return pinned
}
