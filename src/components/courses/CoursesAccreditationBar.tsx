const BADGES = [
  { letter: 'W', bg: 'bg-[#08F6CF]', text: 'text-[#1a1a2e]', label: 'Woolf University Accredited', labelColor: 'text-white' },
  { letter: 'P', bg: 'bg-[#F76335]', text: 'text-white', label: 'Pearson BTEC Certified', labelColor: 'text-white/80' },
  { letter: 'K', bg: 'bg-[#BA2E36]', text: 'text-white', label: 'TVETA Kenya Registered', labelColor: 'text-white/80' },
] as const

export default function CoursesAccreditationBar() {
  return (
    <section className="w-full bg-[#1a1a2e]">
      <div className="flex flex-col items-center gap-4 px-4 py-4 md:flex-row md:justify-center md:gap-12 md:px-20">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {BADGES.map((badge) => (
            <div key={badge.letter} className="flex items-center gap-2.5">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full ${badge.bg}`}
              >
                <span className={`font-nexa text-sm font-bold ${badge.text}`}>
                  {badge.letter}
                </span>
              </div>
              <span className={`font-proxima text-[13px] font-semibold ${badge.labelColor}`}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider - desktop only */}
        <div className="hidden h-5 w-px bg-white/30 md:block" />

        {/* Intake pill */}
        <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#25D366]" />
          <span className="font-proxima text-xs font-semibold text-[#08F6CF]">
            May 2026 Intake Now Open
          </span>
        </div>
      </div>
    </section>
  )
}
