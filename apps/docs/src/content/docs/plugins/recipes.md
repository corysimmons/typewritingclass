---
title: "Recipes & Composites"
description: "Build reusable style compositions and component recipes."
sidebar:
  order: 4
---

Recipes are plain functions that combine utilities into reusable design patterns. No new API to learn -- just functions.

## Basic recipe

```ts
import { tw } from 'typewritingclass'

export function card() {
  return tw
    .p(6)
    .bg.white
    .rounded.lg
    .shadow.md
    .textColor.gray900
    .toString()
}

// Usage:
<div className={card()}>Content</div>
```

## Recipes with variants

```ts
import { tw } from 'typewritingclass'

type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const base = tw
  .rounded.lg
  .font.semibold
  .cursor.pointer

const sizes = {
  sm: tw.px(3).py(1).text.sm,
  md: tw.px(4).py(2).text.base,
  lg: tw.px(6).py(3).text.lg,
} as const

const variants = {
  primary: tw
    .bg.blue500
    .textColor.white
    .hover(tw.bg.blue600),
  secondary: tw
    .bg.white
    .textColor.gray700
    .border().borderColor.gray300
    .hover(tw.bg.gray50),
  danger: tw
    .bg.red500
    .textColor.white
    .hover(tw.bg.red600),
} as const

export function button(variant: ButtonVariant = 'primary', size: ButtonSize = 'md') {
  return `${base} ${sizes[size]} ${variants[variant]}`
}
```

```tsx
<button className={button('primary', 'lg')}>Submit</button>
<button className={button('secondary', 'sm')}>Cancel</button>
```

## Multi-element recipes

Return an object of class strings for components with multiple styled elements:

```ts
export function dialog() {
  return {
    overlay: tw
      .fixed.inset(0)
      .flex.items.center.justify.center
      .bg('black/50')
      .toString(),
    panel: tw
      .bg.white
      .rounded.xl
      .maxW('32rem').w('full')
      .shadow.xl
      .toString(),
    header: tw
      .px(6).py(4)
      .borderB().borderColor.gray200
      .textColor.gray900
      .font.semibold
      .toString(),
    body: tw
      .p(6)
      .textColor.gray700
      .toString(),
    footer: tw
      .px(6).py(4)
      .borderT().borderColor.gray200
      .flex.justify.end.gap(2)
      .toString(),
  }
}
```

```tsx
const d = dialog()
<div className={d.overlay}>
  <div className={d.panel}>
    <div className={d.header}>Title</div>
    <div className={d.body}>Content</div>
    <div className={d.footer}>Actions</div>
  </div>
</div>
```

## Recipes with extra styles

Accept additional styles from the consumer:

```ts
import { cx, p, bg, rounded, shadow, textColor } from 'typewritingclass'

export function card(...extra: (StyleRule | string)[]) {
  return cx(p(6), bg.white, rounded.lg, shadow.sm, textColor.gray900, ...extra)
}

// Consumer overrides:
<div className={card(when(hover)(shadow.lg))}>Enhanced</div>
```

## Dynamic recipes

Use `dcx()` and `dynamic()` for runtime values:

```ts
import { dcx, bg, textColor, p, rounded, dynamic } from 'typewritingclass'

export function colorSwatch(color: string) {
  return dcx(bg(dynamic(color)), textColor.white, p(4), rounded.lg)
}
```

```tsx
function Swatch({ color }: { color: string }) {
  const { className, style } = colorSwatch(color)
  return <div className={className} style={style}>{color}</div>
}
```

## Patterns summary

| Pattern | When to use |
|---|---|
| Simple recipe (returns `string`) | Single styled element |
| Multi-element (returns `object`) | Multiple styled children |
| With variants (enum params) | Visual variants (primary, secondary) |
| With `...extra` (accepts rules) | Consumers need to extend |
| Dynamic (uses `dcx`) | Runtime-determined values |
