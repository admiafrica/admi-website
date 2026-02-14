import { Text, Button } from '@/lib/tw-mantine'
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

        <Text className="font-nexa" fw={900} c="white" mt={16} style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
          Have Questions? Chat With Us
        </Text>

        <Text className="font-proxima" size="lg" c="white" mt={8} maw={600} lh={1.6}>
          Our {courseName} admissions team is available on WhatsApp to answer your questions and help you get started.
        </Text>

        <Button
          component="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          mt={24}
          radius="md"
          className="bg-white font-proxima font-bold text-brand-whatsapp transition-opacity hover:opacity-90"
          leftSection={<IconBrandWhatsapp size={20} color="#25D366" />}
          onClick={() => {
            trackWhatsAppClick(ADMI_WHATSAPP_NUMBER, `Course Page - ${courseName}`)
          }}
        >
          Chat on WhatsApp
        </Button>

        <Text className="font-proxima" size="xs" c="white" mt={12} opacity={0.85}>
          WhatsApp: +254 741 132 751
        </Text>
      </div>
    </section>
  )
}
