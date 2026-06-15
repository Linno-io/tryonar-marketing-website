"use client";
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button, Container } from '../ui';
import {
    IndustrySolutionsSection as IndustrySolutionsSectionProps,
} from '@/lib/types/section';
import Image from 'next/image';
import Link from 'next/link';
import InteractiveFrame from './InteractiveFrame';

const StatsSection = ({ data }: { data?: { label: string; value: string }[] }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="bg-[#F8F8F9] flex flex-col sm:flex-row px-2 md:px-4 py-5 rounded-xl gap-4 sm:gap-0">
            {data.map(({ label, value }, index) => (
                <div
                    key={label}
                    className={`flex items-center pb-4 sm:pb-0 px-0 sm:px-8 relative ${index === 0 ? '' : 'gradient-border'} last:pr-0 first:pl-0`}
                >
                    <div>
                        <div className="text-2xl sm:text-[28px] font-medium text-[#838383] tracking-tight">
                            {value}
                        </div>
                        <div className="text-sm md:text-[16px] text-[#646464]">
                            {label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

function TabMedia({ imageUrl, imageAlt, videoUrl }: { imageUrl: string; imageAlt: string; videoUrl?: string }) {
    const [videoReady, setVideoReady] = useState(false);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoUrl) return;
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVideoSrc(videoUrl);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [videoUrl]);

    return (
        <div ref={containerRef} className="relative w-full">
            <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-contain"
                style={{ transition: 'opacity 0.4s ease', opacity: videoReady ? 0 : 1, position: videoSrc ? 'absolute' : 'relative' }}
            />
            {videoSrc && (
                <>
                    <InteractiveFrame />
                </>
            )}
        </div>
    );
}

export default function IndustryARSection({ data }: { data: IndustrySolutionsSectionProps }) {
    const {
        tagline,
        title,
        description,
        tabs,
        showStatsOnBottom,
        paddingBottom,
        primaryButton,
        secondaryButton
    } = data;

    const [activeTab, setActiveTab] = useState(tabs ? tabs[0] : null);

    if (!tabs || tabs.length === 0 || !activeTab) return null;

    const hasPaddingBottom = paddingBottom !== false;
    const content = activeTab.tabContent;

    return (
        <section className="bg-[#F7F8F9] px-6 min-h-screen flex items-center relative">
            <Container className={`pt-20 md:pt-32 ${hasPaddingBottom ? 'pb-20 md:pb-32' : 'pb-0'}`}>

                {/* Header */}
                <div className="text-center mb-10 md:mb-14">
                    <p className="text-[#8b5cf6] font-bold tracking-[0.2em] text-[12px] uppercase mb-4">{tagline}</p>
                    {title && title.length > 0 && (
                        <h2 className="section-title">
                            {title.map((block, index) => (
                                block.type === 'normal'
                                    ? <Fragment key={index}>{block.text}</Fragment>
                                    : <span key={index} className="text-[#838383] font-bold">{' ' + block.text + ' '}</span>
                            ))}
                        </h2>
                    )}
                    {description && (
                        <p className="text-[#3E3E42] mt-3 mx-auto text-lg leading-relaxed">{description}</p>
                    )}
                </div>

                {/* Tabs */}
                {
                    tabs.length > 1 && (
                        <div className="flex items-center justify-center flex-wrap gap-3 mb-8">
                            {tabs.map((tab) => (
                                <div key={tab._key} className="relative">
                                    {tab.comingSoon && (
                                        <span className="absolute -top-2.5 -right-4/10 -translate-x-1/2 bg-[#3E3E42] text-white text-[9px] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap z-10">
                                            Coming Soon
                                        </span>
                                    )}
                                    <button
                                        onClick={() => !tab.comingSoon && setActiveTab(tab)}
                                        className={`bg-white relative p-[7px_16px] lg:p-[8px_20px] text-[#1A202C] rounded-full border text-sm font-semibold transition-all duration-300 ${
                                            activeTab._key === tab._key
                                                ? 'border-[#FFA49B] border-solid challenge-active-tab'
                                                : 'border border-[#E5E3EA]'
                                        } ${tab.comingSoon ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
                                    >
                                        {tab.tabLabel}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )
                }

                {/* Two cards */}
                <div className="flex flex-col lg:flex-row gap-5">

                    {/* Left — content */}
                    <div key={activeTab._key} className="flex flex-col  lg:w-1/2 p-8 pr-5 md:px-18.5 md:py-22.25 md:pr-5 bg-white rounded-3xl border border-slate-100">
                        <h3 className="text-3xl md:text-[40px] font-bold text-[#1A202C] mb-3">
                            {content?.contentTitle}
                        </h3>
                        {content?.contentDescription && (
                            <p className="text-[#3E3E42] text-[15px] leading-relaxed mb-8.75">
                                {content.contentDescription}
                            </p>
                        )}

                        {/* {!showStatsOnBottom && <StatsSection data={content?.stats} />} */}

                        {content?.features && content.features.length > 0 && (
                            <div>
                                <h4 className="font-bold text-[#1A202C] text-[20px] mb-4.5 font-[Sora] leading-none">
                                    Key Features
                                </h4>
                                <ul className="space-y-4.5">
                                    {content.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-[#4E4955]">
                                            <Image
                                                src={feature.icon.url ?? ''}
                                                width={11}
                                                height={8}
                                                alt={feature.icon.alt ?? feature.featureTitle}
                                                unoptimized
                                                className="shrink-0"
                                            />
                                            <span className="font-medium text-[15px]">{feature.featureTitle}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {showStatsOnBottom && (
                            <div className="mt-6">
                                <StatsSection data={content?.stats} />
                            </div>
                        )}

                        {(content?.primaryButton?.text || content?.secondaryButton?.text) && (
                            <div className="tryon-cta-buttons flex items-center gap-3.5 flex-wrap pt-8">
                                {content?.primaryButton?.text && (
                                    <Button
                                        variant="primary"
                                        href={content.primaryButton.internalLink || content.primaryButton.externalLink || '#'}
                                        target={content.primaryButton.externalLink ? '_blank' : '_self'}
                                        showIcon={content.primaryButton.showIcon !== false}
                                        className='tryon-primary-btn'
                                    >
                                        {content.primaryButton.text}
                                    </Button>
                                )}

                                {content?.secondaryButton?.text && (
                                    <Button
                                        variant="secondary"
                                        href={content.secondaryButton.internalLink || content.secondaryButton.externalLink || '#'}
                                        target={content.secondaryButton.externalLink ? '_blank' : '_self'}
                                        icon=''
                                        showIcon={content.secondaryButton.showIcon !== false}
                                    >
                                        {content.secondaryButton.text}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right — media */}
                    <div key={activeTab._key + '_media'} className="flex-1 flex items-center justify-center bg-white rounded-3xl border border-slate-100 overflow-hidden">
                        <TabMedia
                            imageUrl={content?.image?.url ?? ''}
                            imageAlt={content?.image?.alt ?? 'Industry Solution Image'}
                            videoUrl={content?.video?.url}
                        />
                    </div>
                </div>

                {/* Section-level buttons */}
                {(primaryButton?.text || secondaryButton?.text) && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10 md:pt-14">
                        {primaryButton?.text && (
                            <Link href={primaryButton.internalLink || primaryButton.externalLink || '#'} target={primaryButton.externalLink ? '_blank' : '_self'}>
                                <button className="mx-auto sm:mx-none sm:w-full cursor-pointer sm:w-auto bg-[#121212] text-white px-5 sm:px-9 py-3 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5 text-sm sm:text-base">
                                    {primaryButton.text}
                                    {primaryButton.showIcon !== false && <ArrowUpRight size={20} />}
                                </button>
                            </Link>
                        )}
                        {secondaryButton?.text && (
                            <Link href={secondaryButton.internalLink || secondaryButton.externalLink || '#'} target={secondaryButton.externalLink ? '_blank' : '_self'}>
                                <button className="w-full cursor-pointer sm:w-auto bg-[#F0F1F0] text-[#2A2730] px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2">
                                    {secondaryButton.text}
                                    {secondaryButton.showIcon !== false && (
                                        <svg fill="none" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M.75 7.867V4.955c0-3.758 2.656-5.274 5.903-3.404l2.519 1.456 2.519 1.456c3.246 1.87 3.246 4.94 0 6.808l-2.519 1.457-2.519 1.456C3.406 16.054.75 14.518.75 10.78V7.867z"/>
                                        </svg>
                                    )}
                                </button>
                            </Link>
                        )}
                    </div>
                )}
            </Container>
        </section>
    );
}
