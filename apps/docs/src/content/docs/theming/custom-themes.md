---
title: Custom Themes
description: Create and switch between custom themes with createTheme().
sidebar:
  order: 2
---

Typewriting Class provides a complete theming system that lets you define custom design tokens as CSS custom properties with full type safety. Themes are created at build time, injected at runtime, and switched instantly via a `data-theme` attribute on the document root.

## Overview

The theming workflow has three steps:

1. **Define** a theme with `createTheme()` -- produces CSS custom properties and a typed `vars` accessor.
2. **Inject** the theme's CSS into the page with `injectTheme()`.
3. **Switch** between named themes at runtime with `setTheme()`.

```ts
import { createTheme, injectTheme, setTheme } from 'typewritingclass/theme'

// 1. Define
const light = createTheme({
  name: 'light',
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb' },
    surface: { 50: '#ffffff', 100: '#f3f4f6' },
  },
})

// 2. Inject
injectTheme(light.cssText)

// 3. Switch (if you have multiple themes)
setTheme('light')
```

## createTheme()

`createTheme()` accepts a `ThemeConfig` object and returns a `ThemeResult` containing the generated CSS and a type-safe variable accessor.

### ThemeConfig interface

```ts
interface ThemeConfig {
  name?: string
  colors?: Record<string, Record<string | number, string>>
  spacing?: Record<string | number, string>
  typography?: {
    textSizes?: Record<string, { fontSize: string; lineHeight: string }>
    fontWeights?: Record<string, string>
  }
  borders?: Record<string, string>
  shadows?: Record<string, string>
}
```

### ThemeResult interface

```ts
interface ThemeResult {
  name: string
  cssText: string
  vars: ThemeVars
}
```

### The name field

The `name` field controls the CSS selector that scopes the custom properties:

- **`'default'`** (or omitted) -- properties are placed on `:root`, making them globally available without any theme activation.
- **Any other string** -- properties are placed on `[data-theme="<name>"]`, requiring `setTheme()` to activate.

```ts
// Default theme: targets :root, always active
const base = createTheme({
  colors: { primary: { 500: '#3b82f6' } },
})
// CSS: :root { --twc-color-primary-500: #3b82f6; }

// Named theme: targets [data-theme="brand"]
const brand = createTheme({
  name: 'brand',
  colors: { primary: { 500: '#8b5cf6' } },
})
// CSS: [data-theme="brand"] { --twc-color-primary-500: #8b5cf6; }
```

### CSS custom property naming convention

All generated custom properties follow the pattern `--twc-<category>-<name>-<key>`:

| Token category | Property pattern | Example |
|---|---|---|
| Colors | `--twc-color-<name>-<shade>` | `--twc-color-primary-500` |
| Spacing | `--twc-spacing-<key>` | `--twc-spacing-4` |
| Text sizes | `--twc-text-<name>-fs`, `--twc-text-<name>-lh` | `--twc-text-lg-fs` |
| Font weights | `--twc-font-<name>` | `--twc-font-bold` |
| Borders | `--twc-border-<name>` | `--twc-border-lg` |
| Shadows | `--twc-shadow-<name>` | `--twc-shadow-md` |

## The vars accessor

The `vars` object returned by `createTheme()` mirrors the structure of your config, but every leaf value is a `var(--twc-...)` CSS reference instead of a raw value. This lets you use theme tokens directly in utility functions, and the actual value will be resolved from CSS custom properties at runtime.

```ts
const { vars } = createTheme({
  name: 'light',
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb' },
    gray: { 100: '#f3f4f6', 900: '#111827' },
  },
  spacing: { 4: '1rem', 8: '2rem' },
  shadows: { md: '0 4px 6px rgba(0,0,0,0.1)' },
})

// Access var() references
vars.colors.primary[500]   // 'var(--twc-color-primary-500)'
vars.colors.gray[900]      // 'var(--twc-color-gray-900)'
vars.spacing[4]            // 'var(--twc-spacing-4)'
vars.shadows.md            // 'var(--twc-shadow-md)'
```

