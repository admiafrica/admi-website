'use client'

import { useState } from 'react'
import Image from 'next/image'

type ActivityPhoto = {
  caption: string
  image: string
  videoUrl?: string // Optional YouTube URL for video content
  aspectRatio?: 'square' | 'portrait' | 'landscape' // For masonry variety
}

type Props = {
  photos: ActivityPhoto[]
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

export default function StudentsInAction({ photos }: Props) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  if (!photos.length) return null

  // Assign aspect ratios for masonry effect if not provided
  const photosWithRatios = photos.map((photo, index) => ({
    ...photo,
    aspectRatio: photo.aspectRatio || (['landscape', 'square', 'portrait', 'landscape', 'square'][index % 5] as 'square' | 'portrait' | 'landscape')
  }))

  const getAspectClass = (ratio: string) => {
    switch (ratio) {
      case 'portrait': return 'aspect-[3/4]'
      case 'square': return 'aspect-square'
      case 'landscape':
      default: return 'aspect-video'
    }
  }

  return (
    <section className="section-padding w-full bg-[#f9f9f9]">
      <div className="section-container">
        {/* Header */}
        <p className="section-label-light">Students in Action</p>
        <h2 className="section-heading-light mt-3">Life Inside The Program</h2>
        <p className="mt-4 max-w-3xl font-proxima text-lg leading-relaxed text-gray-500">
          From early morning shoots to late-night editing sessions — experience what it&apos;s really like to study at ADMI.
        </p>

        {/* Masonry Grid */}
        <div className="mt-12 columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
          {photosWithRatios.map((photo, index) => {
            const youtubeId = photo.videoUrl ? getYouTubeVideoId(photo.videoUrl) : null
            const isPlaying = playingVideo === youtubeId
            const isVideo = !!youtubeId

            return (
              <div 
                key={index} 
                className="group relative break-inside-avoid overflow-hidden rounded-xl bg-gray-200 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className={`relative w-full ${getAspectClass(photo.aspectRatio || 'landscape')}`}>
                  {isPlaying && youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                      title={photo.caption}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {isVideo ? (
                        // YouTube thumbnail
                        <img
                          src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                          alt={photo.caption}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            if (target.src.includes('maxresdefault')) {
                              target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                            }
                          }}
                        />
                      ) : photo.image.startsWith('http') || photo.image.startsWith('/') ? (
                        <Image
                          src={photo.image}
                          alt={photo.caption}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        // Placeholder
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200">
                          <span className="font-proxima text-sm text-gray-400">BTS Photo</span>
                        </div>
                      )}
                      
                      {/* Play button for videos */}
                      {isVideo && (
                        <button
                          onClick={() => setPlayingVideo(youtubeId)}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
                          aria-label={`Play ${photo.caption}`}
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
                            <svg
                              className="ml-1 h-6 w-6 text-brand-red"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </button>
                      )}
                    </>
                  )}
                </div>
                
                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 pt-8">
                  <p className="font-proxima text-sm font-medium text-white drop-shadow-sm">{photo.caption}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
