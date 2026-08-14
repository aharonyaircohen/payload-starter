import { NextRequest, NextResponse } from 'next/server'
import { cookieName, defaultLocale, type Locale, locales } from './src/i18n/config'

function resolveCookieDomain(host: string): string | undefined {
  // If you're on *.vercel.app, sharing cookies across subdomains via Domain=.vercel.app
  // is typically blocked (public suffix). In that case, keep host-only cookie.
  if (host.endsWith('.vercel.app')) return undefined

  // Prefer explicit root domain if you set it (recommended)
  // e.g. ROOT_DOMAIN=example.com -> cookie domain ".example.com"
  const rootFromEnv = process.env.ROOT_DOMAIN?.trim()
  if (rootFromEnv) return `.${rootFromEnv.replace(/^\./, '')}`

  // Fallback: naive "apex" extraction (works for most .com/.net/.org cases)
  const parts = host.split(':')[0].split('.').filter(Boolean)
  if (parts.length < 2) return undefined
  const apex = parts.slice(-2).join('.')
  return `.${apex}`
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') || ''

  // Exclude paths from locale handling (double safety, even though matcher already excludes many)
  const shouldExclude =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')

  if (shouldExclude) {
    return NextResponse.next()
  }

  let locale: Locale = defaultLocale
  let shouldSetCookie = false

  // Subdomain-based locale forcing
  if (host.startsWith('he.')) {
    locale = 'he'
    shouldSetCookie = true
  } else if (host.startsWith('en.')) {
    locale = 'en'
    shouldSetCookie = true
  } else {
    // On primary domain, check cookie first
    const cookieLocale = request.cookies.get(cookieName)?.value as Locale | undefined

    if (cookieLocale && locales.includes(cookieLocale)) {
      locale = cookieLocale
    } else {
      // Fallback to Accept-Language header
      const acceptLanguage = request.headers.get('accept-language')
      if (acceptLanguage) {
        const preferredLocale = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase() as
          | Locale
          | undefined

        if (preferredLocale && locales.includes(preferredLocale)) {
          locale = preferredLocale
          shouldSetCookie = true
        }
      }
    }
  }

  const response = NextResponse.next()

  if (shouldSetCookie) {
    const cookieDomain = resolveCookieDomain(host)
    const isHttps = request.nextUrl.protocol === 'https:'
    const isProd = process.env.NODE_ENV === 'production'

    response.cookies.set(cookieName, locale, {
      maxAge: 31536000,
      path: '/',
      sameSite: 'lax',
      secure: isHttps || isProd,
      // Only set domain when it's safe/valid (custom domain).
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    })
  }

  // Set locale header for next-intl (or your own resolver)
  response.headers.set('x-locale', locale)

  return response
}

export const config = {
  matcher: [
    // exclude admin as well so middleware won't run there at all
    '/((?!api|admin|_next|_static|.*\\..*).*)',
  ],
}
