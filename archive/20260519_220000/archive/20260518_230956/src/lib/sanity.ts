import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(sortOrder asc) {
    _id,
    title,
    slug,
    coverImage,
    city,
    area,
    budgetRange,
    spaceType,
    styleTags,
    shortDescription,
    featured,
    sortOrder
  }`)
}

export async function getFeaturedProjects() {
  return client.fetch(`*[_type == "project" && featured == true] | order(sortOrder asc)[0...3] {
    _id,
    title,
    slug,
    coverImage,
    city,
    area,
    spaceType,
    styleTags,
    shortDescription
  }`)
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug })
}

export async function getServices() {
  return client.fetch(`*[_type == "service" && visible == true] | order(sortOrder asc) {
    _id,
    title,
    subtitle,
    suitableFor,
    deliverables,
    priceRange,
    description,
    sortOrder
  }`)
}

export async function getArticles() {
  return client.fetch(`*[_type == "article"] | order(publishDate desc) {
    _id,
    title,
    slug,
    coverImage,
    category,
    summary,
    publishDate
  }`)
}
