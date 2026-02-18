'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook replacing @/lib/tw-mantine-hooks useHeadroom.
 * Returns true (pinned/visible) when:
 *   - scroll position is less than fixedAt
 *   - user is scrolling up
 * Returns false (hidden) when scrolling down past fixedAt.
 */
export function useHeadroom({ fixedAt = 120 }: { fixedAt?: number } = {}): boolean {
  const [pinned, setPinned] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
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
