import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "TryOn AR - AR for Everyone, Not Just Tech Giants",
  description: "Transform your e-commerce store with 3-tap AR integration. Let customers try before they buy, reduce returns by 64%, and boost conversions by 94% with our no-code AR solution.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation 
          logo={siteSettings?.logo}
          menuItems={siteSettings?.headerMenu}
          ctaLink="#start-trial"
        />
        {children}
        <Footer 
          logo={siteSettings?.logo}
          footerMenus={siteSettings?.footerMenus || []}
          copyrightText={siteSettings?.copyrightText}
          socialLinks={siteSettings?.socialLinks}
        />
      </body>
    </html>
  );
}
