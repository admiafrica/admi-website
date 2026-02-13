import Link from 'next/link'
import { IconArrowRight, IconCalendar } from '@tabler/icons-react'

export default function FinalCTA() {
  return (
    <section className="w-full bg-gradient-to-br from-[#BA2E36] via-[#8B1A24] to-[#0A0A0A]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 px-6 py-16 md:px-8 md:py-[100px]">
        {/* Title */}
        <h2 className="max-w-[800px] text-center font-nexa text-3xl font-black text-white md:text-[44px] md:leading-[1.15]">
          Begin Your Application Today
        </h2>

        {/* Description */}
        <p className="max-w-[700px] text-center font-proxima text-base leading-relaxed text-white/80 md:text-lg">
          Join thousands of graduates building careers in film, design, animation and digital media. Applications are
          open for January, May and September intakes.
        </p>

        {/* Buttons */}
        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/courses"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-10 py-[18px] font-proxima text-[15px] font-bold text-[#BA2E36] transition-colors hover:bg-white/90 sm:w-auto sm:text-[17px]"
          >
            Start Your Application
            <IconArrowRight size={18} stroke={2.5} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#F76335] px-10 py-[18px] font-proxima text-[15px] font-bold text-white transition-colors hover:bg-[#e55a2f] sm:w-auto sm:text-[17px]"
          >
            Book an Open Day
            <IconCalendar size={18} stroke={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
