"use client"

import { PricingTable } from '@/lib/types/section';
import Link from 'next/link';
import { memo, useState } from 'react';

const ComparisonTable = ({data} : {data: PricingTable}) => {
    const {
        heading,
        plans,
        features
    } = data;

    const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

    const handleNext = () => {
        setCurrentPlanIndex((prev) => (prev + 1) % plans.length);
    };

    const handlePrevious = () => {
        setCurrentPlanIndex((prev) => (prev - 1 + plans.length) % plans.length);
    };

    if(!data) return null;

    const visiblePlans = plans;
    const currentPlan = plans[currentPlanIndex];

    return (
        <>
            <div className="comparison-table">
                {/* Mobile Navigation */}
                <div className="lg:hidden flex items-center justify-between mb-4 md:mb-6 px-4 md:px-6">
                    <button
                        onClick={handlePrevious}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Previous plan"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    <span className="text-sm md:text-base font-medium text-[#646464]">
                        {currentPlanIndex + 1} of {plans.length}
                    </span>
                    <button
                        onClick={handleNext}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Next plan"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5">
                <div className='col-span-1 lg:col-span-2'>   
                    <p className='h-[120px] md:h-[140px] lg:h-[173px] text-[#646464] text-xs md:text-sm uppercase leading-normal border-b border-[#F4EEF7] flex justify-start px-4 md:px-6 lg:px-8 pb-4 md:pb-5 lg:pb-6 items-end'>
                        {heading}
                    </p>
                    {
                        features.map((feature => (
                            <p key={feature._key} className='feature-name h-[56px] md:h-[60px] lg:h-[64px] text-[#202020] font-medium text-sm md:text-[15px] leading-tight py-4 md:py-5 lg:py-6 border-b border-[#F4EEF7] flex items-center justify-start px-4 md:px-6 lg:px-8'>
                                {feature.label}
                            </p>
                        )))
                    }
                </div>

                {/* Mobile: Single Plan */}
                <div className="lg:hidden col-span-1">
                    <div className='px-4 md:px-6 flex flex-col justify-between gap-4 md:gap-5 h-[120px] md:h-[140px] border-b border-[#F4EEF7] pb-8 md:pb-10'>
                        <div className='flex flex-col gap-2 md:gap-3'>
                            <h3 className='text-[#202020E5] text-base md:text-lg font-bold leading-tight'>{currentPlan.title}</h3>
                            {
                                currentPlan.price && (
                                    <p className='text-[#202020E5] text-sm md:text-base leading-none'>
                                        {currentPlan.price}

                                        {
                                            currentPlan.badge && (
                                                <sub className='ml-1 text-xs md:text-sm text-[#A2A2A2] font-normal'>
                                                    {currentPlan.badge}
                                                </sub>
                                            )
                                        }
                                    </p>
                                )
                            }
                        </div>
                        {
                            currentPlan.primaryButton && currentPlan.primaryButton.text && (
                                <Link href={currentPlan.primaryButton.internalLink || currentPlan.primaryButton.externalLink || '#'} target={currentPlan.primaryButton.externalLink ? '_blank' : '_self'}>
                                    <button
                                        className={`rounded-xl cursor-pointer text-center w-full p-2 md:p-2.5 text-sm md:text-base font-semibold ${currentPlan.isPrimary ? 'text-white bg-[#202020]'  : 'text-[#202020] bg-[#F0F1F0]'}`}
                                    >
                                        {currentPlan.primaryButton.text}
                                    </button>
                                </Link>
                            )
                        }
                    </div>

                    {
                        features.map(feature => (
                            <p key={feature._key} className='text-[#2D3149] h-[56px] md:h-[60px] font-normal text-sm md:text-[15px] leading-none py-4 md:py-5 text-center flex items-center justify-center border-b border-[#F4EEF7] border-l'>
                              {feature.values && feature.values[currentPlanIndex] ? 
                                feature.values[currentPlanIndex].type === 'check' ? <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 14 11" fill="none"><path d="M13.7 0.323529C13.3 -0.107843 12.7 -0.107843 12.3 0.323529L4.8 8.41176L1.7 5.06863C1.3 4.63725 0.7 4.63725 0.3 5.06863C-0.1 5.5 -0.1 6.14706 0.3 6.57843L4.1 10.6765C4.3 10.8922 4.5 11 4.8 11C5.1 11 5.3 10.8922 5.5 10.6765L13.7 1.83333C14.1 1.40196 14.1 0.754902 13.7 0.323529Z" fill="#202020"/></svg> 
                                </span>
                                : feature.values[currentPlanIndex].type === 'cross' ? <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 11 11" fill="none"><path d="M10.1762 10.1094L0.75 0.775879" stroke="#202020" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.1103 0.75004L0.776815 10.1763" stroke="#202020" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </span>
                                : feature.values[currentPlanIndex].text || '—' : '—'}  
                            </p>
                        ))
                    }
                </div>

                {/* Desktop: All Plans */}
                {
                    visiblePlans.map((plan, index) => (
                        <div key={plan._key} className={`hidden lg:block col-span-1`}>
                            <div className='px-8 lg:px-10 xl:px-12 flex flex-col justify-between gap-5 h-[173px] border-b border-[#F4EEF7] pb-[45px]'>
                                <div className='flex flex-col gap-3.5'>
                                    <h3 className='text-[#202020E5] text-lg font-bold leading-none'>{plan.title}</h3>
                                    {
                                        plan.price && (
                                            <p className='text-[#202020E5] text-base leading-none'>
                                                {plan.price}

                                                {
                                                    plan.badge && (
                                                        <sub className='ml-1 text-sm text-[#A2A2A2] font-normal'>
                                                            {plan.badge}
                                                        </sub>
                                                    )
                                                }
                                            </p>
                                        )
                                    }
                                </div>
                                {
                                    plan.primaryButton && plan.primaryButton.text && (
                                        <Link href={plan.primaryButton.internalLink || plan.primaryButton.externalLink || '#'} target={plan.primaryButton.externalLink ? '_blank' : '_self'}>
                                            <button
                                                className={`rounded-xl cursor-pointer text-center w-full p-2.5 text-base font-semibold ${plan.isPrimary ? 'text-white bg-[#202020]'  : 'text-[#202020] bg-[#F0F1F0]'}`}
                                            >
                                                {plan.primaryButton.text}
                                            </button>
                                        </Link>
                                    )
                                }
                            </div>

                            {
                                features.map(feature => (
                                    <p key={feature._key} className='text-[#2D3149] h-[64px] font-normal text-[15px] leading-none py-6 text-center flex items-center justify-center border-b border-[#F4EEF7] border-l'>
                                      {feature.values && feature.values[index] ? 
                                        feature.values[index].type === 'check' ? <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M13.7 0.323529C13.3 -0.107843 12.7 -0.107843 12.3 0.323529L4.8 8.41176L1.7 5.06863C1.3 4.63725 0.7 4.63725 0.3 5.06863C-0.1 5.5 -0.1 6.14706 0.3 6.57843L4.1 10.6765C4.3 10.8922 4.5 11 4.8 11C5.1 11 5.3 10.8922 5.5 10.6765L13.7 1.83333C14.1 1.40196 14.1 0.754902 13.7 0.323529Z" fill="#202020"/></svg> 
                                        </span>
                                        : feature.values[index].type === 'cross' ? <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M10.1762 10.1094L0.75 0.775879" stroke="#202020" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.1103 0.75004L0.776815 10.1763" stroke="#202020" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </span>
                                        : feature.values[index].text || '—' : '—'}  
                                    </p>
                                ))
                            }
                        </div>
                    ))
                }
                </div>
            </div>
        </>
    );
};

export default memo(ComparisonTable);