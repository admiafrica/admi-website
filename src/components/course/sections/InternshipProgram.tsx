import Image from 'next/image'
import { IconBriefcase, IconCalendar, IconPercentage, IconUsers } from '@tabler/icons-react'
import { InternshipStat, InternshipPartner, InternshipStory } from '@/data/diploma-course-data'

interface Props {
  stats?: InternshipStat[]
  steps?: string[]
  partners?: InternshipPartner[]
  stories?: InternshipStory[]
}

const STAT_ICONS = [IconPercentage, IconCalendar, IconBriefcase, IconUsers]

const DEFAULT_STATS: InternshipStat[] = [
  { value: '100%', label: 'Placement Rate' },
  { value: '3 months', label: 'Minimum Duration' },
  { value: '65%', label: 'Convert to Full-Time' },
  { value: '50+', label: 'Partner Companies' }
]

const DEFAULT_STEPS = [
  'Complete 4 semesters of coursework with passing grades',
  'Work with career services to match with partner companies',
  'Complete 3-month placement with mentorship and evaluation'
]

const DEFAULT_PARTNERS: InternshipPartner[] = [
  { name: 'Nation Media Group', industry: 'Media' },
  { name: 'Standard Group', industry: 'Media' },
  { name: 'Homeboyz Entertainment', industry: 'Entertainment' },
  { name: 'Ketebul Music', industry: 'Music' },
  { name: 'Radio Africa', industry: 'Broadcast' },
  { name: 'Royal Media Services', industry: 'Media' }
]

const DEFAULT_STORIES: InternshipStory[] = [
  {
    name: 'Sarah Wanjiku',
    role: 'Audio Engineer',
    company: 'Ketebul Music',
    quote: 'Started as an intern, now mixing tracks for East African artists. The internship gave me real studio hours.',
    graduationYear: '2024'
  },
  {
    name: 'Kevin Ochieng',
    role: 'Video Editor',
    company: 'Nation Media Group',
    quote: 'My internship at Nation led directly to a full-time role. I was editing news packages within my first month.',
    graduationYear: '2025'
  }
]

export default function InternshipProgram({ 
  stats = DEFAULT_STATS,
  steps = DEFAULT_STEPS,
  partners = DEFAULT_PARTNERS,
  stories = DEFAULT_STORIES
}: Props) {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="section-label-light mb-4 inline-block">
            5th Semester
          </span>
          <h2 className="section-heading-light">
            Your Industry Internship
          </h2>
          <p className="section-subheading-light mx-auto mt-4 max-w-2xl">
            The final semester of your diploma is spent in the industry. 
            A 3-month paid placement where you&apos;ll apply everything you&apos;ve learned in a real work environment.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComponent = STAT_ICONS[index % STAT_ICONS.length]
            return (
              <div key={index} className="rounded-lg bg-warm p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-admi-green">
                  <IconComponent size={24} className="text-white" />
                </div>
                <p className="font-proxima text-xl font-bold text-admi-green md:text-2xl">{stat.value}</p>
                <p className="font-proxima text-[15px] text-muted">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h3 className="mb-6 text-center font-proxima text-xl font-bold text-foreground md:text-2xl">
            How the Internship Works
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="rounded-lg border border-divider-light p-6">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-red font-proxima text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="font-proxima text-[15px] leading-[1.6] text-muted">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Companies */}
        <div className="mb-12">
          <h3 className="mb-6 text-center font-proxima text-lg font-bold text-foreground md:text-xl">
            Where Our Students Intern
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-center rounded-lg bg-warm p-4 text-center"
              >
                <p className="font-proxima font-medium text-foreground">{partner.name}</p>
                <p className="font-proxima text-xs text-muted">{partner.industry}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-proxima text-[15px] text-muted">
            And 40+ more companies across Kenya and East Africa
          </p>
        </div>

        {/* Success Stories */}
        <div>
          <h3 className="mb-6 text-center font-proxima text-lg font-bold text-foreground md:text-xl">
            From Intern to Employee
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {stories.map((story, index) => (
              <div key={index} className="flex gap-4 rounded-lg bg-warm p-6">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-divider-light">
                  {story.image && (
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="mb-2 font-proxima text-[15px] italic leading-[1.6] text-foreground/80">&quot;{story.quote}&quot;</p>
                  <p className="font-proxima font-bold text-foreground">{story.name}</p>
                  <p className="font-proxima text-[15px] text-muted">{story.role} at {story.company}</p>
                  <p className="font-proxima text-xs text-muted-light">Class of {story.graduationYear}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
