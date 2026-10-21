import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { getSiteSettings } from "@/lib/sanity/queries";

// Standalone business-card page: its own root layout because the site layout
// lives under [lang]. English-only, and excluded from language detection in proxy.ts.
export async function generateMetadata(): Promise<Metadata> {
    const siteSettings = await getSiteSettings('en');

    return {
        icons: siteSettings?.favicon?.url
            ? { icon: [{ url: siteSettings.favicon.url, rel: "icon", type: "image/png" }] }
            : undefined,
    };
}

export default function LincolnLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={fontVariables}>
            <body className="antialiased">{children}</body>
        </html>
    );
}
