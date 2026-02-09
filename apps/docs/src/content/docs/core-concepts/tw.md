---
title: Chainable API with tw
description: "A proxy-based chainable alternative to importing individual utilities."
sidebar:
  order: 3
---

`tw` is a proxy-based chainable style builder. One import gives you access to every utility, modifier, and value-less shorthand.

```ts
import { tw } from 'typewritingclass'

const card = tw.bg('slate-50').rounded('xl').p(6).shadow('md')
```

## Utilities with arguments

```ts
tw.bg('blue-500').p(4).rounded('lg').shadow('md')
tw.textColor('slate-900').font('700')
tw.opacity(0.5).w('100%').h(12)
```

## Value-less utilities

Accessed as properties instead of function calls:

```ts
tw.flex.flexCol.gap(4)
tw.relative.overflow('hidden')
tw.italic.truncate.antialiased
tw.group.bg('white').rounded('lg').p(4)
```

## Single-utility modifiers (property syntax)

The modifier applies to the next utility in the chain:

```ts
tw.bg('white').hover.bg('blue-50').focus.ring(2)
tw.p(4).md.p(8).lg.p(12)
tw.bg('white').dark.bg('slate-900')
tw.opacity(0.5).groupHover.opacity(1)
```

## Multi-utility modifiers (function syntax)

When a modifier should apply to multiple styles, call it as a function:

```ts
tw.hover(tw.bg('blue-500').textColor('white').shadow('lg'))

const card = tw
  .bg('slate-50').rounded('xl').p(6)
  .hover(tw.bg('slate-100').shadow('lg').scale(105))
  .focus(tw.ring(2).ringColor('blue-500'))
```

## Resolving to class strings

The chain resolves automatically in string contexts:

```tsx
<div className={tw.p(4).bg('blue-500')} />
<div className={`${tw.p(4)} extra-class`} />
```

Or explicitly:

```ts
tw.p(4).bg('blue-500').toString()
tw.p(4).bg('blue-500').value
tw.p(4).bg('blue-500').className
```

:::note
In Next.js Server Components (or any RSC context), always use `.value` to resolve the chain to a plain string. RSC serialization cannot handle Proxy objects, so `className={tw.flex.value}` is required instead of `className={tw.flex}`.
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
| Modifiers | `when(hover)(bg(...))` | `tw.hover.bg(...)` |
| Value-less | `cx(flex(), flexCol())` | `tw.flex.flexCol` |
| Dynamic values | `dcx(bg(dynamic(color)))` | Use `cx`/`dcx` for dynamic values |
