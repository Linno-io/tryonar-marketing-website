'use client'
import { Badge, Button, Container, Text } from '@/components/ui'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { HeroSection as HeroSectionType } from '@/lib/types/section'
import CheckIcon from '../ui/Icons/CheckIcon'
import { Fragment } from 'react/jsx-runtime'

interface HeroSectionProps {
    data: HeroSectionType
}

export default function HeroSection({ data }: HeroSectionProps) {
    const {
        title,
        description,
        sectionImage,
        tags,
        primaryButton,
        secondaryButton,
        customContainer,
    } = data;

    return (
        <section className="toa-hero-section relative bg-white overflow-hidden pt-30 pb-16 lg:pt-[253px] lg:pb-28 border-b border-[#eeedf2]">      
            <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(180deg, #E3D5FF 0%, #FFF 43.22%, #FFF 100%)' }}>
                <div
                    className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]"
                    style={{ background: 'radial-gradient(circle, rgba(159, 58, 237, 0.15) 0%, rgba(159, 58, 237, 0) 70%)' }}
                />
                <div
                    className="absolute top-[20%] right-[-10%] w-[700px] h-[800px] rounded-full blur-[130px]"
                    style={{ background: 'radial-gradient(circle, rgba(255, 165, 0, 0.12) 0%, rgba(255, 165, 0, 0) 70%)' }}
                />
            </div>

            <Container className="relative z-10" custom={customContainer ? "max-w-full lg:max-w-[1280px] xl:max-w-[1390px] kabir" : undefined} size={customContainer ? 'custom' : "xl"}>
                <div className={`grid ${customContainer ? 'lg:grid-cols-13' : 'lg:grid-cols-12'} gap-13 items-start`}>
                    <div className={`${customContainer ? 'lg:col-span-7' : 'lg:col-span-6'} flex flex-col text-left`}>
                        {
                            title && title.length > 0 && (
                                <h1 className="text-[32px] sm:text-[40px] md:text-[64px] lg:text-[68px] leading-[1.09]">
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

                        <Text className="text-[#646464] text-[14px] md:text-[18px] lg:text-[24px] mt-4 lg:mt-7 leading-[1.5] mb-6 lg:mb-9">
                            {description}
                        </Text>

                        {
                            tags && tags.length > 0 && (
                                <div className="flex flex-wrap gap-3 mb-6 lg:mb-9">
                                    {tags.map((badge, index) => (
                                        <Badge key={index} text={badge} icon={<CheckIcon />}/>
                                    ))}
                                </div>
                            )
                        }

                        {/* Buttons */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <Button
                                variant="primary"
                                className="h-[52px] lg:h-[64px] px-5 lg:px-10 !bg-[#1A202C] !text-white !rounded-xl !font-bold text-base lg:text-lg flex items-center gap-2 shadow-2xl shadow-black/10"
                            >
                                {primaryButton.text}
                                {
                                    primaryButton.showIcon !== false ? <ArrowUpRight size={22} /> : null
                                }
                            </Button>
                            <Button
                                variant="outline"
                                className="h-[52px] lg:h-[64px] px-5 lg:px-10 !bg-[#F3F4F6] !border-transparent !text-[#1A202C] !rounded-xl !font-bold text-base lg:text-lg flex items-center gap-2"
                            >
                                {secondaryButton.text} 
                                {
                                    secondaryButton.showIcon !== false ? <svg fill="none" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg"><path stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M.75 7.867V4.955c0-3.758 2.656-5.274 5.903-3.404l2.519 1.456 2.519 1.456c3.246 1.87 3.246 4.94 0 6.808l-2.519 1.457-2.519 1.456C3.406 16.054.75 14.518.75 10.78V7.867z"/></svg> : null
                                }
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[627px]">
                            <Image
                                src={sectionImage.url}
                                alt={sectionImage.alt || 'Hero Section Image'}
                                width={600}
                                height={700}
                                className="w-full h-auto object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}