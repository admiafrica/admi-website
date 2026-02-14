import { IconBrandWhatsapp } from '@tabler/icons-react'
import { trackWhatsAppClick, ADMI_WHATSAPP_NUMBER } from '@/utils/whatsapp-attribution'

interface WhatsAppCTAProps {
  courseName?: string
}

export default function WhatsAppCTA({ courseName = 'Film Production Diploma' }: WhatsAppCTAProps) {
  const encodedMessage = encodeURIComponent(`Hi ADMI, I'm interested in the ${courseName}`)
  const whatsappUrl = `https://wa.me/${ADMI_WHATSAPP_NUMBER}?text=${encodedMessage}`

  return (
    <section className="w-full bg-brand-whatsapp px-4 py-16 md:px-20" aria-label="WhatsApp contact">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center text-center">
        <IconBrandWhatsapp size={48} color="white" aria-hidden="true" />

        <h2 className="mt-4 font-nexa text-[clamp(1.5rem,3vw,2rem)] font-black text-white">
          Have Questions? Chat With Us
        </h2>

        <p className="mt-2 max-w-[600px] font-proxima text-lg leading-[1.6] text-white">
          Our {courseName} admissions team is available on WhatsApp to answer your questions and help you get started.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-proxima font-bold text-brand-whatsapp transition-opacity hover:opacity-90"
          onClick={() => {
            trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, `Course Page - ${courseName}`)
          }}
        >
          <IconBrandWhatsapp size={20} color="#25D366" />
          Chat on WhatsApp
        </a>

        <p className="mt-3 font-proxima text-xs text-white/85">
          WhatsApp: +254 741 132 751
        </p>
      </div>
    </section>
  )
}
