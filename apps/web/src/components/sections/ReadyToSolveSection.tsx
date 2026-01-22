'use client'
import { Button, Container, Heading, Text, DotBackground } from '@/components/ui'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ReadyToSolveSection as ReadyToSolveSectionProps } from '@/lib/types/section'
import Link from 'next/link'

export default function ReadyToSolveSection({ data }: { data: ReadyToSolveSectionProps }) {
    const { title, description, sectionImage: image, primaryButton, secondaryButton } = data;

    return (
        <section className="relative bg-white z-10">
            <Container size="xl" padding={false} className="relative">
                <DotBackground
                    dotSize={2}
                    gap={20}
                    color="bg-gray-300"
                    borderColor="border-[#eeedf2]"
                    className="h-32 w-full border-x"
                />
            </Container>

            <Container withBorder={true} className='py-10 md:py-24 !px-[10px]'>
                <div className="relative z-10 text-center mx-auto mb-16">
                    <Heading level={2} className="text-[#1A202C] text-4xl lg:text-5xl font-bold mb-3.5">
                        {title && title.map((block, index) => {
                            if (block.type === 'normal') {
                                return <span key={index}>{block.text}</span>;
                            } else {
                                return (
                                    <span key={index} className="text-[#838383]">
                                        {block.text}
                                    </span>
                                );
                            }
                        })}
                    </Heading>
                    <Text className="text-[#3E3E42] max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
                        {description}
                    </Text>
                </div>

                {/* The Product Image */}
                {image && image.url && (
                    <div className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl border border-gray-100/50">
                        <Image
                            src={image.url}
                            alt={image.alt || 'TryonAR dashboard interface'}
                            width={1400}
                            height={900}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                )}

                {/* Buttons inside the Container at the bottom */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
                    {primaryButton && (
                        <Link href={primaryButton.internalLink || primaryButton.externalLink || '#'} target={primaryButton.externalLink ? '_blank' : '_self'}>
                            <Button
                                variant="primary"
                                className="h-[52px] lg:h-[64px] px-10 !bg-[#1A202C] !text-white !rounded-2xl !font-bold text-lg flex items-center gap-2 shadow-2xl shadow-black/5"
                            >
                                {primaryButton.text} {primaryButton.showIcon && <ArrowUpRight size={20} />}
                            </Button>
                        </Link>
                    )}
                    {secondaryButton && (
                        <Link href={secondaryButton.internalLink || secondaryButton.externalLink || '#'} target={secondaryButton.externalLink ? '_blank' : '_self'}>
                            <Button
                                variant="outline"
                                className="h-[52px] lg:h-[64px] px-10 !bg-[#F3F4F6] !border-transparent !text-[#1A202C] !rounded-2xl !font-bold text-lg"
                            >
                                {secondaryButton.text}
                            </Button>
                        </Link>
                    )}
                </div>
            </Container>
        </section>
    )
}