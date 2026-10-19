import { describe, expect, it } from 'vitest'
import { localizeHref, localizeLinks, localizePath, stripLocale } from './links'

describe('stripLocale', () => {
    it('separates the language prefix from the path', () => {
        expect(stripLocale('/fr/pricing')).toEqual({ locale: 'fr', path: '/pricing' })
        expect(stripLocale('/nl')).toEqual({ locale: 'nl', path: '/' })
        expect(stripLocale('/en/pricing')).toEqual({ locale: 'en', path: '/pricing' })
    })

    it('treats unprefixed paths as English', () => {
        expect(stripLocale('/pricing')).toEqual({ locale: 'en', path: '/pricing' })
        expect(stripLocale('/')).toEqual({ locale: 'en', path: '/' })
        expect(stripLocale('/france-stories')).toEqual({ locale: 'en', path: '/france-stories' })
    })
})

describe('localizePath', () => {
    it('prefixes non-English languages and keeps English unprefixed', () => {
        expect(localizePath('/pricing', 'fr')).toBe('/fr/pricing')
        expect(localizePath('/', 'es')).toBe('/es')
        expect(localizePath('/pricing', 'en')).toBe('/pricing')
        expect(localizePath('/', 'en')).toBe('/')
    })

    it('replaces an existing prefix instead of stacking them', () => {
        expect(localizePath('/fr/pricing', 'nl')).toBe('/nl/pricing')
        expect(localizePath('/fr/pricing', 'en')).toBe('/pricing')
    })
})

describe('localizeHref', () => {
    it('localizes bare Sanity slugs and root-relative paths', () => {
        expect(localizeHref('contact-us', 'fr')).toBe('/fr/contact-us')
        expect(localizeHref('/contact-us', 'es')).toBe('/es/contact-us')
        expect(localizeHref('contact-us', 'en')).toBe('/contact-us')
        expect(localizeHref('home', 'nl')).toBe('/nl')
    })

    it('localizes absolute links to this site and keeps query and hash', () => {
        expect(localizeHref('https://tryonar.net/pricing', 'fr')).toBe('/fr/pricing')
        expect(localizeHref('https://www.tryonar.net/pricing?plan=pro#faq', 'nl')).toBe('/nl/pricing?plan=pro#faq')
        expect(localizeHref('https://tryonar.net', 'es')).toBe('/es')
        expect(localizeHref('https://tryonar.net/pricing', 'en')).toBe('/pricing')
    })

    it('leaves other sites, subdomains, anchors and files untouched', () => {
        expect(localizeHref('https://app.tryonar.net/sign-in', 'fr')).toBe('https://app.tryonar.net/sign-in')
        expect(localizeHref('https://try.tryonar.net/?type=blush', 'fr')).toBe('https://try.tryonar.net/?type=blush')
        expect(localizeHref('https://tryonar.network/x', 'fr')).toBe('https://tryonar.network/x')
        expect(localizeHref('#pricing', 'fr')).toBe('#pricing')
        expect(localizeHref('mailto:support@tryonar.net', 'fr')).toBe('mailto:support@tryonar.net')
        expect(localizeHref('/lincoln-business-card.pdf', 'fr')).toBe('/lincoln-business-card.pdf')
        expect(localizeHref('https://cdn.sanity.io/images/x.png', 'fr')).toBe('https://cdn.sanity.io/images/x.png')
    })

    it('passes empty values through', () => {
        expect(localizeHref(undefined, 'fr')).toBeUndefined()
        expect(localizeHref(null, 'fr')).toBeNull()
        expect(localizeHref('', 'fr')).toBe('')
    })
})

describe('localizeLinks', () => {
    it('rewrites link fields anywhere in Sanity data and leaves everything else alone', () => {
        const page = {
            title: 'pricing',
            sections: [
                {
                    primaryButton: { text: 'Talk to us', internalLink: 'contact-us', externalLink: null },
                    secondaryButton: { externalLink: 'https://app.tryonar.net/sign-in' },
                    sectionImage: { url: 'https://cdn.sanity.io/images/hero.webp', alt: 'hero' },
                    privacyLinkUrl: 'https://tryonar.net/privacy-policy',
                    resources: [{ link: 'how-it-works', title: 'how-it-works' }],
                },
            ],
            seo: { canonicalUrl: 'https://tryonar.net' },
        }

        expect(localizeLinks(page, 'fr')).toEqual({
            title: 'pricing',
            sections: [
                {
                    primaryButton: { text: 'Talk to us', internalLink: '/fr/contact-us', externalLink: null },
                    secondaryButton: { externalLink: 'https://app.tryonar.net/sign-in' },
                    sectionImage: { url: 'https://cdn.sanity.io/images/hero.webp', alt: 'hero' },
                    privacyLinkUrl: '/fr/privacy-policy',
                    resources: [{ link: '/fr/how-it-works', title: 'how-it-works' }],
                },
            ],
            seo: { canonicalUrl: 'https://tryonar.net' },
        })
    })
})
