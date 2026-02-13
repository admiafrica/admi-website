import Image from 'next/image'

interface EquipmentFacilitiesProps {
  facilities: { title: string; description: string; image: string }[]
}

export default function EquipmentFacilities({ facilities }: EquipmentFacilitiesProps) {
  if (!facilities.length) return null

  return (
    <section className="w-full bg-[#f9f9f9] px-4 py-20 md:px-20" aria-label="Equipment and facilities">
      <div className="mx-auto max-w-screen-xl">
        <span className="section-label-light">Equipment &amp; Facilities</span>
        <h2 className="section-heading-light mb-4">World-Class Tools At Your Fingertips</h2>
        <p className="mb-12 max-w-2xl font-proxima text-lg leading-relaxed text-gray-600">
          Get hands-on experience with industry-standard equipment and purpose-built facilities that mirror professional
          production environments.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, index) => (
            <div
              key={`facility-${index}`}
              className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
            >
              {/* Image Placeholder */}
              <div className="h-[180px] w-full overflow-hidden rounded-t-xl bg-gray-300">
                {facility.image ? (
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    width={400}
                    height={180}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-300">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 font-nexa text-base font-black text-gray-900">{facility.title}</h3>
                <p className="font-proxima text-sm leading-relaxed text-gray-600">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