### Using vars with utilities

Because `vars` values are strings containing `var()` references, they can be passed directly to any utility function:

```ts
import { cx, bg, color, p, shadow, when, hover } from 'typewritingclass'

const card = cx(
  bg(vars.colors.primary[500]),
  color(vars.colors.gray[900]),
  p(vars.spacing[4]),
  shadow(vars.shadows.md),
  when(hover)(bg(vars.colors.primary[600])),
)

// Generated CSS uses custom properties:
// .abc { background-color: var(--twc-color-primary-500); }
// .def { color: var(--twc-color-gray-900); }
// .ghi { padding: var(--twc-spacing-4); }
// ...
```

When you switch themes, the custom property values change and the styles update instantly -- no re-render needed.

## injectTheme()

`injectTheme(cssText)` creates a `<style id="twc-theme">` element in the document `<head>` and appends the CSS text to it. Multiple calls append to the same `<style>` element, so you can inject several themes:

```ts
import { createTheme, injectTheme } from 'typewritingclass/theme'

const light = createTheme({
  name: 'light',
  colors: { primary: { 500: '#3b82f6' } },
})

const dark = createTheme({
  name: 'dark',
  colors: { primary: { 500: '#60a5fa' } },
})

// Inject both themes
injectTheme(light.cssText)
injectTheme(dark.cssText)

// Result in the DOM:
// <style id="twc-theme">
//   [data-theme="light"] { --twc-color-primary-500: #3b82f6; }
//   [data-theme="dark"]  { --twc-color-primary-500: #60a5fa; }
// </style>
```

:::note
`injectTheme()` is SSR-safe. It is a no-op when `document` is not available (e.g., during server-side rendering). For SSR, include the `cssText` in your HTML template directly.
:::

### SSR usage

In server-side rendering contexts, embed the CSS text directly in your HTML:

```ts
// server.ts
const light = createTheme({
  name: 'light',
  colors: { primary: { 500: '#3b82f6' } },
})

const html = `
  <html data-theme="light">
  <head>
    <style id="twc-theme">${light.cssText}</style>
  </head>
  <body>...</body>
  </html>
`
```

## setTheme()

`setTheme(name)` sets the `data-theme` attribute on the `<html>` element, activating the corresponding theme's custom properties:

```ts
import { setTheme } from 'typewritingclass/theme'

setTheme('dark')
// <html data-theme="dark">

setTheme('light')
// <html data-theme="light">
```

This function is also SSR-safe and will no-op when `document` is unavailable.

## Complete example: light and dark themes

Here is a full example defining light and dark themes, injecting them, and providing a toggle:

### Define themes

```ts
// theme.ts
import { createTheme, injectTheme } from 'typewritingclass/theme'

export const light = createTheme({
  name: 'light',
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    surface: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      muted: '#9ca3af',
    },
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
  },
  typography: {
    textSizes: {
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      base: { fontSize: '1rem', lineHeight: '1.5rem' },
      lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
      xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
      '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  borders: {
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
})

export const dark = createTheme({
  name: 'dark',
  colors: {
    primary: {
      50: '#172554',
      100: '#1e3a8a',
      500: '#60a5fa',
      600: '#93c5fd',
      700: '#bfdbfe',
    },
    surface: {
      0: '#111827',
      50: '#1f2937',
      100: '#374151',
      200: '#4b5563',
    },
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      muted: '#9ca3af',
    },
  },
  // Spacing, typography, borders inherit from light or can be overridden
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
  },
})

// Share the vars -- both themes produce the same var() references
// because they use the same token names
export const { vars } = light
```

### Inject and apply

```ts
// main.ts
import { injectTheme, setTheme } from 'typewritingclass/theme'
import { light, dark } from './theme'

// Inject both themes on page load
injectTheme(light.cssText)
injectTheme(dark.cssText)

// Start with the light theme
setTheme('light')
```

### Build components with vars

