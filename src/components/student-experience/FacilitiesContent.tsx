'use client'

import { Carousel } from '@/lib/tw-mantine-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { StudentExperienceLayout } from './StudentExperienceLayout'
import { FacilityItemCard } from '@/components/cards'
import { ADMI_FACILITIES } from '@/utils'

export function FacilitiesContent() {
  const autoplayFacilities = Autoplay({ delay: 4000 })

  const sections = [
    {
      title: 'Our Campus Facilities',
      paragraphs: [
        "ADMI's campus is a vibrant, creatively designed workspace conveniently located right next to the GPO in Nairobi's Central Business District. The campus boasts extensive facilities including classrooms, animation and graphics labs, TV and sound production studios, Mac and PC labs, and a film equipment vault."
      ],
      bullets: null
    }
  ]

  return (
    <StudentExperienceLayout
      heroTitle="Campus Facilities"
      heroKicker="Student Experience"
      intro="Discover the world-class facilities that make ADMI a premier creative media training institution. Each space is designed with industry standards and hands-on learning in mind."
      sections={sections}
    >
      <div className="w-full px-4 py-12">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="w-full">
            <Carousel
              slideSize={600}
              height={360}
              slideGap="md"
              loop
              align="start"
              slidesToScroll={1}
              controlsOffset={0}
              withControls={false}
              plugins={[autoplayFacilities]}
              onMouseEnter={autoplayFacilities.stop}
              onMouseLeave={autoplayFacilities.reset}
            >
              {ADMI_FACILITIES.map((facility) => (
                <Carousel.Slide key={facility.name}>
                  <FacilityItemCard facility={facility} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </StudentExperienceLayout>
  )
}
