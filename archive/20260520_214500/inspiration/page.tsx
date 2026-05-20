import type { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'
import { FadeInSection } from '@/components'
import { getArticles } from '@/lib/sanity'

export const metadata: Metadata = {
  title: '灵感文章',
  description: '花园设计灵感、植物养护知识、设计手记。了解更多花园设计的可能性。',
}

export default async function InspirationPage() {
  revalidateTag('articles')

  let articles: any[] = []

  try {
    articles = await getArticles()
  } catch (e) {
    // Use empty array
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream">
        <div className="container-width text-center">
          <FadeInSection>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">灵感文章</h1>
            <p className="text-stone max-w-2xl mx-auto">
              关于花园设计、植物养护、设计思考的分享。
              希望这些内容能为您的花园梦想带来一些灵感。
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-cream-warm">
        <div className="container-width">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <FadeInSection key={article._id} delay={index * 100}>
                  <Link href={`/inspiration/${article.slug?.current || article._id}`} className="group block bg-cream rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-500">
                    {/* Cover Image */}
                    <div className="relative aspect-[4/3] bg-sage-light/20 overflow-hidden">
                      {article.coverImageUrl ? (
                        <Image
                          src={article.coverImageUrl}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-sage-light/30 rounded-full" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {article.category && (
                        <span className="text-xs uppercase tracking-wider text-sage mb-2 block">
                          {article.category}
                        </span>
                      )}
                      <h2 className="font-serif text-xl text-charcoal mb-2 group-hover:text-forest transition-colors duration-300">
                        {article.title}
                      </h2>
                      {article.summary && (
                        <p className="text-sm text-stone line-clamp-2 mb-3">
                          {article.summary}
                        </p>
                      )}
                      {article.publishDate && (
                        <p className="text-xs text-stone/60">
                          {new Date(article.publishDate).toLocaleDateString('zh-CN')}
                        </p>
                      )}
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          ) : (
            <FadeInSection>
              <div className="text-center py-16">
                <p className="text-stone">暂无文章</p>
              </div>
            </FadeInSection>
          )}
        </div>
      </section>
    </>
  )
}