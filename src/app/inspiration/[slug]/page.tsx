import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import Image from 'next/image'
import { FadeInSection, arrowRightIcon } from '@/components'
import { client } from '@/lib/sanity'
import Link from 'next/link'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

async function getArticleBySlug(slug: string) {
  return client.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      coverImage,
      "coverImageUrl": coverImage.asset->url,
      category,
      summary,
      content,
      publishDate
    }
  `, { slug }, { cache: 'no-store' })
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug).catch(() => null)

  if (!article) {
    return { title: '文章未找到' }
  }

  return {
    title: article.title,
    description: article.summary,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  revalidateTag('articles')

  const { slug } = await params
  const article = await getArticleBySlug(slug).catch(() => null)

  if (!article) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream">
        <div className="container-width">
          <FadeInSection>
            <Link href="/inspiration" className="inline-flex items-center gap-2 text-sm text-stone hover:text-forest mb-8">
              {arrowRightIcon({ className: 'w-4 h-4 rotate-180' })}
              返回灵感文章
            </Link>
            <span className="text-xs uppercase tracking-wider text-sage mb-3 block">{article.category}</span>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">{article.title}</h1>
            {article.publishDate && (
              <p className="text-sm text-stone/60">
                {new Date(article.publishDate).toLocaleDateString('zh-CN')}
              </p>
            )}
          </FadeInSection>
        </div>
      </section>

      {/* Cover Image */}
      {article.coverImageUrl && (
        <section className="relative aspect-[16/9] bg-sage-light/20">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </section>
      )}

      {/* Summary */}
      {article.summary && (
        <section className="py-12 bg-cream-warm">
          <div className="container-width">
            <FadeInSection>
              <p className="text-lg text-charcoal leading-relaxed max-w-3xl mx-auto">
                {article.summary}
              </p>
            </FadeInSection>
          </div>
        </section>
      )}

      {/* Content */}
      {article.content && article.content.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="container-width">
            <div className="max-w-3xl mx-auto prose prose-stone prose-lg">
              {article.content.map((block: any, i: number) => {
                if (block._type === 'block') {
                  const style = block.style || 'normal'
                  const text = block.children?.map((child: any) => child.text).join('') || ''

                  switch (style) {
                    case 'h2':
                      return <h2 key={i} className="font-serif text-2xl text-charcoal mt-12 mb-6">{text}</h2>
                    case 'h3':
                      return <h3 key={i} className="font-serif text-xl text-charcoal mt-8 mb-4">{text}</h3>
                    case 'blockquote':
                      return <blockquote key={i} className="border-l-4 border-sage pl-6 italic text-stone my-6">{text}</blockquote>
                    default:
                      return <p key={i} className="text-charcoal leading-relaxed mb-4">{text}</p>
                  }
                }
                if (block._type === 'image' && block.asset?.url) {
                  return (
                    <figure key={i} className="my-8">
                      <div className="relative aspect-[4/3] rounded overflow-hidden">
                        <Image
                          src={block.asset.url}
                          alt={block.alt || '文章图片'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                      {block.caption && <figcaption className="text-sm text-stone text-center mt-2">{block.caption}</figcaption>}
                    </figure>
                  )
                }
                return null
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-forest text-cream-warm">
        <div className="container-width text-center">
          <FadeInSection>
            <h2 className="font-serif text-3xl mb-6">喜欢这篇文章？</h2>
            <p className="text-cream-warm/80 max-w-xl mx-auto mb-8">
              如果您对花园设计感兴趣，欢迎联系我们了解更多。
            </p>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary bg-cream-warm text-forest hover:bg-cream hover:text-forest-dark">
                填写花园设计需求
              </Link>
              <Link href="/inspiration" className="btn-secondary border-cream-warm text-cream-warm hover:bg-cream-warm hover:text-forest">
                <span className="flex items-center gap-2">
                  浏览更多文章
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