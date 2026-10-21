import { Inter, Sora } from 'next/font/google'
import localFont from 'next/font/local'

// next/font self-hosts these at build time and preloads them, so there is no
// render-blocking request to fonts.googleapis.com. Components use the CSS
// variables (via --font-body / --font-heading in globals.css), never the
// family names: next/font renames the families.
// `subsets` only picks what is preloaded; every unicode range is still declared,
// so latin-ext glyphs load on demand. Basic latin covers FR/ES/NL accents.
export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

// Only used by one heading in IndustrySolutionsSection, so not worth a preload.
export const sora = Sora({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-sora',
    display: 'swap',
    preload: false,
})

export const circularStd = localFont({
    // No weight on purpose: the old @font-face had none, and headings render
    // with that (browser-emboldened) look today.
    src: '../../public/fonts/circular-std.woff2',
    variable: '--font-circular',
    display: 'swap',
})

export const fontVariables = `${inter.variable} ${sora.variable} ${circularStd.variable}`
