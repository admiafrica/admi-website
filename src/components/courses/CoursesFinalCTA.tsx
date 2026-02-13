import Link from 'next/link'

export function CoursesFinalCTA() {
  return (
    <section
      aria-labelledby="courses-cta-heading"
      className="w-full bg-gradient-to-br from-[#002A23] via-[#0A3D3D] to-[#0A0A0A] px-4 py-12 md:px-20 md:py-20"
    >
      <div className="mx-auto flex max-w-[900px] flex-col items-center">
        {/* Title */}
        <h2
          id="courses-cta-heading"
          className="font-nexa max-w-[700px] text-center text-[32px] font-black text-white md:text-[40px]"
        >
          Need Help Choosing a Programme?
        </h2>

        {/* Description */}
        <p className="font-proxima mt-4 max-w-[600px] text-center text-[17px] leading-relaxed text-white/80 md:mt-6">
          Our admissions team can guide you through programme options, entry
          requirements, and financial planning. Get in touch today.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-10">
          <Link
            href="/contact"
            className="font-proxima rounded-lg bg-[#08F6CF] px-9 py-4 text-center text-base font-bold text-[#002A23] transition hover:opacity-90"
          >
            Request Prospectus
          </Link>

          <Link
            href="/contact"
            className="font-proxima rounded-lg bg-[#25D366] px-9 py-4 text-center text-base font-bold text-white transition hover:opacity-90"
          >
            Chat with Admissions
          </Link>

          <Link
            href="/contact"
            className="font-proxima rounded-lg border border-white/50 bg-white/10 px-9 py-4 text-center text-base font-bold text-white backdrop-blur transition hover:opacity-90"
          >
            Book an Open Day
          </Link>
        </div>
      </div>
    </section>
  )
}
