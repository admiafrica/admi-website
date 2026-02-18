interface ImpactStatsProps {
  stats: { value: string; label: string }[]
}

export default function ImpactStats({ stats }: ImpactStatsProps) {
  return (
    <section className="section-padding w-full bg-[#171717]" aria-label="ADMI impact statistics">
      <div className="section-container">
        <h2 className="section-heading-dark mb-10 text-center">ADMI By The Numbers</h2>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat, index) => (
            <div key={`stat-${index}`} className="flex flex-col items-center text-center">
              <span className="font-proxima text-3xl font-bold text-secondary md:text-[42px]">{stat.value}</span>
              <span className="section-subheading-dark mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
