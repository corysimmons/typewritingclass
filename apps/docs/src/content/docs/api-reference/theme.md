---
title: Theme API
description: Complete reference for createTheme(), injectTheme(), setTheme(), and default tokens.
sidebar:
  order: 4
---

The Theme API lets you define custom design tokens as CSS custom properties and switch between themes at runtime. It consists of three functions: `createTheme()` to define token sets, `injectTheme()` to inject them into the document, and `setTheme()` to switch between named themes.

## createTheme()

Creates a theme from a configuration of design tokens. Converts all token values into CSS custom properties and returns both the CSS text for injection and a type-safe `vars` accessor.

### Signature

```ts
function createTheme(config: ThemeConfig): ThemeResult
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | `ThemeConfig` | The theme configuration containing design tokens. |

### Return type

`ThemeResult` -- an object with `name`, `cssText`, and `vars`.

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

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | `string \| undefined` | `'default'` | Theme name. `'default'` targets `:root`. Any other name targets `[data-theme="<name>"]`. |
| `colors` | `Record<string, Record<string \| number, string>> \| undefined` | -- | Color palette scales, keyed by color name, then by shade. |
| `spacing` | `Record<string \| number, string> \| undefined` | -- | Spacing scale, keyed by size token. |
| `typography` | `object \| undefined` | -- | Typography tokens for text sizes and font weights. |
| `typography.textSizes` | `Record<string, { fontSize: string; lineHeight: string }> \| undefined` | -- | Named text size presets with `fontSize` and `lineHeight` values. |
| `typography.fontWeights` | `Record<string, string> \| undefined` | -- | Named font weight presets. |
| `borders` | `Record<string, string> \| undefined` | -- | Named border style tokens. |
| `shadows` | `Record<string, string> \| undefined` | -- | Named box-shadow tokens. |

### ThemeResult interface

```ts
interface ThemeResult {
  name: string
  cssText: string
  vars: ThemeVars
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | The theme name (defaults to `'default'`). |
| `cssText` | `string` | A complete CSS rule string containing all custom property declarations. For the default theme this targets `:root`; for named themes it targets `[data-theme="<name>"]`. |
| `vars` | `ThemeVars` | Type-safe accessor whose leaf values are `var(--twc-...)` CSS references. |

### ThemeVars interface

```ts
interface ThemeVars {
  colors: Record<string, Record<string | number, string>>
  spacing: Record<string | number, string>
  typography: {
    textSizes: Record<string, { fontSize: string; lineHeight: string }>
    fontWeights: Record<string, string>
  }
  borders: Record<string, string>
  shadows: Record<string, string>
}
```

Every leaf value in `ThemeVars` is a string like `var(--twc-color-blue-500)` that can be passed directly to style utilities.

### CSS custom property naming convention

The generated custom property names follow the pattern `--twc-<category>-<name>-<key>`:

| Token type | Pattern | Example |
|-----------|---------|---------|
| Color | `--twc-color-<name>-<shade>` | `--twc-color-blue-500` |
| Spacing | `--twc-spacing-<key>` | `--twc-spacing-4` |
| Text size (font-size) | `--twc-text-<name>-fs` | `--twc-text-lg-fs` |
| Text size (line-height) | `--twc-text-<name>-lh` | `--twc-text-lg-lh` |
| Font weight | `--twc-font-<name>` | `--twc-font-bold` |
| Border | `--twc-border-<name>` | `--twc-border-default` |
| Shadow | `--twc-shadow-<name>` | `--twc-shadow-md` |

### Examples

#### Basic theme creation

```ts
import { createTheme, injectTheme } from 'typewritingclass'
import { cx, bg, p, textColor } from 'typewritingclass'

const { cssText, vars } = createTheme({
  colors: {
    blue: { 500: '#3b82f6', 600: '#2563eb' },
    gray: { 100: '#f3f4f6', 900: '#111827' },
  },
  spacing: { 4: '1rem', 8: '2rem' },
  shadows: { md: '0 4px 6px rgba(0,0,0,0.1)' },
})

// Inject the generated CSS custom properties
injectTheme(cssText)

// Use vars in style utilities
cx(bg(vars.colors.blue[500]), p(vars.spacing[4]))
// CSS: background-color: var(--twc-color-blue-500); padding: var(--twc-spacing-4)
```

#### Generated CSS output

```ts
const { cssText } = createTheme({
  name: 'light',
  colors: {
    blue: { 500: '#3b82f6' },
    gray: { 100: '#f3f4f6' },
  },
  spacing: { 4: '1rem' },
})

// cssText =>
// [data-theme="light"] {
//   --twc-color-blue-500: #3b82f6;
//   --twc-color-gray-100: #f3f4f6;
//   --twc-spacing-4: 1rem;
// }
```

#### Default theme targets :root

```ts
const { cssText } = createTheme({
  // no name, or name: 'default'
  colors: { blue: { 500: '#3b82f6' } },
})

// cssText =>
// :root {
//   --twc-color-blue-500: #3b82f6;
// }
```

#### Full theme with all token types

```ts
const theme = createTheme({
  name: 'brand',
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
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
    default: '0.25rem',
    sm: '0.125rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
})

// Access vars:
theme.vars.colors.primary[500]                // "var(--twc-color-primary-500)"
theme.vars.spacing[4]                         // "var(--twc-spacing-4)"
theme.vars.typography.textSizes.lg.fontSize   // "var(--twc-text-lg-fs)"
theme.vars.typography.textSizes.lg.lineHeight // "var(--twc-text-lg-lh)"
theme.vars.typography.fontWeights.bold        // "var(--twc-font-bold)"
theme.vars.borders.lg                         // "var(--twc-border-lg)"
theme.vars.shadows.md                         // "var(--twc-shadow-md)"
```

#### Using theme vars with utilities

```ts
import { createTheme, injectTheme } from 'typewritingclass'
import { cx, bg, textColor, p, rounded, shadow, font, text, when, hover } from 'typewritingclass'

const { cssText, vars } = createTheme({
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb' },
    surface: { 0: '#ffffff', 1: '#f9fafb' },
    text: { primary: '#111827', secondary: '#6b7280' },
  },
  spacing: { 4: '1rem', 6: '1.5rem' },
  borders: { md: '0.375rem' },
  shadows: { card: '0 1px 3px rgba(0,0,0,0.12)' },
})

injectTheme(cssText)

const card = cx(
  bg(vars.colors.surface[0]),
  textColor(vars.colors.text.primary),
  p(vars.spacing[6]),
  rounded(vars.borders.md),
  shadow(vars.shadows.card),
  when(hover)(bg(vars.colors.surface[1])),
)
```

---

## injectTheme()

Injects theme CSS custom properties into the document by creating (or appending to) a `<style>` element in the document head.

### Signature

```ts
function injectTheme(cssText: string): void
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `cssText` | `string` | The CSS string to inject, typically the `cssText` property from a `ThemeResult` returned by `createTheme()`. |

### Return type

`void`

### How it works

Creates (or reuses) a `<style id="twc-theme">` element in the document head and appends the provided CSS text to it. Each call appends to the existing content, so multiple themes can be injected sequentially.

This function is a no-op in non-browser environments (SSR-safe). When `typeof document === 'undefined'`, the function returns immediately without side effects.

### Examples

#### Inject a single theme

```ts
import { createTheme, injectTheme } from 'typewritingclass'

const light = createTheme({
  name: 'light',
  colors: { blue: { 500: '#3b82f6' } },
})

injectTheme(light.cssText)
// Document now contains:
// <style id="twc-theme">
//   [data-theme="light"] { --twc-color-blue-500: #3b82f6; }
// </style>
```

#### Inject multiple themes

```ts
import { createTheme, injectTheme } from 'typewritingclass'

const light = createTheme({
  name: 'light',
  colors: { blue: { 500: '#3b82f6' } },
})

const dark = createTheme({
  name: 'dark',
  colors: { blue: { 500: '#60a5fa' } },
})

injectTheme(light.cssText)
injectTheme(dark.cssText)
// <style id="twc-theme">
//   [data-theme="light"] { --twc-color-blue-500: #3b82f6; }
//   [data-theme="dark"]  { --twc-color-blue-500: #60a5fa; }
// </style>
```

#### Inject at application startup

```ts
// src/theme.ts
import { createTheme, injectTheme } from 'typewritingclass'

export const light = createTheme({
  name: 'light',
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb' },
    surface: { 0: '#ffffff' },
    text: { primary: '#111827' },
  },
})

