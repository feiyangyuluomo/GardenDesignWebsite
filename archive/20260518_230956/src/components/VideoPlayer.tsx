'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

interface VideoPlayerProps {
  src?: string
  poster?: string
  title?: string
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (!src) return

    // On mobile, redirect to video URL instead of playing inline
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.open(src, '_blank')
      return
    }

    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  // Lazy load video when component is in view
  useEffect(() => {
    if (!src) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPlaying) {
          setIsLoaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => observer.disconnect()
  }, [src, isPlaying])

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
    <div className="relative overflow-hidden rounded bg-sage-light/20 aspect-video">
      <Image
        src={posterUrl}
        alt={title || '视频封面'}
        fill
        className={`object-cover transition-opacity duration-500 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
        sizes="(max-width: 1200px) 100vw, 1200px"
        priority={false}
      />

      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center group"
          aria-label="播放视频"
        >
          <div className="w-20 h-20 rounded-full bg-cream-warm/90 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
            <Play className="w-8 h-8 text-forest ml-1" fill="currentColor" />
          </div>
        </button>
      )}

      {isLoaded && (
        <video
          ref={videoRef}
          src={src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          controls={isPlaying}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  )
}
