'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';

type TabId = 'low-conversion' | 'return-rate' | 'dev-complexity';

const contentData: Record<TabId, any> = {
  'low-conversion': {
    title: 'Low Conversion',
    value: '2.86%',
    features: [
      'Limited product interaction reduces engagement',
      'Difficulty imagining product in real environment',
      'Lack of scale and context understanding',
      'Missing emotional connection with products',
    ],
    chartData: [
      { month: 'Jan', value: 62, label: '4.2%', color: '#FFA49B' },
      { month: 'Mar', value: 58, label: '3.8%', color: '#FFA49B' },
      { month: 'May', value: 48, label: '2.9%', color: '#FFA49B' },
      { month: 'Jul', value: 35, label: '1.8%', color: '#FFD166' },
      { month: 'Sep', value: 15, label: '0.7%', color: '#EF4444' },
    ],
  },
  'return-rate': {
    title: '30% Return Rate',
    value: 'High',
    features: [
      'Incorrect size or fit expectations',
      'Color mismatch from screen to reality',
      'High logistics and restocking costs',
      'Negative environmental impact',
    ],
    chartData: [
      { month: 'Jan', value: 20, label: '10%', color: '#93C5FD' },
      { month: 'Mar', value: 30, label: '15%', color: '#93C5FD' },
      { month: 'May', value: 60, label: '25%', color: '#FFA49B' },
      { month: 'Jul', value: 80, label: '30%', color: '#EF4444' },
      { month: 'Sep', value: 85, label: '32%', color: '#EF4444' },
    ],
  },
  'dev-complexity': {
    title: 'Dev Complexity',
    value: 'High',
    features: [
      'Steep learning curve for WebGL',
      'Asset optimization challenges',
      'Cross-browser 3D rendering issues',
      'Longer time-to-market for AR features',
    ],
    chartData: [
      { month: 'Jan', value: 10, label: 'Low', color: '#34D399' },
      { month: 'Mar', value: 40, label: 'Med', color: '#FFD166' },
      { month: 'May', value: 75, label: 'High', color: '#FFA49B' },
      { month: 'Jul', value: 90, label: 'Hard', color: '#EF4444' },
      { month: 'Sep', value: 95, label: 'Extreme', color: '#EF4444' },
    ],
  },
};

export default function EcommerceChallenge() {
  const [activeTab, setActiveTab] = useState<TabId>('low-conversion');
  const current = contentData[activeTab];

  return (
    <section className="bg-[#ffffff]font-sans text-[#1f2937]">
      <Container size="xl" withBorder={true} className='py-24 px-0'>
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FFA49B] text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-6">
            <span className="border border-[#FFA49B] rounded-full w-5 h-5 flex items-center justify-center text-[10px] italic">i</span>
            The Reality Check
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            E-commerce's Biggest <span className="text-[#9ca3af]">Challenge</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Online shoppers can't truly experience products before buying, leading to high return rates and lost conversions.
          </p>
        </div>

        {/* Tabs Selection */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(Object.keys(contentData) as TabId[]).map((id) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-8 py-2.5 rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
                activeTab === id
                  ? 'border-[#FFA49B] text-[#FFA49B] bg-white shadow-sm'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {contentData[id].title.split(' ')[0]} {contentData[id].title.split(' ')[1] || ''}
            </button>
          ))}
        </div>

        {/* Card Content */}
        <div className="bg-[#f8f8f9] rounded-[3rem] p-8 md:p-20 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-4xl font-bold text-gray-900">{current.title}</h3>
                  <span className="text-4xl font-bold text-gray-400">{current.value}</span>
                </div>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-md">
                  Online shoppers can't truly experience products before buying, leading to high return rates and lost conversions.
                </p>
                
                <div className="space-y-6">
                  <p className="text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase">
                    Average E-commerce {current.title}
                  </p>
                  <ul className="space-y-5">
                    {current.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-4 text-gray-600 font-medium">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Content: Chart */}
              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-16">
                   <h4 className="text-[11px] font-black tracking-widest text-gray-400 italic uppercase">
                    CONVERSION RATE
                   </h4>
                   <div className="text-[#a855f7]">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                     </svg>
                   </div>
                </div>

                <div className="relative h-56 w-full flex items-end justify-between px-2">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3].map((line) => (
                      <div key={line} className="w-full border-t border-dashed border-gray-100" />
                    ))}
                  </div>

                  {/* Dynamic Data Points */}
                  {current.chartData.map((point: any, i: number) => (
                    <div key={i} className="relative flex flex-col items-center z-10 h-full justify-end">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          backgroundColor: point.color,
                          marginBottom: `${point.value}%`,
                          boxShadow: `0 0 20px ${point.color}60`
                        }}
                      />
                      <span 
                        className="absolute font-bold text-xs"
                        style={{ bottom: `${point.value + 8}%`, color: point.color }}
                      >
                        {point.label}
                      </span>
                      <span className="mt-4 text-[10px] font-bold text-gray-400 uppercase">
                        {point.month}
                      </span>
                    </div>
                  ))}
                  
                  {/* Subtle Background Fill Curve (Simplified) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFA49B08] to-transparent rounded-b-3xl" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}