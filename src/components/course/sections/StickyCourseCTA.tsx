'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IconX, IconClock } from '@tabler/icons-react'

interface StickyCourseCTAProps {
  courseName: string
  courseSlug: string
}

export default function StickyCourseCTA({ courseName, courseSlug }: StickyCourseCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px
      const shouldShow = window.scrollY > 400
      setIsVisible(shouldShow && !isDismissed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (!isVisible) return null

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300"
      style={{ animation: 'slideUp 0.3s ease-out' }}
    >
      {/* Urgency banner only */}
      <div className="bg-amber-500 px-4 py-2.5 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex flex-1 items-center justify-center gap-2">
            <IconClock size={16} className="shrink-0 text-black" />
            <p className="font-proxima text-[13px] font-bold text-black sm:text-[14px]">
              <span className="hidden sm:inline">Early Bird Discount: </span>
              Apply by 15th April for 10% off
              <span className="hidden md:inline"> | Classes start mid-May 2026</span>
            </p>
            <Link
              href={`/enquiry?course=${encodeURIComponent(courseSlug)}`}
              className="ml-2 inline-flex items-center rounded bg-black px-3 py-1 font-proxima text-[12px] font-bold text-white transition hover:bg-gray-800"
            >
              Apply Now
            </Link>
          </div>
          
          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="shrink-0 rounded p-1 text-black/60 transition hover:bg-black/10 hover:text-black"
            aria-label="Dismiss"
          >
            <IconX size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
