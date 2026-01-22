// @ts-nocheck
'use client'
import { useState } from 'react'
import { Heading, Text, Container } from '@/components/ui'
import Image from 'next/image'
import { Store, Target, TrendingUp, RefreshCcw, Quote } from 'lucide-react'
import { urlFor } from '@/lib/sanity/client'
import { SuccessStoriesSection as SuccessStoriesSectionProps } from '@/lib/types/section'

const iconMap = {
    'Store': Store,
    'Target': Target,
    'TrendingUp': TrendingUp,
    'RefreshCcw': RefreshCcw,
}

interface Props {
    data: SuccessStoriesSectionProps
}

export default function SuccessStoriesSection({ data }: Props) {
    const [activeTab, setActiveTab] = useState(0)

    const { eyebrow, heading, description, stats, stories } = data

    return (
        <section className="py-24 bg-[#f7f7ff]">
            <Container>
                <div className="text-center mb-16">
                    <Text className="font-bold text-[#0AA44C] tracking-widest uppercase mb-4" as="span">
                        {eyebrow}
                    </Text>
                    <Heading level={3} className="font-extrabold text-[#1F2937] mb-3.5">
                        {heading}
                    </Heading>
                    <Text variant="large" className="text-gray-500 max-w-2xl mx-auto">
                        {description}
                    </Text>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[50px] items-start">
                    {/* Left Column: Stat Cards */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {stats.map((stat:any, idx:any) => {
                            const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Store
                            return (
                                <div
                                    key={idx}
                                    className="bg-white p-6 rounded-xl shadow-sm border border-white flex items-center gap-5"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#f7f7ff] flex items-center justify-center flex-shrink-0">
                                        <IconComponent className="w-5 h-5 text-[#9F3AED]" />
                                    </div>
                                    <div>
                                        <Heading level={4} className="text-[#1F2937] leading-none mb-1">
                                            {stat.label}
                                        </Heading>
                                        <Text variant="small" className="font-medium text-gray-400">
                                            {stat.sublabel}
                                        </Text>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Right Column: Carousel Card */}
                    <div className="lg:col-span-8 relative">
                        <div className="absolute -left-[28px] top-12 z-20 hidden md:flex w-14 h-14 bg-white shadow-xl rounded-xl items-center justify-center text-[#9F3AED]">
                            <Quote size={28} fill="currentColor" />
                        </div>

                        <div className="bg-white rounded-[32px] p-8 md:p-14 shadow-sm border border-white min-h-[520px] flex flex-col justify-between">
                            <div>
                                <Text variant="small" className="font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    Success Story
                                </Text>
                                <Heading level={3} className="text-[#1F2937] mb-8">
                                    {stories[activeTab].industry}
                                </Heading>

                                <Text variant="lead" className="italic leading-relaxed mb-10 text-[#4B5563]">
                                    &quot;{stories[activeTab].quote}&quot;
                                </Text>

                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden relative">
                                        <Image
                                            src={urlFor(stories[activeTab].avatar).width(56).height(56).url()}
                                            alt={stories[activeTab].author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <Text className="font-bold text-[#1F2937]">
                                            {stories[activeTab].author}
                                        </Text>
                                        <Text variant="small" className="font-bold text-gray-400 tracking-wider uppercase">
                                            {stories[activeTab].role}
                                        </Text>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <hr className="border-gray-100 mb-10" />
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Results Metrics */}
                                    <div>
                                        <p className="text-2xl md:text-3xl font-bold text-[#0AA44C] mb-1">{stories[activeTab].metrics.conversion}</p>
                                        <Text variant="small" className="font-bold text-gray-400 uppercase tracking-wider">
                                            Conversion
                                        </Text>
                                    </div>
                                    <div>
                                        <p className="text-2xl md:text-3xl font-bold text-[#0AA44C] mb-1">{stories[activeTab].metrics.return}</p>
                                        <Text variant="small" className="font-bold text-gray-400 uppercase tracking-wider">
                                            Return
                                        </Text>
                                    </div>
                                    <div>
                                        <p className="text-2xl md:text-3xl font-bold text-[#0AA44C] mb-1">{stories[activeTab].metrics.satisfaction}</p>
                                        <Text variant="small" className="font-bold text-gray-400 uppercase tracking-wider">
                                            Satisfaction
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Indicator Dots */}
                        <div className="flex justify-center gap-2 mt-10">
                            {stories.map((_, i) => (
                                <button
                                    key={i}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${i === activeTab
                                            ? 'w-10 bg-[#9F3AED]'
                                            : 'w-2.5 bg-[#E5E7EB] hover:bg-gray-300'
                                        }`}
                                    onClick={() => setActiveTab(i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}