'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  IconCalendar,
  IconTag,
  IconClock,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconLink,
  IconChevronRight
} from '@tabler/icons-react'

import { ensureProtocol } from '@/utils'
import { MainLayout } from '@/layouts/v3/MainLayout'
import { ParagraphContentful } from '@/components/ui'
import useFullUrl from '@/hooks/useFullUrl'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RelatedArticleEntry {
  sys?: { id: string }
  fields: {
    title: string
    slug: string
    category?: string
    coverImage?: { fields?: { file?: { url?: string } } }
  }
}

export interface ArticleLayoutProps {
  article: any
  slug: string
  relatedArticles?: RelatedArticleEntry[]
  /** Which section this article belongs to */
  section: 'news' | 'resources'
  /** Label for the back breadcrumb root, e.g. "News" or "Resources" */
  backLabel: string
  /** Href for the back breadcrumb root, e.g. "/news" or "/resources" */
  backHref: string
  /** SEO / schema blocks rendered above the layout */
  seoSchemas?: React.ReactNode
}

/* ------------------------------------------------------------------ */
/*  Utility helpers                                                    */
/* ------------------------------------------------------------------ */

export function extractPlainText(richText: any): string {
  if (!richText || !richText.content) return ''
  const text: string[] = []

  const walkContent = (nodes: any[]) => {
    nodes.forEach((node) => {
      if (node.nodeType === 'text' && node.value) {
        text.push(node.value)
      } else if (node.content) {
        walkContent(node.content)
      }
    })
  }

  walkContent(richText.content)
  return text.join(' ')
}

export function calculateReadingTime(richText: any): number {
  const plainText = extractPlainText(richText)
  if (!plainText) return 0
  const wordCount = plainText.trim().split(/\s+/).length
  return Math.ceil(wordCount / 200)
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Section 1 -- Article Hero */
function ArticleHero({
  title,
  coverImageUrl,
  breadcrumbSegments
}: {
  title: string
  coverImageUrl: string
  breadcrumbSegments: { label: string; href?: string }[]
}) {
  return (
    <section className="w-full bg-[#0A1A18]">
      <div className="mx-auto max-w-6xl">
        {/* Background image - 16:9 aspect ratio container */}
        <div className="relative aspect-video overflow-hidden">
          <img src={coverImageUrl} alt={title} className="absolute inset-0 h-full w-full object-cover object-center" />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #0A1A18CC 0%, #0A1A1844 100%)'
            }}
          />

          {/* Content positioned at bottom-left */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-12 md:pb-14">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 font-proxima text-sm">
              {breadcrumbSegments.map((seg, i) => {
                const isLast = i === breadcrumbSegments.length - 1
                return (
                  <React.Fragment key={i}>
                    {i > 0 && <IconChevronRight size={14} className="text-white/40" aria-hidden />}
                    {isLast ? (
                      <span className="text-white">{seg.label}</span>
                    ) : (
                      <Link href={seg.href || '#'} className="text-white/70 transition-colors hover:text-white">
                        {seg.label}
                      </Link>
                    )}
                  </React.Fragment>
                )
              })}
            </nav>

            {/* Title */}
            <h1 className="max-w-[800px] font-proxima text-[28px] font-bold leading-[1.15] text-white md:text-[44px]">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Section 2 -- Article Meta bar */
function ArticleMetaBar({ date, category, readingTime }: { date: string; category: string; readingTime: number }) {
  const items = [
    { icon: IconCalendar, label: date },
    { icon: IconTag, label: category },
    { icon: IconClock, label: `${readingTime} min read` }
  ].filter((item) => item.label)

  return (
    <div className="w-full bg-[#F9F9F9]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-6 px-6 py-5 md:gap-8 md:px-12">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon size={18} className="text-[#888]" aria-hidden />
              <span className="font-proxima text-sm text-[#555]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Author Card (sidebar) */
function AuthorCard({ author }: { author: string }) {
  return (
    <div className="rounded-2xl bg-[#F9F9F9] p-6">
      <span className="font-proxima text-xs font-bold uppercase tracking-[0.8px] text-[#888]">Written by</span>
      <div className="mt-3 flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red font-proxima text-sm font-bold text-white">
          {author
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)}
        </div>
        <div>
          <p className="font-proxima text-[15px] font-semibold text-[#171717]">{author}</p>
          <p className="font-proxima text-xs text-[#888]">ADMI Editorial</p>
        </div>
      </div>
    </div>
  )
}

/** Share This Article card (sidebar) */
function ShareCard({ title, summary }: { title: string; summary: string }) {
  const urlToShare = useFullUrl()
  const [copied, setCopied] = useState(false)

  const handleShare = (platform: string) => {
    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlToShare)}`
        break
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${summary} ${urlToShare}`)}`
        break
      default:
        return
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(urlToShare)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const socialItems = [
    {
      icon: IconBrandFacebook,
      label: 'Facebook',
      onClick: () => handleShare('facebook'),
      color: '#1877F2'
    },
    {
      icon: IconBrandLinkedin,
      label: 'LinkedIn',
      onClick: () => handleShare('linkedin'),
      color: '#0A66C2'
    },
    {
      icon: IconBrandWhatsapp,
      label: 'WhatsApp',
      onClick: () => handleShare('whatsapp'),
      color: '#25D366'
    },
    {
      icon: IconLink,
      label: copied ? 'Copied!' : 'Copy Link',
      onClick: handleCopyLink,
      color: '#888'
    }
  ]

  return (
    <div className="rounded-2xl border border-[#E8E8E8] p-6">
      <p className="mb-4 font-proxima text-[15px] font-bold text-[#171717]">Share This Article</p>
      <div className="flex items-center gap-3">
        {socialItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            aria-label={`Share on ${item.label}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] text-[#555] transition-colors hover:border-brand-red hover:text-brand-red"
          >
            <item.icon size={18} />
          </button>
        ))}
      </div>
    </div>
  )
}

