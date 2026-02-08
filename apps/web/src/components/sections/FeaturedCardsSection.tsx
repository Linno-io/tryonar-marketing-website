import { FeaturedCardsSection as FeaturedCardsSectionType } from '@/lib/types/section';
import { memo } from 'react';
import { Container } from '../ui';
import Link from 'next/link';


const FeaturedCardsSection = ({data}: {data: FeaturedCardsSectionType}) => {
    const {
        items
    } = data;

    return (
        <>
             <section className="featured-cards-section border-[#EEEDF2] border-t relative bg-[#F8F8F9]">
                 <Container padding={false} withBorder={true} className='py-10 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8'>
                    {
                        items && items.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                                {
                                    items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="rounded-[30px] bg-cover bg-center p-5 md:p-10 flex flex-col justify-between h-[614px]"
                                            style={{
                                                backgroundImage: (index + 1) % 2 !== 0
                                                    ? `linear-gradient(180deg, rgba(255,255,255,0) 15.64%, rgba(255,164,155,0.77) 87.5%), url(${item.sectionImage.url})`
                                                    : `linear-gradient(180deg, rgba(255,255,255,0) 15.64%, #8F48DA 84.62%), url(${item.sectionImage.url})`
                                            }}
                                        >
                                            <div className='flex flex-col gap-5'>
                                                <p className='text-white text-2xl leading-none'>
                                                    {item.companyName}
                                                </p>

                                                <p className='text-white text-[50px] leading-none font-medium'>
                                                    {item.highlightValue}
                                                </p>
                                            </div>

                                            <div className='flex flex-col gap-6'>
                                                <p className='text-white text-[30px] font-semibold leading-9'>
                                                    {item.description}
                                                </p>

                                                <Link className='inline w-fit' href={item.primaryButton?.internalLink || item.primaryButton?.externalLink || '#'} target={item.primaryButton?.externalLink ? '_blank' : '_self'}>
                                                    <button className="cursor-pointer bg-white text-[#202020] px-6 py-2.5 rounded-[12px] text-base font-semibold">
                                                        {item.primaryButton?.text}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                 </Container>
             </section>
        </>
    );
};

export default memo(FeaturedCardsSection);