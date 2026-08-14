'use client'

import React, { useEffect } from 'react'
import { X, Menu } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import type { Header as HeaderType } from '@/payload-types'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslations } from '@/providers/I18n'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  data: HeaderType
  userName?: string
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, data, userName }) => {
  const t = useTranslations('courses')
  const navItems = data?.navItems || []

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Group navigation items by type (you can customize this logic)
  const primaryLinks = navItems.slice(0, Math.ceil(navItems.length / 2))
  const secondaryLinks = navItems.slice(Math.ceil(navItems.length / 2))

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <nav className="flex flex-col h-[calc(100%-73px)] overflow-y-auto">
          {/* User Greeting */}
          {userName && (
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="text-base font-semibold mt-1">{userName}</p>
            </div>
          )}

          {/* Primary Navigation */}
          {primaryLinks.length > 0 && (
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <div className="flex flex-col gap-2">
                {primaryLinks.map(({ link }, i) => (
                  <div key={i} onClick={onClose}>
                    <CMSLink
                      {...link}
                      appearance="link"
                      className="block py-2 px-3 rounded-lg hover:bg-muted transition-colors text-base"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Navigation */}
          {secondaryLinks.length > 0 && (
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Resources
              </h3>
              <div className="flex flex-col gap-2">
                {secondaryLinks.map(({ link }, i) => (
                  <div key={i} onClick={onClose}>
                    <CMSLink
                      {...link}
                      appearance="link"
                      className="block py-2 px-3 rounded-lg hover:bg-muted transition-colors text-base"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses */}
          <div className="px-6 py-4 border-b border-border">
            <Link
              href="/courses"
              onClick={onClose}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted transition-colors text-base font-medium"
            >
              {t('title')}
            </Link>
          </div>

          {/* Search */}
          <div className="px-6 py-4 border-b border-border">
            <Link
              href="/search"
              onClick={onClose}
              className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted transition-colors"
            >
              <SearchIcon className="w-5 h-5 text-primary" />
              <span className="text-base">Search</span>
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="px-6 py-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Language
            </h3>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </>
  )
}

export const MobileMenuButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden text-foreground"
      aria-label="Open menu"
    >
      <Menu className="w-6 h-6 text-foreground" />
    </button>
  )
}
