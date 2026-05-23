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

    const activeImage = CYCLE_CATEGORIES.find(c => c.id === activeCategoryId)?.image ?? CYCLE_CATEGORIES[0].image

    return (
        <div className="toa-interactive-frame relative inline-block">
            <Image
                src={Frame}
                alt={'Phone frame'}
                className="if-frame-img relative z-10 pointer-events-none"
                fetchPriority={priority ? 'high' : 'auto'}
                priority={priority}
                width={450}
                height={600}
            />

            <CompareSlider
                beforeSrc={STATIC_BEFORE_IMAGE}
                afterSrc={activeImage}
                priority={priority}
                className="toa-compare-element z-20 absolute"
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

            <div className='z-30 absolute top-[calc(100%-226px)] left-11.25'>
                <MakeupOptions
                    activeCategoryId={activeCategoryId}
                    onCategoryChange={handleCategoryChange}
                    availableCategoryIds={CYCLE_CATEGORIES.map(c => c.id)}
                />
            </div>
        </div>
    );
};

export default memo(InteractiveFrame);
