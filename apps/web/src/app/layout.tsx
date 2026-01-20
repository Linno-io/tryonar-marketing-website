
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/sanity/queries";

interface RootLayoutProps {
    children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
    const siteSettings = await getSiteSettings();
    console.log(siteSettings);

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

export default async function RootLayout(props: RootLayoutProps) {
    const {
        children
    } = props;

    const siteSettings = await getSiteSettings();

    return (
        <html lang="en">
            <body className="antialiased">
                
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
            </body>
        </html>
    );
}
