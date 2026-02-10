---
title: Theme API
description: Complete reference for createTheme(), injectTheme(), setTheme(), and default tokens.
sidebar:
  order: 4
---

## createTheme()

Creates a theme from design tokens, producing CSS custom properties and a typed `vars` accessor.

```ts
function createTheme(config: ThemeConfig): ThemeResult
```

### ThemeConfig

```ts
interface ThemeConfig {
  name?: string           // 'default' targets :root; others target [data-theme="<name>"]
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

### ThemeResult

```ts
interface ThemeResult {
  name: string       // Theme name
  cssText: string    // CSS rule string with custom properties
  vars: ThemeVars    // Type-safe accessor with var(--twc-...) references
}
```

### Example

```ts
import { createTheme, injectTheme } from 'typewritingclass/theme'

const { cssText, vars } = createTheme({
  name: 'light',
  colors: {
    primary: { 500: '#3b82f6', 600: '#2563eb' },
    surface: { 0: '#ffffff', 100: '#f3f4f6' },
  },
})

injectTheme(cssText)
tw.bg(vars.colors.primary[500])  // background-color: var(--twc-color-primary-500)
```

---

## injectTheme()

Injects theme CSS into the document via a `<style id="twc-theme">` element.

```ts
function injectTheme(cssText: string): void
```

SSR-safe -- no-op when `document` is undefined. Each call appends to the existing style element. Inject each theme exactly once.

---

## setTheme()

Activates a named theme by setting `data-theme` on `<html>`.

```ts
function setTheme(name: string): void
```

```ts
setTheme('dark')   // <html data-theme="dark">
setTheme('light')  // <html data-theme="light">
```

The matching CSS must be injected via `injectTheme()` first.

### Theme toggle

```ts
let current = 'light'
function toggleTheme() {
  current = current === 'light' ? 'dark' : 'light'
  setTheme(current)
}
```

### System preference + persistence

```ts
const saved = localStorage.getItem('theme')
if (saved) {
  setTheme(saved)
} else {
  setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}
```

---

## Custom property naming

| Token type | Pattern | Example |
|---|---|---|
| Color | `--twc-color-<name>-<shade>` | `--twc-color-blue-500` |
| Spacing | `--twc-spacing-<key>` | `--twc-spacing-4` |
| Text size | `--twc-text-<name>-fs` / `-lh` | `--twc-text-lg-fs` |
| Font weight | `--twc-font-<name>` | `--twc-font-bold` |
| Border | `--twc-border-<name>` | `--twc-border-lg` |
| Shadow | `--twc-shadow-<name>` | `--twc-shadow-md` |

---

## Default token exports

### Import paths

| Subpath | Key exports |
|---|---|
| `typewritingclass/theme/colors` | 22 color palettes + `white`, `black`, `transparent`, `currentColor` |
| `typewritingclass/theme/typography` | `xs`-`_9xl` text sizes, `thin`-`extrabold` weights |
| `typewritingclass/theme/shadows` | `sm`, `DEFAULT`, `md`, `lg`, `xl`, `_2xl`, `inner`, `none` |
| `typewritingclass/theme/borders` | `none`, `sm`, `DEFAULT`, `md`, `lg`, `xl`, `_2xl`, `_3xl`, `full` |
| `typewritingclass/theme/sizes` | `full`, `screen`, `screenH`, `min`, `max`, `fit`, `auto` |
| `typewritingclass/theme/animations` | Animation keyframe presets |
| `typewritingclass/theme/filters` | Filter presets |
| `typewritingclass/theme` | All theme token exports (barrel) |

Most tokens are accessible directly on `tw` via property-access or string lookups — no imports needed:

```ts
// Property-access tokens (recommended)
tw.bg.blue500            // no import needed
tw.shadow.lg             // no import needed
tw.rounded.full          // no import needed
tw.font.semibold         // no import needed
tw.text.lg               // no import needed

// String lookups (equivalent)
tw.bg('blue-500')
tw.shadow('lg')
tw.rounded('full')
tw.font('semibold')
tw.text('lg')
```
