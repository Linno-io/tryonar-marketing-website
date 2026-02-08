import { TrustStatsSection as TrustStatsSectionProps } from '@/lib/types/section';
import { memo } from 'react';
import { Container } from '../ui';
import Image from 'next/image';

const TrustStatsSection = ({data} : {data: TrustStatsSectionProps}) => {
    const {
        title,
        avatars,
        stats
    } = data;

    return (
        <>
            <section className='text-hero-section bg-[#F8F8F9]'>
                <Container withBorder={true} padding={false} className='pt-30 pb-16 lg:pt-[253px] lg:pb-28'>
                    {
                        title && title.length > 0 && (
                            <h1 className="text-[32px] sm:text-[40px] md:text-[64px] lg:text-[68px] leading-[1.09] flex flex-col items-center justify-center">
                                <div>
                                    <span>
                                    {title[0].text}
                                    </span>
                                    <Image 
                                        src={avatars && avatars.length > 0 ? avatars[0].url : '/placeholder-avatar.png'}
                                        alt="Avatar"
                                        width={70}
                                        height={70}
                                        className="inline-block ml-4"
                                    />
                                </div>

                                <div>
                                    <Image 
                                        src={avatars && avatars.length > 1 ? avatars[1].url : '/placeholder-avatar.png'}
                                        alt="Avatar"
                                        width={70}
                                        height={70}
                                        className="inline-block ml-4"
                                    />
                                    <span>
                                        {title[1].text}
                                    </span>
                                </div>
                            </h1>
                        )
                    }

                    <div className='flex items-center justify-center mt-[110px]'>
                        {
                            stats && stats.length > 0  && stats.map((stat, index) => (
                                <div key={index} className={`
                                    max-w-[350px] text-center px-5 relative rounded-[30px] p-10 border-[#ECEDF1] border shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04)_0_8px_10px_-6px_rgba(0,0,0,0.05)] bg-white
                                    ${index === 0 ? 'rotate-[-2.914deg] z-10' : index === 1 ? '!border-[#00020B] custom-shadow rotate-[5.99deg] z-20' : 'rotate-[-3.63deg] z-30'}
                                `}>
                                    <p className='text-[#1A202C] font-medium text-[45px] text-left leading-none mb-4'>
                                        {stat.value}
                                    </p>
                                    <h3 className='text-[#3E3E42] text-[22px] font-medium leading-none mb-2 text-left'>
                                        {stat.title}
                                    </h3>
                                    <p className='text-[#3E3E42] text-base leading-6 text-left'>
                                        {stat.description}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </section>
        </>
    );
};

export default memo(TrustStatsSection);