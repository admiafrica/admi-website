import Image from 'next/image'
import { PortfolioItem } from '@/data/course-page-data'

type Props = {
  items: PortfolioItem[]
}

export default function StudentPortfolio({ items }: Props) {
  if (!items.length) return null

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 text-center md:text-left">
          <span className="section-label-light">Student Work</span>
          <h2 className="section-heading-light">Portfolio Showcase</h2>
          <p className="section-subheading-light mt-4 max-w-2xl">
            See what our students create. From day one, you build a portfolio that gets you hired.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="bg-white p-6">
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <p className="mt-2 font-proxima text-sm text-gray-500">by {item.student}</p>
                {item.projectUrl && (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-proxima font-bold text-[#BA2E36] hover:underline"
                  >
                    View Project →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
