import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

interface ShowcaseItem {
  image: string
  imageAlt: string
  label: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    image: '/images/homepage/showcase-film.jpg',
    imageAlt: 'Student-produced film and documentary work at ADMI',
    label: 'Film & Documentary'
  },
  {
    image: '/images/homepage/showcase-design.jpg',
    imageAlt: 'Student graphic design and branding projects at ADMI',
    label: 'Graphic Design & Branding'
  },
  {
    image: '/images/homepage/showcase-music.jpg',
    imageAlt: 'Student music and sound production at ADMI studio',
    label: 'Music & Sound Production'
  }
]

export default function StudentShowcase() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
      {/* Header */}
      <div className="mb-10 md:mb-12">
        <span className="section-label-light">STUDENT WORK</span>
        <h2 className="font-nexa text-[32px] font-black text-[#171717] md:text-[40px]">See What Our Students Create</h2>
        <p className="mt-4 max-w-[640px] font-proxima text-base leading-relaxed text-[#555] md:text-[17px]">
          From short films to brand campaigns, music productions to animated stories — explore the work our students
          produce during their studies at ADMI.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-5 md:flex-row">
        {showcaseItems.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col overflow-hidden rounded-xl">
            {/* Image */}
            <div className="relative h-[220px] w-full bg-[#1a1a1a]">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            {/* Label */}
            <div className="bg-[#171717] px-5 py-4">
              <span className="font-proxima text-[15px] font-semibold text-white">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/student-showcase"
          className="flex items-center gap-2 rounded-lg border-[1.5px] border-[#BA2E36] px-8 py-3.5 font-proxima text-[15px] font-semibold text-[#BA2E36] transition-colors hover:bg-[#BA2E36] hover:text-white"
        >
          View Student Showcase
          <IconArrowRight size={16} />
        </Link>
      </div>
      </div>
    </section>
  )
}
