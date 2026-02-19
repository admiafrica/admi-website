'use client'

import { useEffect, useState } from 'react'

import { Footer, FooterMini, NavBar } from '@/components/shared/v3'
import IntakeBanner from '@/components/homepage/IntakeBanner'
import { useHeadroom } from '@/hooks/useHeadroom'
import { nexaFont, proximaNovaFont } from '@/styles/theme'
import { captureUTMsFromURL } from '@/utils/utm-tracking'

const BANNER_STORAGE_KEY = 'intake-banner-dismissed'
const BANNER_EXPIRY_DAYS = 7
const BANNER_AUTO_DISMISS_MS = 8000 // Auto-hide after 8 seconds

type LayoutProps = {
  children: React.ReactNode
  minimizeHeader?: boolean
  minimizeFooter?: boolean
  footerBgColor?: string
}

export function MainLayout({ children, minimizeFooter = false, minimizeHeader = false, footerBgColor }: LayoutProps) {
  const pinned = useHeadroom({ fixedAt: 120 })
  const mode = 'light'
  const [bannerVisible, setBannerVisible] = useState(false)

  // Capture UTM parameters + check banner dismiss state on mount
  useEffect(() => {
    captureUTMsFromURL()

    const dismissed = localStorage.getItem(BANNER_STORAGE_KEY)
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10)
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24)
      if (daysSince < BANNER_EXPIRY_DAYS) return
      localStorage.removeItem(BANNER_STORAGE_KEY)
    }
    setBannerVisible(true)
  }, [])

  // Auto-dismiss banner after a few seconds
  useEffect(() => {
    if (!bannerVisible) return
    const timer = setTimeout(() => {
      handleDismissBanner()
    }, BANNER_AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [bannerVisible])

  const handleDismissBanner = () => {
    setBannerVisible(false)
    localStorage.setItem(BANNER_STORAGE_KEY, Date.now().toString())
  }

  return (
    <div className={`${proximaNovaFont.variable} ${nexaFont.variable} w-full overflow-x-clip`}>
      <div
        className={`fixed left-0 right-0 top-0 z-50 transition-transform duration-300 ${
          pinned ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <IntakeBanner visible={bannerVisible} onDismiss={handleDismissBanner} />
        <header className="flex h-[81px] items-center justify-between bg-white px-5">
          <NavBar mode={mode} isMinimal={minimizeHeader} />
        </header>
      </div>

      <main className={`w-full max-w-full overflow-x-clip ${bannerVisible ? 'pt-[129px]' : 'pt-[81px]'}`}>
        {children}
      </main>

      <footer className="relative">{minimizeFooter ? <FooterMini /> : <Footer bgColor={footerBgColor} />}</footer>
    </div>
  )
}
