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

Use property-access tokens for design tokens, or pass raw CSS strings:

```ts
// Property-access tokens
tw.bg.blue500           // background-color: #3b82f6
tw.textColor.slate900   // color: #0f172a
tw.borderColor.gray200  // border-color: #e2e8f0

// With opacity
tw.bg.blue500(50)       // background-color: rgb(59 130 246 / 0.5)

// Raw CSS values
tw.bg('#ff6347')
```

## Typography

```ts
// Property-access tokens
tw.text.lg              // font-size + line-height preset
tw.text.xl              // font-size: 1.25rem; line-height: 1.75rem
tw.font.bold            // font-weight: 700
tw.font.semibold        // font-weight: 600

// Function calls for arbitrary values
tw.text('2xl')          // font-size: 1.5rem; line-height: 2rem
tw.font('700')          // font-weight: 700
tw.tracking('-0.025em') // letter-spacing
tw.leading('1.5')       // line-height
tw.textAlign.center     // text-align: center
```

## Layout

```ts
tw.flex.flexCol.items.center.justify.between
tw.grid(3).gap(4)          // 3-column grid with 1rem gap
tw.w('100%').h('100vh')
tw.relative.absolute.fixed.sticky
tw.z(10).inset(0)
tw.display.none.overflow.hidden
```

## Borders

```ts
// Property-access tokens
tw.rounded.lg           // border-radius: 0.5rem
tw.rounded.full         // border-radius: 9999px

// Function calls
tw.border(1)            // border-width: 1px
tw.ring(2)              // focus ring
```

## Effects

```ts
// Property-access tokens
tw.shadow.md            // box-shadow
tw.shadow.lg

// Function calls
tw.opacity(0.5)
tw.backdrop('blur(8px)')
```

## Interactivity

```ts
// Property-access tokens
tw.cursor.pointer
tw.cursor.notAllowed

// Function calls
tw.select('none')
tw.pointerEvents('none')
```

## Theme tokens vs raw values

Most utilities accept both property-access tokens and raw CSS strings:

```ts
// Property-access tokens (recommended for design tokens)
tw.bg.blue500.rounded.lg.shadow.md

// String lookups (equivalent)
tw.bg('blue-500').rounded('lg').shadow('md')

// Raw CSS (for one-off values)
tw.bg('#ff6347').rounded('0.625rem').shadow('0 4px 12px rgba(0,0,0,0.15)')
```

## Standalone utilities

Utilities imported individually also support property-access tokens:

```ts
import { cx, bg, rounded, shadow, p } from 'typewritingclass'

cx(bg.blue500, rounded.lg, shadow.md, p(4))

// With opacity
cx(bg.blue500(25), rounded.lg, p(4))
```
