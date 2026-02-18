import Image from 'next/image'
import { AlumniStory } from '@/data/course-page-data'

type Props = {
  stories: AlumniStory[]
}

export default function AlumniStories({ stories }: Props) {
  if (!stories.length) return null

  return (
    <section className="section-padding bg-gray-50">
      <div className="section-container">
        <div className="mb-12 text-center">
          <span className="section-label-light">Success Stories</span>
          <h2 className="section-heading-light">Where Are They Now?</h2>
          <p className="section-subheading-light mx-auto mt-4 max-w-2xl">
            ADMI alumni are working at top companies and starting their own ventures across the globe.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((story, index) => (
            <div key={index} className="flex flex-col rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl">
              <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
                <Image src={story.imageUrl} alt={story.name} fill className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <p className="max-w-[80%] font-proxima font-bold text-white">{story.company}</p>
                  <p className="font-proxima text-sm text-gray-300">Class of {story.graduationYear}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h4 className="mb-2 font-proxima font-bold text-gray-900">{story.name}</h4>
                <p className="mb-4 font-proxima font-semibold text-brand-red">{story.role}</p>
                <p className="flex-1 font-proxima italic text-gray-600">&ldquo;{story.story}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
