'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageItem {
  _key?: string
  url?: string
  alt?: string
  caption?: string
  asset?: {
    url?: string
  }
}

interface ImageGalleryProps {
  images: ImageItem[]
  title?: string
}

const PLACEHOLDER_SMALL = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
const PLACEHOLDER_LARGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90'

function getImageUrl(img: ImageItem): string {
  return img.url || img.asset?.url || PLACEHOLDER_SMALL
}

function getLargeImageUrl(img: ImageItem): string {
  return img.url || img.asset?.url || PLACEHOLDER_LARGE
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentIndex])

  if (!images || images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((image, index) => (
          <button
            key={image._key || index}
            onClick={() => openLightbox(index)}
            className="relative overflow-hidden rounded bg-sage-light/20 aspect-square group cursor-pointer"
          >
            <Image
              src={getImageUrl(image)}
              alt={image.alt || `${title} - 图片 ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 ease-gentle group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            className="absolute top-4 right-4 p-2 text-cream-warm/70 hover:text-cream-warm transition-colors duration-300 z-10 cursor-pointer"
            aria-label="关闭"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 p-2 text-cream-warm/70 hover:text-cream-warm transition-colors duration-300 z-10 cursor-pointer"
            aria-label="上一张"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getLargeImageUrl(images[currentIndex])}
              alt={images[currentIndex].alt || `${title} - 图片 ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh] w-auto h-auto"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 p-2 text-cream-warm/70 hover:text-cream-warm transition-colors duration-300 z-10 cursor-pointer"
            aria-label="下一张"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-warm/70 text-sm z-10">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}