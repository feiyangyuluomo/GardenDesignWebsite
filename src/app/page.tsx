import { revalidateTag } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import { FadeInSection, VideoPlayer, ProjectCard, leafIcon, gardenIcon, terraceIcon, arrowRightIcon } from '@/components'
import { getSiteSettings, getFeaturedProjects } from '@/lib/sanity'

// Fallback data when Sanity is not configured
const fallbackProjects = [
  {
    _id: '1',
    title: '万科城私家庭院',
    slug: { current: 'vanke-garden' },
    coverImage: null,
    city: '上海',
    area: '180㎡',
    spaceType: 'private_garden' as const,
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
    spaceType: 'villa_garden' as const,
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
    spaceType: 'terrace' as const,
    styleTags: ['度假风', '日式'],
    shortDescription: '利用高低差和分区设计，将狭长露台转化为多层次的休闲绿洲。',
  },
]

const services = [
  {
    icon: gardenIcon,
    title: '私家庭院',
    description: '从庭院动线规划到植物配置，打造与居住空间无缝融合的户外生活场景。',
  },
  {
    icon: terraceIcon,
    title: '露台花园',
    description: '利用有限空间创造无限可能，让露台成为城市中的私密度假地。',
  },
  {
    icon: leafIcon,
    title: '花境设计',
    description: '根据季节变化和生长周期，配置长期美观且易于维护的植物组合。',
  },
]

// Fallback site settings
const fallbackSiteSettings = {
  heroTitle: '让庭院成为生活的一部分',
  heroSubtitle: '为私家庭院、露台与别墅花园，提供兼具美感、植物生长与生活方式的定制花园设计。',
  heroImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80',
}

export default async function HomePage() {
  // Fetch from Sanity with fallback to mock data
  let settings = fallbackSiteSettings
  let featuredProjects = fallbackProjects

  try {
    const [sanitySettings, sanityProjects] = await Promise.all([
      getSiteSettings().catch(() => null),
      getFeaturedProjects().catch(() => null),
    ])

    if (sanitySettings) {
      settings = {
        heroTitle: sanitySettings.heroTitle || fallbackSiteSettings.heroTitle,
        heroSubtitle: sanitySettings.heroSubtitle || fallbackSiteSettings.heroSubtitle,
        heroImage: sanitySettings.heroImageUrl || sanitySettings.heroImage?.asset?.url || fallbackSiteSettings.heroImage,
      }
    }

    if (sanityProjects && sanityProjects.length > 0) {
      featuredProjects = sanityProjects
    }
  } catch (e) {
    // Use fallback data
  }

  revalidateTag('home')

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={settings.heroImage}
            alt="精心设计的庭院空间"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-cream-warm px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight animate-fade-in-up">
            {settings.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-cream-warm/90 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            {settings.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-400">
            <Link href="/projects" className="btn-primary">
              查看设计案例
            </Link>
            <Link href="/contact" className="btn-secondary border-cream-warm text-cream-warm hover:bg-cream-warm hover:text-forest">
              获取初步建议
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cream-warm/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-cream-warm/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-cream">
        <div className="container-width">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-xs uppercase tracking-widest text-sage mb-3 block">精选案例</span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">设计作品</h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featuredProjects.map((project, index) => (
              <FadeInSection key={project._id} delay={index * 100}>
                <ProjectCard project={project} />
              </FadeInSection>
            ))}
          </div>

          <FadeInSection className="text-center mt-12">
            <Link href="/projects" className="btn-secondary inline-flex items-center gap-2">
              查看全部案例
              {arrowRightIcon({ className: 'w-4 h-4' })}
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-cream-warm">
        <div className="container-width">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-xs uppercase tracking-widest text-sage mb-3 block">服务范围</span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">我们可以帮您设计</h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FadeInSection key={service.title} delay={index * 100}>
                <div className="group p-8 bg-cream rounded-lg text-center hover:shadow-lg transition-shadow duration-500">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-light/50 flex items-center justify-center group-hover:bg-forest/10 transition-colors duration-300">
                    {service.icon({ className: 'w-8 h-8 text-forest' })}
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-3">{service.title}</h3>
                  <p className="text-sm text-stone leading-relaxed">{service.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80"
            alt="自然光影下的植物"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 container-width">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInSection>
              <span className="text-xs uppercase tracking-widest text-sage mb-4 block">设计理念</span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-8">
                我们相信，好的花园不只是被观看的景观，
                <br className="hidden md:block" />
                而是可以被使用、被陪伴、被时间慢慢养成的生活空间。
              </h2>
            </FadeInSection>

            <FadeInSection delay={200}>
              <p className="text-stone leading-relaxed mb-6">
                从动线规划到植物配置，从光影设计到材质选择，我们希望每一个花园都能真正融入居住者的日常生活。不是追求一时惊艳的效果图，而是经得起时间考验的长期陪伴。
              </p>
              <p className="text-stone leading-relaxed">
                无论是周末的下午茶、孩子的户外玩耍、还是一个人的静思时光——您的花园，应该为这些真实的生活片段而存在。
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-cream">
        <div className="container-width">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-xs uppercase tracking-widest text-sage mb-3 block">服务流程</span>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal">如何开始</h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: '初步沟通', desc: '了解您的需求、预算和场地情况' },
              { step: '02', title: '现场勘测', desc: '实地测量，收集光照、排水等数据' },
              { step: '03', title: '方案设计', desc: '平面布局、风格定位、植物配置' },
              { step: '04', title: '施工落地', desc: '全程把控，确保设计效果' },
            ].map((item, index) => (
              <FadeInSection key={item.step} delay={index * 100}>
                <div className="text-center">
                  <span className="font-display text-5xl text-sage-light/80 mb-4 block">{item.step}</span>
                  <h3 className="font-serif text-lg text-charcoal mb-2">{item.title}</h3>
                  <p className="text-sm text-stone">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding bg-cream-warm">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <FadeInSection>
              <VideoPlayer title="设计作品演示" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-forest text-cream-warm">
        <div className="container-width text-center">
          <FadeInSection>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              准备好开始您的花园设计了吗？
            </h2>
            <p className="text-cream-warm/80 max-w-xl mx-auto mb-10">
              告诉我们您的想法和需求，我们可以为您提供初步的设计建议。
              所有咨询免费，期待与您一起探讨花园的可能性。
            </p>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary bg-cream-warm text-forest hover:bg-cream hover:text-forest-dark">
                填写花园设计需求
              </Link>
              <Link href="/projects" className="btn-secondary border-cream-warm text-cream-warm hover:bg-cream-warm hover:text-forest">
                浏览更多案例
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  )
}