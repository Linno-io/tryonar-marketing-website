"use client";
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Container } from '../ui';
import {
    ProductsDetailsTabSection as ProductsDetailsTabSectionProps,
    ProductDetail,
} from '@/lib/types/section';
import Image from 'next/image';
import Link from 'next/link';

const DEMO_PRODUCTS = [
    {
        name: 'Lipstick',
        description: 'Let shoppers try every shade before they buy. No guesswork, no wrong orders, no returns.',
        features: ['Real-time shade on live camera', 'Matte, satin & glossy finish simulation', 'Switch shades instantly', 'Precision lip boundary detection'],
        demoUrl: 'https://try.tryonar.net/',
        img: '/product-demo/lipstic.webp',
    },
    {
        name: 'Lip Liner',
        description: 'Give customers the perfect pout preview. Define, overline, and blend in real time before a single product ships.',
        features: ['Sub-pixel lip-edge detection', 'Natural over-line simulation', 'Fade & blend shade preview', 'Accurate across all skin tones'],
        demoUrl: 'https://try.tryonar.net/?type=lipliner',
        img: '/product-demo/lip-liner.webp',
    },
    {
        name: 'Eyeliner',
        description: 'From everyday to graphic, let shoppers test every liner look on their own eyes — live, with zero commitment.',
        features: ['Real-time lash-line detection', 'Winged, tightline & graphic presets', 'Adapts to any eye shape', 'Sub-millimeter line accuracy'],
        demoUrl: 'https://try.tryonar.net/?type=eyeliner',
        img: '/product-demo/eyeliner.webp',
    },
    {
        name: 'Eye Shadow',
        description: 'Turn every palette into an instant try-on experience. Shoppers see full looks on their lids before they add to cart.',
        features: ['Multi-zone lid, crease & brow bone', 'Matte, shimmer & glitter finishes', 'Up to 6 shades simultaneously', 'Natural fade & transition rendering'],
        demoUrl: 'https://try.tryonar.net/?type=eyeshadow',
        img: '/product-demo/eyeshadow.webp',
    },
    {
        name: 'Eyebrow',
        description: 'Help customers find their perfect brow shape and shade. AI maps their unique brow structure for a naturally tailored preview.',
        features: ['AI-powered brow shape mapping', 'Natural hair-stroke fill simulation', 'Shape, arch & tail definition', 'Tint shade match for all types'],
        demoUrl: 'https://try.tryonar.net/?type=eyebrow',
        img: '/product-demo/eyebrow.webp',
    },
    {
        name: 'Foundation',
        description: "Eliminate shade guessing forever. AI matches each shopper's skin tone and undertone to the exact foundation they need.",
        features: ['AI skin tone match, 40+ shades', 'Light to full coverage simulation', 'Matte, natural & dewy finishes', 'Undertone detection for exact match'],
        demoUrl: 'https://try.tryonar.net/?type=foundation',
        img: '/product-demo/foundation.webp',
    },
    {
        name: 'Bronzer',
        description: 'Let shoppers sculpt and sun-kiss their look in real time. See exactly how each bronzer lands on their face before buying.',
        features: ['Contour & sun-kissed simulation', 'Cheekbone, temple & nose placement', 'Matte and shimmer bronzer finishes', 'Natural gradient blending'],
        demoUrl: 'https://try.tryonar.net/?type=bronzer',
        img: '/product-demo/bronzer.webp',
    },
    {
        name: 'Blush',
        description: 'From subtle flush to bold drape, shoppers can preview every blush placement and intensity on their own cheeks — instantly.',
        features: ['Real-time cheek flush simulation', 'Cheekbone, nose & draping placement', 'Sheer to intense buildable coverage', 'Works across all skin tones'],
        demoUrl: 'https://try.tryonar.net/?type=blush',
        img: '/product-demo/blush.webp',
    },
    {
        name: 'Highlighter',
        description: 'Give every shopper their glow-up moment. Preview luminosity from barely-there shimmer to full-beam highlight — in real time.',
        features: ['Luminosity on facial high points', "Brow bone, nose bridge & cupid's bow", 'Subtle glow to blinding intensity', 'Shader-based light reflection simulation'],
        demoUrl: 'https://try.tryonar.net/?type=highlighter',
        img: '/product-demo/highlighter.webp',
    },
    {
        name: 'Concealer',
        description: "Help shoppers find the perfect match with confidence. Simulate coverage and shade blend on their actual skin, not a model's.",
        features: ['Under-eye circle coverage simulation', 'Blemish & redness concealing preview', 'Light to full coverage tones', 'Shade-matching AI for seamless blend'],
        demoUrl: 'https://try.tryonar.net/?type=concealer',
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
    contentDescription: p.description,
    image: { url: p.img, alt: p.name },
    features: p.features.map((f) => ({ featureTitle: f, icon: { url: '', alt: '' } })),
    stats: DEMO_STATS,
    primaryButton: { text: 'Tryon', externalLink: p.demoUrl, showIcon: true },
}));

type Section = { _key: string; label: string; product: ProductDetail };

const SECTIONS: Section[] = DEMO_SLIDES.map((slide, i) => ({
    _key: String(i),
    label: slide.productName ?? DEMO_PRODUCTS[i].name,
    product: slide,
}));

