'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Home, Settings, Search } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

/**
 * Example command palette component demonstrating:
 * - cmdk for keyboard-driven navigation
 * - Global command search
 * - Quick actions and navigation
 *
 * Usage: Trigger with Cmd+K or Ctrl+K
 */
export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleSelect = (callback: () => void) => {
    setOpen(false)
    callback()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setOpen(false)}>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <div onClick={(e) => e.stopPropagation()}>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Navigation">
                <CommandItem onSelect={() => handleSelect(() => router.push('/'))}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect(() => router.push('/admin'))}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => handleSelect(() => console.log('Search triggered'))}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Search content</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => handleSelect(() => console.log('New document triggered'))}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>New document</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  )
}
