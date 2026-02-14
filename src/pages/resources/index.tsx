import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { IconSearch, IconX, IconChevronDown } from '@tabler/icons-react'

import { PageSEO } from '@/components/shared/v3'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { NewsItemCard } from '@/components/cards'
import { InstitutionalFAQSchema } from '@/components/seo/InstitutionalFAQSchema'
import { IContentfulEntry } from '@/types'

import ImageNews from '@/assets/images/featured-news.svg'

const RESOURCE_TABS = ['Free Resources', 'Premium', 'Guides', 'Templates', 'Case Studies']

const INDUSTRY_OPTIONS = ['All Industries', 'Film & TV', 'Music', 'Design', 'Animation', 'Gaming', 'Photography', 'Digital Marketing']
const TOPIC_OPTIONS = ['All Topics', 'Career Guides', 'Tutorials', 'Industry Insights', 'Student Life', 'Portfolio Tips']
const COURSE_OPTIONS = ['All Courses', 'Film Production', 'Music Production', 'Graphic Design', 'Animation', 'Photography', 'Digital Marketing', 'Sound Engineering', 'UI/UX Design']
const TAG_OPTIONS = ['All Tags', 'Beginner', 'Intermediate', 'Advanced', 'Hybrid Learning', 'Freelancing', 'Portfolio']

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
  const [activeTab, setActiveTab] = useState('Free Resources')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ industry: '', topic: '', course: '', tag: '' })

  const pageFromUrl = parseInt(router.query.page as string) || 1
  const isPreview = router.query.preview === 'true'
  const [currentPage, setCurrentPage] = useState(pageFromUrl)

  const hasActiveFilters = Object.values(filters).some(v => v !== '') || searchQuery.length > 0

  const clearFilters = () => {
    setFilters({ industry: '', topic: '', course: '', tag: '' })
    setSearchQuery('')
  }

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

  const featuredFields = featured?.fields as any
  const featuredImage = featuredFields?.featuredImage?.fields?.file?.url
    || featuredFields?.image?.fields?.file?.url
    || featuredFields?.thumbnail?.fields?.file?.url

  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Resources"
        description="Featured resources, guides, and insights for hybrid creative learners at ADMI."
        keywords="ADMI resources, creative education resources, hybrid learning guides, industry insights"
      />
      <InstitutionalFAQSchema faqType="academic" />

      <div className="w-full">
        {/* Hero with Featured Resource */}
        <div
          className="px-4 py-16 xl:px-0"
          style={{
            background: 'linear-gradient(142deg, #0F2E2A 0%, #0A1F1D 55%, #091110 100%)'
          }}
        >
          <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-10 lg:flex-row lg:items-center">
            <div className="flex-1">
              <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#B7D8CF]">/resources</p>
              <h1 className="mt-4 font-fraunces text-[36px] font-bold leading-[1.15] text-white sm:text-[46px]">
                {featuredFields?.title || 'How Hybrid Creative Education Is Reshaping Media Careers in Africa'}
              </h1>
              <p className="mt-4 text-[16px] leading-[1.7] text-white/70">
                {featuredFields?.description || featuredFields?.excerpt || 'Explore practical toolkits, career guides, and learning resources built for creative students.'}
              </p>
              <a href="#resources" className="mt-4 inline-block text-[14px] font-bold text-[#08F6CF] hover:underline">
                Explore Resources →
              </a>
            </div>
            <div className="w-full lg:w-[430px]">
              {featuredImage ? (
                <div
                  className="h-[270px] w-full rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${featuredImage.startsWith('//') ? `https:${featuredImage}` : featuredImage})` }}
                />
              ) : (
                <div className="h-[270px] w-full rounded-2xl bg-gradient-to-br from-[#1a3d36] to-[#0A1F1D]" />
              )}
            </div>
          </div>
        </div>

        {/* Resource Tabs */}
        <div className="border-b border-[#E8E8E8] bg-white">
          <div className="mx-auto flex w-full max-w-screen-xl items-center gap-0 overflow-x-auto px-4 xl:px-0">
            {RESOURCE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-5 py-4 text-[14px] font-bold transition-colors ${
                  activeTab === tab
                    ? 'border-b-[3px] border-[#BA2E36] text-[#BA2E36]'
                    : 'text-[#666] hover:text-[#333]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Search Section */}
        <div className="border-b border-[#E8E8E8] bg-[#F9F9F9] px-4 py-6 xl:px-0" id="resources">
          <div className="mx-auto w-full max-w-screen-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[15px] font-bold text-[#333]">Filter Resources</p>
              <div className="flex items-center gap-2 rounded-lg border border-[#d0d0d0] bg-white px-4 py-2.5">
                <IconSearch size={16} className="text-[#999]" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px] border-none bg-transparent text-[14px] text-[#333] outline-none placeholder:text-[#999] sm:w-[260px]"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {([
                { key: 'industry', label: 'Industry', options: INDUSTRY_OPTIONS },
                { key: 'topic', label: 'Topic', options: TOPIC_OPTIONS },
                { key: 'course', label: 'Course', options: COURSE_OPTIONS },
                { key: 'tag', label: 'Tag', options: TAG_OPTIONS }
              ] as const).map(({ key, label, options }) => (
                <div key={key} className="relative">
                  <select
                    value={filters[key]}
                    onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
                    className="appearance-none rounded-lg border border-[#d0d0d0] bg-white py-2.5 pl-4 pr-8 text-[13px] font-medium text-[#333] outline-none focus:border-[#BA2E36]"
                  >
                    <option value="">{label}</option>
                    {options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <IconChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999]" />
                </div>
              ))}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-[#BA2E36] hover:underline"
                >
                  <IconX size={14} /> Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Resources Header */}
        <div className="mx-auto w-full max-w-screen-xl px-4 pt-14 xl:px-0">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#BA2E36]">
            POPULAR RIGHT NOW
          </p>
          <h2 className="mt-2 font-fraunces text-[36px] font-bold text-[#171717]">
            Featured Resources for Hybrid Learners
          </h2>
        </div>

        {/* Resources Grid */}
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:px-0">
          {resources && resources.length > 0 ? (
            resources
              .filter((article) => article?.fields)
              .map((article) => (
                <div key={article.sys.id} className="h-[400px]">
                  <NewsItemCard item={article} />
                </div>
              ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-600">No resources available</h3>
              <p className="text-gray-500">{loading ? 'Loading resources...' : 'Check back later for new resources.'}</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 pb-16 pt-4">
            {Array.from({ length: Math.min(pagination.totalPages, 10) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-10 w-10 rounded-lg text-[14px] font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-[#BA2E36] text-white'
                    : 'border border-[#E8E8E8] bg-white text-[#333] hover:border-[#BA2E36]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* Toolkit Collections */}
        <div className="bg-[#F9F9F9] px-4 py-16 xl:px-0">
          <div className="mx-auto w-full max-w-screen-xl">
            <h2 className="font-fraunces text-[38px] font-bold text-[#171717]">Hybrid Toolkit Collections</h2>
            <div className="grid grid-cols-2 gap-3 pt-6 md:grid-cols-4">
              {[
                { label: 'Production Toolkit', color: 'text-[#BA2E36]' },
                { label: 'Portfolio Guide', color: 'text-[#0A3D3D]' },
                { label: 'Industry Toolkit', color: 'text-[#BA2E36]' },
                { label: 'Career Playbook', color: 'text-[#0A3D3D]' }
              ].map((item) => (
                <span
                  key={item.label}
                  className={`rounded-lg border border-[#E8E8E8] bg-white px-4 py-3 text-[13px] font-bold ${item.color}`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
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
