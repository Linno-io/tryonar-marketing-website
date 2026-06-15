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
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 relative z-10">

                    {/* Brand Section */}
                    <div className="footer-brand">
                        <div className="flex items-center gap-3 mb-3">
                            <Logo url={logo?.url || ''} alt={logo?.alt || 'Logo'} />
                        </div>

                        <p className="text-[#E7E5EAB2] text-[13px] leading-relaxed mb-8 max-w-[280px]">
                            &copy; {new Date().getFullYear()} {copyrightText}
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
                    <div className="flex gap-10 items-start">
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
                <svg className="max-w-full h-auto" xmlns="http://www.w3.org/2000/svg" width="1739" height="222" viewBox="0 0 1549 222" fill="none"><path d="M240.67 53.7104H148.83V290.69H91.8401V53.7104H6.37881e-05V0.000408769H240.67V53.7104ZM357.469 88.1504V143.09C352.002 141.997 346.535 141.45 341.069 141.45C325.489 141.45 312.915 145.96 303.349 154.98C293.782 163.727 288.999 178.214 288.999 198.44V290.69H234.469V88.9704H287.359V118.9C297.199 97.8538 316.332 87.3304 344.759 87.3304C347.765 87.3304 352.002 87.6038 357.469 88.1504ZM462.035 370.23H404.225L451.785 265.27L366.095 88.9704H427.185L480.895 207.05L530.505 88.9704H588.725L462.035 370.23ZM653.969 232.06C664.083 242.174 676.246 247.23 690.459 247.23C704.673 247.23 716.699 242.174 726.539 232.06C736.653 221.947 741.709 207.87 741.709 189.83C741.709 171.79 736.653 157.714 726.539 147.6C716.699 137.487 704.673 132.43 690.459 132.43C676.246 132.43 664.083 137.487 653.969 147.6C644.129 157.714 639.209 171.79 639.209 189.83C639.209 207.87 644.129 221.947 653.969 232.06ZM614.609 113.16C634.836 92.9338 660.119 82.8204 690.459 82.8204C720.799 82.8204 745.946 92.9338 765.899 113.16C786.126 133.387 796.239 158.944 796.239 189.83C796.239 220.717 786.126 246.274 765.899 266.5C745.946 286.727 720.799 296.84 690.459 296.84C660.119 296.84 634.836 286.727 614.609 266.5C594.656 246.274 584.679 220.717 584.679 189.83C584.679 158.944 594.656 133.387 614.609 113.16ZM881.513 174.66V290.69H826.983V88.9704H879.873V113.98C885.613 104.14 893.813 96.6238 904.473 91.4304C915.133 86.2371 926.34 83.6404 938.093 83.6404C961.873 83.6404 979.913 91.1571 992.213 106.19C1004.79 120.95 1011.07 140.084 1011.07 163.59V290.69H956.543V173.02C956.543 160.994 953.4 151.29 947.113 143.91C941.1 136.53 931.806 132.84 919.233 132.84C907.753 132.84 898.596 136.804 891.763 144.73C884.93 152.657 881.513 162.634 881.513 174.66ZM1255.43 290.69L1231.24 224.27H1113.16L1088.97 290.69H1029.11L1140.63 0.000408769H1206.23L1316.93 290.69H1255.43ZM1172.2 62.7304L1132.02 172.61H1212.38L1172.2 62.7304ZM1485.31 290.69L1428.32 178.76H1398.8V290.69H1341.81V0.000408769H1455.38C1483.26 0.000408769 1505.67 8.47375 1522.62 25.4204C1539.56 42.3671 1548.04 63.6871 1548.04 89.3804C1548.04 109.607 1542.43 127.1 1531.23 141.86C1520.29 156.347 1505.26 166.324 1486.13 171.79L1548.45 290.69H1485.31ZM1398.8 129.97H1444.72C1458.93 129.97 1470 126.28 1477.93 118.9C1486.13 111.52 1490.23 101.817 1490.23 89.7904C1490.23 77.4904 1486.13 67.6504 1477.93 60.2704C1470 52.8904 1458.93 49.2004 1444.72 49.2004H1398.8V129.97Z" fill="#1A1A1B"/></svg>
            </div>
        </footer>
    )
}