import { useEffect, useRef, useState } from 'react'
import { Text } from '@mantine/core'

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
      { threshold: 0 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

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
        className={`sticky top-0 z-40 w-full border-b bg-white px-4 transition-shadow duration-300 md:px-20 ${
          isStuck ? 'border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)]' : 'border-gray-200'
        }`}
        aria-label="Course content navigation"
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="flex gap-8" role="tablist">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.value
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabClick(tab.value)}
                  className={`relative cursor-pointer border-0 bg-transparent py-4 transition-colors duration-200 ${isActive ? 'border-b-2 border-[#BA2E36]' : 'border-b-2 border-transparent'} `}
                >
                  <Text className="font-proxima" size="md" fw={isActive ? 700 : 400} c={isActive ? '#BA2E36' : '#999'}>
                    {tab.label}
                  </Text>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
