import { Group, Text, Anchor, Stack, Title } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import LogoIcon from "../../assets/logo.svg";
import Image from "next/image";

export default function CustomFooter() {
  return (
    <div className="px-4 md:px-12 w-full py-8 bg-[#002A23]">
      <Group
        className="w-full max-w-screen-xl mx-auto flex-col md:flex-row text-white"
        align="top"
      >
        <Stack className="grow" gap={4} h="100%">
          <Title order={3} style={footerTitleStyle}>
            Get in Touch
          </Title>
          <Text p={0}>Caxton House, 3rd Floor</Text>
          <Text>25, Kenyatta Avenue.</Text>
          <Text>P. O. Box 35447 - 00100</Text>
          <Text>Nairobi, Kenya.</Text>

          <Text pt={20}>
            <b>Email:</b> info@admi.ac.ke
          </Text>
          <Text>
            <b>Phone:</b> (+254) 706 349 696, (+254) 711 486 581
          </Text>
          <Text>
            <b>Hours:</b> Mon-Fri 8:00am - 5:00pm / Sat: 8:00am to 2:00pm
          </Text>
        </Stack>

        {/* Quick Links and Social Media */}
        <Stack className="grow" gap={4}>
          <Title order={3} style={footerTitleStyle}>
            Quick Links
          </Title>
          <Anchor href="#" c="white">
            Contact Us
          </Anchor>
          <Anchor href="#" c="white">
            Academic Team
          </Anchor>
          <Anchor href="#" c="white">
            Fellowship
          </Anchor>
          <Anchor href="#" c="white">
            Work with Us
          </Anchor>
          <Anchor href="#" c="white">
            Accreditation
          </Anchor>
        </Stack>

        {/* Student Corner */}
        <Stack className="grow" gap={4} h="100%">
          <Title order={3} style={footerTitleStyle}>
            Student Portal
          </Title>
          <Anchor href="#" c="white">
            Accomodation
          </Anchor>
          <Anchor href="#" c="white">
            Academic Pathways
          </Anchor>
          <Anchor href="#" c="white">
            Alumni Network
          </Anchor>

          <Group>
            <Anchor href="#" c="white" target="_blank">
              <IconBrandTwitter size={20} />
            </Anchor>
            <Anchor href="#" c="white" target="_blank">
              <IconBrandFacebook size={20} />
            </Anchor>
            <Anchor href="#" c="white" target="_blank">
              <IconBrandLinkedin size={20} />
            </Anchor>
          </Group>
        </Stack>
      </Group>
      <Group className="w-full max-w-screen-xl mx-auto flex-col md:flex-row text-white">
        <Text>
          2024 All Rights Reserved. <b>ADMI Africa</b>
        </Text>
        <Text className="grow">Privacy Policy | Terms & Conditions</Text>
        <Image width={70} src={LogoIcon} alt="logo" />
      </Group>
    </div>
  );
}

const footerTitleStyle: React.CSSProperties = {
  color: "#08F6CF",
};
