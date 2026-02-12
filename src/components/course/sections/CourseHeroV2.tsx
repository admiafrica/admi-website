import Link from 'next/link'
import Image from 'next/image'
import { ensureProtocol } from '@/utils'

type Props = {
  name: string
  coverImage: any
  programType: any
  awardLevel: string
  duration: string
  slug: string
}

export default function CourseHeroV2({ name, coverImage, programType, awardLevel, duration }: Props) {
  const whatsappUrl = `https://wa.me/254741132751?text=${encodeURIComponent(`Hi ADMI, I'm interested in the ${name}`)}`
  const imageUrl = coverImage?.fields?.file?.url ? ensureProtocol(coverImage.fields.file.url) : null

  return (
    <section className="relative flex max-h-[600px] min-h-[500px] w-full items-center md:max-h-none md:min-h-[600px]">
      {/* Background Image */}
      {imageUrl ? (
        <div className="absolute inset-0 z-0">
          <Image src={imageUrl} alt={name} fill priority sizes="100vw" className="object-cover object-[40%_center]" />
          {/* Gradient overlay - stronger coverage for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black from-0% via-black/60 via-black/90 via-20% via-35% to-transparent to-50%" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-gray-900" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-screen-xl px-4 py-8 md:px-20 md:py-20">
        <div className="flex max-w-2xl flex-col gap-3 md:gap-6">
          {/* Breadcrumbs - Hidden on mobile */}
          <nav className="hidden items-center gap-2 font-proxima text-sm text-gray-300 md:flex">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white">
              {programType?.fields?.name || 'Diploma Programs'}
            </Link>
            <span>/</span>
            <span className="font-bold text-admiDarkOrange">{name}</span>
          </nav>

          {/* Title */}
          <h1
            className="font-nexa text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl xl:text-6xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            {name}
          </h1>

          {/* Description */}
          <p
            className="max-w-xl font-proxima text-base leading-relaxed text-gray-200 md:text-lg"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
          >
            Master cinematography, directing, editing and post-production. Graduate with a Pearson BTEC qualification
            accredited by Woolf University with credits towards a degree.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/enquiry"
              className="inline-flex items-center gap-2 rounded-lg bg-admiDarkOrange px-6 py-3 font-nexa text-sm font-black text-white transition hover:scale-105 hover:bg-admiDarkOrange/90 md:px-8 md:py-4 md:text-base"
            >
              Apply Now <span aria-hidden>→</span>
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-lg border-2 border-white bg-white/10 px-6 py-3 font-nexa text-sm font-black text-white backdrop-blur-sm transition hover:bg-white hover:text-black md:px-8 md:py-4 md:text-base"
            >
              Enquire Now
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-nexa text-sm font-black text-white transition hover:scale-105 hover:opacity-90 md:px-8 md:py-4 md:text-base"
            >
              <span>●</span> WhatsApp
            </a>
          </div>

          {/* Tags - Now below buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-admiDarkOrange px-3 py-1 font-proxima text-xs font-bold text-white">
              {awardLevel || 'Diploma Program'}
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-proxima text-xs font-bold text-white backdrop-blur-sm">
              {duration || '2 Years'}
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-proxima text-xs font-bold text-white backdrop-blur-sm">
              EU Accredited
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
