'use client'

import { memo, useState } from 'react'
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
}

const MakeupOptions = ({ onClose }: MakeupOptionsProps) => {
    const [activeCategoryId, setActiveCategoryId] = useState<string>(MAKEUP_CATEGORIES[0].id)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})

    const activeCategory = MAKEUP_CATEGORIES.find(c => c.id === activeCategoryId) ?? MAKEUP_CATEGORIES[0]
    const activeSelected = selectedOptions[activeCategoryId] ?? []

    const toggleOption = (option: string) => {
        setSelectedOptions(prev => {
            const current = prev[activeCategoryId] ?? []
            const next = current.includes(option) ? current.filter(o => o !== option) : [...current, option]
            return { ...prev, [activeCategoryId]: next }
        })
    }

    return (
        <div className="w-full max-w-[370px] rounded-t-3xl text-white shadow-2xl overflow-hidden border border-white/15 bg-white/[0.07] backdrop-blur-[32px] backdrop-saturate-[1.8] font-[Inter,sans-serif]">
            <div className="flex justify-center pt-2.5 pb-1">
                <div className="h-1 w-10 rounded-full bg-white/40" />
            </div>

            <div className="flex items-center justify-between px-4 py-2">
                <h2 className="text-[20px] font-semibold text-white tracking-[-0.2px] leading-none m-0">Beauty features</h2>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close beauty features"
                    className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/40 transition-colors flex items-center justify-center"
                >
                    <X size={16} className="text-white" />
                </button>
            </div>

            <div className="px-5 pb-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
                    {MAKEUP_CATEGORIES.map(cat => {
                        const isActive = cat.id === activeCategoryId
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setActiveCategoryId(cat.id)}
                                className={`shrink-0 rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors ${
                                    isActive ? 'bg-black text-white' : 'bg-white text-[#1A1A1A] hover:bg-white/90'
                                }`}
                            >
                                {cat.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="border-t border-white/15" />

            <div className="px-4 py-2.5 min-h-[100px]">
                {activeCategory.sectionTitle && activeCategory.options ? (
                    <>
                        <h3 className="text-[15px] font-semibold text-white leading-none mb-3">{activeCategory.sectionTitle}</h3>
                        <div className="flex flex-wrap gap-2">
                            {activeCategory.options.map(option => {
                                const isSelected = activeSelected.includes(option)
                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => toggleOption(option)}
                                        className={`rounded-full px-4 py-2 text-[14px] font-medium border transition-colors ${
                                            isSelected
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
                    <p className="text-[14px] text-white/70">No additional options for {activeCategory.label}.</p>
                )}
            </div>
        </div>
    )
}

export default memo(MakeupOptions)
