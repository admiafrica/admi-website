import React, { useRef } from 'react'
import Link from 'next/link'
import { Carousel } from '@/lib/tw-mantine-carousel'
import { IconPlayerPlay, IconExternalLink, IconEye } from '@tabler/icons-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

interface RelatedVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views?: string
  url: string
  type: 'youtube' | 'internal' | 'vimeo'
  category?: string
}

interface RelatedVideosCarouselProps {
  videos: RelatedVideo[]
  title?: string
  courseCategory?: string
}

export function RelatedVideosCarousel({
  videos,
  title = 'Related Videos',
  courseCategory
}: RelatedVideosCarouselProps) {
  const autoplay = useRef(Autoplay({ delay: 4000 }))

  if (!videos || videos.length === 0) {
    return null
  }

  const handleVideoClick = (video: RelatedVideo) => {
    if (video.type === 'youtube') {
      // Open YouTube video in new tab
      window.open(video.url, '_blank')
    } else if (video.type === 'internal') {
      // Navigate to internal video page
      window.location.href = video.url
    } else {
      // Handle other video types
      window.open(video.url, '_blank')
    }
  }

  const getVideoTypeBadge = (type: string) => {
    switch (type) {
      case 'youtube':
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-800">
            YouTube
          </span>
        )
      case 'internal':
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
            ADMI
          </span>
        )
      case 'vimeo':
        return (
          <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-800">
            Vimeo
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
            Video
          </span>
        )
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
          {courseCategory && (
            <p className="mt-1 text-sm text-gray-500">Explore more {courseCategory} content and student showcases</p>
          )}
        </div>
        <a
          href="https://www.youtube.com/@ADMIafrica/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg border border-red-400 bg-white px-4 py-2 font-medium text-red-900 transition"
        >
          View All on YouTube
          <IconExternalLink size={16} />
        </a>
      </div>

      <Carousel
        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
        slideGap={{ base: 'xl', sm: 'md' }}
        align="start"
        slidesToScroll={1}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        loop
      >
        {videos.map((video) => (
          <Carousel.Slide key={video.id}>
            <div
              className="h-full cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
              onClick={() => handleVideoClick(video)}
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <div className="rounded-full bg-white bg-opacity-90 p-3">
                      <IconPlayerPlay size={24} color="#EF7B2E" />
                    </div>
                  </div>

                  {/* Video Type Badge */}
                  <div className="absolute left-2 top-2">{getVideoTypeBadge(video.type)}</div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex h-full flex-col p-4">
                <h5 className="mt-4 line-clamp-2 flex-grow text-lg font-semibold text-gray-900">{video.title}</h5>

                <p className="mt-1 line-clamp-3 flex-grow text-sm text-gray-500">{video.description}</p>

                <div className="mt-4 flex flex-wrap items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {video.views && (
                      <div className="flex flex-wrap gap-1">
                        <IconEye size={14} color="#666" />
                        <p className="text-xs text-gray-500">{video.views}</p>
                      </div>
                    )}
                    {video.category && (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
                        {video.category}
                      </span>
                    )}
                  </div>

                  <button className="inline-flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1 text-xs font-medium text-red-900 transition">
                    <IconPlayerPlay size={12} />
                    Watch
                  </button>
                </div>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Call to Action */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <h4 className="text-xl font-semibold text-gray-900">Want to create videos like these?</h4>
            <p className="mt-1 text-sm text-gray-500">
              Join our Film & TV Production program and learn from industry professionals
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/enquiry"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-400 bg-white px-4 py-2 font-medium text-blue-900 transition"
            >
              Learn More
            </Link>
            <Link
              href="/courses/film-and-television-production-diploma"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition"
            >
              View Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatedVideosCarousel
