import { LandingHeroSection as LandingHeroSectionProps } from '@/lib/types/section';
import { Fragment, memo } from 'react';
import { Button, Container } from '../ui';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const LandingHeroSection = ({data} : {data: LandingHeroSectionProps}) => {
    if(!data) return null;

    const {
        tag,
        title,
        description,
        sectionImage,
        primaryButton,
    } = data;

    return (
        <>
            <section className="landing-hero-section overflow-hidden pt-30 pb-16 lg:pt-[183px] lg:pb-28 bg-[linear-gradient(180deg,#E3D5FF_0%,#FFF_20.22%,#FFF_100%)] relative">
                <Container className="relative z-10">
                    {
                        tag && (
                            <p className='border border-[#E2D9F6] flex items-center text-center justify-center mx-auto rounded-[100px] px-4 py-2 text-[#1A202C] text-sm font-medium leading-none w-max relative'>
                                {tag}
                                <span className='absolute bg-[linear-gradient(90deg,#E4DDF4_0%,#9A68FF_32%,#FC2FEC_50%,#FFA755_73%,#E4DDF4_100%)] w-[60%] h-[1px] bottom-[-1px]' />
                            </p>
                        )
                    }

                    {
                        title && title.length > 0 && (
                            <h1 className="text-[32px] text-center sm:text-[40px] md:text-[64px] lg:text-[68px] leading-[1.1] mt-6">
                                    {
                                        title.map((block, index) => {
                                            if(block.type === 'normal') {
                                                return <Fragment key={index}>
                                                        {block.text.split(/\n|\\n/).map((line, i) => (
                                                            <span key={i} className="block">{line}</span>
                                                        ))}
                                                    </Fragment>
                                            }else {
                                                return (
                                                    <span key={index} className="text-[#838383] font-bold">{' ' + block.text + ' '}</span>
                                                )
                                            }
                                        })
                                    }
                            </h1>
                        )
                    }

                    {
                        description && description.length > 0 && (
                            <p className="text-[#646464] text-[14px] md:text-[18px] lg:text-[22px] mt-4 lg:mt-7 leading-[1.5] mb-6 lg:mb-9 text-center mx-auto max-w-[958px]">
                                    {
                                        description.map((block, index) => {
                                            if(block.type === 'normal') {
                                                return <Fragment key={index}>
                                                        {block.text.split(/\n|\\n/).map((line, i) => (
                                                            <span key={i}>{line}</span>
                                                        ))}
                                                    </Fragment>
                                            }else {
                                                return (
                                                    <span key={index} className="text-[#1A202C] font-bold">{' ' + block.text + ' '}</span>
                                                )
                                            }
                                        })
                                    }
                            </p>
                        )
                    }

                    {
                        primaryButton && primaryButton.text && (
                            <div className="flex flex-col items-center justify-center gap-3">
                                <Link href={primaryButton?.internalLink || primaryButton?.externalLink || '#'} target={primaryButton?.externalLink ? '_blank' : '_self'}>
                                    <button className="w-full sm:w-auto bg-[#121212] text-white px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5 cursor-pointer">
                                        {primaryButton?.text}
                                        {primaryButton?.showIcon !== false ? <ArrowUpRight size={20} /> : null}
                                    </button>
                                </Link>
                                {
                                    primaryButton?.trustText && (
                                        <p className="text-[#646464] text-sm text-center max-w-xs">
                                            {primaryButton?.trustText}
                                        </p>
                                    )
                                }
                            </div>
                        )
                    }

                    {
                        sectionImage?.url && (
                            <div className="mt-10 lg:mt-16 flex flex-col items-center justify-center relative gap-4 ">
                                <Image 
                                    src={sectionImage.url} 
                                    alt={sectionImage.alt || 'Hero Section Image'} 
                                    width={800} 
                                    height={600} 
                                    className="w-full h-auto max-w-lg lg:max-w-none rounded-2xl relative"
                                />

                                {
                                    sectionImage?.imageTitle && sectionImage.imageDescription && (
                                        <div className="bg-[#202020] flex flex-col items-start gap-4 rounded-xl md:rounded-[20px] p-4 md:p-7.5 relative md:absolute bottom-0 max-w-[600px] md:max-w-none lg:bottom-[120px]">
                                            <h3 className="text-base md:text-[20px] font-semibold text-[#FFFFFF] leading-none">{sectionImage.imageTitle}</h3>
                                            <p className="text-sm md:text-[15px] text-[#BFBACB] leading-none">{sectionImage.imageDescription}</p>
                                        </div>
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

export default memo(LandingHeroSection);