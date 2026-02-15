type ActivityPhoto = {
  caption: string
  image: string
}

type Props = {
  photos: ActivityPhoto[]
}

export default function StudentsInAction({ photos }: Props) {
  if (!photos.length) return null

  return (
    <section className="section-padding w-full bg-[#f9f9f9]">
      <div className="section-container">
        {/* Header */}
        <p className="section-label-light">Students in Action</p>
        <h2 className="section-heading-light mt-3">Life Inside The Program</h2>
        <p className="mt-4 max-w-3xl font-proxima text-lg leading-relaxed text-gray-500">
          From early morning shoots to late-night editing sessions — experience what it&apos;s really like to study Film
          &amp; Television Production at ADMI.
        </p>

        {/* Photo Grid - 2x2 */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {photos.map((photo, index) => (
            <div key={index} className="group relative h-[280px] overflow-hidden rounded-xl bg-gray-200">
              {/* Placeholder for image */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200">
                <span className="font-proxima text-sm text-gray-400">Photo {index + 1}</span>
              </div>
              {/* Caption overlay */}
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent p-4">
                <p className="font-proxima text-sm font-medium text-white">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
