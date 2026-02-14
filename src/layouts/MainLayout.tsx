import { useEffect } from 'react'
import { Footer, Header } from '../components/shared'
import { useHeadroom } from '@/hooks/useHeadroom'
import { captureUTMsFromURL } from '@/utils/utm-tracking'

type LayoutProps = {
  children: React.ReactNode
}

export function MainLayout({ children }: LayoutProps) {
  const pinned = useHeadroom({ fixedAt: 120 })

  // Capture UTM parameters on mount
  useEffect(() => {
    captureUTMsFromURL()
  }, [])

  return (
    <div>
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex h-[81px] items-center justify-between border-b border-[#dee2e6] bg-white px-5 transition-transform duration-300 ${
          pinned ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Header />
      </header>

      <main className="pt-[81px]">{children}</main>

      <footer className="relative flex justify-between bg-white p-5">
        <Footer />
      </footer>
    </div>
  )
}
