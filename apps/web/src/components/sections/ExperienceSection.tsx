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

const DeliveryIcon = () => (
    <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="35" height="30" viewBox="0 0 35 30" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M4.03845 17.959V23.6538C4.03845 25.5656 5.58824 27.1154 7.49999 27.1154H8.24416C8.74061 28.7836 10.286 30 12.1154 30C13.9448 30 15.4901 28.7836 15.9866 27.1154H21.5134C22.0098 28.7836 23.5552 30 25.3846 30C27.214 30 28.7594 28.7836 29.2558 27.1154H31.1538C33.0656 27.1154 34.6154 25.5656 34.6154 23.6538V17.9052C34.6154 17.7016 34.5615 17.5016 34.4592 17.3256L32.0976 13.261C31.478 12.1947 30.3378 11.5385 29.1045 11.5385H25.9582L23.4019 8.66204C22.745 7.92294 21.8034 7.5 20.8145 7.5H18.975C19.0169 7.87887 19.0385 8.26385 19.0385 8.65385C19.0385 9.04385 19.0169 9.42883 18.975 9.80769H20.8145C21.1442 9.80769 21.458 9.94869 21.677 10.195L24.2308 13.0686V22.0903C22.9282 22.478 21.901 23.5051 21.5134 24.8077H15.9866C15.4901 23.1395 13.9448 21.9231 12.1154 21.9231C10.286 21.9231 8.74061 23.1395 8.24416 24.8077H7.49999C6.86272 24.8077 6.34614 24.2911 6.34614 23.6538V18.7812C5.53695 18.5975 4.76364 18.3194 4.03845 17.959ZM26.5385 22.0903C27.841 22.478 28.8682 23.5051 29.2558 24.8077H31.1538C31.7911 24.8077 32.3077 24.2911 32.3077 23.6538V19.6154H28.8461C28.2089 19.6154 27.6923 19.0988 27.6923 18.4615C27.6923 17.8243 28.2089 17.3077 28.8461 17.3077H31.7799L30.1022 14.4203C29.8957 14.0649 29.5157 13.8462 29.1045 13.8462H26.5385V22.0903ZM12.1154 24.2308C11.1595 24.2308 10.3846 25.0056 10.3846 25.9615C10.3846 26.9174 11.1595 27.6923 12.1154 27.6923C13.0713 27.6923 13.8461 26.9174 13.8461 25.9615C13.8461 25.0056 13.0713 24.2308 12.1154 24.2308ZM25.3846 24.2308C24.4287 24.2308 23.6538 25.0056 23.6538 25.9615C23.6538 26.9174 24.4287 27.6923 25.3846 27.6923C26.3405 27.6923 27.1154 26.9174 27.1154 25.9615C27.1154 25.0056 26.3405 24.2308 25.3846 24.2308Z" fill="white"/>
  <path d="M11.9175 7.02225C12.3681 6.57162 12.3681 5.84106 11.9175 5.39042C11.4669 4.93985 10.7363 4.93985 10.2857 5.39042L8.6539 7.02225L7.02213 5.39042C6.57149 4.93985 5.84094 4.93985 5.3903 5.39042C4.93972 5.84106 4.93972 6.57162 5.3903 7.02225L7.02213 8.65402L5.3903 10.2858C4.93972 10.7364 4.93972 11.467 5.3903 11.9176C5.84094 12.3682 6.57149 12.3682 7.02213 11.9176L8.6539 10.2858L10.2857 11.9176C10.7363 12.3682 11.4669 12.3682 11.9175 11.9176C12.3681 11.467 12.3681 10.7364 11.9175 10.2858L10.2857 8.65402L11.9175 7.02225Z" fill="white"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M8.65385 0C13.4332 0 17.3077 3.87444 17.3077 8.65385C17.3077 13.4332 13.4332 17.3077 8.65385 17.3077C3.87446 17.3077 0 13.4332 0 8.65385C0 3.87444 3.87446 0 8.65385 0ZM15 8.65385C15 5.14898 12.1587 2.30769 8.65385 2.30769C5.14898 2.30769 2.30769 5.14898 2.30769 8.65385C2.30769 12.1587 5.14898 15 8.65385 15C12.1587 15 15 12.1587 15 8.65385Z" fill="white"/>
</svg>
)

const ExperienceSection = ({ data }: { data: ExperienceSectionProps }) => {
    const { title, features: dynamicFeatures, sectionImage } = data;

    // Static icons mapping (not dynamic)
    const icons = [
        <Megaphone className="w-6 h-6 text-white" />,
        <Wallet className="w-6 h-6 text-white" />,
        <Users className="w-6 h-6 text-white" />,
        <DeliveryIcon />,
    ];

    // Combine dynamic data with static icons
    const features: Feature[] = dynamicFeatures.map((feature, index) => ({
        title: feature.title,
        description: feature.description,
        icon: icons[index] || <Users className="w-6 h-6 text-white" />,
    }));

    return (
        <section className="relative bg-black text-white px-6 pt-15 pb-15 lg:pb-0 lg:pt-25 section-experience">
            <Container padding={false}>
                {/* Background Gradient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-900/30 to-transparent blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8 lg:mb-25 tracking-tight">
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-16 items-start">

                        {/* Left Column */}
                        <div className="order-2 lg:order-1 pb-0 lg:pb-6">
                            {features.slice(0, 2).map((item, idx) => (
                                <Fragment key={idx}>
                                    <div className={`group relative z-10 ${idx === 0 ? 'pt-8 lg:pt-0 pb-8 lg:pb-10' : 'pt-8 lg:pt-10 pb-8 lg:pb-0'}`}>
                                        <div className="mb-4 w-fit">
                                            {item.icon}
                                        </div>
                                        <p className="text-white text-lg lg:text-[20px] leading-tight font-bold mb-3">{item.title}</p>
                                        <p className="text-[#E7E5EABF] text-sm lg:text-base leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                    {idx === 0 && (
                                        <div className="w-full border-t border-dashed" style={{ borderColor: '#4D4D50' }}></div>
                                    )}
                                </Fragment>
                            ))}
                        </div>

                        {/* Center Phone Image */}
                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-full h-auto mb-6 lg:-mb-20">
                                {sectionImage && sectionImage.url && (
                                    <Image
                                        src={sectionImage.url}
                                        alt={sectionImage.alt || 'App Interface'}
                                        width={480}
                                        height={975}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="order-3 lg:order-3 pb-0 lg:pb-6">
                            {features.slice(2, 4).map((item, idx) => (
                                <Fragment key={idx}>
                                    <div className={`group relative z-10 ${idx === 0 ? 'pt-8 lg:pt-0 pb-8 lg:pb-10' : 'pt-8 lg:pt-10 pb-8 lg:pb-0'}`}>
                                        <div className="mb-4 w-fit">
                                            {item.icon}
                                        </div>
                                        <p className="text-white text-lg lg:text-[20px] leading-tight font-bold mb-3">{item.title}</p>
                                        <p className="text-[#E7E5EABF] text-sm lg:text-base leading-relaxed">
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