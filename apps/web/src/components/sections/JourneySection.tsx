'use client'
import React from 'react'
import { Link2, CloudUpload, Rocket, ArrowUpRight, ChevronRight } from 'lucide-react'
import { Container } from '../ui';
import { JourneySection as JourneySectionProps } from '@/lib/types/section';
import Link from 'next/link';

const ConnectIcon = () => (
    <svg fill="none" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><g fill="#000" clipPath="url(#clip0_273_1372)"><path d="M17.429 16.395a.83.83 0 00-1.174 0l-1.868 1.868-2.65-2.65 1.868-1.867a.83.83 0 10-1.174-1.175l-1.868 1.868-1.493-1.493a.83.83 0 00-1.174 0l-3.303 3.302a6.305 6.305 0 00-.431 8.426.819.819 0 00-.078.068l-3.84 3.84a.83.83 0 001.173 1.175l3.841-3.84a.84.84 0 00.068-.079 6.28 6.28 0 003.974 1.41 6.276 6.276 0 004.452-1.841l3.302-3.303a.83.83 0 000-1.174l-1.493-1.493 1.868-1.868a.83.83 0 000-1.174zm-4.851 7.837a4.64 4.64 0 01-6.555 0l-.255-.255a4.64 4.64 0 010-6.555l2.715-2.715 6.81 6.81-2.715 2.715zM29.757 1.417A.83.83 0 0028.583.243l-3.841 3.84a.823.823 0 00-.068.079A6.248 6.248 0 0020.7 2.749a6.254 6.254 0 00-4.452 1.844l-3.302 3.303a.83.83 0 000 1.174l7.984 7.984a.83.83 0 001.174 0l3.303-3.302A6.254 6.254 0 0027.25 9.3a6.247 6.247 0 00-1.412-3.974.847.847 0 00.078-.068l3.84-3.84zm-5.525 11.16l-2.715 2.716-6.81-6.81 2.715-2.715A4.605 4.605 0 0120.7 4.41c1.238 0 2.402.482 3.277 1.358l.255.255A4.605 4.605 0 0125.59 9.3a4.605 4.605 0 01-1.358 3.278z" /><path d="M21.918 11.527l-3.445-3.445a.83.83 0 00-1.174 1.174l3.445 3.445a.828.828 0 001.174 0 .83.83 0 000-1.174zm-9.136 9.136l-3.445-3.445a.83.83 0 00-1.174 1.174l3.445 3.445a.828.828 0 001.174 0 .83.83 0 000-1.174z" /></g><defs><clipPath id="clip0_273_1372"><path fill="#fff" d="M0 0h30v30H0z" /></clipPath></defs></svg>
);

const SyncIcon = () => (
<svg width="28" height="28" fill="none" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)" fill="#1A202C"><path d="m14 2.3334c1.5476 0.00508 3.0788 0.31703 4.5051 0.9178 1.4262 0.60077 2.7191 1.4784 3.8039 2.5822h-3.6423c-0.3094 0-0.6062 0.12292-0.825 0.34171s-0.3417 0.51554-0.3417 0.82496 0.1229 0.60616 0.3417 0.82496c0.2188 0.21879 0.5156 0.34171 0.825 0.34171h4.8335c0.5745-3.1e-4 1.1254-0.22867 1.5316-0.6349s0.6346-0.95711 0.6349-1.5316v-4.8335c0-0.30942-0.1229-0.60616-0.3417-0.82495-0.2188-0.21879-0.5156-0.34171-0.825-0.34171s-0.6062 0.12292-0.8249 0.34171c-0.2188 0.21879-0.3418 0.51554-0.3418 0.82495v2.4243c-1.9283-1.7366-4.3019-2.9022-6.8552-3.3661-2.5532-0.46394-5.1852-0.20794-7.6012 0.73932-2.416 0.94725-4.5206 2.5484-6.0781 4.6241-1.5575 2.0757-2.5064 4.544-2.7405 7.1284-0.015069 0.1625 0.0038684 0.3263 0.055607 0.4811 0.051738 0.1547 0.13514 0.297 0.2449 0.4177 0.10976 0.1208 0.24346 0.2173 0.39258 0.2835 0.14913 0.0662 0.31042 0.1006 0.47358 0.1011 0.28535 0.0036 0.56179-0.0994 0.7752-0.2888 0.21341-0.1895 0.34843-0.4518 0.37863-0.7356 0.25972-2.9041 1.596-5.6061 3.7463-7.5753 2.1503-1.9692 4.9592-3.0631 7.8749-3.067z"/><path d="m26.776 14c-0.2854-0.0036-0.5618 0.0993-0.7752 0.2888s-0.3484 0.4518-0.3786 0.7355c-0.1929 2.2205-1.0186 4.339-2.3793 6.1043-1.3606 1.7652-3.1991 3.1032-5.2972 3.855-2.0982 0.7519-4.368 0.8861-6.5401 0.3868-2.1722-0.4993-4.1555-1.6112-5.7148-3.2037h3.6423c0.30942 0 0.60617-0.123 0.82495-0.3417 0.2188-0.2188 0.3417-0.5156 0.3417-0.825s-0.1229-0.6062-0.3417-0.825c-0.21878-0.2188-0.51553-0.3417-0.82495-0.3417h-4.8335c-0.28455-1e-4 -0.56634 0.0558-0.82926 0.1646-0.26292 0.1089-0.50182 0.2684-0.70303 0.4696s-0.36078 0.4401-0.46961 0.7031c-0.10882 0.2629-0.16475 0.5447-0.1646 0.8292v4.8335c0 0.3094 0.12292 0.6062 0.34171 0.825s0.51554 0.3417 0.82496 0.3417 0.60616-0.1229 0.82496-0.3417c0.21879-0.2188 0.34171-0.5156 0.34171-0.825v-2.4243c1.9283 1.7366 4.302 2.9022 6.8552 3.3661 2.5532 0.464 5.1852 0.208 7.6012-0.7393s4.5206-2.5484 6.0781-4.6241c1.5575-2.0756 2.5064-4.5439 2.7405-7.1284 0.0151-0.1624-0.0039-0.3263-0.0556-0.481-0.0518-0.1548-0.1352-0.297-0.2449-0.4178-0.1098-0.1207-0.2435-0.2172-0.3926-0.2834-0.1491-0.0663-0.3093-0.1007-0.4724-0.1011z"/></g><defs><clipPath id="a"><rect width="28" height="28" fill="#fff"/></clipPath></defs></svg>

);

