'use client'
import { useState } from 'react'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { Heading, Text } from '@/components/ui'
import { AlertCircle } from 'lucide-react'
import { RealitySection } from '@/lib/types/section'
import { urlFor } from '@/lib/sanity/client'

interface Props {
  data: RealitySection
}

export default function RealityCheckSection({ data }: Props) {
  
  if (!data || !data.tabs || data.tabs.length === 0) {
    return null
  }

  const tabs = data.tabs
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  const activeContent = tabs.find((t) => t.id === activeTab) || tabs[0]

  return (
    <section className="bg-[#f7f7ff] relative" style={{ paddingTop: '280px', paddingBottom: '80px' }}>
      <Container>
        {/* Header Section */}
        <div className="text-center mb-12 px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-[#FF4D4D]" />
            <span className="text-[14px] font-bold text-[#FF4D4D] tracking-widest uppercase">
              {data.eyebrow}
            </span>
          </div>
          <Heading level={2} className="text-3xl md:text-5xl font-extrabold text-[#1F2937] mb-6">
            {data.heading.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < data.heading.split('\n').length - 1 && <br className="hidden md:block" />}
              </span>
            ))}
          </Heading>
          <Text className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {data.subtext}
          </Text>
        </div>

        {/* Tabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-[#9F3AED] border-[#9F3AED] text-white shadow-xl shadow-purple-200'
                  : 'bg-white border-gray-100 text-[#1F2937] hover:border-purple-200'
              }`}
            >
              <div className={`relative w-6 h-6 flex-shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-[#1F2937]'}`}>
                {tab.icon?.asset ? (
                  <Image 
                    src={urlFor(tab.icon).url()} 
                    alt={tab.title}
                    width={24}
                    height={24}
                    className={activeTab === tab.id ? 'brightness-0 invert' : ''}
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded" />
                )}
              </div>
              <div>
                <p className="font-bold text-lg leading-none mb-1">{tab.title}</p>
                <p className={`text-xs ${activeTab === tab.id ? 'text-purple-100' : 'text-gray-400'}`}>
                  {tab.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="bg-white border-2 border-[#9F3AED]/20 rounded-[24px] p-6 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Business Impact Card */}
            <div className="lg:col-span-4 bg-[#f9fafb] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#1F2937] mb-8">Business Impact</h3>
              <div className="space-y-6">
                {Object.entries(activeContent.impact).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-600 font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className={`font-bold italic ${
                      value === 'High' || value === 'Rising' ? 'text-red-500' : 
                      value === 'Low' ? 'text-red-400' : 'text-orange-500'
                    }`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Tab Details */}
            <div className="lg:col-span-8">
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#9F3AED] mb-6">
                {activeContent.detailsTitle}
              </h3>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                {activeContent.detailsDescription}
              </p>
              
              {activeContent.detailsSubtitle && (
                <h4 className="text-base font-bold text-[#1F2937] mb-6">
                  {activeContent.detailsSubtitle}
                </h4>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {activeContent.detailsList.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 border-2 border-red-500 rounded-full flex items-center justify-center">
                      <span className="text-red-500 text-[10px] font-bold">!</span>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}