'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { 
  IconX, 
  IconAward, 
  IconTool, 
  IconExternalLink, 
  IconPlayerPlay,
  IconFileTypePdf,
  IconMusic,
  IconPhoto,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react'
import { PortfolioItem, PortfolioMediaType } from '@/data/course-page-data'

type Props = {
  items: PortfolioItem[]
}

// Extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

// Extract Vimeo video ID from URL
function getVimeoVideoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

// Extract SoundCloud embed URL
function getSoundCloudEmbed(url: string): string {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23C1272D&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`
}

// Get YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// Determine media type icon for card overlay
function getMediaTypeIcon(item: PortfolioItem): React.ReactNode {
  if (item.mediaType === 'audio' || item.audioUrl) {
    return <IconMusic size={28} className="text-white" />
  }
  if (item.mediaType === 'pdf' || item.pdfUrl) {
    return <IconFileTypePdf size={28} className="text-white" />
  }
  if (item.mediaType === 'gallery' || (item.galleryImages && item.galleryImages.length > 0)) {
    return <IconPhoto size={28} className="text-white" />
  }
  if (item.projectUrl || item.vimeoUrl) {
    return <IconPlayerPlay size={28} className="ml-0.5 text-white" fill="currentColor" />
  }
  return null
}

// Portfolio Detail Modal with multi-media support
function PortfolioModal({ 
  item, 
  onClose 
}: { 
  item: PortfolioItem
  onClose: () => void 
}) {
  const youtubeId = item.projectUrl ? getYouTubeVideoId(item.projectUrl) : null
  const vimeoId = item.vimeoUrl ? getVimeoVideoId(item.vimeoUrl) : null
  const [isPlaying, setIsPlaying] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const galleryImages = item.galleryImages || []
  const hasGallery = galleryImages.length > 0
  const hasAudio = !!item.audioUrl
  const hasPdf = !!item.pdfUrl

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Gallery navigation
  const nextImage = () => setGalleryIndex((prev) => (prev + 1) % galleryImages.length)
  const prevImage = () => setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
          aria-label="Close"
        >
          <IconX size={20} />
        </button>

        {/* Media Section */}
        <div className="relative w-full bg-gray-900">
          {/* YouTube Video */}
          {youtubeId && (
            <div className="aspect-video">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={item.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={getYouTubeThumbnail(youtubeId)}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      if (target.src.includes('maxresdefault')) {
                        target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                      }
                    }}
                  />
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
                    aria-label={`Play ${item.title}`}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-red shadow-lg transition-transform hover:scale-110">
                      <IconPlayerPlay size={40} className="ml-1 text-white" fill="currentColor" />
                    </div>
                  </button>
                </>
              )}
            </div>
          )}

          {/* Vimeo Video */}
          {!youtubeId && vimeoId && (
            <div className="aspect-video">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?color=C1272D`}
                title={item.title}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Image Gallery */}
          {!youtubeId && !vimeoId && hasGallery && (
            <div className="relative aspect-video">
              <img
                src={galleryImages[galleryIndex]}
                alt={`${item.title} - Image ${galleryIndex + 1}`}
                className="h-full w-full object-contain"
              />
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                    aria-label="Previous image"
                  >
                    <IconChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                    aria-label="Next image"
                  >
                    <IconChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                    {galleryIndex + 1} / {galleryImages.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Audio Player */}
          {!youtubeId && !vimeoId && !hasGallery && hasAudio && (
            <div className="flex aspect-video flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-8">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-red/20">
                <IconMusic size={48} className="text-brand-red" />
              </div>
              <h4 className="mb-4 text-center font-proxima text-lg font-bold text-white">{item.title}</h4>
              {item.audioUrl?.includes('soundcloud.com') ? (
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={getSoundCloudEmbed(item.audioUrl)}
                  className="max-w-md"
                />
              ) : (
                <audio controls className="w-full max-w-md">
                  <source src={item.audioUrl} />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          )}

          {/* PDF Preview - embedded viewer, no download */}
          {!youtubeId && !vimeoId && !hasGallery && !hasAudio && hasPdf && (
            <div className="aspect-video bg-gray-100">
              <iframe
                src={`${item.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                title={item.title}
                className="h-full w-full"
                style={{ border: 'none' }}
              />
            </div>
          )}

          {/* Fallback: Static Image */}
          {!youtubeId && !vimeoId && !hasGallery && !hasAudio && !hasPdf && (
            <div className="aspect-video">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Gallery thumbnails */}
        {hasGallery && galleryImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto bg-gray-100 p-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setGalleryIndex(idx)}
                className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg transition ${
                  idx === galleryIndex ? 'ring-2 ring-brand-red' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h3 className="font-proxima text-2xl font-bold text-gray-900 md:text-3xl">
              {item.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-gray-600">
              <span className="font-proxima text-[15px]">by <strong className="text-gray-900">{item.student}</strong></span>
              {item.course && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="font-proxima text-[15px]">{item.course}</span>
                </>
              )}
              {item.year && (
                <>
                  <span className="text-gray-300">|</span>
                  <span className="font-proxima text-[15px]">Class of {item.year}</span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className="mb-6 font-proxima text-[15px] leading-relaxed text-gray-600">
              {item.description}
            </p>
          )}

          {/* Awards */}
          {item.awards && item.awards.length > 0 && (
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <IconAward size={18} className="text-amber-500" />
                <span className="font-proxima text-sm font-bold text-gray-900">Awards & Recognition</span>
              </div>
              <ul className="space-y-1">
                {item.awards.map((award, idx) => (
                  <li key={idx} className="font-proxima text-[14px] text-gray-600">• {award}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools Used */}
          {item.tools && item.tools.length > 0 && (
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <IconTool size={18} className="text-gray-500" />
                <span className="font-proxima text-sm font-bold text-gray-900">Tools & Software Used</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tools.map((tool, idx) => (
                  <span 
                    key={idx} 
                    className="rounded-full bg-gray-100 px-3 py-1 font-proxima text-[13px] text-gray-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-6">
            {item.projectUrl && (
              <a
                href={item.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 font-proxima text-[14px] font-bold text-white transition hover:bg-[#a52830]"
              >
                <IconExternalLink size={16} />
                Watch Full Project
              </a>
            )}
            <p className="font-proxima text-[13px] text-gray-500">
              Want to create work like this? <a href="/enquiry" className="font-bold text-brand-red hover:underline">Apply to ADMI</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudentPortfolio({ items }: Props) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  if (!items.length) return null

  return (
    <>
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="mb-12 text-center md:text-left">
            <span className="section-label-light">Student Work</span>
            <h2 className="section-heading-light">Portfolio Showcase</h2>
            <p className="section-subheading-light mt-4 max-w-2xl">
              See what our students create. From day one, you build a portfolio that gets you hired.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const youtubeId = item.projectUrl ? getYouTubeVideoId(item.projectUrl) : null
              const mediaIcon = getMediaTypeIcon(item)
              const hasMediaOverlay = youtubeId || item.vimeoUrl || item.audioUrl || item.pdfUrl || (item.galleryImages && item.galleryImages.length > 0)

              return (
                <button
                  key={index}
                  onClick={() => setSelectedItem(item)}
                  className="group relative overflow-hidden rounded-xl border-0 bg-white text-left shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="aspect-video w-full overflow-hidden relative bg-gray-900">
                    {youtubeId ? (
                      <img
                        src={getYouTubeThumbnail(youtubeId)}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          if (target.src.includes('maxresdefault')) {
                            target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                          }
                        }}
                      />
                    ) : (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {/* Media type indicator */}
                    {hasMediaOverlay && mediaIcon && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/90 shadow-lg transition-transform group-hover:scale-110">
                          {mediaIcon}
                        </div>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                      <span className="translate-y-4 rounded-lg bg-white/90 px-4 py-2 font-proxima text-[13px] font-bold text-gray-900 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="bg-white p-5">
                    <h4 className="font-proxima font-bold text-gray-900 group-hover:text-brand-red transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-1 font-proxima text-sm text-gray-500">by {item.student}</p>
                    {item.year && (
                      <p className="mt-0.5 font-proxima text-xs text-gray-400">Class of {item.year}</p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  )
}
