import { CourseCard } from './CourseCard'

interface ProgramSectionProps {
  title: string
  iconLetter: string
  iconBgColor: string
  iconTextColor: string
  meta: string
  bgColor?: string
  accentColor: string
  accentBg: string
  courses: Array<{
    name: string
    slug: string
    description: string
    duration: string
    deliveryMode: string
    imageUrl?: string
  }>
}

export default function ProgramSection({
  title,
  iconLetter,
  iconBgColor,
  iconTextColor,
  meta,
  bgColor = 'bg-white',
  accentColor,
  accentBg,
  courses
}: ProgramSectionProps) {
  if (courses.length === 0) return null

  return (
    <section className={`w-full py-8 md:py-12 ${bgColor}`}>
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: iconBgColor }}
            aria-hidden="true"
          >
            <span className="font-nexa text-[22px] font-bold" style={{ color: iconTextColor }}>
              {iconLetter}
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-nexa text-2xl font-bold text-[#171717]">{title}</h2>
            <p className="font-proxima text-sm text-[#999]">{meta}</p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="mt-8 grid auto-rows-[440px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard
              key={course.slug}
              name={course.name}
              slug={course.slug}
              description={course.description}
              duration={course.duration}
              deliveryMode={course.deliveryMode}
              imageUrl={course.imageUrl}
              accentColor={accentColor}
              accentBg={accentBg}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
