import Image from 'next/image'
import { Box, Pagination, LoadingOverlay } from '@mantine/core'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import { PageSEO } from '@/components/shared/v3'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { AnnouncementCard, NewsItemCard } from '@/components/cards'
// import { SearchDropdown } from '@/components/ui'
import dynamic from 'next/dynamic'

const SearchDropdown = dynamic(() => import('@/components/ui').then((mod) => mod.SearchDropdown), {
  ssr: false
})
import { IContentfulEntry } from '@/types'
import { InstitutionalFAQSchema } from '@/components/seo/InstitutionalFAQSchema'

import ImageNews from '@/assets/images/featured-news.svg'
import IconBgImageYellow from '@/assets/icons/ellipse-yellow.svg'
import IconBgImageRed from '@/assets/icons/ellipse-red.svg'

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

  // Use router query for initial page to ensure consistency
  const pageFromUrl = parseInt(router.query.page as string) || 1
  const [currentPage, setCurrentPage] = useState(pageFromUrl)

  const fetchPage = useCallback(async (page: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/v3/resources?page=${page}&limit=9`)
      const data = await response.json()

      setResources(data.resources || [])
      setPagination(data.pagination)
      setCurrentPage(page)

      // Scroll to top of resources section
      document.getElementById('resources-section')?.scrollIntoView({ behavior: 'smooth' })
    } catch (error) {
      console.error('Error fetching page:', error)
    }
    setLoading(false)
  }, [])

  // Handle URL changes (back/forward navigation)
  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1
    if (page !== currentPage) {
      fetchPage(page)
    }
  }, [router.query.page, currentPage, fetchPage])

  const handlePageChange = (page: number) => {
    // Simply update the URL, let useEffect handle the actual fetching
    router.push(`/resources?page=${page}`, undefined, { shallow: true })
  }
  return (
    <MainLayout footerBgColor="white">
      <PageSEO
        title="Resources"
        description="Access valuable resources for creative media and technology professionals. Industry insights, career guidance, tutorials, and educational content from ADMI experts and industry leaders."
        keywords="creative media resources, digital media tutorials, industry insights, career guidance, educational content, ADMI resources, professional development, creative industry news"
      />

      {/* Academic FAQ Schema for resources page */}
      <InstitutionalFAQSchema faqType="academic" />
      <Box className="w-full overflow-x-hidden">
        <div className="relative h-[16em] w-full overflow-hidden bg-[#002A23]">
          {/* BACKGROUND IMAGES */}
          <div className="absolute left-[62%] top-[20vh] z-0 h-fit w-fit -translate-x-1/2 transform">
            <div className="flex justify-end">
              <Image src={IconBgImageYellow} alt={'background image'} />
            </div>
          </div>

          <div className="absolute left-1/2 top-[5vh] z-0 h-fit w-fit -translate-x-1/2 transform">
            <div className="flex">
              <Image src={IconBgImageRed} alt={'background image'} />
            </div>
          </div>
          <div className="relative z-10 mx-auto w-full max-w-screen-lg px-4 pt-24 2xl:px-0">
            <SearchDropdown
              destination="resources"
              items={[]} // Remove heavy data load - search will be handled separately
              buttonLabel="Search"
              placeholder="Search for Resource"
            />
          </div>
        </div>

        <Box className="relative w-full" bg={'#F5FFFD'} id="resources-section">
          <Box className="mx-auto w-full max-w-screen-xl">
            {/* HEADLINE */}
            <Box className="w-full px-4 py-16 xl:px-0">
              {featured && (
                <AnnouncementCard
                  destination="resources"
                  announcement={featured.fields}
                  bgColor="#E43B07"
                  image={ImageNews}
                  textColor="white"
                  arrowColor="white"
                  ribbonColor="admiShamrok"
                  featured
                />
              )}
            </Box>

            {/* RESOURCES */}
            <Box className="relative mx-auto w-full max-w-screen-xl px-4 xl:px-0">
              <LoadingOverlay visible={loading} />

              {/* Resources Grid */}
              <Box className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resources && resources.length > 0 ? (
                  resources
                    .filter((article) => article?.fields)
                    .map((article) => (
                      <Box key={article.sys.id} className="mb-10 h-[400px]">
                        <NewsItemCard item={article} />
                      </Box>
                    ))
                ) : (
                  <Box className="col-span-full py-12 text-center">
                    <h3 className="mb-2 text-xl font-semibold text-gray-600">No resources available</h3>
                    <p className="text-gray-500">
                      {loading ? 'Loading resources...' : 'Check back later for new resources.'}
                    </p>
                  </Box>
                )}
              </Box>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <Box className="flex justify-center py-12">
                  <Pagination
                    value={currentPage}
                    onChange={handlePageChange}
                    total={pagination.totalPages}
                    size="lg"
                    radius="md"
                    withEdges
                    classNames={{
                      control: 'hover:bg-admiDarkOrange hover:text-white transition-colors',
                      dots: 'text-gray-400'
                    }}
                  />
                </Box>
              )}

              {/* Pagination Info */}
              {pagination.totalPages > 1 && (
                <Box className="pb-8 text-center text-gray-600">
                  <span>
                    Showing {(currentPage - 1) * pagination.limit + 1} -{' '}
                    {Math.min(currentPage * pagination.limit, pagination.totalCount)} of {pagination.totalCount}{' '}
                    resources
                  </span>
                </Box>
              )}
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

    // Use localhost for server-side requests
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
    const apiUrl = `${baseUrl}/api/v3/resources?page=${page}&limit=${limit}`

    // Fetch paginated resources
    const paginatedRes = await fetch(apiUrl)

    if (!paginatedRes.ok) throw new Error('Failed to fetch paginated resources')

    const paginatedData = await paginatedRes.json()

    // Handle both array response (old API) and object response (new API)
    let resources, pagination
    if (Array.isArray(paginatedData)) {
      // Old API format - returns array directly
      // Need to manually paginate the array
      const start = (page - 1) * limit
      const end = start + limit
      resources = paginatedData.slice(start, end)

      pagination = {
        page: page,
        limit: limit,
        totalCount: paginatedData.length,
        totalPages: Math.ceil(paginatedData.length / limit),
        hasNext: paginatedData.length > page * limit,
        hasPrev: page > 1
      }
    } else {
      // New API format - returns { resources, pagination }
      resources = paginatedData.resources || []
      pagination = paginatedData.pagination || {}
    }

    // Fetch only featured resource separately to avoid loading all data
    const featuredRes = await fetch(`${baseUrl}/api/v3/resources?page=1&limit=50`)

    if (!featuredRes.ok) throw new Error('Failed to fetch featured resource')

    const featuredData = await featuredRes.json()

    // Handle both response formats for featured resources too
    const featuredResources = Array.isArray(featuredData) ? featuredData : featuredData.resources || []

    // Find featured resource from the small subset
    const featured = featuredResources.find((article: IContentfulEntry) => article?.fields?.featured) || null

    // Clean up resources to remove any undefined values
    const cleanResources = (resources || []).filter((resource: any) => resource && resource.fields)

    // Ensure pagination object has no undefined values
    const cleanPagination = {
      page: pagination?.page || page,
      limit: pagination?.limit || limit,
      totalCount: pagination?.totalCount || 0,
      totalPages: pagination?.totalPages || 0,
      hasNext: pagination?.hasNext || false,
      hasPrev: pagination?.hasPrev || false
    }

    return {
      props: {
        initialResources: cleanResources,
        initialFeatured: featured,
        initialPagination: cleanPagination
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
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      }
    }
  }
}
