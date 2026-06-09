"use client";
import React, { Fragment, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Container } from '../ui';
import {
    ProductsDetailsTabSection as ProductsDetailsTabSectionProps,
    ProductDetail,
} from '@/lib/types/section';
import Image from 'next/image';
import Link from 'next/link';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const pad = (n: number) => String(n).padStart(2, '0');

const DEMO_PRODUCTS = [
    {
        name: 'Lipstick',
        features: ['Real-time shade on live camera', 'Matte, satin & glossy finish simulation', 'Switch shades instantly', 'Precision lip boundary detection'],
        demoUrl: 'https://trystaging.tryonar.net/',
        img: '/product-demo/lipstic.webp',
    },
    {
        name: 'Lip Liner',
        features: ['Sub-pixel lip-edge detection', 'Natural over-line simulation', 'Fade & blend shade preview', 'Accurate across all skin tones'],
        demoUrl: 'https://trystaging.tryonar.net/?type=lipliner',
        img: '/product-demo/lip-liner.webp',
    },
    {
        name: 'Eyeliner',
        features: ['Real-time lash-line detection', 'Winged, tightline & graphic presets', 'Adapts to any eye shape', 'Sub-millimeter line accuracy'],
        demoUrl: 'https://trystaging.tryonar.net/?type=eyeliner',
        img: '/product-demo/eyeliner.webp',
    },
    {
        name: 'Eye Shadow',
        features: ['Multi-zone lid, crease & brow bone', 'Matte, shimmer & glitter finishes', 'Up to 6 shades simultaneously', 'Natural fade & transition rendering'],
        demoUrl: 'https://trystaging.tryonar.net/?type=eyeshadow',
        img: '/product-demo/eyeshadow.webp',
    },
    {
        name: 'Eyebrow',
        features: ['AI-powered brow shape mapping', 'Natural hair-stroke fill simulation', 'Shape, arch & tail definition', 'Tint shade match for all types'],
        demoUrl: 'https://trystaging.tryonar.net/?type=eyebrow',
        img: '/product-demo/eyebrow.webp',
    },
    {
        name: 'Foundation',
        features: ['AI skin tone match, 40+ shades', 'Light to full coverage simulation', 'Matte, natural & dewy finishes', 'Undertone detection for exact match'],
        demoUrl: 'https://trystaging.tryonar.net/?type=foundation',
        img: '/product-demo/foundation.webp',
    },
    {
        name: 'Bronzer',
        features: ['Contour & sun-kissed simulation', 'Cheekbone, temple & nose placement', 'Matte and shimmer bronzer finishes', 'Natural gradient blending'],
        demoUrl: 'https://trystaging.tryonar.net/?type=bronzer',
        img: '/product-demo/bronzer.webp',
    },
    {
        name: 'Blush',
        features: ['Real-time cheek flush simulation', 'Cheekbone, nose & draping placement', 'Sheer to intense buildable coverage', 'Works across all skin tones'],
        demoUrl: 'https://trystaging.tryonar.net/?type=blush',
        img: '/product-demo/blush.webp',
    },
    {
        name: 'Highlighter',
        features: ['Luminosity on facial high points', "Brow bone, nose bridge & cupid's bow", 'Subtle glow to blinding intensity', 'Shader-based light reflection simulation'],
        demoUrl: 'https://trystaging.tryonar.net/?type=highlighter',
        img: '/product-demo/highlighter.webp',
    },
    {
        name: 'Concealer',
        features: ['Under-eye circle coverage simulation', 'Blemish & redness concealing preview', 'Light to full coverage tones', 'Shade-matching AI for seamless blend'],
        demoUrl: 'https://trystaging.tryonar.net/?type=concealer',
        img: '/product-demo/concealer.webp',
    },
];

const DEMO_STATS = [
    { value: '+28%', label: 'Conversion' },
    { value: '-24%', label: 'Fewer returns' },
    { value: '96%', label: 'Accuracy' },
];

