import Image from 'next/image'
import Link from 'next/link'
import { IconChevronRight } from '@tabler/icons-react'

const HERO_IMAGE_URL =
  'https://images.ctfassets.net/qtu3mga6n6gc/6Mhj8yvqGYUNbHN9RZq6vD/4de22785a3034c1e768c12b8f11e95d7/homepage-hero-bg.png'

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B0B0F]">
      {/* Background Image */}
      <Image
        src={HERO_IMAGE_URL}
        alt="ADMI Campus - Students in creative media training"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_20%]"
      />

      {/* Gradient Overlay - dark at bottom, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,15,0.85)] via-[rgba(11,11,15,0.5)] to-[rgba(11,11,15,0.2)]" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[420px] w-full max-w-[1280px] items-end px-4 pb-10 pt-24 md:h-[660px] md:items-center md:px-8 md:pb-0 md:pt-[100px]">
        <div className="flex w-full max-w-[700px] flex-col pr-2 sm:pr-0">
          {/* Badge Pills */}
          <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap md:mb-6 md:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-sm md:gap-2.5 md:px-5 md:py-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
              <span className="font-proxima text-xs font-medium text-white md:text-sm">
                January, May &amp; September Intakes
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-3.5 py-1.5 backdrop-blur-sm md:gap-2.5 md:px-5 md:py-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-secondary" />
              <span className="font-proxima text-xs font-medium text-white md:text-sm">Hybrid Learning</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 max-w-[95%] break-words font-nexa text-[28px] font-black leading-[1.15] tracking-tight text-white sm:max-w-[650px] sm:text-4xl md:mb-6 md:text-5xl">
            Study Creative Arts &amp; Technology at East Africa&apos;s Leading Institute
          </h1>

          {/* Description */}
          <p className="mb-6 max-w-[95%] break-words font-proxima text-[15px] leading-relaxed text-white/80 sm:max-w-[560px] md:mb-8 md:text-lg">
            Africa Digital Media Institute (ADMI) offers accredited diploma and certificate programmes in Film, Design,
            Music Production, Animation, and more. Study through our flexible hybrid model &mdash; online sessions
            combined with hands-on campus practicals &mdash; with industry-standard facilities and expert faculty.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-start gap-2.5 sm:flex-row md:gap-4">
            <Link
              href="/courses"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand-red px-4 font-proxima text-[14px] font-semibold text-white transition-colors hover:bg-[#a52830] md:h-auto md:gap-2 md:px-9 md:py-[18px] md:text-[17px]"
            >
              Explore Programmes
              <IconChevronRight size={20} stroke={2.5} />
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/30 bg-white/10 px-4 font-proxima text-[14px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/15 md:h-auto md:gap-2 md:px-9 md:py-[18px] md:text-[17px]"
            >
              Request Prospectus
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
