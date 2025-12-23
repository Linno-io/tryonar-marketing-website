'use client'
import { useState } from 'react'
import Container from '@/components/ui/Container'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { Scan, Sparkles, LayoutPanelLeft, Share2, ArrowUpRight, Play } from 'lucide-react'
import { IndustrySolutionsSection as IndustrySolutionsSectionProps } from '@/lib/types/section'
import { urlFor } from '@/lib/sanity/client'

interface Props {
  data: IndustrySolutionsSectionProps
}

const iconMap = {
  scan: <Scan size={18} />,
  sparkles: <Sparkles size={18} />,
  layoutPanel: <LayoutPanelLeft size={18} />,
  share: <Share2 size={18} />
}

export default function IndustrySolutionsSection({ data }: Props) {
  const [activeTab, setActiveTab] = useState(data.industries[0]?.id?.current || '')

  const activeData = data.industries.find((ind) => ind.id.current === activeTab) || data.industries[0]

  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-10">
          <Text className="font-bold text-[#0AA44C] tracking-widest uppercase mb-3" variant="small">
            Industry Solutions
          </Text>
          <Heading level={2} className="text-[#1F2937] mb-4 font-extrabold">
            {data.heading}
          </Heading>
          <Text className="text-gray-500 max-w-2xl mx-auto font-medium">
            {data.subheading}
          </Text>
        </div>

        {/* Tab Navigation - Rectangular with Soft Corners */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {data.industries.map((ind) => (
            <button
              key={ind.id.current}
              onClick={() => setActiveTab(ind.id.current)}
              className={`px-5 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                activeTab === ind.id.current
                  ? 'bg-[#9F3AED] text-white'
                  : 'bg-[#F9FAFB] text-gray-500 hover:bg-gray-100'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Image with ROI Badge */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden border border-[#9F3AED]/10">
              <div className="aspect-square sm:aspect-[4/4] bg-gray-50 relative">
                {activeData?.image && (
                  <Image 
                    src={urlFor(activeData.image).width(800).height(800).url()} 
                    alt={activeData.title} 
                    fill 
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            {/* ROI Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm shadow-md rounded-lg px-3 py-2 text-center border border-gray-100">
              <Text className="text-[#0AA44C] font-black text-lg leading-none">
                {activeData?.roi}
              </Text>
              <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-tighter">
                ROI
              </Text>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="flex flex-col pt-2">
            <Heading level={3} size="3xl" className="text-[#1F2937] mb-3">
              {activeData?.title}
            </Heading>
            <Text className="text-gray-500 mb-8 leading-snug">
              {activeData?.description}
            </Text>

            <Text className="text-gray-900 mb-4 font-extrabold" variant="body">
              Key Features
            </Text>

            {/* Tight Features Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-10">
              {activeData?.features?.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[#9F3AED] shrink-0">{iconMap[feature.icon]}</span>
                  <Text variant="small" className="font-bold text-[#4B5563] leading-tight">
                    {feature.label}
                  </Text>
                </div>
              ))}
            </div>

            {/* Tight Metrics Row */}
            <div className="flex gap-10 mb-10">
              {activeData?.stats?.map((stat, idx) => (
                <div key={idx}>
                  <Text className="text-2xl font-black text-[#0AA44C] leading-none mb-1">
                    {stat.value}
                  </Text>
                  <Text className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                    {stat.label}
                  </Text>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button 
                variant="primary" 
                className="!bg-[#9F3AED] !rounded-lg h-12 px-6 !font-bold text-sm"
              >
                Start Free Trial <ArrowUpRight size={20} />
              </Button>
              <Button 
                variant="outline" 
                className="!border-gray-200 !rounded-lg h-12 px-6 !font-bold text-sm text-gray-800"
              >
                Watch Demo <Play size={20} fill="#ffffff" className="ml-0.5" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}