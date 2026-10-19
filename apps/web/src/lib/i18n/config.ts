export const LOCALES = ['en', 'fr', 'es', 'nl'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

// Set only by the language selector, so its presence means "the visitor chose this".
export const LOCALE_COOKIE = 'NEXT_LOCALE'
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export const LOCALE_NAMES: Record<Locale, string> = {
    en: 'English',
    fr: 'Français',
    es: 'Español',
    nl: 'Nederlands',
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tryonar.net').replace(/\/$/, '')

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

/** Remembers a manual language choice; the proxy gives it priority over location. */
export function persistLocaleChoice(locale: Locale): void {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`
}
