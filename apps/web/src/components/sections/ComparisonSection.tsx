import { ComparisonSection as ComparisonSectionProps } from '@/lib/types/section';
import { Fragment, memo } from 'react';
import { Container, DotBackground, Heading } from '../ui';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SanityImage } from '@/lib/types/siteSettings';
import Image from 'next/image';
import { StarIcon } from '../ui/Icons/StarIcon';
import PopularTag from '../ui/Icons/PopularTag';

interface Card {
    title: string;
    features: string[]
}

const Card = ({data, featured = false} : {data : Card, featured?: boolean}) => {
    const {
        title,
        features,
    } = data;

    return (
        <div className={`comparison-card ${featured ? 'bg-[#00020B]' : 'bg-white border border-[#ECEDF1] '} rounded-2xl md:rounded-[20px] xl:rounded-[30px] p-[22px_24px] xl:p-[40px_50px] flex-1 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04),0_8px_10px_-6px_rgba(0,0,0,0.05)] relative`}>
            {
                featured && (
                    <span className=' sm:block absolute top-2 xl:top-7 right-3 xl:right-6.5'>
                        <PopularTag />
                    </span>
                )
            }

            <h3 className={`text-xl lg:text-[24px] xl:text-[30px] font-[Circular_Std_Bold] font-bold tracking-[-0.6px] mb-4 xl:mb-5  ${featured ? 'text-white' : 'text-[#838383]'}`}>
                {title}
            </h3>

            <ul className="list-none list-inside space-y-2 xl:space-y-3">
                {features.map((feature, index) => (
                    <li key={index} className={`${featured ? 'text-[#FFFFFFBF]' : 'text-[#3e3e42bf] '} flex items-center gap-2.5 md:gap-4 text-base font-normal leading-normal font-[Inter]`}>
                        {
                            featured ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M12.5508 1L4.60962 10L1 5.90909" stroke="#35BD4C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M10.1762 10.1094L0.75 0.775879" stroke="#EC5956" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.1103 0.75004L0.776815 10.1763" stroke="#EC5956" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            )
                        }
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    )
};

const ComparisonSection = ({data} : {data : ComparisonSectionProps}) => {
    const {
        title,
        description,
        traditionalAR,
        tryOnAR,
        basicWebAR,
        primaryButton,
    } = data;

    return (
        <>
            <section className="tryon-comparison relative p-[50px_0_60px] lg:p-[70px_0_80px] xl:p-[100px_0_110px] bg-[#F8F8F9] overflow-hidden z-10">
                <Container>
                    <div className="section-title-wrapper text-center mb-9 xl:mb-12">
                        {
                            title && title.length > 0 && (
                                <Heading level={2} className="2xl:text-5xl lg:text-4xl text-3xl font-bold text-[#1A202C] mb-2.5 tracking-tight leading-tight max-w-[867px] mx-auto">
                                    {
                                        title.map((block, index) => {
                                            if(block.type === 'normal') {
                                                return <Fragment key={index}>{block.text}</Fragment>
                                            }else {
                                                return (
                                                    <span key={index} className="text-[#838383] font-bold">{' ' + block.text + ' '}</span>
                                                )
                                            }
                                        })
                                    }
                                </Heading>
                            )
                        }
    
                        {
                            description && (
                                <p className="text-[#3E3E42] text-[15px] md:text-[18px] xl:text-[19px] font-normal leading-relaxed max-w-[867px] mx-auto">{description}</p>
                            )
                        }
                    </div>

                    <div className="cards-wrapper flex flex-col lg:flex-row items-stretch justify-between gap-4 sm:gap-5 md:gap-6 lg:gap-2">
                        <Card data={traditionalAR}  />
                        <Card data={tryOnAR} featured={true} />
                        <Card data={basicWebAR}  />
                    </div>

                    {
                        primaryButton && primaryButton.text && (
                            <div className="buttons-wrapper flex items-center justify-center mt-8 sm:mt-12 md:mt-14 lg:mt-15">
                                {
                                    primaryButton && (
                                        <Link href={primaryButton?.internalLink || primaryButton?.externalLink || '#'} target={primaryButton?.externalLink ? '_blank' : '_self'}>
                                            <button className="mx-auto sm:mx-none sm:w-full cursor-pointer sm:w-auto bg-[#121212] text-white px-5 sm:px-9 py-3 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5 text-sm sm:text-base">
                                                {primaryButton?.text}
                                                {primaryButton?.showIcon !== false ? <ArrowUpRight size={20} /> : null}
                                            </button>
                                        </Link>
                                    )
                                }
                            </div>
                        )
                    }
                </Container>
            </section>
        </>
    );
};

export default memo(ComparisonSection);