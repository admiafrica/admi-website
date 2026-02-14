import { Box, Pagination } from '@mantine/core'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import { PageSEO } from '@/components/shared/v3'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { AnnouncementCard, NewsItemCard } from '@/components/cards'
import { InstitutionalFAQSchema } from '@/components/seo/InstitutionalFAQSchema'
import { IContentfulEntry } from '@/types'

import ImageNews from '@/assets/images/featured-news.svg'

interface PaginationData {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface ResourcesPageProps {
  initialResources: IContentfulEntry[]
  initialFeatured: IContentfulEntry | null
  initialPagination: PaginationData
}

export default function ResourcesPage({ initialResources, initialFeatured, initialPagination }: ResourcesPageProps) {
  const router = useRouter()
  const [resources, setResources] = useState(initialResources)
  const [featured] = useState(initialFeatured)
  const [pagination, setPagination] = useState(initialPagination)
  const [loading, setLoading] = useState(false)

  const pageFromUrl = parseInt(router.query.page as string) || 1
  const isPreview = router.query.preview === 'true'
  const [currentPage, setCurrentPage] = useState(pageFromUrl)

  const fetchPage = useCallback(
    async (page: number) => {
      setLoading(true)
      try {
        const previewParam = isPreview ? '&preview=true' : ''
        const response = await fetch(`/api/v3/resources?page=${page}&limit=9${previewParam}`)
        const data = await response.json()
        setResources(data.resources || [])
        setPagination(data.pagination)
        setCurrentPage(page)
      } catch (error) {
        console.error('Error fetching page:', error)
      }
      setLoading(false)
    },
    [isPreview]
  )

  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1
    if (page !== currentPage) {
      fetchPage(page)
    }
  }, [router.query.page, currentPage, fetchPage])

  const handlePageChange = (page: number) => {
    router.push(`/resources?page=${page}`, undefined, { shallow: true })
  }

  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Resources"
        description="Featured resources, guides, and insights for hybrid creative learners at ADMI."
        keywords="ADMI resources, creative education resources, hybrid learning guides, industry insights"
      />
      <InstitutionalFAQSchema faqType="academic" />

      <Box className="w-full">
        <Box className="bg-[#0F2E2A] px-4 py-16 text-white xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl">
            <p className="font-nexa text-[14px] uppercase tracking-[0.15em] text-[#B7D8CF]">/resources</p>
            <h1 className="pt-4 font-fraunces text-[46px] font-bold leading-[1.15]">
              Featured Resources for Hybrid Learners
            </h1>
            <p className="pt-4 font-nexa text-[18px] text-white/80">
              Explore practical toolkits, career guides, and learning resources built for creative students.
            </p>

            <Box className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/30 px-3 py-1 text-[13px]">Industry: All</span>
              <span className="rounded-full border border-white/30 px-3 py-1 text-[13px]">Course: All</span>
              <span className="rounded-full border border-white/30 px-3 py-1 text-[13px]">Topic: All</span>
            </Box>
          </Box>
        </Box>

        <Box className="border-y border-[#E8E8E8] bg-white">
          <Box className="mx-auto flex w-full max-w-screen-xl items-center justify-around px-4 py-6 xl:px-0">
            <Box className="text-center">
              <p className="font-fraunces text-[34px] font-bold text-[#171717]">120+</p>
              <p className="font-nexa text-[14px] text-[#666]">Learning Resources</p>
            </Box>
            <Box className="h-[44px] w-px bg-[#DADADA]" />
            <Box className="text-center">
              <p className="font-fraunces text-[34px] font-bold text-[#171717]">26</p>
              <p className="font-nexa text-[14px] text-[#666]">Hybrid Learning Guides</p>
            </Box>
            <Box className="h-[44px] w-px bg-[#DADADA]" />
            <Box className="text-center">
              <p className="font-fraunces text-[34px] font-bold text-[#171717]">Weekly</p>
              <p className="font-nexa text-[14px] text-[#666]">Fresh Resources</p>
            </Box>
          </Box>
        </Box>

        <Box className="border-b border-[#E8E8E8] bg-white">
          <Box className="mx-auto flex w-full max-w-screen-xl items-center gap-2 px-4 xl:px-0">
            {['#industry', '#course', '#topic', '#format'].map((tab, idx) => (
              <span
                key={tab}
                className={`px-4 py-4 font-nexa text-[14px] font-bold ${idx === 0 ? 'border-b-[3px] border-[#BA2E36] text-[#171717]' : 'text-[#666]'}`}
              >
                {tab}
              </span>
            ))}
          </Box>
        </Box>

        <Box className="mx-auto w-full max-w-screen-xl px-4 py-16 xl:px-0">
          {featured && (
            <AnnouncementCard
              destination="resources"
              announcement={featured.fields}
              bgColor="#0A3D3D"
              textColor="white"
              arrowColor="white"
              image={ImageNews}
              featured
            />
          )}
        </Box>

        <Box className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 pb-6 sm:grid-cols-2 lg:grid-cols-3 xl:px-0">
          {resources && resources.length > 0 ? (
            resources
              .filter((article) => article?.fields)
              .map((article) => (
                <Box key={article.sys.id} className="mb-6 h-[400px]">
                  <NewsItemCard item={article} />
                </Box>
              ))
          ) : (
            <Box className="col-span-full py-12 text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-600">No resources available</h3>
              <p className="text-gray-500">{loading ? 'Loading resources...' : 'Check back later for new resources.'}</p>
            </Box>
          )}
        </Box>

        {pagination.totalPages > 1 && (
          <Box className="flex justify-center pb-16 pt-8">
            <Pagination value={currentPage} onChange={handlePageChange} total={pagination.totalPages} size="lg" withEdges />
          </Box>
        )}

        <Box className="bg-[#F9F9F9] px-4 py-16 xl:px-0">
          <Box className="mx-auto w-full max-w-screen-xl">
            <h2 className="font-fraunces text-[38px] font-bold text-[#171717]">Hybrid Toolkit Collections</h2>
            <Box className="grid grid-cols-2 gap-3 pt-6 md:grid-cols-4">
              {['Production Toolkit', 'Hybrid Lab Guide', 'Industry Briefs', 'Student Playbook'].map((item, idx) => (
                <span
                  key={item}
                  className={`rounded-md border border-[#E8E8E8] bg-white px-4 py-2 font-nexa text-[13px] font-bold ${idx % 2 === 0 ? 'text-[#BA2E36]' : 'text-[#444]'}`}
                >
                  {item}
                </span>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const page = parseInt(context.query.page as string) || 1
    const limit = 9
    const isPreview = context.query.preview === 'true'

    const previewParam = isPreview ? '&preview=true' : ''

    const [resourcesRes, featuredRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/resources?page=${page}&limit=${limit}${previewParam}`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/resources?featured=true&limit=1${previewParam}`)
    ])

    if (!resourcesRes.ok || !featuredRes.ok) {
      throw new Error('Failed to fetch resources data')
    }

    const resourcesData = await resourcesRes.json()
    const featuredData = await featuredRes.json()

    const resources = resourcesData.resources || []
    const featured = featuredData.resources?.[0] || resources.find((item: any) => item?.fields?.featured) || null

    const filteredResources = resources.filter((item: IContentfulEntry) => item?.sys?.id !== featured?.sys?.id)

    return {
      props: {
        initialResources: filteredResources,
        initialFeatured: featured,
        initialPagination: resourcesData.pagination || {
          page,
          limit,
          totalCount: filteredResources.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        }
      }
    }
  } catch (error) {
    console.error('Error fetching resources:', error)
    return {
      props: {
        initialResources: [],
        initialFeatured: null,
        initialPagination: {
          page: 1,
          limit: 9,
          totalCount: 0,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        }
      }
    }
  }
}
