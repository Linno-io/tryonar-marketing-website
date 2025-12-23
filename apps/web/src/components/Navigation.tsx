'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui'
import Container from './ui/Container'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { MenuItem } from '@/lib/types/siteSettings'
import { getMenuItemUrl } from '@/lib/utils/navigation'

interface NavigationProps {
  logo?: {
    url: string
    alt?: string
  }
  menuItems?: MenuItem[]
  ctaLink?: string
}

export default function Navigation({ logo, menuItems = [], ctaLink = '#start-trial' }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/70 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-white/20' 
        : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              {logo ? (
                <Image 
                  src={logo.url} 
                  alt={logo.alt || 'Logo'} 
                  width={120} 
                  height={40}
                  className="h-8 lg:h-10 w-auto"
                />
              ) : (
                <span className="text-xl lg:text-2xl font-bold text-gray-900">TryOn AR</span>
              )}
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {menuItems.map((item, index) => (
              <a
                key={`${item.label}-${index}`}
                href={getMenuItemUrl(item)}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <Button variant="primary" size="md" href={ctaLink}>
              Start Free Trial <ArrowUpRight size={20} />
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className={`lg:hidden border-t transition-all duration-300 ${
          isScrolled 
            ? 'border-white/20 bg-white/70 backdrop-blur-xl' 
            : 'border-gray-100 bg-white'
        }`}>
          <Container>
            <div className="py-4 space-y-3">
              {menuItems.map((item, index) => (
                <a
                  key={`${item.label}-${index}`}
                  href={getMenuItemUrl(item)}
                  className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3">
                <Button variant="primary" size="md" href={ctaLink} className="w-full">
                  Start Free Trial <ArrowUpRight size={20} />
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </nav>
  )
}
