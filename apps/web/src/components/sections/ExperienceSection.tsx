'use client';
import React, { Fragment } from 'react';
import { Megaphone, Wallet, Users } from 'lucide-react';
import { Container } from '@/components/ui';
import { ExperienceSection as ExperienceSectionProps } from '@/lib/types/section';
import Image from 'next/image';

interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const ExperienceSection = ({ data }: { data: ExperienceSectionProps }) => {
    const { title, features: dynamicFeatures, sectionImage } = data;

    // Static icons mapping (not dynamic)
    const icons = [
        <Megaphone className="w-6 h-6 text-white" />,
        <Wallet className="w-6 h-6 text-white" />,
        <Users className="w-6 h-6 text-white" />,
        <Users className="w-6 h-6 text-white" />,
    ];

    // Combine dynamic data with static icons
    const features: Feature[] = dynamicFeatures.map((feature, index) => ({
        title: feature.title,
        description: feature.description,
        icon: icons[index] || <Users className="w-6 h-6 text-white" />,
    }));

    return (
        <section className="relative min-h-screen bg-black text-white px-6 py-15 lg:py-32 overflow-hidden md:overflow-visible section-experience ">
            <Container padding={false}>
                {/* Background Gradient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-900/30 to-transparent blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-0 md:mb-16 tracking-tight">
                        {title && title.map((block, index) => {
                            if (block.type === 'normal') {
                                return <span key={index}>{block.text}</span>;
                            } else {
                                return (
                                    <span key={index} className="text-[#998188]">
                                        {block.text}
                                    </span>
                                );
                            }
                        })}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-16 items-center">

                        {/* Left Column */}
                        <div className="order-2">
                            {features.slice(0, 2).map((item, idx) => (
                                <Fragment key={idx}>
                                    <div key={idx} className={`group relative z-10 py-10 ${idx === 0 ? 'pt-0 md:pt-10' : ''}`}>
                                        <div className="mb-8 p-3 w-fit">
                                            {item.icon}
                                        </div>
                                        <p className="text-white text-[20px] leading-0 font-bold mb-4">{item.title}</p>
                                        <p className="text-[#E7E5EABF] text-base leading-relaxed max-w-sm mb-8">
                                            {item.description}
                                        </p>
                                    </div>
                                    {/* Dot-dot line between elements */}
                                    {idx === 0 && (
                                        <div className="w-full border-t border-dashed" style={{ borderColor: '#4D4D50' }}></div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                        {/* Center Phone Image */}
                        <div className="order-1 lg:order-2 flex justify-center relative mb-0 z-20 lg:-mb-[55%] scale-100 lg:scale-150">
                            <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[650px]">
                                {sectionImage && sectionImage.url && (
                                    <Image
                                        src={sectionImage.url}
                                        alt={sectionImage.alt || 'App Interface'}
                                        width={480}
                                        height={975}
                                        className="w-full h-full object-contain drop-shadow-2xl transform hover:rotate-[5deg] transition-transform duration-700"
                                    />
                                )}
                            </div>
                        </div>


                        <div className="order-3">
                            {features.slice(2, 4).map((item, idx) => (
                                <Fragment key={idx}>
                                    <div key={idx} className="group relative z-10 py-10">
                                        <div className="mb-8 p-3 w-fit">
                                            {item.icon}
                                        </div>
                                        <p className="text-white text-[20px] leading-0 font-bold mb-4">{item.title}</p>
                                        <p className="text-[#E7E5EABF] text-base leading-relaxed max-w-sm mb-8">
                                            {item.description}
                                        </p>
                                    </div>
                                    {idx === 0 && (
                                        <div className="w-full border-t border-dashed" style={{ borderColor: '#4D4D50' }}></div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ExperienceSection;