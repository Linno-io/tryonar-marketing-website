'use client'

import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import CompareSlider from './CompareSlider';
import MakeupOptions from './MakeupOptions';

const STATIC_BEFORE_IMAGE = '/hero-section/before-image.webp'
const Frame = '/hero-section/frame.webp'

const CYCLE_CATEGORIES: { id: string; image: string }[] = [
    { id: 'lipstick', image: '/hero-section/1-lipstick.webp' },
    { id: 'lipliner', image: '/hero-section/2-lipliner.webp' },
    { id: 'foundation', image: '/hero-section/3-foundation.webp' },
    { id: 'concealer', image: '/hero-section/4-Concealer.webp' },
    { id: 'blush', image: '/hero-section/5-blush.webp' },
]

const CYCLE_INTERVAL_MS = 2500

interface InteractiveFrameProps {
    priority?: boolean;
}

const InteractiveFrame = ({ priority = false }: InteractiveFrameProps) => {
    const [activeCategoryId, setActiveCategoryId] = useState<string>(CYCLE_CATEGORIES[0].id)
    const [showIframe, setShowIframe] = useState(false)
    const [iframeLoading, setIframeLoading] = useState(true)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setActiveCategoryId(prev => {
                const idx = CYCLE_CATEGORIES.findIndex(c => c.id === prev)
                const nextIdx = (idx + 1) % CYCLE_CATEGORIES.length
                return CYCLE_CATEGORIES[nextIdx].id
            })
        }, CYCLE_INTERVAL_MS)
    }, [])

    useEffect(() => {
        startTimer()
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [startTimer])

    const handleCategoryChange = useCallback((id: string) => {
        setActiveCategoryId(id)
        startTimer()
    }, [startTimer])

    const handleTryOnClick = () => {
        setShowIframe(true)
        setIframeLoading(true)
    }

    const handleCloseIframe = () => {
        setShowIframe(false)
        setIframeLoading(true)
    }

    const handleIframeLoad = () => {
        setIframeLoading(false)
    }

    const activeImage = CYCLE_CATEGORIES.find(c => c.id === activeCategoryId)?.image ?? CYCLE_CATEGORIES[0].image

    return (
        <div className="toa-interactive-frame relative inline-block">
            <Image
                src={Frame}
                alt={'Phone frame'}
                className="if-frame-img relative z-10 pointer-events-none"
                fetchPriority={priority ? 'high' : 'auto'}
                priority={priority}
                width={395}
                height={600}
            />

            <CompareSlider
                beforeSrc={STATIC_BEFORE_IMAGE}
                afterSrc={activeImage}
                priority={priority}
                className="toa-compare-element z-20 absolute"
                afterOnly={true}
                style={{
                    top: '4%',
                    left: '5.9%',
                    right: '5.9%',
                    bottom: '4%',
                    width: 'calc(100% - 46px)',
                    height: '96%',
                    borderRadius: '40px 40px 0 0',
                }}
            />


            <div className='z-30 absolute bottom-[0%] left-[8%] right-[5.9%] flex justify-center'>
                <MakeupOptions
                    activeCategoryId={activeCategoryId}
                    onCategoryChange={handleCategoryChange}
                    availableCategoryIds={CYCLE_CATEGORIES.map(c => c.id)}
                />
            </div>

            <button
                type="button"
                onClick={handleTryOnClick}
                className="absolute rounded-full border border-black bg-[#202020] text-white font-semibold shadow-[0_10px_10px_rgba(18,17,19,0.20)] cursor-pointer transition-transform active:scale-95 top-[6%] right-[10%] px-3.75 py-2.5 text-[12px] z-40"
                style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 600,
                }}
            >
                Try on yourself
            </button>

            {showIframe && (
                <div
                    className="absolute bg-black z-50 overflow-hidden"
                    style={{
                        animation: 'fadeIn 0.3s ease-in-out',
                        inset: '2.5% 5.5%',
                        width: 'calc(100% - 44px)',
                        height: '97.5%',
                        borderRadius: '40px 40px 0 0',
                    }}
                >
                    <button
                        type="button"
                        onClick={handleCloseIframe}
                        className="absolute top-2.5 cursor-pointer left-4 z-60 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 active:scale-95"
                        aria-label="Close"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 5L5 15M5 5L15 15"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {iframeLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black z-55">
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative w-16 h-16">
                                    <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                                    <div
                                        className="absolute inset-0 border-4 border-white border-t-transparent rounded-full"
                                        style={{
                                            animation: 'spin 1s linear infinite',
                                        }}
                                    ></div>
                                </div>
                                <p className="text-white text-sm font-medium">Loading...</p>
                            </div>
                        </div>
                    )}

                    <iframe
                        src="https://trystaging.tryonar.net/"
                        className="w-full h-full"
                        style={{
                            border: 'none',
                            borderRadius: 'inherit',
                        }}
                        allow="camera"
                        onLoad={handleIframeLoad}
                        title="Try On Yourself"
                    />
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default memo(InteractiveFrame);
