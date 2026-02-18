import Link from 'next/link'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'
import { FAQ_DATA } from '@/data/faq-data'

/**
 * Comprehensive FAQ Section
 * Answers common objections and questions for diploma programs
 */
export function FAQSection() {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 pb-20 pt-12 2xl:px-0">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-1 text-2xl font-bold text-gray-700" style={{ color: '#002A23' }}>
              Common Questions About Diploma Programs
            </p>
            <p className="text-gray-500">
              We understand you have questions. Here are answers to help you make the right decision.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {FAQ_DATA.map((category) => (
              <div key={category.title} className="flex flex-col gap-4">
                <p className="text-lg font-semibold text-gray-700" style={{ color: category.color }}>
                  {category.title}
                </p>

                {category.items.map((item) => (
                  <div key={item.question}>
                    <p className="mb-1 text-sm font-semibold text-gray-700">{item.question}</p>
                    <p className="text-sm text-gray-500">{item.answer}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-[#f8f9fa] p-6">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex flex-col gap-1" style={{ flex: '1 1 300px' }}>
                <p className="text-lg font-semibold text-gray-700">Still have questions?</p>
                <p className="text-sm text-gray-500">
                  Our admissions team is here to help you make the best decision for your future.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=Hi, I have questions about diploma programs`}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition"
                  onClick={() => trackWhatsAppClick('courses_faq', 'FAQ Section')}
                  target="_blank"
                >
                  <IconBrandWhatsapp size={18} />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition"
                >
                  Schedule a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
