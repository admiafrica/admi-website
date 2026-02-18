'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { 
  IconX, 
  IconPlayerPlay, 
  Icon360View,
  IconPhoto,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react'

export type FacilityMediaType = 'image' | 'video' | 'video360' | 'gallery'

export interface FacilityItem {
  title: string
  description: string
  image: string // Thumbnail/cover
  mediaType?: FacilityMediaType
  videoUrl?: string // YouTube or Vimeo
  video360Url?: string // 360 video (YouTube 360 or similar)
  galleryImages?: string[]
}

interface EquipmentFacilitiesProps {
  facilities: FacilityItem[]
}

// Extract YouTube video ID
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

// Extract Vimeo video ID
function getVimeoVideoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

// Get YouTube thumbnail
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// Get media type icon
function getMediaIcon(facility: FacilityItem): React.ReactNode {
  if (facility.mediaType === 'video360' || facility.video360Url) {
    return <Icon360View size={24} className="text-white" />
  }
  if (facility.mediaType === 'video' || facility.videoUrl) {
    return <IconPlayerPlay size={24} className="ml-0.5 text-white" fill="currentColor" />
  }
  if (facility.mediaType === 'gallery' || (facility.galleryImages && facility.galleryImages.length > 0)) {
    return <IconPhoto size={24} className="text-white" />
  }
  return null
}

// Facility Detail Modal
function FacilityModal({ 
  facility, 
  onClose 
}: { 
  facility: FacilityItem
  onClose: () => void 
}) {
  const youtubeId = facility.videoUrl ? getYouTubeVideoId(facility.videoUrl) : null
  const youtube360Id = facility.video360Url ? getYouTubeVideoId(facility.video360Url) : null
  const vimeoId = facility.videoUrl ? getVimeoVideoId(facility.videoUrl) : null
  const [galleryIndex, setGalleryIndex] = useState(0)

  const galleryImages = facility.galleryImages || []
  const hasGallery = galleryImages.length > 0
  const has360 = !!youtube360Id

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
          {/* 360 Video (YouTube with VR mode) */}
          {has360 && (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${youtube360Id}?rel=0`}
                title={`${facility.title} - 360° View`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr"
                allowFullScreen
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-white">
                <Icon360View size={16} />
                <span className="font-proxima text-xs font-medium">360° Video - Drag to look around</span>
              </div>
            </div>
          )}

          {/* Regular YouTube Video */}
          {!has360 && youtubeId && (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
                title={facility.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Vimeo Video */}
          {!has360 && !youtubeId && vimeoId && (
            <div className="aspect-video">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?color=C1272D`}
                title={facility.title}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Image Gallery */}
          {!has360 && !youtubeId && !vimeoId && hasGallery && (
            <div className="relative aspect-video">
              <img
                src={galleryImages[galleryIndex]}
                alt={`${facility.title} - Image ${galleryIndex + 1}`}
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

          {/* Static Image fallback */}
          {!has360 && !youtubeId && !vimeoId && !hasGallery && facility.image && (
            <div className="aspect-video">
              <Image
                src={facility.image}
                alt={facility.title}
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
          <h3 className="font-nexa text-2xl font-bold text-gray-900">{facility.title}</h3>
          <p className="mt-4 font-proxima text-[15px] leading-relaxed text-gray-600">
            {facility.description}
          </p>
          
          {has360 && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-blue-800">
              <Icon360View size={20} />
              <p className="font-proxima text-sm">
                <strong>360° Experience:</strong> Use your mouse to drag and look around. On mobile, move your device to explore.
              </p>
            </div>
          )}

          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="font-proxima text-[13px] text-gray-500">
              Want to experience our facilities in person? <a href="/enquiry" className="font-bold text-brand-red hover:underline">Book a campus tour</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EquipmentFacilities({ facilities }: EquipmentFacilitiesProps) {
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null)

  if (!facilities.length) return null

  return (
    <>
      <section className="section-padding w-full bg-[#f9f9f9]" aria-label="Equipment and facilities">
        <div className="section-container">
          <span className="section-label-light">Equipment &amp; Facilities</span>
          <h2 className="section-heading-light mb-4">World-Class Tools At Your Fingertips</h2>
          <p className="mb-12 max-w-2xl font-proxima text-lg leading-relaxed text-gray-600">
            Get hands-on experience with industry-standard equipment and purpose-built facilities that mirror professional
            production environments.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => {
              const mediaIcon = getMediaIcon(facility)
              const hasInteractiveMedia = facility.videoUrl || facility.video360Url || (facility.galleryImages && facility.galleryImages.length > 0)

              return (
                <button
                  key={`facility-${index}`}
                  onClick={() => setSelectedFacility(facility)}
                  className="group overflow-hidden rounded-xl border-0 bg-white text-left shadow-md transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Image/Media */}
                  <div className="relative h-[180px] w-full overflow-hidden bg-gray-300">
                    {facility.image ? (
                      <Image
                        src={facility.image}
                        alt={facility.title}
                        width={400}
                        height={180}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-300">
                        <svg
                          className="h-12 w-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                          />
                        </svg>
                      </div>
                    )}
                    
                    {/* Media type indicator */}
                    {hasInteractiveMedia && mediaIcon && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/90 shadow-lg transition-transform group-hover:scale-110">
                          {mediaIcon}
                        </div>
                      </div>
                    )}

                    {/* 360 badge */}
                    {facility.video360Url && (
                      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                        <Icon360View size={12} />
                        360°
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                      <span className="translate-y-4 rounded-lg bg-white/90 px-4 py-2 font-proxima text-[13px] font-bold text-gray-900 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        Explore
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-2 font-nexa text-base font-black text-gray-900 group-hover:text-brand-red transition-colors">
                      {facility.title}
                    </h3>
                    <p className="font-proxima text-sm leading-relaxed text-gray-600 line-clamp-2">{facility.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedFacility && (
        <FacilityModal facility={selectedFacility} onClose={() => setSelectedFacility(null)} />
      )}
    </>
  )
}
