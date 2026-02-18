import Image from 'next/image'
import Link from 'next/link'

type ResourceArticle = {
  category: string
  title: string
  description: string
  link: string
  image: string
}

type Props = {
  resources: ResourceArticle[]
  courseName?: string
}

export default function RelatedResources({ resources, courseName }: Props) {
  if (!resources.length) return null

  // Dynamic heading based on course
  const headingText = courseName 
    ? `Explore More About ${courseName}` 
    : 'Explore Related Resources'

  return (
    <section className="section-padding w-full bg-[#f9f9f9]">
      <div className="section-container">
        {/* Header */}
        <p className="section-label-light">Blogs &amp; Resources</p>
        <h2 className="section-heading-light mt-3">{headingText}</h2>

        {/* Articles Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {resources.map((article, index) => (
            <Link
              key={index}
              href={article.link || '/resources'}
              className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              {/* Cover Image */}
              <div className="relative h-[200px] overflow-hidden bg-gradient-to-br from-gray-300 to-gray-200">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-proxima text-sm text-gray-400">Article Image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-proxima text-xs font-bold uppercase tracking-wider text-admiDarkOrange">
                  {article.category}
                </span>
                <h3 className="mt-2 font-nexa text-lg font-black leading-snug text-gray-900 group-hover:text-admiDarkOrange transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 font-proxima text-sm leading-relaxed text-gray-500 line-clamp-3">
                  {article.description}
                </p>
                <span className="mt-4 font-nexa text-sm font-bold text-admiDarkOrange group-hover:underline">
                  Read Article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
