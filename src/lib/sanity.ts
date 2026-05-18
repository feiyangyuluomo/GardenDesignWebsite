import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/types'

/**
 * Sanity Client Configuration
 *
 * To connect your Sanity project:
 * 1. Create a project at https://sanity.io/manage
 * 2. Copy the Project ID and Dataset name
 * 3. Create .env.local file with your credentials (see .env.local.example)
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// Site Settings (singleton)
export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      heroTitle,
      heroSubtitle,
      heroImage,
      heroVideo,
      wechatQrCode,
      wechatId,
      phone,
      questionnaireLink,
      xiaohongshuLink,
      videoLink,
      seoTitle,
      seoDescription
    }
  `)
}

// All Projects
export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(sortOrder asc) {
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
    }
  `)
}

// Featured Projects for homepage
export async function getFeaturedProjects() {
  return client.fetch(`
    *[_type == "project" && featured == true] | order(sortOrder asc)[0...3] {
      _id,
      title,
      slug,
      coverImage,
      city,
      area,
      spaceType,
      styleTags,
      shortDescription
    }
  `)
}

// Single Project by slug
export async function getProjectBySlug(slug: string) {
  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      coverImage,
      heroVideo,
      city,
      area,
      budgetRange,
      spaceType,
      styleTags,
      shortDescription,
      designBackground,
      painPoints,
      solution,
      plants,
      materials,
      lighting,
      beforeImages,
      afterImages,
      gallery,
      clientFeedback,
      featured,
      sortOrder
    }
  `, { slug })
}

// All Services
export async function getServices() {
  return client.fetch(`
    *[_type == "service" && visible == true] | order(sortOrder asc) {
      _id,
      title,
      subtitle,
      suitableFor,
      deliverables,
      priceRange,
      description,
      sortOrder
    }
  `)
}

// Articles / Inspiration
export async function getArticles() {
  return client.fetch(`
    *[_type == "article"] | order(publishDate desc) {
      _id,
      title,
      slug,
      coverImage,
      category,
      summary,
      publishDate
    }
  `)
}