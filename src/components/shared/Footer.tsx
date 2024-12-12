import {
  Group,
  Text,
  Anchor,
  Stack,
  Title,
  Card,
  Button,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconCopyright,
} from "@tabler/icons-react";

import LogoIcon from "../../assets/logo.svg";
import Image from "next/image";

export default function CustomFooter() {
  return (
    <>
      <div className="w-full">
        <Card
          className="mx-auto w-full max-w-[56rem] md:h-[9rem] justify-center"
          withBorder
          bg={"admiShamrok"}
        >
          <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-3/4">
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
            <div className="md:w-1/4 h-full">
              <Button
                size="md"
                className="md:w-[14.375rem] h-[3rem]"
                bg={"admiRed"}
              >
                Enroll today with ADMI
              </Button>
            </div>
          </div>
        </Card>
      </div>
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
          <Stack gap={4} h="100%">
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
        <Group
          className="w-full max-w-screen-xl mx-auto flex-col md:flex-row pt-8 md:pt-auto"
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
          <Image width={70} src={LogoIcon} alt="logo" />
        </Group>
      </div>
      <div className="w-full h-[0.75rem] flex">
        <div className="w-1/4 bg-[#E6F608]" />
        <div className="w-1/4 bg-[#F60834]" />
        <div className="w-1/4 bg-[#08F6CF]" />
        <div className="w-1/4 bg-[#F76335]" />
      </div>
    </>
  );
}

const footerTitleStyle: React.CSSProperties = {
  color: "#08F6CF",
};
