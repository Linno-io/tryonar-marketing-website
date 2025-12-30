'use client'
import Container from '@/components/ui/Container'
import { Button, Heading } from '@/components/ui'
import { ArrowUpRight, Play, Headphones, ShieldCheck } from 'lucide-react'
import { CTASection as CTASectionType } from '@/lib/types/section'

interface CTAProps {
  data: CTASectionType
}

export default function CTASection({ data }: CTAProps) {
  if (!data) return null

  const { title, description, primaryButton, secondaryButton } = data

  return (
    <section className="relative overflow-hidden bg-[#050308] pb-24 md:pb-32">
      
      {/* 1. DOTTED HEADER & LINE (Z-index 20) */}
      <div 
        className="relative w-full h-[105px] border-b border-white/10 z-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px', 
        }}
      />

      {/* 2. BACKGROUND GLOWS (Matching cta-section.jpg) */}
      {/* Center Depth Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(30, 25, 45, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* The Vibrant Purple Bottom Glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[450px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, rgba(159, 58, 237, 0.18) 0%, rgba(159, 58, 237, 0.05) 40%, transparent 100%)',
        }}
      />
      
      {/* Soft Bottom-Center Blur */}
      <div 
        className="absolute -bottom-[100px] left-1/2 -translate-x-1/2 w-full h-[300px] opacity-40 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at center, #9F3AED 0%, transparent 75%)',
          filter: 'blur(110px)'
        }}
      />

      {/* 3. CONTENT AREA */}
      <Container className="relative z-30 pt-[100px]">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
          
          <Heading level={2} className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            {title}
          </Heading>

          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl font-normal leading-relaxed">
            {description}
          </p>

          {/* BUTTON GROUP */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button 
              className="group w-full sm:w-auto h-[60px] !bg-[#FFA395] !text-black !rounded-xl !font-bold !text-lg gap-2 hover:brightness-110 transition-all px-10 shadow-lg shadow-[#FFA395]/10"
              onClick={() => window.location.href = primaryButton.link}
            >
              {primaryButton.text} 
              <ArrowUpRight size={20} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            
            <Button 
              className="w-full sm:w-auto h-[60px] !bg-white !text-black !border-none !rounded-xl !font-bold !text-lg hover:bg-gray-100 transition-all px-10 flex items-center gap-2 shadow-lg shadow-white/5"
              onClick={() => window.location.href = secondaryButton.link}
            >
              {secondaryButton.text}
              <Play size={18} fill="currentColor" />
            </Button>
          </div>

          {/* TRUST BADGES - Now fully white with high contrast */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-white font-medium border-t border-white/10 pt-10">
            <div className="flex items-center gap-2.5 opacity-90">
              <Headphones size={20} strokeWidth={2} className="text-white" />
              <span className="text-sm md:text-base">24/7 support</span>
            </div>
            
            <div className="hidden md:block h-5 w-[1px] bg-white/20 mx-2" />
            
            <div className="flex items-center gap-2.5 opacity-90">
              <ShieldCheck size={20} strokeWidth={2} className="text-white" />
              <span className="text-sm md:text-base">Secure and compliant</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}