import { MagicSection as MagicSectionProps } from '@/lib/types/section';
import { Fragment, memo } from 'react';
import { Container } from '../ui';

const MagicSection = ({data} : {data: MagicSectionProps}) => {
    const {
        title,
        description,
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
                                <p className="text-[#E7E5EABF] text-base md:text-lg mx-auto">{description}</p>
                            )
                        }
                    </div>

                    {
                        statistics && statistics.length > 0 && (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                                {
                                    statistics.map((statistic, index) => (
                                        <div key={index} className='flex flex-col sm:flex-row items-center sm:items-center gap-6 md:gap-8 lg:gap-12 rounded-3xl md:rounded-[40px] lg:rounded-[50px] bg-[linear-gradient(270deg,#FFF_23.08%,rgba(255,234,231,0.68)_100%)] px-6 md:px-8 lg:px-12 py-8 md:py-10 lg:py-12'>
                                            <h4 className='text-[#2A2730] text-4xl md:text-5xl lg:text-6xl leading-tight tracking-[-2px] font-semibold flex-shrink-0' dangerouslySetInnerHTML={{__html: statistic.value}}></h4>
                                            <div className='flex flex-col gap-2 text-center sm:text-left highlighted-border'>
                                                <h3 className='text-[#3E3E42] text-lg md:text-xl leading-tight font-semibold'>
                                                    {statistic.title}
                                                </h3>
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