export const dark = createTheme({
  name: 'dark',
  colors: {
    primary: { 500: '#60a5fa', 600: '#3b82f6' },
    surface: { 0: '#1e293b' },
    text: { primary: '#f1f5f9' },
  },
})

// Inject both at startup
injectTheme(light.cssText)
injectTheme(dark.cssText)

// Export vars for use in components (both themes share the same var() references)
export const { vars } = light
```

### Notes

- The `<style>` element is given the id `twc-theme` and is reused across calls.
- Each call appends to the existing content, separated by a newline. This means calling `injectTheme()` multiple times with the same CSS text will result in duplicate rules. Inject each theme exactly once.
- If you need to replace theme CSS entirely (e.g. for hot module replacement), you will need to clear the style element's content manually.

---

## setTheme()

Activates a named theme by setting the `data-theme` attribute on the document root element (`<html>`).

### Signature

```ts
function setTheme(name: string): void
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | The theme name to activate, matching the `name` used in `ThemeConfig` when calling `createTheme()`. |

### Return type

`void`

### How it works

Sets `document.documentElement.setAttribute('data-theme', name)`, which causes the matching `[data-theme="<name>"]` CSS rule (generated by `createTheme()`) to take effect.

The matching theme CSS must already be injected via `injectTheme()`. This function is a no-op in non-browser environments (SSR-safe).

