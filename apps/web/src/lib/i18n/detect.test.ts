import { describe, expect, it } from 'vitest'
import { countryFromHeaders, localeForCountry, parseAcceptLanguage, resolveLocale } from './detect'

describe('parseAcceptLanguage', () => {
    it('orders primary subtags by quality, keeping header order on ties', () => {
        expect(parseAcceptLanguage('nl-BE,fr;q=0.9,en-US;q=0.8,*;q=0.5')).toEqual(['nl', 'fr', 'en'])
        expect(parseAcceptLanguage('en;q=0.5, es')).toEqual(['es', 'en'])
    })

    it('ignores q=0 and empty input', () => {
        expect(parseAcceptLanguage('fr;q=0, es')).toEqual(['es'])
        expect(parseAcceptLanguage(null)).toEqual([])
        expect(parseAcceptLanguage('')).toEqual([])
    })
})

describe('localeForCountry', () => {
    it.each([
        ['FR', 'fr'],
        ['ES', 'es'],
        ['MX', 'es'],
        ['NL', 'nl'],
        ['SN', 'fr'],
        ['fr', 'fr'],
    ])('maps %s to %s', (country, locale) => {
        expect(localeForCountry(country)).toBe(locale)
    })

    it('falls back to English for countries without a supported language', () => {
        expect(localeForCountry('US')).toBe('en')
        expect(localeForCountry('DE')).toBe('en')
        expect(localeForCountry('JP')).toBe('en')
        expect(localeForCountry('')).toBe('en')
        expect(localeForCountry(undefined)).toBe('en')
    })

    it('uses the browser language to choose within multilingual countries', () => {
        expect(localeForCountry('BE', 'fr-BE,fr;q=0.9')).toBe('fr')
        expect(localeForCountry('BE', 'nl-BE')).toBe('nl')
        expect(localeForCountry('BE', 'de-DE')).toBe('nl')
        expect(localeForCountry('CA', 'fr-CA')).toBe('fr')
        expect(localeForCountry('CA', 'en-CA')).toBe('en')
        expect(localeForCountry('CH', 'de-CH')).toBe('en')
        expect(localeForCountry('CH', 'fr-CH')).toBe('fr')
    })

    it("doesn't let the browser pick a language the country doesn't offer", () => {
        expect(localeForCountry('BE', 'es-ES')).toBe('nl')
        expect(localeForCountry('US', 'fr-FR')).toBe('en')
    })
})

describe('resolveLocale', () => {
    it('gives a manual choice priority over location', () => {
        expect(resolveLocale({ cookie: 'en', country: 'FR' })).toEqual({ locale: 'en', source: 'cookie' })
        expect(resolveLocale({ cookie: 'nl', country: 'ES', acceptLanguage: 'es' })).toEqual({ locale: 'nl', source: 'cookie' })
    })

    it('ignores a cookie that is not a supported language', () => {
        expect(resolveLocale({ cookie: 'de', country: 'FR' })).toEqual({ locale: 'fr', source: 'country' })
    })

    it('uses the country when there is no manual choice', () => {
        expect(resolveLocale({ country: 'ES', acceptLanguage: 'en-US' })).toEqual({ locale: 'es', source: 'country' })
        expect(resolveLocale({ country: 'US', acceptLanguage: 'fr-FR' })).toEqual({ locale: 'en', source: 'country' })
    })

    it('falls back to the browser language only when no country is known', () => {
        expect(resolveLocale({ acceptLanguage: 'de-DE,nl;q=0.8' })).toEqual({ locale: 'nl', source: 'accept-language' })
        expect(resolveLocale({ acceptLanguage: 'de-DE' })).toEqual({ locale: 'en', source: 'default' })
        expect(resolveLocale({})).toEqual({ locale: 'en', source: 'default' })
    })
})

describe('countryFromHeaders', () => {
    const nfGeo = (value: unknown) => btoa(JSON.stringify(value))

    it('reads the Netlify x-nf-geo header', () => {
        const headers = new Headers({ 'x-nf-geo': nfGeo({ city: 'Paris', country: { code: 'FR', name: 'France' } }) })
        expect(countryFromHeaders(headers)).toBe('FR')
    })

    it('falls back to other CDN country headers', () => {
        expect(countryFromHeaders(new Headers({ 'cf-ipcountry': 'ES' }))).toBe('ES')
        expect(countryFromHeaders(new Headers({ 'x-vercel-ip-country': 'NL' }))).toBe('NL')
        expect(countryFromHeaders(new Headers({ 'x-nf-geo': 'not-base64!', 'x-country': 'BE' }))).toBe('BE')
    })

    it('treats unknown placeholders and missing headers as no country', () => {
        expect(countryFromHeaders(new Headers({ 'cf-ipcountry': 'XX' }))).toBeUndefined()
        expect(countryFromHeaders(new Headers({ 'x-nf-geo': nfGeo({ country: {} }) }))).toBeUndefined()
        expect(countryFromHeaders(new Headers())).toBeUndefined()
    })
})
