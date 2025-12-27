'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export function LocalizedHero() {
  const t = useTranslations('home')

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8">{t('description')}</p>
      <div className="flex gap-4 justify-center">
        <Button size="lg">{t('cta.getStarted')}</Button>
        <Button size="lg" variant="outline">
          {t('cta.learnMore')}
        </Button>
      </div>
    </div>
  )
}
