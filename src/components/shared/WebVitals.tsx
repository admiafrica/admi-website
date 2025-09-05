/**
 * Web Vitals monitoring component for Core Web Vitals tracking
 */
'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

interface Metric {
  name: string
  value: number
  id: string
  rating: 'good' | 'needs-improvement' | 'poor'
}

function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, Math.round(metric.value), metric.rating)
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      custom_parameter_1: metric.id,
      custom_parameter_2: metric.value,
      custom_parameter_3: metric.rating,
      custom_parameter_4: Math.round(metric.value * 1000)
    })
  }

  // Send to Vercel Analytics if available
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', metric.name, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id
    })
  }

  // Send to custom analytics endpoint
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    fetch('/api/vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        url: window.location.pathname,
        timestamp: Date.now()
      })
    }).catch((error) => {
      console.warn('Failed to send vitals to analytics:', error)
    })
  }
}

export function WebVitals() {
  useEffect(() => {
    // Track all Core Web Vitals (FID replaced with INP in 2024)
    onCLS(sendToAnalytics)
    onINP(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }, [])

  return null // This component doesn't render anything
}

// Extend Window type for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    va?: (event: string, name: string, data?: any) => void
  }
}
