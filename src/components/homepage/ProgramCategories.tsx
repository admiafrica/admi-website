import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

interface ProgramCard {
  title: string
  description: string
  price: string
  buttonLabel: string
  href: string
  image: string
  imageAlt: string
  badge?: string
  bg: string
  priceColor: string
  buttonText: string
  buttonBg: string
}

const programs: ProgramCard[] = [
  {
    title: 'Diploma Programmes',
    description:
      '18-month comprehensive programmes with mandatory internship placement. Earn EU-accredited credits through Woolf University. TVETA Kenya registered.',
    price: '18 Months \u00b7 From KES 15,000/month',
    buttonLabel: 'View Diploma Programmes',
    href: '/courses/diploma-programs',
    image: '/images/homepage/diploma-students.jpg',
    imageAlt: 'ADMI diploma students collaborating in a creative studio',
    badge: 'EU-ACCREDITED',
    bg: 'bg-[#BA2E36]',
    priceColor: 'text-white/50',
    buttonText: 'text-[#BA2E36]',
    buttonBg: 'bg-white'
  },
  {
    title: 'Professional Certificates',
    description:
      '4-6 month intensive programmes for career changers and upskilling. Video Production, Digital Content Creation, Graphic Design & more.',
    price: '6 Months \u00b7 From KES 48,000 total',
    buttonLabel: 'View Certificates',
    href: '/courses/professional-certificates',
    image: '/images/homepage/professional-students.jpg',
    imageAlt: 'ADMI professional certificate student working on a video project',
    bg: 'bg-[#0A3D3D]',
    priceColor: 'text-[#08F6CF]/50',
    buttonText: 'text-[#0A0A0A]',
    buttonBg: 'bg-[#08F6CF]'
  },
  {
    title: 'Foundation Certificates',
    description:
      '4-6 month introductory programmes. No prior experience required. Discover your creative path in Multimedia, Music, Photography or Animation.',
    price: '3 Months \u00b7 From KES 48,000 total',
    buttonLabel: 'View Foundation Courses',
    href: '/courses/foundation-certificates',
    image: '/images/homepage/foundation-students.jpg',
    imageAlt: 'ADMI foundation certificate students discovering creative skills',
    badge: 'BEGINNERS WELCOME',
    bg: 'bg-[#3A1F0B]',
    priceColor: 'text-[#F76335]/50',
    buttonText: 'text-white',
    buttonBg: 'bg-[#F76335]'
  }
]

export default function ProgramCategories() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-[600px] text-center">
        <span className="mb-3 inline-block font-proxima text-[13px] font-bold uppercase tracking-[2px] text-[#8B1A1A]">
          OUR PROGRAMMES
        </span>
        <h2 className="font-nexa text-[32px] font-black text-[#171717] md:text-[40px]">Choose Your Programme</h2>
        <p className="mt-4 font-proxima text-base leading-relaxed text-[#555] md:text-[17px]">
          ADMI offers three levels of study. Select the pathway that matches your goals, experience, and schedule.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {programs.map((program) => (
          <div key={program.title} className={`${program.bg} flex flex-1 flex-col overflow-hidden rounded-2xl`}>
            {/* Image */}
            <div className="relative h-[180px] w-full bg-black/20">
              <Image
                src={program.image}
                alt={program.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-4 p-7 pb-9">
              {program.badge && (
                <span className="w-fit rounded-full bg-white/15 px-3.5 py-1.5 font-proxima text-[11px] font-bold tracking-wider text-white">
                  {program.badge}
                </span>
              )}

              <h3 className="font-nexa text-[24px] font-black text-white md:text-[28px]">{program.title}</h3>

              <p className="font-proxima text-[15px] leading-relaxed text-white/80">{program.description}</p>

              <span className={`mt-auto font-proxima text-sm font-semibold ${program.priceColor}`}>
                {program.price}
              </span>

              <Link
                href={program.href}
                className={`${program.buttonBg} ${program.buttonText} mt-2 flex w-fit items-center gap-2 rounded-lg px-7 py-3.5 font-proxima text-[15px] font-semibold transition-opacity hover:opacity-90`}
              >
                {program.buttonLabel}
                <IconArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
