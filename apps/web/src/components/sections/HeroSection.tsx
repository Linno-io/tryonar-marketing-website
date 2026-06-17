'use client'
import { Badge, Button, Container, Text } from '@/components/ui'
import Image from 'next/image'
import { HeroSection as HeroSectionType } from '@/lib/types/section'
import CheckIcon from '../ui/Icons/CheckIcon'
import { Fragment } from 'react/jsx-runtime'
import HeroVideoWithFrame from './HeroVideoWithFrame'
import clsx from 'clsx'
import ProductDemoHeroPhoneFrame from './ProductDemoHeroPhoneFrame'
import InteractiveProducts from './InteractiveProducts'

interface HeroSectionProps {
    data: HeroSectionType,
    page: string
}

export default function HeroSection({ data, page }: HeroSectionProps) {
    const {
        title,
        description,
        sectionImage,
        tags,
        primaryButton,
        secondaryButton,
        customContainer,
        sectionVideo,
        posterImage
    } = data;



    return (
        <>
        <section className="toa-hero-section relative bg-white pt-30 lg:pt-50 border-b border-[#eeedf2]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70 z-0" style={{ background: 'linear-gradient(180deg, #E3D5FF 5%, #FFF 20%, #FFF 100%)' }}>
                <div
                    className="absolute top-[60%] right-[-10%] w-[700px] h-[800px] rounded-full blur-[130px]"
                    style={{ background: 'radial-gradient(circle, rgb(255 165 0 / 26%) 0%, rgba(255, 165, 0, 0) 70%)' }}
                />
            </div>

            <Container className="relative z-10" custom={customContainer ? "max-w-full lg:max-w-[1280px] xl:max-w-[1390px]" : undefined} size={customContainer ? 'custom' : "xl"}>
                <div className={clsx(
                    customContainer ? 'lg:grid-cols-13' : 'lg:grid-cols-12',
                    'home' === page ? 'items-center max-[1100px]:items-end' : 'items-start max-[1280px]:items-end',
                    'home' === page ? 'flex flex-col lg:flex-row gap-13 lg:gap-0' : 'grid gap-13'
                )}>
                    <div className={clsx(
                        `flex flex-col text-left pt-0 lg:pt-10`,
                        'home' === page ? 'md:pb-8' : 'md:pb-8',
                        'home' === page  ? 'lg:flex-7' : customContainer ? 'lg:col-span-7' : 'lg:col-span-6',
                    )}>
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

                        <Text className="text-[#646464] text-[14px] lg:text-[18px] mt-4 lg:mt-4 leading-normal mb-6 lg:mb-7">
                            {description}
                        </Text>

                        {
                            tags && tags.length > 0 && (
                                <div className="flex flex-wrap gap-3 mb-6 lg:mb-9">
                                    {tags.map((badge, index) => (
                                        <Badge key={index} text={badge} icon={<CheckIcon />} showDash={false} className='h-8 md:h-10'/>
                                    ))}
                                </div>
                            )
                        }

                        {/* Buttons */}
                        {(primaryButton?.text || secondaryButton?.text) && (
                            <div className="tryon-cta-buttons flex items-center gap-3.5 flex-wrap">
                                {primaryButton?.text && (
                                    <Button
                                        variant="primary"
                                        href={primaryButton.internalLink || primaryButton.externalLink || '#'}
                                        target={primaryButton.externalLink ? '_blank' : '_self'}
                                        showIcon={primaryButton.showIcon !== false}
                                        className='tryon-primary-btn'
                                    >
                                        {primaryButton.text}
                                    </Button>
                                )}

                                {secondaryButton?.text && (
                                    <Button
                                        variant="secondary"
                                        href={secondaryButton.internalLink || secondaryButton.externalLink || '#'}
                                        target={secondaryButton.externalLink ? '_blank' : '_self'}
                                        icon=''
                                        showIcon={secondaryButton.showIcon !== false}
                                    >
                                        {secondaryButton.text}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={clsx(
                        `relative flex`,
                        'home' === page ? 'w-full justify-center lg:justify-end' : 'justify-center',
                        'home' === page ? 'lg:flex-6' : 'lg:col-span-6'
                    )}>
                        <div className={clsx('relative w-full', 'product-demo' !== page && 'max-w-105 lg:max-w-120')}>
                            {sectionVideo?.url && 'home' === page ? (
                                <InteractiveProducts />
                                
                            ) : 'product-demo' === page ? (
                                <>
                                    <ProductDemoHeroPhoneFrame />
                                </>
                            ) : sectionVideo?.url ? (
                                <HeroVideoWithFrame 
                                    data={data}
                                />
                            ) : (
                                sectionImage.url && (
                                    <Image
                                        src={sectionImage.url}
                                        alt={sectionImage.alt || 'Hero Section Image'}
                                        className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                                        fetchPriority="high"
                                        width={sectionImage.width}
                                        height={sectionImage.height}
                                    />
                                )
                            )}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
        </>
    )
}