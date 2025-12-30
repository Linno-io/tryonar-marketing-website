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

    const images = [
        '/gallery-1.png',
        '/gallery-2.png',
        '/gallery-3.png',
        '/gallery-4.png',
        '/gallery-5.png',
        '/gallery-6.png',
        '/gallery-7.png',
        '/gallery-8.png',
        '/gallery-9.png',
        '/gallery-10.png',
        '/gallery-11.png',
    ]

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
                        <path d="M3.64645 11.3536L11 4M11 4H5.5M11 4V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* 4. Masonry Gallery Grid */}
            <div className="w-full px-6 gallery-section relative">
                <div className="columns-2 md:columns-4 lg:columns-5 gap-6 space-y-6">
                    {images.map((src, idx) => (
                        <div key={idx} className="mb-6 break-inside-avoid rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 bg-white">
                            <img
                                src={src}
                                alt={`Gallery image ${idx + 1}`}
                                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;