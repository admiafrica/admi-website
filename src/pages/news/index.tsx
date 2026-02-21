import { useState } from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

import { MainLayout } from '@/layouts/v3/MainLayout'
import { PageSEO } from '@/components/shared/v3'
import { NewsItemCard } from '@/components/cards'
import { InstitutionalFAQSchema } from '@/components/seo/InstitutionalFAQSchema'
import { IContentfulEntry } from '@/types'

const CATEGORIES = ['All Posts', 'Student Stories', 'Industry Insights', 'Campus Updates', 'Faculty Spotlight']

type NewsPageProps = {
  news: IContentfulEntry[]
  featuredNews: IContentfulEntry | null
}

export default function NewsPage({ news, featuredNews }: NewsPageProps) {
  const [activeCategory, setActiveCategory] = useState('All Posts')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterMessage, setNewsletterMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return

    setNewsletterStatus('loading')
    try {
      const response = await fetch('/api/v3/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail.trim() })
      })
      const data = await response.json()

      if (response.ok) {
        setNewsletterStatus('success')
        setNewsletterMessage("You're subscribed! Check your inbox for updates.")
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
        setNewsletterMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setNewsletterStatus('error')
      setNewsletterMessage('Something went wrong. Please try again.')
    }
  }

  const featuredFields = featuredNews?.fields as any
  const featuredImage =
    featuredFields?.featuredImage?.fields?.file?.url ||
    featuredFields?.image?.fields?.file?.url ||
    featuredFields?.thumbnail?.fields?.file?.url

  return (
    <MainLayout footerBgColor="#1a1a1a" heroOverlap>
      <PageSEO
        title="News & Blog"
        description="Latest ADMI news, student stories, industry insights, and campus updates."
        keywords="ADMI news, student stories, creative media news, ADMI blog, campus updates"
      />
      <InstitutionalFAQSchema faqType="general" />

      <div className="w-full">
        {/* Featured Article Hero */}
        <div
          className="relative pb-16 pt-28 md:pt-32"
          style={{
            background: 'linear-gradient(142deg, #0F2E2A 0%, #0A1F1D 55%, #091110 100%)'
          }}
        >
          <div className="section-container flex flex-col gap-10 lg:flex-row lg:items-center">
            {/* Left: Featured Article Text */}
            <div className="flex-1">
              <span className="inline-block rounded bg-brand-red px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                LATEST STORY
              </span>
              <h1 className="mt-5 font-proxima text-[36px] font-bold leading-[1.15] text-white sm:text-[44px]">
                {featuredFields?.title ||
                  "Inside ADMI's New XR Lab: How Extended Reality Is Transforming Creative Education"}
              </h1>
              <p className="mt-4 text-[15px] leading-[1.7] text-white/70">
                {featuredFields?.description ||
                  featuredFields?.excerpt ||
                  'Discover the latest developments from our learning community, industry network, and campus life.'}
              </p>
              {featuredNews && (
                <Link
                  href={`/news/${featuredFields?.slug || ''}`}
                  className="mt-6 inline-flex items-center gap-2 text-[15px] font-bold text-secondary hover:underline"
                >
                  Read Full Story <IconArrowRight size={16} />
                </Link>
              )}
            </div>

            {/* Right: Featured Image */}
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

        {/* Category Tabs */}
        <div className="border-b border-[#E8E8E8] bg-white">
          <div className="section-container flex items-center gap-0 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-4 text-[14px] font-bold transition-colors ${
                  activeCategory === cat
                    ? 'border-b-[3px] border-brand-red text-brand-red'
                    : 'text-[#666] hover:text-[#333]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Latest Articles Header */}
        <div className="section-container pt-14">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand-red">FEATURED ARTICLES</p>
          <h2 className="mt-2 font-proxima text-[36px] font-bold text-[#171717]">Latest Articles</h2>
        </div>

        {/* Articles Grid */}
        <div className="section-container grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {news.length > 0 ? (
            news.map((article) => (
              <div key={article.sys.id} className="h-[400px]">
                <NewsItemCard item={article} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-[#666]">No news articles available at the moment.</p>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div
          className="py-16"
          style={{
            background: 'linear-gradient(142deg, #0F2E2A 0%, #0A1F1D 55%, #091110 100%)'
          }}
        >
          <div className="section-container flex flex-col items-center text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#B7D8CF]">NEWSLETTER</p>
            <h2 className="mt-3 font-proxima text-[32px] font-bold text-white sm:text-[36px]">
              Get the latest ADMI news in your inbox
            </h2>
            <p className="mt-3 max-w-[500px] text-[15px] text-white/60">
              Subscribe to stay updated with ADMI stories, events, and industry news delivered weekly.
            </p>
            {newsletterStatus === 'success' ? (
              <p className="mt-8 text-[15px] font-semibold text-[#8EBFB0]">{newsletterMessage}</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-8 flex w-full max-w-[480px] flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterStatus === 'loading'}
                  className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-[14px] text-white placeholder:text-white/40 focus:border-secondary focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="rounded-lg bg-brand-red px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#9a2530] disabled:opacity-50"
                >
                  {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
            {newsletterStatus === 'error' && (
              <p className="mt-3 text-[13px] text-red-400">{newsletterMessage}</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v3/news`)
    if (!response.ok) throw new Error('Failed to fetch news')

    const data = await response.json()
    const news = (Array.isArray(data) ? data : data?.news || data?.resources || []).filter(
      (entry: any) => entry?.fields
    )

    const featuredNews = news.find((entry: IContentfulEntry) => entry?.fields?.featured) || news[0] || null
    const regularNews = news.filter((entry: IContentfulEntry) => entry?.sys?.id !== featuredNews?.sys?.id)

    return {
      props: {
        news: regularNews,
        featuredNews
      }
    }
  } catch (error) {
    console.error('Error fetching news page data:', error)
    return {
      props: {
        news: [],
        featuredNews: null
      }
    }
  }
}
