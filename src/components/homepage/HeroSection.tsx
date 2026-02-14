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
      <div className="relative mx-auto flex min-h-[500px] w-full max-w-[1280px] items-end px-6 pb-16 pt-32 md:h-[660px] md:items-center md:px-8 md:pb-0 md:pt-[100px]">
        <div className="flex max-w-[700px] flex-col">
          {/* Badge Pills */}
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-5 py-2.5 backdrop-blur-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
              <span className="font-proxima text-sm font-medium text-white">January, May &amp; September Intakes</span>
            </span>
            <span className="inline-flex items-center gap-2.5 rounded-full bg-secondary/20 px-5 py-2.5 backdrop-blur-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-secondary" />
              <span className="font-proxima text-sm font-medium text-white">Hybrid Learning</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 max-w-[650px] font-nexa text-3xl font-black leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
            Study Creative Arts &amp; Technology at East Africa&apos;s Leading Institute
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-[560px] font-proxima text-base leading-relaxed text-white/80 md:text-lg">
            Africa Digital Media Institute (ADMI) offers accredited diploma and certificate programmes in Film, Design,
            Music Production, Animation, and more. Study through our flexible hybrid model &mdash; online sessions
            combined with hands-on campus practicals &mdash; with industry-standard facilities and expert faculty.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-9 py-[18px] font-proxima text-[17px] font-semibold text-white transition-colors hover:bg-[#a52830]"
            >
              Explore Programmes
              <IconChevronRight size={20} stroke={2.5} />
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-9 py-[18px] font-proxima text-[17px] font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              Request Prospectus
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
