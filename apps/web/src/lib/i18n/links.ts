import { DEFAULT_LOCALE, isLocale, type Locale } from './config'

// Absolute links an editor pasted for this same site, e.g. https://tryonar.net/pricing.
const SELF_ORIGIN = /^https?:\/\/(www\.)?tryonar\.net(?=[/?#]|$)/i
const NON_PAGE = /^(#|mailto:|tel:|sms:|javascript:)/i
const ABSOLUTE = /^[a-z][a-z\d+.-]*:/i

/** Splits `/fr/pricing` into `{ locale: 'fr', path: '/pricing' }`. Unprefixed paths are English. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
    const [, first, ...rest] = pathname.split('/')
    if (isLocale(first)) {
        return { locale: first, path: `/${rest.join('/')}` }
    }
    return { locale: DEFAULT_LOCALE, path: pathname || '/' }
}

/** `/pricing` → `/fr/pricing`. English stays unprefixed so existing URLs keep working. */
export function localizePath(path: string, locale: Locale): string {
    const clean = stripLocale(path.startsWith('/') ? path : `/${path}`).path
    if (locale === DEFAULT_LOCALE) return clean
    return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/**
 * Turns any link value coming out of Sanity into one for the current language:
 * bare slugs (`pricing`), root paths (`/pricing`) and absolute self-links
 * (`https://tryonar.net/pricing`) get the language prefix; other sites,
 * anchors, mailto: and file paths are left untouched.
 */
export function localizeHref<T extends string | null | undefined>(href: T, locale: Locale): T | string {
    if (!href || NON_PAGE.test(href)) return href

    let path: string = href
    if (SELF_ORIGIN.test(href)) {
        path = href.replace(SELF_ORIGIN, '') || '/'
    } else if (ABSOLUTE.test(href) || href.startsWith('//')) {
        return href
    }

    const match = /^([^?#]*)(.*)$/.exec(path)
    let pathname = match?.[1] ?? ''
    const suffix = match?.[2] ?? ''

    // Static files (/brochure.pdf, /hero.webp) aren't pages.
    if (/\.[a-z\d]{2,5}$/i.test(pathname)) return href

    if (!pathname.startsWith('/')) pathname = `/${pathname}`
    if (pathname === '/home') pathname = '/'

    return `${localizePath(pathname, locale)}${suffix}`
}

// Keys whose string values are links in the GROQ projections (see lib/sanity).
const LINK_KEYS = new Set([
    'internalLink',
    'internalSlug',
    'externalLink',
    'termsLinkUrl',
    'privacyLinkUrl',
    'link',
    'url',
])

/** Returns a copy of Sanity data with every link localized. */
export function localizeLinks<T>(data: T, locale: Locale): T {
    return walk(data, locale) as T
}

function walk(value: unknown, locale: Locale): unknown {
    if (Array.isArray(value)) return value.map((item) => walk(item, locale))
    if (!value || typeof value !== 'object') return value

    const out: Record<string, unknown> = {}
    for (const [key, child] of Object.entries(value)) {
        out[key] = typeof child === 'string' && LINK_KEYS.has(key) ? localizeHref(child, locale) : walk(child, locale)
    }
    return out
}
