interface IndustryQuoteProps {
  quote: string
  author: string
  role: string
}

export default function IndustryQuote({ quote, author, role }: IndustryQuoteProps) {
  if (!quote) return null

  return (
    <section className="w-full bg-[#1a1a1a] px-4 py-16 md:px-[120px]" aria-label="Industry quote">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-5 text-center">
        {/* Decorative quotation mark */}
        <span className="font-nexa text-[80px] leading-[0.5] text-brand-red" aria-hidden="true">
          &ldquo;
        </span>

        <blockquote>
          <p className="mx-auto max-w-[900px] font-nexa text-lg italic leading-[1.6] text-white md:text-[22px]">
            {quote}
          </p>
        </blockquote>

        <figcaption>
          <p className="font-proxima text-[15px] font-semibold text-secondary">
            — {author}, {role}
          </p>
        </figcaption>
      </div>
    </section>
  )
}
