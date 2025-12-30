'use client'

import { useState } from 'react'
import { Button } from './ui'
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

  return (
    // Changed to absolute to overlay on the hero section
    <nav className="absolute top-8 left-0 right-0 z-50 flex justify-center px-4">
      {/* The floating pill bar: 747px wide as per mockup */}
      <div className="w-full max-w-[747px] h-[70px] bg-[#1A1A1A] rounded-full flex items-center justify-between px-8 shadow-2xl border border-white/5">
        
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            {logo ? (
              <Image 
                src={logo.url} 
                alt={logo.alt || 'Logo'} 
                width={32} 
                height={32}
                className="h-8 w-auto brightness-200"
              />
            ) : (
              <div className="w-8 h-8 flex flex-wrap gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
                ))}
              </div>
            )}
          </a>
        </div>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {menuItems.map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              href={getMenuItemUrl(item)}
              className="text-white/80 hover:text-white font-medium transition-colors text-sm"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button className="bg-white text-black h-11 px-6 rounded-full font-bold text-sm hover:bg-gray-100 transition-all">
            Sign In
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-[#1A1A1A] rounded-2xl p-6 shadow-2xl md:hidden border border-white/10">
          <div className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <a key={index} href={getMenuItemUrl(item)} className="text-white text-lg py-2 border-b border-white/5">
                {item.label}
              </a>
            ))}
            <button className="bg-white text-black w-full py-4 rounded-xl font-bold mt-4">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}