'use client'
import React from 'react';
import { Container, DotBackground } from '@/components/ui';
// Icons from lucide-react to match your design
import { Store, Box, BarChart3, RefreshCcw } from 'lucide-react';

const GallerySection = () => {
  const stats = [
    { label: 'Active Stores', value: '10,000+', icon: <Store size={22} className="text-gray-700" /> },
    { label: 'AR Interactions', value: '50M+', icon: <Box size={22} className="text-gray-700" /> },
    { label: 'Avg Conversion Lift', value: '94%', icon: <BarChart3 size={22} className="text-gray-700" /> },
    { label: 'Return Reduction', value: '64%', icon: <RefreshCcw size={22} className="text-gray-700" /> },
  ];

  return (
    <section className="bg-[#F8F9FA] font-sans overflow-hidden">
      <DotBackground 
        dotSize={2} 
        gap={20} 
        color="bg-gray-300" 
        borderColor="border-[#eeedf2]" 
        className="h-32 w-full border-x border-b border-[#eeedf2]" 
      />

      {/* 2. Stats Section */}
      <div className="max-w-6xl mx-auto mb-20 px-6 pt-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center px-4">
              
              {/* Colorful Gradient Vertical Divider */}
              {idx !== stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-[1px] bg-[#eeedf2]">
                  <div className="h-full w-full bg-gradient-to-b from-purple-500/40 via-orange-400/40 to-transparent" />
                </div>
              )}

              {/* Icon Container */}
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                {stat.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-4xl font-bold text-[#1A202C] mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-base text-gray-500 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CTA Button */}
      <div className="flex justify-center mb-24">
        <button className="bg-[#1A202C] text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-black transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] group">
          Start Free Trial
          <svg 
            width="20" height="20" viewBox="0 0 15 15" fill="none" 
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          >
            <path d="M3.64645 11.3536L11 4M11 4H5.5M11 4V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 4. Staggered Gallery Grid */}
       <div className="w-full px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-start">
        
        {/* Column 1 */}
        <div className="space-y-6">
          <Placeholder image="Clothing AR" aspect="aspect-[3/4]" />
          <Placeholder image="Footwear" aspect="aspect-square" />
        </div>

        {/* Column 2 - Pushed Down */}
        <div className="space-y-6 mt-12 md:mt-20">
          <Placeholder image="Home Decor" aspect="aspect-[4/5]" />
          <Placeholder image="Accessories" aspect="aspect-video" />
        </div>

        {/* Column 3 - Center (Highest Depth) */}
        <div className="space-y-6 mt-24 md:mt-36">
          <Placeholder image="Jewelry Try-on" aspect="aspect-[2/3]" />
        </div>

        {/* Column 4 - Pushed Down (Matches Column 2) */}
        <div className="space-y-6 mt-12 md:mt-20">
          <Placeholder image="Fashion Model" aspect="aspect-square" />
          <Placeholder image="Lifestyle" aspect="aspect-[4/5]" />
        </div>

        {/* Column 5 */}
        <div className="space-y-6 hidden lg:block">
          <Placeholder image="Product Showcase" aspect="aspect-[3/4]" />
          <Placeholder image="Eyewear" aspect="aspect-square" />
        </div>

      </div>
    </section>
  );
};

/**
 * Placeholder Component
 * Includes inner shadows and borders to mimic the depth in the design.
 */
const Placeholder = ({ aspect, image }: { aspect: string, image: string }) => (
  <div className={`w-full ${aspect} bg-white rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-sm border border-gray-100`}>
    {/* Mimics a real image container */}
    <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
        <span className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {image}
        </span>
    </div>
    
    {/* Realistic Overlay/Border */}
    <div className="absolute inset-0 border-[8px] border-white/50 rounded-[2rem] pointer-events-none" />
    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]" />
  </div>
);

export default GallerySection;