import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TryOn AR - AR for Everyone, Not Just Tech Giants",
  description: "Transform your e-commerce store with 3-tap AR integration. Let customers try before they buy, reduce returns by 64%, and boost conversions by 94% with our no-code AR solution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
