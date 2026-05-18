import Link from 'next/link'
import { wechatIcon, xiaohongshuIcon, videoIcon } from './Icons'

interface FooterProps {
  wechatId?: string
  wechatQrCode?: string
  xiaohongshuLink?: string
  videoLink?: string
  phone?: string
}

export default function Footer({
  wechatId,
  wechatQrCode,
  xiaohongshuLink,
  videoLink,
  phone,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-forest text-cream-warm">
      <div className="container-width section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl mb-4">水石景观</h3>
            <p className="text-sage-light text-sm leading-relaxed max-w-md">
              为私家庭院、露台与别墅花园，提供兼具美感、植物生长与生活方式的定制花园设计。让庭院不止于景观，而成为可停留、可生长、可被日常使用的生活空间。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-sage-light mb-6">导航</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: '首页' },
                { href: '/projects', label: '设计案例' },
                { href: '/services', label: '服务与报价' },
                { href: '/about', label: '关于设计师' },
                { href: '/contact', label: '联系我们' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-warm/80 hover:text-cream-warm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-sage-light mb-6">联系方式</h4>
            <ul className="space-y-3">
              {wechatId && (
                <li className="text-sm text-cream-warm/80">
                  <span className="text-sage-light">微信：</span>
                  {wechatId}
                </li>
              )}
              {phone && (
                <li className="text-sm text-cream-warm/80">
                  <span className="text-sage-light">电话：</span>
                  {phone}
                </li>
              )}
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {wechatQrCode && (
                <button className="p-2 rounded-full bg-cream-warm/10 hover:bg-cream-warm/20 transition-colors duration-300">
                  {wechatIcon({ className: 'w-5 h-5' })}
                </button>
              )}
              {xiaohongshuLink && (
                <a
                  href={xiaohongshuLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cream-warm/10 hover:bg-cream-warm/20 transition-colors duration-300"
                >
                  {xiaohongshuIcon({ className: 'w-5 h-5' })}
                </a>
              )}
              {videoLink && (
                <a
                  href={videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cream-warm/10 hover:bg-cream-warm/20 transition-colors duration-300"
                >
                  {videoIcon({ className: 'w-5 h-5' })}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-cream-warm/10">
          <p className="text-xs text-cream-warm/50 text-center">
            © {currentYear} 水石景观 Garden Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