const StatsRow = ({ data }: { data?: { label: string; value: string }[] }) => {
    if (!data || data.length === 0) return null;
    return (
        <div className="bg-white border-t border-b border-[#EEEDF2] flex flex-row py-5">
            {data.map(({ label, value }, index) => (
                <div
                    key={label + index}
                    className={`flex-1 flex items-center justify-center text-center px-2 md:px-4 relative ${index === 0 ? '' : 'gradient-border'}`}
                >
                    <div>
                        <div className="text-2xl sm:text-[28px] font-medium text-[#838383] tracking-tight">{value}</div>
                        <div className="text-sm md:text-[16px] text-[#646464]">{label}</div>
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
    const { tagline, title, description } = data;
    const sections = SECTIONS;

    const [activeKey, setActiveKey] = useState<string>(sections[0]?._key ?? '');
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sections.length === 0) return;
        const handleScroll = () => {
            const navH = (navRef.current?.offsetHeight ?? 0) + 20;
            let bestKey = sections[0]._key;
            for (const s of sections) {
                const el = sectionRefs.current.get(s._key);
                if (!el) continue;
                if (el.getBoundingClientRect().top - navH <= 50) bestKey = s._key;
            }
            setActiveKey(bestKey);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollTo = (key: string) => {
        const el = sectionRefs.current.get(key);
        if (!el) return;
        const navH = navRef.current?.offsetHeight ?? 0;
        window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - navH - 16,
            behavior: 'smooth',
        });
    };

    if (sections.length === 0) return null;

    return (
        <section className="bg-[#F7F8F9] relative">
            <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,160,150,0.18),transparent_65%)] blur-3xl z-0" />

            {/* Header */}
            <div className="relative z-10">
                <Container withBorder className="w-full">
                    <div className="text-center pt-16 md:pt-24">
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

            {/* Sticky product nav */}
            <div ref={navRef} className="sticky top-0 z-20 bg-[#F7F8F9]/95 backdrop-blur-sm border-b border-[#EEEDF2]">
                <Container withBorder className="w-full">
                    <div className="flex items-center justify-center flex-wrap gap-3 py-6 md:py-8">
                        {sections.map((s) => (
                            <button
                                key={s._key}
                                onClick={() => scrollTo(s._key)}
                                className={`bg-white relative p-[7px_16px] lg:p-[8px_20px] text-[#1A202C] rounded-full border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                    activeKey === s._key
                                        ? 'border-[#FFA49B] challenge-active-tab'
                                        : 'border-[#E5E3EA]'
                                }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Product sections */}
            <div className="relative z-10 pb-0">
                <Container withBorder className="w-full p-0!">
                    {sections.map((s, idx) => (
                        <div key={s._key}>
                            <div
                                ref={(el) => {
                                    if (el) sectionRefs.current.set(s._key, el);
                                    else sectionRefs.current.delete(s._key);
                                }}
                                className={`flex flex-col lg:flex-row ${idx > 0 ? 'border-t border-[#EEEDF2]' : ''}`}
                            >
                                {/* Left */}
                                <div className="flex flex-col lg:w-[46%] border-b lg:border-b-0 lg:border-r border-[#EEEDF2] px-8 pt-8 pb-9 lg:px-15 lg:pt-10 lg:pb-10.5">
                                    <h3 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-[#1A202C] mb-3 lg:mb-4 leading-tight">
                                        {s.product.contentTitle}
                                    </h3>

                                    {s.product.contentDescription && (
                                        <p className="text-[#3E3E42] text-sm sm:text-[15px] leading-relaxed mb-5 lg:mb-7">{s.product.contentDescription}</p>
                                    )}

                                    {s.product.features && s.product.features.length > 0 && (
                                        <ul className="space-y-4 lg:space-y-5 mb-6 lg:mb-8">
                                            {s.product.features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-[#3E3E42]">
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

                                    {s.product.stats && s.product.stats.length > 0 && (
                                        <div className="-mx-8 lg:-mx-15">
                                            <StatsRow data={s.product.stats} />
                                        </div>
                                    )}

                                    <CtaButtons product={s.product} />
                                </div>

                                {/* Right */}
                                <div
                                    className="bg-white flex-1 relative overflow-hidden min-h-[320px] lg:min-h-[500px]"
                                    style={{
                                        backgroundImage: "url('/product-demo/product-bg.webp')",
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'right top',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    <div className="absolute inset-0 flex items-end justify-center px-8 pt-6">
                                        {s.product.video?.url ? (
                                            <video
                                                src={s.product.video.url}
                                                poster={s.product.image?.url}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="max-h-full w-auto object-contain object-bottom"
                                            />
                                        ) : (
                                            <img
                                                src={s.product.image?.url ?? ''}
                                                alt={s.product.image?.alt ?? s.product.contentTitle ?? 'Product'}
                                                className="max-h-full w-auto object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.1)]"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {
                                idx < sections.length - 1 && (
                                    <div className='bg-[#F2F2F2] h-10 md:h-17.5 w-full'></div>
                                )
                            }
                        </div>
                    ))}
                </Container>
            </div>
        </section>
    );
}
