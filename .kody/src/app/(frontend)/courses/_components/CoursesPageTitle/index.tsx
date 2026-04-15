'use client'

import { useTranslations } from '@/providers/I18n'

export function CoursesPageTitle() {
  const t = useTranslations('courses')
  return (
    <div className="mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('featuredTitle')}</h2>
      <p className="text-muted-foreground">{t('featuredDescription')}</p>
    </div>
  )
}
