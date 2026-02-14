import Link from 'next/link'
import { IconArrowRight, IconFileText, IconCalendar, IconBrandWhatsapp } from '@tabler/icons-react'

const WHATSAPP_URL =
  'https://wa.me/254711082222?text=Hi%20ADMI%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20programmes.'

const paths = [
  {
    title: 'Ready to Apply',
    cta: 'Start Your Application',
    subtext: 'Takes less than 10 minutes',
    href: '/courses',
    icon: IconArrowRight,
    className: 'bg-white text-brand-red hover:bg-white/90',
    external: false
  },
  {
    title: 'Exploring Options',
    cta: 'Request Prospectus',
    subtext: 'Get the full programme guide',
    href: '/enquiry',
    icon: IconFileText,
    className: 'border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15',
    external: false
  },
  {
    title: 'Want to Visit',
    cta: 'Book an Open Day',
    subtext: 'See our campus & meet faculty',
    href: '/contact',
    icon: IconCalendar,
    className: 'bg-brand-orange text-white hover:opacity-90',
    external: false
  },
  {
    title: 'Just Researching',
    cta: 'Chat with Admissions',
    subtext: 'Get answers in minutes',
    href: WHATSAPP_URL,
    icon: IconBrandWhatsapp,
    className: 'bg-brand-whatsapp text-white hover:opacity-90',
    external: true
  }
] as const

export default function FinalCTA() {
  return (
    <section className="w-full bg-gradient-to-br from-brand-red via-[#8B1A24] to-admi-black">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 px-6 py-16 md:px-8 md:py-[100px]">
        {/* Title */}
        <h2 className="max-w-[800px] text-center font-nexa text-3xl font-black text-white md:text-[44px] md:leading-[1.15]">
          What&apos;s Your Next Step?
        </h2>

        <p className="max-w-[700px] text-center font-proxima text-base leading-relaxed text-white/80 md:text-lg">
          Whether you&apos;re ready to apply or just starting to explore, there&apos;s a path for you.
        </p>

        {/* 4-path grid */}
        <div className="grid w-full max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2">
          {paths.map((path) => {
            const Icon = path.icon
            const inner = (
              <div
                className={`flex flex-col items-center gap-3 rounded-xl px-8 py-8 text-center transition-all ${path.className}`}
              >
                <span className="font-proxima text-xs font-bold uppercase tracking-[2px] opacity-70">{path.title}</span>
                <span className="flex items-center gap-2 font-proxima text-lg font-bold">
                  {path.cta}
                  <Icon size={20} stroke={2} />
                </span>
                <span className="font-proxima text-sm opacity-60">{path.subtext}</span>
              </div>
            )

            return path.external ? (
              <a key={path.title} href={path.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <Link key={path.title} href={path.href}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
