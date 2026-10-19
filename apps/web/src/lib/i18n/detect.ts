import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './config'

// ISO 3166-1 alpha-2 → language, for countries where one supported language is
// the clear default. Includes overseas territories that carry their own codes.
const COUNTRY_LOCALE: Record<string, Locale> = {
    // French
    FR: 'fr', MC: 'fr', LU: 'fr', RE: 'fr', GP: 'fr', MQ: 'fr', GF: 'fr', YT: 'fr', PF: 'fr',
    NC: 'fr', PM: 'fr', BL: 'fr', MF: 'fr', WF: 'fr', SN: 'fr', CI: 'fr', CM: 'fr', ML: 'fr',
    BF: 'fr', NE: 'fr', TG: 'fr', BJ: 'fr', GA: 'fr', CG: 'fr', CD: 'fr', MG: 'fr', GN: 'fr',
    TD: 'fr', CF: 'fr', DJ: 'fr', KM: 'fr', HT: 'fr',
    // Spanish
    ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es', VE: 'es', EC: 'es', GT: 'es',
    CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es', SV: 'es', NI: 'es', CR: 'es', PA: 'es',
    UY: 'es', PR: 'es', GQ: 'es',
    // Dutch
    NL: 'nl', SR: 'nl', AW: 'nl', CW: 'nl', SX: 'nl', BQ: 'nl',
}

// Countries with more than one official language. The browser language picks
// between the candidates; the first entry is used when it names neither.
const MULTILINGUAL_COUNTRIES: Record<string, readonly Locale[]> = {
    BE: ['nl', 'fr'],
    CH: ['en', 'fr'], // German/Italian majority are unsupported, so English unless the browser asks for French
    CA: ['en', 'fr'],
}

/** Ordered list of primary language subtags from an Accept-Language header, highest q first. */
export function parseAcceptLanguage(header: string | null | undefined): string[] {
    if (!header) return []
    return header
        .split(',')
        .map((part, index) => {
            const [tag, ...params] = part.trim().split(';')
            const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
            const quality = q ? Number.parseFloat(q.slice(2)) : 1
            return { lang: tag.trim().toLowerCase().split('-')[0], quality: Number.isNaN(quality) ? 0 : quality, index }
        })
        .filter((entry) => entry.lang && entry.lang !== '*' && entry.quality > 0)
        .sort((a, b) => b.quality - a.quality || a.index - b.index)
        .map((entry) => entry.lang)
}

function firstSupported(languages: string[], allowed: readonly Locale[]): Locale | undefined {
    return languages.find((lang): lang is Locale => isLocale(lang) && allowed.includes(lang))
}

export function localeForCountry(country: string | null | undefined, acceptLanguage?: string | null): Locale {
    const code = country?.trim().toUpperCase()
    if (!code) return DEFAULT_LOCALE

    const candidates = MULTILINGUAL_COUNTRIES[code]
    if (candidates) {
        return firstSupported(parseAcceptLanguage(acceptLanguage), candidates) ?? candidates[0]
    }

    return COUNTRY_LOCALE[code] ?? DEFAULT_LOCALE
}

export type LocaleSource = 'cookie' | 'country' | 'accept-language' | 'default'

export interface LocaleSignals {
    cookie?: string | null
    country?: string | null
    acceptLanguage?: string | null
}

/**
 * Picks the language for a request that has no language in its URL.
 * Priority: manual choice (cookie) → visitor's country → browser language
 * (only when the host gave us no country, e.g. local dev) → English.
 */
export function resolveLocale({ cookie, country, acceptLanguage }: LocaleSignals): { locale: Locale; source: LocaleSource } {
    if (isLocale(cookie)) return { locale: cookie, source: 'cookie' }

    if (country?.trim()) return { locale: localeForCountry(country, acceptLanguage), source: 'country' }

    const fromBrowser = firstSupported(parseAcceptLanguage(acceptLanguage), LOCALES)
    if (fromBrowser) return { locale: fromBrowser, source: 'accept-language' }

    return { locale: DEFAULT_LOCALE, source: 'default' }
}

/**
 * Country code from whichever geo header the host provides. Netlify sends
 * `x-nf-geo` (base64 JSON); the others cover Cloudflare/Vercel if the site
 * is ever fronted by them.
 */
export function countryFromHeaders(headers: Headers): string | undefined {
    const nfGeo = headers.get('x-nf-geo')
    if (nfGeo) {
        try {
            const parsed: unknown = JSON.parse(atob(nfGeo))
            if (parsed && typeof parsed === 'object' && 'country' in parsed) {
                const country = (parsed as { country?: { code?: unknown } }).country
                if (typeof country?.code === 'string' && country.code) return country.code
            }
        } catch {
            // Malformed header — fall through to the other sources.
        }
    }

    for (const name of ['x-country', 'cf-ipcountry', 'x-vercel-ip-country']) {
        const value = headers.get(name)?.trim()
        // Cloudflare uses XX for unknown and T1 for Tor.
        if (value && /^[A-Za-z]{2}$/.test(value) && !['XX', 'T1'].includes(value.toUpperCase())) return value
    }

    return undefined
}
