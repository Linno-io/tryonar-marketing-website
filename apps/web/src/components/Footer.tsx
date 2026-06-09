'use client'
import Container from '@/components/ui/Container'
import { getMenuItemUrl } from '@/lib/utils/navigation'
import Logo from './ui/Logo'
import { ContactInfo, FooterMenu, SanityImage, SocialLink, SocialPlatform } from '@/lib/types/siteSettings'
import Link from 'next/link'
import { JSX } from 'react'
import { title } from 'process'

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M13.7857 0H4.6147C2.07369 0 0 2.07369 0 4.6147V13.8003C0 16.3267 2.07369 18.4004 4.6147 18.4004H13.8003C16.3413 18.4004 18.415 16.3267 18.415 13.7857V4.6147C18.4004 2.07369 16.3267 0 13.7857 0ZM6.13346 14.8956H3.50484V7.30174H6.13346V14.8956ZM4.80455 6.13346C4.05977 6.13346 3.46103 5.53472 3.46103 4.78994C3.46103 4.04517 4.05977 3.44642 4.80455 3.44642C5.54932 3.44642 6.14807 4.04517 6.14807 4.78994C6.13346 5.53472 5.53472 6.13346 4.80455 6.13346ZM14.9102 14.8956H14.8956H12.705V11.2155C12.705 10.3247 12.5882 9.18559 11.3761 9.18559C10.1348 9.18559 9.93037 10.1494 9.93037 11.1571V14.8956H7.73985V7.30174H9.78433V8.32399H9.84275C10.164 7.73985 10.9088 7.28714 12.0771 7.28714C14.4867 7.28714 14.9102 8.67447 14.9102 10.7336V14.8956Z" fill="#e9e4f5"/></svg>
)
const XIcon = () => (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.41 14.664C18.41 16.7188 16.7279 18.4 14.6719 18.4H3.73807C1.68211 18.4 0 16.7188 0 14.664V3.73604C0 1.68124 1.68211 0 3.73807 0H14.6719C16.7279 0 18.41 1.68124 18.41 3.73604V14.664Z" fill="#fff"/><path d="M10.5825 8.283L15.0109 2.7666H13.7282L9.94134 7.4842L6.15408 2.7666H1.92578L7.82699 10.1178L3.39818 15.6346H4.68088L8.46814 10.9166L12.2558 15.6346H16.4841L10.5825 8.283ZM4.01091 3.76656H5.67382L14.3986 14.6346H12.7357L4.01091 3.76656Z" fill="#1e192c"/></svg>
)
const YoutubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16" fill="none"><path d="M19.47 0H4.53C2.01 0 0 1.90543 0 4.23117V11.7688C0 14.1226 2.04 16 4.53 16H19.47C21.99 16 24 14.0946 24 11.7688V4.23117C24 1.90543 21.96 0 19.47 0ZM8.85 11.4606V4.56743L15.15 8.01401L8.85 11.4606Z" fill="#fff"/></svg>
)

interface FooterProps {
    logo?: SanityImage,
    footerMenus?: FooterMenu[]
    copyrightText?: string
    socialLinks?: SocialLink[]
    contactInfo?: ContactInfo
}

