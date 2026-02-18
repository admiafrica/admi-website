import Link from 'next/link'
import { IconClock, IconCalendar, IconCheck } from '@tabler/icons-react'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'
import { trackCTAClick } from '@/utils/track-event'

interface FinalCTAProps {
  courseName?: string
}

export default function FinalCTA({ courseName = 'Creative Arts' }: FinalCTAProps) {
  const encodedMessage = encodeURIComponent(`Hi ADMI, I'm interested in the ${courseName} Diploma for the May 2026 intake`)
  const whatsappUrl = `https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodedMessage}`

  return (
    <section
      className="section-padding w-full bg-gradient-to-br from-brand-red to-[#E85A4F]"
      aria-label="Call to action"
    >
      <div className="section-container flex flex-col items-center text-center">
        {/* Early Bird Banner */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 font-proxima text-[13px] font-bold text-black">
          <IconClock size={16} />
          Early Bird: Apply by 15th April for 10% off fees
        </div>

        <h2 className="font-nexa text-3xl font-bold leading-[1.3] text-white md:text-[42px]">
          Ready to Start Your {courseName} Career?
        </h2>

        <p className="mt-4 max-w-[600px] font-proxima text-lg leading-[1.6] text-white/90">
          May 2026 intake is now open. Secure your spot today and take the first step toward a creative career.
        </p>

        {/* Intake Timeline */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/80">
          <div className="flex items-center gap-2 font-proxima text-[14px]">
            <IconCalendar size={16} />
            <span>Orientation: 1st week of May</span>
          </div>
          <div className="flex items-center gap-2 font-proxima text-[14px]">
            <IconCheck size={16} />
            <span>Classes start: Mid-May 2026</span>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/enquiry"
            onClick={() => trackCTAClick('apply', 'final_cta', courseName)}
            className="inline-flex items-center rounded-lg bg-white px-8 py-3 font-proxima text-[17px] font-bold text-brand-red transition-colors hover:bg-gray-100"
          >
            Apply Now
          </Link>

          <Link
            href="/enquiry"
            onClick={() => trackCTAClick('prospectus', 'final_cta', courseName)}
            className="inline-flex items-center rounded-lg border-2 border-white bg-white/15 px-8 py-3 font-proxima text-[17px] font-medium text-white transition-opacity hover:bg-white/25"
          >
            Request Prospectus
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-whatsapp px-8 py-3 font-proxima text-[17px] font-bold text-white transition-opacity hover:opacity-90"
            onClick={() => {
              trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, `Course Page Final CTA - ${courseName}`)
            }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}
