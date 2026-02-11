---
title: Quick Start
description: Build your first component with Typewriting Class in 5 minutes.
sidebar:
  order: 2
---

:::note[Prerequisites]
Complete the [Installation](/getting-started/installation) guide first.
:::

## The tw API

Everything chains off a single import:

```ts
import { tw } from 'typewritingclass'
```

Chain utilities to build styles. Design tokens are accessed as properties — no strings needed:

```tsx
<div className={`${tw.p(6).bg.white.rounded.lg.shadow.md}`} />
```

## Property-access tokens

Colors, border radius, shadows, font sizes, font weights, and layout enums are all available as properties:

```ts
tw.bg.blue500            // background-color: #3b82f6
tw.textColor.slate900    // color: #0f172a
tw.rounded.lg            // border-radius: 0.5rem
tw.shadow.md             // box-shadow: ...
tw.text.lg               // font-size + line-height preset
tw.font.bold             // font-weight: 700
tw.items.center          // align-items: center
tw.justify.between       // justify-content: space-between
tw.cursor.pointer        // cursor: pointer
```

Color tokens support opacity via callable syntax:

```ts
tw.bg.blue500(50)        // background-color: rgb(59 130 246 / 0.5)
```

## Value-less utilities

Utilities that take no arguments are accessed as properties:

```ts
tw.flex.flexCol.gap(4)
tw.relative.overflow.hidden
tw.italic.truncate
```

## Modifiers

Access a modifier as a property and it applies to the next utility:

```ts
tw.bg.white.hover.bg('blue-50')
tw.p(4).md.p(8).lg.p(12)
tw.bg.white.dark.bg.slate900
```

For multiple utilities under one modifier, call it as a function:

```ts
tw.hover(tw.bg.blue500.textColor.white.shadow.lg)
```

## Complete example

```tsx
import { tw } from 'typewritingclass'

// Card container
const card = tw
  .group.bg.white.rounded.xl.shadow.md.p(6)
  .hover(tw.shadow.lg.scale(102))
  .dark.bg.slate800

// Title responds to group hover
const title = tw.textColor.slate900.font.bold
  .groupHover.textColor.blue600
  .dark.textColor.white

// Responsive layout
const container = tw.flex.flexCol.gap(4).md.flex.gap(8)

function Card() {
  return (
    <div className={`${card}`}>
      <h2 className={`${title}`}>Hello, typewritingclass</h2>
    </div>
  )
}
```

## Arbitrary values

You can always pass raw CSS values as string arguments:

```ts
tw.bg('#ff6347').rounded('0.625rem').shadow('0 4px 12px rgba(0,0,0,0.15)')
```

## Immutable chains

Every access returns a new chain. The original is never mutated:

```ts
const base = tw.flex.flexCol
const withGap4 = base.gap(4) // flex + flexCol + gap(4)
const withGap8 = base.gap(8) // flex + flexCol + gap(8)
// base is still just flex + flexCol
```

## Dynamic values

For runtime values (props, state, user input), use the functional API with `dcx()` and `dynamic()`:

```tsx
import { dcx, bg, p, rounded, dynamic } from 'typewritingclass'

function Banner({ color }: { color: string }) {
  const { className, style } = dcx(p(6), bg(dynamic(color)), rounded.lg)
  return <div className={className} style={style}>Welcome!</div>
}
```

## Alternative: cx() + when()

The `tw` chain and the functional `cx()`/`when()` API are interchangeable and produce identical CSS. Standalone utilities also support property-access tokens:

```ts
import { cx, p, bg, rounded, when, hover } from 'typewritingclass'

cx(p(4), bg.blue500, rounded.lg, when(hover)(bg.blue600))
```

Both APIs can coexist in the same project. Use whichever reads better for each situation.
