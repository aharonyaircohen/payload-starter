'use client'

import { useTranslations } from '@/providers/I18n'

export function ChaptersSectionTitle() {
  const t = useTranslations('courses')
  return <h2 className="text-2xl font-bold mb-4">{t('chaptersSection')}</h2>
}
