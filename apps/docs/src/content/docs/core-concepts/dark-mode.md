---
title: Dark Mode
description: "Add dark mode support with the dark modifier."
sidebar:
  order: 5
---

## With tw

```ts
import { tw } from 'typewritingclass'

// Single utility
tw.bg('white').dark.bg('slate-900')
tw.textColor('slate-900').dark.textColor('slate-100')

// Multiple dark overrides
tw.bg('white').textColor('slate-900')
  .dark(tw.bg('slate-900').textColor('slate-100'))
```

## Combining with other modifiers

```ts
tw.bg('white').hover.bg('blue-50').dark.bg('slate-900').dark.hover.bg('slate-800')
```

## Full example

```tsx
import { tw } from 'typewritingclass'

const card = tw
  .p(6).bg('white').rounded('lg').shadow('sm')
  .hover.shadow('md')
  .dark(tw.bg('slate-800').shadow('none'))

const title = tw.textColor('slate-900').font('600')
  .dark.textColor('white')

const body = tw.textColor('slate-600')
  .dark.textColor('slate-400')
```

## Manual theme switching

For toggle buttons beyond system preference, use `createTheme()` and `setTheme()`:

```ts
import { createTheme, injectTheme, setTheme } from 'typewritingclass/theme'

const light = createTheme({ name: 'light', colors: { ... } })
const dark = createTheme({ name: 'dark', colors: { ... } })

injectTheme(light.cssText)
injectTheme(dark.cssText)

setTheme('dark') // sets <html data-theme="dark">
```

See [Custom Themes](/theming/custom-themes/) for the full API.

## With cx() + when()

```ts
import { cx, bg, textColor, when, dark } from 'typewritingclass'

cx(bg('white'), textColor('slate-900'), when(dark)(bg('slate-900'), textColor('slate-100')))
```
