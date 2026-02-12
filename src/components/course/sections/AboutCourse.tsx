import { ReactNode } from 'react'

interface AboutCourseProps {
  description: ReactNode
  accreditation?: string
}

export default function AboutCourse({ description, accreditation }: AboutCourseProps) {
  return (
    <section className="w-full bg-white px-4 py-20 md:px-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left Column - Text Content */}
          <div className="flex-1">
            <span className="mb-3 inline-block font-nexa text-sm font-black uppercase tracking-widest text-admiDarkOrange">
              About This Course
            </span>
            <h2 className="mb-6 font-nexa text-3xl font-black leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              Tell Stories That Move The World
            </h2>
            <div className="mb-6 font-proxima text-lg leading-relaxed text-gray-700">{description}</div>
            {accreditation && (
              <p className="rounded-lg border-l-4 border-admiDarkOrange bg-gray-50 p-4 font-proxima text-base leading-relaxed text-gray-600">
                {accreditation}
              </p>
            )}
          </div>

          {/* Right Column - Video Placeholder */}
          <div className="flex-1">
            <div
              className="group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl"
              style={{ backgroundColor: '#333' }}
              role="button"
              tabIndex={0}
              aria-label="Watch Program Overview video"
            >
              {/* Play Button */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-admiDarkOrange transition-transform duration-300 group-hover:scale-110">
                <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="font-nexa text-sm font-bold uppercase tracking-wider text-white">
                Watch Program Overview
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
