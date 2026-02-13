import { useRef, useEffect } from 'react'

interface CoursesTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: string[]
}

export default function CoursesTabs({
  activeTab,
  onTabChange,
  tabs,
}: CoursesTabsProps) {
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const activeTabRef = useRef<HTMLButtonElement>(null)

  // Scroll the active tab into view on mobile when it changes
  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      const container = tabsContainerRef.current
      const tab = activeTabRef.current
      const containerRect = container.getBoundingClientRect()
      const tabRect = tab.getBoundingClientRect()

      // Only scroll if the active tab is not fully visible
      if (
        tabRect.left < containerRect.left ||
        tabRect.right > containerRect.right
      ) {
        tab.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [activeTab])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextIndex = (index + 1) % tabs.length
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      nextIndex = (index - 1 + tabs.length) % tabs.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      nextIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      nextIndex = tabs.length - 1
    }

    if (nextIndex !== null) {
      onTabChange(tabs[nextIndex])
      // Focus the new tab button
      const container = tabsContainerRef.current
      if (container) {
        const buttons = container.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]'
        )
        buttons[nextIndex]?.focus()
      }
    }
  }

  return (
    <div className="w-full border-b border-[#e8e8e8] bg-white">
      <div
        ref={tabsContainerRef}
        role="tablist"
        aria-label="Programme categories"
        className="-mb-px flex justify-center overflow-x-auto px-4 md:px-20"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              ref={isActive ? activeTabRef : undefined}
              role="tab"
              type="button"
              id={`tab-${index}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`
                font-proxima shrink-0 whitespace-nowrap border-0 px-6 py-4 text-sm outline-none transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BA2E36] focus-visible:ring-inset
                ${
                  isActive
                    ? 'border-b-[3px] border-b-[#BA2E36] font-bold text-[#BA2E36]'
                    : 'border-b-[3px] border-b-transparent font-normal text-[#666] hover:text-[#333]'
                }
              `}
            >
              {tab}
            </button>
          )
        })}
      </div>
    </div>
  )
}