const DEMO_SLIDES: ProductDetail[] = DEMO_PRODUCTS.map((p) => ({
    productName: p.name,
    contentTitle: p.name,
    image: { url: p.img, alt: p.name },
    features: p.features.map((f) => ({ featureTitle: f, icon: { url: '', alt: '' } })),
    stats: DEMO_STATS,
    primaryButton: { text: 'Try It Yourself', externalLink: p.demoUrl, showIcon: true },
}));

function getSlides(tab: ProductsDetailsTabSectionProps['tabs'][number]): ProductDetail[] {
    if (tab.products && tab.products.length > 0) return tab.products;
    if (DEMO_SLIDES.length > 0) return DEMO_SLIDES;
    if (tab.tabContent) return [{ ...tab.tabContent, productName: tab.tabContent.contentTitle }];
    return [];
}

const StatsRow = ({ data }: { data?: { label: string; value: string }[] }) => {
    if (!data || data.length === 0) return null;
    return (
        <div className="bg-white border-t border-b border-[#EEEDF2] flex flex-row py-5">
            {data.map(({ label, value }, index) => (
                <div
                    key={label + index}
                    className={`flex-1 flex items-center justify-center text-center px-4 relative ${index === 0 ? '' : 'gradient-border'}`}
                >
                    <div>
                        <div className="text-2xl sm:text-[28px] font-medium text-[#838383] tracking-tight">{value}</div>
                        <div className="text-[16px] text-[#646464]">{label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

function CtaButtons({ product }: { product: ProductDetail }) {
    if (!product.primaryButton?.text && !product.secondaryButton?.text) return null;
    return (
        <div className="flex flex-col sm:flex-row gap-3 pt-7 sm:pt-8">
            {product.primaryButton?.text && (
                <Link
                    href={product.primaryButton.internalLink || product.primaryButton.externalLink || '#'}
                    target={product.primaryButton.externalLink ? '_blank' : '_self'}
                >
                    <button className="cursor-pointer bg-[#121212] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-[14px] font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_8px_24px_rgba(0,0,0,0.18)] text-sm sm:text-[15px]">
                        {product.primaryButton.text}
                        {product.primaryButton.showIcon !== false && <ArrowUpRight size={18} />}
                    </button>
                </Link>
            )}
            {product.secondaryButton?.text && (
                <Link
                    href={product.secondaryButton.internalLink || product.secondaryButton.externalLink || '#'}
                    target={product.secondaryButton.externalLink ? '_blank' : '_self'}
                >
                    <button className="cursor-pointer bg-[#F0F1F0] text-[#2A2730] px-8 py-4 rounded-[14px] font-bold flex items-center gap-2 text-[15px]">
                        {product.secondaryButton.text}
                    </button>
                </Link>
            )}
        </div>
    );
}

export default function ProductsDetailsTab({ data }: { data: ProductsDetailsTabSectionProps }) {
    const { tagline, title, description, tabs } = data;

    const firstSelectable = tabs?.find((t) => !t.comingSoon) ?? (tabs?.[0] ?? null);
    const [activeTab, setActiveTab] = useState(firstSelectable);
    const [index, setIndex] = useState(0);
    const [pinned, setPinned] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const apply = () => setPinned(mq.matches);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    const slides = activeTab ? getSlides(activeTab) : [];
    const total = slides.length;
    const safeIndex = clamp(index, 0, Math.max(total - 1, 0));
    const product = slides[safeIndex];

    // Scroll position → slide index
    useEffect(() => {
        if (!pinned || total <= 1) return;
        const track = trackRef.current;
        if (!track) return;

        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const vh = window.innerHeight;
                const scrollable = track.offsetHeight - vh;
                if (scrollable <= 0) return;
                const scrolled = clamp(-track.getBoundingClientRect().top, 0, scrollable);
                const sectionSize = scrollable / Math.max(total - 1, 1);
                const next = clamp(Math.round(scrolled / sectionSize), 0, total - 1);
                setIndex((prev) => (prev === next ? prev : next));
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => {
            window.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(raf);
        };
    }, [pinned, total, activeTab?._key]);

    // Arrow click → scroll to slide band (or set index on mobile)
    const goTo = useCallback(
        (target: number) => {
            const next = clamp(target, 0, total - 1);
            if (pinned && total > 1 && trackRef.current) {
                const track = trackRef.current;
                const vh = window.innerHeight;
                const scrollable = track.offsetHeight - vh;
                // Absolute document top of track (works regardless of offset parent)
                const trackDocTop = track.getBoundingClientRect().top + window.scrollY;
                const sectionSize = scrollable / Math.max(total - 1, 1);
                window.scrollTo({ top: trackDocTop + next * sectionSize, behavior: 'smooth' });
            } else {
                setIndex(next);
            }
        },
        [pinned, total]
    );

    const selectTab = useCallback(
        (tab: ProductsDetailsTabSectionProps['tabs'][number]) => {
            if (tab.comingSoon || tab._key === activeTab?._key) return;
            setActiveTab(tab);
            setIndex(0);
            if (pinned && trackRef.current) {
                const trackDocTop = trackRef.current.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: trackDocTop, behavior: 'smooth' });
            }
        },
        [activeTab?._key, pinned]
    );

    if (!tabs || tabs.length === 0 || !activeTab || total === 0 || !product) return null;

    const progress = ((safeIndex + 1) / total) * 100;
    const isPinned = pinned && total > 1;

    return (
        <section className="bg-[#F7F8F9] relative">
            {/* Pink glow — no overflow-hidden on section (would kill sticky) */}
            <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,160,150,0.18),transparent_65%)] blur-3xl z-0" />

            {/* ── Header + Tabs — scroll normally, not part of sticky track ── */}
            <div className="relative z-10">
                <Container withBorder className="w-full">
                    <div className="text-center pt-16 md:pt-24 pb-10 lg:pb-12 shrink-0">
                        <p className="text-[#8b5cf6] font-bold tracking-[0.2em] text-[12px] uppercase mb-3 lg:mb-4">{tagline}</p>
                        {title && title.length > 0 && (
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a202c] mb-2 lg:mb-3">
                                {title.map((block, i) =>
                                    block.type === 'normal' ? (
                                        <Fragment key={i}>{block.text}</Fragment>
                                    ) : (
                                        <span key={i} className="text-[#838383] font-bold">{' ' + block.text + ' '}</span>
                                    )
                                )}
                            </h2>
                        )}
                        {description && <p className="text-[#3E3E42] mx-auto text-base lg:text-lg leading-relaxed">{description}</p>}
                    </div>

                </Container>
            </div>

            {/* ── Scroll track: products row + pagination only ── */}
            <div
                ref={trackRef}
                className="relative z-10"
                style={isPinned ? { height: `${total * 50}vh` } : undefined}
            >
                <div className={isPinned ? 'sticky top-0 h-screen overflow-visible' : ''}>
                    {/* withBorder adds the visible left/right container borders */}
                    <Container withBorder className={`w-full ${isPinned ? 'h-full overflow-auto' : ''}`}>
                        <div className={`flex flex-col ${isPinned ? 'h-full pt-5 lg:pt-6' : 'pb-16 md:pb-24'}`}>

                            {/* ── Tabs ── */}
                            <div className="flex items-center justify-center flex-wrap gap-3 mb-5 lg:mb-6 shrink-0">
                                {tabs.map((tab) => (
                                    <div key={tab._key} className="relative">
                                        {tab.comingSoon && (
                                            <span className="absolute -top-2.5 -right-4/10 -translate-x-1/2 bg-[#3E3E42] text-white text-[9px] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap z-10">
                                                Coming Soon
                                            </span>
                                        )}
                                        <button
                                            onClick={() => selectTab(tab)}
                                            className={`bg-white relative p-[7px_16px] lg:p-[8px_20px] text-[#1A202C] rounded-full border text-sm font-semibold transition-all duration-300 ${
                                                activeTab._key === tab._key
                                                    ? 'border-[#FFA49B] challenge-active-tab'
                                                    : 'border-[#E5E3EA]'
                                            } ${tab.comingSoon ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
                                        >
                                            {tab.tabLabel}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* ── Products row: border top+bottom, no horizontal padding, no gap ── */}
                            <div className={`-mx-2.5 sm:-mx-3 border-t border-b border-[#EEEDF2] flex flex-col lg:flex-row overflow-visible ${isPinned ? 'flex-1 min-h-auto' : ''}`}>

                                {/* LEFT — container stable for layout; content cross-fades */}
                                <div className="flex flex-col lg:w-[46%] min-h-0 border-b lg:border-b-0 lg:border-r border-[#EEEDF2] overflow-hidden px-8 py-8 lg:px-15 lg:py-10">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`${activeTab._key}-${safeIndex}-text`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25, ease: 'easeOut' }}
                                            className="flex flex-col flex-1 min-h-0"
                                        >
                                            <h3 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-[#1A202C] mb-5 lg:mb-7 leading-tight">
                                                {product.contentTitle}
                                            </h3>

                                            {product.features && product.features.length > 0 && (
                                                <ul className="space-y-4 lg:space-y-5 mb-6 lg:mb-8">
                                                    {product.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-center gap-3 text-[#3E3E42]">
                                                            {feature.icon?.url ? (
                                                                <Image
                                                                    src={feature.icon.url}
                                                                    width={16}
                                                                    height={16}
                                                                    alt={feature.icon.alt ?? feature.featureTitle}
                                                                    unoptimized
                                                                    className="shrink-0"
                                                                />
                                                            ) : (
                                                                <Check size={15} className="shrink-0 text-slate-400" strokeWidth={2.5} />
                                                            )}
                                                            <span className="font-medium text-sm sm:text-[15px]">{feature.featureTitle}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {product.stats && product.stats.length > 0 && (
                                                <div className="-mx-8 lg:-mx-15">
                                                    <StatsRow data={product.stats} />
                                                </div>
                                            )}

                                            <CtaButtons product={product} />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* RIGHT — white, no border-radius, dots bg, no extra border */}
                                <div
                                    className="bg-white flex-1 relative overflow-hidden min-h-[320px] lg:min-h-0"
                                    style={{ backgroundImage: "url('/product-demo/product-bg.webp')", backgroundSize: 'cover', backgroundPosition: 'right top', backgroundRepeat: 'no-repeat' }}
                                >
                                    <AnimatePresence>
                                        <motion.div
                                            key={`${activeTab._key}-${safeIndex}-media`}
                                            initial={{ opacity: 0, scale: 0.97 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.03 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute inset-0 flex items-end justify-center px-8 pt-6"
                                        >
                                            {product.video?.url ? (
                                                <video
                                                    src={product.video.url}
                                                    poster={product.image?.url}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className="max-h-full w-auto object-contain object-bottom"
                                                />
                                            ) : (
                                                <img
                                                    src={product.image?.url ?? ''}
                                                    alt={product.image?.alt ?? product.contentTitle ?? 'Product'}
                                                    className="max-h-full w-auto object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.1)]"
                                                />
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* ── Pagination bar ── */}
                            <div className="flex items-center gap-3 sm:gap-5 shrink-0 mt-4 lg:mt-6 pb-4 lg:pb-6">
                                <span className="text-xs sm:text-[13px] text-[#9A9A9A] whitespace-nowrap tracking-wide">
                                    {pad(safeIndex + 1)}
                                    <span className="mx-1.5 text-[#C9C9C9]">•</span>
                                    <span className="text-[#5B5B5B] font-medium">{product.productName ?? product.contentTitle}</span>
                                </span>

                                <div className="flex-1 h-px bg-[#E5E3EA] relative">
                                    <div
                                        className="absolute left-0 top-0 h-px bg-[#1A202C] transition-[width] duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <span className="text-xs sm:text-[13px] text-[#9A9A9A] whitespace-nowrap">
                                    {pad(safeIndex + 1)}/{pad(total)}
                                </span>

                                <div className="flex items-center gap-2">
                                    <button
                                        aria-label="Previous product"
                                        onClick={() => goTo(safeIndex - 1)}
                                        disabled={safeIndex === 0}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E3EA] bg-white text-[#1A202C] transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#FFA49B] cursor-pointer"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        aria-label="Next product"
                                        onClick={() => goTo(safeIndex + 1)}
                                        disabled={safeIndex === total - 1}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border border-[#E5E3EA] bg-white text-[#1A202C] transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#FFA49B] cursor-pointer"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Container>
                </div>
            </div>
        </section>
    );
}
