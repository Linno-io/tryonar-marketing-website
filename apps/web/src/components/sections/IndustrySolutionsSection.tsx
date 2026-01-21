"use client";
import React, { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '../ui';
import { 
    IndustrySolutionsSection as IndustrySolutionsSectionProps, 
} from '@/lib/types/section';
import Image from 'next/image';
import Link from 'next/link';

const StatsSection = (props:any) => {
    if(!props.data || props.data.length === 0) return null;

    return (
        <div className={`bg-[#F8F8F9] mx-3 sm:mx-4 flex flex-col sm:flex-row px-5 sm:px-8 md:px-11.2 py-7 rounded-[10px] gap-4 sm:gap-0`}>
            {props.data?.map(({label, value} : {label: string, value: string}, index : number) => (
                <div
                    key={label}
                    className={`flex-1 flex items-center justify-center text-center pb-4 sm:pb-0 px-0 sm:px-4 relative  ${index === 0  ? '' : 'gradient-border'}`}
                >
                    <div>
                        <div className="text-2xl sm:text-3xl font-medium text-[#838383] tracking-tight">
                            {value}
                        </div>
                        <div className="text-[10px] uppercase text-[#646464] tracking-[0.1em] mt-1.5">
                            {label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function IndustryARSection({data} : {data: IndustrySolutionsSectionProps}) {
    const {
        tagline,
        title,
        description,
        tabs,
        showStatsOnBottom,
        primaryButton,
        secondaryButton
    } = data;

    const [activeTab, setActiveTab] = useState(tabs ? tabs[0] : null);

    if(!tabs || tabs.length === 0 || !activeTab) return null;

    return (
        <section className="bg-[#F7F8F9] px-6 min-h-screen flex items-center relative overflow-hidden">
            <Container className='pt-40'>
                <div className="text-center mb-15">
                    <p className="text-[#8b5cf6] font-bold tracking-[0.2em] text-[12px] uppercase mb-5">{tagline}</p>

                    {
                        title && title.length > 0 && (
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a202c] mb-4">
                                {
                                    title.map((block, index) => {
                                        if(block.type === 'normal') {
                                            return <Fragment key={index}>{block.text}</Fragment>
                                        }else {
                                            return (
                                                <span key={index} className="text-[#838383] font-bold">{' ' + block.text + ' '}</span>
                                            )
                                        }
                                    })
                                }
                            </h2>
                        )
                    }

                    {
                        description && (
                            <p className="text-[#3E3E42] mt-3.5 mx-auto text-lg leading-relaxed">{description}</p>
                        )
                    }
                </div>

                <div className="flex items-center justify-center flex-wrap gap-3 mb-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab._key}
                            onClick={() => !tab.comingSoon && setActiveTab(tab)}
                            className={`p-[7px_16px] lg:p-[8px_20px] text-[#1A202C] rounded-full border text-sm font-semibold transition-all duration-300 ${activeTab._key === tab._key
                                ? 'border-[#FFA49B] border-solid challenge-active-tab'
                                : 'border border-dashed border-[#C5BBCC]'
                                } ${tab.comingSoon ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
                        >
                            <span className="flex items-center gap-2">
                                {tab.tabLabel}
                                {!tab.comingSoon && activeTab._key === tab._key && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8080] rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                                        <div className="w-1 h-1 bg-white rounded-full opacity-60" />
                                    </span>
                                )}
                                {tab.comingSoon && (
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
                    <div className="bg-white rounded-3xl md:rounded-[20px] flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab._key}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="flex-grow flex flex-col"
                            >
                                {/* Header */}
                                <div className="pt-6 md:pt-10 pb-4 md:pb-7 px-6 sm:px-8 md:px-14">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-5">
                                        {activeTab?.tabContent?.contentTitle}
                                    </h3>
                                    {
                                        activeTab?.tabContent?.contentDescription && (
                                            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md">
                                                {activeTab?.tabContent?.contentDescription}
                                            </p>
                                        )
                                    }
                                </div>

                                {
                                    !showStatsOnBottom && (
                                        <StatsSection data={activeTab?.tabContent?.stats} onBottom={showStatsOnBottom} />
                                    )
                                }

                                {/* Features */}
                                <div className={`mb-8 md:mb-12 ${showStatsOnBottom ? '' : 'pt-6 md:pt-10'} px-6 sm:px-8 md:px-14 `}>
                                    <h4 className="font-bold text-slate-900 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-2 md:mb-3.5">
                                        Key Features
                                    </h4>
                                    <ul className="space-y-4 sm:space-y-6">
                                        {activeTab?.tabContent?.features?.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-center gap-4 text-slate-600"
                                            >
                                                <span className="text-slate-300">
                                                    <Image 
                                                        src={feature.icon.url ?? ''}
                                                        width={18}
                                                        height={18}
                                                        alt={feature.icon.alt ?? feature.featureTitle}
                                                        unoptimized
                                                    />
                                                </span>
                                                <span className="font-medium text-sm sm:text-[16px]">
                                                    {feature.featureTitle}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {
                                    showStatsOnBottom && (
                                        <StatsSection data={activeTab?.tabContent?.stats} onBottom={showStatsOnBottom}/>
                                    )
                                }

                                {
                                    (activeTab?.tabContent?.primaryButton?.text || activeTab?.tabContent?.secondaryButton?.text) && (
                                         <div className="flex flex-col sm:flex-row gap-4 mt-auto pb-6 md:pb-10 px-6 sm:px-8 md:px-14">
                                            {
                                                activeTab?.tabContent?.primaryButton && (
                                                    <Link href={activeTab?.tabContent?.primaryButton?.internalLink || activeTab?.tabContent?.primaryButton?.externalLink || '#'} target={activeTab?.tabContent?.primaryButton?.externalLink ? '_blank' : '_self'}>
                                                        <button className="w-full sm:w-auto bg-[#121212] text-white px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5">
                                                            {activeTab?.tabContent?.primaryButton?.text}
                                                            {activeTab?.tabContent?.primaryButton?.showIcon !== false ? <ArrowUpRight size={20} /> : null}
                                                        </button>
                                                    </Link>
                                                )
                                            }

                                            {
                                                activeTab?.tabContent?.secondaryButton && (
                                                    <Link href={activeTab?.tabContent?.secondaryButton?.internalLink || activeTab?.tabContent?.secondaryButton?.externalLink || '#'} target={activeTab?.tabContent?.secondaryButton?.externalLink ? '_blank' : '_self'}>
                                                        <button className="w-full cursor-pointer sm:w-auto bg-[#F0F1F0] text-[#2A2730] px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2">
                                                            {activeTab?.tabContent?.secondaryButton?.text}
                                                            {activeTab?.tabContent?.secondaryButton?.showIcon !== false ? <svg fill="none" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg"><path stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M.75 7.867V4.955c0-3.758 2.656-5.274 5.903-3.404l2.519 1.456 2.519 1.456c3.246 1.87 3.246 4.94 0 6.808l-2.519 1.457-2.519 1.456C3.406 16.054.75 14.518.75 10.78V7.867z"/></svg> : null}
                                                        </button>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="bg-white rounded-3xl md:rounded-[20px] relative border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex items-end min-h-[360px] sm:min-h-[480px] lg:min-h-[585px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab._key}
                                initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 1.1, rotate: 1 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                style={{height: '100%'}}
                            >
                                <img
                                    src={activeTab?.tabContent?.image?.url ?? ''}
                                    alt={activeTab?.tabContent?.image?.alt ?? 'Industry Solution Image'}
                                    className="w-auto object-cover h-full drop-shadow-[0_45px_45px_rgba(0,0,0,0.1)]"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {
                    (primaryButton?.text || secondaryButton?.text) && (
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto px-6 sm:px-8 md:px-14 pt-10 md:pt-15.2 pb-10 md:pb-40 justify-center">
                            {
                                primaryButton && (
                                    <Link href={primaryButton?.internalLink || primaryButton?.externalLink || '#'} target={primaryButton?.externalLink ? '_blank' : '_self'}>
                                        <button className="w-full cursor-pointer sm:w-auto bg-[#121212] text-white px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5">
                                            {primaryButton?.text}
                                            {primaryButton?.showIcon !== false ? <ArrowUpRight size={20} /> : null}
                                        </button>
                                    </Link>
                                )
                            }

                            {
                                secondaryButton && (
                                    <Link href={secondaryButton?.internalLink || secondaryButton?.externalLink || '#'} target={secondaryButton?.externalLink ? '_blank' : '_self'}>
                                        <button className="w-full cursor-pointer sm:w-auto bg-[#F0F1F0] text-[#2A2730] px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2">
                                            {secondaryButton?.text}
                                            {secondaryButton?.showIcon !== false ? <svg fill="none" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg"><path stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M.75 7.867V4.955c0-3.758 2.656-5.274 5.903-3.404l2.519 1.456 2.519 1.456c3.246 1.87 3.246 4.94 0 6.808l-2.519 1.457-2.519 1.456C3.406 16.054.75 14.518.75 10.78V7.867z"/></svg> : null}
                                        </button>
                                    </Link>
                                )
                            }
                        </div>
                    )
                }
            </Container>
        </section>
    );
}