# Styling System Guide

## Philosophy

This project uses a **semantic color system** built on CSS custom properties. Instead of using `dark:` variants everywhere, we define semantic tokens that automatically adapt to the current theme.

## Architecture Layers

The system has three layers:

### Level 1: Base Color Palette (Foundation)

Hardcoded HSL values that define your brand:

```css
--primary: 217 91% 60%; /* Brand blue */
--warning: 38 92% 50%; /* Amber */
--success: 142 71% 45%; /* Green */
```

### Level 2: Surface Colors (Structure)

Hardcoded HSL values that define layout hierarchy:

```css
--background: 0 0% 100%; /* Page background */
--card: 220 14% 94%; /* Card surfaces */
--muted: 220 14% 95%; /* Disabled/subtle */
```

### Level 3: Semantic Tokens (Components)

**NEVER hardcoded** - always reference Level 1 or 2:

```css
/* ✅ Good - references existing tokens */
--header-bg: var(--secondary);
--selected-bg: var(--muted);
--form-placeholder: var(--muted-foreground);

/* ❌ Bad - hardcoded values */
--selected-bg: 220 14% 90%;
--form-placeholder: 220 8.9% 46.1%;
```

**Why?** When you update a base token, all semantic references automatically update across both themes!

## ✅ Good Practices

### Use Semantic Tokens

```tsx
// ✅ GOOD - Uses semantic tokens
<div className="bg-card text-card-foreground">
<div className="bg-header text-header-foreground">
<button className="hover:bg-hover">
<input className="bg-form border-form-border placeholder:text-form-placeholder">
```

### Avoid Dark Variants

```tsx
// ❌ BAD - Uses dark: variants
<div className="bg-white dark:bg-slate-950">
<div className="text-slate-900 dark:text-slate-50">

// ✅ GOOD - Uses semantic tokens
<div className="bg-background text-foreground">
<div className="bg-elevated text-elevated-foreground">
```

### Avoid Hardcoded Colors

```tsx
// ❌ BAD - Hardcoded Tailwind colors
<div className="bg-slate-100 border-slate-200">
<div className="bg-amber-50 border-amber-200">

// ✅ GOOD - Semantic tokens
<div className="bg-card border-border">
<div className="bg-warning-surface border-warning-surface-border">
```

## Available Semantic Tokens

### Layout & Structure

| Token                  | Usage           | Light     | Dark          |
| ---------------------- | --------------- | --------- | ------------- |
| `bg-background`        | Page background | White     | Deep navy     |
| `text-foreground`      | Primary text    | Dark gray | Light gray    |
| `bg-card`              | Card surfaces   | 94% gray  | Elevated navy |
| `text-card-foreground` | Text on cards   | Dark gray | Light gray    |

### Header & Navigation

| Token                    | Usage             | Light    | Dark           |
| ------------------------ | ----------------- | -------- | -------------- |
| `bg-header`              | Header background | 97% gray | Dark blue card |
| `text-header-foreground` | Header text       | Dark     | White          |
| `bg-footer`              | Footer background | 94% gray | Dark blue card |

### Interactive States

| Token                      | Usage         | Light      | Dark          |
| -------------------------- | ------------- | ---------- | ------------- |
| `hover:bg-hover`           | Hover state   | Muted gray | Muted navy    |
| `bg-selected`              | Selected item | 90% gray   | 20% lightness |
| `text-selected-foreground` | Selected text | Foreground | Foreground    |

### Form Elements

| Token                               | Usage            | Light        | Dark         |
| ----------------------------------- | ---------------- | ------------ | ------------ |
| `bg-form`                           | Input background | White        | Deep navy    |
| `border-form-border`                | Input border     | Border token | Border token |
| `placeholder:text-form-placeholder` | Placeholder text | Muted        | Muted        |

### Elevated Surfaces (Modals, Command Palette)

| Token                      | Usage             | Light | Dark      |
| -------------------------- | ----------------- | ----- | --------- |
| `bg-elevated`              | Modal/dropdown bg | White | Card navy |
| `text-elevated-foreground` | Modal text        | Dark  | Light     |

