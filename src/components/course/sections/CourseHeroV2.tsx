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
  subtitle?: string
}

// Check all available fields to determine program category
function getProgramCategory(programType: any, awardLevel: string): 'diploma' | 'foundation' | 'professional' | 'other' {
  const ptName = programType?.fields?.name?.toLowerCase() || ''
  const award = awardLevel?.toLowerCase() || ''
  // Also check duration - 2 year programs are typically diplomas
  const duration = programType?.fields?.duration?.toLowerCase() || ''

  if (award.includes('diploma') || ptName.includes('diploma') || duration.includes('2 year')) return 'diploma'
  if (ptName.includes('foundation') || award.includes('foundation')) return 'foundation'
  if (ptName.includes('professional') || award.includes('professional')) return 'professional'
  return 'other'
}

// Map program type to its listing page URL
function getProgramTypeUrl(programType: any, awardLevel: string): string {
  const category = getProgramCategory(programType, awardLevel)
  if (category === 'diploma') return '/courses/diploma-programs'
  if (category === 'foundation') return '/courses/foundation-certificates'
  if (category === 'professional') return '/courses/professional-certificates'
  return '/courses'
}

// Get breadcrumb label matching the listing page title
function getProgramTypeLabel(programType: any, awardLevel: string): string {
  const category = getProgramCategory(programType, awardLevel)
  if (category === 'diploma') return 'Diploma Programs'
  if (category === 'foundation') return 'Foundation Certificates'
  if (category === 'professional') return 'Professional Certificates'
  return 'Programs'
}

export default function CourseHeroV2({ name, coverImage, programType, awardLevel, duration, subtitle }: Props) {
  const whatsappUrl = `https://wa.me/254741132751?text=${encodeURIComponent(`Hi ADMI, I'm interested in the ${name}`)}`
  const imageUrl = coverImage?.fields?.file?.url ? ensureProtocol(coverImage.fields.file.url) : null
  const programTypeUrl = getProgramTypeUrl(programType, awardLevel)
  const programTypeLabel = getProgramTypeLabel(programType, awardLevel)

  return (
    <section className="relative w-full overflow-hidden bg-[#1a1a1a]">
      {/* Background Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${name} - Course Cover Image`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#444444]" />
      )}

      {/* Gradient Overlay - dark left fading to transparent right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/85 to-transparent" />

      {/* Content */}
      <div className="section-container relative flex w-full flex-col pb-16 pt-10 md:pb-24 md:pt-14">
        {/* Breadcrumb */}
        <nav className="mb-6 hidden items-center gap-2 text-[13px] md:flex" aria-label="Breadcrumb">
          <Link href="/" className="font-proxima font-medium text-white/50 hover:text-white/70">
            Home
          </Link>
          <span className="text-white/30">&gt;</span>
          <Link href={programTypeUrl} className="font-proxima font-medium text-white/50 hover:text-white/70">
            {programTypeLabel}
          </Link>
          <span className="text-white/30">&gt;</span>
          <span className="font-proxima font-medium text-brand-red">{name}</span>
        </nav>

        {/* Badge */}
        <div className="mb-5 flex">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-proxima text-[13px] font-semibold text-white">
            <span className="h-2 w-2 rounded-full bg-brand-red" />
            {awardLevel || 'Diploma Program'} &middot; {duration || '2 Years'} &middot; EU Accredited
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-5 max-w-[700px] text-3xl font-bold leading-[1.2] text-white md:text-4xl lg:text-[52px] lg:leading-[1.15]">
          {name}
        </h1>

        {/* Subtitle */}
        <p className="mb-8 max-w-[560px] font-proxima text-base leading-[1.7] text-white/70 md:text-lg">
          {subtitle ||
            `Study ${name} at ADMI. Graduate with an industry-recognized qualification accredited by Woolf University with credits towards a degree.`}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/enquiry"
            className="inline-flex items-center gap-2.5 rounded-lg bg-brand-red px-9 py-[18px] font-proxima text-[17px] font-semibold text-white transition hover:bg-[#a52830]"
          >
            Apply Now
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/enquiry"
            className="inline-flex items-center rounded-lg border-2 border-solid border-white bg-transparent px-9 py-[18px] font-proxima text-[17px] font-medium text-white transition hover:bg-white/10"
          >
            Enquire Now
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg bg-brand-whatsapp px-7 py-[18px] font-proxima text-[17px] font-medium text-white transition hover:bg-[#20bd5a]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
