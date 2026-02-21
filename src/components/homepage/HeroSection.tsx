import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { IconChevronRight } from '@tabler/icons-react'

const HERO_IMAGE_BASE =
  'https://images.ctfassets.net/qtu3mga6n6gc/6Mhj8yvqGYUNbHN9RZq6vD/4de22785a3034c1e768c12b8f11e95d7/homepage-hero-bg.png'

// Use Contentful Image API directly — skips /_next/image proxy, saves a network hop
const contentfulLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) =>
  `${src}?fm=webp&w=${width}&q=${quality || 80}&fit=fill`

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B0B0F]">
      {/* Preload LCP image directly from Contentful CDN — no /_next/image proxy */}
      <Head>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          imageSrcSet={`${HERO_IMAGE_BASE}?fm=webp&w=640&q=80&fit=fill 640w, ${HERO_IMAGE_BASE}?fm=webp&w=828&q=80&fit=fill 828w, ${HERO_IMAGE_BASE}?fm=webp&w=1200&q=80&fit=fill 1200w, ${HERO_IMAGE_BASE}?fm=webp&w=1920&q=80&fit=fill 1920w`}
          imageSizes="100vw"
          // @ts-ignore — fetchpriority not yet in React types
          fetchpriority="high"
        />
      </Head>

      {/* Background Image — loaded via Contentful CDN directly */}
      <Image
        loader={contentfulLoader}
        src={HERO_IMAGE_BASE}
        alt="ADMI Campus - Students in creative media training"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_20%]"
      />

      {/* Gradient Overlay - dark at bottom, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,15,0.85)] via-[rgba(11,11,15,0.5)] to-[rgba(11,11,15,0.2)]" />

      {/* Content - centered on mobile, left-aligned on desktop */}
      <div className="relative flex min-h-[460px] flex-col justify-center px-6 pb-10 pt-[100px] md:min-h-[600px] md:px-12 md:pb-8 md:pt-[110px] lg:px-20">
        <div className="flex flex-col md:max-w-2xl">
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
          <h1 className="mb-4 font-nexa text-[28px] font-black leading-[1.15] tracking-tight text-white sm:text-4xl md:mb-6 md:text-5xl">
            Study Creative Arts &amp; Technology at East Africa&apos;s Leading Institute
          </h1>

          {/* Description */}
          <p className="mb-6 font-proxima text-[15px] leading-relaxed text-white/80 md:mb-8 md:text-lg">
            Study through our flexible hybrid model. Online sessions combined with hands-on campus practicals,
            industry-standard facilities and expert faculty.
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
