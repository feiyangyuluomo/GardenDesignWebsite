'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Project } from '@/types'
import { SPACE_TYPES } from '@/types'

interface ProjectCardProps {
  project: {
    _id: string
    title: string
    slug: { current: string }
    coverImage: any
    city: string
    area: string
    spaceType: string
    styleTags: string[]
    shortDescription: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const spaceTypeLabel = SPACE_TYPES.find(t => t.value === project.spaceType)?.label || project.spaceType

  // Only garden/landscape related images from Unsplash
  const gardenImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', // garden pathway with greenery
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80', // villa exterior with garden
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80', // greenhouse interior with plants
    'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80', // botanical garden
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', // residential house with garden
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', // backyard garden design
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', // outdoor terrace with plants
    'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=800&q=80', // courtyard garden
    'https://images.unsplash.com/photo-1583791030153-b5f7b1f4e9c2?w=800&q=80', // garden plants close up
  ]

  // Use title to generate consistent image index
  const titleHash = project.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const imageIndex = titleHash % gardenImages.length
  const imageSrc = gardenImages[imageIndex]

  return (
    <Link href={`/projects/${project.slug.current}`} className="group block">
      <div className="relative overflow-hidden rounded bg-sage-light/20 aspect-16-10">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-700 ease-gentle group-hover:scale-[1.02] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-sage-light/30 animate-pulse" />
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg text-charcoal group-hover:text-forest transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs text-stone shrink-0">{project.city}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-stone">
          <span>{project.area}</span>
          <span className="w-1 h-1 rounded-full bg-sage" />
          <span>{spaceTypeLabel}</span>
        </div>

        <p className="text-sm text-stone leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.styleTags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-sage-light/50 text-forest rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}