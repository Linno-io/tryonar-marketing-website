'use client'

import Image from 'next/image'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

const FRAME = '/interactive-demo/frame.webp'
const BEFORE_IMAGE = '/product-demo-hero-section/before-img.webp'
const CYCLE_INTERVAL_MS = 2500
const RESUME_DELAY_MS = 6000

type Finish = 'Satin' | 'Matte' | 'Glossy'

interface ColorOption {
    name: string
    hex: string
    image: string
}

interface ProductCategory {
    id: string
    label: string
    thumbnail: string
    colors: ColorOption[]
}

const CATEGORIES: ProductCategory[] = [
    {
        id: 'lipstick',
        label: 'Lipstick',
        thumbnail: '/interactive-demo/lipstic.webp',
        colors: [
            { name: 'Petal', hex: '#E8A0A0', image: '/product-demo-hero-section/lipstick-petal.webp' },
            { name: 'Ceremony', hex: '#C0626B', image: '/product-demo-hero-section/lipstick-ceremony.webp' },
            { name: 'Plum', hex: '#7B3355', image: '/product-demo-hero-section/lipstick-plum.webp' },
            { name: 'Brick', hex: '#8B3A2A', image: '/product-demo-hero-section/lipstick-brick.webp' },
            { name: 'Noir', hex: '#2A1420', image: '/product-demo-hero-section/lipstick-noir.webp' },
        ],
    },
    {
        id: 'blush',
        label: 'Blush',
        thumbnail: '/interactive-demo/blash.webp',
        colors: [
            { name: 'Rose', hex: '#E8A0AA', image: '/product-demo-hero-section/blush-rose.webp' },
            { name: 'Coral', hex: '#E8785A', image: '/product-demo-hero-section/blush-coral.webp' },
            { name: 'Peach', hex: '#F0B090', image: '/product-demo-hero-section/blush-peach.webp' },
            { name: 'Mauve', hex: '#A0708A', image: '/product-demo-hero-section/blush-mauve.webp' },
        ],
    },
    {
        id: 'eyeshadow',
        label: 'Eyeshadow',
        thumbnail: '/interactive-demo/eyeshadow.webp',
        colors: [],
    },
    {
        id: 'eyeliner',
        label: 'Eyeliner',
        thumbnail: '/interactive-demo/eyeliner.webp',
        colors: [],
    },
    {
        id: 'foundation',
        label: 'Foundation',
        thumbnail: '/interactive-demo/foundation.webp',
        colors: [],
    },
]

// Flat sequence of only categories that have showcase images
const CYCLE_SEQUENCE: { categoryId: string; colorIndex: number }[] = CATEGORIES.flatMap(cat =>
    cat.colors.map((_, i) => ({ categoryId: cat.id, colorIndex: i }))
)

const FINISHES: Finish[] = ['Satin', 'Matte', 'Glossy']

interface Props {
    priority?: boolean
}

