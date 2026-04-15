export const locales = ['en', 'he'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeDetection = true

export const cookieName = 'NEXT_LOCALE'
