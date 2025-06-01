'use client'

import { useEffect, useState, useRef } from 'react'

interface LazySectionProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  threshold?: number
}

export default function LazySection({ 
  children, 
  placeholder, 
  threshold = 0.1 
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return (
    <div ref={ref}>
      {isVisible ? children : placeholder || <div style={{ height: '100px' }} />}
    </div>
  )
}