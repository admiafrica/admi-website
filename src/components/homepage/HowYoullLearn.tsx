import Link from 'next/link'
import { IconDeviceLaptop, IconBuildingFactory2, IconUserStar, IconArrowRight } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'

interface Feature {
  icon: Icon
  iconColor: string
  iconBg: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: IconDeviceLaptop,
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary/10',
    title: 'Online Sessions',
    description:
      'Live lectures and tutorials streamed to your device. Every session is recorded so you can replay at your own pace.'
  },
  {
    icon: IconBuildingFactory2,
    iconColor: 'text-brand-orange',
    iconBg: 'bg-brand-orange/10',
    title: 'On-Campus Practicals',
    description:
      'Hands-on studio sessions at our Nairobi campus with industry-standard equipment, supervised by expert faculty.'
  },
  {
    icon: IconUserStar,
    iconColor: 'text-brand-red',
    iconBg: 'bg-brand-red/10',
    title: 'Industry Mentorship',
    description:
      'One-on-one guidance from practising professionals who work at Kenya\u2019s leading creative studios and media houses.'
  }
]

export default function HowYoullLearn() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <span className="section-label-light">HOW YOU&apos;LL LEARN</span>
          <h2 className="section-heading-light mb-4">Flexible Hybrid Learning</h2>
          <p className="section-subheading-light max-w-[600px]">
            Our hybrid model blends the convenience of online learning with the depth of in-person studio time &mdash;
            so you build real skills without putting your life on hold.
          </p>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-col gap-4 rounded-2xl border border-[#eee] bg-[#f9f9f9] p-8"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}>
                  <Icon className={feature.iconColor} size={28} stroke={1.5} />
                </div>
                <h3 className="font-proxima text-lg font-bold text-[#171717]">{feature.title}</h3>
                <p className="font-proxima text-sm leading-relaxed text-[#555]">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-proxima text-[15px] font-semibold text-brand-red transition-colors hover:text-[#a52830]"
          >
            Visit Our Campus
            <IconArrowRight size={16} stroke={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
