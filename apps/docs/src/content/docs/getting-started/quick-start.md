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

Chain utilities to build styles. The chain resolves to a class string automatically:

```tsx
<div className={tw.p(6).bg('white').rounded('lg').shadow('md')} />
```

## Value-less utilities

Utilities that take no arguments are accessed as properties:

```ts
tw.flex.flexCol.gap(4)
tw.relative.overflow('hidden')
tw.italic.truncate
```

## Modifiers

Access a modifier as a property and it applies to the next utility:

```ts
tw.bg('white').hover.bg('blue-50')
tw.p(4).md.p(8).lg.p(12)
tw.bg('white').dark.bg('slate-900')
```

For multiple utilities under one modifier, call it as a function:

```ts
tw.hover(tw.bg('blue-500').textColor('white').shadow('lg'))
```

## Complete example

```tsx
import { tw } from 'typewritingclass'

// Card container
const card = tw
  .group.bg('white').rounded('xl').shadow('md').p(6)
  .hover(tw.shadow('lg').scale(102))
  .dark.bg('slate-800')

// Title responds to group hover
const title = tw.textColor('slate-900').font('700')
  .groupHover.textColor('blue-600')
  .dark.textColor('white')

// Responsive layout
const container = tw.flex.flexCol.gap(4).md.flex.gap(8)

function Card() {
  return (
    <div className={card}>
      <h2 className={title}>Hello, typewritingclass</h2>
    </div>
  )
}
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
  const { className, style } = dcx(p(6), bg(dynamic(color)), rounded('lg'))
  return <div className={className} style={style}>Welcome!</div>
}
```

## Alternative: cx() + when()

The `tw` chain and the functional `cx()`/`when()` API are interchangeable and produce identical CSS:

```ts
import { cx, p, bg, rounded, when, hover } from 'typewritingclass'

// Equivalent to tw.p(4).bg('blue-500').rounded('lg').hover.bg('blue-600')
const card = cx(p(4), bg('blue-500'), rounded('lg'), when(hover)(bg('blue-600')))
```

Both APIs can coexist in the same project. Use whichever reads better for each situation.