/** Related Articles sidebar card */
function RelatedArticlesSidebar({
  articles,
  section
}: {
  articles: RelatedArticleEntry[]
  section: 'news' | 'resources'
}) {
  if (!articles || articles.length === 0) return null

  return (
    <div className="rounded-2xl border border-[#E8E8E8] p-6">
      <h3 className="mb-4 font-proxima text-[20px] font-bold text-[#171717]">Related Articles</h3>

      <div className="flex flex-col">
        {articles.slice(0, 4).map((entry, i) => {
          const a = entry.fields || (entry as any)
          const articleSlug = a.slug
          const articleTitle = a.title
          const articleCategory = a.category || ''
          // Handle both nested Contentful format and direct URL string from API
          const imageUrl =
            typeof a.coverImage === 'string'
              ? a.coverImage
              : a.coverImage?.fields?.file?.url
                ? ensureProtocol(a.coverImage.fields.file.url)
                : ''

          return (
            <React.Fragment key={articleSlug || i}>
              {i > 0 && <div className="my-3 h-px bg-[#F0F0F0]" />}
              <Link href={`/${section}/${articleSlug}`} className="group flex items-center gap-3">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={articleTitle}
                    className="h-[56px] w-[80px] shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  {articleCategory && (
                    <span className="font-proxima text-xs font-bold uppercase text-brand-red">{articleCategory}</span>
                  )}
                  <p className="mt-1 font-proxima text-[15px] font-semibold leading-snug text-[#171717] transition-colors group-hover:text-brand-red">
                    {articleTitle}
                  </p>
                </div>
              </Link>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

/** Section 4 -- Newsletter CTA */
function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const response = await fetch('/api/v3/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      })
      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage("You're subscribed! Check your inbox for updates.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="w-full bg-admi-black">
      <div className="section-container flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center md:py-[60px]">
        {/* Left side */}
        <div>
          <span className="font-proxima text-[13px] font-bold uppercase tracking-[1.2px] text-white/65">
            Stay Updated
          </span>
          <h2 className="mt-3 max-w-[500px] font-proxima text-[24px] font-bold leading-[1.25] text-white md:text-[28px]">
            Get the latest ADMI news in your inbox
          </h2>
        </div>

        {/* Right side -- form */}
        {status === 'success' ? (
          <p className="font-proxima text-[15px] font-semibold text-[#8EBFB0]">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="form-input-dark py-3.5 disabled:opacity-50 sm:w-[280px]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="font-proxima text-[13px] text-red-400">{message}</p>}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Layout                                                        */
/* ------------------------------------------------------------------ */

export default function ArticleLayout({
  article,
  relatedArticles = [],
  section,
  backLabel,
  backHref,
  seoSchemas
}: ArticleLayoutProps) {
  if (!article) {
    return (
      <MainLayout footerBgColor="white">
        <div className="flex h-[80vh] w-full items-center justify-center">
          <p className="font-proxima text-2xl text-[#555]">Article not found.</p>
        </div>
      </MainLayout>
    )
  }

  const readingTime = calculateReadingTime(article?.body)
  const coverImageUrl = article.coverImage?.fields?.file?.url ? ensureProtocol(article.coverImage.fields.file.url) : ''
  const publishDate = article.publishDate || article.sys?.createdAt
  const category = article.category || backLabel

  // Breadcrumb segments
  const breadcrumbSegments = [
    { label: backLabel, href: backHref },
    ...(category && category !== backLabel ? [{ label: category }] : []),
    { label: article.title }
  ]

  return (
    <MainLayout footerBgColor="white">
      {/* SEO schemas injected by the page */}
      {seoSchemas}

      {/* 1. Article Hero */}
      <ArticleHero title={article.title} coverImageUrl={coverImageUrl} breadcrumbSegments={breadcrumbSegments} />

      {/* 2. Article Meta Bar */}
      <ArticleMetaBar date={formatDate(publishDate)} category={category} readingTime={readingTime} />

      {/* 3. Article Content -- two-column layout */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 px-6 py-10 md:flex-row md:gap-[60px] md:px-12 md:py-14">
            {/* Left column -- article body */}
            <article className="min-w-0 flex-1">
              {/* Rich text content with custom prose styling */}
              <div className="article-prose">
                <ParagraphContentful fontFamily="font-proxima">{article.body}</ParagraphContentful>
              </div>
            </article>

            {/* Right column -- sidebar */}
            <aside className="flex w-full shrink-0 flex-col gap-6 md:w-[340px]">
              <AuthorCard author="ADMI Editorial Team" />
              <ShareCard title={article.title} summary={article.summary || article.excerpt || ''} />
              <RelatedArticlesSidebar articles={relatedArticles} section={section} />
            </aside>
          </div>
        </div>
      </div>

      {/* 4. Newsletter CTA */}
      <NewsletterCTA />
    </MainLayout>
  )
}
