'use client'

import React, { createContext, useContext } from 'react'

type Messages = Record<string, any>

interface I18nContextType {
  locale: string
  messages: Messages
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: string
  messages: Messages
  children: React.ReactNode
}) {
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages

    for (const k of keys) {
      value = value?.[k]
    }

    return typeof value === 'string' ? value : key
  }

  return <I18nContext.Provider value={{ locale, messages, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}

export function useTranslations(namespace?: string) {
  const { t } = useI18n()
  return (key: string) => t(namespace ? `${namespace}.${key}` : key)
}

export function useLocale() {
  const { locale } = useI18n()
  return locale
}
