import Link from 'next/link'
import { IconSchool, IconBrandWhatsapp } from '@tabler/icons-react'
import { Title } from '@/components/ui'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

/**
 * Fast Converter CTA - Segment A
 * Targets 25% of visitors who convert quickly with immediate action CTAs
 */
export function FastConverterCTA() {
  return (
    <div className="mb-6 mt-6 rounded-xl border-2 border-[#FF6B35] bg-white bg-gradient-to-r from-[#FFF8F5] to-white p-8 shadow-sm">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1" style={{ flex: '1 1 300px' }}>
          <div className="flex flex-wrap gap-1">
            <IconSchool size={24} color="#FF6B35" />
            <span className="inline-flex items-center rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white">
              85% Employed in 3 Months
            </span>
          </div>

          <Title label="Spearhead Your Career Journey with a Diploma" size="28px" color="#002A23" />

          <p className="text-lg text-gray-500">
            From only <strong>15,000 KES/month</strong> • 6-month payback •{' '}
            <strong>75K KES avg. starting salary</strong>
          </p>

          <p className="text-sm font-medium text-gray-700" style={{ color: '#FF6B35' }}>
            🎯 ROI: 12× your investment over 5 years • Build high-value, exportable content
          </p>
        </div>

        <div className="flex flex-wrap gap-2" style={{ flex: '0 0 auto' }}>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition"
          >
            <IconSchool size={20} />
            Apply Now
          </Link>

          <a
            href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=Hi, I'd like to learn more about diploma programs`}
            className="inline-flex items-center gap-2 rounded-lg border border-green-600 bg-white px-6 py-3 font-medium text-green-700 transition"
            onClick={() => {
              trackWhatsAppClick('courses_page_fast_converter', 'Courses Page - Fast Converter CTA')
            }}
            target="_blank"
          >
            <IconBrandWhatsapp size={20} />
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  )
}
