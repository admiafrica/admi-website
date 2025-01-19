import { ActionIcon } from '@mantine/core';
import { IconMaximize, IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import React, { useState, useRef } from 'react';

type Props = {
  videoUrl: string;
};

const VideoPlayer = ({ videoUrl }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Pause video when mouse leaves if not playing
    const videoElement = videoRef.current;
    if (!isPlaying && videoElement) {
      videoElement.pause();
    }
  };

  const handleFullscreen = () => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoElement.requestFullscreen();
    }
  };

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
        <>
          {/* Play/Pause Button */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-full bg-none p-4">
            <ActionIcon onClick={handlePlayPause} className="rounded-full text-white" radius="xl" bg="none">
              {isPlaying ? <IconPlayerPause size={24} /> : <IconPlayerPlay size={24} />}
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
  );
};

export default VideoPlayer;
