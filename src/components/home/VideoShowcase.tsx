import React from 'react'
import { IconPlayerPlay, IconEye, IconExternalLink } from '@tabler/icons-react'
import { YouTubeVideo, getYouTubeWatchUrl } from '@/utils/youtube-api'
import Image from 'next/image'

interface VideoShowcaseProps {
  videos: YouTubeVideo[]
  title?: string
  subtitle?: string
  maxVideos?: number
}

export function VideoShowcase({
  videos,
  title = 'Student Showcases & Success Stories',
  subtitle = 'See what our students are creating and achieving',
  maxVideos = 6
}: VideoShowcaseProps) {
  const displayVideos = videos.slice(0, maxVideos)

  if (displayVideos.length === 0) {
    return null
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-semibold text-gray-900">{title}</h2>
        <p className="mx-auto text-lg text-gray-500" style={{ maxWidth: 600 }}>
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {displayVideos.map((video) => (
          <div key={video.id} className="w-full sm:w-1/2 md:w-4/12">
            <div
              className="h-full cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              onClick={() => window.open(getYouTubeWatchUrl(video.id), '_blank')}
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <Image
                    src={video.thumbnail.high || video.thumbnail.medium || video.thumbnail.default}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <div className="rounded-full bg-white bg-opacity-95 p-4 shadow-lg">
                      <IconPlayerPlay size={32} color="#EF7B2E" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 rounded bg-black bg-opacity-80 px-2 py-1 text-sm font-medium text-white">
                    {video.duration}
                  </div>

                  {/* YouTube Badge */}
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      YouTube
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex h-full flex-col px-4 pb-4 pt-4">
                <h4
                  className="mb-2 flex-grow text-xl font-semibold text-gray-900"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {video.title}
                </h4>

                <p
                  className="mb-4 flex-grow text-sm text-gray-500"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {video.description}
                </p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1">
                    <IconEye size={16} color="#666" />
                    <p className="text-sm text-gray-500" style={{ fontWeight: 500 }}>
                      {video.viewCount} views
                    </p>
                  </div>

                  <button className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition">
                    <IconPlayerPlay size={16} />
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="/media-archive/videos"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition"
        >
          <IconExternalLink size={20} />
          View All Videos
        </a>
        <a
          href="https://www.youtube.com/@ADMIafrica/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition"
        >
          <IconExternalLink size={20} />
          Subscribe on YouTube
        </a>
      </div>

      {/* Stats Section */}
      <div
        className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        style={{ backgroundColor: '#f9fafb' }}
      >
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <p className="text-xl text-gray-700" style={{ fontWeight: 700, color: 'red' }}>
              50+
            </p>
            <p className="text-sm text-gray-500">Videos</p>
          </div>
          <div className="text-center">
            <p className="text-xl text-gray-700" style={{ fontWeight: 700, color: 'blue' }}>
              100K+
            </p>
            <p className="text-sm text-gray-500">Total Views</p>
          </div>
          <div className="text-center">
            <p className="text-xl text-gray-700" style={{ fontWeight: 700, color: 'green' }}>
              500+
            </p>
            <p className="text-sm text-gray-500">Subscribers</p>
          </div>
          <div className="text-center">
            <p className="text-xl text-gray-700" style={{ fontWeight: 700, color: 'orange' }}>
              Weekly
            </p>
            <p className="text-sm text-gray-500">New Content</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoShowcase
