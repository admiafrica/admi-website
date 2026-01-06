import Image from 'next/image'
import { Group, Text, Anchor, Stack, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconBrandX
} from '@tabler/icons-react'
import { SOCIAL_LINKS } from '@/utils'
import { WhatsAppLink } from '@/components/shared/WhatsAppLink'
import LogoIcon from '../../assets/logo.svg'

export default function CustomFooter() {
  const isMobile = useMediaQuery('(max-width: 480px)')

  return (
    <Group className="mx-auto w-full max-w-screen-xl flex-col md:flex-row">
      <Stack style={sectionStyle} gap={4} h={isMobile ? 'fit-content' : '100%'}>
        <Title order={3}>Get in Touch</Title>
        <Text p={0}>Caxton House, 3rd Floor 25, Kenyatta Avenue.</Text>
        <Text>P. O. Box 35447 - 00100 Nairobi, Kenya.</Text>

        <Text pt={20}>Email: info@admi.ac.ke</Text>
        <Text>Phone: (+254) 706 349 696, (+254) 741 132 751</Text>
        <WhatsAppLink trackingLocation="footer_legacy" c="green" fw="bold">
          WhatsApp: (+254) 741 132 751
        </WhatsAppLink>
        <Text>Hours: Mon-Fri 8:00am - 5:00pm / Sat: 8:00am to 2:00pm</Text>

        <Image width={isMobile ? 80 : 140} src={LogoIcon} alt="logo" />
      </Stack>

      {/* Quick Links and Social Media */}
      <Stack style={sectionStyle} gap={4} h={isMobile ? 'fit-content' : '100%'}>
        <Title order={3}>Quick Links</Title>
        <Anchor href="/contact-us" fw={'bold'}>
          Contact Us
        </Anchor>
        <Anchor href="/about/academic-team" fw={'bold'}>
          Academic Team
        </Anchor>
        <Anchor href="/fellowship" fw={'bold'}>
          Fellowship
        </Anchor>
        <Anchor href="/privacy-policy" fw={'bold'}>
          Privacy Policy
        </Anchor>

        <Group mt={isMobile ? '1em' : '4em'}>
          <Anchor href={SOCIAL_LINKS.INSTAGRAM} target="_blank" c={'dark'}>
            <IconBrandInstagram size={36} />
          </Anchor>
          <Anchor href={SOCIAL_LINKS.LINKEDIN} target="_blank" c={'dark'}>
            <IconBrandLinkedin size={36} />
          </Anchor>
          <Anchor href={SOCIAL_LINKS.FACEBOOK} target="_blank" c={'dark'}>
            <IconBrandFacebook size={36} />
          </Anchor>
          <Anchor href={SOCIAL_LINKS.TIKTOK} target="_blank" c={'dark'}>
            <IconBrandTiktok size={36} />
          </Anchor>
          <Anchor href={SOCIAL_LINKS.YOUTUBE} target="_blank" c={'dark'}>
            <IconBrandYoutube size={36} />
          </Anchor>
          <Anchor href={SOCIAL_LINKS.X} target="_blank" c={'dark'}>
            <IconBrandX size={36} />
          </Anchor>
        </Group>
      </Stack>

      {/* Student Corner */}
      <Stack style={sectionStyle} gap={4} h={isMobile ? 'fit-content' : '100%'}>
        <Title order={3}>Student Corner</Title>
        <Anchor href="https://admi.africa/student-portal" fw={'bold'}>
          Student Portal
        </Anchor>
        <Anchor href="https://admi.africa/accommodation" fw={'bold'}>
          Accommodation
        </Anchor>
      </Stack>
    </Group>
  )
}

const sectionStyle: React.CSSProperties = {
  padding: '0 20px'
}
