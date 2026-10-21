'use client'

import { useSyncExternalStore } from 'react'

// The hero demos cycle through ~15 shade photos stacked at opacity 0. Mounting
// them all at once makes them compete with the phone frame (the LCP image) for
// bandwidth on mobile. Before the page has loaded we mount only the visible
// image and the next one, so the next fade still has its image ready.
export function shouldMountCycleImage(index: number, activeIndex: number, length: number, pageLoaded: boolean): boolean {
    if (pageLoaded) return true
    return index === activeIndex || index === (activeIndex + 1) % length
}

function subscribeToLoad(onChange: () => void): () => void {
    window.addEventListener('load', onChange, { once: true })
    return () => window.removeEventListener('load', onChange)
}

/** True once the window `load` event has fired (always false on the server). */
export function usePageLoaded(): boolean {
    return useSyncExternalStore(
        subscribeToLoad,
        () => document.readyState === 'complete',
        () => false,
    )
}
