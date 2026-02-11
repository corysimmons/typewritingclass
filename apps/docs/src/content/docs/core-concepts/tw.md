---
title: Chainable API with tw
description: "A proxy-based chainable alternative to importing individual utilities."
sidebar:
  order: 3
---

`tw` is a proxy-based chainable style builder. One import gives you access to every utility, modifier, and value-less shorthand.

```ts
import { tw } from 'typewritingclass'

const card = tw.bg.white.rounded.xl.p(6).shadow.md
```

## Property-access tokens

Design tokens (colors, radius, shadows, typography, layout enums) are accessed as properties — no strings needed:

```ts
tw.bg.blue500            // background-color: #3b82f6
tw.textColor.slate900    // color: #0f172a
tw.rounded.lg            // border-radius: 0.5rem
tw.shadow.md             // box-shadow
tw.text.lg               // font-size + line-height
tw.font.bold             // font-weight: 700
tw.items.center          // align-items: center
tw.justify.between       // justify-content: space-between
tw.cursor.pointer        // cursor: pointer
```

Color tokens support opacity via callable syntax:

```ts
tw.bg.blue500(50)        // background-color: rgb(59 130 246 / 0.5)
tw.bg.blue500(25)        // 25% opacity
```

## Utilities with arguments

Spacing, sizing, and arbitrary CSS values use function calls:

```ts
tw.p(4).gap(8).w('100%').h(12)
tw.opacity(0.5).z(10).border(1)
```

## Value-less utilities

Accessed as properties instead of function calls:

```ts
tw.flex.flexCol.gap(4)
tw.relative.overflow.hidden
tw.italic.truncate.antialiased
tw.group.bg.white.rounded.lg.p(4)
```

## Arbitrary values

Pass any CSS value as a string argument — useful for one-off values:

```ts
tw.bg('#ff6347').rounded('0.625rem')
tw.shadow('0 4px 12px rgba(0,0,0,0.15)')
```

## Single-utility modifiers (property syntax)

The modifier applies to the next utility in the chain:

```ts
tw.bg.white.hover(tw.bg('blue-50')).focus(tw.ring(2))
tw.p(4).md.p(8).lg.p(12)
tw.bg.white.dark(tw.bg.slate900)
tw.opacity(0.5).groupHover(tw.opacity(1))
```

## Multi-utility modifiers (function syntax)

When a modifier should apply to multiple styles, call it as a function:

```ts
tw.hover(tw.bg.blue500.textColor.white.shadow.lg)

const card = tw
  .bg.white.rounded.xl.p(6)
  .hover(tw.bg.slate100.shadow.lg.scale(105))
  .focus(tw.ring(2).ringColor.blue500)
```

## Resolving to class strings

The chain resolves automatically in string contexts (vanilla JS, Solid, etc.):

```ts
element.className = tw.p(4).bg.blue500
const classes = `${tw.p(4)} extra-class`
```

In React, use a template literal or `.value` since React requires `className` to be a string:

```tsx
<div className={`${tw.p(4).bg.blue500}`} />
<div className={tw.p(4).bg.blue500.value} />
```

:::note
In Next.js Server Components, always use `.value` to resolve the chain to a plain string. RSC serialization cannot handle Proxy objects.
:::

## Immutable chains

Every access returns a new chain:

```ts
const base = tw.flex.flexCol
const a = base.gap(4) // flex + flexCol + gap(4)
const b = base.gap(8) // flex + flexCol + gap(8)
// base is unchanged
```

## tw vs cx + when

Both APIs produce identical CSS. Choose based on preference:

| | `cx` + `when` | `tw` |
|---|---|---|
| Imports | Many individual imports | Single `tw` import |
| Modifiers | `when(hover)(bg.blue600)` | `tw.hover(tw.bg.blue600)` |
| Value-less | `cx(flex(), flexCol())` | `tw.flex.flexCol` |
| Tokens | `cx(bg.blue500, rounded.lg)` | `tw.bg.blue500.rounded.lg` |
| Dynamic values | `dcx(bg(dynamic(color)))` | Use `cx`/`dcx` for dynamic values |
