'use client'

import {
  IconSearch,
  IconPlayerPlay,
  IconPlayerPause,
  IconCalendar,
  IconMicrophone,
  IconHeadphones,
  IconAlertCircle,
  IconFileMusic
} from '@tabler/icons-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/layouts/v3/MainLayout'

interface AudioItem {
  id: string
  title: string
  description: string
  filename: string
  audioUrl: string
  duration: string
  date: string
  category: string
  speaker: string
  student?: string
  course?: string
  genre?: string
  plays: number
  size: number
  format: string
  lastModified: string
}

const categories = [
  'All',
  'Podcast',
  'Interview',
  'Tech Talk',
  'Radio Show',
  'Masterclass',
  'Speech',
  'Music',
  'Soundtrack',
  'Student Work',
  'Portfolio',
  'Composition',
  'Recording',
  'Audio'
]

export default function AudioPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [currentTime, setCurrentTime] = useState<Record<string, number>>({})
  const [audioItems, setAudioItems] = useState<AudioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})

  // Fetch audio data from API
  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/media-archive/audio.json')
        const data = await response.json()

        if (data.success) {
          setAudioItems(data.audio)
          setError(null)
        } else {
          setError(data.error || 'Failed to load audio content')
        }
      } catch (err) {
        console.error('Error fetching audio:', err)
        setError('Failed to connect to audio archive')
      } finally {
        setLoading(false)
      }
    }

    fetchAudio()
  }, [])

  const filteredAudio = audioItems.filter((audio) => {
    const matchesSearch =
      audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audio.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audio.speaker.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || audio.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const togglePlay = (audioItem: AudioItem) => {
    const audioId = audioItem.id

    // Pause all other audio
    Object.keys(audioRefs.current).forEach((id) => {
      if (id !== audioId && audioRefs.current[id]) {
        audioRefs.current[id].pause()
      }
    })

    if (playingId === audioId) {
      // Pause current audio
      if (audioRefs.current[audioId]) {
        audioRefs.current[audioId].pause()
      }
      setPlayingId(null)
    } else {
      // Play new audio
      if (!audioRefs.current[audioId]) {
        // Create new audio element with minimal setup
        const audio = new Audio()
        audio.preload = 'none' // Don't preload, let browser handle it
        audio.src = audioItem.audioUrl

        console.log('Setting up audio for:', {
          title: audioItem.title,
          url: audioItem.audioUrl,
          filename: audioItem.filename
        })
        audioRefs.current[audioId] = audio

        // Set up event listeners
        audio.addEventListener('timeupdate', () => {
          const progressPercent = (audio.currentTime / audio.duration) * 100
          setProgress((prev) => ({ ...prev, [audioId]: progressPercent }))
          setCurrentTime((prev) => ({ ...prev, [audioId]: audio.currentTime }))
        })

        audio.addEventListener('ended', () => {
          setPlayingId(null)
          setProgress((prev) => ({ ...prev, [audioId]: 0 }))
        })

        audio.addEventListener('error', (e) => {
          console.error('Audio playback error:', e)
          console.error('Audio URL:', audioItem.audioUrl)
          console.error('Audio readyState:', audio.readyState)
          console.error('Audio networkState:', audio.networkState)
          console.error('Audio error code:', (audio.error as any)?.code)
          console.error('Audio error message:', (audio.error as any)?.message)
          setPlayingId(null)
          setError('Unable to play audio file. Please try again later.')
        })

        audio.addEventListener('canplaythrough', () => {
          console.log('Audio can play through:', audioItem.audioUrl)
        })

        audio.addEventListener('loadstart', () => {
          console.log('Audio load started:', audioItem.audioUrl)
        })
      }

      // Try to play with error handling
      setPlayingId(audioId)
      audioRefs.current[audioId].play().catch((error) => {
        console.error('Play failed:', error)
        console.error('Play error details:', {
          name: error.name,
          message: error.message,
          code: (error as any).code
        })
        setError('Unable to play audio. Please try again.')
        setPlayingId(null)
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex flex-col gap-10">
          <div>
            <nav className="mb-5 flex items-center gap-2 text-sm text-gray-500">
              <Link href="/media-archive" className="text-blue-700 hover:underline">
                Media Archive
              </Link>
              <span>/</span>
              <span>Audio</span>
            </nav>

            <h1 className="mb-4 text-center text-[40px] font-bold text-gray-900">Audio Library</h1>
            <p className="mx-auto max-w-[600px] text-center text-lg text-gray-500">
              Listen to podcasts, interviews, and recordings from ADMI events
            </p>
          </div>

          {!loading && !error && (
            <div className="mb-5 flex flex-wrap items-center gap-4">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <IconSearch size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search audio..."
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
              <p className="mt-4 text-gray-500">Loading audio content...</p>
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-lg border border-red-300 bg-red-50 p-4 text-red-900">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <IconAlertCircle size={16} /> Unable to load audio content
              </div>
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="flex flex-col gap-4">
              {filteredAudio.map((audio) => (
                <div key={audio.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <button
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white"
                      onClick={() => togglePlay(audio)}
                    >
                      {playingId === audio.id ? <IconPlayerPause size={24} /> : <IconPlayerPlay size={24} />}
                    </button>

                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="mb-1 font-semibold text-gray-900">{audio.title}</h4>
                          <p className="mb-2 text-sm text-gray-500">{audio.description}</p>
                        </div>
                      </div>

                      {playingId === audio.id && (
                        <div className="flex flex-col gap-2">
                          <div className="h-1 w-full rounded-full bg-gray-200">
                            <div
                              className="h-1 rounded-full bg-blue-600"
                              style={{ width: `${progress[audio.id] || 0}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">{formatTime(currentTime[audio.id] || 0)}</p>
                            <p className="text-xs text-gray-500">{audio.duration}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
                          {audio.category}
                        </span>
                        {audio.genre && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-800">
                            {audio.genre}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          <IconMicrophone size={14} />
                          <p className="text-xs text-gray-500">
                            {audio.student ? `Student: ${audio.student}` : audio.speaker}
                          </p>
                        </div>
                        {audio.course && (
                          <div className="flex items-center gap-1">
                            <p className="text-xs font-medium text-gray-500">Course: {audio.course}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <IconCalendar size={14} />
                          <p className="text-xs text-gray-500">
                            {new Date(audio.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <IconHeadphones size={14} />
                          <p className="text-xs text-gray-500">{audio.plays} plays</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <IconFileMusic size={14} />
                          <p className="text-xs text-gray-500">{audio.format}</p>
                        </div>
                        {!playingId && <p className="text-xs font-medium text-gray-500">{audio.duration}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && filteredAudio.length === 0 && (
            <p className="py-16 text-center text-gray-500">
              {audioItems.length === 0
                ? 'No audio content found in media archive'
                : 'No audio matches your search criteria'}
            </p>
          )}

          <div className="mt-10 flex justify-center">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-400 bg-white px-4 py-2 font-medium text-gray-900 transition">
              Load More Audio
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
