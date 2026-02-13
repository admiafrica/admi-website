const PARTNERS = ['NTV Kenya', 'Ogilvy', 'Safaricom', 'KBC', 'Showmax', 'Nairobi Film'] as const

export default function IndustryPartners() {
  return (
    <section className="w-full bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-8 md:py-12">
      {/* Header */}
      <p className="text-center font-proxima text-[15px] tracking-wider text-[#666]">
        Our Graduates Work With Leading Brands
      </p>

      {/* Desktop: single row */}
      <div className="mt-8 hidden items-center justify-around md:flex">
        {PARTNERS.map((name) => (
          <span key={name} className="w-[140px] text-center font-proxima text-lg font-bold text-[#555]">
            {name}
          </span>
        ))}
      </div>

      {/* Mobile: 3-column grid */}
      <div className="mt-8 grid grid-cols-3 gap-4 md:hidden">
        {PARTNERS.map((name) => (
          <span key={name} className="text-center font-proxima text-sm font-bold text-[#555]">
            {name}
          </span>
        ))}
      </div>
      </div>
    </section>
  )
}
