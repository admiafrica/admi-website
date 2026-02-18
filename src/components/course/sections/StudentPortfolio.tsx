'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PortfolioItem } from '@/data/course-page-data'

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

// Get YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export default function StudentPortfolio({ items }: Props) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  if (!items.length) return null

  return (
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
            const isPlaying = playingVideo === youtubeId

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="aspect-video w-full overflow-hidden relative bg-gray-900">
                  {isPlaying && youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                      title={item.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {youtubeId ? (
                        // YouTube thumbnail
                        <img
                          src={getYouTubeThumbnail(youtubeId)}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            // Fallback to hqdefault if maxresdefault doesn't exist
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
                      {/* Play button overlay for YouTube videos */}
                      {youtubeId && (
                        <button
                          onClick={() => setPlayingVideo(youtubeId)}
                          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
                          aria-label={`Play ${item.title}`}
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red shadow-lg transition-transform hover:scale-110">
                            <svg
                              className="ml-1 h-8 w-8 text-white"
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
                <div className="bg-white p-6">
                  <h4 className="font-proxima font-bold text-gray-900">{item.title}</h4>
                  <p className="mt-2 font-proxima text-sm text-gray-500">by {item.student}</p>
                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block font-proxima font-bold text-brand-red hover:underline"
                    >
                      Watch on YouTube →
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
