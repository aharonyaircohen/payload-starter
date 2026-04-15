'use client'

import { useLocale, useTranslations } from '@/providers/I18n'
import { useRouter } from 'next/navigation'
import { cookieName, type Locale, locales } from '@/i18n/config'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function LanguageSwitcher() {
  const t = useTranslations('common.languageSwitcher')
  const locale = useLocale()
  const router = useRouter()

  const handleLocaleChange = (newLocale: string) => {
    if (!locales.includes(newLocale as Locale)) return

    // Set the locale cookie
    document.cookie = `${cookieName}=${newLocale}; path=/; max-age=31536000; samesite=lax`

    // Refresh the page to apply the new locale
    router.refresh()
  }

  // Check if we're on a forced locale subdomain
  const isOnForcedDomain =
    typeof window !== 'undefined' &&
    (window.location.host.startsWith('he.') || window.location.host.startsWith('en.'))

  const localeLabels: Record<Locale, string> = {
    en: t('english'),
    he: t('hebrew'),
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={locale} onValueChange={handleLocaleChange} disabled={isOnForcedDomain}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={t('label')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {locales.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {localeLabels[loc]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
