import Image from 'next/image'
import { Box, Grid } from '@mantine/core'
import { GetStaticProps } from 'next'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { Paragraph, Title } from '@/components/ui'
import { PageSEO } from '@/components/shared/v3'
import { InfoCard, PlainCard } from '@/components/cards'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getAcademicPathwaysBySlug, getAllPartners } from '@/utils/academic-pathways'
import { AcademicPathwaysPage as IAcademicPathwaysPage, AcademicPathwaysPartner } from '@/types/academic-pathways'
import { ADMI_ACADEMIC_PATHWAYS } from '@/utils'

import ImagePathwaysLanding from '@/assets/images/academic-pathways-landing.jpeg'

interface AcademicPathwaysPageProps {
  pathways: IAcademicPathwaysPage | null
  partners: AcademicPathwaysPartner[]
}

export default function AcademicPathwaysPage({ pathways, partners }: AcademicPathwaysPageProps) {
  const isMobile = useIsMobile()

  // Contentful response structure
  const title = pathways?.fields?.title || 'Academic Pathways'
  const description =
    pathways?.fields?.description ||
    "Explore ADMI's academic pathways and strategic partnerships with leading institutions. Discover seamless transitions for further studies and career opportunities in digital media and creative technology."
  const woolfPartner = partners.find((p) => p.fields.name?.includes('Woolf'))

  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title={title}
        description={description}
        keywords="ADMI academic pathways, university partnerships, further studies, career opportunities, digital media education progression, international partnerships, student transitions"
      />
      <div className="w-full">
        {/* HEADER */}
        <Box className="relative w-full" bg={'#002A23'}>
          <Box className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-row px-4 sm:h-[60vh] sm:flex-row 2xl:px-0">
            <Box className="mt-[12vh] flex w-full flex-col">
              <Box className="flex">
                <Title label="Academic" color="#F1FE37" size={isMobile ? '36px' : '64px'} />
                <Box className="px-1"></Box>
                <Title label="Pathways" color="admiShamrok" size={isMobile ? '36px' : '64px'} />
              </Box>
              <Box className="flex w-full flex-col pt-12 sm:flex-row">
                <Box className="flex flex-col sm:w-[50%]">
                  <Paragraph fontFamily="font-nexa" className="pb-4 text-white sm:pr-4" size="26px" fontWeight={400}>
                    At Africa Digital Media Institute (ADMI), we are committed to providing our students with a
                    world-class education that opens doors to endless possibilities.
                  </Paragraph>
                  <Paragraph fontFamily="font-nexa" className="py-4 text-white sm:pr-4">
                    Through our strategic partnerships with leading institutions both locally and internationally, we
                    offer seamless academic pathways that allow our graduates to transition smoothly to further their
                    studies or pursue their careers.
                  </Paragraph>
                </Box>
                <Box className="relative h-[360px] sm:w-[50%]">
                  <Image
                    fill
                    src={ImagePathwaysLanding}
                    alt="academic pathways"
                    style={{ objectFit: 'cover', borderRadius: 16 }}
                    priority
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* WORK */}
        <Box className="relative z-10 w-full bg-[#002A23] pb-48 pt-8">
          <Box className="mx-auto flex w-full max-w-screen-xl flex-col">
            <Box className="w-full px-4 py-6 text-white xl:px-0">
              <Title label="Why Work at ADMI?" color="white" />
            </Box>
            <Box className="flex w-full flex-col justify-between px-4 sm:flex-row sm:px-0">
              {ADMI_ACADEMIC_PATHWAYS.map((pathway, index) => (
                <Box key={`pathway-${index}`} p={8} className="sm:w-[25%]">
                  <InfoCard item={pathway} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Woolf University Partnership Section */}
        {woolfPartner && (
          <Box className="relative w-full bg-white py-12">
            <Box className="mx-auto flex w-full max-w-screen-xl flex-col px-4 2xl:px-0">
              <Box className="pb-12">
                <Title label="Our Strategic Partners" color="black" size={isMobile ? '28px' : '40px'} />
              </Box>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Box className="flex flex-col">
                    <Box className="relative h-[200px] w-full">
                      {woolfPartner.fields.logo && (
                        <Image
                          fill
                          src={
                            typeof woolfPartner.fields.logo === 'string'
                              ? woolfPartner.fields.logo
                              : (woolfPartner.fields.logo as any)?.fields?.file?.url || ''
                          }
                          alt={woolfPartner.fields.name}
                          style={{ objectFit: 'contain' }}
                        />
                      )}
                    </Box>
                    <Title label={woolfPartner.fields.name} color="black" size="24px" className="mt-6" />
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Paragraph fontFamily="font-nexa" className="py-4">
                    {woolfPartner.fields.description}
                  </Paragraph>
                  {woolfPartner.fields.website && (
                    <a
                      href={woolfPartner.fields.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block rounded bg-[#F1FE37] px-6 py-2 font-bold text-black hover:opacity-80"
                    >
                      Visit {woolfPartner.fields.name}
                    </a>
                  )}
                </Grid.Col>
              </Grid>
            </Box>
          </Box>
        )}

        {/* Floating Card */}
        <div className="relative h-[400px] w-full px-4 2xl:px-0">
          <div className="absolute left-1/2 top-[-10vh] z-10 w-full max-w-screen-xl -translate-x-1/2 transform px-4 sm:top-[-8vh] 2xl:px-0">
            <PlainCard>
              <Title label="Career Opportunities" size="20px" color="black" />
              <Paragraph className="py-4" fontFamily="font-nexa">
                In addition to academic pathways, our programs are tailored to equip our students with the skills and
                knowledge needed to thrive in the digital media industry. Through our industry-focused curriculum,
                hands-on learning experiences, and career development services, we help our students build a strong
                foundation for their future careers.
              </Paragraph>
              <Paragraph className="py-4" fontFamily="font-nexa">
                At ADMI, we believe that education is the key to unlocking one's potential. By aligning our programs
                with international standards and forging strategic partnerships with leading institutions, we aim to
                provide our students with the tools and opportunities they need to succeed in a rapidly evolving world.
              </Paragraph>
            </PlainCard>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps<AcademicPathwaysPageProps> = async () => {
  try {
    // Fetch academic pathways content from Contentful
    const pathways = await getAcademicPathwaysBySlug('main')
    const partners = await getAllPartners()

    return {
      props: {
        pathways: pathways || null,
        partners: partners || []
      },
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching academic pathways data:', error)
    return {
      props: {
        pathways: null,
        partners: []
      },
      revalidate: 300 // Retry after 5 minutes on error
    }
  }
}
