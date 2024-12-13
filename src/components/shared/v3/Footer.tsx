import Image from 'next/image';
import {
  Group,
  Text,
  Anchor,
  Stack,
  Title,
  Card,
  Button,
  Divider,
} from '@mantine/core';

import { IconCopyright } from '@tabler/icons-react';
import MailIcon from '@/assets/images/mail.svg';
import CallIcon from '@/assets/images/call.svg';
import LogoWhiteIcon from '@/assets/images/logo-light.svg';
import YouTubeIcon from '@/assets/images/youtube.svg';
import WhatsAppIcon from '@/assets/images/whatsapp.svg';
import InstagramIcon from '@/assets/images/instagram.svg';
import StopWatchIcon from '@/assets/images/stop-watch.svg';

export default function Footer() {
  return (
    <div className="relative w-full p-0">
      <Card
        className="absolute left-1/2 top-[4rem] z-10 h-[7.125rem] w-[92vw] -translate-x-1/2 transform justify-center bg-white shadow-lg md:w-[60rem]"
        bg={'admiShamrok'}
      >
        <div className="flex w-full flex-col md:flex-row">
          <div className="md:w-[70%]">
            <div className="mb-4">
              <Text size="25px" fw={900}>
                Ready to Get Started?
              </Text>
            </div>
            <div>
              <Text size="16px" fw={500}>
                Immerse yourself in a curriculum crafted to cultivate your
                unique artistic style.
              </Text>
            </div>
          </div>
          <div className="h-full md:w-[30%]">
            <Button size="lg" h={'3rem'} bg={'admiRed'}>
              Enroll Today with ADMI
            </Button>
          </div>
        </div>
      </Card>
      <div className="w-full bg-[#002A23] pb-8 pt-36">
        <Group
          className="mx-auto w-full max-w-screen-xl flex-col text-white md:flex-row"
          align="top"
        >
          <Stack className="grow" h="100%">
            <Stack className="px-4">
              <Title order={3} style={footerTitleStyle}>
                Get in Touch
              </Title>
              <Text p={0}>Caxton House, 3rd Floor</Text>
              <Text>25, Kenyatta Avenue.</Text>
              <Text>P. O. Box 35447 - 00100</Text>
              <Text>Nairobi, Kenya.</Text>
            </Stack>
            <Group gap={4} mt="4em" className="px-4">
              <Image width={24} height={24} src={MailIcon} alt="email" />
              <Text fw="bold" ml={10}>
                Email:
              </Text>
              <Text>info@admi.ac.ke</Text>
            </Group>

            <Group gap={4} className="px-4">
              <Image width={24} height={24} src={CallIcon} alt="phone" />
              <Text fw="bold" ml={10}>
                Phone:
              </Text>
              <Text>(+254) 706 349 696,</Text>
              <Text>(+254) 711 486 581</Text>
            </Group>

            <Group gap={4} className="px-4">
              <Image width={24} src={StopWatchIcon} alt="hours active" />
              <Text fw="bold" ml={10}>
                Hours:
              </Text>
              <Text>Mon-Fri 8:00am - 5:00pm /</Text>
              <Text>Sat: 8:00am to 2:00pm</Text>
            </Group>
          </Stack>

          {/* Quick Links and Social Media */}
          <Stack className="grow">
            <Title order={3} style={footerTitleStyle}>
              Quick Links
            </Title>
            <Anchor href="#" c="white" fw={600}>
              Contact Us
            </Anchor>
            <Anchor href="#" c="white" fw={600}>
              Academic Team
            </Anchor>
            <Anchor href="#" c="white" fw={600}>
              Fellowship
            </Anchor>
            <Anchor href="#" c="white" fw={600}>
              Work with Us
            </Anchor>
            <Anchor href="#" c="white" fw={600}>
              Accreditation
            </Anchor>
          </Stack>

          {/* Student Corner */}
          <Stack gap={4} className="mr-4 h-full">
            <Stack>
              <Title order={3} style={footerTitleStyle}>
                Student Portal
              </Title>
              <Anchor href="#" c="white" fw={600}>
                Accomodation
              </Anchor>
              <Anchor href="#" c="white" fw={600}>
                Academic Pathways
              </Anchor>
              <Anchor href="#" c="white" fw={600}>
                Alumni Network
              </Anchor>
            </Stack>

            <Group>
              <Anchor href="#" c="white" target="_blank">
                <Image width={48} src={InstagramIcon} alt="logo" />
              </Anchor>
              <Anchor href="#" c="white" target="_blank">
                <Image width={48} src={WhatsAppIcon} alt="logo" />
              </Anchor>
              <Anchor href="#" c="white" target="_blank">
                <Image width={48} src={YouTubeIcon} alt="logo" />
              </Anchor>
            </Group>
          </Stack>
        </Group>
        <Divider mt="lg" mb="md" size={0.5} />
        <Group
          className="md:pt-auto mx-auto w-full max-w-screen-xl flex-col px-4 pt-8 md:flex-row"
          gap={2}
        >
          <IconCopyright className="text-white" />
          <div className="text-white">
            <Text>
              2024 All Rights Reserved. <b>ADMI Africa</b>
            </Text>
          </div>
          <div className="grow text-admiShamrok md:pl-4">
            <Text>Privacy Policy | Terms & Conditions</Text>
          </div>
          <Image width={95} src={LogoWhiteIcon} alt="logo" />
        </Group>
      </div>
      <div className="flex h-[0.75rem] w-full">
        <div className="w-1/4 bg-[#E6F608]" />
        <div className="w-1/4 bg-[#F60834]" />
        <div className="w-1/4 bg-[#08F6CF]" />
        <div className="w-1/4 bg-[#F76335]" />
      </div>
    </div>
  );
}

const footerTitleStyle: React.CSSProperties = {
  color: '#08F6CF',
};
