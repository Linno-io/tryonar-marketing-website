'use client'
import { Button, Container, Heading, Text, DotBackground } from '@/components/ui'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export default function ReadyToSolveSection() {
  return (
    <section className="bg-white">
      <Container size="xl" padding={false} className="relative">
        <DotBackground 
          dotSize={2} 
          gap={20} 
          color="bg-gray-300" 
          // Updated to use your specific hex color
          borderColor="border-[#eeedf2]" 
          className="h-32 w-full border-x" // Added border-x if you want the side borders to show this color
        />
      </Container>
      
      <Container withBorder={true} className='py-24 !px-[10px]'>
        <div className="relative z-10 text-center mx-auto mb-16">
          <Heading level={2} className="text-[#1A202C] text-4xl lg:text-5xl font-bold mb-6">
            Ready to Solve These <span className="text-gray-400">Challenges?</span>
          </Heading>
          <Text className="text-gray-500 text-lg leading-relaxed">
            TryonAR transforms these pain points into competitive advantages with our no-code AR solution.
          </Text>
        </div>

        {/* The Product Image */}
        <div className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl border border-gray-100/50">
          <Image 
            src="/ready-to-solve-image.png"
            alt="TryonAR dashboard interface"
            width={1400}
            height={900}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Buttons inside the Container at the bottom */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
          <Button 
            variant="primary"
            className="h-[64px] px-10 !bg-[#1A202C] !text-white !rounded-2xl !font-bold text-lg flex items-center gap-2 shadow-2xl shadow-black/5"
          >
            See Our Solution <ArrowUpRight size={20} />
          </Button>
          <Button 
            variant="outline" 
            className="h-[64px] px-10 !bg-[#F3F4F6] !border-transparent !text-[#1A202C] !rounded-2xl !font-bold text-lg"
          >
            Calculate ROI
          </Button>
        </div>
      </Container>
    </section>
  )
}