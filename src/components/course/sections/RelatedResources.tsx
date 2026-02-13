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
}

export default function RelatedResources({ resources }: Props) {
  if (!resources.length) return null

  return (
    <section className="w-full bg-[#f9f9f9] px-4 py-20 md:px-20">
      <div className="mx-auto max-w-screen-xl">
        {/* Header */}
        <p className="section-label-light">Blogs &amp; Resources</p>
        <h2 className="section-heading-light mt-3">Explore More About Film Production</h2>

        {/* Articles Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {resources.map((article, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              {/* Image placeholder */}
              <div className="h-[200px] bg-gradient-to-br from-gray-300 to-gray-200">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-proxima text-sm text-gray-400">Article Image</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <span className="font-proxima text-xs font-bold uppercase tracking-wider text-admiDarkOrange">
                  {article.category}
                </span>
                <h3 className="mt-2 font-nexa text-lg font-black leading-snug text-gray-900">{article.title}</h3>
                <p className="mt-2 flex-1 font-proxima text-sm leading-relaxed text-gray-500">{article.description}</p>
                <Link
                  href={article.link || '/resources'}
                  className="mt-4 font-nexa text-sm font-bold text-admiDarkOrange hover:underline"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
