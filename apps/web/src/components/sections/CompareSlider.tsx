'use client'

import Image from 'next/image'
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'

interface CompareSliderProps {
    beforeSrc: string
    afterSrc: string
    className?: string
    style?: CSSProperties
    initialPos?: number
    priority?: boolean
    sizes?: string
}

const CompareSlider = ({
    beforeSrc,
    afterSrc,
    className = '',
    style,
    initialPos = 50,
    priority = false,
    sizes = '(max-width: 768px) 100vw, 450px',
}: CompareSliderProps) => {
    const [dividerPos, setDividerPos] = useState(initialPos)
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
        <div
            ref={screenRef}
            className={`cursor-ew-resize select-none overflow-hidden ${className}`}
            style={style}
            onMouseDown={(e) => { isDragging.current = true; updatePos(e.clientX) }}
            onTouchStart={(e) => { isDragging.current = true; updatePos(e.touches[0].clientX) }}
        >
            {/* After image — base layer */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={afterSrc}
                    alt="After"
                    fill
                    sizes={sizes}
                    priority={priority}
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Before image — clipped to left of divider */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{
                    clipPath: `inset(0 ${100 - dividerPos}% 0 0)`,
                    zIndex: 1,
                }}
            >
                <Image
                    src={beforeSrc}
                    alt="Before"
                    fill
                    sizes={sizes}
                    priority={priority}
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Vertical divider line */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
                style={{
                    left: `${dividerPos}%`,
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                }}
            />

            {/* Before / After drag handle */}
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
                <div className="flex items-center gap-2.5 max-[574px]:gap-1.5">
                    <span className="text-white text-[12px] max-[574px]:text-[10px] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Before</span>
                    <svg width="44" height="44" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md max-[574px]:w-8 max-[574px]:h-8">
                        <circle cx="27.1957" cy="27.1957" r="27.1957" fill="white" fillOpacity="0.41" />
                        <path d="M19.7835 21.4745V33.9694C19.7835 34.5372 19.4571 35.0548 18.9444 35.3001C18.7419 35.3955 18.5246 35.4442 18.3088 35.4442C17.9785 35.4442 17.6501 35.3321 17.3832 35.1173L9.6393 28.8698C9.29225 28.5901 9.0907 28.1678 9.0907 27.722C9.0907 27.2761 9.29225 26.8538 9.6393 26.5741L17.3836 20.3266C17.8256 19.9697 18.4332 19.8999 18.9459 20.1438C19.4571 20.3891 19.7835 20.9062 19.7835 21.4745Z" fill="white" />
                        <path d="M34.6076 21.4745V33.9694C34.6076 34.5372 34.934 35.0548 35.4467 35.3001C35.6492 35.3955 35.8665 35.4442 36.0823 35.4442C36.4127 35.4442 36.741 35.3321 37.008 35.1173L44.7518 28.8698C45.0989 28.5901 45.3004 28.1678 45.3004 27.722C45.3004 27.2761 45.0989 26.8538 44.7518 26.5741L37.0075 20.3266C36.5655 19.9697 35.9579 19.8999 35.4452 20.1438C34.934 20.3891 34.6076 20.9062 34.6076 21.4745Z" fill="white" />
                    </svg>
                    <span className="text-white text-[12px] max-[574px]:text-[10px] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">After</span>
                </div>
            </div>
        </div>
    )
}

export default CompareSlider
