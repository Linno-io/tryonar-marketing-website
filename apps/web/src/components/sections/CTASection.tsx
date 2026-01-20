'use client'
import Container from '@/components/ui/Container'
import { Button, Heading } from '@/components/ui'
import { ArrowUpRight, Play, Headphones, ShieldCheck } from 'lucide-react'
import { CTASection as CTASectionType } from '@/lib/types/section'
import Link from 'next/link'

interface CTAProps {
    data: CTASectionType
}

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22" fill="none">
        <path d="M7.74767 0.982529L2.8157 2.86276C1.67907 3.29282 0.75 4.65299 0.75 5.87314V13.3041C0.75 14.4842 1.52093 16.0344 2.45988 16.7445L6.70988 19.9549C8.10349 21.015 10.3965 21.015 11.7901 19.9549L16.0401 16.7445C16.9791 16.0344 17.75 14.4842 17.75 13.3041V5.87314C17.75 4.64299 16.8209 3.28282 15.6843 2.85276L10.7523 0.982529C9.91221 0.67249 8.56802 0.67249 7.74767 0.982529Z" stroke="#7A7878" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.75 10.2523L7.38452 11.75L11.75 7.75" stroke="#7A7878" strokeOpacity="0.9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M4.91518 7.91591C4.91518 8.37503 5.02242 8.80999 5.21345 9.19663C4.80291 9.71992 4.54737 10.369 4.51302 11.0765C3.72461 10.2532 3.2395 9.13997 3.2395 7.91674C3.2395 5.07449 5.85524 2.82801 8.81868 3.43296C10.5631 3.7896 11.9765 5.18698 12.3485 6.91932C12.4608 7.44261 12.4817 7.95507 12.4248 8.44503C12.3762 8.85999 12.01 9.16663 11.5894 9.16663H11.5517C11.0557 9.16663 10.7072 8.7275 10.7616 8.23754C10.7985 7.90841 10.7792 7.5626 10.6946 7.21013C10.4449 6.16606 9.58866 5.3203 8.53717 5.07948C6.62186 4.64202 4.91434 6.08523 4.91434 7.91674L4.91518 7.91591ZM1.65598 6.83683C1.88555 5.50945 2.53822 4.29955 3.55034 3.35547C4.8314 2.1614 6.50876 1.57146 8.26738 1.67978C11.5794 1.89309 14.1691 4.77868 14.1306 8.23338C14.1147 9.67992 12.8965 10.8315 11.4428 10.8315H9.42696C9.22252 10.1407 8.58744 9.63242 7.82668 9.63242C6.90086 9.63242 6.151 10.3782 6.151 11.2989C6.151 12.2197 6.90086 12.9655 7.82668 12.9655C8.27744 12.9655 8.68547 12.7863 8.98625 12.498H11.4428C13.8047 12.498 15.7728 10.6273 15.8063 8.27921C15.8683 3.92875 12.5823 0.2874 8.37547 0.0174232C6.14346 -0.126731 4.02623 0.62737 2.40501 2.14057C1.14908 3.3113 0.313756 4.86117 0.0129709 6.52853C-0.0783538 7.03515 0.324648 7.50011 0.841596 7.50011C1.23706 7.50011 1.58979 7.22597 1.65598 6.83767V6.83683ZM7.84762 14.1654C4.7518 14.1654 2.07322 16.0752 1.1826 18.9166C1.04435 19.3557 1.29152 19.8232 1.73306 19.9607C2.17376 20.0932 2.64379 19.8515 2.78204 19.4132C3.44309 17.3051 5.52513 15.8319 7.84679 15.8319C10.1684 15.8319 12.2513 17.3051 12.9115 19.4132C13.0238 19.7699 13.3539 19.9982 13.7117 19.9982C13.7946 19.9982 13.8776 19.9857 13.9614 19.9607C14.4029 19.8232 14.6492 19.3557 14.5118 18.9166C13.6212 16.0752 10.9426 14.1654 7.84679 14.1654H7.84762Z" fill="#7A7878"/>
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path d="M15.1929 7.01939V5.83283C15.1929 4.28587 14.5338 2.80226 13.3606 1.7084C12.1873 0.614528 10.5961 0 8.93697 0C7.27781 0 5.6866 0.614528 4.5134 1.7084C3.34019 2.80226 2.68109 4.28587 2.68109 5.83283V7.01939C1.88513 7.34328 1.20765 7.87642 0.731491 8.5536C0.255334 9.23078 0.00114248 10.0227 0 10.8324V15.832C0.00141906 16.9365 0.47266 17.9955 1.31036 18.7765C2.14805 19.5576 3.28381 19.9969 4.46849 19.9983H13.4055C14.5901 19.9969 15.7259 19.5576 16.5636 18.7765C17.4013 17.9955 17.8725 16.9365 17.8739 15.832V10.8324C17.8728 10.0227 17.6186 9.23078 17.1425 8.5536C16.6663 7.87642 15.9888 7.34328 15.1929 7.01939ZM4.46849 5.83283C4.46849 4.72785 4.93927 3.66814 5.77728 2.8868C6.61528 2.10547 7.75186 1.66652 8.93697 1.66652C10.1221 1.66652 11.2587 2.10547 12.0967 2.8868C12.9347 3.66814 13.4055 4.72785 13.4055 5.83283V6.66609H4.46849V5.83283ZM16.0866 15.832C16.0866 16.4949 15.8041 17.1308 15.3013 17.5996C14.7985 18.0684 14.1165 18.3317 13.4055 18.3317H4.46849C3.75742 18.3317 3.07547 18.0684 2.57267 17.5996C2.06987 17.1308 1.78739 16.4949 1.78739 15.832V10.8324C1.78739 10.1694 2.06987 9.53358 2.57267 9.06478C3.07547 8.59598 3.75742 8.33261 4.46849 8.33261H13.4055C14.1165 8.33261 14.7985 8.59598 15.3013 9.06478C15.8041 9.53358 16.0866 10.1694 16.0866 10.8324V15.832Z" fill="#7A7878"/>
        <path d="M8.94134 11.1113C8.64506 11.1113 8.36092 11.2284 8.15142 11.4368C7.94192 11.6451 7.82422 11.9278 7.82422 12.2224V14.4447C7.82422 14.7393 7.94192 15.022 8.15142 15.2303C8.36092 15.4387 8.64506 15.5558 8.94134 15.5558C9.23762 15.5558 9.52176 15.4387 9.73126 15.2303C9.94077 15.022 10.0585 14.7393 10.0585 14.4447V12.2224C10.0585 11.9278 9.94077 11.6451 9.73126 11.4368C9.52176 11.2284 9.23762 11.1113 8.94134 11.1113Z" fill="#7A7878"/>
    </svg>
)

