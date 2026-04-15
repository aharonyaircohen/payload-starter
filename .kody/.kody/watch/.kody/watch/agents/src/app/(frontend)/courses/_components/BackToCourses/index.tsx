'use client'

import Link from 'next/link'
import { useTranslations } from '@/providers/I18n'
import { Button } from '@/components/ui/button'

export function BackToCourses() {
  const t = useTranslations('courses')
  return (
    <nav className="mb-6">
      <Button variant="link" asChild className="pl-0">
        <Link href="/courses">← {t('backToCourses')}</Link>
      </Button>
    </nav>
  )
}
