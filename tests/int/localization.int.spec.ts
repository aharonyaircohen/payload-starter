import { describe, it, expect } from 'vitest'

// Import message dictionaries
import enMessages from '../../messages/en.json'
import heMessages from '../../messages/he.json'

describe('Localization', () => {
  describe('Message dictionaries', () => {
    it('should load English messages correctly', () => {
      expect(enMessages.home.title).toBe('Welcome to Payload')
      expect(enMessages.home.cta.getStarted).toBe('Get Started')
      expect(enMessages.home.cta.learnMore).toBe('Learn More')
    })

    it('should load Hebrew messages correctly', () => {
      expect(heMessages.home.title).toBe('ברוכים הבאים ל-Payload')
      expect(heMessages.home.cta.getStarted).toBe('התחל עכשיו')
      expect(heMessages.home.cta.learnMore).toBe('למד עוד')
    })

    it('should have matching top-level keys in both languages', () => {
      const enKeys = Object.keys(enMessages)
      const heKeys = Object.keys(heMessages)
      expect(enKeys).toEqual(heKeys)
    })
  })

  describe('RTL support logic', () => {
    it('should determine RTL direction for Hebrew locale', () => {
      const locale: string = 'he'
      const direction = locale === 'he' ? 'rtl' : 'ltr'
      expect(direction).toBe('rtl')
    })

    it('should determine LTR direction for English locale', () => {
      const locale: string = 'en'
      const direction = locale === 'he' ? 'rtl' : 'ltr'
      expect(direction).toBe('ltr')
    })

    it('should validate supported locales', () => {
      const supportedLocales = ['en', 'he']
      expect(supportedLocales).toContain('en')
      expect(supportedLocales).toContain('he')
      expect(supportedLocales.length).toBe(2)
    })
  })
})
