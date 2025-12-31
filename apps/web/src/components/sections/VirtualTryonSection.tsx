import React from 'react';
import { ArrowUpRight } from 'lucide-react'; // Icon
import Image from 'next/image';

const VirtualTryOnSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Content Column */}
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A202C] leading-tight">
                        App-free web<br />
                        virtual <span className="text-[#838383] font-medium">Try-on</span>
                    </h2>

                    <p className="text-base sm:text-lg text-[#3E3E42] max-w-md leading-relaxed">
                        From fashion to jewelry, our AR solutions are customized to
                        meet the unique needs of your industry.
                    </p>

                    <button className="group flex items-center gap-2 bg-[#1a1a1a] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all hover:bg-black active:scale-95">
                        Get integration guide
                        <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                </div>

                {/* Right Visual Column */}
                <div className="relative bg-slate-50 rounded-3xl overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
                    <img
                        src="/virtual-tryon.png"
                        alt="Virtual Try-On Platforms"
                        className="object-contain w-full h-full"
                    />
                </div>

            </div>
        </section>
    );
};

export default VirtualTryOnSection;
