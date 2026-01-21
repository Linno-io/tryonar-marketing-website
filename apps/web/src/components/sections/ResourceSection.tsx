import { ResourceSection as ResourceSectionProps } from "@/lib/types/section";
import { memo } from "react";
import { Container, DotBackground, Heading, Text } from "../ui";
import Image from "next/image";
import Link from "next/link";


const ResourceSection = ({data}: {data: ResourceSectionProps}) => {
    if (!data) return null;

    const {
        divider,
        title,
        highlightText,
        resources,
        description,
        sectionImage,
    } = data;

    return (
        <>
            <section className="relative bg-white z-10 resources-section">
                {
                    divider && (
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

                <Container withBorder={true} className='py-10 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8'>
                    <div className="relative z-10 text-center mx-auto mb-12 md:mb-16 max-w-3xl">
                        {
                            title && (
                                <Heading level={2} className="text-[#1A202C] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                    {title} {highlightText && (<span className="text-[#838383]">{' ' + highlightText}</span>)}
                                </Heading>
                            )
                        }
                        {
                            description && (
                                <Text className="text-[#3E3E42] mx-auto text-base lg:text-lg leading-relaxed">
                                    {description}
                                </Text>        
                            )
                        }
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12 p-6 md:p-10 lg:p-12 justify-between rounded-2xl md:rounded-3xl border border-[#ECEDF1] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.04),0_8px_10px_-6px_rgba(0,0,0,0.05)]">
                        <div className="w-full lg:w-1/2 lg:flex-1">
                            <Image 
                                src={sectionImage?.url || '/placeholder-image.png'} 
                                alt={sectionImage?.alt || 'Resource Section Image'} 
                                width={600} 
                                height={400} 
                                className="w-full h-auto object-contain"
                            />
                        </div>

                        {resources && resources.length > 0 && (
                            <div className="w-full lg:w-1/2 lg:flex-1 flex flex-col gap-4">
                                {
                                    resources.map((resource, index) => (
                                        <div key={index} className="border border-[#ECEDF1] rounded-2xl py-4 md:py-5 px-4 md:px-6 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <Image 
                                                    src={resource.icon?.url || '/placeholder-icon.png'} 
                                                    alt={resource.icon?.alt || resource.title || 'Resource Icon'} 
                                                    width={16} 
                                                    height={16} 
                                                    className="w-4 h-4 flex-shrink-0 object-contain"
                                                />
                                                <h3 className="text-[#1A202C] text-base md:text-lg leading-tight font-semibold -tracking-tight truncate">
                                                    {resource.title}
                                                </h3>
                                            </div>

                                            <Link href={resource.link} className="flex-shrink-0" target="_blank" rel="noopener noreferrer" aria-label={resource.title}
                                                    title={resource.title}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M12.5 2.5H17.5V7.5" stroke="#838383" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M8.33203 11.6667L17.4987 2.5" stroke="#838383" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M15 10.8333V15.8333C15 16.2754 14.8244 16.6993 14.5118 17.0118C14.1993 17.3244 13.7754 17.5 13.3333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V6.66667C2.5 6.22464 2.67559 5.80072 2.98816 5.48816C3.30072 5.17559 3.72464 5 4.16667 5H9.16667" stroke="#838383" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </Container>
            </section>
        </>
    );
};

export default memo(ResourceSection);