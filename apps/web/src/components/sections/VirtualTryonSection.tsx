import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react'; // Assuming you use lucide-react for icons

const VirtualTryOnSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-32">
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
        <div className="relative bg-slate-50 rounded-3xl overflow-hidden flex items-center justify-center min-h-[400px]">
          <Image src="/virtual-tryon.png" alt="Virtual Try-On Platforms" width={400} height={300} className="object-contain max-h-72" />
        </div>

      </div>
    </section>
  );
};

export default VirtualTryOnSection;