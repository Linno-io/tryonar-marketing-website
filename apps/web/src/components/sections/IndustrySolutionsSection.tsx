"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ScanFace, Ruler, Share2, Play, ArrowUpRight } from 'lucide-react';
import { Container } from '../ui';

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
        image: '/sunglass-face.png'
    },
    {
        id: 'headwear',
        name: 'Headwear',
        isComingSoon: false,
        title: 'Headwear & Hats',
        description: 'Ensure the perfect fit for hats, helmets, and beanies with 3D head mapping.',
        features: ['Head size calibration', 'Hair occlusion technology', 'Style matching', 'Material texture preview'],
        stats: { conversion: '+95%', return: '-42%', engagement: '74+' },
        image: '/headwear-image-1.png'
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
        <section className="bg-[#F7F8F9] px-6 min-h-screen flex items-center relative overflow-hidden">
            <Container className='pt-40'>
                <div className="text-center mb-16">
                    <p className="text-[#8b5cf6] font-bold tracking-[0.2em] text-[12px] uppercase mb-5">Industry Solutions</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1A202C] leading-tight">
                        Tailored AR experiences for <span className="text-[#838383]">every industry</span>
                    </h2>
                    <p className="text-[#3E3E42] mt-3.5 mx-auto text-lg leading-relaxed">
                        From fashion to jewelry, our AR solutions are customized to meet the unique needs of your industry
                    </p>
                </div>

                <div className="flex items-center justify-center flex-wrap gap-3 mb-14">
                    {industries.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => !tab.isComingSoon && setActiveTab(tab)}
                            className={`p-[7px_16px] lg:p-[8px_20px] text-[#1A202C] rounded-full border text-sm font-semibold transition-all duration-300 ${activeTab.id === tab.id
                                ? 'border-[#FFA49B] border-solid challenge-active-tab'
                                : 'border border-dashed border-[#C5BBCC]'
                                } ${tab.isComingSoon ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
                        >
                            <span className="flex items-center gap-2">
                                {tab.name}
                                {!tab.isComingSoon && activeTab.id === tab.id && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8080] rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                                        <div className="w-1 h-1 bg-white rounded-full opacity-60" />
                                    </span>
                                )}
                                {tab.isComingSoon && (
                                    <div className="bg-slate-100 text-[8px] px-1.5 py-0.5 rounded text-slate-400 font-bold uppercase tracking-tighter">
                                        Soon
                                    </div>
                                )}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
                    {/* LEFT COLUMN */}
                    <div className="bg-white rounded-3xl md:rounded-[48px] flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="flex-grow flex flex-col"
                            >
                                {/* Header */}
                                <div className="pt-6 md:pt-10 pb-4 md:pb-7 px-6 sm:px-8 md:px-14">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-5">
                                        {activeTab.title}
                                    </h3>
                                    <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md">
                                        {activeTab.description}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="bg-[#F8F8F9] mx-3 sm:mx-4 flex flex-col sm:flex-row px-5 sm:px-8 md:px-10 py-4 rounded-[10px] gap-4 sm:gap-0">
                                    {Object.entries(activeTab.stats).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex-1 flex items-center justify-center text-center pb-4 sm:pb-0 px-0 sm:px-4 border-b sm:border-b-0 sm:border-r border-slate-200/50 last:border-none"
                                        >
                                            <div>
                                                <div className="text-2xl sm:text-3xl font-medium text-[#838383] tracking-tight">
                                                    {value}
                                                </div>
                                                <div className="text-[10px] uppercase text-[#646464] tracking-[0.1em] mt-1.5">
                                                    {key}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Features */}
                                <div className="mb-8 md:mb-12 pt-6 md:pt-10 px-6 sm:px-8 md:px-14">
                                    <h4 className="font-bold text-slate-900 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-6 md:mb-8">
                                        Key Features
                                    </h4>
                                    <ul className="space-y-4 sm:space-y-6">
                                        {activeTab.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center gap-4 text-slate-600"
                                            >
                                                <span className="text-slate-300">
                                                    {typeof feature === "string" ? <Sparkles size={20} /> : feature.icon}
                                                </span>
                                                <span className="font-medium text-sm sm:text-[16px]">
                                                    {typeof feature === "string" ? feature : feature.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-auto pb-6 md:pb-10 px-6 sm:px-8 md:px-14">
                                    <button className="w-full sm:w-auto bg-[#121212] text-white px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5">
                                        Start Free Trial <ArrowUpRight size={20} />
                                    </button>

                                    <button className="w-full sm:w-auto bg-slate-50 text-slate-900 px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors border border-slate-200/50">
                                        Watch Demo <Play size={18} fill="currentColor" />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="bg-white rounded-3xl md:rounded-[48px] relative border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col min-h-[360px] sm:min-h-[480px] lg:min-h-[620px]">
                        <div className="flex-grow flex items-center justify-center p-6 sm:p-10 md:p-14">
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
                                        className="max-h-[260px] sm:max-h-[380px] md:max-h-[500px] w-auto object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.1)]"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}