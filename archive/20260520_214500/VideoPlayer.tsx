'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Play, Pause, X } from 'lucide-react'

interface VideoPlayerProps {
  src?: string
  poster?: string
  title?: string
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePlay = () => {
    if (!src) return
    setIsPlaying(true)
    videoRef.current?.play()
  }

  const handlePause = () => {
    setIsPlaying(false)
    videoRef.current?.pause()
  }

  const handleToggle = () => {
    if (isPlaying) {
      handlePause()
    } else {
      handlePlay()
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setShowControls(true)
  }

  const handleMouseMove = () => {
    setShowControls(true)
  }

  // Fallback poster image
  const posterUrl = poster || `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80`

  if (!src) {
    return (
      <div className="relative overflow-hidden rounded bg-sage-light/20 aspect-video">
        <Image
          src={posterUrl}
          alt={title || '视频封面'}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-cream-warm/80 flex items-center justify-center">
            <span className="text-stone text-xs">暂无视频</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded bg-charcoal aspect-video"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Poster Image - shown before playing */}
      {!isPlaying && (
        <Image
          src={posterUrl}
          alt={title || '视频封面'}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className={`absolute inset-0 w-full h-full object-cover ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        onEnded={handleEnded}
        onClick={handleToggle}
        playsInline
      />

      {/* Play Button Overlay - shown before playing */}
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-charcoal/30 group"
          aria-label="播放视频"
        >
          <div className="w-20 h-20 rounded-full bg-cream-warm/90 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
            <Play className="w-10 h-10 text-forest ml-1" fill="currentColor" />
          </div>
        </button>
      )}

      {/* Controls Overlay - shown when playing */}
      {isPlaying && showControls && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end">
          {/* Center Controls */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleToggle}
              className="w-16 h-16 rounded-full bg-cream-warm/90 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
              aria-label={isPlaying ? '暂停' : '播放'}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-forest" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8 text-forest ml-1" fill="currentColor" />
              )}
            </button>
          </div>

          {/* Bottom Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-4">
              <button
                onClick={handleToggle}
                className="text-cream-warm hover:text-white transition-colors"
                aria-label={isPlaying ? '暂停' : '播放'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" fill="currentColor" />
                ) : (
                  <Play className="w-6 h-6" fill="currentColor" />
                )}
              </button>

              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={videoRef.current?.duration || 100}
                  value={videoRef.current?.currentTime || 0}
                  onChange={(e) => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = Number(e.target.value)
                    }
                  }}
                  className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cream-warm"
                />
              </div>

              <span className="text-cream-warm text-xs font-mono">
                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoRef.current?.duration || 0)}
              </span>

              <button
                onClick={() => {
                  setIsPlaying(false)
                  if (videoRef.current) {
                    videoRef.current.pause()
                  }
                }}
                className="text-cream-warm hover:text-white transition-colors ml-2"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Title Overlay */}
      {title && !isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-cream-warm text-sm">{title}</p>
        </div>
      )}
    </div>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}