import { Group, Text, Anchor, Stack, Title } from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandLinkedin,
} from '@tabler/icons-react';

import LogoIcon from '../../assets/logo.svg';
import Image from 'next/image';

export default function CustomFooter() {
  return (
    <Group className='w-full max-w-screen-xl mx-auto'>
      <Stack style={sectionStyle} gap={4} h="100%">
        <Title order={3}>Get in Touch</Title>
        <Text p={0}>Caxton House, 3rd Floor 25, Kenyatta Avenue.</Text>
        <Text>P. O. Box 35447 - 00100 Nairobi, Kenya.</Text>

        <Text pt={20}>Email: info@admi.ac.ke</Text>
        <Text>Phone: (+254) 706 349 696, (+254) 711 486 581</Text>
        <Text>Hours: Mon-Fri 8:00am - 5:00pm / Sat: 8:00am to 2:00pm</Text>

        <Image width={140} src={LogoIcon} alt="logo"/>
      </Stack>

      {/* Quick Links and Social Media */}
      <Stack style={sectionStyle} gap={4} h="100%">
        <Title order={3}>Quick Links</Title>
        <Anchor href="#">Contact Us</Anchor>

        <Group>
          <Anchor href="#" target="_blank">
            <IconBrandTwitter size={20} />
          </Anchor>
          <Anchor href="#" target="_blank">
            <IconBrandFacebook size={20} />
          </Anchor>
          <Anchor href="#" target="_blank">
            <IconBrandLinkedin size={20} />
          </Anchor>
        </Group>
      </Stack>

      {/* Student Corner */}
      <Stack style={sectionStyle} gap={4} h="100%">
        <Title order={3}>Student Corner</Title>
        <Anchor href="#">Student Portal</Anchor>
        <Anchor href="#">Accomodation</Anchor>
        <Anchor href="#">Academic Pathways</Anchor>
      </Stack>
    </Group>
  );
}

const sectionStyle: React.CSSProperties = {
  flex: 1,
  padding: '0 20px',
};
