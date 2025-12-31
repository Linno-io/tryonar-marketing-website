'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui';
import Image from 'next/image';

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
        image: '/low-conversion.png',
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
        image: '/return-rate.png',
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
        image: '/dev-complexity.png',
    },
};

export default function EcommerceChallenge() {
    const [activeTab, setActiveTab] = useState<TabId>('low-conversion');
    const current = contentData[activeTab];

    return (
        <section className="bg-[#ffffff]font-sans text-[#1f2937]">
            <Container size="xl" withBorder={true} className='py-24 !px-[10px]'>
                <div className="text-center mb-6 lg:mb-10">
                    <span className="text-[#FFA49B] text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-6">
                        <svg fill="none" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="8.25" stroke="#FFA49B" strokeWidth="1.5"/><path stroke="#FFA49B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5.4v4.725"/><path stroke="#FFA49B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13.005v.09"/></svg>

                        The Reality Check
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                        E-commerce's Biggest <span className="text-[#838383]">Challenge</span>
                    </h2>
                    <p className="text-[#3E3E42] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                        Online shoppers can't truly experience products before buying, leading to high return rates and lost conversions.
                    </p>
                </div>

                {/* Tabs Selection */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {Object.entries(contentData).map(([id, data]) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id as TabId)}
                            className={`px-8 py-2.5 text-[#1A202C] cursor-pointer rounded-full border-2 text-sm font-semibold transition-all duration-300 ${activeTab === id
                                    ? 'border-[#FFA49B] border-solid challenge-active-tab'
                                    : 'border border-dashed border-[#C5BBCC]'
                                }`}
                        >
                            {data.title.split(' ')[0]} {data.title.split(' ')[1] || ''}
                        </button>
                    ))}
                </div>

                {/* Card Content */}
                <div className="bg-[#f8f8f9] rounded-2xl md:rounded-[3rem] p-6 md:p-20 relative">
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
                                <div className="flex items-center gap-4 mb-2">
                                    <h3 className="text-4xl font-bold text-gray-900">
                                        {current.title}
                                        <span className="text-4xl font-bold text-gray-400 inline-block ml-2">{current.value}</span>
                                    </h3>
                                </div>
                                <p className="text-[#3E3E42] text-base lg:text-lg mb-10 leading-relaxed max-w-md">
                                    Online shoppers can't truly experience products before buying, leading to high return rates and lost conversions.
                                </p>

                                <div className="space-y-4 lg:space-y-7 mt-10">
                                    <p className="text-base tracking-[0.32px] text-[#646464] uppercase">
                                        Average E-commerce {current.title}
                                    </p>
                                    <ul className="space-y-2 lg:space-y-5">
                                        {current.features.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-center gap-4 text-[#646464]">
                                                <svg className="w-5 h-5 text-[#646464]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Image
                                src={current.image}
                                alt={current.title}
                                width={532}
                                height={417}
                                className="w-full object-contain"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </Container>
        </section>
    );
}