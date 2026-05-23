'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

interface MakeupCategory {
    id: string
    label: string
    sectionTitle?: string
    options?: string[]
}

const MAKEUP_CATEGORIES: MakeupCategory[] = [
    { id: 'lipstick', label: 'Lipstick', sectionTitle: 'Effects', options: ['Matte', 'Natural'] },
    { id: 'lipliner', label: 'Lipliner', sectionTitle: 'Finish options', options: ['Matte', 'Satin'] },
    { id: 'eyeshadow', label: 'Eyeshadow', sectionTitle: 'Placement', options: ['Lid', 'Crease', 'Lower Lash', 'Inner Corner'] },
    { id: 'eyeliner', label: 'Eyeliner', sectionTitle: 'Style', options: ['Wing', 'Tight Line', 'Smudged', 'Straight'] },
    { id: 'mascara', label: 'Mascara' },
    { id: 'eyebrows', label: 'Eyebrows' },
    { id: 'foundation', label: 'Foundation', sectionTitle: 'Finish options', options: ['Matte', 'Satin', 'Dewy', 'Natural'] },
    { id: 'concealer', label: 'Concealer', sectionTitle: 'Finish options', options: ['Matte', 'Natural'] },
    { id: 'contour', label: 'Contour' },
    { id: 'bronzer', label: 'Bronzer' },
    { id: 'blush', label: 'Blush', sectionTitle: 'Finish options', options: ['Matte', 'Satin'] },
    { id: 'highlighter', label: 'Highlighter' },
]

interface MakeupOptionsProps {
    onClose?: () => void
    activeCategoryId?: string
    onCategoryChange?: (id: string) => void
    availableCategoryIds?: string[]
    availableOptions?: Record<string, string[]>
}

const MakeupOptions = ({
    onClose,
    activeCategoryId: controlledId,
    onCategoryChange,
    availableCategoryIds,
    availableOptions,
}: MakeupOptionsProps) => {
    const [internalId, setInternalId] = useState<string>(MAKEUP_CATEGORIES[0].id)
    const activeCategoryId = controlledId ?? internalId
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})
    const scrollRef = useRef<HTMLDivElement>(null)
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

    const activeCategory = MAKEUP_CATEGORIES.find(c => c.id === activeCategoryId) ?? MAKEUP_CATEGORIES[0]
    const activeSelected = selectedOptions[activeCategoryId] ?? []

    const setActive = (id: string) => {
        if (onCategoryChange) onCategoryChange(id)
        else setInternalId(id)
    }

    useEffect(() => {
        const btn = buttonRefs.current[activeCategoryId]
        const container = scrollRef.current
        if (!btn || !container) return
        const btnRect = btn.getBoundingClientRect()
        const ctRect = container.getBoundingClientRect()
        const offset = (btnRect.left + btnRect.right) / 2 - (ctRect.left + ctRect.right) / 2
        container.scrollBy({ left: offset, behavior: 'smooth' })
    }, [activeCategoryId])

    const toggleOption = (option: string) => {
        setSelectedOptions(prev => {
            const current = prev[activeCategoryId] ?? []
            const next = current.includes(option) ? current.filter(o => o !== option) : [...current, option]
            return { ...prev, [activeCategoryId]: next }
        })
    }

    return (
        <div className="w-full rounded-t-2xl sm:rounded-t-3xl text-white shadow-2xl overflow-hidden border border-white/15 bg-white/[0.07] backdrop-blur-[32px] backdrop-saturate-[1.8] font-[Inter,sans-serif]">
            <div className="flex justify-center pt-1.5 sm:pt-2.5 pb-0.5 sm:pb-1">
                <div className="h-0.5 sm:h-1 w-8 sm:w-10 rounded-full bg-white/40" />
            </div>

            <div className="flex items-center justify-between px-2.5 sm:px-4 py-1 sm:py-2">
                <h2 className="text-[13px] sm:text-[16px] md:text-[20px] font-medium text-white tracking-[-0.2px] leading-none m-0">Beauty features</h2>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close beauty features"
                    className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-black/30 hover:bg-black/40 transition-colors flex items-center justify-center"
                >
                    <X size={14} className="text-white" />
                </button>
            </div>

            <div className="px-3 sm:px-5 pb-2 sm:pb-4">
                <div ref={scrollRef} className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar -mx-3 sm:-mx-5 px-3 sm:px-5">
                    {MAKEUP_CATEGORIES.map(cat => {
                        const isActive = cat.id === activeCategoryId
                        const isDisabled = availableCategoryIds ? !availableCategoryIds.includes(cat.id) : false
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                ref={(el) => { buttonRefs.current[cat.id] = el }}
                                onClick={() => !isDisabled && setActive(cat.id)}
                                disabled={isDisabled}
                                aria-disabled={isDisabled}
                                className={`shrink-0 rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 text-[10px] sm:text-[12px] md:text-[14px] font-medium transition-colors ${
                                    isDisabled
                                        ? 'bg-white/30 text-[#1A1A1A]/40 cursor-not-allowed'
                                        : isActive
                                            ? 'bg-black text-white'
                                            : 'bg-white text-[#1A1A1A] hover:bg-white/90'
                                }`}
                            >
                                {cat.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="border-t border-white/15" />

            <div className="hidden px-3 sm:px-4 py-2 sm:py-2.5 min-h-[64px] sm:min-h-[100px]">
                {activeCategory.sectionTitle && activeCategory.options ? (
                    <>
                        <h3 className="text-[11px] sm:text-[13px] md:text-[15px] font-semibold text-white leading-none mb-2 sm:mb-3">{activeCategory.sectionTitle}</h3>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {activeCategory.options.map(option => {
                                const isSelected = activeSelected.includes(option)
                                const allowed = availableOptions?.[activeCategoryId]
                                const isDisabled = allowed ? !allowed.includes(option) : true
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => !isDisabled && toggleOption(option)}
                                        disabled={isDisabled}
                                        aria-disabled={isDisabled}
                                        className={`rounded-full px-2.5 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-[12px] md:text-[14px] font-medium border transition-colors ${
                                            isDisabled
                                                ? 'bg-transparent text-white/30 border-white/15 cursor-not-allowed'
                                                : isSelected
                                                    ? 'bg-white text-[#1A1A1A] border-white'
                                                    : 'bg-transparent text-white border-white/40 hover:bg-white/10'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <p className="text-[11px] sm:text-[13px] md:text-[14px] text-white/70">No additional options for {activeCategory.label}.</p>
                )}
            </div>
        </div>
    )
}

export default memo(MakeupOptions)
