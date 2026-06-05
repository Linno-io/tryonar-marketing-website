'use client'

import Image from 'next/image'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'

/**
 * ProductTryOnFrame
 *
 * Phone mockup that demonstrates the live try-on widget the way the real widget
 * now behaves: one product at a time. It auto-cycles ("like a gif") through a
 * sequence of looks, syncing the highlighted product rail item, the shade
 * swatches and the finish pills — then lets the visitor launch the real widget.
 *
 * Used by the product-demo hero and by each product card in ProductsDetailsTab.
 */

const ASSET = (f: string) => `/product-demo/${f}`

// Named shades shown in the design (Crimson / Brick / Burgundy / Noir / Petal).
const SHADES: { name: string; color: string }[] = [
    { name: 'Crimson', color: '#C8102E' },
    { name: 'Brick', color: '#9E4638' },
    { name: 'Burgundy', color: '#6E1F2E' },
    { name: 'Noir', color: '#2B2024' },
    { name: 'Petal', color: '#E8A0A6' },
]

const FINISHES = ['Satin', 'Matte', 'Glossy'] as const

// Vertical product rail (matches the glass options column in the design).
const RAIL: { id: string; label: string; thumb: string }[] = [
    { id: 'lipstick', label: 'Lipstick', thumb: ASSET('thumb-lipstick.png') },
    { id: 'eyeshadow', label: 'Eyeshadow', thumb: ASSET('thumb-eyeshadow.png') },
    { id: 'blush', label: 'Blush', thumb: ASSET('thumb-powder.png') },
    { id: 'eyeliner', label: 'Eyeliner', thumb: ASSET('thumb-eyeliner.png') },
    { id: 'lipgloss', label: 'Lip gloss', thumb: ASSET('thumb-lipgloss.png') },
]

// Auto-play sequence. Same model across steps so only the applied makeup
// changes — exactly what the shopper sees in the widget.
interface Look {
    product: string
    face: string
    shade: number
    finish: (typeof FINISHES)[number]
}
const SEQUENCE: Look[] = [
    { product: 'lipstick', face: ASSET('look-lipstick.png'), shade: 0, finish: 'Matte' },
    { product: 'eyeshadow', face: ASSET('look-eyeshadow-blue.png'), shade: 1, finish: 'Matte' },
    { product: 'blush', face: ASSET('look-eyeshadow-pink.png'), shade: 4, finish: 'Satin' },
]

const FACES = Array.from(new Set(SEQUENCE.map(s => s.face)))
const CYCLE_INTERVAL_MS = 2600
const ACCENT = '#9A68FF'
const IFRAME_SRC = 'https://trystaging.tryonar.net/'

interface ProductTryOnFrameProps {
    priority?: boolean
    autoPlay?: boolean
    className?: string
}

