'use client'

import { useState, useMemo } from 'react'
import { FadeInSection, ProjectCard, FilterChips } from '@/components'
import { SPACE_TYPES, STYLE_TAGS, type SpaceType } from '@/types'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  coverImage: any
  city: string
  area: string
  spaceType: SpaceType
  styleTags: string[]
  shortDescription: string
}

interface ProjectsClientProps {
  projects: Project[]
}

const spaceTypeOptions = SPACE_TYPES.map(t => ({ value: t.value, label: t.label }))
const styleTagOptions = STYLE_TAGS.map(t => ({ value: t, label: t }))

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selectedSpaceTypes, setSelectedSpaceTypes] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSpaceType = selectedSpaceTypes.length === 0 || selectedSpaceTypes.includes(project.spaceType)
      const matchesStyle = selectedStyles.length === 0 || project.styleTags.some(tag => selectedStyles.includes(tag))
      return matchesSpaceType && matchesStyle
    })
  }, [projects, selectedSpaceTypes, selectedStyles])

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream">
        <div className="container-width text-center">
          <FadeInSection>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">设计案例</h1>
            <p className="text-stone max-w-2xl mx-auto">
              每一个案例都是一段关于庭院与生活的故事。我们相信好的设计源于对居住者需求的深入理解，
              以及对场地潜力的充分挖掘。
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-cream-warm sticky top-16 md:top-20 z-30 border-b border-sage-light/30">
        <div className="container-width">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <FilterChips
              title="空间类型"
              options={spaceTypeOptions}
              selected={selectedSpaceTypes}
              onChange={setSelectedSpaceTypes}
            />
            <FilterChips
              title="设计风格"
              options={styleTagOptions}
              selected={selectedStyles}
              onChange={setSelectedStyles}
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-cream">
        <div className="container-width">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredProjects.map((project, index) => (
                <FadeInSection key={project._id} delay={index < 6 ? (index % 3) * 100 : 0}>
                  <ProjectCard project={project} />
                </FadeInSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-stone text-lg">暂无符合条件的案例</p>
              <p className="text-stone/60 text-sm mt-2">试试调整筛选条件</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
