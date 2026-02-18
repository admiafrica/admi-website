import { useEffect, useRef, useState } from 'react'
import { useHeadroom } from '@/hooks/useHeadroom'

type TabValue = 'overview' | 'deep-dive'

interface CourseTabNavProps {
  activeTab: TabValue
  onTabChange: (tab: TabValue) => void
}

const TABS: { value: TabValue; label: string; hash: string }[] = [
  { value: 'overview', label: 'Overview', hash: '#overview' },
  { value: 'deep-dive', label: 'Deep Dive', hash: '#details' }
]

export default function CourseTabNav({ activeTab, onTabChange }: CourseTabNavProps) {
  const [isStuck, setIsStuck] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const headerPinned = useHeadroom({ fixedAt: 120 })

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#details') {
      onTabChange('deep-dive')
    } else if (hash === '#overview') {
      onTabChange('overview')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Detect when the nav becomes sticky using IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: headerPinned ? '-81px 0px 0px 0px' : '0px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [headerPinned])

  const handleTabClick = (tab: TabValue) => {
    const selected = TABS.find((t) => t.value === tab)
    if (selected) {
      window.history.replaceState(null, '', selected.hash)
    }
    onTabChange(tab)
  }

  return (
    <>
      {/* Sentinel to detect when tab nav becomes stuck */}
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />
      <nav
        className={`sticky z-40 w-full border-b bg-white transition-all duration-300 ${
          isStuck ? 'border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)]' : 'border-gray-200'
        }`}
        style={{ top: headerPinned ? '81px' : '0px' }}
        aria-label="Course content navigation"
      >
        <div className="section-container">
          <div className="flex gap-8" role="tablist">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.value
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabClick(tab.value)}
                  className={`relative cursor-pointer border-0 bg-transparent py-4 transition-colors duration-200 ${isActive ? 'border-b-2 border-brand-red' : 'border-b-2 border-transparent'} `}
                >
                  <span
                    className={`font-proxima text-base ${isActive ? 'font-bold text-brand-red' : 'font-normal text-[#999]'}`}
                  >
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
