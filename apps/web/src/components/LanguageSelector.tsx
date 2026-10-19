'use client'

import { memo, useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { LOCALES, LOCALE_NAMES, persistLocaleChoice, type Locale } from '@/lib/i18n/config'
import { localizePath, stripLocale } from '@/lib/i18n/links'
import { useDictionary, useLocale } from '@/lib/i18n/LocaleProvider'

const LanguageSelector = () => {
    const locale = useLocale()
    const { languageSelector } = useDictionary()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)
    const menuId = useId()

    useEffect(() => {
        if (!open) return
        const onPointerDown = (event: PointerEvent) => {
            if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false)
        }
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false)
        }
        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [open])

    const choose = (next: Locale) => {
        setOpen(false)
        // Written even when unchanged: picking the current language still records
        // a manual choice, which then outranks location detection on later visits.
        persistLocaleChoice(next)
        if (next === locale) return

        const target = `${localizePath(stripLocale(pathname).path, next)}${window.location.search}${window.location.hash}`
        // Full navigation rather than router.push: the proxy must see the new
        // cookie, and the client router may hold a prefetched redirect for the old language.
        window.location.assign(target)
    }

    return (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={`${languageSelector.label}: ${LOCALE_NAMES[locale]}`}
                className="flex items-center gap-1 h-9 px-2.5 rounded-full text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
            >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span className="uppercase">{locale}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {open && (
                <ul
                    id={menuId}
                    role="menu"
                    aria-label={languageSelector.label}
                    className="absolute right-0 top-full mt-3 min-w-44 bg-[#1A1A1A] border border-white/10 rounded-2xl py-2 shadow-2xl z-50"
                >
                    {LOCALES.map((option) => (
                        <li key={option} role="none">
                            <button
                                type="button"
                                role="menuitemradio"
                                aria-checked={option === locale}
                                lang={option}
                                onClick={() => choose(option)}
                                className="w-full flex items-center justify-between gap-4 px-4 py-2 text-left text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                {LOCALE_NAMES[option]}
                                {option === locale && <Check className="w-4 h-4 text-white" aria-hidden="true" />}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default memo(LanguageSelector)
