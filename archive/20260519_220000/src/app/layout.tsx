import type { Metadata } from 'next'
import './globals.css'
import { Navigation, Footer } from '@/components'

export const metadata: Metadata = {
  title: {
    default: '水石景观 Garden Design | 私家庭院定制花园设计',
    template: '%s | 水石景观 Garden Design',
  },
  description: '为私家庭院、露台与别墅花园，提供兼具美感、植物生长与生活方式的定制花园设计。让庭院不止于景观，而成为可停留、可生长、可被日常使用的生活空间。',
  keywords: ['花园设计', '庭院设计', '私家庭院', '别墅花园', '露台花园', '屋顶花园', '花境设计'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '水石景观 Garden Design',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
