'use client'

import { Breadcrumb } from '../Breadcrumb'
import { useTranslations } from '@/providers/I18n'

interface ChapterPageBreadcrumbProps {
  courseTitle: string
  courseSlug: string
  chapterTitle: string
}

export function ChapterPageBreadcrumb({
  courseTitle,
  courseSlug,
  chapterTitle,
}: ChapterPageBreadcrumbProps) {
  const t = useTranslations('courses')

  const breadcrumbItems = [
    { label: t('title'), href: '/courses' },
    { label: courseTitle, href: `/courses/${courseSlug}` },
    { label: chapterTitle },
  ]

  return <Breadcrumb items={breadcrumbItems} />
}
