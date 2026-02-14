'use client'

import { useEffect } from 'react'

import { Footer, FooterMini, NavBar } from '@/components/shared/v3'
import { useHeadroom } from '@/hooks/useHeadroom'
import { nexaFont, proximaNovaFont } from '@/styles/theme'
import { captureUTMsFromURL } from '@/utils/utm-tracking'

type LayoutProps = {
  children: React.ReactNode
  minimizeHeader?: boolean
  minimizeFooter?: boolean
  footerBgColor?: string
}

export function MainLayout({ children, minimizeFooter = false, minimizeHeader = false, footerBgColor }: LayoutProps) {
  const pinned = useHeadroom({ fixedAt: 120 })
  const mode = 'dark'

  // Capture UTM parameters on mount
  useEffect(() => {
    captureUTMsFromURL()
  }, [])

  return (
    <div className={`${proximaNovaFont.variable} ${nexaFont.variable}`}>
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex h-[81px] items-center justify-between px-5 transition-transform duration-300 ${
          pinned ? 'translate-y-0' : '-translate-y-full'
        } ${mode === 'dark' ? 'bg-black' : 'bg-white'}`}
        style={{ borderBottom: 'none' }}
      >
        <NavBar mode={mode} isMinimal={minimizeHeader} />
      </header>

      <main className="pt-[81px]">{children}</main>

      <footer className="relative">{minimizeFooter ? <FooterMini /> : <Footer bgColor={footerBgColor} />}</footer>
    </div>
  )
}