const ProductTryOnFrame = ({ priority = false, autoPlay = true, className }: ProductTryOnFrameProps) => {
    const [step, setStep] = useState(0)
    const [showIframe, setShowIframe] = useState(false)
    const [iframeLoading, setIframeLoading] = useState(true)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current)
        if (!autoPlay) return
        timerRef.current = setInterval(() => {
            setStep(prev => (prev + 1) % SEQUENCE.length)
        }, CYCLE_INTERVAL_MS)
    }, [autoPlay])

    useEffect(() => {
        if (showIframe) {
            if (timerRef.current) clearInterval(timerRef.current)
            return
        }
        startTimer()
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [showIframe, startTimer])

    const active = SEQUENCE[step]

    // Manual product selection: jump to the first matching look and restart the cycle.
    const handleRailClick = useCallback(
        (id: string) => {
            const idx = SEQUENCE.findIndex(s => s.product === id)
            if (idx === -1) return
            setStep(idx)
            startTimer()
        },
        [startTimer],
    )

    const openWidget = () => {
        setShowIframe(true)
        setIframeLoading(true)
    }
    const closeWidget = () => {
        setShowIframe(false)
        setIframeLoading(true)
    }

    return (
        <div className={clsx('toa-tryon-frame relative mx-auto w-full max-w-[340px]', className)}>
            {/* Phone body */}
            <div className="relative rounded-[44px] bg-[#111] p-[10px] shadow-[0_30px_60px_-15px_rgba(40,20,80,0.35)]">
                <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[36px] bg-black">
                    {/* Faces — only the active look is visible, cross-faded */}
                    {FACES.map(face => (
                        <Image
                            key={face}
                            src={face}
                            alt="Live makeup try-on preview"
                            fill
                            sizes="(max-width: 768px) 90vw, 340px"
                            priority={priority}
                            className="object-cover transition-opacity duration-700 ease-in-out"
                            style={{ objectPosition: 'center 22%', opacity: face === active.face ? 1 : 0 }}
                        />
                    ))}

                    {/* Before / after divider line (decorative, like the design) */}
                    <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/70" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/25 backdrop-blur-sm">
                        <span className="text-[10px] font-semibold text-white">↔</span>
                    </div>

                    {/* Camera / flip controls */}
                    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2">
                        {['⟳', '◉', '⤢'].map((g, i) => (
                            <div
                                key={i}
                                aria-hidden
                                className="flex h-9 w-9 items-center justify-center rounded-full border text-[13px] text-white"
                                style={{ background: 'rgba(28,28,28,0.58)', borderColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(2px)' }}
                            >
                                {g}
                            </div>
                        ))}
                    </div>

                    {/* Bottom glass control panel: shades + finishes */}
                    <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
                        <div
                            className="rounded-[20px] border px-3 py-3 text-white"
                            style={{ background: 'rgba(28,28,28,0.42)', borderColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(14px)' }}
                        >
                            {/* Shade swatches */}
                            <div className="flex items-end justify-between gap-1">
                                {SHADES.map((s, i) => {
                                    const isActive = i === active.shade
                                    return (
                                        <div key={s.name} className="flex flex-1 flex-col items-center gap-1.5">
                                            <span
                                                className="text-[8px] font-medium leading-none text-white/85"
                                                style={{ opacity: isActive ? 1 : 0.65 }}
                                            >
                                                {s.name}
                                            </span>
                                            <span
                                                className="block h-6 w-6 rounded-full transition-all duration-300"
                                                style={{
                                                    background: s.color,
                                                    boxShadow: isActive ? `0 0 0 2px #fff, 0 0 0 4px ${ACCENT}` : 'none',
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Finish pills */}
                            <div className="mt-3 flex items-center justify-center gap-2">
                                {FINISHES.map(f => {
                                    const isActive = f === active.finish
                                    return (
                                        <span
                                            key={f}
                                            className="rounded-full px-3 py-1 text-[10px] font-medium transition-colors"
                                            style={{
                                                background: isActive ? '#fff' : 'rgba(255,255,255,0.12)',
                                                color: isActive ? '#1A202C' : '#fff',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                            }}
                                        >
                                            {f}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Launch real widget */}
                    <button
                        type="button"
                        onClick={openWidget}
                        className="absolute right-3 top-3 z-40 cursor-pointer rounded-full border border-black/10 bg-[#202020] px-3.5 py-2 text-[12px] font-semibold text-white shadow-[0_10px_10px_rgba(18,17,19,0.20)] transition-transform active:scale-95"
                    >
                        Try on yourself
                    </button>

                    {/* Widget overlay */}
                    {showIframe && (
                        <div className="absolute inset-0 z-50 overflow-hidden bg-black" style={{ animation: 'tryonFadeIn 0.3s ease-in-out' }}>
                            <button
                                type="button"
                                onClick={closeWidget}
                                aria-label="Close"
                                className="absolute right-3 top-3 z-[60] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
                            >
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 5L5 15M5 5L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            {iframeLoading && (
                                <div className="absolute inset-0 z-[55] flex items-center justify-center bg-black">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative h-14 w-14">
                                            <div className="absolute inset-0 rounded-full border-4 border-white/20" />
                                            <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent" style={{ animation: 'tryonSpin 1s linear infinite' }} />
                                        </div>
                                        <p className="text-sm font-medium text-white">Loading try-on…</p>
                                    </div>
                                </div>
                            )}
                            <iframe
                                src={IFRAME_SRC}
                                className="h-full w-full"
                                style={{ border: 'none' }}
                                allow="camera"
                                onLoad={() => setIframeLoading(false)}
                                title="Try On Yourself"
                            />
                        </div>
                    )}
                </div>

                {/* Notch */}
                <div className="pointer-events-none absolute left-1/2 top-[18px] h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
            </div>

            {/* Vertical product rail (glass options) */}
            <div
                className="absolute -right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2.5 rounded-2xl border border-[#e6e4ea] bg-white p-2.5 shadow-[0_30px_15px_rgba(0,0,0,0.08)] sm:-right-6"
                role="tablist"
                aria-label="Try-on products"
            >
                {RAIL.map(item => {
                    const isActive = item.id === active.product
                    return (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-label={item.label}
                            onClick={() => handleRailClick(item.id)}
                            className={clsx(
                                'relative h-12 w-12 cursor-pointer overflow-hidden rounded-lg border-2 bg-white p-1 transition-all sm:h-14 sm:w-[60px]',
                                isActive ? 'shadow-[0_10px_5px_rgba(0,0,0,0.13)]' : 'border-transparent opacity-80 hover:opacity-100',
                            )}
                            style={isActive ? { borderColor: ACCENT } : undefined}
                        >
                            <Image src={item.thumb} alt={item.label} fill sizes="60px" className="object-contain p-1" />
                        </button>
                    )
                })}
            </div>

            <style jsx>{`
                @keyframes tryonFadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes tryonSpin {
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

export default memo(ProductTryOnFrame)
