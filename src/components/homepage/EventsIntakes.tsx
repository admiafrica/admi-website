import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

interface EventCard {
  badge: string
  badgeClasses: string
  title: string
  detail: string
  buttonLabel: string
  buttonClasses: string
  href: string
  cardBg: string
}

const EVENTS: EventCard[] = [
  {
    badge: 'NOW ENROLLING',
    badgeClasses: 'text-white bg-[#BA2E36]',
    title: 'May 2026 Intake',
    detail: 'Diploma & Certificate programmes. Early bird discount available until March 31st.',
    buttonLabel: 'Apply for May',
    buttonClasses: 'text-white bg-[#BA2E36] hover:bg-[#a52830]',
    href: '/courses',
    cardBg: 'bg-[#FFF0F0]'
  },
  {
    badge: 'COMING SOON',
    badgeClasses: 'text-[#08F6CF] bg-[#0A3D3D]',
    title: 'September 2026 Intake',
    detail: 'All programmes available. Flexible payment plans from KES 15,000/month for diplomas.',
    buttonLabel: 'Register Interest',
    buttonClasses: 'text-[#0A3D3D] border-[1.5px] border-[#0A3D3D] bg-transparent hover:bg-[#0A3D3D]/5',
    href: '/courses',
    cardBg: 'bg-[#EEF9F7]'
  },
  {
    badge: 'VISIT US',
    badgeClasses: 'text-white bg-[#F76335]',
    title: 'Open Days',
    detail:
      'Visit our Nairobi campus, tour the studios and labs, meet faculty and current students, and see graduate work. Families welcome.',
    buttonLabel: 'Book Your Visit',
    buttonClasses: 'text-[#F76335] border-[1.5px] border-[#F76335] bg-transparent hover:bg-[#F76335]/5',
    href: '/contact',
    cardBg: 'bg-[#FFF8F0]'
  }
]

export default function EventsIntakes() {
  return (
    <section className="w-full bg-white px-4 py-16 md:px-20 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <span className="section-label-light font-semibold">WHAT&apos;S ON</span>
        <h2 className="font-nexa text-3xl font-black text-[#171717] md:text-4xl">Upcoming Intakes &amp; Open Days</h2>
      </div>

      {/* Event Cards */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {EVENTS.map((event) => (
          <div
            key={event.title}
            className={`flex min-h-[240px] flex-1 flex-col gap-4 rounded-2xl p-6 md:h-[260px] md:p-8 ${event.cardBg}`}
          >
            {/* Badge */}
            <span
              className={`w-fit rounded-full px-4 py-1.5 font-proxima text-[11px] font-bold tracking-wider ${event.badgeClasses}`}
            >
              {event.badge}
            </span>

            {/* Title */}
            <h3 className="font-nexa text-2xl font-black text-[#171717] md:text-[28px]">{event.title}</h3>

            {/* Detail */}
            <p className="font-proxima text-[15px] leading-relaxed text-[#666]">{event.detail}</p>

            {/* Button */}
            <div className="mt-auto">
              <Link
                href={event.href}
                className={`inline-flex w-fit items-center gap-2 rounded-full px-7 py-3 font-proxima text-sm font-bold transition-colors ${event.buttonClasses}`}
              >
                {event.buttonLabel}
                <IconArrowRight size={16} stroke={2.5} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
