import type { Metadata } from 'next'
import type { Page } from '@/lib/types/page'
import { DEFAULT_LOCALE, LOCALES, SITE_URL, type Locale } from './config'
import { localizePath } from './links'

const FALLBACK_TITLE = 'TryOn AR - AR for Everyone, Not Just Tech Giants'
const FALLBACK_DESCRIPTION =
    'Transform your e-commerce store with 3-tap AR integration. Let customers try before they buy, reduce returns by 64%, and boost conversions by 94% with our no-code AR solution.'

const OG_LOCALE: Record<Locale, string> = {
    en: 'en_US',
    fr: 'fr_FR',
    es: 'es_ES',
    nl: 'nl_NL',
}

export function buildPageMetadata(page: Page | null, slug: string, lang: Locale): Metadata {
    if (!page) {
        return { title: FALLBACK_TITLE, description: FALLBACK_DESCRIPTION }
    }

    const path = slug === 'home' ? '/' : `/${slug}`
    const urlFor = (locale: Locale) => `${SITE_URL}${localizePath(path, locale)}`

    // Only advertise languages that really have a translation; the rest render
    // the English fallback and shouldn't be indexed as separate pages.
    const published = LOCALES.filter((locale) => page.availableLanguages?.includes(locale))
    const languages: Record<string, string> = Object.fromEntries(published.map((locale) => [locale, urlFor(locale)]))
    if (published.length > 1) languages['x-default'] = urlFor(DEFAULT_LOCALE)

    // English keeps whatever the editor set. Other languages point at the
    // version that actually rendered, i.e. English until a translation exists.
    const canonical = lang === DEFAULT_LOCALE ? page.seo?.canonicalUrl : urlFor(page.language)

    const { seo } = page
    const title = seo?.metaTitle || page.title || FALLBACK_TITLE
    const description = seo?.metaDescription || FALLBACK_DESCRIPTION

    return {
        title,
        description,
        alternates: {
            canonical,
            languages: published.length > 1 ? languages : undefined,
        },
        openGraph: {
            title: seo?.ogTitle || seo?.metaTitle || page.title,
            description: seo?.ogDescription || seo?.metaDescription,
            images: seo?.ogImage?.asset?.url ? [{ url: seo.ogImage.asset.url }] : [],
            locale: OG_LOCALE[page.language] ?? OG_LOCALE[DEFAULT_LOCALE],
        },
        twitter: {
            card: 'summary_large_image',
            title: seo?.ogTitle || seo?.metaTitle || page.title,
            description: seo?.ogDescription || seo?.metaDescription,
            images: seo?.ogImage?.asset?.url ? [seo.ogImage.asset.url] : [],
        },
    }
}
