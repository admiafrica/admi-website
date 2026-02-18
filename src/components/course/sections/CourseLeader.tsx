import Image from 'next/image'

interface CourseLeaderProps {
  leader: {
    name: string
    title: string
    bio: string
    quote: string
    image: string
  }
}

export default function CourseLeader({ leader }: CourseLeaderProps) {
  if (!leader?.name) return null

  return (
    <section className="section-padding w-full" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="section-container">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full bg-gray-300">
              {leader.image ? (
                <Image
                  src={leader.image}
                  alt={`${leader.name} - Course Leader`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-500"
                  aria-label={`${leader.name} photo placeholder`}
                >
                  <svg className="h-16 w-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <span className="section-label-light">Course Leader</span>
            <h3 className="mb-1 font-nexa text-2xl font-black text-gray-900 md:text-3xl">{leader.name}</h3>
            <p className="mb-4 font-proxima text-base font-semibold text-gray-500">{leader.title}</p>
            <p className="mb-6 font-proxima text-base leading-relaxed text-gray-700">{leader.bio}</p>
            <blockquote className="border-l-4 border-admiDarkOrange pl-4">
              <p className="font-proxima text-lg italic text-admiDarkOrange">&ldquo;{leader.quote}&rdquo;</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
