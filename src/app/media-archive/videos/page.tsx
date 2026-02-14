'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  IconSearch,
  IconPlayerPlay,
  IconExternalLink,
  IconEye,
  IconClock,
  IconCalendar,
  IconTag
} from '@tabler/icons-react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'

// Helper function to format large numbers
const formatLargeNumber = (num: string): string => {
  const number = parseInt(num)

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`
  }

  return number.toString()
}

interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: {
    default: string
    medium: string
    high: string
  }
  publishedAt: string
  duration: string
  viewCount: string
  channelTitle: string
  tags?: string[]
}

export default function VideoGallery() {
  // State for video data
  const [allVideosList, setAllVideosList] = useState<any[]>([])
  const [filteredVideos, setFilteredVideos] = useState<any[]>([])
  const [displayedVideos, setDisplayedVideos] = useState<YouTubeVideo[]>([])
  const [displayCount, setDisplayCount] = useState(12)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all')
  const [selectedCourse, setSelectedCourse] = useState<string | null>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [channelInfo, setChannelInfo] = useState<any>(null)

  // Video Modal State
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null)
  const [modalOpened, setModalOpened] = useState(false)

  // Tabs state for modal
  const [activeTab, setActiveTab] = useState<'description' | 'related'>('description')

  // Videos currently visible to user (for performance)
  const visibleVideos = displayedVideos.slice(0, displayCount)

  // Get related videos based on current video
  const getRelatedVideos = (currentVideo: YouTubeVideo): YouTubeVideo[] => {
    if (!currentVideo) return []

    const related = displayedVideos.filter((video) => {
      if (video.id === currentVideo.id) return false

      const commonTags =
        currentVideo.tags && video.tags
          ? currentVideo.tags.filter((tag: string) =>
              video.tags?.some((vTag: string) => vTag.toLowerCase().includes(tag.toLowerCase()))
            )
          : []

      const currentWords = currentVideo.title.toLowerCase().split(' ')
      const videoWords = video.title.toLowerCase().split(' ')
      const commonWords = currentWords.filter((word) => word.length > 3 && videoWords.includes(word))

      return commonTags.length > 0 || commonWords.length > 1
    })

    return related.slice(0, 6)
  }

  // Simple category filters
  const categories = [
    { value: 'all', label: 'All Videos' },
    { value: 'student-showcase', label: 'Student Showcase' },
    { value: 'facilities-tour', label: 'Facilities Tour' },
    { value: 'testimonials', label: 'Testimonials' },
    { value: 'course-tutorials', label: 'Tutorials' },
    { value: 'events', label: 'Events' }
  ]

  // Course filters
  const courses = [
    { value: 'all', label: 'All Courses' },
    { value: 'music-production', label: 'Music Production' },
    { value: 'film-tv', label: 'Film & TV Production' },
    { value: 'animation-vfx', label: 'Animation & VFX' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'photography', label: 'Photography' }
  ]

  // Load videos on component mount
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admi-videos')

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`)
        }

        const data = await response.json()

        if (data.videos && data.videos.length > 0) {
          setAllVideosList(data.videos)
          setFilteredVideos(data.videos)
          setDisplayedVideos(data.videos.slice(0, 12))
          setChannelInfo(data.channelInfo)
        } else {
          setError('No videos available at this time. Please check back later.')
        }
      } catch (err) {
        console.error('Error loading videos:', err)
        setError(
          'Videos are temporarily unavailable. The video service may be updating. Please try again later or visit our YouTube channel directly.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  // Filter ALL videos based on search, category, and course
  useEffect(() => {
    let filtered = allVideosList

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered
    }

    if (selectedCourse && selectedCourse !== 'all') {
      filtered = filtered
    }

    setFilteredVideos(filtered)
    setDisplayedVideos(filtered.slice(0, 12))
    setDisplayCount(12)
  }, [allVideosList, searchQuery, selectedCategory, selectedCourse])

  // Load more videos function
  const loadMoreVideos = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + 12, filteredVideos.length))
  }, [filteredVideos.length])

  // Infinite scroll for mobile
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (displayCount < filteredVideos.length && !loading) {
          loadMoreVideos()
        }
      }
    }

    if (window.innerWidth <= 768) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [displayCount, filteredVideos.length, loading, loadMoreVideos])

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video)
    setActiveTab('description')
    setModalOpened(true)
  }

  const closeModal = () => {
    setModalOpened(false)
    setSelectedVideo(null)
  }

  const refreshVideos = async () => {
    setLoading(true)
    try {
      window.location.reload()
    } catch (error) {
      console.error('Error refreshing videos:', error)
      setError('Failed to refresh videos. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/media-archive" className="text-blue-700 hover:underline">
            Media Archive
          </Link>
          <span>/</span>
          <span>Videos</span>
        </nav>

        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-semibold text-gray-900" style={{ fontSize: '2.125rem' }}>
            ADMI Video Gallery
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-gray-500">
            Discover the ADMI experience through our video collection featuring student work, facility tours, success
            stories, and insights into creative media education.
          </p>
        </div>

        {/* Stats and CTA */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xl font-bold text-red-600">
                    {channelInfo?.videoCount ? formatLargeNumber(channelInfo.videoCount) : `${allVideosList.length}+`}
                  </p>
                  <p className="text-sm text-gray-500">Videos</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-blue-600">
                    {channelInfo?.viewCount ? formatLargeNumber(channelInfo.viewCount) : '10M+'}
                  </p>
                  <p className="text-sm text-gray-500">Total Views</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-green-600">
                    {channelInfo?.subscriberCount ? formatLargeNumber(channelInfo.subscriberCount) : '4K+'}
                  </p>
                  <p className="text-sm text-gray-500">Subscribers</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.youtube.com/@ADMIafrica/"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-red-400 bg-white px-4 py-2 font-medium text-red-600 transition hover:bg-red-50"
              >
                <IconExternalLink size={16} /> Visit YouTube Channel
              </a>
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="relative" style={{ flex: 1, minWidth: 250 }}>
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <IconSearch size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search videos..."
                className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-gray-900"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
              />
            </div>
            <select
              className="h-11 w-[180px] rounded-lg border border-gray-300 bg-white px-3 text-gray-900"
              value={selectedCategory || 'all'}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              className="h-11 w-[180px] rounded-lg border border-gray-300 bg-white px-3 text-gray-900"
              value={selectedCourse || 'all'}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <option key={course.value} value={course.value}>
                  {course.label}
                </option>
              ))}
            </select>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-900 transition hover:bg-gray-200"
              onClick={refreshVideos}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4 flex flex-wrap items-center justify-between">
          <p className="text-gray-500">
            Showing {Math.min(displayCount, filteredVideos.length)} of {filteredVideos.length} videos
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory &&
              selectedCategory !== 'all' &&
              ` in ${categories.find((c) => c.value === selectedCategory)?.label}`}
          </p>
          {filteredVideos.length > displayCount && (
            <p className="text-sm text-blue-600">{filteredVideos.length - displayCount} more available</p>
          )}
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
              <p className="text-gray-700">Loading ADMI videos...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="mb-1 text-lg font-medium text-red-600">Failed to load videos</p>
              <p className="mb-4 text-gray-500">{error}</p>
              <button
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-900 transition hover:bg-gray-200"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="mb-1 text-lg font-medium text-gray-900">No videos found</p>
              <p className="mb-4 text-gray-500">Try adjusting your search terms or category filter</p>
              <button
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-900 transition hover:bg-gray-200"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap">
              {visibleVideos.map((video) => (
                <div key={video.id} className="w-full p-2 sm:w-1/2 md:w-4/12">
                  <div
                    className="h-full cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div>
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                        <Image
                          src={video.thumbnail.medium || video.thumbnail.default}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100">
                          <div className="rounded-full bg-white bg-opacity-90 p-4">
                            <IconPlayerPlay size={32} style={{ color: '#EF7B2E' }} />
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                          {video.duration}
                        </div>

                        {/* YouTube Badge */}
                        <div className="absolute left-2 top-2">
                          <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                            YouTube
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-full flex-col">
                      <h5
                        className="mt-4 flex-grow font-semibold text-gray-900"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {video.title}
                      </h5>

                      <p
                        className="mt-1 flex-grow text-sm text-gray-500"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {video.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1">
                            <IconEye size={14} style={{ color: '#666' }} />
                            <p className="text-xs text-gray-500">{video.viewCount}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <IconClock size={14} style={{ color: '#666' }} />
                            <p className="text-xs text-gray-500">{video.duration}</p>
                          </div>
                        </div>

                        <button className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100">
                          <IconPlayerPlay size={12} /> Watch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredVideos.length > displayCount && (
              <div className="mt-8 flex items-center justify-center">
                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-50"
                  onClick={loadMoreVideos}
                >
                  <IconPlayerPlay size={16} /> Load More Videos ({filteredVideos.length - displayCount} remaining)
                </button>
              </div>
            )}

            {/* SEO: Hidden video list for search engines */}
            <div style={{ display: 'none' }} className="seo-video-catalog">
              <h2>Complete ADMI Video Catalog</h2>
              {allVideosList.map((video) => (
                <div key={`seo-${video.id}`} className="seo-video-item">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <span>Duration: {video.duration}</span>
                  <span>Views: {video.viewCount}</span>
                  <span>Channel: {video.channelTitle}</span>
                  <span>
                    Published:{' '}
                    {new Date(video.publishedAt).toLocaleDateString('en-KE', {
                      timeZone: 'Africa/Nairobi',
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </span>
                  {video.tags && video.tags.length > 0 && <span>Tags: {video.tags.join(', ')}</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Call to Action */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-red-50 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Ready to Create Your Own Content?</h3>
              <p className="mt-1 text-gray-500">
                Join ADMI and learn to create professional videos, animations, and digital content
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-400 bg-white px-4 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
              >
                View Courses
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
              >
                Apply Today
              </Link>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {modalOpened && selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeModal}>
            <div
              className="relative mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player */}
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  style={{ border: 'none', width: '100%', height: '100%' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Details */}
              <div className="p-6">
                <h3 className="mb-2 font-semibold text-gray-900">{selectedVideo.title}</h3>

                <div className="mb-4 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-1">
                    <IconEye size={16} style={{ color: '#666' }} />
                    <p className="text-sm text-gray-500">{selectedVideo.viewCount} views</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconClock size={16} style={{ color: '#666' }} />
                    <p className="text-sm text-gray-500">{selectedVideo.duration}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconCalendar size={16} style={{ color: '#666' }} />
                    <p className="text-sm text-gray-500">
                      {new Date(selectedVideo.publishedAt).toLocaleDateString('en-KE', {
                        timeZone: 'Africa/Nairobi',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div>
                  <div className="flex border-b border-gray-200">
                    <button
                      className={`px-4 py-2 text-sm font-medium transition ${
                        activeTab === 'description'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('description')}
                    >
                      Description
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium transition ${
                        activeTab === 'related'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab('related')}
                    >
                      Related Videos
                    </button>
                  </div>

                  {activeTab === 'description' && (
                    <div className="overflow-y-auto pt-4" style={{ maxHeight: 200 }}>
                      <p className="text-sm text-gray-700" style={{ whiteSpace: 'pre-wrap' }}>
                        {selectedVideo.description}
                      </p>

                      {selectedVideo.tags && selectedVideo.tags.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center gap-2">
                            <IconTag size={14} />
                            <p className="text-xs font-medium text-gray-700">Tags:</p>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            {selectedVideo.tags.slice(0, 10).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'related' && (
                    <div className="overflow-y-auto pt-4" style={{ maxHeight: 300 }}>
                      <div className="flex flex-col gap-3">
                        {getRelatedVideos(selectedVideo).map((relatedVideo) => (
                          <div
                            key={relatedVideo.id}
                            className="cursor-pointer rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                            onClick={() => {
                              setSelectedVideo(relatedVideo)
                              setActiveTab('description')
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <Image
                                src={relatedVideo.thumbnail.medium}
                                alt={relatedVideo.title}
                                width={80}
                                height={60}
                                style={{ objectFit: 'cover', borderRadius: 4 }}
                              />
                              <div style={{ flex: 1 }}>
                                <p
                                  className="text-sm font-medium text-gray-700"
                                  style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                  }}
                                >
                                  {relatedVideo.title}
                                </p>
                                <div className="mt-1 flex items-center gap-2">
                                  <p className="text-xs text-gray-500">{relatedVideo.viewCount} views</p>
                                  <p className="text-xs text-gray-500">&bull;</p>
                                  <p className="text-xs text-gray-500">{relatedVideo.duration}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <hr className="my-4 border-gray-200" />

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-900 transition hover:bg-gray-200"
                  >
                    <IconExternalLink size={16} /> Watch on YouTube
                  </a>
                  <button
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition hover:bg-gray-50"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
