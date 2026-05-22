'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { SanityImage, SanityVideo } from '@/lib/types/siteSettings'

interface HeroPhoneDemoProps {
    beforeImage?: SanityImage
    afterVideo?: SanityVideo
    bottomVideoUrl?: string
}

const STATIC_BEFORE_IMAGE = '/before-image.webp'
const STATIC_AFTER_VIDEO = '/after-video.mp4'
const STATIC_BOTTOM_VIDEO = '/bottom-video.mp4'

export default function HeroPhoneDemo(_props: HeroPhoneDemoProps) {
    const [dividerPos, setDividerPos] = useState(50)
    const isDragging = useRef(false)
    const screenRef = useRef<HTMLDivElement>(null)
    const afterRef = useRef<HTMLVideoElement>(null)
    const bottomRef = useRef<HTMLVideoElement>(null)

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

    // Sync after-video + bottom-video playback.
    useEffect(() => {
        const a = afterRef.current
        const b = bottomRef.current
        if (!a || !b) return

        const startBoth = () => {
            try {
                a.currentTime = 0
                b.currentTime = 0
                void a.play()
                void b.play()
            } catch {}
        }

        const onReady = () => {
            if (a.readyState >= 2 && b.readyState >= 2) startBoth()
        }

        a.addEventListener('loadeddata', onReady)
        b.addEventListener('loadeddata', onReady)

        const onAfterPlay = () => { void b.play() }
        const onAfterPause = () => { b.pause() }
        const onAfterSeeked = () => { b.currentTime = a.currentTime }
        a.addEventListener('play', onAfterPlay)
        a.addEventListener('pause', onAfterPause)
        a.addEventListener('seeked', onAfterSeeked)

        const driftId = window.setInterval(() => {
            if (a.paused || b.paused) return
            if (Math.abs(a.currentTime - b.currentTime) > 0.15) {
                b.currentTime = a.currentTime
            }
        }, 500)

        return () => {
            a.removeEventListener('loadeddata', onReady)
            b.removeEventListener('loadeddata', onReady)
            a.removeEventListener('play', onAfterPlay)
            a.removeEventListener('pause', onAfterPause)
            a.removeEventListener('seeked', onAfterSeeked)
            window.clearInterval(driftId)
        }
    }, [])

    return (
        <div
            className="relative select-none w-full bg-[#0A0A0A] shadow-2xl"
            style={{
                aspectRatio: '9 / 17',
                borderRadius: '14% / 7.4%',
                padding: '1.5%',
            }}
        >
            {/* Screen */}
            <div
                ref={screenRef}
                className="relative w-full h-full overflow-hidden bg-black cursor-ew-resize"
                style={{ borderRadius: '60px' }}
                onMouseDown={(e) => { isDragging.current = true; updatePos(e.clientX) }}
                onTouchStart={(e) => { isDragging.current = true; updatePos(e.touches[0].clientX) }}
            >
                {/* After video — wrapper crops out baked-in phone bezel (left) and "Photo Mode" header (top) */}
                <div className="absolute inset-0 overflow-hidden rounded-4xl">
                    <video
                        ref={afterRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        style={{
                            position: 'absolute',
                            width: '131%',
                            height: '129%',
                            left: '0',
                            top: '-8%',
                            objectFit: 'cover',
                        }}
                    >
                        <source src={STATIC_AFTER_VIDEO} type="video/mp4" />
                    </video>
                </div>

                {/* Before image — clipped to left of divider, positioned to match after-video face */}
                <div
                    className="absolute inset-0 overflow-hidden rounded-4xl"
                    style={{
                        clipPath: `inset(0 ${100 - dividerPos}% 0 0)`,
                        zIndex: 1,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={STATIC_BEFORE_IMAGE}
                        alt="Before"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '98%',
                            left: '0%',
                            top: '-1.8%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                        }}
                    />
                </div>

                {/* Vertical divider line — full height, bottom panel covers lower portion */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
                    style={{
                        left: `${dividerPos}%`,
                        transform: 'translateX(-50%)',
                        zIndex: 2,
                    }}
                />

                {/* "Try on yourself" pill */}
                <button
                    type="button"
                    className="absolute bg-[#1A1A1A] text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                    style={{ top: '3.5%', right: '5%', zIndex: 6 }}
                >
                    Try on yourself
                </button>

                {/* Bottom video panel — wrapper crops out baked-in rounded corners */}
                <div
                    className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
                    style={{ zIndex: 4, height: '41%', width: '110%', bottom: '-50px' }}
                >
                    <video
                        ref={bottomRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '102%',
                            left: '-4%',
                            bottom: 0,
                            objectFit: 'cover',
                        }}
                    >
                        <source src={STATIC_BOTTOM_VIDEO} type="video/mp4" />
                    </video>
                </div>

                {/* Before / After drag handle — sits above bottom panel, follows divider */}
                <div
                    className="absolute cursor-ew-resize"
                    style={{
                        left: `${dividerPos}%`,
                        bottom: '41%',
                        transform: 'translate(-50%, 50%)',
                        zIndex: 5,
                    }}
                    onMouseDown={(e) => { e.stopPropagation(); isDragging.current = true }}
                    onTouchStart={(e) => { e.stopPropagation(); isDragging.current = true }}
                >
                    <div className="flex items-center gap-2.5 mr-2">
                        <span className="text-white text-[12px] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Before</span>
                        <svg width="44" height="44" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                            <circle cx="27.1957" cy="27.1957" r="27.1957" fill="white" fillOpacity="0.41" />
                            <path d="M19.7835 21.4745V33.9694C19.7835 34.5372 19.4571 35.0548 18.9444 35.3001C18.7419 35.3955 18.5246 35.4442 18.3088 35.4442C17.9785 35.4442 17.6501 35.3321 17.3832 35.1173L9.6393 28.8698C9.29225 28.5901 9.0907 28.1678 9.0907 27.722C9.0907 27.2761 9.29225 26.8538 9.6393 26.5741L17.3836 20.3266C17.8256 19.9697 18.4332 19.8999 18.9459 20.1438C19.4571 20.3891 19.7835 20.9062 19.7835 21.4745Z" fill="white" />
                            <path d="M34.6076 21.4745V33.9694C34.6076 34.5372 34.934 35.0548 35.4467 35.3001C35.6492 35.3955 35.8665 35.4442 36.0823 35.4442C36.4127 35.4442 36.741 35.3321 37.008 35.1173L44.7518 28.8698C45.0989 28.5901 45.3004 28.1678 45.3004 27.722C45.3004 27.2761 45.0989 26.8538 44.7518 26.5741L37.0075 20.3266C36.5655 19.9697 35.9579 19.8999 35.4452 20.1438C34.934 20.3891 34.6076 20.9062 34.6076 21.4745Z" fill="white" />
                        </svg>
                        <span className="text-white text-[12px] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">After</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
