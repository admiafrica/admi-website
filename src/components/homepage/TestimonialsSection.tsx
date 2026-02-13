import { IconQuote } from '@tabler/icons-react'

interface Testimonial {
  quote: string
  avatarColor: string
  name: string
  role: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'ADMI gave me the skills and confidence to land my dream job in film production. The hands-on approach made all the difference.',
    avatarColor: 'bg-[#BA2E36]',
    name: 'Sarah Njeri',
    role: 'Film Production Graduate, 2024'
  },
  {
    quote:
      'The industry connections I made through ADMI opened doors I never imagined. I now work with top brands across East Africa.',
    avatarColor: 'bg-[#08F6CF]',
    name: 'James Odhiambo',
    role: 'Graphic Design Graduate, 2023'
  },
  {
    quote:
      'From knowing nothing about animation to creating content for international studios \u2014 ADMI made that journey possible in just 18 months.',
    avatarColor: 'bg-[#F76335]',
    name: 'Amina Hassan',
    role: '2D Animation Graduate, 2024'
  }
]

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-[#0A0A0A] px-4 py-16 md:px-20 md:py-20">
      {/* Header */}
      <div className="mx-auto mb-12 flex flex-col items-center text-center">
        <span className="section-label-dark">STUDENT TESTIMONIALS</span>
        <h2 className="section-heading-dark text-center">What Our Students Say</h2>
        <p className="section-subheading-dark mx-auto mt-4 max-w-[600px] text-center">
          Hear from graduates who transformed their passion into professional careers across East Africa.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.name} className="flex flex-1 flex-col gap-5 rounded-2xl bg-[#171717] p-6 md:p-8">
            {/* Quote Icon */}
            <IconQuote size={24} className="text-[#333]" stroke={2} />

            {/* Quote Text */}
            <p className="font-proxima text-base leading-[1.7] text-[#ccc]">&ldquo;{testimonial.quote}&rdquo;</p>

            {/* Author */}
            <div className="mt-auto flex items-center gap-3">
              {/* Avatar Circle */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${testimonial.avatarColor}`}
              >
                <span className="font-proxima text-sm font-bold text-white">
                  {testimonial.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>

              {/* Name & Role */}
              <div className="flex flex-col gap-0.5">
                <span className="font-proxima text-[15px] font-bold text-white">{testimonial.name}</span>
                <span className="font-proxima text-[13px] text-[#999]">{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
