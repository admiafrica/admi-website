import { Box, Card } from '@mantine/core'
import Image from 'next/image'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { ContactForm } from '@/components/forms'
import { Title, Paragraph } from '@/components/ui'
import { PageSEO } from '@/components/shared/v3'
import { useIsMobile } from '@/hooks/useIsMobile'
import { InstitutionalFAQSchema } from '@/components/seo/InstitutionalFAQSchema'

import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg'
import IconBgImageRed from '@/assets/icons/ellipse-red.svg'
import { IconMail, IconPhone, IconMapPin, IconClock, IconBrandWhatsapp } from '@tabler/icons-react'

export default function ContactPage() {
  const isMobile = useIsMobile()

  return (
    <MainLayout minimizeFooter minimizeHeader footerBgColor="#002A23">
      <PageSEO
        title="Contact Us"
        description="Get in touch with Africa Digital Media Institute (ADMI). Contact our team for inquiries about courses, admissions, partnerships, or general information. We're here to help you start your creative journey."
        keywords="contact ADMI, get in touch, ADMI contact information, course inquiries, admissions contact, ADMI Nairobi, creative media institute contact"
      />

      {/* General FAQ Schema for contact page */}
      <InstitutionalFAQSchema faqType="general" />
      <div className="min-h-[100vh] w-full bg-[#002A23] pt-16">
        {/* BACKGROUND IMAGES */}
        <div className="absolute left-[54%] top-[24vh] h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full justify-end pr-[10%]">
            <Image src={IconBgImageYellow} alt={'background image'} />
          </div>
        </div>

        <div className="absolute left-[50%] top-[20vh] h-fit w-full -translate-x-1/2 transform">
          <div className="flex w-full">
            <Image src={IconBgImageRed} alt={'background image'} />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-col px-4 lg:flex-row 2xl:px-0">
          {/* Left Side - Contact Information */}
          <div className="lg:w-1/2 lg:pr-8">
            <Box mb={6}>
              <Title label="Get in Touch" color="#F1FE38" size={isMobile ? '30px' : '48px'} />
            </Box>
            <Box mb={4}>
              <Title label="with ADMI" color="white" size={isMobile ? '30px' : '48px'} />
            </Box>
            <Box mb={8}>
              <Paragraph className="text-white">
                We&apos;re here to help you with any questions about our programs, admissions, or services. Reach out to
                us and we&apos;ll get back to you as soon as possible.
              </Paragraph>
            </Box>

            {/* Contact Information Cards */}
            <div className="space-y-4">
              {/* Address */}
              <Card className="border border-white/20 bg-white/10 backdrop-blur-sm" p="lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <IconMapPin size={24} className="text-[#01C6A5]" />
                  </div>
                  <div>
                    <Title label="Visit Us" color="black" size="18px" />
                    <Paragraph className="mt-1 text-black">
                      25 Caxton House 3rd Floor
                      <br />
                      Kenyatta Avenue
                      <br />
                      P.O. Box 35447-00100
                      <br />
                      Nairobi, Kenya
                    </Paragraph>
                  </div>
                </div>
              </Card>

              {/* Email */}
              <Card className="border border-white/20 bg-white/10 backdrop-blur-sm" p="lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <IconMail size={24} className="text-[#01C6A5]" />
                  </div>
                  <div>
                    <Title label="Email Us" color="black" size="18px" />
                    <Paragraph className="mt-1 text-black">
                      General Inquiries:{' '}
                      <a href="mailto:info@admi.africa" className="text-[#01C6A5] hover:underline">
                        info@admi.africa
                      </a>
                      <br />
                      Admissions:{' '}
                      <a href="mailto:admissions@admi.africa" className="text-[#01C6A5] hover:underline">
                        admissions@admi.africa
                      </a>
                    </Paragraph>
                  </div>
                </div>
              </Card>

              {/* Phone & WhatsApp */}
              <Card className="border border-white/20 bg-white/10 backdrop-blur-sm" p="lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <IconPhone size={24} className="text-[#01C6A5]" />
                  </div>
                  <div>
                    <Title label="Call or WhatsApp" color="black" size="18px" />
                    <Paragraph className="mt-1 text-black">
                      <a href="tel:+254711486581" className="text-[#01C6A5] hover:underline">
                        +254 711 486 581
                      </a>
                    </Paragraph>
                    <div className="mt-2 flex items-center">
                      <IconBrandWhatsapp size={20} className="mr-2 text-green-400" />
                      <a
                        href="https://wa.me/254711486581"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:underline"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Office Hours */}
              <Card className="border border-white/20 bg-white/10 backdrop-blur-sm" p="lg">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <IconClock size={24} className="text-[#01C6A5]" />
                  </div>
                  <div>
                    <Title label="Office Hours" color="black" size="18px" />
                    <Paragraph className="mt-1 text-black">
                      Monday - Friday: 8:00 AM - 5:00 PM
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                      <br />
                      Sunday: Closed
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Media Links */}
            <Box mt={8}>
              <Title label="Follow Us" color="white" size="18px" />
              <div className="mt-3 flex space-x-4">
                <a
                  href="https://www.facebook.com/ADMIafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#01C6A5] transition-colors hover:text-[#F1FE38]"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com/ADMIafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#01C6A5] transition-colors hover:text-[#F1FE38]"
                >
                  Twitter
                </a>
                <a
                  href="https://www.instagram.com/ADMIafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#01C6A5] transition-colors hover:text-[#F1FE38]"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/ADMIafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#01C6A5] transition-colors hover:text-[#F1FE38]"
                >
                  LinkedIn
                </a>
              </div>
            </Box>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:w-1/2 lg:pl-8">
            <div className="mx-auto max-w-xl py-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
