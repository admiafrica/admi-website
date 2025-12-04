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
    "As an accredited member college of Woolf, ADMI offers students seamless academic pathways to internationally recognized degrees. Discover how ADMI and Woolf's global collegiate model creates opportunities for further studies and career advancement in digital media and creative technology."
  const woolfPartner = partners.find((p) => p.fields.name?.includes('Woolf'))

  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title={title}
        description={description}
        keywords="ADMI Woolf accreditation, academic pathways, collegiate education, further studies, career opportunities, digital media education, international partnerships, student transitions"
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
                    As an accredited member of Woolf—a globally recognized collegiate Higher Education Institution—ADMI
                    provides students with world-class education that is recognized across 50+ countries.
                  </Paragraph>
                  <Paragraph fontFamily="font-nexa" className="py-4 text-white sm:pr-4">
                    Through our membership with Woolf, ADMI graduates receive degrees recognized by treaty obligation in
                    the European Higher Education Area, the United States, Canada, and beyond. Our academic pathways
                    enable seamless transitions to further studies or careers in digital media and creative technology.
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
                <Title label="Woolf Membership" color="black" size={isMobile ? '28px' : '40px'} />
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
                    Woolf is a fully accredited collegiate Higher Education Institution modeled on Oxford, Delhi
                    University, and University of California. As a member college, ADMI benefits from Woolf's advanced
                    Accreditation Management System and commitment to European Standards and Guidelines 2015.
                  </Paragraph>
                  <Paragraph fontFamily="font-nexa" className="py-4">
                    Our students graduate with degrees recognized across the European Qualifications Framework, and
                    verified for immigration, residency, and professional licensing in Canada, the United States, and
                    beyond.
                  </Paragraph>
                  {woolfPartner.fields.website && (
                    <a
                      href={woolfPartner.fields.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block rounded bg-[#F1FE37] px-6 py-2 font-bold text-black hover:opacity-80"
                    >
                      Learn more about Woolf
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
              <Title label="Global Opportunities" size="20px" color="black" />
              <Paragraph className="py-4" fontFamily="font-nexa">
                As a Woolf member college, ADMI offers students industry-focused curricula combined with internationally
                recognized accreditation. Our graduates earn degrees that facilitate immigration, professional
                licensing, and educational advancement worldwide.
              </Paragraph>
              <Paragraph className="py-4" fontFamily="font-nexa">
                Whether pursuing careers in digital media or transitioning to further studies at leading institutions
                globally, ADMI students benefit from Woolf's commitment to academic excellence and the global
                recognition that comes with European Higher Education standards. Education should be world-class,
                accessible, and globally transferable— and that's exactly what Woolf and ADMI deliver.
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
