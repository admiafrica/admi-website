import Image from 'next/image'
import { IndustryQuoteItem } from '@/data/diploma-course-data'

interface Props {
  quotes?: IndustryQuoteItem[]
  companies?: string[]
}

const DEFAULT_QUOTES: IndustryQuoteItem[] = [
  {
    quote: 'ADMI graduates come prepared. They understand both the creative and technical sides of production. We don\'t need to teach them basics - they\'re ready to contribute from day one.',
    name: 'David Odhiambo',
    role: 'Head of Production',
    company: 'Nation Media Group'
  },
  {
    quote: 'The practical experience they gain during bootcamps and internships shows. When we hire ADMI diploma graduates, we\'re hiring professionals who understand studio workflows.',
    name: 'Grace Muthoni',
    role: 'Studio Manager',
    company: 'Ketebul Music'
  },
  {
    quote: 'We\'ve hired 12 ADMI interns over the past two years. Eight of them are now full-time employees. That says everything about the quality of training they receive.',
    name: 'Michael Kamau',
    role: 'Creative Director',
    company: 'Homeboyz Entertainment'
  }
]

const DEFAULT_COMPANIES = [
  'Nation Media Group',
  'Standard Group',
  'Royal Media Services',
  'Ketebul Music',
  'Homeboyz Entertainment',
  'Radio Africa',
  'Safaricom',
  'Scanad Kenya',
  'Ogilvy Kenya',
  'Dentsu Kenya',
  'Tiger Brands',
  'UNICEF Kenya'
]

export default function IndustryValidation({ 
  quotes = DEFAULT_QUOTES,
  companies = DEFAULT_COMPANIES
}: Props) {
  return (
    <section className="section-padding bg-warm">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="section-heading-light">
            What the Industry Says
          </h2>
          <p className="section-subheading-light mx-auto mt-4 max-w-2xl">
            Don&apos;t take our word for it. Here&apos;s what hiring managers and industry 
            professionals say about ADMI diploma graduates.
          </p>
        </div>

        {/* Quotes */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {quotes.map((item, index) => (
            <div 
              key={index}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="mb-4 text-4xl text-brand-red">&ldquo;</div>
              <p className="mb-6 font-proxima text-[17px] leading-[1.6] text-foreground/80">
                {item.quote}
              </p>
              <div className="flex items-center gap-4 border-t border-divider-light pt-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-divider-light">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-proxima font-bold text-foreground">{item.name}</p>
                  <p className="font-proxima text-[15px] text-muted">{item.role}</p>
                  <p className="font-proxima text-[15px] font-medium text-admi-green">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Companies That Hire */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-center font-proxima text-lg font-bold text-foreground md:text-xl">
            Where Our Graduates Work
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {companies.map((company, index) => (
              <div 
                key={index}
                className="flex items-center justify-center rounded-lg border border-divider-light bg-warm px-4 py-4 text-center"
              >
                <span className="font-proxima text-[15px] font-medium text-foreground">{company}</span>
              </div>
            ))}
          </div>
          <p className="section-subheading-light mt-6 text-center">
            Based on graduate employment data from 2023-2025
          </p>
        </div>
      </div>
    </section>
  )
}
