import Image from 'next/image'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO, SocialShare } from '@/components/shared/v3'
import { Button, Paragraph } from '@/components/ui'
import { useIsMobile } from '@/hooks/useIsMobile'

import ImageSanaraLanding from '@/assets/images/sanara-landing.png'

export default function NewsArticlePage() {
  const article = {
    title: 'ADMI-Sanara Animation Program',
    summary: `Sanara is inspired by the Swahili words sanaa (arts) and biashara (business). This
              exciting inclusive program designed for young women and men across Kenya aims to enable access to
              dignified and fulfilling work in the creative and cultural industries.`
  }
  const isMobile = useIsMobile()

  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Sanara Animation Program"
        description="Unlock your creative future with ADMI-Sanara Animation Program. 18-month 2D Animation training with guaranteed internship, expert-led instruction, and career launchpad for young Kenyans aged 18-24."
        keywords="Sanara animation program, 2D animation training Kenya, animation course, creative careers, Mastercard Foundation, HEVA fund, animation skills, digital arts Kenya"
        image={ImageSanaraLanding}
      />
      <div className="w-full">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col-reverse px-4 py-4 sm:flex-row sm:py-16 xl:px-0">
          <div className="sm:w-[200px]">
            <SocialShare item={article} />
          </div>
          <div className="mb-6 min-h-[80vh] w-full rounded-xl border border-gray-200 bg-white shadow-sm sm:ml-8">
            <div className="relative" style={{ height: isMobile ? '200px' : '500px' }}>
              <Image
                src={ImageSanaraLanding}
                alt={'sanara'}
                style={{ borderRadius: 8 }}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <Paragraph fontFamily="font-nexa" fontWeight={400} size="26px" className="py-6">
              ADMI-Sanara Animation Program
            </Paragraph>

            <Paragraph fontFamily="font-nexa" fontWeight={900} size="20px" className="py-6">
              Unlock Your Creative Future
            </Paragraph>
            <Paragraph className="py-1">
              Are you passionate about Animation? This is your opportunity to gain industry-leading skills and turn your
              creativity into a thriving career.
            </Paragraph>

            <Paragraph fontFamily="font-nexa" fontWeight={900} size="20px" className="py-6">
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
              <a
                href="http://hevafund.com/sanara"
                target="_blank"
                className="text-blue-700 hover:underline"
                style={{ fontWeight: 900 }}
              >
                hevafund.com/sanara
              </a>
            </Paragraph>

            <div
              className="relative mx-auto"
              style={{ height: isMobile ? '200px' : '800px', width: isMobile ? '100%' : '800px' }}
            >
              <Image
                src="https://cdn.admi.africa/media/sites/2/2025/02/20125057/Animation-Gaming-3.png"
                alt={'sanara-poster'}
                style={{ borderRadius: 8 }}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <Paragraph fontFamily="font-nexa" fontWeight={900} size="20px" className="py-6">
              Why Choose This Program?
            </Paragraph>

            <Paragraph className="py-1">
              This 18-month program equips you with expert-led training in 2D Animation, ensuring you gain the skills
              and experience needed to thrive in the industry.
            </Paragraph>
            <div className="flex flex-col">
              <Paragraph className="py-1">🔹 Master storytelling, character design, and motion graphics</Paragraph>
              <Paragraph className="py-1">🔹 Work on real-world projects to build a strong portfolio</Paragraph>
              <Paragraph className="py-1">🔹 Guaranteed internship to gain hands-on industry experience</Paragraph>
              <Paragraph className="py-1">
                🔹 Career Launchpad – ADMI’s premier career prep course to help you land your first job
              </Paragraph>
              <Paragraph className="py-1">
                🔹 Join a thriving creative community and network with industry professionals
              </Paragraph>
            </div>
            <Paragraph className="py-1">
              Learn more about the{' '}
              <a
                href="https://admi.africa/courses/2d-animation-certificate-rubika"
                target="_blank"
                className="text-blue-700 hover:underline"
                style={{ fontWeight: 900 }}
              >
                2D Animation Program here.
              </a>
            </Paragraph>

            <Paragraph fontFamily="font-nexa" fontWeight={900} size="20px" className="py-6">
              Who can apply?
            </Paragraph>

            <div className="flex flex-col">
              <Paragraph className="py-1">✅ Young women and men aged 18-24</Paragraph>
              <Paragraph className="py-1">✅ Minimum qualification: KCSE C (plain) or equivalent</Paragraph>
              <Paragraph className="py-1">✅ Passionate about 2D Animation</Paragraph>
              <Paragraph className="py-1">
                ✅ Ready to learn from industry experts and build a future in digital arts
              </Paragraph>
            </div>

            <Paragraph fontFamily="font-nexa" fontWeight={900} size="20px" className="py-6">
              How to Apply?
            </Paragraph>

            <div className="flex flex-col">
              <Paragraph className="py-1">📌 Step 1: Contact us on WhatsApp for more information to apply</Paragraph>
              <Paragraph className="py-1">📌 Step 2: Submit a short 2 – 3 min video statement of interest</Paragraph>
              <Paragraph className="py-1">📌 Step 3: Wait for the selection team to review your application</Paragraph>
              <Paragraph className="pt-6">
                🛑 <strong>Deadline to Apply: March 4</strong> – Don't miss this opportunity!
              </Paragraph>

              <div className="w-[200px] py-4">
                <a
                  href="https://tinyurl.com/admi-application-form"
                  target="_blank"
                  className="text-blue-700 hover:underline"
                >
                  <Button size="lg" backgroundColor="admiRed" label="Apply" />
                </a>
              </div>

              <Paragraph className="pt-6">
                📢 WhatsApp us at{' '}
                <a
                  href="tel:+254706349696"
                  target="_blank"
                  className="text-blue-700 hover:underline"
                  style={{ fontWeight: 900 }}
                >
                  +254 706 349696
                </a>{' '}
                for more details!
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
