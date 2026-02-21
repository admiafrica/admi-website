import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { IconSearch, IconX, IconChevronDown } from '@tabler/icons-react'

import { PageSEO } from '@/components/shared/v3'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { NewsItemCard } from '@/components/cards'
import { InstitutionalFAQSchema } from '@/components/seo/InstitutionalFAQSchema'
import { IContentfulEntry } from '@/types'

const QUICK_SEARCHES = [
  'Film Production',
  'Music Production',
  'Animation',
  'Graphic Design',
  'Digital Marketing',
  'Photography',
  'Sound Engineering',
  'UI/UX Design'
]

const INDUSTRY_OPTIONS = [
  'All Industries',
  'Film & TV',
  'Music',
  'Design',
  'Animation',
  'Gaming',
  'Photography',
  'Digital Marketing'
]
const TOPIC_OPTIONS = [
  'All Topics',
  'Film Production',
  'Scriptwriting',
  '2D Animation',
  '3D Animation',
  'Music Production',
  'Sound Engineering',
  'Graphic Design',
  'UI/UX Design',
  'Digital Marketing',
  'Photography',
  'Video Game Development',
  'Motion Graphics'
]
const COURSE_OPTIONS = [
  'All Courses',
  'Film Production',
  'Music Production',
  'Graphic Design',
  'Animation',
  'Photography',
  'Digital Marketing',
  'Sound Engineering',
  'UI/UX Design'
]

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
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ industry: '', topic: '', course: '' })
  const [isSearchMode, setIsSearchMode] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const pageFromUrl = parseInt(router.query.page as string) || 1
  const isPreview = router.query.preview === 'true'
  const [currentPage, setCurrentPage] = useState(pageFromUrl)

  const hasActiveFilters = Object.values(filters).some((v) => v !== '') || searchQuery.length > 0

  // Build a combined search term from all active filters + search query
  const buildSearchTerm = useCallback(() => {
    const terms: string[] = []
    if (searchQuery.trim()) terms.push(searchQuery.trim())
    if (filters.industry && !filters.industry.startsWith('All')) terms.push(filters.industry)
    if (filters.topic && !filters.topic.startsWith('All')) terms.push(filters.topic)
    if (filters.course && !filters.course.startsWith('All')) terms.push(filters.course)
    return terms.join(' ')
  }, [searchQuery, filters])

  const clearFilters = () => {
    setFilters({ industry: '', topic: '', course: '' })
    setSearchQuery('')
  }

  // Fetch ALL matching resources from Contentful (no pagination limit)
  const fetchSearchResults = useCallback(
    async (term: string) => {
      setLoading(true)
      try {
        const previewParam = isPreview ? '&preview=true' : ''
        const searchParam = term ? `&search=${encodeURIComponent(term)}` : ''
        const response = await fetch(`/api/v3/resources?${previewParam.replace('&', '')}${searchParam}`)
        const data = await response.json()
        setResources(data.resources || [])
        setIsSearchMode(true)
      } catch (error) {
        console.error('Error searching resources:', error)
      }
      setLoading(false)
    },
    [isPreview]
  )

  // Fetch a specific page (normal paginated browsing)
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
        setIsSearchMode(false)
      } catch (error) {
        console.error('Error fetching page:', error)
      }
      setLoading(false)
    },
    [isPreview]
  )

  // Debounced search: triggers when search query or filters change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    const term = buildSearchTerm()
    if (term) {
      debounceRef.current = setTimeout(() => {
        fetchSearchResults(term)
      }, 400)
    } else {
      // No filters active — return to paginated mode
      setIsSearchMode(false)
      fetchPage(currentPage)
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [searchQuery, filters, buildSearchTerm, fetchSearchResults, fetchPage, currentPage])

  // Handle URL page changes
  useEffect(() => {
    const page = parseInt(router.query.page as string) || 1
    if (page !== currentPage && !isSearchMode) {
      fetchPage(page)
    }
  }, [router.query.page]) // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageChange = (page: number) => {
    router.push(`/resources?page=${page}`, undefined, { shallow: true })
  }

  const featuredFields = featured?.fields as any
  const featuredImage = featuredFields?.coverImage?.fields?.file?.url

  return (
    <MainLayout footerBgColor="#1a1a1a">
      <PageSEO
        title="Guides"
        description="Career guides, creative industry insights, and practical resources for aspiring creatives at ADMI."
        keywords="ADMI guides, creative career guides, film production guide, animation guide, creative education"
      />
      <InstitutionalFAQSchema faqType="academic" />

      <div className="w-full">
        {/* Hero with Featured Resource */}
        <div
          className="py-16"
          style={{
            background: 'linear-gradient(142deg, #0F2E2A 0%, #0A1F1D 55%, #091110 100%)'
          }}
        >
          <div className="section-container flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="flex-1">
              <p className="font-proxima text-[14px] font-bold uppercase tracking-[0.1em] text-[#B7D8CF]">/guides</p>
              <h1 className="mt-4 font-proxima text-[36px] font-bold leading-[1.15] text-white sm:text-[46px]">
                {featuredFields?.title || 'How Hybrid Creative Education Is Reshaping Media Careers in Africa'}
              </h1>
              <p className="mt-4 font-proxima text-[16px] leading-[1.7] text-white/70">
                {featuredFields?.summary ||
                  featuredFields?.description ||
                  'Explore practical toolkits, career guides, and learning resources built for creative students.'}
              </p>
              <a
                href="#resources"
                className="mt-4 inline-block font-proxima text-[14px] font-bold text-secondary hover:underline"
              >
                Explore Guides &rarr;
              </a>
            </div>
            <div className="w-full lg:w-[430px]">
              {featuredImage ? (
                <div
                  className="h-[270px] w-full rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${featuredImage.startsWith('//') ? `https:${featuredImage}` : featuredImage})`
                  }}
                />
              ) : (
                <div className="h-[270px] w-full rounded-2xl bg-gradient-to-br from-[#1a3d36] to-[#0A1F1D]" />
              )}
            </div>
          </div>
        </div>

        {/* Filter & Search Section */}
        <div className="border-b border-[#E8E8E8] bg-white py-5" id="resources">
          <div className="section-container">
            {/* Search bar + result count */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-proxima text-[14px] font-semibold text-[#444]">
                Browse Guides
                {isSearchMode && (
                  <span className="ml-2 font-normal text-[#888]">
                    &mdash; {resources.length} result{resources.length !== 1 ? 's' : ''} found
                  </span>
                )}
              </p>
              <div className="flex items-center gap-2 rounded-lg border border-[#d0d0d0] bg-white px-4 py-2.5">
                <IconSearch size={16} className="text-[#999]" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px] border-none bg-transparent font-proxima text-[14px] text-[#333] outline-none placeholder:text-[#999] sm:w-[260px]"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-[#999] hover:text-[#333]">
                    <IconX size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Quick search chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {QUICK_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(searchQuery === term ? '' : term)}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 font-proxima text-[13px] font-semibold transition-all ${
                    searchQuery === term
                      ? 'bg-[#0A3D3D] text-white'
                      : 'bg-[#F3F3F3] text-[#555] hover:bg-[#E8E8E8] hover:text-[#333]'
                  }`}
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Dropdown filters */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {(
                [
                  { key: 'industry', label: 'Industry', options: INDUSTRY_OPTIONS },
                  { key: 'topic', label: 'Topic', options: TOPIC_OPTIONS },
                  { key: 'course', label: 'Course', options: COURSE_OPTIONS }
                ] as const
              ).map(({ key, label, options }) => (
                <div key={key} className="relative">
                  <select
                    value={filters[key]}
                    onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="appearance-none rounded-lg border border-[#d0d0d0] bg-white py-2.5 pl-4 pr-8 font-proxima text-[13px] font-medium text-[#333] outline-none focus:border-brand-red"
                  >
                    <option value="">{label}</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown
                    size={14}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999]"
                  />
                </div>
              ))}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-4 py-2 font-proxima text-[13px] font-medium text-brand-red hover:underline"
                >
                  <IconX size={14} /> Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Guides Header */}
        <div className="section-container pt-14">
          <p className="font-proxima text-[13px] font-bold uppercase tracking-[0.2em] text-brand-red">
            {isSearchMode ? 'SEARCH RESULTS' : 'POPULAR RIGHT NOW'}
          </p>
          <h2 className="mt-2 font-proxima text-[36px] font-bold text-[#171717]">
            {isSearchMode ? `Guides matching "${buildSearchTerm()}"` : 'Featured Guides for Creative Learners'}
          </h2>
        </div>

        {/* Resources Grid */}
        <div className="section-container grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full py-12 text-center">
              <p className="font-proxima text-[15px] text-[#888]">Searching guides...</p>
            </div>
          ) : resources && resources.length > 0 ? (
            resources
              .filter((article) => article?.fields)
              .map((article) => (
                <div key={article.sys.id} className="h-[400px]">
                  <NewsItemCard item={article} />
                </div>
              ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="mb-2 font-proxima text-xl font-semibold text-[#555]">
                {hasActiveFilters ? 'No matching resources' : 'No resources available'}
              </h3>
              <p className="font-proxima text-[15px] text-[#888]">
                {hasActiveFilters ? 'Try adjusting your search or filters.' : 'Check back later for new resources.'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 font-proxima text-[14px] font-semibold text-brand-red hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination — only show when NOT in search mode */}
        {!isSearchMode && pagination.totalPages > 1 && (
          <div className="section-container flex justify-center gap-2 pb-16 pt-4">
            {Array.from({ length: Math.min(pagination.totalPages, 10) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-10 w-10 rounded-lg font-proxima text-[14px] font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-brand-red text-white'
                    : 'border border-[#E8E8E8] bg-white text-[#333] hover:border-brand-red'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* Toolkit Collections */}
        <div className="bg-[#F9F9F9] py-16">
          <div className="section-container">
            <h2 className="font-proxima text-[38px] font-bold text-[#171717]">Hybrid Toolkit Collections</h2>
            <div className="grid grid-cols-2 gap-3 pt-6 md:grid-cols-4">
              {[
                { label: 'Production Toolkit', color: 'text-brand-red' },
                { label: 'Portfolio Guide', color: 'text-[#0A3D3D]' },
                { label: 'Industry Toolkit', color: 'text-brand-red' },
                { label: 'Career Playbook', color: 'text-[#0A3D3D]' }
              ].map((item) => (
                <span
                  key={item.label}
                  className={`rounded-lg border border-[#E8E8E8] bg-white px-4 py-3 font-proxima text-[13px] font-bold ${item.color}`}
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
