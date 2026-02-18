import Link from 'next/link'
import { IconBrandWhatsapp } from '@tabler/icons-react'

const WHATSAPP_URL =
  'https://wa.me/254711082222?text=Hi%20ADMI%2C%20I%20need%20help%20choosing%20the%20right%20programme.'

interface Row {
  label: string
  diploma: string
  profCert: string
  foundation: string
}

const rows: Row[] = [
  { label: 'Duration', diploma: '18 months', profCert: '4\u20136 months', foundation: '3\u20134 months' },
  {
    label: 'Accreditation',
    diploma: 'Woolf (EU-ECTS) + TVETA',
    profCert: 'ADMI + TVETA',
    foundation: 'ADMI Certificate'
  },
  { label: 'Internship', diploma: 'Mandatory placement', profCert: 'Optional project', foundation: 'No' },
  { label: 'Degree Pathway', diploma: 'Yes \u2014 top-up to BA', profCert: 'No', foundation: 'Progress to Diploma' },
  { label: 'Prior Experience', diploma: 'KCSE or equivalent', profCert: 'None required', foundation: 'None required' },
  {
    label: 'Ideal For',
    diploma: 'Career starters',
    profCert: 'Career changers & upskilling',
    foundation: 'Beginners & explorers'
  },
  { label: 'Learning Format', diploma: 'Hybrid', profCert: 'Hybrid', foundation: 'Hybrid' }
]

const columnHeaders = [
  { label: 'Diploma', color: 'text-brand-red', bg: 'bg-brand-red/10', href: '/courses/diploma-programs' },
  {
    label: 'Professional Certificate',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    href: '/courses/professional-certificates'
  },
  {
    label: 'Foundation Certificate',
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
    href: '/courses/foundation-certificates'
  }
]

export default function ProgramComparison() {
  return (
    <section id="compare" className="section-padding bg-[#f9f9f9]">
      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-[600px] text-center">
          <span className="section-label-light">COMPARE PROGRAMMES</span>
          <h2 className="section-heading-light">Find the Right Fit</h2>
          <p className="section-subheading-light mt-4">
            Not sure which programme is right for you? Compare them side by side.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="px-6 py-5 text-left font-proxima text-sm font-semibold text-[#999]">Feature</th>
                {columnHeaders.map((col) => (
                  <th key={col.label} className="px-6 py-5 text-left">
                    <Link
                      href={col.href}
                      className={`inline-flex rounded-full px-4 py-1.5 font-proxima text-sm font-bold ${col.color} ${col.bg} transition-opacity hover:opacity-80`}
                    >
                      {col.label}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i < rows.length - 1 ? 'border-b border-[#f0f0f0]' : ''}>
                  <td className="px-6 py-4 font-proxima text-sm font-semibold text-[#171717]">{row.label}</td>
                  <td className="px-6 py-4 font-proxima text-sm text-[#555]">{row.diploma}</td>
                  <td className="px-6 py-4 font-proxima text-sm text-[#555]">{row.profCert}</td>
                  <td className="px-6 py-4 font-proxima text-sm text-[#555]">{row.foundation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards */}
        <div className="flex flex-col gap-6 md:hidden">
          {columnHeaders.map((col, colIdx) => (
            <div key={col.label} className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white">
              <div className="border-b border-[#e5e5e5] px-6 py-4">
                <Link
                  href={col.href}
                  className={`inline-flex rounded-full px-4 py-1.5 font-proxima text-sm font-bold ${col.color} ${col.bg}`}
                >
                  {col.label}
                </Link>
              </div>
              <div className="divide-y divide-[#f0f0f0]">
                {rows.map((row) => (
                  <div key={row.label} className="flex justify-between px-6 py-3">
                    <span className="font-proxima text-sm font-semibold text-[#171717]">{row.label}</span>
                    <span className="font-proxima text-sm text-[#555]">
                      {colIdx === 0 ? row.diploma : colIdx === 1 ? row.profCert : row.foundation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <IconBrandWhatsapp size={20} />
            Still not sure? Chat with Admissions
          </a>
        </div>
      </div>
    </section>
  )
}