const ProductDemoHeroPhoneFrame = ({ priority = false }: Props) => {
    const [cycleIdx, setCycleIdx] = useState(0)
    const [activeFinish, setActiveFinish] = useState<Finish>('Matte')
    const [dividerPos, setDividerPos] = useState(50)
    const [showIframe, setShowIframe] = useState(false)
    const [iframeLoading, setIframeLoading] = useState(true)

    const isDragging = useRef(false)
    const screenRef = useRef<HTMLDivElement>(null)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const activeCategoryId = CYCLE_SEQUENCE[cycleIdx]?.categoryId ?? CATEGORIES[0].id
    const activeColorIndex = CYCLE_SEQUENCE[cycleIdx]?.colorIndex ?? 0

    const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId) ?? CATEGORIES[0]
    const activeColor = activeCategory.colors[activeColorIndex] ?? null

    const startCycle = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setCycleIdx(prev => (prev + 1) % CYCLE_SEQUENCE.length)
        }, CYCLE_INTERVAL_MS)
    }, [])

    useEffect(() => {
        startCycle()
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
            if (resumeRef.current) clearTimeout(resumeRef.current)
        }
    }, [startCycle])

    const pauseAndResume = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current)
        if (resumeRef.current) clearTimeout(resumeRef.current)
        resumeRef.current = setTimeout(startCycle, RESUME_DELAY_MS)
    }, [startCycle])

    const handleCategorySelect = useCallback((id: string) => {
        const idx = CYCLE_SEQUENCE.findIndex(s => s.categoryId === id)
        if (idx >= 0) {
            setCycleIdx(idx)
            pauseAndResume()
        }
    }, [pauseAndResume])

    const handleColorSelect = useCallback((colorIndex: number) => {
        const idx = CYCLE_SEQUENCE.findIndex(s => s.categoryId === activeCategoryId && s.colorIndex === colorIndex)
        if (idx >= 0) {
            setCycleIdx(idx)
            pauseAndResume()
        }
    }, [activeCategoryId, pauseAndResume])

    const updatePos = useCallback((clientX: number) => {
        const el = screenRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        setDividerPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
    }, [])

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return
        updatePos(e.clientX)
    }, [updatePos])

    const onUp = useCallback(() => { isDragging.current = false }, [])

    const onTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging.current) return
        e.preventDefault()
        updatePos(e.touches[0].clientX)
    }, [updatePos])

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onUp)
        window.addEventListener('touchmove', onTouchMove, { passive: false })
        window.addEventListener('touchend', onUp)
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onUp)
            window.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('touchend', onUp)
        }
    }, [onMouseMove, onUp, onTouchMove])

    return (
        <div className="flex items-center justify-center gap-4 select-none">
            {/* Phone */}
            <div className="relative" style={{ width: 295 }}>
                <Image
                    src={FRAME}
                    alt="Phone frame"
                    width={295}
                    height={600}
                    priority={priority}
                    className="relative z-10 pointer-events-none w-full"
                />

                {/* Screen */}
                <div
                    ref={screenRef}
                    className="absolute overflow-hidden cursor-ew-resize"
                    style={{
                        top: '3%',
                        left: '5.9%',
                        right: '5.9%',
                        bottom: '3%',
                        borderRadius: '40px',
                        zIndex: 5,
                    }}
                    onMouseDown={(e) => { isDragging.current = true; updatePos(e.clientX) }}
                    onTouchStart={(e) => { isDragging.current = true; updatePos(e.touches[0].clientX) }}
                >
                    {/* After layer — always render all, toggle opacity for smooth transitions */}
                    {CYCLE_SEQUENCE.map((step, i) => {
                        const cat = CATEGORIES.find(c => c.id === step.categoryId)
                        const color = cat?.colors[step.colorIndex]
                        if (!color) return null
                        return (
                            <Image
                                key={`${step.categoryId}-${step.colorIndex}`}
                                src={color.image}
                                alt={color.name}
                                fill
                                sizes="295px"
                                priority={priority && i === 0}
                                style={{
                                    objectFit: 'cover',
                                    opacity: cycleIdx === i ? 1 : 0,
                                    transition: 'opacity 600ms ease-in-out',
                                    zIndex: 1,
                                }}
                            />
                        )
                    })}

                    {/* Before image — no color selected fallback */}
                    {!activeColor && (
                        <Image
                            src={BEFORE_IMAGE}
                            alt="Before"
                            fill
                            sizes="295px"
                            priority={priority}
                            style={{ objectFit: 'cover', zIndex: 1 }}
                        />
                    )}

                    {/* Before image clipped to left of divider */}
                    <div
                        className="absolute inset-0"
                        style={{ clipPath: `inset(0 ${100 - dividerPos}% 0 0)`, zIndex: 2 }}
                    >
                        <Image
                            src={BEFORE_IMAGE}
                            alt="Before"
                            fill
                            sizes="295px"
                            priority={priority}
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    {/* Divider line */}
                    <div
                        className="absolute top-0 bottom-0 w-px bg-white pointer-events-none"
                        style={{ left: `${dividerPos}%`, transform: 'translateX(-50%)', zIndex: 3 }}
                    />

                    {/* Drag handle */}
                    <div
                        className="absolute cursor-ew-resize"
                        style={{
                            left: `${dividerPos}%`,
                            top: '45%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 4,
                        }}
                        onMouseDown={(e) => { e.stopPropagation(); isDragging.current = true }}
                        onTouchStart={(e) => { e.stopPropagation(); isDragging.current = true }}
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M16.125 19.875L16.125 4.125C16.125 3.4875 16.6125 3 17.25 3C17.8875 3 18.375 3.4875 18.375 4.125L18.375 19.875C18.375 20.5125 17.8875 21 17.25 21C16.6125 21 16.125 20.5125 16.125 19.875Z" fill="black" />
                                <path d="M10.875 19.875L10.875 4.125C10.875 3.4875 11.3625 3 12 3C12.6375 3 13.125 3.4875 13.125 4.125L13.125 19.875C13.125 20.5125 12.6375 21 12 21C11.3625 21 10.875 20.5125 10.875 19.875Z" fill="black" />
                                <path d="M5.625 19.875L5.625 4.125C5.625 3.4875 6.1125 3 6.75 3C7.3875 3 7.875 3.4875 7.875 4.125L7.875 19.875C7.875 20.5125 7.3875 21 6.75 21C6.1125 21 5.625 20.5125 5.625 19.875Z" fill="black" />
                            </svg>
                        </div>
                    </div>

                    {/* Try on yourself */}
                    <button
                        type="button"
                        onClick={() => { setShowIframe(true); setIframeLoading(true) }}
                        className="absolute top-3 right-3 bg-[#202020]/90 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full cursor-pointer z-6 hover:bg-[#202020] transition-colors"
                        style={{ fontFamily: 'Inter' }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        Try on yourself
                    </button>

                    {/* Bottom overlay: colors + finish */}
                    <div
                        className="absolute bottom-0 left-0 right-0 px-3 pb-4 pt-12"
                        style={{
                            zIndex: 6,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                            pointerEvents: 'none',
                        }}
                    >
                        {/* Color swatches */}
                        {activeCategory.colors.length > 0 && (
                            <div
                                className="flex items-end justify-center gap-3 mb-3"
                                style={{ pointerEvents: 'auto' }}
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                            >
                                {activeCategory.colors.map((color, i) => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); handleColorSelect(i) }}
                                        className="flex flex-col items-center gap-1 cursor-pointer"
                                    >
                                        <div
                                            className="rounded-full transition-all duration-200 shrink-0"
                                            style={{
                                                width: activeColorIndex === i ? 22 : 18,
                                                height: activeColorIndex === i ? 22 : 18,
                                                backgroundColor: color.hex,
                                                outline: activeColorIndex === i ? '2px solid white' : 'none',
                                                outlineOffset: '2px',
                                            }}
                                        />
                                        <span
                                            className="text-white font-medium leading-none"
                                            style={{
                                                fontSize: 9,
                                                opacity: activeColorIndex === i ? 1 : 0.6,
                                            }}
                                        >
                                            {color.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Finish pills */}
                        <div
                            className="flex items-center justify-center gap-2"
                            style={{ pointerEvents: 'auto' }}
                            onMouseDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}
                        >
                            {FINISHES.map((finish) => (
                                <button
                                    key={finish}
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setActiveFinish(finish) }}
                                    className="text-[11px] font-medium px-3.5 py-1 rounded-full cursor-pointer transition-all duration-200"
                                    style={{
                                        background: activeFinish === finish ? 'white' : 'rgba(255,255,255,0.18)',
                                        color: activeFinish === finish ? '#111' : 'white',
                                        backdropFilter: 'blur(6px)',
                                        border: activeFinish === finish ? 'none' : '1px solid rgba(255,255,255,0.3)',
                                    }}
                                >
                                    {finish}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Iframe overlay */}
                    {showIframe && (
                        <div className="absolute inset-0 bg-black z-20" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                            <button
                                type="button"
                                onClick={() => { setShowIframe(false); setIframeLoading(true) }}
                                className="absolute top-2.5 left-3 z-30 w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all cursor-pointer"
                            >
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                    <path d="M15 5L5 15M5 5L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {iframeLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black z-25">
                                    <div className="relative w-12 h-12">
                                        <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
                                        <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full" style={{ animation: 'spin 1s linear infinite' }} />
                                    </div>
                                </div>
                            )}

                            <iframe
                                src="https://trystaging.tryonar.net/"
                                className="w-full h-full"
                                style={{ border: 'none' }}
                                allow="camera"
                                onLoad={() => setIframeLoading(false)}
                                title="Try On Yourself"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Product category sidebar */}
            <div className="flex flex-col gap-2.5">
                {CATEGORIES.map((cat) => {
                    const isActive = activeCategoryId === cat.id
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleCategorySelect(cat.id)}
                            className="relative rounded-xl overflow-hidden transition-all duration-200 cursor-pointer"
                            style={{
                                width: 54,
                                height: 54,
                                boxShadow: isActive ? '0 0 0 2.5px #9F3AED' : '0 1px 4px rgba(0,0,0,0.12)',
                                opacity: cat.colors.length === 0 ? 0.45 : isActive ? 1 : 0.75,
                            }}
                        >
                            <Image
                                src={cat.thumbnail}
                                alt={cat.label}
                                fill
                                sizes="54px"
                                style={{ objectFit: 'cover' }}
                            />
                        </button>
                    )
                })}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

export default memo(ProductDemoHeroPhoneFrame)
