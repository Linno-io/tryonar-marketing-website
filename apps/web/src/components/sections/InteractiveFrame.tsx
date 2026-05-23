import Image from 'next/image';
import { memo } from 'react';
import CompareSlider from './CompareSlider';
import MakeupOptions from './MakeupOptions';

const STATIC_BEFORE_IMAGE = '/hero-section/before-image.webp'
const Frame = '/hero-section/frame.webp'
const afterImages = ['1-lipstick.webp', '2-lipliner.webp', '3-foundation.webp', '4-Concealer.webp', '5-blush.webp'];
const STATIC_AFTER_IMAGE = `/hero-section/${afterImages[0]}`;

interface InteractiveFrameProps {
    priority?: boolean;
}

const InteractiveFrame = ({ priority = false }: InteractiveFrameProps) => {
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
                afterSrc={STATIC_AFTER_IMAGE}
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
                <MakeupOptions />
            </div>
        </div>
    );
};

export default memo(InteractiveFrame);
