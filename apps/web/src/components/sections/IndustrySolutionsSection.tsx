"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ScanFace, Ruler, Share2, Play, ArrowUpRight } from 'lucide-react';

const industries = [
  {
    id: 'eyewear',
    name: 'Eyewear',
    isComingSoon: false,
    title: 'Eyewear',
    description: 'Try on glasses, sunglasses, and contact lenses virtually',
    features: [
      { name: 'Face shape analysis', icon: <ScanFace size={18} /> },
      { name: 'Virtual fitting rooms', icon: <Ruler size={18} /> },
      { name: 'Size recommendation AI', icon: <Sparkles size={18} /> },
      { name: 'Social sharing integration', icon: <Share2 size={18} /> },
    ],
    stats: { conversion: '+127%', return: '-68%', engagement: '89+' },
    image: '/eyewear-model.png' 
  },
  {
    id: 'headwear',
    name: 'Headwear',
    isComingSoon: false,
    title: 'Headwear & Hats',
    description: 'Ensure the perfect fit for hats, helmets, and beanies with 3D head mapping.',
    features: ['Head size calibration', 'Hair occlusion technology', 'Style matching', 'Material texture preview'],
    stats: { conversion: '+95%', return: '-42%', engagement: '74+' },
    image: '/headwear-model.png'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    isComingSoon: true,
    title: 'Jewelry',
    description: 'Hyper-realistic gemstone and metal rendering for rings and necklaces.',
    features: ['Hand tracking', 'Realistic shaders', 'Size sizer', 'Multi-stacking preview'],
    stats: { conversion: '+110%', return: '-52%', engagement: '78+' },
    image: '/jewelry-model.png'
  },
  {
    id: 'footwear',
    name: 'Footwear',
    isComingSoon: true,
    title: 'Footwear',
    description: 'Step into the future with real-time foot tracking and virtual sneaker try-ons.',
    features: ['Ankle occlusion', 'Surface detection', 'PBR textures', 'Direct-to-cart'],
    stats: { conversion: '+142%', return: '-70%', engagement: '95+' },
    image: '/footwear-model.png'
  },
];

export default function IndustryARSection() {
  const [activeTab, setActiveTab] = useState(industries[0]);

  return (
    <section className="bg-[#F7F8F9] py-24 px-6 min-h-screen flex items-center relative overflow-hidden">
      
      {/* BOTTOM RIGHT GRADIENT GLOW */}
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at bottom right, rgba(232, 193, 255, 0.6) 0%, rgba(255, 186, 186, 0.4) 30%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Main Header */}
        <div className="text-center mb-16">
          <p className="text-[#8b5cf6] font-bold tracking-[0.2em] text-[12px] uppercase mb-4">Industry Solutions</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Tailored AR experiences for <span className="text-slate-400">every industry</span>
          </h2>
          <p className="text-slate-500 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            From fashion to jewelry, our AR solutions are customized to meet the unique needs of your industry
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Tabs and Info */}
          <div className="bg-white rounded-[48px] p-10 md:p-14 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            
            {/* Navigation Tabs inside Left Card */}
            <div className="flex flex-wrap gap-3 mb-14">
              {industries.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => !tab.isComingSoon && setActiveTab(tab)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all border
                    ${activeTab.id === tab.id 
                      ? 'bg-white border-red-100 text-slate-900 shadow-sm' 
                      : 'bg-transparent border-dashed border-slate-200 text-slate-400'}
                    ${tab.isComingSoon ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:border-slate-300'}
                  `}
                >
                  <span className="flex items-center gap-2">
                    {tab.name}
                    
                    {/* Notification Dot for Active Tab */}
                    {!tab.isComingSoon && activeTab.id === tab.id && (
                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8080] rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full opacity-60" />
                       </span>
                    )}

                    {/* Coming Soon Indicator */}
                    {tab.isComingSoon && (
                       <div className="bg-slate-100 text-[8px] px-1.5 py-0.5 rounded text-slate-400 font-bold uppercase tracking-tighter">
                         Soon
                       </div>
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Interactive Content Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex-grow flex flex-col"
              >
                <h3 className="text-5xl font-bold text-slate-900 mb-5">{activeTab.title}</h3>
                <p className="text-slate-500 text-lg mb-12 leading-relaxed max-w-md">{activeTab.description}</p>

                <div className="mb-12">
                  <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-[0.2em] mb-8">Key Features</h4>
                  <ul className="space-y-6">
                    {activeTab.features.map((feature: any, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-slate-600">
                        <span className="text-slate-300">
                          {feature.icon || <Sparkles size={20} />}
                        </span>
                        <span className="font-medium text-[16px]">
                          {typeof feature === 'string' ? feature : feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 mt-auto">
                  <button className="bg-[#121212] text-white px-9 py-4.5 rounded-[20px] font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5">
                    Start Free Trial <ArrowUpRight size={20} />
                  </button>
                  <button className="bg-slate-50 text-slate-900 px-9 py-4.5 rounded-[20px] font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors border border-slate-200/50">
                    Watch Demo <Play size={18} fill="currentColor" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Visual and Stats Card */}
          <div className="bg-white rounded-[48px] relative border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col min-h-[620px]">
            <div className="flex-grow flex items-center justify-center p-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={activeTab.image}
                    alt={activeTab.title}
                    className="max-h-[500px] w-auto object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.1)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Stats Overlay (Glassmorphism) */}
            <div className="absolute bottom-10 left-10 right-10">
              <div className="bg-white/50 backdrop-blur-2xl border border-white/60 rounded-[32px] p-8 shadow-2xl flex justify-around items-center">
                <div className="text-center px-4">
                  <div className="text-3xl font-bold text-slate-900 tracking-tight">{activeTab.stats.conversion}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] mt-1.5">Conversion</div>
                </div>
                <div className="w-[1px] h-10 bg-slate-200/50" />
                <div className="text-center px-4">
                  <div className="text-3xl font-bold text-slate-900 tracking-tight">{activeTab.stats.return}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] mt-1.5">Return</div>
                </div>
                <div className="w-[1px] h-10 bg-slate-200/50" />
                <div className="text-center px-4">
                  <div className="text-3xl font-bold text-slate-900 tracking-tight">{activeTab.stats.engagement}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.1em] mt-1.5">Engagement</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}