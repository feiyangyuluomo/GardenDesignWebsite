'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/projects', label: '案例' },
  { href: '/services', label: '服务与报价' },
  { href: '/about', label: '关于设计师' },
  { href: '/contact', label: '联系我们' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cream-warm/95 bg-blur shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-width flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className={`font-serif text-xl md:text-2xl tracking-wide transition-colors duration-300 ${
              isScrolled ? 'text-forest' : 'text-cream-warm'
            }`}
          >
            水石景观
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition-colors duration-300 link-underline ${
                  isScrolled ? 'text-charcoal' : 'text-cream-warm'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary text-xs px-5 py-2.5">
              获取设计建议
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-forest' : 'text-cream-warm'
            }`}
            aria-label="打开菜单"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-cream-warm transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6">
            <span className="font-serif text-2xl text-forest">水石景观</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-forest"
              aria-label="关闭菜单"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 gap-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-serif text-3xl text-charcoal transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`btn-primary text-center mt-4 ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '250ms' }}
            >
              获取设计建议
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
