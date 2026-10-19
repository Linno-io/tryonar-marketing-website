import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from '@/lib/i18n/config'
import { countryFromHeaders, resolveLocale } from '@/lib/i18n/detect'
import { localizePath } from '@/lib/i18n/links'

// Crawlers always get the URL they asked for, so English stays indexed at `/`
// and each language is discovered through hreflang links instead of redirects.
const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse/i

export function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl
    const firstSegment = pathname.split('/')[1]

    // English is served unprefixed; /en/... is only an internal route.
    if (firstSegment === DEFAULT_LOCALE) {
        const target = request.nextUrl.clone()
        target.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/'
        return NextResponse.redirect(target, 308)
    }

    // A language in the URL is explicit (a shared link or the selector) — serve it as is.
    if (isLocale(firstSegment)) {
        return NextResponse.next()
    }

    const isBot = BOT_UA.test(request.headers.get('user-agent') ?? '')
    const { locale, source } = isBot
        ? { locale: DEFAULT_LOCALE, source: 'default' as const }
        : resolveLocale({
              cookie: request.cookies.get(LOCALE_COOKIE)?.value,
              country: countryFromHeaders(request.headers),
              acceptLanguage: request.headers.get('accept-language'),
          })

    let response: NextResponse
    if (locale === DEFAULT_LOCALE) {
        const target = request.nextUrl.clone()
        target.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
        response = NextResponse.rewrite(target)
    } else {
        response = NextResponse.redirect(new URL(`${localizePath(pathname, locale)}${search}`, request.url), 307)
        // The redirect depends on who is asking, so it must never be cached.
        response.headers.set('Cache-Control', 'private, no-store')
    }

    // Lets us confirm on staging which signal picked the language (cookie/country/accept-language/default).
    response.headers.set('x-tryonar-locale', `${locale}; source=${source}`)
    return response
}

export const config = {
    // Everything except API routes, Next internals, the standalone /lincoln card and static files.
    matcher: ['/((?!api|_next|lincoln|.*\\..*).*)'],
}
