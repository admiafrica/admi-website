'use client'

import { useState } from 'react'
import { MainLayout } from '@/layouts/v3/MainLayout'

export default function TestAudioPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  const testAudio = () => {
    const audio = new Audio(
      'https://d17qqznw1g499t.cloudfront.net/media-archive/audio/creative-minds-podcast-ai-design.mp3'
    )

    audio.addEventListener('canplay', () => {
      console.log('Audio can play')
      audio
        .play()
        .then(() => {
          console.log('Audio playing successfully')
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error('Play failed:', error)
        })
    })

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e)
      console.error('Audio error details:', audio.error)
    })

    audio.load()
  }

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-2xl px-4 py-20">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-semibold text-gray-900">Audio Test Page</h1>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Simple Audio Test</h3>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 font-medium text-white transition"
              onClick={testAudio}
            >
              Test Audio Playback
            </button>
            {isPlaying && <p>Audio is playing!</p>}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">Native HTML5 Audio</h3>
            <audio
              controls
              preload="metadata"
              src="https://d17qqznw1g499t.cloudfront.net/media-archive/audio/creative-minds-podcast-ai-design.mp3"
            >
              Your browser does not support the audio element.
            </audio>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-2xl font-semibold text-gray-900">WAV File Test</h3>
            <audio
              controls
              preload="metadata"
              src="https://d17qqznw1g499t.cloudfront.net/media-archive/audio/nairobi-nights-soundtrack.wav"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
