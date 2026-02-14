import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

interface ProgramCard {
  title: string
  description: string
  duration: string
  buttonLabel: string
  href: string
  image: string
  imageAlt: string
  badge?: string
  bg: string
  buttonText: string
  buttonBg: string
}

const programs: ProgramCard[] = [
  {
    title: 'Diploma Programmes',
    description:
      '18-month comprehensive programmes with mandatory internship placement. Earn EU-accredited credits through Woolf University. TVETA Kenya registered.',
    duration: '18 Months',
    buttonLabel: 'View Diploma Programmes',
    href: '/courses/diploma-programs',
    image: '/images/homepage/diploma-students.jpg',
    imageAlt: 'ADMI diploma students collaborating in a creative studio',
    badge: 'EU-ACCREDITED',
    bg: 'bg-brand-red',
    buttonText: 'text-brand-red',
    buttonBg: 'bg-white'
  },
  {
    title: 'Professional Certificates',
    description:
      '4-6 month intensive programmes for career changers and upskilling. Video Production, Digital Content Creation, Graphic Design & more.',
    duration: '4\u20136 Months',
    buttonLabel: 'View Certificates',
    href: '/courses/professional-certificates',
    image: '/images/homepage/professional-students.jpg',
    imageAlt: 'ADMI professional certificate student working on a video project',
    badge: 'SKILLS UPGRADE',
    bg: 'bg-[#0A3D3D]',
    buttonText: 'text-admi-black',
    buttonBg: 'bg-secondary'
  },
  {
    title: 'Foundation Certificates',
    description:
      '4-6 month introductory programmes. No prior experience required. Discover your creative path in Multimedia, Music, Photography or Animation.',
    duration: '3\u20134 Months',
    buttonLabel: 'View Foundation Courses',
    href: '/courses/foundation-certificates',
    image: '/images/homepage/foundation-students.jpg',
    imageAlt: 'ADMI foundation certificate students discovering creative skills',
    badge: 'BEGINNERS WELCOME',
    bg: 'bg-[#3A1F0B]',
    buttonText: 'text-white',
    buttonBg: 'bg-brand-orange'
  }
]

export default function ProgramCategories() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-8 max-w-[600px] text-center md:mb-12">
          <span className="mb-3 inline-block font-proxima text-[13px] font-bold uppercase tracking-[2px] text-[#8B1A1A]">
            OUR PROGRAMMES
          </span>
          <h2 className="font-nexa text-[32px] font-black text-[#171717] md:text-[40px]">Choose Your Programme</h2>
          <p className="mt-3 font-proxima text-[15px] leading-relaxed text-[#555] md:mt-4 md:text-[17px]">
            ADMI offers three levels of study. Select the pathway that matches your goals, experience, and schedule.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
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
              <div className="flex flex-1 flex-col gap-3 p-5 pb-6 md:gap-4 md:p-7 md:pb-9">
                <div className="flex flex-wrap gap-2">
                  {program.badge && (
                    <span className="w-fit rounded-full bg-white/15 px-3.5 py-1.5 font-proxima text-[11px] font-bold tracking-wider text-white">
                      {program.badge}
                    </span>
                  )}
                  <span className="w-fit rounded-full bg-secondary/20 px-3.5 py-1.5 font-proxima text-[11px] font-bold tracking-wider text-secondary">
                    HYBRID
                  </span>
                </div>

                <h3 className="font-nexa text-[22px] font-black text-white md:text-[28px]">{program.title}</h3>

                <p className="font-proxima text-[14px] leading-relaxed text-white/80 md:text-[15px]">
                  {program.description}
                </p>

                <span className="mt-auto font-proxima text-sm font-semibold text-white/50">{program.duration}</span>

                <Link
                  href={program.href}
                  className={`${program.buttonBg} ${program.buttonText} mt-1.5 flex h-9 w-fit items-center gap-1.5 rounded-lg px-4 font-proxima text-[13px] font-semibold transition-opacity hover:opacity-90 md:mt-2 md:h-auto md:gap-2 md:px-7 md:py-3.5 md:text-[15px]`}
                >
                  {program.buttonLabel}
                  <IconArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Compare link */}
        <div className="mt-6 flex justify-center md:mt-8">
          <a
            href="#compare"
            className="inline-flex items-center gap-1.5 font-proxima text-[14px] font-semibold text-brand-red transition-colors hover:text-[#a52830] md:gap-2 md:text-[15px]"
          >
            Browse featured programmes
            <IconArrowRight size={16} stroke={2.5} />
          </a>
        </div>
      </div>
    </section>
  )
}
