'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui'

import { IconMenu, IconX } from '@tabler/icons-react'
import IconLogoLight from '@/assets/logo-2015.svg'
import IconLogoDark from '/public/logo/ADMI (White)logo-01.png'

// ---------- Data ----------
type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  {
    label: 'Student Life',
    href: '/student-life',
    children: [
      { label: 'Campus Tour', href: '/student-experience/campus' },
      { label: 'Facilities', href: '/student-experience/campus/facilities' },
      { label: 'Studios', href: '/student-experience/studios' },
      { label: 'Equipment', href: '/student-experience/equipment' },
      { label: 'Student Showcase', href: '/student-showcase' },
      { label: 'Accommodation', href: '/accommodation' }
    ]
  },
  {
    label: 'Student Support',
    href: '/student-support',
    children: [
      { label: 'Fees & Financial Planning', href: '/financial-planning' },
      { label: 'Academic Support', href: '/student-support' },
      { label: 'Student Portal', href: '/student-portal' }
    ]
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About ADMI', href: '/about' },
      { label: 'Accreditation', href: '/accreditation' },
      { label: 'Academic Pathways', href: '/academic-pathways' },
      { label: 'Fellowship', href: '/fellowship' },
      { label: 'Our Alumni', href: '/our-alumni' },
      { label: 'Our Impact', href: '/our-impact' },
      { label: 'Work With Us', href: '/work-with-us' }
    ]
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Guides', href: '/resources' },
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/events' },
      { label: 'Media Archive', href: '/media-archive' },
      { label: 'FAQs', href: '/faq' }
    ]
  }
]

// ---------- NavDropdown ----------
function NavDropdown({ item, textColorClass }: { item: NavItem; textColorClass: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const openTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (openTimeout.current) clearTimeout(openTimeout.current)
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
  }, [])

  const handleMouseEnter = useCallback(() => {
    clearTimers()
    openTimeout.current = setTimeout(() => setOpen(true), 100)
  }, [clearTimers])

  const handleMouseLeave = useCallback(() => {
    clearTimers()
    closeTimeout.current = setTimeout(() => setOpen(false), 400)
  }, [clearTimers])

  useEffect(() => {
    return clearTimers
  }, [clearTimers])

  if (!item.children) {
    return (
      <button
        type="button"
        onClick={() => router.push(item.href)}
        className={`cursor-pointer border-none bg-transparent text-lg font-bold ${textColorClass}`}
      >
        {item.label}
      </button>
    )
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        onClick={() => router.push(item.href)}
        className={`cursor-pointer border-none bg-transparent text-lg font-bold ${textColorClass}`}
      >
        {item.label}
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-md bg-white py-1 shadow-lg">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm text-gray-700 no-underline hover:bg-gray-100"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------- NavBar ----------
type Props = {
  mode: string
  isMinimal?: boolean
}

export default function NavBar({ mode, isMinimal = false }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [hiddenCTA, setHiddenCTA] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)

  useEffect(() => {
    if (pathname) {
      const isHidden = pathname.startsWith('/campaigns')
      setHiddenCTA(isHidden)
    }
  }, [pathname])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const textColorClass = mode === 'dark' ? 'text-white' : 'text-black'
  const logoSrc = mode === 'dark' ? IconLogoDark : IconLogoLight

  if (isMinimal) {
    return (
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="flex items-center py-2 font-nexa">
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', height: '100%' }}>
            <Image
              src={logoSrc}
              width={90}
              height={0}
              style={{ width: 90, height: 'auto' }}
              alt="Africa Digital Media Institute"
              priority
            />
          </Link>
          <div className="grow" />
          {!hiddenCTA && (
            <div>
              <Button size="lg" backgroundColor="admiRed" label="Get In Touch" />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="flex w-full items-center py-2 font-nexa">
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', height: '100%' }}>
          <Image
            src={logoSrc}
            width={90}
            height={0}
            style={{ width: 90, height: 'auto' }}
            alt="Africa Digital Media Institute"
            priority
          />
        </Link>
        <div className="grow" />

        {/* Desktop nav links */}
        <div className={`hidden items-center gap-6 lg:flex ${textColorClass}`}>
          {NAV_ITEMS.map((item) => (
            <NavDropdown key={item.label} item={item} textColorClass={textColorClass} />
          ))}
        </div>

        <div className="hidden grow lg:block" />

        {/* Desktop Apply - far right */}
        {!hiddenCTA && (
          <button
            type="button"
            onClick={() => router.push('/enquiry')}
            className="hidden h-11 cursor-pointer items-center justify-center rounded-[8px] border-none bg-brand-red px-6 font-proxima text-[15px] font-semibold text-white antialiased transition-colors hover:bg-[#a02630] lg:inline-flex"
          >
            Apply Now
          </button>
        )}

        {/* Mobile: Apply button + hamburger (far right) */}
        <div className="flex w-fit items-center gap-3 lg:hidden">
          {!hiddenCTA && (
            <button
              type="button"
              onClick={() => router.push('/enquiry')}
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-[8px] border-none bg-brand-red px-5 font-proxima text-[14px] font-semibold text-white antialiased transition-colors hover:bg-[#a02630]"
            >
              Apply Now
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`cursor-pointer border-none bg-transparent p-0 ${textColorClass}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX size={28} /> : <IconMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="fixed left-0 right-0 top-[81px] z-50 max-h-[calc(100vh-81px)] overflow-y-auto border-t border-white/10 bg-gray-900 pb-4 font-proxima lg:hidden">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => {
                  if (item.children) {
                    setExpandedMobile(expandedMobile === item.label ? null : item.label)
                  } else {
                    router.push(item.href)
                    setMobileOpen(false)
                  }
                }}
                className="w-full cursor-pointer border-none bg-transparent px-4 py-3 text-left font-proxima text-lg font-bold text-white"
              >
                {item.label}
              </button>
              {item.children && expandedMobile === item.label && (
                <div className="pb-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 pl-8 font-proxima text-base text-white/80 no-underline hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
