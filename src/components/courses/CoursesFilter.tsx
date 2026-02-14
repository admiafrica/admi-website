interface CoursesFilterProps {
  sortValue: string
  onSortChange: (value: string) => void
  sortOptions: string[]
}

export default function CoursesFilter({ sortValue, onSortChange, sortOptions }: CoursesFilterProps) {
  return (
    <section className="w-full bg-[#f9f9f9] px-4 py-8 md:px-20 md:py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left side - Title & Description */}
        <div className="flex flex-col gap-2">
          <h2 className="font-nexa text-[28px] font-bold text-[#171717]">Programmes</h2>
          <p className="max-w-[550px] font-proxima text-[15px] leading-relaxed text-[#666]">
            Diploma programmes prepare you for industry careers with hands-on training (from KES 15,000/month).
            Professional and foundation certificates offer focused skills development.
          </p>
        </div>

        {/* Right side - Sort dropdown */}
        <div className="flex items-center gap-3 rounded-lg border border-[#e0e0e0] bg-white px-5 py-3">
          <span className="font-proxima text-sm text-[#666]">Sort By:</span>
          <select
            value={sortValue}
            onChange={(e) => onSortChange(e.target.value)}
            className="font-proxima text-sm font-bold text-[#171717] outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}
