import { BusinessResultsSection as BusinessResultsSectionProps } from '@/lib/types/section'
import { Container } from '@/components/ui'
import Image from 'next/image'

interface SectionTitle {
    text: string
    type: 'highlight' | 'normal'
}

const BusinessResultsSection = ({ data }: { data: BusinessResultsSectionProps }) => {
    const { title, cards, enableBottomPadding } = data

    return (
        <section className={`pt-12.5 lg:pt-24 ${enableBottomPadding ? 'pb-16 lg:pb-24' : ''} bg-white`}>
            <Container size="xl" padding={false}>
                <div className='px-2'>
                    <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-center text-[#0B0E1E] leading-tight mb-10 lg:mb-17.5">
                        {title && title.map((block: SectionTitle, index: number) => (
                            <span key={index} className={block.type === 'highlight' ? 'text-[#7C3AED]' : ''}>
                                {block.text}
                            </span>
                        ))}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                        {cards && cards.map((card, index) => (
                            <div
                                key={card._key || index}
                                className="bg-[#F8F8F9] rounded-xl md:rounded-2xl p-7 lg:p-8 flex flex-col gap-5"
                            >
                                {card.icon?.url && (
                                    <div className="w-14 h-14 flex items-center justify-center shrink-0">
                                        <Image
                                            src={card.icon.url}
                                            alt={card.icon.alt || card.cardTitle}
                                            width={56}
                                            height={56}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-[24px] font-medium text-[#0B0E1E] leading-snug">
                                        {card.cardTitle}
                                    </h3>
                                    <p className="text-[16px] text-[#3e3e42] leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default BusinessResultsSection
