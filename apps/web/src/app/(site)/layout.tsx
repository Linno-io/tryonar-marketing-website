import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/sanity/queries";

interface SiteLayoutProps {
    children: React.ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
    const siteSettings = await getSiteSettings();

    return (
        <>
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
        </>
    );
}
