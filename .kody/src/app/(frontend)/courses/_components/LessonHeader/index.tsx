'use client'

import { useTranslations } from '@/providers/I18n'
import { Badge } from '@/components/ui/badge'

interface LessonHeaderProps {
  order: number
  title: string
  description?: string | null
  contentType: 'none' | 'pdf'
}

export function LessonHeader({ order, title, description, contentType }: LessonHeaderProps) {
  const t = useTranslations('courses')

  return (
    <header className="mb-8">
      <div className="mb-2 flex items-center gap-3">
        <span className="text-sm font-semibold text-muted-foreground">
          {t('lesson')} {order}
        </span>
        {contentType === 'pdf' && <Badge variant="secondary">{t('pdfBadge')}</Badge>}
      </div>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {description && <p className="text-xl text-muted-foreground">{description}</p>}
    </header>
  )
}
