import type { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import { FadeInSection, wechatIcon, xiaohongshuIcon, videoIcon } from '@/components'
import { getSiteSettings } from '@/lib/sanity'

export const metadata: Metadata = {
  title: '联系我们',
  description: '开始您的花园设计之旅。填写需求表或添加微信与我们交流。所有咨询免费，期待与您一起探讨花园的可能性。',
}

export default async function ContactPage() {
  revalidateTag('contact')

  // Fetch site settings from Sanity
  let wechatId = 'xidi_garden'
  let wechatQrCodeUrl = ''
  let xiaohongshuLink = ''
  let videoLink = ''

  try {
    const settings = await getSiteSettings()
    if (settings) {
      wechatId = settings.wechatId || wechatId
      wechatQrCodeUrl = settings.wechatQrCodeUrl || ''
      xiaohongshuLink = settings.xiaohongshuLink || ''
      videoLink = settings.videoLink || ''
    }
  } catch (e) {
    // Use fallback values
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream">
        <div className="container-width text-center">
          <FadeInSection>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">联系我们</h1>
            <p className="text-stone max-w-2xl mx-auto">
              无论是想了解报价、还是有具体的设计需求，都欢迎联系我们。
              所有咨询免费，我们期待与您一起探讨花园的可能性。
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding bg-cream-warm">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Questionnaire CTA */}
            <FadeInSection>
              <div className="bg-forest text-cream-warm rounded-lg p-8 md:p-12 h-full flex flex-col">
                <h2 className="font-serif text-2xl md:text-3xl mb-4">填写花园设计需求</h2>
                <p className="text-cream-warm/80 mb-8 flex-1">
                  为了更高效地了解您的需求，我们准备了一份简短的需求表。
                  您可以详细描述您的场地情况、预算范围、设计期望等。
                  填写完成后，我们会尽快与您联系。
                </p>

                <div className="space-y-4">
                  <a
                    href="#"
                    className="btn-primary bg-cream-warm text-forest hover:bg-cream hover:text-forest-dark w-full text-center"
                  >
                    跳转到问卷星填写
                  </a>
                  <p className="text-xs text-cream-warm/60 text-center">
                    问卷星链接跳转 · 预计填写时间 3-5 分钟
                  </p>
                </div>
              </div>
            </FadeInSection>

            {/* WeChat */}
            <FadeInSection delay={100}>
              <div id="wechat" className="bg-cream rounded-lg p-8 md:p-12 h-full">
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">直接添加微信</h2>
                <p className="text-stone mb-8">
                  如果您更习惯微信沟通，可以直接扫描下方二维码添加我们的微信。
                  添加时请备注"花园设计 + 城市"，这样我们可以更快地了解您的项目情况。
                </p>

                <div className="flex flex-col items-center">
                  {/* QR Code */}
                  {wechatQrCodeUrl ? (
                    <div className="w-48 h-48 rounded-lg overflow-hidden mb-6">
                      <Image
                        src={wechatQrCodeUrl}
                        alt="微信二维码"
                        width={192}
                        height={192}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 bg-sage-light/20 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        {wechatIcon({ className: 'w-16 h-16 text-sage mx-auto mb-2' })}
                        <p className="text-xs text-stone">微信二维码</p>
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <p className="text-sm text-stone mb-1">或搜索微信号</p>
                    <p className="font-serif text-xl text-forest">{wechatId}</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="section-padding bg-cream">
        <div className="container-width">
          <FadeInSection>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10 text-center">咨询后会发生什么</h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: '初步回复',
                desc: '收到您的需求后，我们会在24小时内回复您。如果有不清楚的地方，可能会先和您电话沟通几句。',
              },
              {
                step: '02',
                title: '预约勘测',
                desc: '对于有明确设计意向的客户，我们会预约现场勘测。勘测免费，我们会实地了解场地情况。',
              },
              {
                step: '03',
                title: '方案沟通',
                desc: '根据勘测结果，我们会准备2-3个不同方向的概念方案与您沟通，讲解每个方案的特点和预算差异。',
              },
            ].map((item, index) => (
              <FadeInSection key={item.step} delay={index * 100}>
                <div className="text-center">
                  <span className="font-display text-4xl text-sage-light/80 mb-4 block">{item.step}</span>
                  <h3 className="font-serif text-lg text-charcoal mb-2">{item.title}</h3>
                  <p className="text-sm text-stone leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-16 bg-sage-light/20">
        <div className="container-width">
          <FadeInSection>
            <div className="text-center">
              <h2 className="font-serif text-2xl text-charcoal mb-6">关注我们的社交媒体</h2>
              <p className="text-stone mb-8 max-w-xl mx-auto">
                在小红书和视频号上，我们分享花园设计案例、植物养护知识和设计灵感。
                关注我们，了解更多花园设计的可能性。
              </p>

              <div className="flex items-center justify-center gap-4">
                {xiaohongshuLink && (
                  <a
                    href={xiaohongshuLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-cream rounded-lg text-charcoal hover:bg-forest hover:text-cream-warm transition-colors duration-300"
                  >
                    {xiaohongshuIcon({ className: 'w-5 h-5' })}
                    <span className="text-sm font-medium">小红书</span>
                  </a>
                )}
                {videoLink && (
                  <a
                    href={videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-cream rounded-lg text-charcoal hover:bg-forest hover:text-cream-warm transition-colors duration-300"
                  >
                    {videoIcon({ className: 'w-5 h-5' })}
                    <span className="text-sm font-medium">视频号</span>
                  </a>
                )}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-cream-warm">
        <div className="container-width">
          <FadeInSection>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10 text-center">常见问题</h2>
          </FadeInSection>

          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                q: '设计费用是怎么计算的？',
                a: '设计费用根据花园面积、设计深度和服务内容来确定。具体报价需要了解您的场地情况和需求后给出。我们会提供清晰的费用清单，不会有隐藏费用。',
              },
              {
                q: '施工也是你们来做吗？',
                a: '我们可以推荐长期合作的施工团队，也支持业主自行找施工方。如果由我们配合施工，可以更好地保证设计效果的落地。',
              },
              {
                q: '项目周期一般是多长？',
                a: '从初步沟通到方案确定，通常需要2-4周。施工周期根据花园规模，从1个月到3个月不等。',
              },
              {
                q: '不在本地可以合作吗？',
                a: '可以。对于异地项目，我们可以进行远程初步沟通和方案设计，施工阶段通过视频进行技术交底和指导。但为了确保效果，建议在关键节点（如植物定位）能够现场参与。',
              },
              {
                q: '施工完成后还提供服务吗？',
                a: '是的。我们会提供植物养护指南，并在交付后一段时间内持续解答您的养护问题。花园是有生命的，交付不是结束。',
              },
            ].map((item, index) => (
              <FadeInSection key={index} delay={index * 50}>
                <div className="border-b border-sage-light/30 pb-6 last:border-0">
                  <h3 className="font-medium text-charcoal mb-2">{item.q}</h3>
                  <p className="text-sm text-stone leading-relaxed">{item.a}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
