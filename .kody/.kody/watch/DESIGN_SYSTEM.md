# Design System Documentation

This document outlines the design system, UI components, and styling conventions for the A-Guy project.

## Table of Contents

- [Overview](#overview)
- [Design Principles](#design-principles)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Components](#components)
- [Dark Mode](#dark-mode)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)

## Overview

The A-Guy design system is built on:

- **Framework**: TailwindCSS with custom configuration
- **Component Library**: shadcn/ui (built on Radix UI primitives)
- **Icons**: lucide-react
- **Fonts**: Geist Sans and Geist Mono
- **Styling Approach**: CSS variables + utility classes
- **Dark Mode**: Theme-aware with automatic transitions

## Design Principles

### 1. Consistency

All components follow a consistent design language using:

- Shared color tokens
- Standardized spacing scale
- Unified border radius system
- Consistent focus states

### 2. Accessibility First

- All components are built on Radix UI primitives (ARIA-compliant)
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### 3. Performance

- CSS-in-JS avoided in favor of Tailwind utilities
- Minimal runtime overhead
- Optimized for production builds

### 4. Developer Experience

- Type-safe component props
- Composable variants using `class-variance-authority`
- Clear naming conventions
- Well-documented usage patterns

## Color System

### Color Tokens

Colors are defined using HSL CSS variables for easy theming:

#### Light Mode

```css
--background: 220 40% 97% /* Soft blue-gray background */ --foreground: 222.2 84% 4.9%
  /* Near-black text */ --primary: 220 40% 97% /* Light blue for primary actions */ --secondary: 251
  91% 95% /* Soft purple tint */ --accent: 271 91% 65% /* Vivid purple for highlights */
  --muted: 210 40% 96.1% /* Muted backgrounds */ --border: 240 6% 80% /* Subtle borders */;
```

#### Dark Mode

```css
--background: 220 40% 8% /* Deep blue-black */ --foreground: 210 40% 98% /* Off-white text */
  --primary: 220 40% 12% /* Dark blue surfaces */ --secondary: 261 73% 23% /* Deep violet surface */
  --accent: 271 91% 65% /* Vivid purple (same as light) */ --muted: 217.2 32.6% 17.5%
  /* Muted dark backgrounds */ --border: 0 0% 15% / 0.8 /* Subtle dark borders */;
```

### Semantic Colors

```css
--success: 196 52% 74% /* Light mode success (teal) */ --warning: 34 89% 85%
  /* Light mode warning (orange) */ --error: 10 100% 86% /* Light mode error (red) */
  --destructive: 0 84.2% 60.2% /* Destructive actions */;
```

### Usage in Components

```tsx
// Using Tailwind classes with CSS variables
<div className="bg-background text-foreground border border-border">
  <button className="bg-accent text-accent-foreground">Click me</button>
  <div className="bg-success">Success message</div>
</div>
```

## Typography

### Font Families

**Geist Sans** (Primary)

- Used for all body text and UI elements
- Variable: `--font-geist-sans`
- Class: `font-sans`

**Geist Mono** (Code/Monospace)

- Used for code blocks and monospaced content
- Variable: `--font-geist-mono`
- Class: `font-mono`

### Type Scale

Configured via `@tailwindcss/typography` plugin:

```tsx
// Heading sizes (responsive)
<h1 className="text-[2.5rem] md:text-[3.5rem]">Main Heading</h1>
<h2 className="text-[1.25rem] md:text-[1.5rem] font-semibold">Subheading</h2>

// Body text
<p className="text-base">Regular body text</p>
<p className="text-sm">Small text</p>
<p className="text-xs">Extra small text</p>
```

### Font Weights

```tsx
<span className="font-normal">Regular (400)</span>
<span className="font-medium">Medium (500)</span>
<span className="font-semibold">Semibold (600)</span>
```

### Rich Text Styling

Use the `prose` class from `@tailwindcss/typography` for rich content:

```tsx
<div className="prose prose-slate dark:prose-invert">{/* Your rich text content */}</div>
```

## Spacing & Layout

### Container

Responsive container with consistent padding:

```tsx
<div className="container">{/* Content centered with responsive padding */}</div>
```

Container breakpoints:

- `sm`: 40rem (640px) - padding: 1rem
- `md`: 48rem (768px) - padding: 2rem
- `lg`: 64rem (1024px) - padding: 2rem
- `xl`: 80rem (1280px) - padding: 2rem
- `2xl`: 86rem (1376px) - padding: 2rem

### Spacing Scale

Follow Tailwind's default spacing scale:

```tsx
// Margins and padding
<div className="p-4 m-2"> {/* 1rem padding, 0.5rem margin */}
<div className="space-y-4"> {/* 1rem vertical spacing between children */}
<div className="gap-6"> {/* 1.5rem gap in flex/grid */}
```

Common spacing values:

- `0.5` = 0.125rem (2px)
- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `4` = 1rem (16px)
- `6` = 1.5rem (24px)
- `8` = 2rem (32px)

### Border Radius

Configured via CSS variable `--radius`:

```tsx
<div className="rounded-sm"> {/* calc(var(--radius) - 4px) */}
<div className="rounded-md"> {/* calc(var(--radius) - 2px) */}
<div className="rounded-lg"> {/* var(--radius) = 0.2rem */}
<div className="rounded"> {/* Default Tailwind rounded */}
```

## Components

### Available UI Components

Located in `src/components/ui/`:

- **Button** (`button.tsx`)
- **Card** (`card.tsx`)
- **Checkbox** (`checkbox.tsx`)
- **Command** (`command.tsx`) - Command palette
- **Input** (`input.tsx`)
- **Label** (`label.tsx`)
- **Pagination** (`pagination.tsx`)
- **Select** (`select.tsx`)
- **Textarea** (`textarea.tsx`)
- **Toaster** (`toaster.tsx`) - Toast notifications

### Component Usage Examples

#### Button

```tsx
import { Button } from '@/components/ui/button'

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

// As child (polymorphic)
<Button asChild>
  <a href="/somewhere">Link Button</a>
</Button>
```

**Button Variants:**

- `default`: Primary background with hover effect
- `secondary`: Secondary background
- `destructive`: Red/destructive background
- `outline`: Border with transparent background
- `ghost`: Transparent with hover effect
- `link`: Text link style with underline on hover

#### Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
;<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Input & Form Fields

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
  />
</div>

<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea
    id="message"
    placeholder="Enter your message"
  />
</div>
```

#### Select

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
;<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

#### Checkbox

```tsx
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
;<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

#### Toast Notifications

```tsx
import { toast } from 'sonner'

// Success
toast.success('Successfully saved!')

// Error
toast.error('Something went wrong')

// Info
toast('This is a notification')

// With description
toast.success('Account created', {
  description: 'Your account has been created successfully',
})
```

Add the Toaster component to your root layout:

```tsx
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

#### Command Palette

```tsx
import { CommandPalette } from '@/components/CommandPalette'

// Add to your layout
;<CommandPalette />

// Trigger with Cmd+K or Ctrl+K
```

### Custom Application Components

Located in `src/components/`:

- **AdminBar** - Admin panel overlay
- **Card** - Custom card wrapper
- **CollectionArchive** - Archive listing
- **Link** - Next.js Link wrapper
- **Logo** - Application logo
- **Media** - Image/video components with optimization
- **Pagination** - Custom pagination
- **RichText** - Lexical rich text renderer

## Dark Mode

### Implementation

Dark mode uses a data attribute strategy:

```tsx
// In tailwind.config.mjs
darkMode: ['selector', '[data-theme="dark"]']
```

Theme is automatically applied based on user preference or manual selection.

### Theme Transitions

Smooth transitions are enabled for theme changes:

```css
/* In globals.css */
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
```

### Preventing Flash

```css
/* Prevent flash of unstyled content */
html {
  opacity: 0;
}

html[data-theme='dark'],
html[data-theme='light'] {
  opacity: initial;
}
```

### Dark Mode Classes

```tsx
// Use dark: prefix for dark mode styles
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">Content adapts to theme</div>
```

## Accessibility

### Focus States

All interactive elements have visible focus rings:

```tsx
// Automatic focus ring using ring-offset-background
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Accessible Button
</button>
```

### Keyboard Navigation

- All components support keyboard navigation
- Tab order is logical and intuitive
- Focus traps in modals and dialogs
- Escape to close overlays

### Screen Reader Support

- Semantic HTML elements
- ARIA labels and roles (via Radix UI)
- Hidden elements for screen readers only
- Proper heading hierarchy

### Color Contrast

All color combinations meet WCAG AA standards:

- Text on backgrounds: minimum 4.5:1 contrast ratio
- Large text: minimum 3:1 contrast ratio
- Interactive elements have clear hover/focus states

## Best Practices

### Component Composition

Use the `cn` utility for merging classes:

```tsx
import { cn } from '@/utilities/ui'

<div className={cn(
  'base-classes',
  'more-classes',
  condition && 'conditional-classes',
  className // User-provided classes override defaults
)}>
```

### Variant Pattern

Use `class-variance-authority` for variant-based components:

```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const variants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      secondary: 'secondary-classes',
    },
    size: {
      sm: 'small-classes',
      lg: 'large-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
})

type Props = VariantProps<typeof variants>
```

### Responsive Design

Use Tailwind's responsive prefixes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>

<h1 className="text-2xl md:text-4xl lg:text-5xl">
  {/* Responsive typography */}
</h1>
```

### Performance Optimization

**Avoid:**

```tsx
// ❌ Don't use arbitrary values unless necessary
<div className="p-[13px]">

// ❌ Don't duplicate styles
<div className="bg-red-500 hover:bg-red-500">
```

**Prefer:**

```tsx
// ✅ Use design system tokens
<div className="p-4">

// ✅ Use CSS variables
<div className="bg-accent hover:bg-accent/90">
```

### Adding New Components

When adding shadcn/ui components:

```bash
# Use npx to add components
npx shadcn@latest add <component-name>

# Examples
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
```

Components will be automatically added to `src/components/ui/` with proper configuration.

### Customization Guidelines

**DO:**

- ✅ Use CSS variables for colors
- ✅ Extend existing variants
- ✅ Follow existing naming patterns
- ✅ Maintain accessibility features
- ✅ Test in both light and dark modes

**DON'T:**

- ❌ Modify Radix UI primitives directly
- ❌ Remove accessibility features
- ❌ Use inline styles
- ❌ Bypass the design system tokens
- ❌ Add global CSS without team approval

## Utility Classes

### Custom Utilities

Located in `globals.css`:

```css
/* Hide scrollbar */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Prevent transitions on load */
.no-transition {
  transition: none !important;
}
```

### Smooth Scrolling

```css
html {
  scroll-behavior: smooth;
}
```

### Backdrop Blur

```css
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-lg {
    backdrop-filter: blur(16px);
  }
}
```

## Resources

- **TailwindCSS Docs**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui**: [https://ui.shadcn.com](https://ui.shadcn.com)
- **Radix UI**: [https://www.radix-ui.com](https://www.radix-ui.com)
- **lucide-react Icons**: [https://lucide.dev](https://lucide.dev)
- **Class Variance Authority**: [https://cva.style](https://cva.style)
- **Sonner (Toast)**: [https://sonner.emilkowal.ski](https://sonner.emilkowal.ski)

## Getting Help

If you need to:

- **Add a new component**: Check [shadcn/ui](https://ui.shadcn.com) first
- **Customize colors**: Modify CSS variables in `globals.css`
- **Extend Tailwind**: Update `tailwind.config.mjs`
- **Report design inconsistencies**: Create an issue with screenshots

For questions about design decisions or component usage, refer to [PROJECT-TOOLING.md](PROJECT-TOOLING.md) or consult with the team.
