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
  assets: Array<{
    sys: { id: string }
    fields: {
      file: {
        url: string
        details: {
          size: number
          image?: {
            width: number
            height: number
          }
        }
      }
      title?: string
    }
  }>
}

export default function AcademicPathwaysPage({ pathways, partners, assets }: AcademicPathwaysPageProps) {
  const isMobile = useIsMobile()

  // Contentful response structure
  const title = pathways?.fields?.title || 'Academic Pathways'
  const description = pathways?.fields?.description || ''
  const heroTitle = pathways?.fields?.heroTitle || 'Academic Pathways'
  const heroDescription = pathways?.fields?.heroDescription || ''
  const benefitsTitle = pathways?.fields?.benefitsTitle || 'Why Work at ADMI?'
  const woolfMembershipTitle = pathways?.fields?.woolfMembershipTitle || 'Woolf Membership'
  const woolfMembershipDescription = pathways?.fields?.woolfMembershipDescription || ''
  const woolfMembershipSecondDescription = pathways?.fields?.woolfMembershipSecondDescription || ''
  const globalOpportunitiesTitle = pathways?.fields?.globalOpportunitiesTitle || 'Global Opportunities'
  const globalOpportunitiesDescription = pathways?.fields?.globalOpportunitiesDescription || ''
  const globalOpportunitiesSecondDescription = pathways?.fields?.globalOpportunitiesSecondDescription || ''

  // Filter partners with logos only
  const partnersWithLogos = partners.filter((p) => p.fields.logo)
  const woolfPartner = partnersWithLogos.find((p) => (p.fields.partnerName || p.fields.name)?.includes('Woolf'))

  // Helper function to get logo URL from assets
  const getLogoUrl = (partner: AcademicPathwaysPartner): string | null => {
    if (!partner.fields.logo?.sys?.id) return null
    const asset = assets.find((a) => a.sys.id === partner.fields.logo?.sys?.id)
    return asset ? `https:${asset.fields.file.url}` : null
  }

  // Helper function to get partner name
  const getPartnerName = (partner: AcademicPathwaysPartner): string => {
    return partner.fields.partnerName || partner.fields.name || 'Partner'
  }

  // Helper function to get partner website
  const getPartnerWebsite = (partner: AcademicPathwaysPartner): string | undefined => {
    return partner.fields.websiteUrl || partner.fields.website
  }

  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title={title}
        description={description}
        keywords={
          pathways?.fields?.metadata?.keywords ||
          'ADMI Woolf accreditation, academic pathways, collegiate education, further studies, career opportunities, digital media education, international partnerships, student transitions'
        }
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
                    {heroTitle}
                  </Paragraph>
                  <Paragraph fontFamily="font-nexa" className="py-4 text-white sm:pr-4">
                    {heroDescription}
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
              <Title label={benefitsTitle} color="white" />
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

        {/* Academic Partners Section */}
        {partnersWithLogos.length > 0 && (
          <Box className="relative z-20 w-full bg-white py-12 pb-32">
            <Box className="mx-auto flex w-full max-w-screen-xl flex-col px-4 2xl:px-0">
              <Box className="pb-12">
                <Title
                  label={partnersWithLogos.length === 1 ? woolfMembershipTitle : 'Our Academic Partners'}
                  color="black"
                  size={isMobile ? '28px' : '40px'}
                />
              </Box>

              {/* Show Woolf partner prominently if exists */}
              {woolfPartner && (
                <>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Box className="flex flex-col">
                        <Box className="relative h-[200px] w-full">
                          {getLogoUrl(woolfPartner) && (
                            <Image
                              fill
                              src={getLogoUrl(woolfPartner) || ''}
                              alt={getPartnerName(woolfPartner)}
                              style={{ objectFit: 'contain' }}
                            />
                          )}
                        </Box>
                        <Title label={getPartnerName(woolfPartner)} color="black" size="24px" className="mt-6" />
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Paragraph fontFamily="font-nexa" className="py-4">
                        {woolfMembershipDescription}
                      </Paragraph>
                      <Paragraph fontFamily="font-nexa" className="py-4">
                        {woolfMembershipSecondDescription}
                      </Paragraph>
                      {getPartnerWebsite(woolfPartner) && (
                        <a
                          href={getPartnerWebsite(woolfPartner)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded bg-[#F1FE37] px-6 py-2 font-bold text-black hover:opacity-80"
                        >
                          Learn more about {getPartnerName(woolfPartner)}
                        </a>
                      )}
                    </Grid.Col>
                  </Grid>

                  {/* Show other partners if any */}
                  {partnersWithLogos.length > 1 && (
                    <Box className="mt-12">
                      <Grid>
                        {partnersWithLogos
                          .filter((p) => p.sys.id !== woolfPartner.sys.id)
                          .map((partner) => (
                            <Grid.Col key={partner.sys.id} span={{ base: 12, sm: 6, md: 4 }}>
                              <Box className="flex flex-col items-center p-4">
                                <Box className="relative h-[150px] w-full">
                                  {getLogoUrl(partner) && (
                                    <Image
                                      fill
                                      src={getLogoUrl(partner) || ''}
                                      alt={getPartnerName(partner)}
                                      style={{ objectFit: 'contain' }}
                                    />
                                  )}
                                </Box>
                                <Title
                                  label={getPartnerName(partner)}
                                  color="black"
                                  size="18px"
                                  className="mt-4 text-center"
                                />
                                {getPartnerWebsite(partner) && (
                                  <a
                                    href={getPartnerWebsite(partner)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 text-sm text-[#002A23] underline hover:opacity-80"
                                  >
                                    Visit website
                                  </a>
                                )}
                              </Box>
                            </Grid.Col>
                          ))}
                      </Grid>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>
        )}

        {/* Floating Card */}
        <div className="relative min-h-[300px] w-full px-4 pb-16 2xl:px-0">
          <div className="absolute left-1/2 top-[-200px] z-10 w-full max-w-screen-xl -translate-x-1/2 transform px-4 2xl:px-0">
            <PlainCard>
              <Title label={globalOpportunitiesTitle} size="20px" color="black" />
              <Paragraph className="py-4" fontFamily="font-nexa">
                {globalOpportunitiesDescription}
              </Paragraph>
              <Paragraph className="py-4" fontFamily="font-nexa">
                {globalOpportunitiesSecondDescription}
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
    const pathways = await getAcademicPathwaysBySlug('academic-pathways')
    const partnersData = await getAllPartners()

    return {
      props: {
        pathways: pathways || null,
        partners: partnersData.items || [],
        assets: partnersData.assets || []
      },
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching academic pathways data:', error)
    return {
      props: {
        pathways: null,
        partners: [],
        assets: []
      },
      revalidate: 300 // Retry after 5 minutes on error
    }
  }
}
