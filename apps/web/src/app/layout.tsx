import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
    const siteSettings = await getSiteSettings();

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
