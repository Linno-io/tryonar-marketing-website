'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { BeautyFeatureGridSection as BeautyFeatureGridSectionProps } from '@/lib/types/section'
import { SanityImage, SanityVideo } from '@/lib/types/siteSettings'

interface SectionTitle {
    text: string
    type: 'highlight' | 'normal'
}

interface FeatureCard {
    _key: string
    cardTitle: string
    description: string
    image: SanityImage
    video?: SanityVideo
    extraImage?: SanityImage
    cardButton?: {
        text?: string
        internalLink?: string
        externalLink?: string
    }
}

function VideoCard({ card, shouldLoad, index }: { card: FeatureCard; shouldLoad: boolean; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!shouldLoad || !card.video?.url || !videoRef.current) return
        const video = videoRef.current
        video.src = card.video.url
        video.load()
        video.play().catch(() => {})
    }, [shouldLoad, card.video?.url])

    return (
        <div className="bg-white rounded-2xl border border-[#EEEDF2] p-1.25">
            <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: '403/302' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={card.image?.url}
                    alt={card.image?.alt || card.cardTitle}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                {card.video?.url && (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                        ref={videoRef}
                        poster={card.image?.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                {card.extraImage?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={card.extraImage.url}
                        alt={card.extraImage.alt || ''}
                        className={`bfg-extra-img-${index}`}
                    />
                )}
            </div>
            <div className="px-3 pt-3 pb-3.5">
                <h3
                    className="mb-1.5"
                    style={{
                        color: '#1E1E1E',
                        fontFamily: '"Circular Std", sans-serif',
                        fontSize: '24px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        letterSpacing: '-0.48px',
                    }}
                >
                    {card.cardTitle}
                </h3>
                <p
                    style={{
                        color: '#3E3E42',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px',
                    }}
                >
                    {card.description}
                </p>
                {card.cardButton?.text && (
                    <Link
                        href={card.cardButton.internalLink || card.cardButton.externalLink || '#'}
                        target={card.cardButton.externalLink ? '_blank' : '_self'}
                        className="inline-block mt-5 px-4 py-2 rounded-[10px] text-white text-sm font-medium"
                        style={{ backgroundColor: '#1E1E1E' }}
                    >
                        {card.cardButton.text}
                    </Link>
                )}
            </div>
        </div>
    )
}

const BeautyFeatureGridSection = ({ data }: { data: BeautyFeatureGridSectionProps }) => {
    const { title, description, cards, primaryButton, secondaryButton } = data
    const [shouldLoad, setShouldLoad] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '300px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#F8F8F9] py-14 md:py-18 lg:py-22">
            <Container size="xl">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-bold text-[#1A1A1A] leading-tight tracking-tight mb-3">
                        {title?.map((block: SectionTitle, i: number) => (
                            <span key={i} className={block.type === 'highlight' ? 'text-[#A78BFA]' : ''}>
                                {block.text}
                            </span>
                        ))}
                    </h2>
                    {description && (
                        <p className="text-[14px] sm:text-[15px] text-[#6B7280] mx-auto leading-relaxed" style={{ maxWidth: '809px' }}>
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {cards?.map((card, i) => (
                        <VideoCard key={card._key} card={card} shouldLoad={shouldLoad} index={i} />
                    ))}
                </div>

                {(primaryButton || secondaryButton) && (
                    <div className="tryon-cta-buttons flex gap-3.5 justify-center mt-10 md:mt-12">
                        {primaryButton?.text && (
                            <Button
                                variant="primary"
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
                                variant="secondary"
                                href={secondaryButton.internalLink || secondaryButton.externalLink || '#'}
                                target={secondaryButton.externalLink ? '_blank' : '_self'}
                                icon={<svg fill="none" width="14" height="15" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3.5 xl:w-3.5 xl:h-4"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M.75 7.867V4.955c0-3.758 2.656-5.274 5.903-3.404l2.519 1.456 2.519 1.456c3.246 1.87 3.246 4.94 0 6.808l-2.519 1.457-2.519 1.456C3.406 16.054.75 14.518.75 10.78V7.867z"/></svg>}
                                showIcon={secondaryButton.showIcon !== false}
                            >
                                {secondaryButton.text}
                            </Button>
                        )}
                    </div>
                )}
            </Container>
        </section>
    )
}

export default BeautyFeatureGridSection
