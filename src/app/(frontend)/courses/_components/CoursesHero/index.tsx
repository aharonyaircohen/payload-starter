'use client'

import { useTranslations } from '@/providers/I18n'

export function CoursesHero() {
  const t = useTranslations('courses')

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />

      <div className="container relative">
        <div className="py-16 md:py-24 lg:py-32 max-w-4xl">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                {t('heroTitle') || 'Explore Our Courses'}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {t('heroDescription') ||
                'Master new skills with our comprehensive courses. Interactive learning experiences designed to help you achieve your goals.'}
            </p>

            {/* Optional CTA or stats */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/50">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  {t('liveContent') || 'New content added regularly'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