const RocketIcon = () => (
    <svg fill="none" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path fill="#04071E" stroke="#fff" strokeWidth=".2" d="M7.974 26.494a1.048 1.048 0 011.481 1.48l-1.62 1.62a1.048 1.048 0 01-1.48-1.482l1.619-1.618zm-2.971-2.977a1.047 1.047 0 011.48 1.48l-3.785 3.785a1.047 1.047 0 11-1.48-1.48l3.785-3.785zM15.148 3.095A10.225 10.225 0 0125.407.56l1.012.314a4.106 4.106 0 012.703 2.702l.316 1.017a10.223 10.223 0 01-2.534 10.262l-1.588 1.588.053.07a5.249 5.249 0 01-.492 6.854l-1.9 1.9a1.047 1.047 0 01-1.48 0l-2.503-2.501-.071.07-.27.27a2.576 2.576 0 01-3.644 0l-.853-.852-.065.113-1.22 2.134a1.048 1.048 0 01-1.65.22l-5.948-5.948a1.048 1.048 0 01.222-1.65l2.134-1.217.114-.064-.85-.85a2.577 2.577 0 010-3.644l.345-.346-.07-.071-2.434-2.433a1.047 1.047 0 010-1.48l1.9-1.9a5.25 5.25 0 016.858-.491l.07.052.061-.062 1.524-1.522zM2.029 20.543a1.047 1.047 0 111.48 1.48l-1.621 1.622a1.048 1.048 0 01-1.482-1.48l1.623-1.622zm21.698-2.51l-3.181 3.18-.07.072 1.69 1.69.071.07.07-.07 1.09-1.088v-.001a3.154 3.154 0 00.487-3.832l-.066-.112-.09.091zm-14.514-.619l-1.374.784-.113.065.091.092 3.825 3.824.092.093.065-.114.785-1.373.038-.065-.054-.055-3.235-3.234-.054-.055-.066.038zM24.786 2.56a8.13 8.13 0 00-8.158 2.015l-8.253 8.253a.483.483 0 000 .683l8.115 8.115a.483.483 0 00.683 0l8.252-8.251a8.13 8.13 0 002.014-8.161l-.315-1.016a2.013 2.013 0 00-1.325-1.324l-1.013-.314zm-8.423 5.812a3.725 3.725 0 115.267 5.268 3.725 3.725 0 01-5.267-5.268zm3.785 1.48a1.63 1.63 0 10-2.303 2.304 1.63 1.63 0 002.303-2.303zm-8.196-3.74a3.155 3.155 0 00-3.835.486l-1.09 1.089-.07.07 1.764 1.764.07-.07 3.182-3.181.09-.092-.11-.066z" /></svg>
);

