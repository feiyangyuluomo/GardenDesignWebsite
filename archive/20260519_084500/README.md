# Version 2.0 - Sanity CMS Integration

**Archived**: 2026-05-19 00:04

## Files
~65 files including source code, Sanity schemas, and configs

## New Features
- Sanity CMS integration (@sanity/client, next-sanity, @sanity/image-url, @sanity/vision)
- Sanity Studio at /studio route
- Sanity Schema definitions:
  - siteSettings - Website configuration (hero, contact info, social links)
  - project - Design projects with full details
  - service - Service offerings with deliverables and pricing
  - article - Blog/inspiration articles
- GROQ queries in src/lib/sanity.ts
- Webhook API route at /api/revalidate for on-demand ISR
- .env.local.example with Sanity configuration template

## Changes from v1.0
- Pages now fetch data from Sanity with fallback to mock data
- revalidateTag() calls for ISR support
- Added getSiteSettings(), getProjects(), getFeaturedProjects(), getProjectBySlug(), getServices(), getArticles() functions

## Known Issues
- Sanity Studio v5 has React dependency conflict with Next.js 14
- Studio route needs to be removed or deployed separately

## Status
CMS integration complete but with React compatibility issue that needs resolution.