import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'
import { SpaceType } from '@/types'

// Mock data - replace with Sanity fetch in production
const mockProjects = [
  {
    _id: '1',
    title: '万科城私家庭院',
    slug: { current: 'vanke-garden' },
    coverImage: null,
    city: '上海',
    area: '180㎡',
    spaceType: 'private_garden' as SpaceType,
    styleTags: ['自然野趣', '现代简约'],
    shortDescription: '将原本荒废的后院改造成一个可停留、可生长的家庭户外生活空间。',
  },
  {
    _id: '2',
    title: '龙湖滟澜山别墅花园',
    slug: { current: 'longhu-villa' },
    coverImage: null,
    city: '杭州',
    area: '320㎡',
    spaceType: 'villa_garden' as SpaceType,
    styleTags: ['东方庭院', '度假风'],
    shortDescription: '以日式庭院为灵感，结合现代生活方式，打造禅意与实用性并存的花园空间。',
  },
  {
    _id: '3',
    title: '阳光城露台花园',
    slug: { current: 'yango-terrace' },
    coverImage: null,
    city: '成都',
    area: '85㎡',
    spaceType: 'terrace' as SpaceType,
    styleTags: ['度假风', '日式'],
    shortDescription: '利用高低差和分区设计，将狭长露台转化为多层次的休闲绿洲。',
  },
  {
    _id: '4',
    title: '绿城玫瑰园屋顶花园',
    slug: { current: 'greentown-roof' },
    coverImage: null,
    city: '苏州',
    area: '120㎡',
    spaceType: 'roof_garden' as SpaceType,
    styleTags: ['现代简约', '度假风'],
    shortDescription: '在钢筋水泥的城市中，打造一片可以仰望星空的私密天地。',
  },
  {
    _id: '5',
    title: '华润橡树湾阳台花园',
    slug: { current: 'cr-land阳台' },
    coverImage: null,
    city: '深圳',
    area: '35㎡',
    spaceType: 'balcony' as SpaceType,
    styleTags: ['日式', '自然野趣'],
    shortDescription: '小空间大文章，用植物和木质感营造温馨的都市绿洲。',
  },
  {
    _id: '6',
    title: '金地自在城花境设计',
    slug: { current: 'gemdale-flowerbed' },
    coverImage: null,
    city: '南京',
    area: '60㎡',
    spaceType: 'flower_bed' as SpaceType,
    styleTags: ['自然野趣', '英式'],
    shortDescription: '根据四季变化配置花境，让花园一年四季都有不同的风景。',
  },
  {
    _id: '7',
    title: '仁恒江湾城私家庭院',
    slug: { current: 'renheng-garden' },
    coverImage: null,
    city: '南京',
    area: '220㎡',
    spaceType: 'private_garden' as SpaceType,
    styleTags: ['现代简约', '东方庭院'],
    shortDescription: '以简洁的线条和考究的材质，打造现代东方气质的庭院空间。',
  },
  {
    _id: '8',
    title: '中海滨江壹号别墅花园',
    slug: { current: 'zhonghai-villa' },
    coverImage: null,
    city: '广州',
    area: '450㎡',
    spaceType: 'villa_garden' as SpaceType,
    styleTags: ['度假风', '英式'],
    shortDescription: '热带植物与休闲平台结合，营造度假酒店般的花园体验。',
  },
  {
    _id: '9',
    title: '世茂天誉露台花园',
    slug: { current: 'shimao-terrace' },
    coverImage: null,
    city: '武汉',
    area: '95㎡',
    spaceType: 'terrace' as SpaceType,
    styleTags: ['现代简约', '日式'],
    shortDescription: '极简设计语言，让露台成为高层住宅中的静谧之所。',
  },
]

export const metadata: Metadata = {
  title: '设计案例',
  description: '浏览水石景观的花园设计案例，包括私家庭院、别墅花园、露台花园、屋顶花园、阳台花园及花境设计。每一个案例都讲述着关于庭院与生活的故事。',
}

export default function ProjectsPage() {
  // In production: const projects = await getProjects()
  const projects = mockProjects

  return <ProjectsClient projects={projects} />
}
