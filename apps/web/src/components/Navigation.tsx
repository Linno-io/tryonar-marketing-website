'use client'

import { memo, useState } from 'react'
import Image from 'next/image'
import { MenuItem } from '@/lib/types/siteSettings'
import { getMenuItemUrl } from '@/lib/utils/navigation'
import Logo from './ui/Logo'
import SignInButton from './ui/SignInButton'
import Link from 'next/link'

interface NavigationProps {
    logo?: {
        url: string
        alt?: string
    }
    menuItems?: MenuItem[]
    ctaLink?: string
}

const Navigation = (props: NavigationProps) => {
    const { 
        logo, 
        menuItems = [], 
        ctaLink = '#start-trial' 
    } = props;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <nav className="absolute top-6.5 left-0 right-0 z-50 flex justify-center px-4">
                <div className="w-full max-w-[747px] h-[50px] lg:h-[70px] bg-[#1A1A1A] rounded-full flex items-center justify-between px-8 shadow-2xl border border-white/5">
                    <div className="flex items-center">
                        <Logo url={logo?.url || ''} alt={logo?.alt || 'Logo'} />
                    </div>

                    <div className='flex items-center lg:gap-8'>
                        <div className="hidden md:flex items-center gap-6 lg:gap-8">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={`${item.label}-${index}`}
                                    href={getMenuItemUrl(item)}
                                    className="text-white hover:text-shadow-white font-medium transition-colors text-sm"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center">
                            <SignInButton />
                        </div>

                        <button
                            type="button"
                            className="md:hidden p-2 text-white cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="absolute top-15 left-4 right-4 bg-[#1A1A1A] rounded-2xl p-6 shadow-2xl md:hidden border border-white/10">
                        <div className="flex flex-col gap-2">
                            {menuItems.map((item, index) => (
                                <a key={index} href={getMenuItemUrl(item)} className="text-white text-base py-2 border-b border-white/5">
                                    {item.label}
                                </a>
                            ))}
                            <SignInButton />
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
};

export default memo(Navigation);