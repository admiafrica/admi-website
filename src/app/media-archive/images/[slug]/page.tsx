'use client'

import { IconDownload, IconCalendar, IconCamera, IconArrowLeft, IconAlertCircle } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'

interface AlbumImage {
  id: string
  title: string
  filename: string
  thumbnail: string
  fullSize: string
  downloadUrl: string
  size: number
  lastModified: string
}

interface Album {
  slug: string
  title: string
  description: string
  date: string
  category: string
  photographer: string
  images: AlbumImage[]
  imageCount: number
}

// Client component that handles params
function AlbumPageClient({ slug }: { slug: string }) {
  const [album, setAlbum] = useState<Album | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<AlbumImage | null>(null)
  const [modalOpened, setModalOpened] = useState(false)

  // Fetch album data from API
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/media-archive/albums/${slug}`)
        const data = await response.json()

        if (data.success && data.album) {
          setAlbum(data.album)
          setError(null)
        } else {
          setError(data.error || 'Album not found')
        }
      } catch (err) {
        console.error('Error fetching album:', err)
        setError('Failed to load album')
      } finally {
        setLoading(false)
      }
    }

    fetchAlbum()
  }, [slug])

  const openImageModal = (image: AlbumImage) => {
    setSelectedImage(image)
    setModalOpened(true)
  }

  const breadcrumbs = [
    { title: 'Media Archive', href: '/media-archive' },
    { title: 'Images', href: '/media-archive/images' },
    { title: album?.title || slug, href: '#' }
  ]

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-6xl px-4 py-20">
        <div className="flex flex-col gap-10">
          <div>
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-600">
              {breadcrumbs.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  <Link href={item.href} className="text-blue-700 hover:underline">
                    {item.title}
                  </Link>
                </span>
              ))}
            </nav>

            {loading && (
              <div className="flex flex-col items-center py-16">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
                <p className="mt-4 text-gray-500">Loading album...</p>
              </div>
            )}

            {error && (
              <div className="mb-5 rounded-lg border border-red-300 bg-red-50 p-4 text-red-900">
                <div className="mb-1 flex items-center gap-2 font-semibold">
                  <IconAlertCircle size={16} /> Unable to load album
                </div>
                {error}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/media-archive/images">
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 transition">
                      <IconArrowLeft size={16} />
                      Back to Image Gallery
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {album && !loading && !error && (
              <>
                <h1 className="mb-4 text-4xl font-bold text-gray-900" style={{ fontSize: 40 }}>
                  {album.title}
                </h1>

                <p className="mb-5 text-lg text-gray-500">{album.description}</p>

                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                    {album.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <IconCalendar size={16} />
                    <span className="text-sm text-gray-500">
                      {new Date(album.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconCamera size={16} />
                    <span className="text-sm text-gray-500">Photo by {album.photographer}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{album.imageCount} photos</span>
                </div>
              </>
            )}
          </div>

          {album && !loading && !error && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {album.images.map((image) => (
                <div
                  key={image.id}
                  className="rounded-xl border border-gray-200 bg-white shadow-sm"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openImageModal(image)}
                >
                  <div>
                    <img
                      className="h-auto w-full"
                      src={image.thumbnail}
                      alt={image.title}
                      style={{ height: 250, objectFit: 'cover' }}
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/400x300/E9ECEF/6C757D?text=Image+Not+Found'
                      }}
                    />
                  </div>

                  <p className="mt-4 line-clamp-2 px-4 pb-4 font-medium text-gray-700">{image.title}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link href="/media-archive/images">
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition">
                <IconArrowLeft size={16} />
                Back to Image Gallery
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpened && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setModalOpened(false)}
        >
          <div
            className="relative mx-4 w-full max-w-4xl rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedImage?.title}</h3>
              <button className="text-2xl text-gray-500 hover:text-gray-900" onClick={() => setModalOpened(false)}>
                &times;
              </button>
            </div>
            {selectedImage && (
              <div className="flex flex-col gap-4 p-4">
                <img src={selectedImage.fullSize} alt={selectedImage.title} className="w-full rounded-md" />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-gray-700">Album: {album?.title}</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                        {album?.category}
                      </span>
                      <span className="text-xs text-gray-500">Photo by {album?.photographer}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(album?.date || new Date()).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-900 transition">
                    <IconDownload size={16} />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  )
}

// Server component wrapper to handle params
type AlbumPageProps = {
  params: Promise<{ slug: string }>
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params
  return <AlbumPageClient slug={slug} />
}
