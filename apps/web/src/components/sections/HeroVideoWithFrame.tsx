import { memo } from 'react';
import { HeroSection as HeroSectionType } from '@/lib/types/section'
import Image from 'next/image';

const HeroVideoWithFrame = ({ data }: { data: HeroSectionType }) => {
    const {
        sectionImage,
        sectionVideo,
        posterImage,
    } = data;

    return (
        <div className="hero-with-video-frame relative w-full">
            {sectionVideo?.url && (
                <video
                    className="absolute z-0 object-cover top-1.75 md:top-3.25"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={posterImage?.url}
                    style={{
                        left: '14%',
                        width: '58%',
                        height: '90%',
                        borderRadius: '6%',
                    }}
                >
                    <source src={sectionVideo.url} type="video/mp4" />
                </video>
            )}
            <Image
                src={sectionImage.url}
                alt={sectionImage.alt || 'Hero Section Image'}
                className="w-full h-auto object-contain drop-shadow-2xl relative z-10 pointer-events-none"
                fetchPriority="high"
                width={sectionImage.width}
                height={sectionImage.height}
            />
        </div>
    );
};

export default memo(HeroVideoWithFrame);
