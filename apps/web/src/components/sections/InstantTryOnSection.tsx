"use client";
import React, { Fragment, useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '../ui';
import { InstantTryOnSection as InstantTryOnSectionProps } from '@/lib/types/section';

function SectionMedia({
    imageUrl,
    imageAlt,
    videoUrl,
}: {
    imageUrl: string;
    imageAlt: string;
    videoUrl?: string;
}) {
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

    const handleVideoCanPlay = () => {
        setVideoReady(true);
        videoRef.current?.play().catch(() => {});
    };

    return (
        <div ref={containerRef} className="relative w-full flex items-center justify-center">
            <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-auto object-contain max-h-[580px]"
                style={{
                    transition: 'opacity 0.4s ease',
                    opacity: videoReady ? 0 : 1,
                    position: videoSrc ? 'absolute' : 'relative',
                    inset: videoSrc ? 0 : undefined,
                }}
            />
            {videoSrc && (
                <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={imageUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onCanPlay={handleVideoCanPlay}
                    className="w-full h-auto object-contain max-h-[580px]"
                    style={{ transition: 'opacity 0.4s ease', opacity: videoReady ? 1 : 0 }}
                />
            )}
        </div>
    );
}

const hLine = (
    <div
        className="w-full"
        style={{ height: '1px', background: 'linear-gradient(90deg, #00020B 0%, #89787D 50%, #00020B 100%)' }}
    />
);

export default function InstantTryOnSection({ data }: { data: InstantTryOnSectionProps }) {
    const {
        title,
        description,
        stats,
        contentTitle,
        contentDescription,
        sectionImage,
        sectionVideo,
        primaryButton,
        secondaryButton,
    } = data;

    return (
        <section className="bg-[#00020B] relative overflow-hidden">

            {/* Top pink glow */}
            <div
                className="absolute top-0 left-1/2 pointer-events-none"
                style={{
                    transform: 'translateX(-50%)',
                    width: '988px',
                    height: '600px',
                    borderRadius: '988.455px',
                    background: 'rgba(255, 164, 155, 0.40)',
                    filter: 'blur(200px)',
                    zIndex: 0,
                    top: '-400px'
                }}
            />

            {/* ── PARTIAL BORDER ZONE: header + stats only ── */}
            <Container className="instant-tryon-container relative z-10" padding={false}>

                {/* Header */}
                <div className="max-w-[840px] mx-auto text-center pt-16 md:pt-24 pb-10 md:pb-19 px-5">
                    {title && title.length > 0 && (
                        <h2
                            className="font-bold text-white mb-4 text-3xl md:text-[42px] lg:text-[52px] leading-tight"
                        >
                            {title.map((block, i) =>
                                block.type === 'normal'
                                    ? <Fragment key={i}>{block.text}</Fragment>
                                    : <span key={i} className="text-[#998188]">{' '}{block.text}{' '}</span>
                            )}
                        </h2>
                    )}
                    {description && (
                        <p className="text-[#E7E5EA] text-sm md:text-base lg:text-lg leading-relaxed mt-3">
                            {description}
                        </p>
                    )}
                </div>


                {/* Stats row — always horizontal */}
                {stats && stats.length > 0 && (
                    <div className="flex flex-wrap flex-row bg-[#89787D] pt-px ">
                        {stats.map((stat, i) => (
                            <div
                                key={stat._key ?? i}
                                className={`flex-1 min-w-0 overflow-hidden bg-[#00020B] flex flex-col items-center justify-center text-center py-9 md:py-12 px-3 relative instant-tryon-stat-divider ${i === 0 ? 'rounded-tr-3xl' : i === 1 ? 'rounded-t-3xl' : 'rounded-tl-3xl'}`}
                            >
                                <span
                                    className="font-bold text-white text-2xl sm:text-4xl md:text-5xl lg:text-[64px] leading-none tracking-tight whitespace-nowrap"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {stat.value}
                                </span>
                                <span className="mt-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-[#89787D] uppercase tracking-[0.05em] sm:tracking-widest md:tracking-[0.18em] leading-tight text-center">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

            </Container>

            {/* ── NO BORDER ZONE: content + image ── */}
            <Container className="relative z-10 mt-10 sm:mt-16 md:mt-20 lg:mt-20" padding={false}>
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-16 py-10 md:py-16 lg:py-20 px-5">

                    {/* Left text */}
                    <div className="flex-1 lg:max-w-[500px]">
                        {contentTitle && contentTitle.length > 0 && (
                            <h3
                                className="font-bold text-white mb-5 text-[28px] md:text-[38px] lg:text-[48px] leading-tight"
                            >
                                {contentTitle.map((block, i) =>
                                    block.type === 'normal'
                                        ? <Fragment key={i}>{block.text}</Fragment>
                                        : <span key={i} className="text-[#998188]">{block.text}</span>
                                )}
                            </h3>
                        )}
                        {contentDescription && (
                            <p className="text-[#E7E5EA] text-sm md:text-[15px] leading-relaxed mb-8 max-w-md">
                                {contentDescription}
                            </p>
                        )}

                        {(primaryButton?.text || secondaryButton?.text) && (
                            <div className="flex flex-col sm:flex-row gap-3">
                                {primaryButton?.text && (
                                    <Link
                                        href={primaryButton.internalLink || primaryButton.externalLink || '#'}
                                        target={primaryButton.externalLink ? '_blank' : '_self'}
                                    >
                                        <button className="w-full sm:w-auto bg-[#F0F1F0] text-[#0D0D0D] px-6 py-3 rounded-xl font-semibold text-sm md:text-[15px] flex items-center justify-center gap-2 hover:bg-white/90 transition-colors cursor-pointer">
                                            {primaryButton.text}
                                            {primaryButton.showIcon !== false && <ArrowUpRight size={15} />}
                                        </button>
                                    </Link>
                                )}
                                {secondaryButton?.text && (
                                    <Link
                                        href={secondaryButton.internalLink || secondaryButton.externalLink || '#'}
                                        target={secondaryButton.externalLink ? '_blank' : '_self'}
                                    >
                                        <button className="w-full sm:w-auto bg-[#202020] text-white px-6 py-3 rounded-xl font-semibold text-sm md:text-[15px] flex items-center justify-center gap-2 border border-[#202020] hover:bg-[#1F1E2A] transition-colors cursor-pointer">
                                            {secondaryButton.text}
                                            {secondaryButton.showIcon !== false && (
                                                <svg fill="none" width="14" height="15" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M.75 7.867V4.955c0-3.758 2.656-5.274 5.903-3.404l2.519 1.456 2.519 1.456c3.246 1.87 3.246 4.94 0 6.808l-2.519 1.457-2.519 1.456C3.406 16.054.75 14.518.75 10.78V7.867z" />
                                                </svg>
                                            )}
                                        </button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right image */}
                    <div className="flex-1 flex items-center justify-center lg:justify-end w-full">
                        {sectionImage?.url && (
                            <SectionMedia
                                imageUrl={sectionImage.url}
                                imageAlt={sectionImage.alt ?? 'Try-On AR'}
                                videoUrl={sectionVideo?.url}
                            />
                        )}
                    </div>

                </div>
            </Container>

        </section>
    );
}
