import { IconCertificate, IconBuildingFactory, IconSchool, IconUsers, IconDeviceDesktop, IconBriefcase, IconCamera } from '@tabler/icons-react'
import { DiplomaExclusive } from '@/data/diploma-course-data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  equipment: IconCamera,
  briefcase: IconBriefcase,
  graduation: IconSchool,
  network: IconUsers,
  portfolio: IconDeviceDesktop,
  mentor: IconBuildingFactory
}

const DEFAULT_EXCLUSIVES: DiplomaExclusive[] = [
  {
    icon: 'equipment',
    title: 'Industry Equipment Access',
    description: 'Hands-on time with professional-grade equipment during bootcamps. SSL consoles, RED cameras, Pro Tools studios - the same gear used in top studios.'
  },
  {
    icon: 'briefcase',
    title: '3-Month Industry Internship',
    description: 'Your 5th semester is a paid internship at a partner company. Real work experience before graduation.'
  },
  {
    icon: 'graduation',
    title: 'Degree Pathway',
    description: 'Transfer your credits to Woolf University and earn an internationally recognized Bachelor\'s degree. Complete your degree in just one additional year.'
  },
  {
    icon: 'network',
    title: 'Alumni Network',
    description: 'Join 2,000+ creative professionals across East Africa. Access job opportunities, mentorship, and collaborations within the ADMI community.'
  },
  {
    icon: 'portfolio',
    title: 'Extended Portfolio Development',
    description: '4 semesters of project work plus internship. Graduate with a professional portfolio that showcases real-world experience.'
  },
  {
    icon: 'mentor',
    title: 'Industry Mentorship',
    description: 'Learn directly from working professionals. Our faculty aren\'t just teachers - they\'re active practitioners.'
  }
]

interface DiplomaExclusiveSectionProps {
  courseName?: string
  exclusives?: DiplomaExclusive[]
}

export default function DiplomaExclusiveSection({ 
  courseName = 'Diploma',
  exclusives = DEFAULT_EXCLUSIVES 
}: DiplomaExclusiveSectionProps) {
  return (
    <section className="section-padding bg-admi-green">
      <div className="section-container">
        <div className="mb-12 text-center">
          <span className="section-label-dark mb-4 inline-block">
            Diploma Exclusive
          </span>
          <h2 className="section-heading-dark">
            What {courseName} Students Get
          </h2>
          <p className="section-subheading-dark mx-auto mt-4 max-w-2xl">
            The diploma program isn&apos;t just longer - it&apos;s a completely different experience. 
            Here&apos;s what&apos;s only available to diploma students.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exclusives.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon] || IconCertificate
            return (
              <div 
                key={index}
                className="group rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 font-proxima text-xs font-medium text-white">
                    Diploma Only
                  </span>
                </div>
                <h3 className="mb-2 font-proxima text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="font-proxima text-[15px] leading-[1.6] text-secondary/80">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 font-proxima text-[17px] leading-[1.6] text-white">
            Ready to get the full experience?
          </p>
          <a 
            href="#apply"
            className="inline-block rounded-lg bg-brand-red px-8 py-3 font-proxima font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Apply for {courseName}
          </a>
        </div>
      </div>
    </section>
  )
}
