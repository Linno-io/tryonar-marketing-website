"use client";
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '../ui';
import {
    ProductsDetailsTabSection as ProductsDetailsTabSectionProps,
} from '@/lib/types/section';
import Link from 'next/link';
import Image from 'next/image';
import ProductTryOnFrame from './ProductTryOnFrame';

const StatsSection = (props: { data?: { label: string; value: string }[] }) => {
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

export default function ProductsDetailsTab({data} : {data: ProductsDetailsTabSectionProps}) {
    const {
        tagline,
        title,
        description,
        tabs,
        showStatsOnBottom,
        primaryButton,
        secondaryButton
    } = data;

    // Scroll-pinned switching: the section pins while scrolling and the active
    // product advances with scroll progress. Manual tab clicks also work and
    // scroll to the matching position. Disabled below the lg breakpoint, where
    // the section behaves as plain manual tabs.
    const wrapRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(0);
    const count = tabs?.length ?? 0;

    const isDesktop = useCallback(() => typeof window !== 'undefined' && window.innerWidth >= 1024, []);

    useEffect(() => {
        if (count === 0) return;
        const onScroll = () => {
            const el = wrapRef.current;
            if (!el || !isDesktop()) return;
            const total = el.offsetHeight - window.innerHeight;
            const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 0));
            const progress = total > 0 ? scrolled / total : 0;
            const next = Math.min(count - 1, Math.floor(progress * count));
            setIndex(prev => (prev === next ? prev : next));
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [count, isDesktop]);

    const goTo = useCallback((i: number) => {
        setIndex(i);
        const el = wrapRef.current;
        if (!el || !isDesktop()) return;
        const total = el.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        const target = el.offsetTop + ((i + 0.5) / count) * total;
        window.scrollTo({ top: target, behavior: 'smooth' });
    }, [count, isDesktop]);

    if(!tabs || tabs.length === 0) return null;

    const activeTab = tabs[Math.min(index, tabs.length - 1)];

    return (
        <section
            ref={wrapRef}
            className="bg-[#F7F8F9] relative overflow-hidden lg:[height:var(--pin-h)]"
            style={{ ['--pin-h' as string]: `${count * 100}vh` }}
        >
            <div className="lg:sticky lg:top-0 lg:h-screen flex items-center px-6">
            <Container className='pt-28 lg:pt-32 pb-16'>
                <div className="text-center mb-12">
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
                    {tabs.map((tab, i) => (
                        <div key={tab._key} className="relative">
                            {tab.comingSoon && (
                                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#3E3E42] text-white text-[9px] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap z-10">
                                    Coming Soon
                                </span>
                            )}
                            <button
                                onClick={() => goTo(i)}
                                className={`bg-white relative p-[7px_16px] lg:p-[8px_20px] text-[#1A202C] rounded-full border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                    i === index
                                        ? 'border-[#FFA49B] border-solid challenge-active-tab'
                                        : 'border border-[#E5E3EA]'
                                } ${tab.comingSoon ? 'opacity-50' : ''}`}
                            >
                                {tab.tabLabel}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
                    {/* LEFT COLUMN */}
                    <div className="bg-white rounded-3xl md:rounded-[20px] flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                            <div
                                key={activeTab._key}
                                className="flex-grow flex flex-col toa-tab-fade"
                            >
                                {/* Header */}
                                <div className="pt-6 md:pt-10 pb-4 md:pb-7 px-6 sm:px-8 md:px-14">
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-5">
                                        {activeTab?.comingSoon && !activeTab?.tabContent?.contentTitle
                                            ? `${activeTab?.tabLabel} try-on`
                                            : activeTab?.tabContent?.contentTitle}
                                    </h3>
                                    {
                                        activeTab?.tabContent?.contentDescription ? (
                                            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md">
                                                {activeTab?.tabContent?.contentDescription}
                                            </p>
                                        ) : activeTab?.comingSoon ? (
                                            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md">
                                                {`AR try-on for ${activeTab?.tabLabel?.toLowerCase()} is coming soon.`}
                                            </p>
                                        ) : null
                                    }
                                </div>

                                {
                                    !showStatsOnBottom && (
                                        <StatsSection data={activeTab?.tabContent?.stats} />
                                    )
                                }

                                {/* Features */}
                                {
                                    activeTab?.tabContent?.features && activeTab.tabContent.features.length > 0 && (
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
                                    )
                                }

                                {
                                    showStatsOnBottom && (
                                        <StatsSection data={activeTab?.tabContent?.stats}/>
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
                                                activeTab?.tabContent?.secondaryButton?.text && (
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
                            </div>
                    </div>

                    {/* RIGHT COLUMN — interactive try-on frame per product */}
                    <div className="bg-white rounded-3xl md:rounded-[20px] relative border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex items-center justify-center min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] p-6">
                            <div
                                key={activeTab._key}
                                className="w-full flex items-center justify-center toa-tab-fade"
                            >
                                {activeTab?.comingSoon ? (
                                    <div className="flex flex-col items-center justify-center gap-4 text-center px-6">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EEF7] text-2xl">🔒</div>
                                        <p className="text-xl font-bold text-slate-900">{activeTab?.tabLabel} try-on</p>
                                        <p className="text-sm text-slate-500 max-w-xs">We&apos;re building AR try-on for {activeTab?.tabLabel?.toLowerCase()}. Stay tuned.</p>
                                        <span className="rounded-full bg-[#3E3E42] text-white text-[11px] px-3 py-1 font-medium">Coming Soon</span>
                                    </div>
                                ) : (
                                    <ProductTryOnFrame autoPlay />
                                )}
                            </div>
                    </div>
                </div>

                {
                    (primaryButton?.text || secondaryButton?.text) && (
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto px-6 sm:px-8 md:px-14 pt-10 md:pt-12 justify-center">
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
                                secondaryButton?.text && (
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
            </div>
            <style jsx>{`
                .toa-tab-fade {
                    animation: toaTabFade 0.4s ease-out;
                }
                @keyframes toaTabFade {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
