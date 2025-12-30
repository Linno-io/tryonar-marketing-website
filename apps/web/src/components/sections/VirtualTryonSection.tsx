import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react'; // Assuming you use lucide-react for icons

const VirtualTryOnSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            App-free web <br />
            <span className="text-slate-400 font-medium">virtual try-on</span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-md leading-relaxed">
            From fashion to jewelry, our AR solutions are customized to 
            meet the unique needs of your industry.
          </p>
          
          <button className="group flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-4 rounded-xl font-semibold transition-all hover:bg-black active:scale-95">
            Get integration guide
            <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Right Visual Column */}
        <div className="relative bg-slate-50 rounded-3xl p-8 md:p-12 overflow-hidden flex items-center justify-center min-h-[400px]">
          {/* Decorative Background Grid */}
          <div className="absolute inset-0 opacity-40 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', size: '40px 40px' }} 
          />
          
          {/* Platform Logos Grid/Composition */}
          <div className="relative grid grid-cols-2 gap-6 md:gap-8 rotate-[-10deg]">
             {/* Magento */}
            <div className="bg-orange-600 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
               <div className="w-12 h-12 flex items-center justify-center text-white font-bold text-2xl">M</div>
            </div>
            {/* Shopify */}
            <div className="bg-white p-6 rounded-2xl shadow-xl translate-y-8 transform hover:scale-105 transition-transform">
               <div className="w-12 h-12 bg-[#95BF47] rounded-md" />
            </div>
            {/* BigCommerce */}
            <div className="bg-[#121118] p-6 rounded-2xl shadow-xl -translate-y-4 transform hover:scale-105 transition-transform">
               <div className="w-12 h-12 flex items-center justify-center text-white font-bold text-2xl italic">B</div>
            </div>
            {/* WooCommerce */}
            <div className="bg-[#96588A] p-6 rounded-2xl shadow-xl translate-y-4 transform hover:scale-105 transition-transform">
               <div className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl">Woo</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VirtualTryOnSection;