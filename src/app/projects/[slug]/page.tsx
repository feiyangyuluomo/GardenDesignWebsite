import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import ProjectDetailClient from './ProjectDetailClient'
import { getProjectBySlug } from '@/lib/sanity'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const project = await getProjectBySlug(slug)
    if (project) {
      return {
        title: project.title,
        description: project.shortDescription,
      }
    }
  } catch (e) {
    // Fall through to notFound
  }

  return {
    title: '案例未找到',
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  revalidateTag('projects')
  revalidateTag('project-detail')

  const { slug } = await params

  let project = null

  try {
    project = await getProjectBySlug(slug)
  } catch (e) {
    // Sanity fetch failed, project stays null
  }

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}