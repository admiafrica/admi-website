import { IconSearch } from '@tabler/icons-react'

interface CoursesHeroProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearch: () => void
}

export default function CoursesHero({ searchQuery, onSearchChange, onSearch }: CoursesHeroProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <section aria-labelledby="courses-hero-heading" className="section-padding w-full bg-admi-green">
      <div className="section-container flex max-w-[900px] flex-col items-center">
        {/* Heading */}
        <h1 id="courses-hero-heading" className="text-center font-nexa text-4xl font-black text-white md:text-5xl">
          Explore Our Programmes
        </h1>

        {/* Subheading */}
        <p className="mt-4 max-w-[650px] text-center font-proxima text-[17px] leading-relaxed text-white/80 md:mt-6">
          Browse accredited diploma and certificate programmes in film, design, music, animation, and digital media at
          East Africa&apos;s leading creative arts institute.
        </p>

        {/* Search Bar */}
        <div className="mt-8 w-full max-w-[700px] md:mt-10">
          <div className="flex items-center rounded-xl border-0 bg-white p-1 pl-4 shadow-lg shadow-black/10 md:pl-6">
            <IconSearch size={20} className="mr-2 shrink-0 text-[#999]" aria-hidden="true" />
            <label htmlFor="course-search" className="sr-only">
              Search for a course
            </label>
            <input
              id="course-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for course e.g. Graphic Design, Content Creation"
              className="min-w-0 flex-1 border-0 bg-transparent font-proxima text-[15px] text-[#333] placeholder-[#999] outline-none"
            />
            <button
              type="button"
              onClick={onSearch}
              className="shrink-0 rounded-lg bg-brand-red px-8 py-3.5 font-proxima text-sm font-bold text-white transition-colors hover:bg-[#a52830] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
