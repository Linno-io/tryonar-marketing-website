import { CaseStudiesSection as CaseStudiesSectionType } from '@/lib/types/section';
import { Fragment, memo } from 'react';
import { Container, DotBackground } from '../ui';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import CaseStudyCard from '../ui/CaseStudyCard';

const CaseStudiesSection = ({data}: {data: CaseStudiesSectionType}) => {
    const {
        title,
        description,
        caseStudies,
        primaryButton,
        secondaryButton,
        showDivider,
    } = data;

    return (
        <>
            <section className="case-studies-section relative pb-16 md:pb-20 lg:pb-24 bg-white overflow-hidden z-10">
                {
                    showDivider && (
                        <Container size="xl" padding={false} className="relative">
                            <DotBackground
                                dotSize={2}
                                gap={20}
                                color="bg-gray-300"
                                borderColor="border-[#eeedf2]"
                                className="h-32 w-full border-x"
                            />
                        </Container>
                    )
                }
                <div className={`${showDivider ? 'border-[#EEEDF2] border-t' : ''}`}>
                    {
                        title && title.length > 0 && (
                            <Container withBorder={true} className='py-8 sm:py-12 md:py-14 lg:py-17.5 border-b border-[#E5E3EA]'>
                                <div className="text-center max-w-3xl mx-auto">
                                    {
                                        title && title.length > 0 && (
                                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#221A4F] mb-3 md:mb-4">
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
                                            </h2>
                                        )
                                    }
                
                                    {
                                        description && (
                                            <p className="text-[#3E3E42] text-sm sm:text-base md:text-lg mx-auto">{description}</p>
                                        )
                                    }
                                </div>


                            </Container>
                        )
                    }

                    <Container padding={false} withBorder={true} className='border-b border-[#E5E3EA]'>
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {caseStudies && caseStudies.map((study, index) => (
                                <CaseStudyCard 
                                    key={study._key}
                                    index={index}
                                    _key={study._key}
                                    companyName={study.companyName}
                                    summary={study.summary}
                                    metrics={study.metrics}
                                    length={caseStudies.length}
                                />
                            ))}
                        </div>
                    </Container>

                    {
                        (primaryButton?.text || secondaryButton?.text) && (
                            <Container className='flex flex-col sm:flex-row gap-4 mt-auto px-6 sm:px-8 md:px-14 pt-8 sm:pt-12 md:pt-14 lg:pt-17.5 justify-center'>
                                {
                                    primaryButton && primaryButton.text && (
                                        <Link href={primaryButton?.internalLink || primaryButton?.externalLink || '#'} target={primaryButton?.externalLink ? '_blank' : '_self'}>
                                            <button className="w-full cursor-pointer sm:w-auto bg-[#121212] text-white px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5">
                                                {primaryButton?.text}
                                                {primaryButton?.showIcon !== false ? <ArrowUpRight size={20} /> : null}
                                            </button>
                                        </Link>
                                    )
                                }

                                {
                                    secondaryButton && secondaryButton.text && (
                                        <Link href={secondaryButton?.internalLink || secondaryButton?.externalLink || '#'} target={secondaryButton?.externalLink ? '_blank' : '_self'}>
                                            <button className="w-full cursor-pointer sm:w-auto bg-[#F0F1F0] text-[#2A2730] px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2">
                                                {secondaryButton?.text}
                                                {secondaryButton?.showIcon !== false ? <svg fill="none" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg"><path stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M.75 7.867V4.955c0-3.758 2.656-5.274 5.903-3.404l2.519 1.456 2.519 1.456c3.246 1.87 3.246 4.94 0 6.808l-2.519 1.457-2.519 1.456C3.406 16.054.75 14.518.75 10.78V7.867z"/></svg> : null}
                                            </button>
                                        </Link>
                                    )
                                }
                            </Container>
                        )
                    }
                </div>
            </section>
        </>
    );
};

export default memo(CaseStudiesSection);