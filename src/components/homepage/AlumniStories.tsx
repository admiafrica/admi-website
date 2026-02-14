import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

interface AlumniCard {
  name: string
  role: string
  graduation: string
  quote: string
  image: string
  imageAlt: string
}

const alumni: AlumniCard[] = [
  {
    name: 'Grace Muthoni',
    role: 'Senior Editor at NTV Kenya',
    graduation: 'Film Production Diploma, Class of 2022',
    quote:
      'ADMI\u2019s hands-on training prepared me for the real world. Within 3 months of graduating, I was working at NTV.',
    image: '/images/homepage/alumni-grace.jpg',
    imageAlt: 'Grace Muthoni, ADMI graduate and Senior Editor at NTV Kenya'
  },
  {
    name: 'David Kimani',
    role: 'Creative Director at Ogilvy Africa',
    graduation: 'Graphic Design Diploma, Class of 2021',
    quote:
      'The portfolio I built at ADMI caught the eye of top agencies. I went from student to Creative Director in 3 years.',
    image: '/images/homepage/alumni-david.jpg',
    imageAlt: 'David Kimani, ADMI graduate and Creative Director at Ogilvy Africa'
  },
  {
    name: 'Wanjiku Njeri',
    role: 'Sound Engineer at Ogopa DJs',
    graduation: 'Sound Engineering Diploma, Class of 2023',
    quote:
      'I\u2019m now working with some of Kenya\u2019s biggest artists. ADMI gave me the technical foundation and industry connections.',
    image: '/images/homepage/alumni-wanjiku.jpg',
    imageAlt: 'Wanjiku Njeri, ADMI graduate and Sound Engineer at Ogopa DJs'
  }
]

export default function AlumniStories() {
  return (
    <section className="section-padding bg-[#f9f9f9]">
      <div className="section-container">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start gap-3 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-4">
          <div>
            <span className="mb-3 inline-block font-proxima text-sm font-semibold uppercase tracking-[2px] text-brand-red">
              GRADUATE OUTCOMES
            </span>
            <h2 className="font-nexa text-[32px] font-black text-[#171717] md:text-4xl">
              Where Our Graduates Work Today
            </h2>
          </div>

          <Link
            href="/alumni"
            className="flex h-9 items-center gap-1.5 rounded-full border-[1.5px] border-brand-red px-4 font-proxima text-[12px] font-bold text-brand-red transition-colors hover:bg-brand-red hover:text-white md:h-auto md:gap-2 md:px-7 md:py-3 md:text-sm"
          >
            View All Stories
            <IconArrowRight size={16} />
          </Link>
        </div>

        {/* Alumni Cards */}
        <div className="flex flex-col gap-6 md:flex-row">
          {alumni.map((person) => (
            <div
              key={person.name}
              className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:h-[380px]"
            >
              {/* Image */}
              <div className="relative h-[180px] w-full bg-[#e5e5e5]">
                <Image
                  src={person.image}
                  alt={person.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-2 px-6 py-5">
                <h3 className="font-proxima text-[17px] font-bold text-[#171717]">{person.name}</h3>
                <span className="font-proxima text-sm text-brand-red">{person.role}</span>
                <span className="font-proxima text-[13px] text-[#999]">{person.graduation}</span>
                <p className="mt-1 font-proxima text-sm italic leading-relaxed text-[#666]">
                  &ldquo;{person.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
