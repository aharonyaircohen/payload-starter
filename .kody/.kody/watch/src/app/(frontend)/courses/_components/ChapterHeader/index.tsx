'use client'

import { useTranslations } from '@/providers/I18n'

interface ChapterHeaderProps {
  chapterLabel?: string | null
  title: string
  description?: string | null
}

export function ChapterHeader({ chapterLabel, title, description }: ChapterHeaderProps) {
  const t = useTranslations('courses')

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {chapterLabel && (
          <span className="text-sm font-semibold text-muted-foreground">
            {t('chapter')} {chapterLabel}
          </span>
        )}
      </div>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {description && <p className="text-xl text-muted-foreground">{description}</p>}
    </div>
  )
}
