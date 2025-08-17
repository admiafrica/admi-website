'use client'

import { useEffect, useState, useRef } from 'react'
import { CardSkeleton } from '@/components/ui/LoadingSkeleton'

interface LazySectionProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  threshold?: number
  fallbackHeight?: string | number
  skeletonType?: 'card' | 'text' | 'custom'
  className?: string
}

export default function LazySection({
  children,
  placeholder,
  threshold = 0.1,
  fallbackHeight = '200px',
  skeletonType = 'card',
  className = ''
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Use modern IntersectionObserver with better performance options
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add small delay to prevent layout shift
          setTimeout(() => {
            setIsVisible(true)
          }, 50)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: '50px 0px' // Load content 50px before it comes into view
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  const getDefaultPlaceholder = () => {
    switch (skeletonType) {
      case 'card':
        return <CardSkeleton />
      case 'text':
        return <div style={{ height: fallbackHeight }} className="animate-pulse rounded bg-gray-200" />
      default:
        return <div style={{ height: fallbackHeight }} className="animate-pulse rounded bg-gray-100" />
    }
  }

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : placeholder || getDefaultPlaceholder()}
    </div>
  )
}
