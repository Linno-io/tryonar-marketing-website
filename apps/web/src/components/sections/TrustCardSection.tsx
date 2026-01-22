import { TrustCardSection as TrustCardSectionProps } from '@/lib/types/section';
import { Fragment, memo } from 'react';
import { Container, DotBackground } from '../ui';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SanityImage } from '@/lib/types/siteSettings';
import Image from 'next/image';

interface Card {
    _key: string;
    cardTitle: string;
    description: string;
    image: SanityImage;
    tags?: string[];
}

const TrustCardSection = ({data} : {data : TrustCardSectionProps}) => {
    const {
        title,
        description,
        cards,
        primaryButton,
    } = data;

    return (
        <>
            <section className="trust-cards-section relative py-12 sm:py-16 md:py-20 lg:py-28 bg-[#00020B] overflow-hidden z-10">
                <div
                    className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-full h-[300px] opacity-40 pointer-events-none z-10"
                    style={{
                        background: 'radial-gradient(circle, rgb(240 134 117) 0%, transparent 100%)',
                        filter: 'blur(100px)'
                    }}
                />

                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        {
                            title && title.length > 0 && (
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
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
                                <p className="text-[#E7E5EABF] text-sm sm:text-base md:text-lg mx-auto">{description}</p>
                            )
                        }
                    </div>

                    <div className="cards-wrapper flex flex-col lg:flex-row items-stretch justify-between gap-4 sm:gap-5 md:gap-6 lg:gap-2 mt-8 sm:mt-12 md:mt-14 lg:mt-17.5">
                        {
                            cards && cards.length > 0 && cards.map((card: Card, index: number) => (
                                <div key={index} className='trust-card flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[50px] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] border border-white bg-[linear-gradient(-90deg,#ffffff_0%,#ffeae7_100%)] p-6 sm:p-8 md:p-9 lg:p-10 flex-1'>
                                    <div className='relative z-1'>
                                        <span className='bg-white h-15 w-15 flex items-center justify-center rounded-2xl'>
                                            <Image 
                                                src={card.image?.url || '/placeholder-image.png'} 
                                                alt={card.image?.alt || card.cardTitle || 'Card Image'} 
                                                width={26}
                                                height={26}
                                                className="h-6.5 w-6.5 object-contain"
                                            />
                                        </span>
                                        <h3 className='text-[#1A202C] text-2xl sm:text-[26px] md:text-[28px] lg:text-[30px] font-bold leading-none mt-5 sm:mt-6 lg:mt-7'>
                                            {card.cardTitle}
                                        </h3>
                                        <p className='text-[#3E3E42] text-sm sm:text-base leading-normal mt-2'>
                                            {card.description}
                                        </p>
                                    </div>

                                    {
                                        card.tags && card.tags.length > 0 && (
                                            <div className='tags-wrapper flex flex-col gap-2 sm:gap-2.5 lg:gap-3 items-start mt-auto'>
                                                {
                                                    card.tags.map((tag:string, index:number) => (
                                                        <div key={index} className='tag flex gap-2.5 sm:gap-3 lg:gap-3.5 items-center'>
                                                            <span className='flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 lg:w-7.5 lg:h-7.5 rounded-lg bg-[#00020B]'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-[14px] lg:h-[14px]" viewBox="0 0 14 14" fill="none"><path d="M2.29929 7.68867L6.73653 3.25143L11.1738 7.68867C11.7008 8.21576 12.5506 8.21576 13.0777 7.68867C13.6048 7.16158 13.6048 6.31178 13.0777 5.78469L7.68851 0.395471C7.16142 -0.131619 6.31163 -0.131619 5.78454 0.395471L0.395318 5.78469C-0.131772 6.31178 -0.131772 7.16158 0.395318 7.68867C0.922407 8.21038 1.7722 8.21038 2.29929 7.68867Z" fill="white"/><path d="M0.39519 11.7007L5.78441 6.31149C6.3115 5.7844 7.1613 5.7844 7.68839 6.31149L13.0776 11.7007C13.6047 12.2278 13.6047 13.0776 13.0776 13.6047C12.5505 14.1318 11.7007 14.1318 11.1736 13.6047L6.7364 9.16745L2.29917 13.6047C1.77208 14.1318 0.922279 14.1318 0.39519 13.6047C-0.126521 13.0776 -0.126521 12.2278 0.39519 11.7007Z" fill="white" fillOpacity="0.48"/></svg>
                                                            </span>
                                                            <span className='text-[#1A202C] text-base sm:text-[17px] lg:text-[18px] leading-none' dangerouslySetInnerHTML={{__html: tag}} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <div className="buttons-wrapper flex items-center justify-center mt-8 sm:mt-12 md:mt-14 lg:mt-15">
                        {
                            primaryButton && (
                                <Link href={primaryButton?.internalLink || primaryButton?.externalLink || '#'} target={primaryButton?.externalLink ? '_blank' : '_self'}>
                                    <button className="w-full cursor-pointer sm:w-auto bg-[#F0F1F0] text-[#1A202C] px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-black/5">
                                        {primaryButton?.text}
                                        {primaryButton?.showIcon !== false ? <ArrowUpRight size={20} /> : null}
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

export default memo(TrustCardSection);