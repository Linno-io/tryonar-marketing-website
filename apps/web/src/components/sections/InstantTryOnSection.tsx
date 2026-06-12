"use client";
import React, { Fragment, useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button, Container } from '../ui';
import { InstantTryOnSection as InstantTryOnSectionProps } from '@/lib/types/section';
import Image from 'next/image';

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
        <div ref={containerRef} className="relative w-full flex items-center justify-center min-[1199px]:justify-end">
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
                <div className='relative min-[1280px]:mr-12'>
                    <Image
                        src="/makeup.webp"
                        width={187}
                        height={227}
                        alt='Makeup image'
                        loading="lazy"
                        className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-36.75 xl:-left-42.5 w-40 xl:w-46.75 h-auto pointer-events-none z-10"
                    />
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        poster={imageUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onCanPlay={handleVideoCanPlay}
                        className="w-full h-auto max-w-full sm:max-w-100 md:max-w-112.5 lg:w-123.25 lg:h-115.25 object-cover rounded-[20px] sm:rounded-[30px]"
                        style={{ transition: 'opacity 0.4s ease', opacity: videoReady ? 1 : 0 }}
                    />

                    <Image
                        src="/bottom-image-updated.webp"
                        width={300}
                        height={100}
                        alt='Bottom image'
                        loading="lazy"
                        className="hidden sm:block absolute bottom-13 md:bottom-10 lg:bottom-15 right-4/10 lg:right-12.5 w-45 lg:w-75 h-auto pointer-events-none z-10"
                    />
                </div>
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
                                    className="font-medium text-white text-2xl sm:text-4xl md:text-5xl lg:text-[64px] leading-none tracking-tight whitespace-nowrap"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {stat.value}
                                </span>
                                <span className="mt-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-base text-[#e7e5ea] tracking-[0.16px] leading-tight text-center">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

            </Container>

            {/* ── NO BORDER ZONE: content + image ── */}
            <Container className="relative z-10 mt-0 sm:mt-4 md:mt-8 lg:mt-8" padding={false}>
                <div className="flex flex-col min-[1280px]:flex-row items-center gap-10 md:gap-12 lg:gap-16 py-10 md:py-16 lg:py-20 px-5">

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
                            <p className="text-[#E7E5EA] text-base md:text-[18px] leading-relaxed mb-8 max-w-md">
                                {contentDescription}
                            </p>
                        )}

                        {(primaryButton?.text || secondaryButton?.text) && (
                            <div className="tryon-cta-buttons flex items-center gap-3.5 flex-wrap">
                                {primaryButton?.text && (
                                    <Button
                                        variant="primary_ghost"
                                        href={primaryButton.internalLink || primaryButton.externalLink || '#'}
                                        target={primaryButton.externalLink ? '_blank' : '_self'}
                                        showIcon={primaryButton.showIcon !== false}
                                        className='tryon-primary-btn'
                                    >
                                        {primaryButton.text}
                                    </Button>
                                )}

                                {secondaryButton?.text && (
                                    <Button
                                        variant="secondary_ghost"
                                        href={secondaryButton.internalLink || secondaryButton.externalLink || '#'}
                                        target={secondaryButton.externalLink ? '_blank' : '_self'}
                                        icon=''
                                        showIcon={secondaryButton.showIcon !== false}
                                    >
                                        {secondaryButton.text}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right image */}
                    <div className="flex-1 flex items-center justify-center min-[1199px]:justify-end w-full">
                        {sectionImage?.url && (
                            <SectionMedia
                                imageUrl={sectionImage.url}
                                imageAlt={sectionImage.alt ?? 'Try-On AR'}
                                videoUrl={'https://cdn.sanity.io/files/90a20xmm/production/e5b884178f5f3f89ec40ce5e1422193bbc7f6ba3.mp4'}
                            />
                        )}
                    </div>

                </div>
            </Container>

        </section>
    );
}
