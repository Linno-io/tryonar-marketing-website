import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { VirtualTryonSection as VirtualTryonSectionProps } from '@/lib/types/section';
import Link from 'next/link';
import { Button } from '../ui';

const VirtualTryOnSection = ({ data }: { data: VirtualTryonSectionProps }) => {
    const { title, description, sectionImage, primaryButton } = data;

    return (
        <section className="max-w-7xl mx-auto px-6 py-12.5 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Content Column */}
                <div>
                    <h2 className="text-3xl md:text-4xl lg:text-[54px] font-bold text-[#1A202C] leading-tight w-full md:w-[450px]">
                        {title && title.map((block, index) => {
                            if (block.type === 'normal') {
                                return <span key={index}>{block.text}</span>;
                            } else {
                                return (
                                    <span key={index} className="text-[#838383] font-medium">
                                        {block.text}
                                    </span>
                                );
                            }
                        })}
                    </h2>

                    <p className="text-base sm:text-lg text-[#3E3E42] max-w-md leading-relaxed mt-3 md:mt-5 mb-5 md:mb-7.5">
                        {description}
                    </p>

                    {primaryButton && (
                        <div className="tryon-cta-buttons flex gap-3.5">
                            {primaryButton?.text && (
                                <Button
                                    variant="primary"
                                    href={primaryButton.internalLink || primaryButton.externalLink || '#'}
                                    target={primaryButton.externalLink ? '_blank' : '_self'}
                                    showIcon={primaryButton.showIcon !== false}
                                    className='tryon-primary-btn'
                                >
                                    {primaryButton.text}
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Visual Column */}
                <div className="relative bg-slate-50 rounded-3xl overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
                    {sectionImage && sectionImage.url && (
                        <Image
                            src={sectionImage.url}
                            alt={sectionImage.alt || 'Virtual Try-On Platforms'}
                            width={800}
                            height={450}
                            className="object-contain w-full h-full"
                        />
                    )}
                </div>

            </div>
        </section>
    );
};

export default VirtualTryOnSection;
