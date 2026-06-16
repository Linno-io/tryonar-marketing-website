import { MagicSection as MagicSectionProps } from '@/lib/types/section';
import { Fragment, memo } from 'react';
import { Container } from '../ui';
import Link from 'next/link';

const MagicSection = ({data} : {data: MagicSectionProps}) => {
    const {
        title,
        description,
        additionalLink,
        statistics,
    } = data;

    return (
        <>
            <section className="relative py-16 md:py-20 lg:py-24 bg-[#00020B] overflow-hidden z-10 magic-section">
                 <Container size="xl" className="relative z-10 px-4 md:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        {
                            title && title.length > 0 && (
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                    {
                                        title.map((block, index) => {
                                            if(block.type === 'normal') {
                                                return <Fragment key={index}>{block.text}</Fragment>
                                            }else {
                                                return (
                                                    <span key={index} className="text-[#998188] font-bold">{' ' + block.text + ' '}</span>
                                                )
                                            }
                                        })
                                    }
                                </h2>
                            )
                        }
    
                        {
                            description && (
                                <p className="text-[#e7e5ea] text-base md:text-lg mx-auto">{description}</p>
                            )
                        }

                        {
                            additionalLink?.hasAdditionalLink && additionalLink?.text && additionalLink?.url && (
                                <Link href={additionalLink.url} className='flex items-center gap-2 text-[#FFA49B] text-base font-semibold text-center justify-center mt-6'>
                                    {additionalLink.text}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M11 1L1 11" stroke="#FFA49B" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 8.33572V1H3.66428" stroke="#FFA49B" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </Link>
                            )
                        }
                    </div>

                    {
                        statistics && statistics.length > 0 && (
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
                                {
                                    statistics.map((statistic, index) => (
                                        <div key={index} className='flex flex-row items-center sm:items-center gap-6 md:gap-8 lg:gap-12 rounded-xl md:rounded-[20px] lg:rounded-[30px] xl:rounded-[50px] bg-[linear-gradient(270deg,#FFF_23.08%,rgba(255,234,231,0.68)_100%)] p-5 sm:p-6 lg:p-8 xl:p-12'>
                                            <h3 className='facts-number text-[#2A2730] text-3xl md:text-5xl xl:text-6xl leading-tight tracking-[-2px] font-medium flex-shrink-0' dangerouslySetInnerHTML={{__html: statistic.value}}></h3>
                                            <div className='flex flex-col gap-2 text-left sm:text-left highlighted-border'>
                                                <h4 className='text-[#3E3E42] text-lg md:text-xl leading-tight font-semibold'>
                                                    {statistic.title}
                                                </h4>
                                                <p className='text-[#3E3E42] text-sm md:text-base leading-tight font-normal'>
                                                    {statistic.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                 </Container>
            </section>
        </>
    );
};

export default memo(MagicSection);