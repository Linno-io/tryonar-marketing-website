import { WorkflowSection as WorkflowSectionProps } from "@/lib/types/section";
import { Fragment, memo, useState } from "react";
import { Container } from "../ui";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';
import Image from "next/image";

const WorkflowSection = ({ data }: { data: WorkflowSectionProps }) => {
    const { title, description, steps, primaryButton, secondaryButton } = data;
    const [activeStepKey, setActiveStepKey] =  useState(steps && steps.length > 0 ? steps[0]._key : null);

    if (!data || !activeStepKey) return null;

    return (
        <>
            <section className="workflow-section relative bg-[#F8F8F9] overflow-hidden border-b border-[#eeedf2]">
                <Container padding={false} className="relative z-10 pt-30 pb-16 lg:pt-[224px] lg:pb-28" withBorder={true} size="xl">
                    <div className="text-center mx-auto px-4 pb-10 md:pb-30 border-[#E5E3EA] border-b">
                        {
                            title && title.length > 0 && (
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A202C]">
                                    {
                                        title.map((block, index) => {
                                            if(block.type === 'normal') {
                                                return <Fragment key={index}>{block.text}</Fragment>
                                            }else {
                                                return (
                                                    <span key={index} className="text-[#646464] font-bold">{' ' + block.text + ' '}</span>
                                                )
                                            }
                                        })
                                    }
                                </h2>
                            )
                        }
    
                        {
                            description && (
                                <p className="text-[#646464] w-full mt-4 max-w-2xl text-base md:text-lg mx-auto">{description}</p>
                            )
                        }
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-10 items-stretch justify-between border-b border-[#eeedf2] px-7.5 pt-7.5 pb-5">
                        <div className="flex flex-col gap-5 flex-1 max-w-full md:max-w-145">
                            {
                                steps && steps.length > 0 && steps.map((step, index) => (
                                    <div key={step._key} className={`${step._key === activeStepKey ? 'workflow-step-active' : ''} transition-height border border-[#E5E3EA] rounded-[20px] cursor-pointer p-4 md:p-7.5`} onClick={() => setActiveStepKey(step._key)}>
                                        <div className="flex gap-4 items-start">
                                            <span className={`${step._key === activeStepKey ? 'text-white bg-[#202020] ' : 'text-[#838383] border border-[#ECEDF1] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04),0_8px_10px_-6px_rgba(0,0,0,0.05)]'} text-[24px] font-semibold flex items-center justify-center w-10 h-10 rounded-[10px]`}>
                                                {index + 1}
                                            </span>

                                            <div className="flex flex-col gap-0 w-[calc(100%-60px)]">
                                                {
                                                    step.stepTitle && step.stepTitle.length > 0 && (
                                                        <h4 className="text-[22px] font-bold text-[#1A202C] mb-4 leading-none">
                                                            {
                                                                step.stepTitle.map((block, index) => {
                                                                    if(block.type === 'normal') {
                                                                        return <Fragment key={index}>{block.text}</Fragment>
                                                                    }else {
                                                                        return (
                                                                            <span key={index} className="text-[#838383]">{' ' + block.text + ' '}</span>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </h4>
                                                    )
                                                }
                                                <p className="text-[#6C6C73] text-base">
                                                    {step.stepDescription}
                                                </p>
                                            </div>
                                        </div>


                                        <div className={`${step._key === activeStepKey ? 'opacity-100 visible mt-6 pt-5' : 'opacity-0 invisible h-0 mt-0'} transition-all border-t border-[#E8E8E8] flex flex-wrap items-center justify-between gap-4`}>
                                            {
                                                step.tags && step.tags.length > 0 && step.tags.map((tag, index) => (
                                                    <p className="flex items-center gap-2 text-[#3E3E42] text-[15px] leading-0 font-normal" key={index}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M11.7212 1.9613C11.3499 1.58952 10.747 1.58976 10.3752 1.9613L4.31744 8.0193L1.62503 5.32691C1.25325 4.95513 0.650609 4.95513 0.278832 5.32691C-0.0929441 5.69868 -0.0929441 6.30133 0.278832 6.6731L3.6442 10.0385C3.82998 10.2242 4.07357 10.3174 4.31719 10.3174C4.5608 10.3174 4.80463 10.2245 4.9904 10.0385L11.7212 3.30747C12.0929 2.93595 12.0929 2.33305 11.7212 1.9613Z" fill="#838383"/></svg>
                                                        
                                                        {tag}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex-1">
                            <Image 
                                src={steps.find(step => step._key === activeStepKey)?.image?.url || ''}
                                alt={steps.find(step => step._key === activeStepKey)?.image?.alt || ''}
                                width={500}
                                height={500}
                                className="w-full h-ful object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto px-6 sm:px-8 md:px-14 pt-17.5 justify-center">
                        {
                            primaryButton && (
                                <Link href={primaryButton?.internalLink || primaryButton?.externalLink || '#'} target={primaryButton?.externalLink ? '_blank' : '_self'}>
                                    <button className="w-full cursor-pointer sm:w-auto bg-[#121212] text-white px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5">
                                        {primaryButton?.text}
                                        {primaryButton?.showIcon !== false ? <ArrowUpRight size={20} /> : null}
                                    </button>
                                </Link>
                            )
                        }

                        {
                            secondaryButton && (
                                <Link href={secondaryButton?.internalLink || secondaryButton?.externalLink || '#'} target={secondaryButton?.externalLink ? '_blank' : '_self'}>
                                    <button className="w-full cursor-pointer sm:w-auto bg-[#F0F1F0] text-[#2A2730] px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2">
                                        {secondaryButton?.text}
                                        {secondaryButton?.showIcon !== false ? <svg fill="none" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg"><path stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M.75 7.867V4.955c0-3.758 2.656-5.274 5.903-3.404l2.519 1.456 2.519 1.456c3.246 1.87 3.246 4.94 0 6.808l-2.519 1.457-2.519 1.456C3.406 16.054.75 14.518.75 10.78V7.867z"/></svg> : null}
                                    </button>
                                </Link>
                            )
                        }
                    </div>
                </Container>
            </section>
        </>
    );
};

export default memo(WorkflowSection);
