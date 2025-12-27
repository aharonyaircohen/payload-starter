import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'he'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Optionally configure locale prefix behavior
  localePrefix: 'always', // Always show locale in URL (e.g., /en, /he)
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
