'use client'
import { Button, Container, Heading, Text } from '@/components/ui'
import Image from 'next/image'
import { ArrowUpRight, Play } from 'lucide-react'
import { HeroSection as HeroSectionType } from '@/lib/types/section'
import { urlFor } from '@/lib/sanity/client'

interface HeroSectionProps {
  data?: HeroSectionType
}

export default function HeroSection({ data }: HeroSectionProps) {
  const heading = data?.heading || 'AR for Everyone, \nNot Just Tech Giants'
  const subtext = data?.subtext || 'Transform your e-commerce store with 3-tap AR integration. Let customers try before they buy, reduce returns by 64%, and boost conversions by 94% with our no-code AR solution.'
  const trustBadges = data?.trustBadges || [
    { text: '94% Higher Conversion' },
    { text: '64% Fewer Returns' },
    { text: '3-Tap Setup' },
  ]
  const primaryCta = data?.primaryCta || { text: 'Start Free Trial', link: '#' }
  const secondaryCta = data?.secondaryCta || { text: 'Watch Demo', link: '#' }
  const heroImageUrl = data?.heroImage ? urlFor(data.heroImage).width(1200).height(600).url() : '/latest_hero.jpg'
  const heroImageAlt = data?.heroImage?.alt || 'AR Dashboard Mockup'

  return (
    <section className="relative bg-white">
      <div className="overflow-hidden">
        <div 
          className="absolute w-[417px] h-[722px] -left-[350px] top-[350px] bg-[#24EC2C]/30 blur-[80px] rounded-full rotate-[56.76deg] pointer-events-none"
        />
        
        <div 
          className="absolute w-[450px] h-[700px] -right-[100px] top-[250px] bg-[#9F5CF0]/20 blur-[80px] rounded-full rotate-[71.2deg] pointer-events-none"
        />
      </div>
      <div className="relative pt-[120px] pb-0 flex flex-col items-center">
        <Container className="flex flex-col items-center text-center z-10">
          
          {/* Main Heading */}
          <Heading as="h1" className="text-4xl md:text-[56px] font-extrabold text-[#1F2937] tracking-tight leading-[1.1] max-w-3xl mb-6">
            {heading.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < heading.split('\n').length - 1 && <br />}
              </span>
            ))}
          </Heading>

          {/* Subtext */}
          <Text className="text-gray-500 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            {subtext}
          </Text>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9F7EF] text-[#27AE60] text-sm font-semibold border border-[#D5F1E0]">
                <div className="bg-[#27AE60] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  ✓
                </div>
                {badge.text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Button 
              variant="primary"
              className="w-[209px] h-[60px] !bg-[#9F3AED] !rounded-[10px] !font-bold !text-lg gap-[10px] shadow-[20px_20px_60px_rgba(59,26,115,0.2)]"
              onClick={() => window.location.href = primaryCta.link}
            >
              {primaryCta.text} <ArrowUpRight size={20} />
            </Button>
            <Button 
              variant="outline" 
              className="w-[209px] h-[60px] !bg-white !border-[#9F3AED] !text-[#2A2730] px-8 py-7 !rounded-[10px] flex items-center gap-2 bg-white/50 backdrop-blur-sm text-lg font-medium"
              onClick={() => window.location.href = secondaryCta.link}
            >
              {secondaryCta.text}
              <Play size={20} fill="#ffffff" className="ml-0.5" />
            </Button>
          </div>

          {/* --- THE IMAGE (30% Overlap) --- */}
          <div className="relative w-full max-w-5xl px-4 z-20" style={{ marginBottom: '-180px' }}>
            <div className="rounded-[32px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border-4 border-white">
              <Image 
                src={heroImageUrl} 
                alt={heroImageAlt}
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}