### Examples

#### Basic theme switching

```ts
import { setTheme } from 'typewritingclass'

// Switch to dark theme
setTheme('dark')
// <html data-theme="dark"> ...

// Switch to light theme
setTheme('light')
// <html data-theme="light"> ...
```

#### Theme toggle button in React

```tsx
import { useState } from 'react'
import { setTheme } from 'typewritingclass'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  function toggle() {
    const next = isDark ? 'light' : 'dark'
    setTheme(next)
    setIsDark(!isDark)
  }

  return <button onClick={toggle}>{isDark ? 'Light Mode' : 'Dark Mode'}</button>
}
```

#### Initialize from system preference

```ts
import { setTheme } from 'typewritingclass'

// Set initial theme based on system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
setTheme(prefersDark ? 'dark' : 'light')

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  setTheme(e.matches ? 'dark' : 'light')
})
```

#### Persist theme choice

```ts
import { setTheme } from 'typewritingclass'

function applyTheme(name: string) {
  setTheme(name)
  localStorage.setItem('theme', name)
}

// On page load, restore saved preference or use system default
const saved = localStorage.getItem('theme')
if (saved) {
  setTheme(saved)
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  setTheme(prefersDark ? 'dark' : 'light')
}
```

### Notes

- `setTheme()` only sets the `data-theme` attribute. It does not inject any CSS. You must call `injectTheme()` with the theme's `cssText` before `setTheme()` will have any visible effect.
- The default theme (name `'default'`) targets `:root`, which is always active. Named themes use `[data-theme="<name>"]` selectors and require `setTheme()` to activate.
- Calling `setTheme()` replaces the previous `data-theme` value. Only one named theme is active at a time.

---

## Default token exports

