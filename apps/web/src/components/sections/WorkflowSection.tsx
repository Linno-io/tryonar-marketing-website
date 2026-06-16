import { WorkflowSection as WorkflowSectionProps } from "@/lib/types/section";
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { Button, Container } from "../ui";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';
import Image from "next/image";

const StepVideo = ({ src, poster, isActive, className }: { src: string; poster?: string; isActive: boolean; className: string }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        if (isActive) {
            ref.current.currentTime = 0;
            ref.current.play();
        } else {
            ref.current.pause();
            ref.current.currentTime = 0;
        }
    }, [isActive]);

    return (
        <video
            ref={ref}
            src={src}
            poster={poster}
            loop
            muted
            playsInline
            className={className}
        />
    );
};

const WorkflowSection = ({ data }: { data: WorkflowSectionProps }) => {
    const { title, description, steps, primaryButton, secondaryButton } = data;
    const [activeStepKey, setActiveStepKey] =  useState(steps && steps.length > 0 ? steps[0]._key : null);

    if (!data || !activeStepKey) return null;

    return (
        <>
            <section className="workflow-section relative bg-[#F8F8F9] overflow-hidden border-b border-[#eeedf2]">
                <Container padding={false} className="relative z-10 pt-30 pb-[30px] md:pb-16 lg:pt-[203px] lg:pb-28" withBorder={true} size="xl">
                    <div className="text-center mx-auto px-4 pb-10 md:pb-25 border-[#eeedf2] border-b">
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
                    
                    <div className="flex flex-col min-[991px]:flex-row gap-10 items-stretch justify-between border-b border-[#eeedf2] px-7.5 py-7.5">
                        <div className="flex flex-col gap-5 flex-1 max-w-full  min-[991px]:max-w-152">
                            {
                                steps && steps.length > 0 && steps.map((step, index) => (
                                    <div key={step._key} className={`${step._key === activeStepKey ? 'workflow-step-active' : ''} transition-height border border-[#E5E3EA] rounded-xl md:rounded-[20px] cursor-pointer p-4 md:p-6.5`} onClick={() => setActiveStepKey(step._key)}>
                                        <div className="flex gap-4 items-start">
                                            <span className={`${step._key === activeStepKey ? 'text-white bg-[#202020] ' : 'text-[#838383] border border-[#ECEDF1] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04),0_8px_10px_-6px_rgba(0,0,0,0.05)]'} text-[24px] font-semibold flex items-center justify-center w-10 h-10 rounded-[10px]`}>
                                                {index + 1}
                                            </span>

                                            <div className="flex flex-col gap-0 w-[calc(100%-60px)]">
                                                {
                                                    step.stepTitle && step.stepTitle.length > 0 && (
                                                        <h3 className="text-[22px] font-bold text-[#1A202C] mb-2 leading-none">
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
                                                        </h3>
                                                    )
                                                }
                                                <p className="text-[#3E3E42] text-base">
                                                    {step.stepDescription}
                                                </p>
                                            </div>
                                        </div>

                                        {
                                            step?.tags?.length && (
                                                <div className={`${true ? 'opacity-100 visible mt-6 pt-5' : 'opacity-0 invisible h-0 mt-0'} transition-all border-t border-[#E8E8E8] flex flex-wrap items-center justify-between gap-4`}>
                                                    {
                                                        step.tags && step.tags.length > 0 && step.tags.map((tag, index) => (
                                                            <p className="flex items-center gap-2 text-[#3E3E42] text-[15px] leading-0 font-normal" key={index}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M11.7212 1.9613C11.3499 1.58952 10.747 1.58976 10.3752 1.9613L4.31744 8.0193L1.62503 5.32691C1.25325 4.95513 0.650609 4.95513 0.278832 5.32691C-0.0929441 5.69868 -0.0929441 6.30133 0.278832 6.6731L3.6442 10.0385C3.82998 10.2242 4.07357 10.3174 4.31719 10.3174C4.5608 10.3174 4.80463 10.2245 4.9904 10.0385L11.7212 3.30747C12.0929 2.93595 12.0929 2.33305 11.7212 1.9613Z" fill="#838383"/></svg>
                                                                
                                                                {tag}
                                                            </p>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        <div className="rounded-xl md:rounded-[20px] xl:rounded-[30px] bg-white flex-1 overflow-hidden relative" style={{boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.04), 0 10px 10px -6px rgba(0, 0, 0, 0.05)'}}>
                            {steps.map((step) => (
                                step.video?.url ? (
                                    <StepVideo
                                        key={step._key}
                                        src={step.video.url}
                                        poster={step?.image?.url || undefined}
                                        isActive={step._key === activeStepKey}
                                        className={`w-full object-cover h-full rounded-2xl transition-opacity duration-200 ${step._key === activeStepKey ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 h-full'}`}
                                    />
                                ) : (
                                    <Image
                                        key={step._key}
                                        src={step?.image?.url || ''}
                                        alt={step?.image?.alt || ''}
                                        width={500}
                                        height={500}
                                        priority={true}
                                        className={`w-full object-contain rounded-2xl transition-opacity duration-200 ${step._key === activeStepKey ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 h-full'}`}
                                    />
                                )
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto px-6 sm:px-8 md:px-14 pt-[30px] mx:pt-17.5 justify-center">
                        {
                            primaryButton && (
                                <Button
                                    variant="primary"
                                    href={primaryButton?.internalLink || primaryButton?.externalLink || '#'}
                                    target={primaryButton?.externalLink ? '_blank' : '_self'}
                                    showIcon={primaryButton?.showIcon !== false}
                                    className='tryon-primary-btn'
                                >
                                    {primaryButton?.text}
                                </Button>
                            )
                        }

                        {
                            secondaryButton?.text && (
                                <Button
                                    variant="secondary"
                                    href={secondaryButton?.internalLink || secondaryButton?.externalLink || '#'}
                                    target={secondaryButton?.externalLink ? '_blank' : '_self'}
                                    showIcon={secondaryButton.showIcon !== false}
                                >
                                    {secondaryButton?.text}
                                </Button>
                            )
                        }
                    </div>
                </Container>
            </section>
        </>
    );
};

export default memo(WorkflowSection);
