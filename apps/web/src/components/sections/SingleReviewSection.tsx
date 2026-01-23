import { SingleReviewSection  as SingleReviewSectionProps} from '@/lib/types/section';
import { Fragment, memo } from 'react';
import { Container } from '../ui';
import Image from 'next/image';


const SingleReviewSection = ({data} : {data : SingleReviewSectionProps}) => {
    return (
        <>
            <section className='single-review-section bg-[#F8F8F9] pt-2 md:pt-2.5 overflow-hidden'>
                <Container withBorder={true} padding={false} className='pb-16 md:pb-20 lg:pb-24'>
                    <div className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 single-review-container relative border-y border-[#ECEDF1] bg-white bg-[url('/dot-bg.png')] bg-no-repeat bg-center bg-cover shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04),0_8px_10px_-6px_rgba(0,0,0,0.05)] flex items-center justify-center flex-col text-center">
                        {
                            data.rating && (
                                <div className='flex items-center gap-1.5 md:gap-2'>
                                    {
                                        Array.from({length: data.rating}, (_, index) => (
                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-[17px] md:h-[17px]" viewBox="0 0 17 17" fill="none"><path d="M16.9376 6.06696C16.7998 5.64433 16.4343 5.33709 15.9938 5.27295L11.5323 4.62478L9.53869 0.59725C9.14394 -0.199083 7.83929 -0.199083 7.44455 0.59725L5.45093 4.62478L0.999976 5.27295C0.560794 5.33709 0.195254 5.64541 0.057461 6.06821C-0.0803323 6.48976 0.03417 6.9534 0.35294 7.26388L3.58114 10.4098L2.8196 14.8483C2.74488 15.2861 2.92478 15.7299 3.28441 15.9915C3.64528 16.2518 4.12299 16.2858 4.51541 16.0791L8.49099 13.983L12.4784 16.0791C12.649 16.169 12.8359 16.2134 13.0215 16.2134C13.2632 16.2134 13.5049 16.1375 13.7094 15.9917C14.0692 15.7288 14.2489 15.2863 14.1742 14.8485L13.4139 10.41L16.6421 7.26405C16.9609 6.95448 17.0754 6.48976 16.9376 6.06696Z" fill="#EC813F"/></svg>
                                    ))}
                                </div>
                            )
                        }

                        {
                            data.review && (
                                <blockquote className='text-[#2A2730] text-xl md:text-2xl lg:text-[30px] text-medium leading-normal mt-4 md:mt-5 lg:mt-6 max-w-full w-full md:w-[600px] lg:w-[700px]'>
                                    “{
                                        data.review.map((block, index) => {
                                            if(block.type === 'normal') {
                                                return <Fragment key={index}>{block.text}</Fragment>
                                            }else {
                                                return (
                                                    <span key={index} className="text-[#646464] font-normal">{' ' + block.text + ' '}</span>
                                                )
                                            }
                                        })
                                    }”
                                </blockquote>
                            )
                        }

                        <div className='mt-4 md:mt-5 lg:mt-6 flex flex-col items-center justify-center'>
                            <Image 
                                src={data.author.image.url}
                                alt={data.author.image.alt || data.author.name}
                                width={40}
                                height={40}
                                className='w-9 h-9 md:w-10 md:h-10 object-cover rounded-full'
                            />
                            <p className='text-[#221A4F] text-sm md:text-base font-semibold mt-3 md:mt-3.5'>{data.author.name}</p>
                            <p className='text-[#646464] text-xs md:text-sm'>{data.author.position}</p>
                        </div>

                    </div>
                </Container>
            </section>
        </>
    );
};

export default memo(SingleReviewSection);