'use client'
import Container from '@/components/ui/Container'
import {Button, Heading} from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'
import { CTASection as CTASectionType } from '@/lib/types/section'

interface CTAProps {
  data: CTASectionType
}

export default function CTASection({ data }: CTAProps) {
  if (!data) {
    return null
  }

  const { title, description, variant = 'challenges', stats = [], primaryButton, secondaryButton } = data

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#0D0B14]">
      {/* --- GRAIN OVERLAY (High Fidelity) --- */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-50 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* --- BACKGROUND GLOWS (Matching CTA3.jpg) --- */}
      {/* Deep Green Glow on the far left */}
      <div className="absolute -left-[5%] top-[-20%] w-[40%] h-[140%] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #0AA44C 0%, transparent 80%)',
          filter: 'blur(110px)'
        }}
      />
      
      {/* Vibrant Purple Glow moving towards center */}
      <div className="absolute left-[10%] top-[-10%] w-[50%] h-[120%] opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #9F3AED 0%, transparent 75%)',
          filter: 'blur(130px)'
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
            <Heading level={2} className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                {title.split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        {i < title.split('\n').length - 1 && <br className="hidden md:block" />}
                    </span>
                ))}
            </Heading>
          <p className="text-gray-400 text-white text-lg md:text-xl mb-12 max-w-2xl font-medium">
            {description}
          </p>

          {variant === 'transform' && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {stats.map((stat) => (
                <div 
                    key={stat} 
                    className="
                    flex items-center 
                    bg-[#2A2635]/40 backdrop-blur-md 
                    /* Thin border for the whole box */
                    border border-white/5 
                    /* The thin purple accent border */
                    border-l-2 border-l-[#9F3AED] 
                    /* Consistent radius on all corners */
                    rounded-lg 
                    px-5 py-2.5 
                    text-white/80 text-xs md:text-sm font-semibold 
                    transition-all hover:bg-[#2A2635]/60
                    "
                >
                    {stat}
                </div>
                ))}
            </div>
         )}

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <Button 
              variant="primary" 
              className="w-full sm:w-auto h-[64px] !bg-[#9F3AED] !rounded-xl !font-bold !text-lg gap-2 shadow-[0_20px_40px_rgba(159,58,237,0.25)] hover:brightness-110 active:scale-95 transition-all whitespace-nowrap px-8"
              onClick={() => window.location.href = primaryButton.link}
            >
              {primaryButton.text} <ArrowUpRight size={22} />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full sm:w-auto h-[64px] !bg-white !text-[#0D0B14] !border-none !rounded-xl !font-bold !text-lg hover:bg-gray-100 active:scale-95 transition-all whitespace-nowrap px-8"
              onClick={() => window.location.href = secondaryButton.link}
            >
              {secondaryButton.text}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}