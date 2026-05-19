import type { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import Link from 'next/link'
import Image from 'next/image'
import { FadeInSection, arrowRightIcon } from '@/components'
import { getServices } from '@/lib/sanity'

export const metadata: Metadata = {
  title: '服务与报价',
  description: '水石景观提供从初步咨询到施工落地的全程花园设计服务。根据您的场地面积、空间类型和设计深度，提供定制化的报价方案。',
}

// Mock data - replace with Sanity fetch in production
const mockServices = [
  {
    _id: '1',
    title: '初步咨询',
    subtitle: '了解需求与场地',
    suitableFor: '尚未确定设计方向，需要专业建议的业主',
    deliverables: ['现场初步勘测', '需求沟通记录', '初步概念方向建议', '项目预算参考'],
    priceRange: '免费',
    description: '在正式设计之前，我们希望通过一次深入的沟通，了解您的生活方式、花园使用需求、审美偏好，以及对项目的预算预期。同时进行现场勘测，记录场地尺寸、光照条件、现有植被、排水情况等基础数据。基于这些信息，我们可以为您提供初步的概念方向建议和项目预算参考。',
    sortOrder: 1,
  },
  {
    _id: '2',
    title: '平面方案设计',
    subtitle: '空间规划与风格定位',
    suitableFor: '需要确定花园整体布局和设计方向的业主',
    deliverables: ['场地分析报告', '平面功能布局图', '风格定位方案', '初步预算规划', '2-3轮方案修改'],
    priceRange: '5000元起',
    description: '基于初步咨询的信息，我们进行更深入的场地分析和功能规划。输出包含场地分析报告、平面功能布局图、风格定位方案和初步预算规划。这个阶段会进行2-3轮的方案沟通和修改，确保最终方案能够准确表达您的需求和期望。',
    sortOrder: 2,
  },
  {
    _id: '3',
    title: '深化设计',
    subtitle: '材料、植被与细节',
    suitableFor: '需要完整设计方案，准备施工的业主',
    deliverables: ['深化平面图', '竖向设计图', '植物配置方案', '硬质材料清单', '灯光设计图', '水景/小品详图', '施工节点大样', '植物苗木清单', '3D效果图'],
    priceRange: '按项目面积和复杂度计价',
    description: '深化设计阶段将平面方案落地为可执行的完整施工图纸。包括竖向设计确定地形变化、植物配置详细方案、硬质材料的具体选择和清单、灯光照明的点位和选型、水景等小品的详细做法。同时提供3D效果图，帮助您直观看到设计完成后的效果。',
    sortOrder: 3,
  },
  {
    _id: '4',
    title: '花园全案设计',
    subtitle: '从概念到落地的一站式服务',
    suitableFor: '希望全程专业把控，无需自己操心的业主',
    deliverables: ['初步咨询', '平面方案设计', '深化设计', '施工图绘制', '施工全程配合', '材料采购指导', '植物现场定位', '施工验收'],
    priceRange: '项目制报价',
    description: '全案设计服务覆盖从最初的概念沟通到最终的施工验收。我们的设计师会全程参与，确保设计意图的完整执行。包括施工图纸的绘制、施工阶段的技术交底和答疑、材料采购的专业建议、现场植物定位指导，以及施工过程中的定期巡场和验收。真正做到让业主省心省力。',
    sortOrder: 4,
  },
  {
    _id: '5',
    title: '施工落地配合',
    subtitle: '确保设计效果的实现',
    suitableFor: '已有设计方案，需要专业施工指导的业主',
    deliverables: ['施工图技术交底', '材料封样确认', '关键节点现场指导', '植物定位调整', '施工问题答疑', '阶段性验收'],
    priceRange: '按施工周期和次数计价',
    description: '如果您已经有完整的设计方案，我们可以提供施工阶段的配合服务。包括施工图的技术交底、关键节点和特殊工艺的现场指导、材料进场时的封样确认、苗木选择的现场指导，以及必要时的设计调整建议。按照施工周期和现场次数计费，灵活适应不同项目需求。',
    sortOrder: 5,
  },
  {
    _id: '6',
    title: '植物软装/花境优化',
    subtitle: '现有花园的植物提升',
    suitableFor: '已有花园基础，希望优化植物配置的客户',
    deliverables: ['现有植物诊断报告', '花境设计方案', '季节搭配方案', '养护指导建议'],
    priceRange: '3000元起',
    description: '针对已有花园基础但植物配置不理想的业主，我们提供针对性的优化服务。首先进行现有植物的诊断，评估保留价值。然后根据场地的光照、土壤等条件，提供新的花境设计方案，包括四季不同的开花植物搭配、观赏草的配置、以及必要的更换和补充建议。帮助您的花园从"能活"升级到"好看"。',
    sortOrder: 6,
  },
]

const pricingNotes = [
  { title: '面积与复杂度', desc: '花园面积越大、场地条件越复杂（如坡地、水系、大树保护等），设计工作量相应增加。' },
  { title: '设计深度', desc: '不同项目可能只需要部分设计阶段服务，也可选择全案设计。' },
  { title: '施工配合', desc: '需要施工配合的项目，还要考虑施工周期、距离等因素。' },
  { title: '异地项目', desc: '项目地点距离设计团队所在地较远时，可能需要额外的差旅费用。' },
]

export default async function ServicesPage() {
  let services = mockServices

  try {
    const sanityServices = await getServices()
    if (sanityServices && sanityServices.length > 0) {
      services = sanityServices
    }
  } catch (e) {
    // Use fallback data
  }

  revalidateTag('services')

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream">
        <div className="container-width text-center">
          <FadeInSection>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">服务与报价</h1>
            <p className="text-stone max-w-2xl mx-auto">
              我们相信好的设计源于充分的沟通和专业的能力。根据您的具体需求，
              我们提供灵活的服务组合，确保您获得真正需要的设计支持。
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-cream-warm">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <FadeInSection key={service._id} delay={index * 50}>
                <div className="bg-cream rounded-lg p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <span className="text-xs text-sage uppercase tracking-widest">{service.sortOrder < 10 ? `0${service.sortOrder}` : service.sortOrder}</span>
                    <h2 className="font-serif text-2xl text-charcoal mt-2">{service.title}</h2>
                    <p className="text-sm text-stone mt-1">{service.subtitle}</p>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-sage mb-2">适合对象</h3>
                      <p className="text-sm text-charcoal">{service.suitableFor}</p>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-sage mb-2">交付内容</h3>
                      <ul className="space-y-1">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="text-sm text-charcoal flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-forest mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm text-stone leading-relaxed">{service.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-sage-light/30">
                    <span className="font-serif text-lg text-forest">{service.priceRange}</span>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Notes */}
      <section className="section-padding bg-cream">
        <div className="container-width">
          <FadeInSection>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl text-charcoal text-center mb-8">关于报价</h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingNotes.map((note, index) => (
              <FadeInSection key={note.title} delay={index * 100}>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-sage-light/50 flex items-center justify-center shrink-0">
                    <span className="text-xs text-forest font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">{note.title}</h3>
                    <p className="text-sm text-stone">{note.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={400}>
            <div className="mt-12 text-center">
              <p className="text-stone max-w-2xl mx-auto mb-6">
                每个项目都是独特的，实际报价需要根据具体需求和场地条件确定。
                欢迎联系我们进行初步咨询，我们可以免费为您提供大致的预算参考。
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Not Suitable For */}
      <section className="py-16 bg-sage-light/20">
        <div className="container-width">
          <FadeInSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-2xl text-charcoal mb-6">我们可能不适合您的情况</h2>
              <p className="text-stone leading-relaxed">
                我们专注于私家庭院和高端住宅项目，不承接大面积商业景观、市政绿化、
                或者以低价为首要目标的批量装修项目。我们相信好的设计需要合理的价格支撑，
                也需要业主的信任和配合。如果您正在寻找"便宜又好看"的方案，我们可能不是最好的选择。
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-forest text-cream-warm">
        <div className="container-width text-center">
          <FadeInSection>
            <h2 className="font-serif text-3xl mb-6">准备好开始了？</h2>
            <p className="text-cream-warm/80 max-w-xl mx-auto mb-8">
              告诉我们您的花园情况和需求，我们可以为您提供初步的设计建议和预算参考。
            </p>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary bg-cream-warm text-forest hover:bg-cream hover:text-forest-dark">
                填写花园设计需求
              </Link>
              <Link href="/projects" className="btn-secondary border-cream-warm text-cream-warm hover:bg-cream-warm hover:text-forest">
                <span className="flex items-center gap-2">
                  浏览设计案例
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
