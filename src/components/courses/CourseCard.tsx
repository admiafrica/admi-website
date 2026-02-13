import Image from 'next/image'
import Link from 'next/link'

export interface CourseCardProps {
  name: string
  slug: string
  description: string
  duration: string
  deliveryMode: string
  imageUrl?: string
  accentColor?: string
  accentBg?: string
}

export function CourseCard({
  name,
  slug,
  description,
  duration,
  deliveryMode,
  imageUrl,
  accentColor = '#BA2E36',
  accentBg = '#FFF0F0',
}: CourseCardProps) {
  return (
    <Link
      href={`/courses/${slug}`}
      className="group flex min-h-[430px] w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md md:w-[390px] md:flex-1"
      aria-label={`View ${name} programme`}
    >
      {/* Image Section */}
      <div className="relative h-[200px] w-full shrink-0 bg-[#1a1a1a]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 390px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-proxima text-sm text-[#666]">No image available</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 px-6 py-5">
        {/* Title */}
        <h3 className="font-proxima text-[17px] font-bold leading-snug text-[#171717]">
          {name}
        </h3>

        {/* Description */}
        <p className="line-clamp-3 font-proxima text-sm leading-relaxed text-[#666]">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-1.5 font-proxima text-xs font-semibold"
            style={{ color: accentColor, backgroundColor: accentBg }}
          >
            {duration}
          </span>
          <span className="rounded-full bg-[#f0f0f0] px-3 py-1.5 font-proxima text-xs font-semibold text-[#666]">
            {deliveryMode}
          </span>
        </div>

        {/* Spacer to push CTA to bottom */}
        <div className="flex-1" />

        {/* CTA Button */}
        <button
          type="button"
          className="w-full rounded-lg border-[1.5px] py-2.5 font-proxima text-sm font-bold transition-colors duration-200"
          style={{
            borderColor: accentColor,
            color: accentColor,
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget
            target.style.backgroundColor = accentColor
            target.style.color = '#FFFFFF'
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget
            target.style.backgroundColor = 'transparent'
            target.style.color = accentColor
          }}
          tabIndex={-1}
          aria-hidden="true"
        >
          View Programme &rarr;
        </button>
      </div>
    </Link>
  )
}
