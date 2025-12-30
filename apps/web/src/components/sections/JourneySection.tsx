'use client'
import React from 'react'
import { Link2, CloudUpload, Rocket, ArrowUpRight, ChevronRight } from 'lucide-react'

const steps = [
  {
    title: 'Connect',
    description: 'Link your e-commerce platform',
    subtext: 'Three simple steps to transform your e-commerce experience',
    icon: <Link2 className="w-6 h-6 rotate-45" />,
  },
  {
    title: 'Upload',
    description: 'Add your product catalog',
    subtext: 'Upload and configure your product catalog with AR-ready content',
    icon: <CloudUpload className="w-6 h-6" />,
  },
  {
    title: 'Launch',
    description: 'Go live with AR experiences',
    subtext: 'Launch your enhanced AR shopping experience to customers worldwide',
    icon: <Rocket className="w-6 h-6" />,
  }
]

export default function JourneySection() {
  return (
    <section className="py-24 bg-[#E5E7EB]/30 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e1b4b] mb-4">
            Your Journey to <span className="text-gray-400">AR Success</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Three simple steps to transform your e-commerce experience
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left relative">
                
                {/* Icon Box */}
                <div className="relative mb-10 z-10">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center text-gray-800 border border-gray-50">
                    {step.icon}
                  </div>
                </div>

                {/* The 45-degree Connector Line */}
                {/* This creates the vertical line that turns into a 45-degree angle */}
                <div className="absolute left-7 top-14 w-[2px] h-6 bg-gray-200 lg:block hidden">
                  <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-gray-200 origin-left -rotate-[45deg]"></div>
                </div>

                {/* Text Content */}
                <div className="relative">
                  <h3 className="text-3xl font-bold text-[#1e1b4b] mb-3 flex items-center justify-center lg:justify-start gap-2">
                    <span className="text-gray-900">{index + 1}.</span> {step.title}
                  </h3>
                  <p className="text-gray-800 font-bold text-[17px] mb-2">
                    {step.description}
                  </p>
                  <p className="text-gray-400 leading-relaxed text-[15px] max-w-[280px]">
                    {step.subtext}
                  </p>
                </div>
              </div>

              {/* Triple Chevron Divider */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center pt-20 px-2">
                  <TripleChevron />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <button className="bg-[#18181b] text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-black transition-all shadow-xl hover:shadow-2xl">
            Start Free Trial
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

function TripleChevron() {
  return (
    <div className="flex -space-x-3">
      <ChevronRight className="text-purple-200" size={32} strokeWidth={3} />
      <ChevronRight className="text-purple-300" size={32} strokeWidth={3} />
      <ChevronRight className="text-purple-400" size={32} strokeWidth={3} />
    </div>
  )
}