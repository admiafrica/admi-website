import { ActionIcon } from '@mantine/core'
import { IconMaximize, IconPlayerPause, IconPlayerSkipForward } from '@tabler/icons-react'
import React, { useState, useRef } from 'react'

type Props = {
  videoUrl: string
}

const VideoPlayer = ({ videoUrl }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handlePlayPause = () => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    // Pause video when mouse leaves if not playing
    const videoElement = videoRef.current
    if (!isPlaying && videoElement) {
      videoElement.pause()
    }
  }

  const handleFullscreen = () => {
    const videoElement = videoRef.current

    if (!videoElement) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoElement.requestFullscreen()
    }
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
      <video
        ref={videoRef}
        src={`https:${videoUrl}`}
        className="w-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
      />

      {isHovering && (
        <div
          className="z-5 absolute inset-0"
          style={{
            background: 'radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 80%)'
          }}
        ></div>
      )}

      {isHovering && (
        <>
          {/* Play/Pause Button */}
          <div className="border-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full border-solid border-white bg-none p-4 shadow-lg">
            <ActionIcon onClick={handlePlayPause} className="my-auto rounded-full text-white" radius="xl" bg="none">
              {isPlaying ? <IconPlayerPause size={24} /> : <IconPlayerSkipForward size={24} />}
            </ActionIcon>
          </div>

          {/* Fullscreen Button */}
          <div
            className="absolute bottom-2 right-2 cursor-pointer rounded-md bg-none px-2 py-1 text-white"
            onClick={handleFullscreen}
          >
            <IconMaximize size={24} />
          </div>
        </>
      )}
    </div>
  )
}

export default VideoPlayer
