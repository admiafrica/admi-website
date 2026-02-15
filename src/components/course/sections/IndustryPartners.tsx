interface IndustryPartnersProps {
  partners: { name: string; type: string }[]
}

export default function IndustryPartners({ partners }: IndustryPartnersProps) {
  if (!partners.length) return null

  return (
    <section className="section-padding w-full bg-white" aria-label="Industry partners">
      <div className="section-container">
        <h2 className="section-heading-light text-center">Where Our Students Intern &amp; Get Hired</h2>

        <p className="section-subheading-light mx-auto mt-2 max-w-[600px] text-center">
          ADMI graduates are working across East Africa&apos;s leading creative and media companies.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {partners.map((partner, index) => (
            <div
              key={`partner-${index}`}
              className="flex flex-col items-center rounded-md border border-gray-200 bg-white p-4 text-center transition-shadow hover:shadow-md"
            >
              <span className="text-sm font-bold text-[#1a1a1a]">{partner.name}</span>
              <span className="mt-1 font-proxima text-xs text-[#666666]">{partner.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
