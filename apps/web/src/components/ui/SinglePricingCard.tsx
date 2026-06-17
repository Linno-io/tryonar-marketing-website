import { PricingCard } from '@/lib/types/section';
import Link from 'next/link';
import { memo } from 'react';

interface SinglePricingCardProps {
    card: PricingCard;
}

const SinglePricingCard = (props: SinglePricingCardProps) => {
    const { 
        card, 
    } = props;

    return (
        <>
            <div className={`tryon-single-price-card rounded-2xl md:rounded-[20px] p-6 md:p-7 lg:p-9 ${card.isPopular ? 'bg-[#202020]' : 'bg-white'}`}>
                <div className="price-card-header flex flex-col items-start justify-between min-h-[200px] md:min-h-[220px] lg:min-h-[235px]">
                    <div className='flex flex-col h-full relative'>
                        <h3 className={`price-card-name text-xl md:text-2xl lg:text-[26px] font-bold leading-tight mb-2 md:mb-2.5 ${card.isPopular ? 'text-[#FFFFFFE5]' : 'text-[#2A2730E5]'}`}>
                            {card.heading}
                        </h3>
                        <p className={`price-card-description font-normal text-sm md:text-[15px] leading-normal ${card.isPopular ? 'text-[#AEAEAE]' : 'text-[#646464]'}`}>
                            {card.description}
                        </p>
                    </div>

                    <div className='price-card-price-wrapper mt-auto w-full flex flex-col gap-6 md:gap-7 lg:gap-8'>
                        {
                            card.price != null && (
                                <div className='price-card-price mt-4 md:mt-6 lg:mt-8'>
                                    <p className={`text-3xl md:text-4xl lg:text-[40px] font-bold leading-none ${card.isPopular ? 'text-[#FFFFFFE5]' : 'text-[#000000E5]'}`}>
                                        ${card.price}

                                        <sub className={`${card.isPopular ? 'text-[#989898]' : 'text-[#646464]'} text-xs md:text-sm lg:text-[14px] font-normal ml-2 align-baseline`}>
                                            {card.duration}
                                        </sub>
                                    </p>
                                </div>
                            )
                        }
                        {
                            card.customPricingText && (
                                <p className={`text-lg md:text-[20px] font-medium leading-none mt-auto ${card.isPopular ? 'text-[#FFFFFFE5]' : 'text-[#000000E5]'}`}>
                                    {card.customPricingText}
                                </p>
                            )
                        }
                        <Link href={card.primaryButton.internalLink || card.primaryButton.externalLink || '#'} target={card.primaryButton.externalLink ? '_blank' : '_self'}>
                            <button className={`cursor-pointer rounded-xl w-full h-10 md:h-11 text-center text-sm md:text-base font-semibold leading-none ${card.isPopular ? 'bg-[#FFFFFF] text-[#202020]' : card.customPricingText ? 'bg-[#F0F1F0] text-[#202020]' : 'bg-[#151515] text-[#FFFFFF]'}`}>
                                {card.primaryButton.text}
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="price-card-body mt-6 md:mt-7 lg:mt-8">
                    {
                        card.inCludedFeatures && card.inCludedFeatures.length > 0 && (
                            <>
                                <h4 className={`text-xs md:text-sm font-normal leading-none mb-3 md:mb-4 ${card.isPopular ? 'text-[#989898]' : 'text-[#646464]'}`}>
                                    {card.featuresSectionTitle}
                                </h4>

                                <ul className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                                    {
                                        card.inCludedFeatures.map((feature, index) => (
                                            <li key={index} className={`text-sm md:text-[15px] flex items-center gap-2 md:gap-2.5 leading-normal ${card.isPopular ? 'text-[#E6E6E6]' : 'text-[#3e3e42]'}`}>
                                                {
                                                    card.isPopular ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11"><path fill="#fff" d="M10.74 1.8a.87.87 0 0 0-1.23 0L3.96 7.35 1.49 4.88A.87.87 0 1 0 .26 6.12L3.34 9.2a.87.87 0 0 0 1.23 0l6.17-6.17a.87.87 0 0 0 0-1.23"/></svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11"><path fill="#636364" d="M10.74 1.8a.87.87 0 0 0-1.23 0L3.96 7.35 1.49 4.88A.87.87 0 1 0 .26 6.12L3.34 9.2a.87.87 0 0 0 1.23 0l6.17-6.17a.87.87 0 0 0 0-1.23"/></svg>
                                                    )
                                                }
                                                {feature}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                    }

                    {
                        card.usageLimits && card.usageLimits.length > 0 && (
                            <>
                                <h4 className={`text-xs md:text-sm font-normal leading-none mt-6 md:mt-7 lg:mt-8 mb-3 md:mb-4 ${card.isPopular ? 'text-[#989898]' : 'text-[#646464]'}`}>
                                    {card.usageLimitsSectionTitle}
                                </h4>

                                <ul className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                                    {
                                        card.usageLimits.map((feature, index) => (
                                            <li key={index} className={`text-sm md:text-[15px] flex items-center gap-2 md:gap-2.5 leading-normal ${card.isPopular ? 'text-[#E6E6E6]' : 'text-[#3e3e42]'}`}>
                                                {
                                                    card.isPopular ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11"><path fill="#fff" d="M10.74 1.8a.87.87 0 0 0-1.23 0L3.96 7.35 1.49 4.88A.87.87 0 1 0 .26 6.12L3.34 9.2a.87.87 0 0 0 1.23 0l6.17-6.17a.87.87 0 0 0 0-1.23"/></svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11"><path fill="#636364" d="M10.74 1.8a.87.87 0 0 0-1.23 0L3.96 7.35 1.49 4.88A.87.87 0 1 0 .26 6.12L3.34 9.2a.87.87 0 0 0 1.23 0l6.17-6.17a.87.87 0 0 0 0-1.23"/></svg>
                                                    )
                                                }
                                                {feature}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default memo(SinglePricingCard);