---
title: Custom Themes
description: Create and switch between custom themes with createTheme().
sidebar:
  order: 2
---

## Overview

1. **Define** a theme with `createTheme()` -- produces CSS custom properties and a typed `vars` accessor.
2. **Inject** the theme's CSS with `injectTheme()`.
3. **Switch** between named themes with `setTheme()`.

```ts
import { createTheme, injectTheme, setTheme } from 'typewritingclass/theme'

const light = createTheme({
  name: 'light',
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb' },
    surface: { 0: '#ffffff', 100: '#f3f4f6' },
  },
})

const dark = createTheme({
  name: 'dark',
  colors: {
    primary: { 500: '#60a5fa', 600: '#93c5fd' },
    surface: { 0: '#111827', 100: '#1f2937' },
  },
})

injectTheme(light.cssText)
injectTheme(dark.cssText)
setTheme('light')
```

## Using theme vars

The `vars` object contains `var(--twc-...)` references that resolve at runtime:

```ts
import { tw } from 'typewritingclass'

const { vars } = light

tw.bg(vars.colors.primary[500]).hover(tw.bg(vars.colors.primary[600]))
// CSS: background-color: var(--twc-color-primary-500)
```

When you call `setTheme('dark')`, the custom property values change and styles update instantly.

## ThemeConfig

```ts
interface ThemeConfig {
  name?: string           // 'default' targets :root; any other targets [data-theme="<name>"]
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

## Theme toggle example

```ts
import { setTheme } from 'typewritingclass/theme'

let current = 'light'
function toggleTheme() {
  current = current === 'light' ? 'dark' : 'light'
  setTheme(current)
}
```