### Status Colors

Use Tailwind opacity modifiers with base colors:

| Pattern             | Usage              | Example          |
| ------------------- | ------------------ | ---------------- |
| `bg-primary/10`     | Info background    | Light blue tint  |
| `border-primary/30` | Info border        | Blue border      |
| `text-primary`      | Info text          | Vibrant blue     |
| `bg-warning/10`     | Warning background | Light amber tint |
| `border-warning/30` | Warning border     | Amber border     |
| `text-warning`      | Warning text       | Amber            |
| `bg-success/10`     | Success background | Light green tint |
| `text-success`      | Success text       | Green            |
| `bg-destructive`    | Destructive action | Red              |
| `text-destructive`  | Destructive text   | Red              |

### Borders & Accents

| Token                   | Usage                      |
| ----------------------- | -------------------------- |
| `border-border`         | Standard borders           |
| `ring-ring`             | Focus rings                |
| `bg-muted`              | Disabled/muted backgrounds |
| `text-muted-foreground` | Disabled/muted text        |

## Component Patterns

### Cards

```tsx
<Card className="bg-card text-card-foreground border-border">
  <CardHeader>
    <CardTitle className="text-foreground">Title</CardTitle>
    <CardDescription className="text-muted-foreground">Description</CardDescription>
  </CardHeader>
</Card>
```

### Forms

```tsx
<input
  className="bg-form border-form-border text-foreground placeholder:text-form-placeholder"
  placeholder="Enter text..."
/>
```

### Command Palette / Modals

```tsx
<div className="bg-elevated text-elevated-foreground border-border">
  <div className="hover:bg-hover">Item</div>
  <div className="bg-selected text-selected-foreground">Selected</div>
</div>
```

### Empty States / Info Boxes

```tsx
// Info variant
<Card className="bg-primary/10 border-primary/30">
  <p className="text-primary">Information message</p>
</Card>

// Warning variant
<Card className="bg-warning/10 border-warning/30">
  <p className="text-warning">Warning message</p>
</Card>

// Success variant
<Card className="bg-success/10 border-success/30">
  <p className="text-success">Success message</p>
</Card>
```

### Buttons

```tsx
// Primary action
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Submit
</Button>

// Secondary action
<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
  Cancel
</Button>

// Destructive action
<Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Delete
</Button>
```

## Migration Guide

### Replacing Hardcoded Colors

#### Command Component

```tsx
// ❌ Before
className = 'bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50'

// ✅ After
className = 'bg-elevated text-elevated-foreground'
```

```tsx
// ❌ Before
className = 'data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-800'

// ✅ After
className = 'data-[selected=true]:bg-selected data-[selected=true]:text-selected-foreground'
```

#### Empty State

```tsx
// ❌ Before
<Card className="border-amber-200 bg-amber-50">

// ✅ After
<Card className="bg-warning/10 border-warning/30">
  <p className="text-warning">No items found</p>
</Card>
```

## Adding New Semantic Tokens

If you need a new component-specific token:

1. **Add to `globals.css`** for both themes:

```css
/* Light theme */
[data-theme='light'] {
  --my-component-bg: var(--card);
  --my-component-fg: var(--card-foreground);
}

/* Dark theme */
[data-theme='dark'] {
  --my-component-bg: var(--secondary);
  --my-component-fg: var(--secondary-foreground);
}
```

2. **Add to `tailwind.config.mjs`**:

```js
colors: {
  'my-component': {
    DEFAULT: 'hsl(var(--my-component-bg))',
    foreground: 'hsl(var(--my-component-fg))',
  }
}
```

3. **Use in components**:

```tsx
<div className="bg-my-component text-my-component-foreground">
```

## Benefits

✅ **No dark: variants** - Themes switch automatically
✅ **Single source of truth** - Change colors in one place
✅ **Type-safe** - Tailwind autocomplete works
✅ **Maintainable** - Easy to understand and modify
✅ **Consistent** - Same patterns across all components
✅ **Scalable** - Easy to add new themes or components
