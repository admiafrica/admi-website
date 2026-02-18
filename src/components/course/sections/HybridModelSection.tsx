import { IconUsers, IconDeviceLaptop, IconCalendarEvent, IconBriefcase } from '@tabler/icons-react'
import { HybridStep } from '@/data/diploma-course-data'

interface Props {
  steps?: HybridStep[]
  testimonial?: {
    quote: string
    name: string
    program: string
  }
}

const ICON_MAP = {
  laptop: IconDeviceLaptop,
  users: IconUsers,
  briefcase: IconBriefcase,
  calendar: IconCalendarEvent
}

const COLOR_MAP = ['#0A3D3D', '#C1272D', '#171717', '#8EBFB0']

const DEFAULT_STEPS: HybridStep[] = [
  {
    icon: 'laptop',
    title: 'Online Learning',
    duration: '10 weeks',
    description: 'Study theory, watch tutorials, and complete assignments from anywhere. Flexible scheduling that works around your life.'
  },
  {
    icon: 'users',
    title: 'Campus Bootcamp',
    duration: '2 weeks',
    description: 'Intensive hands-on training at our Nairobi campus. Access professional equipment, studios, and work alongside classmates.'
  },
  {
    icon: 'briefcase',
    title: 'Project Work',
    duration: '4 weeks',
    description: 'Apply what you learned by completing real-world projects. Build your portfolio with industry-standard deliverables.'
  },
  {
    icon: 'calendar',
    title: 'Continue the Cycle',
    duration: 'Next semester',
    description: 'Repeat the cycle each semester, building skills progressively. By graduation, you have 4 bootcamp experiences.'
  }
]

const DEFAULT_TESTIMONIAL = {
  quote: "The bootcamps were game-changing. I could study theory at my own pace online, but the two weeks on campus with real equipment and industry mentors is where everything clicked.",
  name: 'James Mwangi',
  program: 'Diploma Programme, Class of 2025'
}

export default function HybridModelSection({ steps = DEFAULT_STEPS, testimonial = DEFAULT_TESTIMONIAL }: Props) {
  return (
    <section className="section-padding bg-warm">
      <div className="section-container">
        <div className="mb-12 text-center">
          <h2 className="section-heading-light">
            How You&apos;ll Learn
          </h2>
          <p className="section-subheading-light mx-auto mt-4 max-w-2xl">
            Our proven hybrid model combines the flexibility of online learning with intensive hands-on bootcamps. 
            Study on your schedule, then master practical skills on campus.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-divider-light lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, index) => {
              const IconComponent = ICON_MAP[step.icon] || IconDeviceLaptop
              const color = COLOR_MAP[index % COLOR_MAP.length]
              
              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div 
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: color }}
                  >
                    <IconComponent size={24} />
                  </div>

                  {/* Content Card */}
                  <div className="rounded-lg bg-white p-6 text-center shadow-sm">
                    <span 
                      className="mb-2 inline-block rounded-full px-3 py-1 font-proxima text-xs font-medium text-white"
                      style={{ backgroundColor: color }}
                    >
                      {step.duration}
                    </span>
                    <h3 className="mb-2 font-proxima text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="font-proxima text-[15px] leading-[1.6] text-muted">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden text-center text-brand-red lg:block lg:absolute lg:-right-4 lg:top-6">
                      →
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Student Quote */}
        <div className="mt-12 rounded-lg bg-white p-8 text-center shadow-sm">
          <blockquote className="mx-auto max-w-3xl font-proxima text-[17px] italic leading-[1.6] text-foreground/80">
            &quot;{testimonial.quote}&quot;
          </blockquote>
          <div className="mt-4">
            <p className="font-proxima font-bold text-foreground">{testimonial.name}</p>
            <p className="font-proxima text-[15px] text-muted">{testimonial.program}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
