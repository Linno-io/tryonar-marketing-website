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
            <section className="relative pt-24 pb-24 bg-[#00020B] overflow-hidden z-10 magic-section">
                 <Container size="xl" className="relative z-10">
                    <div className="text-center">
                        {
                            title && title.length > 0 && (
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
                                <p className="text-[#E7E5EABF] text-lg mx-auto">{description}</p>
                            )
                        }
                    </div>

                    {
                        statistics && statistics.length > 0 && (
                            <div className='grid grid-cols-2 gap-1 mt-16'>
                                {
                                    statistics.map((statistic, index) => (
                                        <div key={index} className='flex items-center gap-12 rounded-[50px] bg-[linear-gradient(270deg,#FFF_23.08%,rgba(255,234,231,0.68)_100%)] pl-12.5 pr-8 py-15'>
                                            <h4 className='text-[#2A2730] text-[48px] leading-3 tracking-[-2px] font-semibold' dangerouslySetInnerHTML={{__html: statistic.value}}></h4>
                                            <div className='flex flex-col gap-2.5 flex-start highlighted-border'>
                                                <h3 className='text-[#3E3E42] text-[20px] leading-none font-semibold'>
                                                    {statistic.title}
                                                </h3>
                                                <p className='text-[#3E3E42] text-[16px] leading-none font-normal'>
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