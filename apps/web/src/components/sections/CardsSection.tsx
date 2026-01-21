import { CardsSection as CardsSectionProps } from '@/lib/types/section';
import { Fragment, memo } from 'react';
import { Container, DotBackground } from '../ui';

const CardsSection = ({data} : {data : CardsSectionProps}) => {
    const {
        showDivider,
        title,
        description,
        cards,
        primaryButton,
        secondaryButton,
    } = data;

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
                    <Container withBorder={true} className='pt-16 md:pt-20 lg:pt-24'>
                        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
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
                </div>
            </section>
        </>
    );
};

export default memo(CardsSection);