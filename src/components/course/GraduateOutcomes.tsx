'use client'

import { IconBriefcase, IconCash, IconCertificate, IconTrendingUp, IconUsers } from '@tabler/icons-react'

type Props = {
  isDiploma?: boolean
  employmentRate?: number // e.g., 85
  averageSalaryRange?: string // e.g., "KES 45,000 - 120,000"
  timeToEmployment?: string // e.g., "3-6 months"
}

// Default industry partners/employers
const defaultPartners = [
  { name: 'Safaricom', logo: '/images/partners/safaricom.png' },
  { name: 'Nation Media', logo: '/images/partners/nation.png' },
  { name: 'Standard Group', logo: '/images/partners/standard.png' },
  { name: 'Royal Media', logo: '/images/partners/royal.png' },
  { name: 'Capital FM', logo: '/images/partners/capital.png' },
  { name: 'Multichoice', logo: '/images/partners/multichoice.png' }
]

const colorMap: Record<string, { bg: string; text: string }> = {
  teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  grape: { bg: 'bg-purple-100', text: 'text-purple-600' }
}

export default function GraduateOutcomes({
  isDiploma = true,
  employmentRate = isDiploma ? 85 : 75,
  averageSalaryRange = isDiploma ? 'KES 45,000 - 120,000' : 'KES 25,000 - 80,000',
  timeToEmployment = isDiploma ? '3-6 months' : '1-3 months'
}: Props) {
  const stats = [
    {
      icon: IconBriefcase,
      label: 'Employment Rate',
      value: `${employmentRate}%`,
      subtext: 'within 6 months of graduation',
      color: 'teal'
    },
    {
      icon: IconCash,
      label: 'Average Salary',
      value: averageSalaryRange,
      subtext: 'per month (entry level)',
      color: 'yellow'
    },
    {
      icon: IconTrendingUp,
      label: 'Time to First Job',
      value: timeToEmployment,
      subtext: 'after completing program',
      color: 'blue'
    },
    {
      icon: IconUsers,
      label: 'Alumni Network',
      value: '5,000+',
      subtext: 'graduates across Africa',
      color: 'grape'
    }
  ]

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 py-16">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="text-center">
            <span className="mb-3 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-700">
              Graduate Success
            </span>
            <h2 className="font-nexa text-xl font-black text-white">
              Where Our {isDiploma ? 'Diploma' : 'Certificate'} Graduates Work
            </h2>
            <p className="mt-2 text-gray-400">
              Join thousands of successful graduates building careers in creative media
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => {
              const colors = colorMap[stat.color] || colorMap.teal
              return (
                <div key={index} className="flex flex-col items-center gap-3 rounded-lg bg-gray-800 p-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}>
                    <stat.icon size={24} />
                  </div>
                  <p className="text-center text-xl font-black text-white">{stat.value}</p>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">{stat.label}</p>
                    <p className="text-xs text-gray-400">{stat.subtext}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Employment Progress Bar */}
          <div className="rounded-lg bg-gray-800 p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-white">Graduate Employment Rate</span>
              <span className="text-sm font-bold text-teal-400">{employmentRate}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700">
              <div
                className="h-full rounded-full bg-teal-500 transition-all duration-500"
                style={{ width: `${employmentRate}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Based on {isDiploma ? '2023-2024' : '2024-2025'} graduate tracking data
            </p>
          </div>

          {/* Industry Partners */}
          <div>
            <p className="mb-4 text-center text-sm text-gray-400">Our graduates have been hired by</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {defaultPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex h-12 w-24 items-center justify-center rounded-md bg-white/10 px-4 py-2 grayscale transition-all hover:bg-white/20 hover:grayscale-0"
                >
                  <span className="text-center text-xs font-medium text-white">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accreditation Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/40 px-4 py-1.5 text-sm font-semibold text-yellow-400">
              <IconCertificate size={16} />
              TVETA Accredited
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 px-4 py-1.5 text-sm font-semibold text-blue-400">
              <IconCertificate size={16} />
              Pearson Assured
            </span>
            {isDiploma && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 px-4 py-1.5 text-sm font-semibold text-purple-400">
                <IconCertificate size={16} />
                Woolf University Partner
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
