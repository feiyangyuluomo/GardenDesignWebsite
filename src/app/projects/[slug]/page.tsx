import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import ProjectDetailClient from './ProjectDetailClient'
import { getProjectBySlug } from '@/lib/sanity'

// Mock data - replace with Sanity fetch in production
const mockProjects: Record<string, any> = {
  'vanke-garden': {
    title: '万科城私家庭院',
    city: '上海',
    area: '180㎡',
    budgetRange: '25-35万',
    spaceType: 'private_garden',
    styleTags: ['自然野趣', '现代简约'],
    shortDescription: '将原本荒废的后院改造成一个可停留、可生长的家庭户外生活空间。通过精心规划的动线、多层次的植物配置，以及舒适休闲平台的设置，让这个180平方米的庭院成为一家三口日常使用频率最高的区域。',
    designBackground: '这是一个1998年建成的住宅小区，业主购买的是二手别墅。原始庭院杂草丛生，硬质铺装老化严重，排水也有问题。但业主希望保留原有的一些大树，这些大树为庭院提供了良好的遮荫基础。',
    painPoints: '庭院呈L形，空间利用率低；原有大树位置固定限制了设计布局；业主希望庭院既有足够的休闲平台，又能保留足够的绿化面积；上海的气候夏季炎热，需要考虑遮荫和通风。',
    solution: '通过L形转角设计，将庭院分为两个功能区：入口侧的休闲平台区和中部的绿化观赏区。利用原有大树的遮荫条件，在树下设置了休憩卡座。地面采用防滑石英砖与自然石板的组合，既现代又有机。',
    plants: '保留了原有的榉树和香樟，新增日本枫、茶梅、绣球等耐阴植物。边界采用毛娟和佛甲草形成自然的软边界。',
    materials: '地面：600*600灰色石英砖+乱形青石板；围栏：黑色防腐木+钢构件；水景：黑色花岗岩整石开凿。',
    lighting: '嵌入式线性灯带勾勒平台边界；树下设置射灯打亮枝叶；台阶设置防眩光地灯。',
    beforeImages: [null, null],
    afterImages: [null, null],
    gallery: [null, null, null, null, null, null],
    clientFeedback: '现在每天早上我都会在院子里喝杯咖啡，周末孩子们也更喜欢在户外玩了。设计团队非常专业，考虑到了很多我们没有想到的细节。',
  },
  'longhu-villa': {
    title: '龙湖滟澜山别墅花园',
    city: '杭州',
    area: '320㎡',
    budgetRange: '50-60万',
    spaceType: 'villa_garden',
    styleTags: ['东方庭院', '度假风'],
    shortDescription: '以日式庭院为灵感，结合现代生活方式，打造禅意与实用性并存的花园空间。入口处以枯山水意象的砾石铺设搭配造型黑松，室内落地窗可直视整个庭院的水景区。',
    designBackground: '业主是一对年轻的夫妻，经常出差日本，非常喜欢日式庭院的禅意感觉。别墅本身是简欧风格，但业主希望庭院能有不同的气质。场地本身比较方正，但有一条消防通道从侧面穿过，需要处理。',
    painPoints: '消防通道限制了庭院的完整性和动线；业主希望庭院有日式禅意，但也要适合孩子玩耍；杭州夏季蚊虫较多，需要考虑户外空间的舒适度。',
    solution: '将消防通道以汀步石和砾石的方式处理，使其成为庭院动线的一部分。主空间以水景区为中心，搭配桥和平台。设置了一个半封闭的户外茶室，既能欣赏庭院，又防蚊虫。',
    plants: '黑松、罗汉松、红枫、绣球、玉龙草、苔藓等。水杉作为背景树，提供垂直线条和秋季色彩。',
    materials: '地面：深灰色花岗岩+白色砾石；水体：黑色防水衬垫+卵石收边；木平台：柚木实木地板。',
    lighting: '水景下方设置水下灯带，夜晚水面波光粼粼。庭院角落设置和纸灯笼，烘托禅意氛围。',
    beforeImages: [null, null],
    afterImages: [null, null],
    gallery: [null, null, null, null, null, null],
    clientFeedback: '庭院完成后，很多朋友来家里都会被这个空间打动。孩子们喜欢在水边玩耍，我们则喜欢在茶室发呆。',
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = mockProjects[slug]

  if (!project) {
    return {
      title: '案例未找到',
    }
  }

  return {
    title: project.title,
    description: project.shortDescription,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  let project = mockProjects[slug]

  try {
    const sanityProject = await getProjectBySlug(slug)
    if (sanityProject) {
      project = sanityProject
    }
  } catch (e) {
    // Use fallback data
  }

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
