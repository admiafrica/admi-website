'use client'

import { IconCalendar, IconCamera, IconPhoto, IconAlertCircle } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'

interface AlbumItem {
  id: string
  slug: string
  title: string
  description: string
  date: string
  category: string
  photographer: string
  event: string
  thumbnail: string
  imageCount: number
  isAlbum: boolean
}

const categories = [
  'All',
  'Graduation',
  'Workshops',
  'Open Day',
  'Classes',
  'Exhibition',
  'Facilities',
  'Awards',
  'Festival',
  'Event'
]

export default function ImagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [albums, setAlbums] = useState<AlbumItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch albums from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/media-archive/albums.json')
        const data = await response.json()

        if (data.success) {
          setAlbums(data.albums)
          setError(null)
        } else {
          setError(data.error || 'Failed to load albums')
        }
      } catch (err) {
        console.error('Error fetching albums:', err)
        setError('Failed to connect to media archive')
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

  // For now, we'll only show albums from S3. Individual images can be added later if needed
  const filteredItems = albums.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-6xl px-4 py-20">
        <div className="flex flex-col gap-10">
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Link href="/media-archive" className="text-blue-700 hover:underline">
              Media Archive
            </Link>
            <span>/</span>
            <span className="text-blue-700">Images</span>
          </nav>

          <div>
            <h1 className="mb-4 text-center text-4xl font-semibold text-gray-900" style={{ fontSize: 40 }}>
              Photo Gallery
            </h1>
            <p className="mx-auto max-w-xl text-center text-lg text-gray-500">
              Browse through our collection of photos from ADMI events and activities
            </p>
          </div>

          {!loading && !error && (
            <div className="mb-5 flex flex-wrap gap-4">
              <input
                className="h-11 flex-1 rounded-lg border border-gray-300 bg-[#f8fafc] px-3"
                placeholder="Search albums..."
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
              />
              <select
                className="h-11 w-[200px] rounded-lg border border-gray-300 bg-white px-3 text-gray-900"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
              <p className="mt-4 text-gray-500">Loading albums from media archive...</p>
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <IconAlertCircle size={16} /> Unable to load albums
              </div>
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredItems.map((album) => (
                <Link key={album.id} href={`/media-archive/images/${album.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="rounded-xl border border-gray-200 bg-white shadow-sm" style={{ cursor: 'pointer' }}>
                    <div>
                      <div style={{ position: 'relative' }}>
                        <img
                          className="h-auto w-full"
                          src={album.thumbnail}
                          alt={album.title}
                          style={{ height: 200, objectFit: 'cover' }}
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              'https://via.placeholder.com/400x300/E9ECEF/6C757D?text=No+Image'
                          }}
                        />
                        <span
                          className="inline-flex items-center rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                          style={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <IconPhoto size={12} className="mr-1" />
                          {album.imageCount} photos
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-1 px-4 pb-4">
                      <p className="line-clamp-2 font-medium text-gray-700">{album.title}</p>

                      <span className="inline-flex w-fit items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-800">
                        {album.category} Album
                      </span>

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-1">
                          <IconCalendar size={14} />
                          <span className="text-xs text-gray-500">
                            {new Date(album.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IconCamera size={14} />
                          <span className="text-xs text-gray-500">{album.photographer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && !error && filteredItems.length === 0 && (
            <p className="py-16 text-center text-gray-500">
              {albums.length === 0 ? 'No albums found in media archive' : 'No albums match your search criteria'}
            </p>
          )}

          <div className="mt-10 flex justify-center">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition">
              Load More Images
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
