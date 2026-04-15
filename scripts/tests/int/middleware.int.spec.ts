import { describe, it, expect } from 'vitest'
import { NextRequest, NextResponse } from 'next/server'
import { middleware } from '../../middleware'

describe('Middleware - Locale Routing', () => {
  const createRequest = (host: string, pathname = '/', acceptLanguage?: string) => {
    const url = new URL(pathname, `http://${host}`)
    const headers = new Headers()
    headers.set('host', host)
    if (acceptLanguage) {
      headers.set('accept-language', acceptLanguage)
    }

    return new NextRequest(url, { headers })
  }

  describe('Subdomain-based locale forcing', () => {
    it('should set locale to "he" for he.example.com', () => {
      const request = createRequest('he.example.com', '/')
      const response = middleware(request)

      expect(response).toBeInstanceOf(NextResponse)
      expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('he')
      expect(response.headers.get('x-locale')).toBe('he')
    })

    it('should set locale to "en" for en.example.com', () => {
      const request = createRequest('en.example.com', '/')
      const response = middleware(request)

      expect(response).toBeInstanceOf(NextResponse)
      expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('en')
      expect(response.headers.get('x-locale')).toBe('en')
    })

    it('should ignore Accept-Language on forced subdomain', () => {
      const request = createRequest('he.example.com', '/', 'en-US,en;q=0.9')
      const response = middleware(request)

      expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('he')
      expect(response.headers.get('x-locale')).toBe('he')
    })
  })

  describe('Primary domain locale detection', () => {
    it('should use Accept-Language header when no cookie exists', () => {
      const request = createRequest('example.com', '/', 'he-IL,he;q=0.9,en;q=0.8')
      const response = middleware(request)

      expect(response.headers.get('x-locale')).toBe('he')
    })

    it('should default to "en" when Accept-Language is not supported', () => {
      const request = createRequest('example.com', '/', 'fr-FR,fr;q=0.9')
      const response = middleware(request)

      expect(response.headers.get('x-locale')).toBe('en')
    })

    it('should use cookie locale when available', () => {
      const url = new URL('/', 'http://example.com')
      const headers = new Headers()
      headers.set('host', 'example.com')
      headers.set('accept-language', 'en-US,en;q=0.9')
      headers.set('cookie', 'NEXT_LOCALE=he')

      const request = new NextRequest(url, { headers })
      const response = middleware(request)

      expect(response.headers.get('x-locale')).toBe('he')
    })

    it('should set cookie when using Accept-Language', () => {
      const request = createRequest('example.com', '/', 'he-IL,he;q=0.9')
      const response = middleware(request)

      expect(response.cookies.get('NEXT_LOCALE')?.value).toBe('he')
    })
  })

  describe('Path exclusions', () => {
    it('should exclude /admin paths', () => {
      const request = createRequest('he.example.com', '/admin')
      const response = middleware(request)

      expect(response.cookies.get('NEXT_LOCALE')).toBeUndefined()
      expect(response.headers.get('x-locale')).toBeNull()
    })

    it('should exclude /api paths', () => {
      const request = createRequest('he.example.com', '/api/example')
      const response = middleware(request)

      expect(response.cookies.get('NEXT_LOCALE')).toBeUndefined()
      expect(response.headers.get('x-locale')).toBeNull()
    })

    it('should exclude /_next paths', () => {
      const request = createRequest('he.example.com', '/_next/static/chunk.js')
      const response = middleware(request)

      expect(response.cookies.get('NEXT_LOCALE')).toBeUndefined()
      expect(response.headers.get('x-locale')).toBeNull()
    })

    it('should exclude static files with extensions', () => {
      const request = createRequest('he.example.com', '/favicon.ico')
      const response = middleware(request)

      expect(response.cookies.get('NEXT_LOCALE')).toBeUndefined()
      expect(response.headers.get('x-locale')).toBeNull()
    })
  })

  describe('Cookie configuration', () => {
    it('should set cookie with correct attributes', () => {
      const request = createRequest('he.example.com', '/')
      const response = middleware(request)

      const cookie = response.cookies.get('NEXT_LOCALE')
      expect(cookie).toBeDefined()
      expect(cookie?.value).toBe('he')
      // Cookie should have max-age of 1 year and path=/
    })
  })
})