```ts
// components.ts
import { cx, bg, color, p, rounded, shadow, fontSize, lineHeight, fontWeight, when, hover } from 'typewritingclass'
import { vars } from './theme'

export const card = cx(
  bg(vars.colors.surface[0]),
  color(vars.colors.text.primary),
  p(vars.spacing[6]),
  rounded(vars.borders.lg),
  shadow(vars.shadows.md),
  when(hover)(shadow(vars.shadows.lg)),
)

export const heading = cx(
  color(vars.colors.text.primary),
  fontSize(vars.typography.textSizes['2xl'].fontSize),
  lineHeight(vars.typography.textSizes['2xl'].lineHeight),
  fontWeight(vars.typography.fontWeights.bold),
)

export const body = cx(
  color(vars.colors.text.secondary),
  fontSize(vars.typography.textSizes.base.fontSize),
  lineHeight(vars.typography.textSizes.base.lineHeight),
)

export const primaryButton = cx(
  bg(vars.colors.primary[500]),
  color(vars.colors.surface[0]),
  fontWeight(vars.typography.fontWeights.semibold),
  p(vars.spacing[3]),
  rounded(vars.borders.md),
  when(hover)(bg(vars.colors.primary[600])),
)
```

### Theme toggle

```ts
// toggle.ts
import { setTheme } from 'typewritingclass/theme'

let current = 'light'

export function toggleTheme() {
  current = current === 'light' ? 'dark' : 'light'
  setTheme(current)
  localStorage.setItem('twc-theme', current)
}

// Restore saved preference on load
export function initTheme() {
  const saved = localStorage.getItem('twc-theme')
  if (saved) {
    current = saved
    setTheme(current)
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    current = 'dark'
    setTheme('dark')
  } else {
    setTheme('light')
  }
}
```

## Advanced patterns

### Combining default tokens with custom themes

You can use the default token values from `typewritingclass/theme/colors` (and other modules) as the basis for your custom theme, ensuring consistency with the built-in palette:

```ts
import { createTheme } from 'typewritingclass/theme'
import { blue, gray, green, red } from 'typewritingclass/theme/colors'

const theme = createTheme({
  name: 'brand',
  colors: {
    // Re-use the full Tailwind blue palette as your primary color
    primary: blue,
    // Use gray for neutral surfaces
    neutral: gray,
    // Semantic colors
    success: green,
    error: red,
  },
})
```

Because each color palette is just a `Record<number, string>`, it slots directly into the `colors` config.

### Multiple brand themes

```ts
import { createTheme, injectTheme, setTheme } from 'typewritingclass/theme'

const acme = createTheme({
  name: 'acme',
  colors: {
    primary: { 500: '#ff6b35', 600: '#e55a2b' },
    surface: { 0: '#ffffff', 100: '#fef7f3' },
  },
})

const globex = createTheme({
  name: 'globex',
  colors: {
    primary: { 500: '#2dd4bf', 600: '#14b8a6' },
    surface: { 0: '#ffffff', 100: '#f0fdfa' },
  },
})

injectTheme(acme.cssText)
injectTheme(globex.cssText)

// Switch between brands
function setBrand(brand: 'acme' | 'globex') {
  setTheme(brand)
}
```

### Default theme with named overrides

A common pattern is to define a default (`:root`) theme with global tokens, then use named themes only for the values that differ:

```ts
import { createTheme, injectTheme, setTheme } from 'typewritingclass/theme'

// Base tokens on :root -- always available
const base = createTheme({
  // name defaults to 'default', targets :root
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb' },
    surface: { 0: '#ffffff', 100: '#f3f4f6' },
    text: { primary: '#111827', secondary: '#6b7280' },
  },
  spacing: { 4: '1rem', 8: '2rem' },
})

// Dark overrides -- only redefine what changes
const darkOverrides = createTheme({
  name: 'dark',
  colors: {
    primary: { 500: '#60a5fa', 600: '#93c5fd' },
    surface: { 0: '#111827', 100: '#1f2937' },
    text: { primary: '#f9fafb', secondary: '#d1d5db' },
  },
  // spacing not redefined -- :root values still apply
})

injectTheme(base.cssText)
injectTheme(darkOverrides.cssText)

// Initially uses :root values
// setTheme('dark') layers dark overrides on top
```

