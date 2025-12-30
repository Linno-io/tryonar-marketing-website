'use client'
import { Button, Container, Heading, Text } from '@/components/ui'
import Image from 'next/image'
import { ArrowUpRight, Play, Check } from 'lucide-react'
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
  
  const heroImageUrl = data?.heroImage 
    ? urlFor(data.heroImage).width(1200).url() 
    : '/hand-holding-phone.png' 

  return (
    <section className="relative bg-white overflow-hidden pt-36 pb-20 lg:pt-52 lg:pb-32 border-b border-[#eeedf2]">      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'linear-gradient(180deg, #E3D5FF 0%, #FFF 43.22%, #FFF 100%)'}}>
        <div 
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]" 
          style={{ background: 'radial-gradient(circle, rgba(159, 58, 237, 0.15) 0%, rgba(159, 58, 237, 0) 70%)' }}
        />
        <div 
          className="absolute top-[20%] right-[-10%] w-[700px] h-[800px] rounded-full blur-[130px]" 
          style={{ background: 'radial-gradient(circle, rgba(255, 165, 0, 0.12) 0%, rgba(255, 165, 0, 0) 70%)' }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-10 gap-10 items-center">          
          <div className="lg:col-span-6 flex flex-col text-left">
            <Heading 
              level={1} 
              className="text-[#1A202C] font-bold tracking-[-4px] leading-[90px] mb-8"
              style={{ 
                fontFamily: "'Circular Std', sans-serif", 
              }}
            >
              {heading.split('\n').map((line, i) => (
                <span key={i} className="block whitespace-nowrap">{line}</span>
              ))}
            </Heading>

            <Text className="text-gray-500 text-[20px] mb-10 leading-[1.6] max-w-[580px]">
              {subtext}
            </Text>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-12">
              {trustBadges.map((badge, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-white/80 shadow-sm"
                >
                  <Check size={16} className="text-[#1A202C] stroke-[3px]" />
                  <span className="text-sm font-bold text-[#1A202C]">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <Button 
                variant="primary"
                className="h-[64px] px-10 !bg-[#1A202C] !text-white !rounded-xl !font-bold text-lg flex items-center gap-2 shadow-2xl shadow-black/10"
              >
                {primaryCta.text} <ArrowUpRight size={22} />
              </Button>
              <Button 
                variant="outline" 
                className="h-[64px] px-10 !bg-[#F3F4F6] !border-transparent !text-[#1A202C] !rounded-xl !font-bold text-lg flex items-center gap-2"
              >
                {secondaryCta.text} <Play size={20} className="fill-[#1A202C]" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              <Image 
                src={heroImageUrl} 
                alt="AR Try-on Mockup"
                width={500}
                height={700}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}