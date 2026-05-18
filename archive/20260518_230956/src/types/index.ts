export interface SiteSettings {
  siteName: string
  heroTitle: string
  heroSubtitle: string
  heroImage?: SanityImage
  heroVideo?: string
  wechatQrCode?: SanityImage
  wechatId: string
  phone: string
  questionnaireLink: string
  xiaohongshuLink: string
  videoLink: string
  seoTitle: string
  seoDescription: string
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  coverImage: SanityImage
  heroVideo?: string
  city: string
  area: string
  budgetRange: string
  spaceType: 'private_garden' | 'villa_garden' | 'terrace' | 'roof_garden' | 'balcony' | 'flower_bed'
  styleTags: string[]
  shortDescription: string
  designBackground: string
  painPoints: string
  solution: string
  plants: string
  materials: string
  lighting: string
  beforeImages: SanityImage[]
  afterImages: SanityImage[]
  gallery: SanityImage[]
  clientFeedback?: string
  featured: boolean
  sortOrder: number
}

export interface Service {
  _id: string
  title: string
  subtitle: string
  suitableFor: string
  deliverables: string[]
  priceRange: string
  description: string
  sortOrder: number
  visible: boolean
}

export interface Article {
  _id: string
  title: string
  slug: { current: string }
  coverImage: SanityImage
  category: string
  summary: string
  content: string
  publishDate: string
  seoTitle?: string
  seoDescription?: string
}

export type SpaceType = Project['spaceType']
export type SpaceTypeLabel = {
  value: SpaceType
  label: string
}

export const SPACE_TYPES: SpaceTypeLabel[] = [
  { value: 'private_garden', label: '私家庭院' },
  { value: 'villa_garden', label: '别墅花园' },
  { value: 'terrace', label: '露台花园' },
  { value: 'roof_garden', label: '屋顶花园' },
  { value: 'balcony', label: '阳台花园' },
  { value: 'flower_bed', label: '花境设计' },
]

export const STYLE_TAGS = [
  '自然野趣',
  '现代简约',
  '东方庭院',
  '度假风',
  '日式',
  '英式',
]
