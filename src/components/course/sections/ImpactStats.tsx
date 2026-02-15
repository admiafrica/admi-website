interface ImpactStatsProps {
  stats: { value: string; label: string }[]
}

export default function ImpactStats({ stats }: ImpactStatsProps) {
  return (
    <section className="w-full bg-[#171717] py-16" aria-label="ADMI impact statistics">
      <div className="section-container">
        <h2 className="mb-10 text-center font-nexa text-[28px] font-bold text-white">ADMI By The Numbers</h2>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat, index) => (
            <div key={`stat-${index}`} className="flex flex-col items-center text-center">
              <span className="font-proxima text-3xl font-bold text-secondary md:text-[44px]">{stat.value}</span>
              <span className="mt-1 font-proxima text-[13px] text-[#999999]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