This approach minimizes duplication: tokens that stay the same (like spacing, typography, borders) are defined once on `:root` and inherited by all named themes.

### Respecting system color scheme preference

For automatic dark mode based on the user's OS setting, combine `setTheme` with `matchMedia`:

```ts
import { setTheme } from 'typewritingclass/theme'

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

function applySystemTheme(e: MediaQueryList | MediaQueryListEvent) {
  setTheme(e.matches ? 'dark' : 'light')
}

// Apply on load
applySystemTheme(mediaQuery)

// React to changes
mediaQuery.addEventListener('change', applySystemTheme)
```

### Framework integration: React

```tsx
// ThemeProvider.tsx
import { useEffect, createContext, useContext, useState } from 'react'
import { injectTheme, setTheme } from 'typewritingclass/theme'
import { light, dark } from './theme'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggle: () => void
}>({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setCurrentTheme] = useState<Theme>('light')

  useEffect(() => {
    injectTheme(light.cssText)
    injectTheme(dark.cssText)
    setTheme(theme)
  }, [])

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  const toggle = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

### Framework integration: Solid

```tsx
// ThemeProvider.tsx
import { createSignal, createEffect, onMount, createContext, useContext, ParentComponent } from 'solid-js'
import { injectTheme, setTheme } from 'typewritingclass/theme'
import { light, dark } from './theme'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: () => Theme
  toggle: () => void
}>()

export const ThemeProvider: ParentComponent = (props) => {
  const [theme, setCurrentTheme] = createSignal<Theme>('light')

  onMount(() => {
    injectTheme(light.cssText)
    injectTheme(dark.cssText)
  })

  createEffect(() => {
    setTheme(theme())
  })

  const toggle = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)!
```

## Generated CSS output

To help visualize what `createTheme` produces, here is an example of the generated CSS:

```ts
const theme = createTheme({
  name: 'light',
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb' },
    gray: { 100: '#f3f4f6', 900: '#111827' },
  },
  spacing: { 4: '1rem', 8: '2rem' },
  typography: {
    textSizes: { base: { fontSize: '1rem', lineHeight: '1.5rem' } },
    fontWeights: { bold: '700' },
  },
  borders: { md: '0.375rem' },
  shadows: { md: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
})
```

The `theme.cssText` value will be:

```css
[data-theme="light"] {
  --twc-color-primary-500: #3b82f6;
  --twc-color-primary-600: #2563eb;
  --twc-color-gray-100: #f3f4f6;
  --twc-color-gray-900: #111827;
  --twc-spacing-4: 1rem;
  --twc-spacing-8: 2rem;
  --twc-text-base-fs: 1rem;
  --twc-text-base-lh: 1.5rem;
  --twc-font-bold: 700;
  --twc-border-md: 0.375rem;
  --twc-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

And the `theme.vars` object will contain:

```ts
theme.vars.colors.primary[500]              // 'var(--twc-color-primary-500)'
theme.vars.colors.primary[600]              // 'var(--twc-color-primary-600)'
theme.vars.colors.gray[100]                 // 'var(--twc-color-gray-100)'
theme.vars.colors.gray[900]                 // 'var(--twc-color-gray-900)'
theme.vars.spacing[4]                       // 'var(--twc-spacing-4)'
theme.vars.spacing[8]                       // 'var(--twc-spacing-8)'
theme.vars.typography.textSizes.base.fontSize    // 'var(--twc-text-base-fs)'
theme.vars.typography.textSizes.base.lineHeight  // 'var(--twc-text-base-lh)'
theme.vars.typography.fontWeights.bold       // 'var(--twc-font-bold)'
theme.vars.borders.md                        // 'var(--twc-border-md)'
theme.vars.shadows.md                        // 'var(--twc-shadow-md)'
```
