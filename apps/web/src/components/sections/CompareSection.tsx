import { Fragment, memo } from 'react';
import { CompareSection as CompareSectionProps } from '@/lib/types/section';
import { Container, DotBackground } from '../ui';
import ComparisonTable from '../ui/ComparisonTable';

const CompareSection = ({data} : {data: CompareSectionProps}) => {
    const {
        title,
        description,
        pricingTable
    } = data;
    return (
        <>
            <section className="compare-section relative pb-16 md:pb-20 lg:pb-24 bg-white overflow-hidden z-10">
                <Container size="xl" padding={false} className="relative">
                    <DotBackground
                        dotSize={2}
                        gap={20}
                        color="bg-gray-300"
                        borderColor="border-[#eeedf2]"
                        className="h-32 w-full border-x"
                    />
                </Container>

                <div className={`border-[#EEEDF2] border-t`}>
                    <Container withBorder={true} className='py-8 sm:py-12 md:py-14 lg:py-17.5'>
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

                    <Container padding={false} withBorder={true}>
                        <ComparisonTable data={pricingTable} />
                    </Container>
                </div>
            </section>
        </>
    );
};

export default memo(CompareSection);