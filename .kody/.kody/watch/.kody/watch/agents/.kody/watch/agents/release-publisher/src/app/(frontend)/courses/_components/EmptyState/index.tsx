'use client'

import { useTranslations } from '@/providers/I18n'
import { Card, CardContent } from '@/components/ui/card'

type EmptyStateType = 'noCourses' | 'noChapters' | 'noLessons' | 'noPDF'

interface EmptyStateProps {
  type: EmptyStateType
}

export function EmptyState({ type }: EmptyStateProps) {
  const t = useTranslations('courses')
  const message = t(type)

  if (type === 'noPDF') {
    return (
      <Card className="bg-warning/10 border-warning/30">
        <CardContent className="p-6 text-center">
          <p className="text-warning">{message}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="text-muted-foreground">
      <p>{message}</p>
    </div>
  )
}
