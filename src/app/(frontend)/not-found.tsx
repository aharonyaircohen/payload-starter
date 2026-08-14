'use client'

import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { useTranslations } from '@/providers/I18n'

export default function NotFound() {
  const t = useTranslations('common.notFound')

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>{t('title')}</h1>
        <p className="mb-4">{t('message')}</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">{t('goHome')}</Link>
      </Button>
    </div>
  )
}
