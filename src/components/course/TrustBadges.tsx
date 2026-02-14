import { IconWorld, IconAward, IconShieldCheck, IconUsers } from '@tabler/icons-react'

const TRUST_BADGES = [
  {
    icon: IconWorld,
    color: 'blue',
    title: 'Global Standards',
    description: 'Industry-recognized curriculum'
  },
  {
    icon: IconAward,
    color: 'orange',
    title: 'Employer Recognition',
    description: 'Trusted by 500+ companies'
  },
  {
    icon: IconShieldCheck,
    color: 'green',
    title: 'Ethical Practices',
    description: 'Digital-first assessment'
  },
  {
    icon: IconUsers,
    color: 'teal',
    title: '5,000+ Alumni',
    description: 'Building careers since 2012'
  }
] as const

/**
 * Trust & Social Proof Section
 * Displays credibility indicators to build confidence
 */
export function TrustBadges() {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="mb-6 text-center text-lg font-semibold text-gray-700" style={{ color: '#002A23' }}>
        Globally Recognized, Value-Driven Education
      </p>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {TRUST_BADGES.map((badge) => (
          <div key={badge.title} className="flex flex-col items-center gap-1">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <badge.icon size={28} />
            </span>
            <p className="text-center text-sm font-semibold text-gray-700">{badge.title}</p>
            <p className="text-center text-xs text-gray-500">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
