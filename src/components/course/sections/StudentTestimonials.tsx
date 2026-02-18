import Link from 'next/link'
import { trackCTAClick } from '@/utils/track-event'

interface Testimonial {
  quote: string
  name: string
  role: string
  program: string
  type: 'alumni' | 'current'
}

interface StudentTestimonialsProps {
  testimonials: Testimonial[]
  courseName?: string
}

export default function StudentTestimonials({ testimonials, courseName }: StudentTestimonialsProps) {
  if (!testimonials.length) return null

  return (
    <section className="section-padding w-full bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label-light">Student &amp; Alumni Voices</span>
          <h2 className="section-heading-light">Current Students &amp; Graduates Share Their Experience</h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const isAlumni = testimonial.type === 'alumni'
            const avatarColors = ['bg-brand-red', 'bg-secondary', 'bg-brand-orange']
            return (
              <article
                key={index}
                className="flex flex-col gap-5 overflow-hidden rounded-2xl bg-[#f9f9f9] p-8 shadow-md transition-shadow hover:shadow-xl"
              >
                {/* Badge */}
                <span
                  className={`w-fit rounded-xl px-3 py-1 font-proxima text-[11px] font-bold uppercase ${
                    isAlumni ? 'bg-brand-red text-white' : 'bg-secondary text-[#171717]'
                  }`}
                >
                  {isAlumni ? 'Alumni' : 'Current Student'}
                </span>

                {/* Quote */}
                <blockquote className="flex-1">
                  <p className="font-proxima text-base italic leading-[1.7] text-[#333333]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 flex-shrink-0 rounded-full ${avatarColors[index % avatarColors.length]}`}
                    aria-label={`${testimonial.name} photo`}
                  />
                  <div>
                    <p className="font-proxima text-sm font-bold text-[#171717]">{testimonial.name}</p>
                    <p className="font-proxima text-xs text-[#666666]">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Inline CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="font-proxima text-base text-[#555555]">Join our community of creative professionals</p>
          <Link
            href="/enquiry"
            onClick={() => trackCTAClick('prospectus', 'testimonials', courseName)}
            className="inline-block rounded-lg border-2 border-brand-red px-8 py-3 font-proxima text-sm font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white"
          >
            Request Prospectus
          </Link>
        </div>
      </div>
    </section>
  )
}
