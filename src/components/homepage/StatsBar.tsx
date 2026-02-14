const STATS = [
  { value: '88%', label: 'Graduate Employment Rate' },
  { value: '4,500+', label: 'Students & Alumni' },
  { value: '500+', label: 'Industry Partners' },
  { value: '4.8/5', label: 'Student Satisfaction Rating' }
] as const

export default function StatsBar() {
  return (
    <section className="w-full bg-admi-blue">
      {/* Desktop Layout */}
      <div className="mx-auto hidden max-w-[1280px] items-center justify-around px-8 py-10 md:flex">
        {STATS.map((stat, index) => (
          <div key={stat.label} className="flex items-center">
            {/* Stat */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-nexa text-[40px] font-black leading-none text-white">{stat.value}</span>
              <span className="font-proxima text-[13px] font-medium uppercase tracking-wider text-[#999]">
                {stat.label}
              </span>
            </div>

            {/* Divider (not after last item) */}
            {index < STATS.length - 1 && <div className="ml-8 h-12 w-px bg-[#333] lg:ml-12" />}
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-6 py-8 md:hidden">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <span className="font-nexa text-[28px] font-black leading-none text-white sm:text-[32px]">
              {stat.value}
            </span>
            <span className="font-proxima text-[11px] font-medium uppercase tracking-wider text-[#999] sm:text-[12px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
