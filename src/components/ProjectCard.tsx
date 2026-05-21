'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SPACE_TYPES } from '@/types'

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'

interface ProjectCardProps {
  project: {
    _id: string
    title: string
    slug: { current: string }
    coverImage?: any
    coverImageUrl?: string
    city?: string
    area?: string
    spaceType?: string
    styleTags?: string[]
    shortDescription?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const spaceTypeLabel = SPACE_TYPES.find(t => t.value === project.spaceType)?.label || project.spaceType || ''

  const imageSrc = project.coverImageUrl || PLACEHOLDER_IMAGE

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
          {project.city && <span className="text-xs text-stone shrink-0">{project.city}</span>}
        </div>

        <div className="flex items-center gap-3 text-xs text-stone">
          {project.area && <span>{project.area}</span>}
          {project.area && spaceTypeLabel && <span className="w-1 h-1 rounded-full bg-sage" />}
          {spaceTypeLabel && <span>{spaceTypeLabel}</span>}
        </div>

        {project.shortDescription && (
          <p className="text-sm text-stone leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        )}

        {project.styleTags && project.styleTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.styleTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-sage-light/50 text-forest rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}