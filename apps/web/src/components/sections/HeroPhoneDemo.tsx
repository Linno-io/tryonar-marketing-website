'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { SanityImage, SanityVideo } from '@/lib/types/siteSettings'

interface HeroPhoneDemoProps {
    beforeImage: SanityImage
    afterVideo?: SanityVideo
}

// CSS-built phone frame (no external PNG). Rounded all corners + dark bezel via padding.
// border-radius uses elliptical % so corners stay pixel-circular on tall aspect: 12% horiz / 6.5% vert → matched arc.

export default function HeroPhoneDemo({ beforeImage, afterVideo }: HeroPhoneDemoProps) {
    const [dividerPos, setDividerPos] = useState(50)
    const isDragging = useRef(false)
    const screenRef = useRef<HTMLDivElement>(null)

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

    const onMouseUp = useCallback(() => { isDragging.current = false }, [])

    const onTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging.current) return
        e.preventDefault()
        updatePos(e.touches[0].clientX)
    }, [updatePos])

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        window.addEventListener('touchmove', onTouchMove, { passive: false })
        window.addEventListener('touchend', onMouseUp)
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
            window.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('touchend', onMouseUp)
        }
    }, [onMouseMove, onMouseUp, onTouchMove])

    return (
        <div
            className="relative select-none w-full bg-[#1A1A1A] shadow-2xl"
            style={{
                aspectRatio: '9 / 17',
                borderRadius: '13% / 6.9%',
                padding: '2.2%',
            }}
        >
            {/* Screen */}
            <div
                ref={screenRef}
                className="relative w-full h-full overflow-hidden cursor-ew-resize bg-black"
                style={{ borderRadius: '60px' }}
                onMouseDown={(e) => { isDragging.current = true; updatePos(e.clientX) }}
                onTouchStart={(e) => { isDragging.current = true; updatePos(e.touches[0].clientX) }}
            >
                {/* After: looping video, fills screen */}
                {afterVideo?.url && (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: 'center top' }}
                    >
                        <source src={afterVideo.url} type="video/mp4" />
                    </video>
                )}

                {/* Before: image clipped to left of divider */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {beforeImage?.url && (
                    <img
                        src={beforeImage.url}
                        alt={beforeImage.alt || 'Before'}
                        className="absolute inset-0 w-full object-cover"
                        style={{
                            clipPath: `inset(0 ${100 - dividerPos}% 0 0)`,
                            objectPosition: 'center top',
                            zIndex: 1,
                            top: '34px',
                            height: '78%'
                        }}
                    />
                )}

                {/* Divider line */}
                <div
                    className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none"
                    style={{ left: `${dividerPos}%`, transform: 'translateX(-50%)', zIndex: 2 }}
                />

                {/* Before label */}
                <div
                    className="absolute pointer-events-none"
                    style={{ top: '50%', left: '5%', transform: 'translateY(-50%)', zIndex: 2 }}
                >
                    <span className="text-white text-[12px] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                        Before
                    </span>
                </div>

                {/* After label */}
                <div
                    className="absolute pointer-events-none"
                    style={{ top: '50%', right: '5%', transform: 'translateY(-50%)', zIndex: 2 }}
                >
                    <span className="text-white text-[12px] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                        After
                    </span>
                </div>

                {/* Draggable handle — vertically centered, follows divider */}
                <div
                    className="absolute cursor-ew-resize"
                    style={{
                        left: `${dividerPos}%`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 3,
                    }}
                    onMouseDown={(e) => { e.stopPropagation(); isDragging.current = true }}
                    onTouchStart={(e) => { e.stopPropagation(); isDragging.current = true }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 55 55" fill="none">
                        <circle cx="27.1957" cy="27.1957" r="27.1957" fill="white" fillOpacity="0.41" />
                        <path d="M19.7835 21.4745V33.9694C19.7835 34.5372 19.4571 35.0548 18.9444 35.3001C18.7419 35.3955 18.5246 35.4442 18.3088 35.4442C17.9785 35.4442 17.6501 35.3321 17.3832 35.1173L9.6393 28.8698C9.29225 28.5901 9.0907 28.1678 9.0907 27.722C9.0907 27.2761 9.29225 26.8538 9.6393 26.5741L17.3836 20.3266C17.8256 19.9697 18.4332 19.8999 18.9459 20.1438C19.4571 20.3891 19.7835 20.9062 19.7835 21.4745Z" fill="white" />
                        <path d="M34.6076 21.4745V33.9694C34.6076 34.5372 34.934 35.0548 35.4467 35.3001C35.6492 35.3955 35.8665 35.4442 36.0823 35.4442C36.4127 35.4442 36.741 35.3321 37.008 35.1173L44.7518 28.8698C45.0989 28.5901 45.3004 28.1678 45.3004 27.722C45.3004 27.2761 45.0989 26.8538 44.7518 26.5741L37.0075 20.3266C36.5655 19.9697 35.9579 19.8999 35.4452 20.1438C34.934 20.3891 34.6076 20.9062 34.6076 21.4745Z" fill="white" />
                    </svg>
                </div>

                {/* "Try on yourself" button */}
                <button
                    type="button"
                    className="absolute bg-white/90 backdrop-blur-sm text-[#1A1A1A] text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                    style={{ top: '3.5%', right: '4%', zIndex: 3 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                    </svg>
                    Try on yourself
                </button>
            </div>
        </div>
    )
}
