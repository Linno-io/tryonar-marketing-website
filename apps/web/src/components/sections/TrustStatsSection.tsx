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
        <div className='overflow-hidden'>
            <section className='text-hero-section bg-[#F8F8F9] overflow-hidden'>
                <Container withBorder={true} padding={false} className='pt-30 pb-16 lg:pt-[253px] lg:pb-28'>
                    {
                        title && title.length > 0 && (
                            <h1 className="text-[30px] sm:text-[40px] md:text-[64px] lg:text-[68px] leading-[1.09] flex flex-col items-center justify-center">
                                <div className="flex items-center">
                                    <span>
                                    {title[0].text}
                                    </span>
                                    <Image 
                                        src={avatars && avatars.length > 0 ? avatars[0].url : '/placeholder-avatar.png'}
                                        alt="Avatar"
                                        width={70}
                                        height={70}
                                        className="inline-block ml-2 sm:ml-4 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px]"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <Image 
                                        src={avatars && avatars.length > 1 ? avatars[1].url : '/placeholder-avatar.png'}
                                        alt="Avatar"
                                        width={70}
                                        height={70}
                                        className="inline-block mr-2 sm:mr-4 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px]"
                                    />
                                    <span>
                                        {title[1].text}
                                    </span>
                                </div>
                            </h1>
                        )
                    }

                    <div className='flex flex-col md:flex-row items-center justify-center mt-12 sm:mt-16 md:mt-20 lg:mt-[110px] gap-4 md:gap-0 px-4 sm:px-6 md:px-0'>
                        {
                            stats && stats.length > 0  && stats.map((stat, index) => (
                                <div key={index} className={`
                                    w-full md:max-w-[280px] lg:max-w-[350px] text-center px-4 sm:px-5 relative rounded-[20px] sm:rounded-[30px] p-6 sm:p-8 lg:p-10 border-[#ECEDF1] border shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04)_0_8px_10px_-6px_rgba(0,0,0,0.05)] bg-white
                                    ${index === 0 ? 'md:rotate-[-2.914deg] z-10' : index === 1 ? '!border-[#00020B] custom-shadow md:rotate-[5.99deg] z-20' : 'md:rotate-[-3.63deg] z-30'}
                                `}>
                                    <p className='text-[#1A202C] font-medium text-[32px] sm:text-[38px] lg:text-[45px] text-left leading-none mb-3 lg:mb-4'>
                                        {stat.value}
                                    </p>
                                    <h3 className='text-[#3E3E42] text-[18px] sm:text-[20px] lg:text-[22px] font-medium leading-none mb-2 text-left'>
                                        {stat.title}
                                    </h3>
                                    <p className='text-[#3E3E42] text-sm sm:text-base leading-5 sm:leading-6 text-left'>
                                        {stat.description}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default memo(TrustStatsSection);