export default function Footer(props: FooterProps ) {
    const {
        logo,
        footerMenus,
        copyrightText,
        socialLinks,
        contactInfo
    } = props;

    const SocialIcons: { [key in SocialPlatform]: JSX.Element } = {
        LinkedIn: <LinkedinIcon />,
        YouTube: <YoutubeIcon />,
        X: <XIcon />
    }

    return (
        <footer className="bg-[#020408] text-white xl:pt-23 lg:pt-20 md:pt-15 pt-13 pb-0 relative overflow-hidden">
            <Container className="tryon-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 relative z-10">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 col-span-full">
                        <div className="flex items-center gap-3 mb-3">
                            <Logo url={logo?.url || ''} alt={logo?.alt || 'Logo'} />
                        </div>

                        <p className="text-[#E7E5EAB2] text-[13px] leading-relaxed mb-8 max-w-[280px]">
                            {copyrightText}
                        </p>

                        <div className="flex items-center gap-3">
                            <Link href={contactInfo?.internalSlug || contactInfo?.externalLink || '#'} className="bg-[#EEF2FF] text-[#020408] px-8 py-3 rounded-xl font-bold hover:bg-white transition-all text-sm flex items-center justify-center">
                                {contactInfo?.label || 'Contact Us'}
                            </Link>

                            {
                                socialLinks && socialLinks.length > 0 && (
                                    <div className="flex gap-2">
                                        {socialLinks.map((socialLink, index) => {
                                            const Icon = SocialIcons[socialLink.platform]
                                            if (!Icon) return null

                                            return (
                                                <Link
                                                    key={index}
                                                    href={socialLink.url}
                                                    target='_blank'
                                                    rel="noopener noreferrer"
                                                    aria-label={socialLink.platform}
                                                    title={socialLink.platform}
                                                    className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-800 bg-[#0A0C12] hover:border-gray-600 transition-all text-gray-400"
                                                >
                                                    {Icon}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {/* Fixed Menu Titles - Reduced tracking and size to prevent overlap */}
                    <div className="lg:col-span-8 col-span-full grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-10">
                        {footerMenus?.map((menu: any, index: number) => (
                            <div key={index}>
                                <p className="text-[13px] font-bold uppercase tracking-widest text-white mb-2 md:mb-5">
                                    {menu.title}
                                </p>
                                <ul className="md:space-y-3 space-y-2">
                                    {menu.items.map((item: any, i: number) => (
                                        <li key={i}>
                                            <Link href={getMenuItemUrl(item)} className="text-[#E7E5EAB2] hover:text-white text-[14px] transition-colors">
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Full-Width Background Text - Break out of container */}
            <div className="md:mt-16 mt-5 pointer-events-none select-none">
                <svg className="max-w-full h-auto" width="1739" height="228" viewBox="0 0 1739 228" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M240.67 59.8598H148.83V296.84H91.8399V59.8598H-0.000119317V6.14982H240.67V59.8598ZM357.469 94.2998V149.24C352.002 148.147 346.535 147.6 341.069 147.6C325.489 147.6 312.915 152.11 303.349 161.13C293.782 169.876 288.999 184.363 288.999 204.59V296.84H234.469V95.1198H287.359V125.05C297.199 104.003 316.332 93.4798 344.759 93.4798C347.765 93.4798 352.002 93.7532 357.469 94.2998ZM462.035 376.38H404.225L451.785 271.42L366.095 95.1198H427.185L480.895 213.2L530.505 95.1198H588.725L462.035 376.38ZM682.028 79.9498C663.988 96.6232 654.968 120.403 654.968 151.29C654.968 182.177 663.988 206.093 682.028 223.04C700.068 239.713 721.252 248.05 745.578 248.05C770.178 248.05 791.498 239.713 809.538 223.04C827.578 206.093 836.598 182.177 836.598 151.29C836.598 120.403 827.578 96.6232 809.538 79.9498C791.498 63.0032 770.178 54.5298 745.578 54.5298C721.252 54.5298 700.068 63.0032 682.028 79.9498ZM596.338 151.7C596.338 106.326 610.962 69.6998 640.208 41.8198C669.455 13.9398 704.578 -0.000171304 745.578 -0.000171304C786.852 -0.000171304 822.112 13.9398 851.358 41.8198C880.605 69.6998 895.228 106.326 895.228 151.7C895.228 196.8 880.605 233.29 851.358 261.17C822.112 289.05 786.852 302.99 745.578 302.99C704.578 302.99 669.455 289.05 640.208 261.17C610.962 233.29 596.338 196.8 596.338 151.7ZM982.411 180.81V296.84H927.881V95.1198H980.771V120.13C986.511 110.29 994.711 102.773 1005.37 97.5798C1016.03 92.3865 1027.24 89.7898 1038.99 89.7898C1062.77 89.7898 1080.81 97.3065 1093.11 112.34C1105.68 127.1 1111.97 146.233 1111.97 169.74V296.84H1057.44V179.17C1057.44 167.143 1054.3 157.44 1048.01 150.06C1042 142.68 1032.7 138.99 1020.13 138.99C1008.65 138.99 999.494 142.953 992.661 150.88C985.828 158.807 982.411 168.783 982.411 180.81ZM1445.32 296.84L1421.13 230.42H1303.05L1278.86 296.84H1219L1330.52 6.14982H1396.12L1506.82 296.84H1445.32ZM1362.09 68.8798L1321.91 178.76H1402.27L1362.09 68.8798ZM1675.2 296.84L1618.21 184.91H1588.69V296.84H1531.7V6.14982H1645.27C1673.15 6.14982 1695.57 14.6232 1712.51 31.5698C1729.46 48.5165 1737.93 69.8365 1737.93 95.5298C1737.93 115.756 1732.33 133.25 1721.12 148.01C1710.19 162.497 1695.16 172.473 1676.02 177.94L1738.34 296.84H1675.2ZM1588.69 136.12H1634.61C1648.83 136.12 1659.9 132.43 1667.82 125.05C1676.02 117.67 1680.12 107.967 1680.12 95.9398C1680.12 83.6398 1676.02 73.7998 1667.82 66.4198C1659.9 59.0398 1648.83 55.3498 1634.61 55.3498H1588.69V136.12Z" fill="#1a1a1b"/></svg>
            </div>
        </footer>
    )
}