Typewriting Class ships with a comprehensive set of default design tokens available through subpath imports. These are plain TypeScript constants -- fully tree-shakeable, type-safe, and ready to pass directly into utility functions.

### Import paths

```ts
import { blue, red, slate } from 'typewritingclass/theme/colors'
import { spacingScale, resolveSpacing } from 'typewritingclass/theme/spacing'
import { base, bold } from 'typewritingclass/theme/typography'
import { lg } from 'typewritingclass/theme/shadows'
import { md } from 'typewritingclass/theme/borders'
import { full, screen } from 'typewritingclass/theme/sizes'
```

Or import the entire theme namespace:

```ts
import { colors, spacing, typography, shadows, borders, sizes } from 'typewritingclass/theme'
```

### Colors

The color module provides Tailwind CSS-compatible color palettes. Each color is exported as a `ColorScale` object with shades from `50` through `950`:

```ts
type ColorScale = {
  50: string; 100: string; 200: string; 300: string; 400: string;
  500: string; 600: string; 700: string; 800: string; 900: string; 950: string;
}
```

**Available palettes:**

| Neutrals | Colors |
|----------|--------|
| `slate` | `red`, `orange`, `amber`, `yellow` |
| `gray` | `lime`, `green`, `emerald`, `teal` |
| `zinc` | `cyan`, `sky`, `blue`, `indigo` |
| `neutral` | `violet`, `purple`, `fuchsia` |
| `stone` | `pink`, `rose` |

**Standalone values:** `white` (`'#ffffff'`), `black` (`'#000000'`), `transparent` (`'transparent'`), `currentColor` (`'currentColor'`)

```ts
import { blue, white } from 'typewritingclass/theme/colors'

blue[500] // '#3b82f6'
blue[600] // '#2563eb'
white     // '#ffffff'
```

### Spacing

The spacing module exports a `spacingScale` record and a `resolveSpacing()` function:

```ts
import { spacingScale, resolveSpacing } from 'typewritingclass/theme/spacing'

spacingScale[4]  // '1rem'
spacingScale[8]  // '2rem'

resolveSpacing(4)       // '1rem'
resolveSpacing(0.5)     // '0.125rem'
resolveSpacing(100)     // '25rem' (fallback: 100 * 0.25)
resolveSpacing('2px')   // '2px' (strings pass through)
```

### Typography

#### Text sizes

Each text size is a `TextSize` object with `fontSize` and `lineHeight`:

```ts
interface TextSize {
  fontSize: string
  lineHeight: string
}
```

| Export | fontSize | lineHeight |
|--------|----------|------------|
| `xs` | `0.75rem` | `1rem` |
| `sm` | `0.875rem` | `1.25rem` |
| `base` | `1rem` | `1.5rem` |
| `lg` | `1.125rem` | `1.75rem` |
| `xl` | `1.25rem` | `1.75rem` |
| `_2xl` | `1.5rem` | `2rem` |
| `_3xl` | `1.875rem` | `2.25rem` |
| `_4xl` | `2.25rem` | `2.5rem` |
| `_5xl` | `3rem` | `1` |
| `_6xl` | `3.75rem` | `1` |
| `_7xl` | `4.5rem` | `1` |
| `_8xl` | `6rem` | `1` |
| `_9xl` | `8rem` | `1` |

:::note
Text size names starting with a number are prefixed with an underscore: `_2xl`, `_3xl`, etc.
:::

#### Font weights

Font weights are string constants:

| Export | Value |
|--------|-------|
| `thin` | `'100'` |
| `extralight` | `'200'` |
| `light` | `'300'` |
| `normal` | `'400'` |
| `medium` | `'500'` |
| `semibold` | `'600'` |
| `bold` | `'700'` |
| `extrabold` | `'800'` |
| `black_` | `'900'` |

:::note
The `black` font weight is exported as `black_` (with trailing underscore) to avoid conflicting with the `black` color export.
:::

