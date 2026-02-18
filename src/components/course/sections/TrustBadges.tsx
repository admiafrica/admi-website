import { IconShieldCheck, IconUsers, IconTrophy, IconBriefcase } from '@tabler/icons-react'

const TRUST_STATS = [
  {
    icon: IconShieldCheck,
    value: 'EU Accredited',
    label: 'Woolf University Partnership',
    iconBg: 'bg-secondary/20',
    iconColor: 'text-secondary'
  },
  {
    icon: IconUsers,
    value: '5,000+',
    label: 'Graduates Since 2007',
    iconBg: 'bg-brand-red/10',
    iconColor: 'text-brand-red'
  },
  {
    icon: IconTrophy,
    value: '92%',
    label: 'Graduate Employment Rate',
    iconBg: 'bg-[#D9DC5B]/20',
    iconColor: 'text-[#D9DC5B]'
  },
  {
    icon: IconBriefcase,
    value: '200+',
    label: 'Industry Partners',
    iconBg: 'bg-brand-orange/10',
    iconColor: 'text-brand-orange'
  }
]

const ACCREDITATION_LOGOS = [
  { name: 'Woolf University', subtitle: 'EU-Accredited ECTS Credits' },
  { name: 'TVETA Kenya', subtitle: 'Registered Institution' },
  { name: 'KNQA', subtitle: 'Recognised Qualifications' }
]

export default function TrustBadges() {
  return (
    <section className="w-full bg-[#f7f5f2] py-8">
      <div className="section-container">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {TRUST_STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.value}
                className="flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm"
              >
                <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${stat.iconBg}`}>
                  <Icon size={20} className={stat.iconColor} />
                </div>
                <span className="font-nexa text-lg font-bold text-gray-900 md:text-xl">
                  {stat.value}
                </span>
                <span className="font-proxima text-[12px] text-gray-500 md:text-[13px]">
                  {stat.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Accreditation Logos */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="mb-4 text-center font-proxima text-[11px] font-bold uppercase tracking-[2px] text-gray-400">
            Accredited & Recognised By
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {ACCREDITATION_LOGOS.map((logo) => (
              <div key={logo.name} className="flex flex-col items-center gap-1">
                <div className="flex h-10 w-24 items-center justify-center rounded-lg bg-white px-3 shadow-sm">
                  <span className="font-nexa text-[11px] font-bold text-gray-700">{logo.name}</span>
                </div>
                <span className="font-proxima text-[10px] text-gray-400">{logo.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
