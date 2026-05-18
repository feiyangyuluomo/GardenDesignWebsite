import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FadeInSection, arrowRightIcon } from '@/components'

export const metadata: Metadata = {
  title: '关于设计师',
  description: '水石景观创始人兼主理设计师，专注于私家庭院与高端住宅花园设计。相信好的花园设计源于对生活的理解和对自然的尊重。',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-0 md:pt-40 bg-cream overflow-hidden">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-sage-light/20">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="设计师工作照"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <div className="py-12 lg:py-0">
                <span className="text-xs uppercase tracking-widest text-sage mb-4 block">关于水石景观</span>
                <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
                  让花园回到日常生活
                </h1>
                <div className="space-y-4 text-stone leading-relaxed">
                  <p>
                    水石景观是我在2018年创立的花园设计工作室，专注于为私家庭院、高端住宅和精品民宿提供定制化的花园设计服务。
                  </p>
                  <p>
                    在此之前，我在一家大型景观设计公司工作了八年，参与过不少商业项目和市政工程。
                    但我越来越觉得，那些项目虽然规模大、看起来很光鲜，却很难真正服务于一个人的日常生活。
                  </p>
                  <p>
                    我希望做一个能够真正"落地"的设计师——和业主深入沟通，理解他们的生活方式、
                    家庭结构和真实需求，然后创造一个他们愿意每天都待下去的户外空间。
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-cream-warm">
        <div className="container-width">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInSection>
              <h2 className="font-serif text-3xl text-charcoal mb-8">设计理念</h2>
            </FadeInSection>

            <FadeInSection delay={100}>
              <div className="space-y-6 text-stone leading-relaxed">
                <p>
                  我们不只是设计一个好看的院子，而是帮你规划一个可停留、可生长、可长期使用的户外生活空间。
                </p>
                <p>
                  好的花园设计应该回答几个问题：谁会使用这个空间？在什么时间使用？用来做什么？
                  植物如何随着季节变化？几年后、十几年后，这个花园会变成什么样？
                </p>
                <p>
                  我不太追求"惊艳"的效果图，更在意这个花园在五年后、十年后是否依然好看、依然好用。
                  植物会生长，树木会长大，花园是有生命的。好的设计应该预见这些变化，
                  并且让花园在时间中变得越来越好，而不是越来越乱。
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="section-padding bg-cream">
        <div className="container-width">
          <FadeInSection>
            <h2 className="font-serif text-3xl text-charcoal mb-12 text-center">擅长领域</h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeInSection delay={0}>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-sage mb-6">空间类型</h3>
                <ul className="space-y-4">
                  {[
                    { name: '私家庭院', desc: '80-300㎡ 别墅和洋房花园' },
                    { name: '露台花园', desc: '城市高层住宅的户外空间' },
                    { name: '屋顶花园', desc: '复式和顶层住户的专属花园' },
                    { name: '精品民宿庭院', desc: '有调性的商业空间花园' },
                  ].map((item) => (
                    <li key={item.name} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-forest mt-1.5 shrink-0" />
                      <div>
                        <span className="text-charcoal font-medium">{item.name}</span>
                        <span className="text-stone text-sm ml-2">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={100}>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-sage mb-6">设计风格</h3>
                <ul className="space-y-4">
                  {[
                    { name: '自然野趣', desc: '模拟自然的生态花园' },
                    { name: '现代简约', desc: '干净利落的现代空间' },
                    { name: '东方庭院', desc: '禅意与诗意的结合' },
                    { name: '度假风格', desc: '休闲放松的热带风情' },
                  ].map((item) => (
                    <li key={item.name} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-forest mt-1.5 shrink-0" />
                      <div>
                        <span className="text-charcoal font-medium">{item.name}</span>
                        <span className="text-stone text-sm ml-2">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Working Style */}
      <section className="section-padding bg-cream-warm">
        <div className="container-width">
          <FadeInSection>
            <h2 className="font-serif text-3xl text-charcoal mb-12 text-center">工作方式</h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '深入沟通',
                desc: '在开始设计之前，我会花大量时间和您沟通，了解您的生活习惯、家庭成员、养宠物吗？喜欢喝茶还是咖啡？周末通常怎么度过？这些细节决定了花园应该是什么样子。',
              },
              {
                title: '现场为本',
                desc: '每个项目都会进行多次现场勘测，记录光照变化、排水方向、现有植被。设计不是坐在电脑前完成的，而是从场地中生长出来的。',
              },
              {
                title: '长期视角',
                desc: '我会考虑植物三年后、五年的生长状态，预测花园的演变。好的设计应该让花园越变越好，而不是越变越乱。',
              },
            ].map((item, index) => (
              <FadeInSection key={item.title} delay={index * 100}>
                <div className="bg-cream rounded-lg p-8 h-full">
                  <h3 className="font-serif text-xl text-charcoal mb-4">{item.title}</h3>
                  <p className="text-sm text-stone leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding bg-cream">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <h2 className="font-serif text-3xl text-charcoal mb-8 text-center">为什么选择水石景观</h2>
            </FadeInSection>

            <FadeInSection delay={100}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-forest text-cream-warm text-xs flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">专注私宅，更懂需求</h3>
                    <p className="text-sm text-stone">我们只做私家庭院和高端住宅项目，对这个细分领域有深入的理解和丰富的经验。我们知道业主真正关心的是什么。</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-forest text-cream-warm text-xs flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">设计师全程参与</h3>
                    <p className="text-sm text-stone">不会有"签单前是设计师，签单后是实习生"的情况。从沟通到落地，主创设计师会全程参与每个项目。</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-forest text-cream-warm text-xs flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">施工经验加持</h3>
                    <p className="text-sm text-stone">我们不只是画图，还深度参与施工配合。知道哪些设计容易落地，哪些节点需要特别注意。设计如果不能落地，就只是效果图。</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-forest text-cream-warm text-xs flex items-center justify-center shrink-0">4</span>
                  <div>
                    <h3 className="font-medium text-charcoal mb-1">长期服务意识</h3>
                    <p className="text-sm text-stone">花园是有生命的，交付不是结束。我们会提供植物养护建议，在您需要的时候继续提供咨询。</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-forest text-cream-warm">
        <div className="container-width text-center">
          <FadeInSection>
            <h2 className="font-serif text-3xl mb-6">期待与您交流</h2>
            <p className="text-cream-warm/80 max-w-xl mx-auto mb-8">
              如果您正在考虑花园设计，欢迎和我们聊聊。
              无论您最终是否选择我们，初步的沟通总是免费的。
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
