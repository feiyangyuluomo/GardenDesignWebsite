'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageItem {
  _type: 'image'
  asset: {
    _ref: string
  }
  alt?: string
}

interface ImageGalleryProps {
  images: ImageItem[]
  title?: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext])

  if (!images || images.length === 0) return null

  // Only garden/landscape related images
  const galleryImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', // garden pathway
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80', // villa garden
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', // greenhouse
    'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&q=80', // botanical
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', // house garden
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', // backyard
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80', // terrace
    'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=600&q=80', // courtyard
    'https://images.unsplash.com/photo-1583791030153-b5f7b1f4e9c2?w=600&q=80', // garden plants
  ]

  const lightboxImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90', // garden pathway
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=90', // villa garden
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=90', // greenhouse
    'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1200&q=90', // botanical
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90', // house garden
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90', // backyard
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=90', // terrace
    'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=1200&q=90', // courtyard
    'https://images.unsplash.com/photo-1583791030153-b5f7b1f4e9c2?w=1200&q=90', // garden plants
  ]

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative overflow-hidden rounded bg-sage-light/20 aspect-square group"
          >
            <Image
              src={galleryImages[index % galleryImages.length]}
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
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-cream-warm/70 hover:text-cream-warm transition-colors duration-300"
            aria-label="关闭"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 p-2 text-cream-warm/70 hover:text-cream-warm transition-colors duration-300"
            aria-label="上一张"
          >
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImages[currentIndex % lightboxImages.length]}
              alt={`${title} - 图片 ${currentIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh] w-auto h-auto"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 p-2 text-cream-warm/70 hover:text-cream-warm transition-colors duration-300"
            aria-label="下一张"
          >
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-warm/70 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
