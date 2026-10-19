import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/sanity/queries";
import { LOCALES, isLocale } from "@/lib/i18n/config";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";

interface SiteLayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
    return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Pick<SiteLayoutProps, "params">): Promise<Metadata> {
    const { lang } = await params;
    const siteSettings = isLocale(lang) ? await getSiteSettings(lang) : null;

    return {
        title: siteSettings?.siteTitle ?? 'TryOnAR',
        description: siteSettings?.siteDescription ?? undefined,
        icons: siteSettings?.favicon?.url
            ? {
                icon: [
                    {
                        url: siteSettings.favicon.url,
                        rel: "icon",
                        type: "image/png",
                    },
                ],
            }
            : undefined,
    };
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
    const { lang } = await params;
    if (!isLocale(lang)) notFound();

    const siteSettings = await getSiteSettings(lang);

    return (
        <html lang={lang}>
            <body className="antialiased">
                <LocaleProvider locale={lang}>
                    <Navigation
                        logo={siteSettings?.logo}
                        menuItems={siteSettings?.headerMenu}
                        signinInfo={siteSettings?.signinInfo}
                    />
                    {children}
                    <Footer
                        logo={siteSettings?.footerLogo}
                        footerMenus={siteSettings?.footerMenus || []}
                        copyrightText={siteSettings?.copyrightText}
                        socialLinks={siteSettings?.socialLinks}
                        contactInfo={siteSettings?.contactInfo}
                    />
                </LocaleProvider>
            </body>
        </html>
    );
}
