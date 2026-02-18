import Image from 'next/image'

interface MentorsGridProps {
  mentors: { name: string; role: string; specialization: string; image: string }[]
}

export default function MentorsGrid({ mentors }: MentorsGridProps) {
  if (!mentors.length) return null

  return (
    <section className="section-padding w-full bg-[#f9f9f9]" aria-label="Course mentors">
      <div className="section-container">
        <span className="section-label-light">Your Mentors</span>
        <h2 className="section-heading-light mb-4">Learn From Industry Professionals</h2>
        <p className="mb-12 max-w-2xl font-proxima text-lg leading-relaxed text-gray-600">
          Our mentors bring decades of real-world experience from top studios, agencies, and production houses across
          Africa and beyond.
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((mentor, index) => (
            <div key={`mentor-${index}`} className="flex flex-col items-center text-center">
              {/* Circular Photo */}
              <div className="mb-5 h-[140px] w-[140px] overflow-hidden rounded-full bg-gray-300">
                {mentor.image ? (
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    width={140}
                    height={140}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-300">
                    <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Mentor Info */}
              <h3 className="mb-1 font-nexa text-lg font-black text-gray-900">{mentor.name}</h3>
              <p className="mb-1 font-proxima text-sm font-semibold text-admiDarkOrange">{mentor.role}</p>
              <p className="font-proxima text-sm text-gray-500">{mentor.specialization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