### Shadows

Box-shadow tokens at multiple intensity levels:

| Export | Value |
|--------|-------|
| `sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `DEFAULT` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `_2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` |
| `inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` |
| `none` | `0 0 #0000` |

### Borders (border-radius)

Border-radius tokens:

| Export | Value |
|--------|-------|
| `none` | `0px` |
| `sm` | `0.125rem` |
| `DEFAULT` | `0.25rem` |
| `md` | `0.375rem` |
| `lg` | `0.5rem` |
| `xl` | `0.75rem` |
| `_2xl` | `1rem` |
| `_3xl` | `1.5rem` |
| `full` | `9999px` |

### Sizes

Named dimension values for width and height:

| Export | Value | Description |
|--------|-------|-------------|
| `full` | `100%` | Full width/height of parent |
| `screen` | `100vw` | Full viewport width |
| `screenH` | `100vh` | Full viewport height |
| `min` | `min-content` | Minimum content size |
| `max` | `max-content` | Maximum content size |
| `fit` | `fit-content` | Fit content size |
| `auto` | `auto` | Automatic sizing |

---

## Complete theme workflow

Here is a complete example showing theme definition, injection, switching, and usage:

```ts
// src/theme.ts
import { createTheme, injectTheme, setTheme } from 'typewritingclass'

// Define light theme
export const light = createTheme({
  name: 'light',
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
    surface: { 0: '#ffffff', 1: '#f9fafb', 2: '#f3f4f6' },
    text: { primary: '#111827', secondary: '#6b7280', muted: '#9ca3af' },
    border: { default: '#e5e7eb', strong: '#d1d5db' },
  },
  spacing: {
    1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem',
    6: '1.5rem', 8: '2rem', 12: '3rem',
  },
  typography: {
    textSizes: {
      sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
      base: { fontSize: '1rem', lineHeight: '1.5rem' },
      lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
      xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    },
    fontWeights: {
      normal: '400', medium: '500', semibold: '600', bold: '700',
    },
  },
  borders: { sm: '0.125rem', default: '0.25rem', lg: '0.5rem', full: '9999px' },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
})

// Define dark theme with matching structure
export const dark = createTheme({
  name: 'dark',
  colors: {
    primary: { 500: '#60a5fa', 600: '#3b82f6', 700: '#2563eb' },
    surface: { 0: '#0f172a', 1: '#1e293b', 2: '#334155' },
    text: { primary: '#f1f5f9', secondary: '#94a3b8', muted: '#64748b' },
    border: { default: '#334155', strong: '#475569' },
  },
  spacing: light.vars.spacing, // Reuse spacing values
  typography: light.vars.typography, // Reuse typography values
  borders: light.vars.borders, // Reuse border radius values
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.4)',
  },
})

// Inject both themes
injectTheme(light.cssText)
injectTheme(dark.cssText)

// Export shared vars (same var() references work for both themes)
export const { vars } = light

// Initialize theme
const savedTheme = localStorage.getItem('theme') ?? 'light'
setTheme(savedTheme)
```

```ts
// src/components/Card.tsx
import { cx, bg, textColor, p, rounded, shadow, border, borderColor, when, hover } from 'typewritingclass'
import { vars } from '../theme'

const card = cx(
  bg(vars.colors.surface[0]),
  textColor(vars.colors.text.primary),
  p(vars.spacing[6]),
  rounded(vars.borders.default),
  shadow(vars.shadows.sm),
  border(),
  borderColor(vars.colors.border.default),
  when(hover)(
    shadow(vars.shadows.md),
    borderColor(vars.colors.border.strong),
  ),
)

export function Card({ children }: { children: React.ReactNode }) {
  return <div className={card}>{children}</div>
}
```

When `setTheme('dark')` is called, the CSS custom properties resolve to the dark theme values, and the card appearance changes without any component re-renders or class name changes.
