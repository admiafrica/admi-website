import React, { useState, useEffect } from 'react'
import { IconPlayerPlay, IconEye, IconClock, IconUsers, IconTrendingUp, IconExternalLink } from '@tabler/icons-react'
import Link from 'next/link'
import Image from 'next/image'
import { VideoPlayer } from '@/components/shared/v3'
import { YouTubeVideo, getVideosForCourse, getYouTubeWatchUrl } from '@/utils/youtube-api'

interface CourseVideoSectionProps {
  course: any
  slug: string
  youtubeVideos?: YouTubeVideo[]
}

export function CourseVideoSection({ course, slug }: CourseVideoSectionProps) {
  const [activeTab, setActiveTab] = useState<string | null>('preview')
  const [relatedVideos, setRelatedVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const hasMainVideo = course?.courseVideo?.fields?.file?.url
  const hasRelatedVideos = relatedVideos.length > 0

  // Fetch YouTube videos from cached API for this specific course
  useEffect(() => {
    const fetchCourseVideos = async () => {
      try {
        setLoading(true)
        setError(null)

        // Use our cached API instead of direct YouTube API
        const response = await fetch('/api/admi-videos?limit=100')
        if (!response.ok) {
          throw new Error('Failed to fetch videos')
        }

        const data = await response.json()
        const allVideos = data.videos || []
        const courseRelated = getVideosForCourse(allVideos, slug)
        setRelatedVideos(courseRelated.slice(0, 6)) // Limit to 6 videos
      } catch (error) {
        console.error('Error fetching course videos:', error)
        setError('Failed to load related videos')
      } finally {
        setLoading(false)
      }
    }

    fetchCourseVideos()
  }, [slug])

  // Only hide the component if we're not loading and have no videos
  if (!hasMainVideo && !hasRelatedVideos && !loading) {
    return null
  }

  const videoStats = {
    views: '2.5K+',
    duration: '2:30',
    students: '150+',
    completion: '95%'
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">Course Videos & Preview</h2>

      {/* Tabs */}
      <div>
        <div className="mb-4 flex gap-2 border-b border-gray-200">
          {hasMainVideo && (
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`rounded-t-md px-4 py-2 ${activeTab === 'preview' ? 'border-b-2 border-gray-900 font-semibold' : 'text-gray-500'}`}
            >
              <span className="inline-flex items-center gap-1">
                <IconPlayerPlay size={16} /> Course Preview
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveTab('related')}
            className={`rounded-t-md px-4 py-2 ${activeTab === 'related' ? 'border-b-2 border-gray-900 font-semibold' : 'text-gray-500'}`}
          >
            <span className="inline-flex items-center gap-1">
              <IconEye size={16} /> Related Videos {loading ? '(Loading...)' : `(${relatedVideos.length})`}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`rounded-t-md px-4 py-2 ${activeTab === 'info' ? 'border-b-2 border-gray-900 font-semibold' : 'text-gray-500'}`}
          >
            <span className="inline-flex items-center gap-1">
              <IconTrendingUp size={16} /> Video Insights
            </span>
          </button>
        </div>

        {/* Main Course Preview Tab */}
        {activeTab === 'preview' && hasMainVideo && (
          <div className="flex flex-wrap">
            <div className="w-full md:w-8/12">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div>
                  <div className="relative aspect-video w-full">
                    <VideoPlayer videoUrl={course.courseVideo.fields.file.url} showControls={true} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-1 mt-4 flex flex-wrap justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{course.name} - Course Preview</h4>
                      <p className="text-sm text-gray-500">
                        Get an inside look at what you&apos;ll learn in this {course.awardLevel || 'course'}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
                      {course.awardLevel || 'Course'}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/watch/${slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition"
                    >
                      <IconPlayerPlay size={16} />
                      Watch Full Video
                    </Link>
                    <Link
                      href="/enquiry"
                      className="inline-flex items-center gap-2 rounded-lg border border-blue-400 bg-white px-4 py-2 font-medium text-blue-900 transition"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 w-full md:mt-0 md:w-4/12 md:pl-4">
              <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h4 className="mb-4 text-xl font-semibold text-gray-900">Video Stats</h4>

                <div className="mb-4 flex flex-wrap gap-2">
                  <IconEye size={20} color="#EF7B2E" />
                  <div>
                    <p className="font-medium text-gray-700">{videoStats.views}</p>
                    <p className="text-xs text-gray-500">Total Views</p>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <IconClock size={20} color="#EF7B2E" />
                  <div>
                    <p className="font-medium text-gray-700">{videoStats.duration}</p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <IconUsers size={20} color="#EF7B2E" />
                  <div>
                    <p className="font-medium text-gray-700">{videoStats.students}</p>
                    <p className="text-xs text-gray-500">Students Enrolled</p>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <IconTrendingUp size={20} color="#EF7B2E" />
                  <div>
                    <p className="font-medium text-gray-700">{videoStats.completion}</p>
                    <p className="text-xs text-gray-500">Completion Rate</p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-1 text-sm font-medium text-gray-700">What you&apos;ll see in this video:</p>
                  <p className="text-sm text-gray-500">
                    • Course curriculum overview
                    <br />
                    • Facilities and equipment tour
                    <br />
                    • Student projects showcase
                    <br />
                    • Career opportunities
                    <br />• Application process
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Videos Tab */}
        {activeTab === 'related' && (
          <div>
            {loading ? (
              <div className="py-8 text-center">
                <p className="text-gray-700">Loading related videos...</p>
              </div>
            ) : error ? (
              <div className="py-8 text-center">
                <p className="mb-4 text-red-600">{error}</p>
                <button
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-900 transition"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            ) : relatedVideos.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">No related videos found for this course.</p>
              </div>
            ) : (
              <div className="flex flex-wrap">
                {relatedVideos.map((video) => (
                  <div key={video.id} className="w-full p-2 sm:w-1/2 md:w-4/12">
                    <div
                      className="cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                      onClick={() => window.open(getYouTubeWatchUrl(video.id), '_blank')}
                    >
                      <div>
                        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                          <Image
                            src={video.thumbnail.medium || video.thumbnail.default}
                            alt={video.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100">
                            <div className="rounded-full bg-white bg-opacity-90 p-3">
                              <IconPlayerPlay size={24} color="#EF7B2E" />
                            </div>
                          </div>

                          {/* Duration Badge */}
                          <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                            {video.duration}
                          </div>

                          {/* YouTube Badge */}
                          <div className="absolute left-2 top-2">
                            <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                              YouTube
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <h5 className="mt-4 line-clamp-2 text-lg font-semibold text-gray-900">{video.title}</h5>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-500">{video.description}</p>

                        <div className="mt-4 flex flex-wrap justify-between">
                          <div className="flex flex-wrap gap-1">
                            <IconEye size={14} color="#666" />
                            <p className="text-xs text-gray-500">{video.viewCount}</p>
                          </div>
                          <button className="inline-flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1 text-xs font-medium text-red-900 transition">
                            <IconPlayerPlay size={12} />
                            Watch
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View More Videos CTA */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <a
                href="/media-archive/videos"
                className="inline-flex items-center gap-2 rounded-lg border border-red-400 bg-white px-4 py-2 font-medium text-red-900 transition"
              >
                <IconExternalLink size={16} />
                View All Videos
              </a>
              <a
                href="https://www.youtube.com/@ADMIafrica/"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition"
              >
                <IconExternalLink size={16} />
                Visit YouTube Channel
              </a>
            </div>
          </div>
        )}

        {/* Video Insights Tab */}
        {activeTab === 'info' && (
          <div className="flex flex-wrap">
            <div className="w-full p-2 md:w-1/2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h4 className="mb-4 text-xl font-semibold text-gray-900">Why Watch Our Course Videos?</h4>
                <p className="mb-4 text-gray-700">
                  Our course preview videos give you an authentic look into the ADMI experience. See real students
                  working with industry-standard equipment and learn from experienced instructors.
                </p>
                <p className="text-sm text-gray-500">
                  • Real classroom footage
                  <br />
                  • Student project showcases
                  <br />
                  • Industry-standard equipment demos
                  <br />• Career outcome testimonials
                </p>
              </div>
            </div>

            <div className="w-full p-2 md:w-1/2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h4 className="mb-4 text-xl font-semibold text-gray-900">Video Production Quality</h4>
                <p className="mb-4 text-gray-700">
                  All our videos are produced by our own Film & TV Production students and faculty, showcasing the
                  quality of education you&apos;ll receive.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-800">
                    4K Quality
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
                    Student Produced
                  </span>
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-800">
                    Industry Standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseVideoSection
