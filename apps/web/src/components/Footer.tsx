'use client'
import Container from '@/components/ui/Container'
import { Linkedin, Youtube } from 'lucide-react'
import { getMenuItemUrl } from '@/lib/utils/navigation'

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function Footer({ 
  footerMenus = [], 
  copyrightText = '© 2025 TryonAR Marketing Hub. All rights reserved.',
}: any) {
  return (
    <footer className="bg-[#020408] text-white pt-24 pb-0 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 relative z-10">
          
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full opacity-90" />
                ))}
              </div>
              <span className="text-2xl font-bold tracking-tight">TryOn AR</span>
            </div>
            
            <p className="text-gray-500 text-[13px] leading-relaxed mb-8 max-w-[280px]">
              {copyrightText}
            </p>

            <div className="flex items-center gap-3">
              <button className="bg-[#EEF2FF] text-[#020408] px-8 py-3 rounded-xl font-bold hover:bg-white transition-all text-sm">
                Contact
              </button>
              
              <div className="flex gap-2">
                <a href="#" className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-800 bg-[#0A0C12] hover:border-gray-600 transition-all text-gray-400">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-800 bg-[#0A0C12] hover:border-gray-600 transition-all text-gray-400">
                  <XIcon />
                </a>
                <a href="#" className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-800 bg-[#0A0C12] hover:border-gray-600 transition-all text-gray-400">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Fixed Menu Titles - Reduced tracking and size to prevent overlap */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {footerMenus.map((menu: any, index: number) => (
              <div key={index}>
                <p className="text-[13px] font-bold uppercase tracking-widest text-white mb-8">
                  {menu.title}
                </p>
                <ul className="space-y-4">
                  {menu.items.map((item: any, i: number) => (
                    <li key={i}>
                      <a href={getMenuItemUrl(item)} className="text-gray-400 hover:text-white text-[14px] transition-colors">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Full-Width Background Text - Break out of container */}
      <div className="mt-10 relative w-screen left-1/2 right-1/2 -mb-45 -ml-[50vw] -mr-[50vw] pointer-events-none select-none">
        <svg 
          viewBox="0 0 1400 320" 
          preserveAspectRatio="xMinYMin slice" 
          className="w-full h-auto opacity-25" // Increased opacity from 10 to 25
        >
          <text
            x="50%"
            y="85%"
            textAnchor="middle"
            className="text-[320px] font-black"
            style={{
              fill: 'none',
              stroke: 'white',
              strokeWidth: '1.5px', // Slightly thicker line for better visibility
              strokeDasharray: '12,6', // Larger dashes to make it pop
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textTransform: 'none'
            }}
          >
            TryonAR
          </text>
        </svg>
      </div>
    </footer>
  )
}