const ArrowIcon = () => (
    <svg fill="none" width="50" height="27" viewBox="0 0 50 27" xmlns="http://www.w3.org/2000/svg"><path fill="url(#paint0_linear_273_1391)" d="M32.742 25.818a1.465 1.465 0 01.23-2.06L46.19 13.185 32.971 2.609A1.465 1.465 0 1134.801.32l14.65 11.719a1.464 1.464 0 010 2.288L34.8 26.046a1.465 1.465 0 01-2.059-.228zm-2.53-13.778a1.465 1.465 0 010 2.288L15.564 26.046a1.465 1.465 0 01-2.38-1.143v-4.395H1.464A1.465 1.465 0 010 19.043V7.324C0 6.515.656 5.86 1.465 5.86h11.719V1.465a1.465 1.465 0 012.38-1.144L30.212 12.04zM16.113 7.324c0 .81-.656 1.465-1.465 1.465H2.93v8.79h11.718c.81 0 1.465.655 1.465 1.464v2.812l10.839-8.671-10.839-8.671v2.811zM39.69 12.04a1.465 1.465 0 010 2.288L25.04 26.046a1.465 1.465 0 11-1.83-2.287l13.22-10.575L23.21 2.609A1.465 1.465 0 0125.04.32l14.65 11.72z"/><defs><linearGradient id="paint0_linear_273_1391" x1="0" x2="50" y1="13.184" y2="13.184" gradientUnits="userSpaceOnUse"><stop stopColor="#9A68FF"/><stop offset="1" stopColor="#FFA49B"/></linearGradient></defs></svg>
)

export default function JourneySection({ data }: { data: JourneySectionProps }) {
    const { title, description, steps: dynamicSteps, primaryButton, ctaTitle, ctaDescription } = data;

    // Static icons mapping (not dynamic)
    const icons = [
        <ConnectIcon />,
        <SyncIcon />,
        <RocketIcon />,
    ];

    // Combine dynamic data with static icons
    const steps = dynamicSteps.map((step, index) => ({
        title: step.title,
        description: step.description,
        subtext: step.subtext,
        icon: icons[index] || <ConnectIcon />,
    }));

    return (
        <section className="font-sans relative overflow-hidden bg-white z-10">
             <Container className='py-12.5 md:py-27.5 !px-[10px]'>
                <div className="text-center mb-10 md:mb-20">
                    <h2 className="section-title">
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
                    </h2>
                    <p className="text-[#3E3E42] text-lg">
                        {description}
                    </p>
                </div>

                {/* Steps */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 md:gap-20 lg:gap-40 relative">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            {/* Step Card */}
                            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left relative">
                                {/* Icon Box */}
                                <div className="relative z-10 pl-7 mb-2 md:mb-5">
                                    <div className="w-14 h-14 border border-[#ECEDF1] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center text-gray-800">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="relative pt-3 md:pt-6 border-l-0 lg:border-l border-[#D7D7D7] pl-7 arrow-border">
                                    <h3 className="text-3xl font-bold text-[#1A202C] mb-3 flex items-center justify-center lg:justify-start gap-2">
                                        <span className="text-gray-900">{index + 1}.</span> {step.title}
                                    </h3>
                                    <p className="text-[#1A202C] font-bold text-[17px] mb-2">
                                        {step.description}
                                    </p>
                                    <p className="text-[#3E3E42] leading-relaxed text-[15px] max-w-[280px]">
                                        {step.subtext}
                                    </p>
                                </div>
                            </div>

                            {/* Triple Chevron Divider */}
                            {index < steps.length - 1 && (
                                <div className={`hidden lg:flex items-center pt-20 px-4 h-[230px] absolute ${index === 0 ? 'left-[26%]' : 'right-[30%]'}`}>
                                    <ArrowIcon />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* CTA Card */}
                <div
                    className="mt-12 md:mt-20 overflow-hidden bg-gradient-to-r from-[#f0ecff] via-[#faf9ff] to-[#f0ecff] md:bg-[url('/journey_cta_bg.webp')] md:bg-cover md:bg-center md:bg-no-repeat border border-[#ECEDF1] rounded-xl md:rounded-3xl"
                    style={{
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <div className="flex flex-col items-center justify-center text-center py-8 px-6 md:py-20 md:px-12">
                        {ctaTitle && (
                            <h2 className="section-title">
                                {ctaTitle.map((block, index) => (
                                    block.type === 'normal'
                                        ? <span key={index}>{block.text}</span>
                                        : <span key={index} className="text-[#838383]">{block.text}</span>
                                ))}
                            </h2>
                        )}
                        {ctaDescription && (
                            <p className="text-[#3E3E42] text-base md:text-lg mb-8">
                                {ctaDescription}
                            </p>
                        )}
                        {primaryButton && (
                            <Link href={primaryButton.internalLink || primaryButton.externalLink || '#'} target={primaryButton.externalLink ? '_blank' : '_self'}>
                                <button className="bg-[#18181b] text-white px-4 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl cursor-pointer font-bold text-base md:text-lg flex items-center gap-3 hover:bg-black transition-all shadow-xl hover:shadow-2xl">
                                    {primaryButton.text}
                                    {primaryButton.showIcon && <ArrowUpRight size={20} />}
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function TripleChevron() {
    return (
        <div className="flex -space-x-3">
            <ChevronRight className="text-purple-200" size={32} strokeWidth={3} />
            <ChevronRight className="text-purple-300" size={32} strokeWidth={3} />
            <ChevronRight className="text-purple-400" size={32} strokeWidth={3} />
        </div>
    )
}