'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FadeInSection, VideoPlayer, ImageGallery } from '@/components'
import { SPACE_TYPES } from '@/types'
import { arrowRightIcon } from '@/components/Icons'

interface ProjectImage {
  _key?: string
  url?: string
  alt?: string
  caption?: string
}

interface ProjectDetailClientProps {
  project: {
    title: string
    city?: string
    area?: string
    budgetRange?: string
    spaceType?: string
    styleTags?: string[]
    shortDescription?: string
    designBackground?: string
    painPoints?: string
    solution?: string
    plants?: string
    materials?: string
    lighting?: string
    clientFeedback?: string
    heroVideo?: string
    coverImageUrl?: string
    beforeImages?: ProjectImage[]
    afterImages?: ProjectImage[]
    gallery?: ProjectImage[]
  }
}

// Fallback placeholder image
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80'

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const spaceTypeLabel = SPACE_TYPES.find(t => t.value === project.spaceType)?.label || project.spaceType || ''
  const styleTags = project.styleTags || []

  // Hero image: priority is coverImageUrl -> afterImages[0].url -> placeholder
  const heroImageUrl = project.coverImageUrl || project.afterImages?.[0]?.url || PLACEHOLDER_IMAGE

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl}
            alt={project.title}
            fill
            priority
            className={`object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            sizes="100vw"
          />
          {!isLoaded && <div className="absolute inset-0 bg-sage-light/30 animate-pulse" />}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container-width pb-12 text-cream-warm">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-cream-warm/80">
            {project.city && <span>{project.city}</span>}
            {project.city && project.area && <span className="w-1 h-1 rounded-full bg-cream-warm/50" />}
            {project.area && <span>{project.area}</span>}
            {project.spaceType && spaceTypeLabel && (
              <>
                {(project.city || project.area) && <span className="w-1 h-1 rounded-full bg-cream-warm/50" />}
                <span>{spaceTypeLabel}</span>
              </>
            )}
            {project.budgetRange && (
              <>
                <span className="w-1 h-1 rounded-full bg-cream-warm/50" />
                <span>{project.budgetRange}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Project Info */}
      {styleTags.length > 0 && (
        <section className="py-8 bg-cream-warm border-b border-sage-light/30">
          <div className="container-width">
            <div className="flex flex-wrap gap-3">
              {styleTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-sm bg-cream rounded-full text-forest"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Short Description */}
      {project.shortDescription && (
        <section className="py-12 md:py-16 bg-cream">
          <div className="container-width">
            <FadeInSection>
              <p className="text-lg text-charcoal leading-relaxed max-w-3xl">
                {project.shortDescription}
              </p>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Video */}
      {project.heroVideo && (
        <section className="py-8 bg-cream">
          <div className="container-width">
            <FadeInSection>
              <VideoPlayer
                src={project.heroVideo}
                title={`${project.title} - 项目视频`}
              />
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Design Story */}
      {(project.designBackground || project.painPoints || project.solution) && (
        <section className="section-padding bg-cream-warm">
          <div className="container-width">
            <FadeInSection>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10">设计故事</h2>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {project.designBackground && (
                <FadeInSection delay={0}>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-sage mb-3">项目背景</h3>
                    <p className="text-charcoal leading-relaxed">{project.designBackground}</p>
                  </div>
                </FadeInSection>
              )}

              {project.painPoints && (
                <FadeInSection delay={100}>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-sage mb-3">设计难点</h3>
                    <p className="text-charcoal leading-relaxed">{project.painPoints}</p>
                  </div>
                </FadeInSection>
              )}

              {project.solution && (
                <FadeInSection delay={200}>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-sage mb-3">解决方案</h3>
                    <p className="text-charcoal leading-relaxed">{project.solution}</p>
                  </div>
                </FadeInSection>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Before/After */}
      {project.beforeImages && project.beforeImages.length > 0 && project.afterImages && project.afterImages.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="container-width">
            <FadeInSection>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10">改造前后</h2>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeInSection delay={0}>
                <div>
                  <h3 className="text-sm text-stone mb-4">改造前</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.beforeImages.map((img, i) => (
                      <div key={img._key || i} className="relative aspect-square rounded overflow-hidden bg-sage-light/20">
                        {img.url ? (
                          <Image
                            src={img.url}
                            alt={img.alt || `改造前 ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-sage-light/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection delay={100}>
                <div>
                  <h3 className="text-sm text-stone mb-4">改造后</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.afterImages.map((img, i) => (
                      <div key={img._key || i} className="relative aspect-square rounded overflow-hidden bg-sage-light/20">
                        {img.url ? (
                          <Image
                            src={img.url}
                            alt={img.alt || `改造后 ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-sage-light/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="section-padding bg-cream-warm">
          <div className="container-width">
            <FadeInSection>
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10">项目图集</h2>
            </FadeInSection>

            <FadeInSection delay={100}>
              <ImageGallery images={project.gallery} title={project.title} />
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Details */}
      <section className="section-padding bg-cream">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.plants && (
              <FadeInSection delay={0}>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-sage mb-3">植物搭配</h3>
                  <p className="text-charcoal leading-relaxed text-sm">{project.plants}</p>
                </div>
              </FadeInSection>
            )}

            {project.materials && (
              <FadeInSection delay={100}>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-sage mb-3">材料与工艺</h3>
                  <p className="text-charcoal leading-relaxed text-sm">{project.materials}</p>
                </div>
              </FadeInSection>
            )}

            {project.lighting && (
              <FadeInSection delay={200}>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-sage mb-3">灯光与水景</h3>
                  <p className="text-charcoal leading-relaxed text-sm">{project.lighting}</p>
                </div>
              </FadeInSection>
            )}
          </div>
        </div>
      </section>

      {/* Client Feedback */}
      {project.clientFeedback && (
        <section className="py-16 bg-sage-light/20">
          <div className="container-width">
            <FadeInSection>
              <div className="max-w-2xl mx-auto text-center">
                <div className="text-4xl text-sage/40 mb-4">"</div>
                <p className="font-serif text-xl text-charcoal italic leading-relaxed">
                  {project.clientFeedback}
                </p>
                <p className="text-sm text-stone mt-4">— 业主反馈</p>
              </div>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-forest text-cream-warm">
        <div className="container-width text-center">
          <FadeInSection>
            <h2 className="font-serif text-3xl mb-6">想做类似的花园？</h2>
            <p className="text-cream-warm/80 max-w-xl mx-auto mb-8">
              告诉我们您的场地情况、预算和想法，我们可以为您提供初步的设计建议。
            </p>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary bg-cream-warm text-forest hover:bg-cream hover:text-forest-dark">
                填写花园设计需求
              </Link>
              <Link href="/contact#wechat" className="btn-secondary border-cream-warm text-cream-warm hover:bg-cream-warm hover:text-forest">
                <span className="flex items-center gap-2">
                  添加微信咨询
                  {arrowRightIcon({ className: 'w-4 h-4' })}
                </span>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}