export default function CTASection({ data }: CTAProps) {
    if (!data) return null

    const { 
        title, 
        description, 
        primaryButton, 
        secondaryButton,
        highlightText,
        stats,
    } = data;

    const statsIcons = {
        'support': <SupportIcon />,
        'security': <LockIcon />,
        'trial': <ShieldIcon />,
    }

    return (
        <section className="relative overflow-hidden bg-[#050308] pb-24 md:pb-32">

            {/* 1. DOTTED HEADER & LINE (Z-index 20) */}
            <div
                className="relative w-full h-[105px] border-b border-white/10 z-20"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1.5px, transparent 1.5px)`,
                    backgroundSize: '16px 16px',
                }}
            />

            <div
                className="absolute -bottom-[100px] left-1/2 -translate-x-1/2 w-full h-[300px] opacity-40 pointer-events-none z-10"
                style={{
                    background: 'radial-gradient(circle, rgb(240 134 117) 0%, transparent 100%)',
                    filter: 'blur(160px)'
                }}
            />

            {/* 3. CONTENT AREA */}
            <Container className="relative z-30 pt-[100px]">
                <div className="flex flex-col items-center text-center mx-auto px-4">

                    <Heading level={2} className="text-4xl md:text-6xl font-bold text-white mb-2.5 tracking-tight leading-tight">
                        {title} 
                        {highlightText && (
                            <span className='text-[#998188]'>{' ' + highlightText}</span>
                        )}
                    </Heading>

                    <p className="text-gray-400 text-lg md:text-xl mb-12 font-normal leading-relaxed">
                        {description}
                    </p>

                    {/* BUTTON GROUP */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link href={primaryButton.internalLink || primaryButton.externalLink || '#'} target={primaryButton.externalLink ? '_blank' : '_self'}>
                            <Button
                                className="group w-full sm:w-auto h-[60px] !bg-[#FFA395] !text-black !rounded-xl !font-bold !text-lg gap-2 hover:brightness-110 transition-all px-10 shadow-lg shadow-[#FFA395]/10"
                            >
                                {primaryButton.text}
                                <ArrowUpRight size={20} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Button>
                        </Link>

                        <Link href={secondaryButton.internalLink || secondaryButton.externalLink || '#'} target={secondaryButton.externalLink ? '_blank' : '_self'}>
                            <Button
                                className="w-full sm:w-auto h-[60px] !bg-[#F0F1F0] !text-black !border-none !rounded-xl !font-bold !text-lg hover:bg-gray-100 transition-all px-10 flex items-center gap-2 shadow-lg shadow-white/5"
                            >
                                {secondaryButton.text}
                                <svg fill="none" width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg"><path stroke="#292D32" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M.75 7.867V4.955c0-3.758 2.656-5.274 5.903-3.404l2.519 1.456 2.519 1.456c3.246 1.87 3.246 4.94 0 6.808l-2.519 1.457-2.519 1.456C3.406 16.054.75 14.518.75 10.78V7.867z"/></svg>
                            </Button>
                        </Link>
                    </div>

                    {
                        stats && stats.length > 0 && (
                            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-white font-medium pt-10">
                                
                                {stats.map((stat, index) => {
                                    const Icon = statsIcons[stat.type]
                                    if (!Icon) return null

                                    return (
                                        <div key={index} className="flex items-center gap-2.5 opacity-90">
                                            {Icon}
                                            <span className="text-sm md:text-base">{stat.label}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                </div>
            </Container>
        </section>
    )
}