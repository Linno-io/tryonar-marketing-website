import { TextHeroSection as TextHeroSectionProps } from '@/lib/types/section';
import { Fragment, memo } from 'react';
import { Container } from '../ui';

const TextHeroSection = ({data} : {data: TextHeroSectionProps}) => {
    const {
        title,
        description,
    } = data;

    return (
        <section className="text-hero-section relative bg-[#F8F8F9] overflow-hidden pt-30 pb-16 lg:pt-[253px] lg:pb-28 border-b border-[#eeedf2]">      
            <Container className="relative z-10">
                <div className="text-center mx-auto px-4">
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
            </Container>
        </section>
    )
};

export default memo(TextHeroSection);