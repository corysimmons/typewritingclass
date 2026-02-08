---
title: Utility Functions
description: "How Typewriting Class utilities work -- functions in, CSS out."
sidebar:
  order: 1
---

Every CSS property is a TypeScript function. Call it with a value, get a `StyleRule`. Compose with `tw` or `cx()`.

## Spacing

Numeric values use the Tailwind-compatible spacing scale (`4` = `1rem`, each unit = `0.25rem`). Strings pass through as raw CSS.

```ts
tw.p(4)        // padding: 1rem
tw.px(6)       // padding-left/right: 1.5rem
tw.m('auto')   // margin: auto
tw.gap(4)      // gap: 1rem
```

**All spacing utilities:** `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`, `gap`, `gapX`, `gapY`

## Colors

Accept Tailwind-style string lookups or raw CSS colors:

```ts
tw.bg('blue-500')           // background-color: #3b82f6
tw.textColor('slate-900')   // color: #0f172a
tw.borderColor('gray-200')  // border-color: #e2e8f0
tw.bg('#ff6347')            // raw hex
```

## Typography

```ts
import { lg } from 'typewritingclass/theme/typography'

tw.text(lg)               // font-size + line-height preset
tw.font('700')            // font-weight: 700
tw.tracking('-0.025em')   // letter-spacing
tw.leading('1.5')         // line-height
tw.textAlign('center')    // text-align
```

:::note
`text()` requires a `TextSize` import from `typewritingclass/theme/typography` for preset sizes.
:::

## Layout

```ts
tw.flex.flexCol.items('center').justify('space-between')
tw.grid(3).gap(4)          // 3-column grid with 1rem gap
tw.w('100%').h('100vh')
tw.relative.absolute.fixed.sticky
tw.z(10).inset(0)
tw.display('none').overflow('hidden')
```

## Borders

```ts
tw.rounded('lg')    // border-radius: 0.5rem
tw.rounded('full')  // border-radius: 9999px
tw.border(1)        // border-width: 1px
tw.ring(2)          // focus ring
```

## Effects

```ts
tw.shadow('md')     // box-shadow
tw.shadow('lg')
tw.opacity(0.5)
tw.backdrop('blur(8px)')
```

## Interactivity

```ts
tw.cursor('pointer')
tw.select('none')
tw.pointerEvents('none')
```

## Theme tokens vs raw values

Most utilities accept both Tailwind-style string lookups and raw CSS:

```ts
// String lookups
tw.bg('blue-500').rounded('lg').shadow('md')

// Raw CSS
tw.bg('#ff6347').rounded('0.625rem').shadow('0 4px 12px rgba(0,0,0,0.15)')
```
