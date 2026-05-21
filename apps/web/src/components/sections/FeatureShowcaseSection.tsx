'use client'

import { useEffect, useRef } from 'react'
import { FeatureShowcaseSection as FeatureShowcaseSectionProps } from '@/lib/types/section'
import { Container } from '@/components/ui'

interface SectionTitle {
    text: string
    type: 'highlight' | 'normal'
}

const FeatureShowcaseSection = ({ data }: { data: FeatureShowcaseSectionProps }) => {
    const { tagline, title, description, sectionImage, sectionVideo, showFrame, frameImage } = data

    const sectionRef = useRef<HTMLElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!sectionVideo?.url || !sectionRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    observer.disconnect()
                    const video = videoRef.current
                    if (!video) return
                    video.src = sectionVideo.url
                    video.load()
                    video.play().catch(() => {})
                }
            },
            { rootMargin: '200px' }
        )

        observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [sectionVideo?.url])

    return (
        <>
        <style>{`
            /* Desktop ≥1024px: offset-left so image aligns with phone screen */
            .fss-content-img {
                position: absolute;
                top: 75px;
                left: 50%;
                transform: translateX(-64%);
                height: 100%;
                width: 50%;
                max-width: 90%;
                z-index: 0;
                object-fit: cover;
                border-radius: 30px;
            }
            .fss-frame-img {
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
                height: 110%;
                width: auto;
                max-width: 90%;
                z-index: 1;
            }
            /* Tablet + Mobile <1024px: both centered, height-driven */
            @media (max-width: 1023px) {
                .fss-content-img {
                    top: 45px;
                    left: 49.5%;
                    transform: translateX(-62%);
                    height: 100%;
                    width: auto;
                    max-width: 90%;
                }
                .fss-frame-img {
                    top: 30px;
                }
            }
            @media (max-width: 639px) {
                .fss-content-img {
                    top: 32px;
                }
                .fss-frame-img {
                    top: 20px;
                }
            }

             @media (max-width: 575px) {
                .fss-content-img {
                    width: 55%;
                    top: 12px;
                    border-radius: 30px;
                }
                .fss-frame-img {
                    width: 100%;
                    transform: translateX(0);
                    left: 0;
                    max-width: 100%;
                    top: 0;
                }
            }
        `}</style>
        <section ref={sectionRef} className="bg-[#0A0A0A] overflow-hidden">
            <Container size="xl" padding={false}>
                <div className="flex flex-col lg:flex-row lg:min-h-165">

                    {/* Left: text */}
                    <div className="flex items-center shrink-0 lg:w-[45%] px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
                        <div className="flex flex-col gap-4 lg:gap-6">
                            {tagline && (
                                <span
                                    className="block text-[18px] sm:text-[22px] lg:text-[34px] italic font-medium leading-none tracking-[-0.68px] text-[#998188]"
                                    style={{ fontFamily: 'var(--font-body)' }}
                                >
                                    {tagline}
                                </span>
                            )}

                            <h2 className="text-[30px] sm:text-[40px] lg:text-[56px] font-bold text-white leading-[1.15] lg:leading-[64px] tracking-[-1.12px] m-0">
                                {title && title.map((block: SectionTitle, index: number) => (
                                    <span key={index} className={block.type === 'highlight' ? 'text-[#A78BFA]' : ''}>
                                        {block.text}
                                    </span>
                                ))}
                            </h2>

                            <p
                                className="text-[15px] sm:text-[17px] lg:text-[19px] font-normal text-[#E7E5EA] leading-relaxed lg:leading-6.75 tracking-[0.19px] m-0 max-w-105"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Right: phone frame */}
                    <div className="relative flex-1 overflow-hidden min-h-85 sm:min-h-115 lg:min-h-165">

                        {/* Content: video (lazy) or image — positioned to fit inside frame */}
                        {sectionVideo?.url ? (
                            // eslint-disable-next-line jsx-a11y/media-has-caption
                            <video
                                ref={videoRef}
                                poster={sectionImage?.url}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="fss-content-img"
                            />
                        ) : sectionImage?.url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={sectionImage.url}
                                alt={sectionImage.alt || ''}
                                className="fss-content-img"
                            />
                        ) : null}

                        {/* Frame overlays on top — transparent screen reveals image behind */}
                        {showFrame && frameImage?.url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={frameImage.url}
                                alt={frameImage.alt || 'Phone frame'}
                                className="fss-frame-img"
                            />
                        )}

                        {/* Bottom gradient fade */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none z-10"
                            style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 69.42%, #000 100%)' }}
                        />
                    </div>

                </div>
            </Container>
        </section>
        </>
    )
}

export default FeatureShowcaseSection
