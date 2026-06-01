'use client'

import Image from 'next/image'
import { memo, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { clsx } from 'clsx'

const FRAME = '/frame.webp'

// Pills shown in the UI (matches the reference design)
const PILLS = ['Lipstick', 'Eyeshadow', 'Blush', 'Foundation'] as const

// Per-category swatch palettes, sampled to match the actual image content.
// Index 0 is always the "none" circle.
const PALETTES: Record<string, string[]> = {
    // bright red, rose/terracotta, dark burgundy, soft pink
    Lipstick: ['none', '#CE2230', '#B05A52', '#6E1F2E', '#E08A8C'],
    // purple/lilac eyeshadow look
    Eyeshadow: ['none', '#9B7FBF', '#6A4C93', '#C3B2DD', '#4B3070'],
    // pink/peach blush
    Blush: ['none', '#E8918C', '#E0707A', '#F2A9A0', '#C75D6A'],
}

// Auto-play sequence. Each step swaps the image and highlights a pill + swatch.
// The swatch row re-renders to the active category's palette and the active
// swatch matches the dominant color shown in that image.
const SEQUENCE: { pill: (typeof PILLS)[number]; image: string; swatch: number }[] = [
    { pill: 'Lipstick', image: '/updated-slider/lipstic%201.webp', swatch: 1 }, // bright red
    { pill: 'Lipstick', image: '/updated-slider/lipstic%202.webp', swatch: 2 }, // rose
    { pill: 'Lipstick', image: '/updated-slider/lipstic%203.webp', swatch: 3 }, // burgundy
    { pill: 'Eyeshadow', image: '/updated-slider/eyeshadow.webp', swatch: 1 }, // lilac
    { pill: 'Blush', image: '/updated-slider/blash.webp', swatch: 1 }, // pink
]

const CYCLE_INTERVAL_MS = 2500

interface AutoInteractiveFrameProps {
    priority?: boolean
}

const AutoInteractiveFrame = ({ priority = false }: AutoInteractiveFrameProps) => {
    const [step, setStep] = useState(0)
    const [showIframe, setShowIframe] = useState(false)
    const [iframeLoading, setIframeLoading] = useState(true)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (showIframe) {
            if (timerRef.current) clearInterval(timerRef.current)
            return
        }
        timerRef.current = setInterval(() => {
            setStep(prev => (prev + 1) % SEQUENCE.length)
        }, CYCLE_INTERVAL_MS)
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [showIframe])

    const active = SEQUENCE[step]
    const palette = PALETTES[active.pill] ?? PALETTES.Lipstick

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

    return (
        <div className="toa-interactive-frame relative inline-block">
            <Image
                src={FRAME}
                alt={'Phone frame'}
                className="if-frame-img relative z-10 pointer-events-none"
                fetchPriority={priority ? 'high' : 'auto'}
                priority={priority}
                width={395}
                height={609}
            />

            <div
                className="toa-compare-element z-20 absolute overflow-hidden"
                style={{
                    top: '2.5%',
                    right: '4.1%',
                    bottom: '0px',
                    left: '5.4%',
                    borderRadius: '43px 39px 0px 0px',
                }}
            >
                {SEQUENCE.map((s, i) => (
                    <Image
                        key={s.image}
                        src={s.image}
                        alt={s.pill}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        priority={priority}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center 18%',
                            opacity: i === step ? 1 : 0,
                            transition: 'opacity 600ms ease-in-out',
                        }}
                    />
                ))}
            </div>

            <div className="z-30 absolute bottom-[0%] left-[6.1%] right-[6.1%] flex justify-center">
                <div className="w-full rounded-t-2xl sm:rounded-t-3xl text-white shadow-2xl overflow-hidden border border-white/15 bg-black/25 backdrop-blur-[30px] font-[Inter,sans-serif]">
                    <div className="flex justify-center pt-1.5 sm:pt-2.5 pb-0.5 sm:pb-1">
                        <div className="h-0.5 sm:h-1 w-8 sm:w-10 rounded-full bg-white/40" />
                    </div>

                    <div className="flex items-center justify-between px-2.5 sm:px-4 py-1 sm:py-2">
                        <h2 className="text-[13px] sm:text-[16px] md:text-[20px] font-medium text-white tracking-[-0.2px] leading-none m-0">
                            Beauty features
                        </h2>
                        <div
                            aria-hidden
                            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-black/30 flex items-center justify-center"
                        >
                            <X size={14} className="text-white" />
                        </div>
                    </div>

                    <div className="px-3 sm:px-5 pb-2 sm:pb-3">
                        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar -mx-3 sm:-mx-5 px-3 sm:px-5">
                            {PILLS.map(pill => {
                                const isActive = pill === active.pill
                                return (
                                    <div
                                        key={pill}
                                        className={clsx(
                                            'shrink-0 rounded-full px-3 py-1.5 sm:px-4 sm:py-2.5 text-[10px] sm:text-[12px] md:text-[14px] font-medium transition-colors select-none',
                                            isActive ? 'bg-black text-white' : 'bg-white text-[#1A1A1A]',
                                        )}
                                    >
                                        {pill}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="border-t border-white/15" />

                    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3.5">
                        {palette.map((color, i) => {
                            const isActive = i === active.swatch
                            const isNone = color === 'none'
                            return (
                                <div
                                    key={i}
                                    className={clsx(
                                        'relative shrink-0 h-9 w-9 sm:h-11 sm:w-11 rounded-full transition-all duration-300',
                                        isActive ? 'ring-[3px] ring-black' : '',
                                    )}
                                    style={isNone ? { background: '#fff' } : { background: color }}
                                >
                                    {isNone && (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <span className="block h-7 w-7 sm:h-9 sm:w-9 rounded-full border border-[#999]" />
                                            <span className="absolute h-[1px] w-7 sm:w-9 bg-[#999] rotate-45" />
                                        </span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
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
                        top: '2.5%',
                        right: '4.1%',
                        bottom: '0px',
                        left: '5.4%',
                        borderRadius: '40px 40px 0 0',
                    }}
                >
                    <button
                        type="button"
                        onClick={handleCloseIframe}
                        className="absolute top-2.5 cursor-pointer left-4 z-60 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 active:scale-95"
                        aria-label="Close"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                        style={{ animation: 'spin 1s linear infinite' }}
                                    ></div>
                                </div>
                                <p className="text-white text-sm font-medium">Loading...</p>
                            </div>
                        </div>
                    )}

                    <iframe
                        src="https://trystaging.tryonar.net/"
                        className="w-full h-full"
                        style={{ border: 'none', borderRadius: 'inherit' }}
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
    )
}

export default memo(AutoInteractiveFrame)
