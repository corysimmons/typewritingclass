---
title: Default Tokens
description: Built-in theme tokens for colors, spacing, typography, and more.
sidebar:
  order: 1
---

Typewriting Class ships with Tailwind CSS-compatible design tokens. Most utilities accept Tailwind-style string lookups directly (`tw.bg('blue-500')`), so you often do not need to import tokens at all.

## Colors

22 color palettes with shades 50-950, plus `white`, `black`, `transparent`, `currentColor`.

```ts
// String lookups (preferred)
tw.bg('blue-500')
tw.textColor('slate-900')

// Or import tokens directly
import { blue, slate } from 'typewritingclass/theme/colors'
tw.bg(blue[500])
```

**Palettes:** `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

## Spacing

Numeric values map to the spacing scale automatically: `4` = `1rem`, each unit = `0.25rem`.

```ts
tw.p(4)   // 1rem
tw.p(8)   // 2rem
tw.p(0.5) // 0.125rem
```

## Typography

Text sizes require an import:

```ts
import { lg, _2xl } from 'typewritingclass/theme/typography'

tw.text(lg)    // font-size: 1.125rem; line-height: 1.75rem
tw.text(_2xl)  // font-size: 1.5rem; line-height: 2rem
```

Font weights use string lookups:

```ts
tw.font('700')       // font-weight: 700
tw.font('semibold')  // font-weight: 600
```

## Shadows, borders, sizes

```ts
tw.shadow('md')    // string lookup
tw.shadow('lg')
tw.rounded('lg')   // string lookup
tw.rounded('full')
tw.w('100%')
tw.h('100vh')
```

## Import reference

| Subpath | Key Exports |
|---|---|
| `typewritingclass/theme/colors` | Color palettes + `white`, `black`, `transparent`, `currentColor` |
| `typewritingclass/theme/typography` | `xs`, `sm`, `base`, `lg`, `xl`, `_2xl`-`_9xl`, `thin`-`extrabold` |
| `typewritingclass/theme/shadows` | `sm`, `DEFAULT`, `md`, `lg`, `xl`, `_2xl`, `inner`, `none` |
| `typewritingclass/theme/borders` | `none`, `sm`, `DEFAULT`, `md`, `lg`, `xl`, `_2xl`, `_3xl`, `full` |
| `typewritingclass/theme/sizes` | `full`, `screen`, `screenH`, `min`, `max`, `fit`, `auto` |
| `typewritingclass/theme/animations` | Animation keyframe presets |
| `typewritingclass/theme/filters` | Filter presets |
| `typewritingclass/theme` | All theme token exports (barrel) |
