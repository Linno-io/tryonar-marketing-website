'use client'
import Container from '@/components/ui/Container'
import { Text } from '@/components/ui'
import { Send, Facebook, Linkedin, Youtube } from 'lucide-react'
import Image from 'next/image'
import { FooterMenu, SocialLink } from '@/lib/types/siteSettings'
import { getMenuItemUrl } from '@/lib/utils/navigation'

interface FooterProps {
  logo?: {
    url: string
    alt?: string
  }
  footerMenus?: FooterMenu[]
  copyrightText?: string
  socialLinks?: SocialLink[]
}

export default function Footer({ 
  logo, 
  footerMenus = [], 
  copyrightText = 'Copyright © 2013 - 2024 TryOn AR',
  socialLinks = []
}: FooterProps) {
  return (
    <footer>
      {/* Reduced main section padding */}
      <div className="bg-[#f7f7ff] pt-16 pb-12 lg:pt-20 lg:pb-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Brand & Newsletter Column - Tightened verticality */}
            <div className="lg:col-span-4 max-w-sm">
              {/* Reduced logo margin from mb-8 to mb-5 */}
              {logo ? (
                <Image 
                  src={logo.url} 
                  alt={logo.alt || 'Logo'} 
                  width={120} 
                  height={40}
                  className="h-8 lg:h-10 w-auto mb-5"
                />
              ) : (
                <Text as="div" className="text-[26px] font-black text-[#1F2937] mb-5 leading-none">
                  TryOn AR
                </Text>
              )}
              
              {/* mb-[25px] specifically for the gap between text and form */}
              <Text className="text-gray-500 text-base leading-snug mb-[25px]">
                Get the latest AR trends, product updates, and success stories delivered to your inbox.
              </Text>
              
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 px-5 rounded-lg bg-white border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9F3AED]/20 transition-all text-sm"
                />
                <button 
                  className="absolute right-1 top-1 h-10 w-10 bg-[#9F3AED] hover:bg-[#8B2FD9] text-white rounded-md flex items-center justify-center transition-all"
                  aria-label="Subscribe"
                >
                  <Send size={16} fill="currentColor" />
                </button>
              </div>
              {/* Reduced margin from mt-4 to mt-3 */}
              <Text variant="small" className="mt-3 text-gray-400 text-xs">
                By subscribing Tryon AR you agree to <a href="#" className="text-[#9F3AED] hover:underline font-medium">Privacy Policy</a>
              </Text>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:pl-12">
              {footerMenus.map((menu, menuIndex) => (
                <div key={`${menu.title}-${menuIndex}`}>
                  <Text className="font-bold text-[#1F2937] mb-5 text-base leading-none">
                    {menu.title}
                  </Text>
                  <ul className="space-y-2.5">
                    {menu.items.map((link, linkIndex) => (
                      <li key={`${link.label}-${linkIndex}`}>
                        <a
                          href={getMenuItemUrl(link)}
                          className="text-sm font-medium text-gray-500 hover:text-[#9F3AED] hover:underline hover:underline-offset-4 transition-all"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Footer Bar - More compact */}
      <div className="bg-white py-5 border-t border-gray-100">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text variant="small" className="text-gray-500 font-medium">
              {copyrightText}
            </Text>
            
            <div className="flex items-center gap-5">
              {socialLinks.map((social, index) => {
                const getSocialIcon = (platform: string) => {
                  switch (platform) {
                    case 'Facebook':
                      return (
                        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                          <Facebook size={18} />
                        </a>
                      )
                    case 'Twitter':
                      return (
                        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:border-[#9F3AED] hover:text-[#9F3AED] transition-all">
                          <span className="font-bold text-xs">X</span>
                        </a>
                      )
                    case 'LinkedIn':
                      return (
                        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                          <Linkedin size={18} />
                        </a>
                      )
                    case 'YouTube':
                      return (
                        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors">
                          <Youtube size={20} />
                        </a>
                      )
                    default:
                      return null
                  }
                }
                return getSocialIcon(social.platform)
              })}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}