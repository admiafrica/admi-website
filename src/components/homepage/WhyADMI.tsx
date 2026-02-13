import { IconAward, IconBriefcase, IconUsers, IconWallet, type Icon } from '@tabler/icons-react'

interface Benefit {
  icon: Icon
  iconColor: string
  iconBg: string
  title: string
  description: string
}

const benefits: Benefit[] = [
  {
    icon: IconAward,
    iconColor: 'text-[#BA2E36]',
    iconBg: 'bg-[#BA2E36]/10',
    title: 'Internationally Accredited',
    description:
      'Earn EU-accredited credits through Woolf University. Pearson BTEC certified. Recognised by employers and institutions worldwide.'
  },
  {
    icon: IconBriefcase,
    iconColor: 'text-[#08F6CF]',
    iconBg: 'bg-[#08F6CF]/10',
    title: 'Internship Placement',
    description:
      'Every diploma student completes a mandatory industry placement. 88% of graduates are employed within 6 months.'
  },
  {
    icon: IconUsers,
    iconColor: 'text-[#F76335]',
    iconBg: 'bg-[#F76335]/10',
    title: 'Expert Faculty',
    description:
      'Learn from practising professionals from Safaricom, NMG, Standard Group and Kenya\u2019s leading creative studios.'
  },
  {
    icon: IconWallet,
    iconColor: 'text-[#BA2E36]',
    iconBg: 'bg-[#BA2E36]/10',
    title: 'Affordable Fees',
    description:
      'Pay per semester with flexible instalments. Diploma programmes from KES 15,000/month. No hidden costs.'
  }
]

export default function WhyADMI() {
  return (
    <section className="section-padding bg-[#f9f9f9]">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start gap-2 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="section-label-light">WHY STUDY AT ADMI</span>
          <h2 className="font-nexa text-[32px] font-black text-[#171717] md:text-[40px]">The ADMI Advantage</h2>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2">
        {benefits.map((benefit) => {
          const Icon = benefit.icon
          return (
            <div key={benefit.title} className="flex flex-col gap-4 rounded-2xl border border-[#eee] bg-white p-8">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${benefit.iconBg}`}>
                <Icon className={`${benefit.iconColor}`} size={32} stroke={1.5} />
              </div>

              <h3 className="font-proxima text-lg font-bold text-[#171717]">{benefit.title}</h3>

              <p className="font-proxima text-sm leading-relaxed text-[#555]">{benefit.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
