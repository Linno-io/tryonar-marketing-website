import { TermsAndConditionsSection as TermsAndConditionsSectionProps } from '@/lib/types/section'
import { memo } from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { Container } from '../ui'

const portableTextComponents: PortableTextComponents = {
    block: {
        normal: ({ children }) => (
            <p className="mb-4 text-[#3E3E42] text-sm md:text-base xl:text-lg leading-relaxed last:mb-0">{children}</p>
        ),
        h3: ({ children }) => (
            <h3 className="text-lg md:text-xl font-semibold text-[#1A202C] mt-6 mb-3">{children}</h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-base md:text-lg font-semibold text-[#1A202C] mt-5 mb-2">{children}</h4>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#646464] pl-4 my-4 italic text-[#646464] text-sm md:text-base">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-outside pl-5 mb-4 space-y-1 text-[#3E3E42] text-sm md:text-base">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-outside pl-5 mb-4 space-y-1 text-[#3E3E42] text-sm md:text-base">{children}</ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
        number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold text-[#1A202C]">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        'strike-through': ({ children }) => <span className="line-through">{children}</span>,
        code: ({ children }) => (
            <code className="bg-[#f4f4f5] text-[#1A202C] text-xs px-1.5 py-0.5 rounded font-mono">{children}</code>
        ),
        link: ({ value, children }) => {
            const href = value?.href ?? '#'
            const isExternal = value?.blank || href.startsWith('http')
            return (
                <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-[#1A202C] underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                    {children}
                </a>
            )
        },
    },
}

const TermsAndConditionsSection = ({ data }: { data: TermsAndConditionsSectionProps }) => {
    const { sections } = data

    return (
        <section className="terms-and-conditions-section">
            <Container>
                <div className="px-[15px] py-13 lg:py-18 xl:py-24 border-r border-l border-[#eeedf2]">
                    <div className="lg:max-w-[775px] xl:max-w-[975px] mx-auto">
                        {sections?.map((section) => (
                            <div key={section._key} className="mb-12 last:mb-0">
                                <h2 className="text-xl md:text-[26px] xl:text-[32px] font-bold text-[#1A202C] mb-2">
                                    {section.heading}
                                </h2>

                                <PortableText
                                    value={section.body}
                                    components={portableTextComponents}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default memo(TermsAndConditionsSection)
