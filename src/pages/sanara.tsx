import Image from 'next/image';
import { Anchor, Box, Card, Divider } from '@mantine/core';

import { MainLayout } from '@/layouts/v3/MainLayout';
import { PageSEO } from '@/components/shared/v3';
import { Paragraph } from '@/components/ui';
import { useIsMobile } from '@/hooks/useIsMobile';

import IconFacebook from '@/assets/icons/facebook-social.svg';
import IconWhatsapp from '@/assets/icons/whatsapp-social.svg';
import IconCopyContent from '@/assets/icons/copy-content.svg';
import IconShare from '@/assets/icons/share.svg';
import IconLinkedIn from '@/assets/icons/linkedin-social.svg';
import ImageSanaraLanding from '@/assets/images/sanara-landing.png';

export default function NewsArticlePage() {
  const isMobile = useIsMobile();

  return (
    <MainLayout footerBgColor="white">
      <PageSEO title="Sanara " />
      <Box className="w-full">
        <Box className="mx-auto flex w-full max-w-screen-xl flex-col-reverse px-4 py-4 sm:flex-row sm:py-16 xl:px-0">
          <Box className="sm:w-[200px]">
            <Box className="sticky top-[100px] flex flex-col sm:w-[200px]">
              <Box className="flex pb-6">
                <Image src={IconShare} alt="share" width={32} height={32} />
                <Paragraph className="my-auto" fontFamily="font-nexa">
                  Share on:
                </Paragraph>
              </Box>
              <Card className="flex w-full flex-col" shadow="lg">
                <Box className="flex py-4">
                  <Image src={IconFacebook} alt="facebook" width={24} height={24} />
                  <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
                    Facebook
                  </Paragraph>
                </Box>
                <Divider />
                <Box className="flex py-4">
                  <Image src={IconLinkedIn} alt="facebook" width={24} height={24} />
                  <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
                    LinkedIn
                  </Paragraph>
                </Box>
                <Divider />
                <Box className="flex py-4">
                  <Image src={IconWhatsapp} alt="facebook" width={24} height={24} />
                  <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
                    Whatsapp
                  </Paragraph>
                </Box>
                <Divider />
                <Box className="flex py-4">
                  <Image src={IconCopyContent} alt="facebook" width={24} height={24} />
                  <Paragraph fontFamily="font-nexa" size="16px" className="my-auto ml-2">
                    Copy Link
                  </Paragraph>
                </Box>
              </Card>
            </Box>
          </Box>
          <Card className="mb-6 min-h-[80vh] w-full sm:ml-8" withBorder>
            <Box className="relative" h={isMobile ? '200px' : '600px'}>
              <Image src={ImageSanaraLanding} alt={'sanara'} style={{ borderRadius: 8 }} fill />
            </Box>
            <Paragraph fontFamily="font-nexa" fontWeight={400} size="26px" className="py-6">
              ADMI-Sanara Animation Program
            </Paragraph>

            <Paragraph fontFamily="font-nexa" fontWeight={400} size="24px" className="py-6">
              Unlock Your Creative Future
            </Paragraph>
            <Paragraph className="py-1">
              Are you passionate about Animation? This is your opportunity to gain industry-leading skills and turn your
              creativity into a thriving career.
            </Paragraph>

            <Paragraph fontFamily="font-nexa" fontWeight={400} size="24px" className="py-6">
              Why Choose This Program?
            </Paragraph>

            <Paragraph className="py-1">
              This 18-month program equips you with expert-led training in 2D Animation, ensuring you gain the skills
              and experience needed to thrive in the industry.
            </Paragraph>
            <Box className="flex flex-col">
              <Paragraph className="py-1">🔹 Master storytelling, character design, and motion graphics</Paragraph>
              <Paragraph className="py-1">🔹 Work on real-world projects to build a strong portfolio</Paragraph>
              <Paragraph className="py-1">🔹 Guaranteed internship to gain hands-on industry experience</Paragraph>
              <Paragraph className="py-1">
                🔹 Career Launchpad – ADMI’s premier career prep course to help you land your first job
              </Paragraph>
              <Paragraph className="py-1">
                🔹 Join a thriving creative community and network with industry professionals
              </Paragraph>
            </Box>
            <Paragraph className="py-1">
              Learn more about the{' '}
              <Anchor href="https://admi.africa/courses/2d-animation-certificate-rubika" target="_blank" fw={900}>
                2D Animation Program here.
              </Anchor>
            </Paragraph>

            <Paragraph fontFamily="font-nexa" fontWeight={400} size="24px" className="py-6">
              Who can apply?
            </Paragraph>

            <Box className="flex flex-col">
              <Paragraph className="py-1">✅ Young women and men aged 18-24</Paragraph>
              <Paragraph className="py-1">✅ Minimum qualification: KCSE C (plain) or equivalent</Paragraph>
              <Paragraph className="py-1">✅ Passionate about 2D Animation</Paragraph>
              <Paragraph className="py-1">
                ✅ Ready to learn from industry experts and build a future in digital arts
              </Paragraph>
            </Box>

            <Paragraph fontFamily="font-nexa" fontWeight={400} size="24px" className="py-6">
              How to Apply?
            </Paragraph>

            <Box className="flex flex-col">
              <Paragraph className="py-1">📌 Step 1: Contact us on WhatsApp for more information to apply</Paragraph>
              <Paragraph className="py-1">📌 Step 2: Submit a short 2 – 3 min video statement of interest</Paragraph>
              <Paragraph className="py-1">📌 Step 3: Wait for the selection team to review your application</Paragraph>
            </Box>

            <Paragraph fontFamily="font-nexa" fontWeight={400} size="24px" className="py-6">
              About the Sanara Program
            </Paragraph>
            <Paragraph className="py-1">
              <strong>Sanara</strong> is inspired by the Swahili words sanaa (arts) and biashara (business). This
              exciting inclusive program designed for young women and men across Kenya aims to enable access to
              dignified and fulfilling work in the creative and cultural industries.
            </Paragraph>

            <Paragraph className="py-1">
              Mastercard Foundation in partnership with the consortium of HEVA, SNDBX, Baraza Media Lab and GoDown Arts
              Center, have launched this 3 year program to offer opportunities for financing, skilling programs and
              infrastructure, and adoption of sustainable practices that advance safer working environments.
            </Paragraph>

            <Paragraph className="py-1">
              Learn more at{' '}
              <Anchor href="http://hevafund.com/sanara" target="_blank" fw={900}>
                hevafund.com/sanara
              </Anchor>
            </Paragraph>
            <Box className="relative mx-auto" h={isMobile ? '200px' : '800px'} w={isMobile ? '100%' : '800px'}>
              <Image
                src="https://cdn.admi.africa/media/sites/2/2025/02/20125057/Animation-Gaming-3.png"
                alt={'sanara-poster'}
                style={{ borderRadius: 8 }}
                fill
                priority
              />
            </Box>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
}
