import { CardsSection as CardsSectionProps } from '@/lib/types/section';
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

const CardsSection = ({data} : {data : CardsSectionProps}) => {
    const {
        showDivider,
        title,
        description,
        cards,
        primaryButton,
        secondaryButton,
    } = data;

    const chunkIntoPairs = (arr: Card[]) => {
        const result = [];
        for (let i = 0; i < arr.length; i += 2) {
            result.push(arr.slice(i, i + 2));
        }
        return result;
    };

    const rows = chunkIntoPairs(cards);

    return (
        <>
            <section className="cards-section relative pb-16 md:pb-20 lg:pb-24 bg-white overflow-hidden z-10">
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
                    <Container withBorder={true} className='py-17.5 border-b border-[#E5E3EA]'>
                        <div className="text-center max-w-3xl mx-auto">
                            {
                                title && title.length > 0 && (
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#221A4F] mb-4">
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
                                    <p className="text-[#3E3E42] text-base md:text-lg mx-auto">{description}</p>
                                )
                            }
                        </div>


                    </Container>
                    <Container padding={false} withBorder={true} className='border-b border-[#E5E3EA]'>
                        {
                            rows.map((row, rowIndex) => (
                                <Fragment key={rowIndex}>
                                    <div className="card-row flex flex-col md:flex-row gap-0 justify-between items-stretch">
                                        {row.map((card, index) => (
                                            <div className={`card flex-1 flex flex-col justify-between ${index === 0 ? 'border-r border-[#E5E3EA]' : ''}`} key={index}>
                                                <div className="card-info p-15 pb-7.5">
                                                    <Image 
                                                        src={card.image?.url || '/placeholder-image.png'}
                                                        alt={card.image?.alt || card.cardTitle}
                                                        width={530}
                                                        height={340}
                                                        className='w-auto h-auto object-contain'
                                                    />
                                                    <h3 className='mt-6 mb-2 text-[30px] leading-none text-[#1A202C]'>
                                                        {card.cardTitle}
                                                    </h3>
                                                    <p className='text-[#3E3E42] text-base leading-normal'>
                                                        {card.description}
                                                    </p>
                                                </div>

                                                {
                                                    card.tags && card.tags.length > 0 && (
                                                        <div className="card-tags bg-[#F8F8F9] px-12 py-5 flex flex-wrap gap-2.5 items-center mt-auto">
                                                            {card.tags.map((tag, tagIndex) => (
                                                                <span key={tagIndex} className="card-tag rounded-[100px] border border-[#C5BBCC] border-dashed px-3.5 py-2 flex items-center justify-center text-[#1A202C] text-[15px] font-medium leading-none">{tag}</span>
                                                            ))}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))}
                                    </div>

                                    {rowIndex !== rows.length - 1 && (
                                        <hr className="divider border-y border-[#E5E3EA] w-full h-25 bg-[#F8F8F9]" />
                                    )}
                                </Fragment>
                            ))
                        }
                    </Container>
                    <Container className='flex flex-col sm:flex-row gap-4 mt-auto px-6 sm:px-8 md:px-14 pt-17.5 justify-center'>
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
                    </Container>
                </div>
            </section>
        </>
    );
};

export default memo(CardsSection);