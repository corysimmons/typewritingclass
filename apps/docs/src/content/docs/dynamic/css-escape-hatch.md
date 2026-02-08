---
title: "CSS Escape Hatch"
description: "Write raw CSS when you need properties without a utility."
sidebar:
  order: 2
---

The `css()` function lets you write raw CSS declarations that compose with everything else.

## Object form

```ts
import { cx, css } from 'typewritingclass'

cx(css({ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '1rem' }))
```

## Tagged template form

```ts
cx(css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`)
```

## Mixing with utilities

```ts
const card = tw.p(6).bg('white').rounded('lg')
// For properties without utilities, drop to cx() + css():
import { cx, css, p, bg, rounded } from 'typewritingclass'

cx(p(6), bg('white'), rounded('lg'), css({
  'box-shadow': '0 1px 3px rgba(0,0,0,0.12)',
  transition: 'box-shadow 0.2s ease',
}))
```

## With modifiers

```ts
import { cx, css, when, md, hover } from 'typewritingclass'

cx(
  css`display: grid; grid-template-columns: 1fr;`,
  when(md)(css({ 'grid-template-columns': '1fr 1fr' })),
  when(hover)(css`box-shadow: 0 4px 12px rgba(0,0,0,0.15);`),
)
```

## Dynamic interpolation

The tagged template form supports `dynamic()` values:

```ts
import { dcx, css, dynamic } from 'typewritingclass'

const color = dynamic('#e11d48')
const { className, style } = dcx(css`background-color: ${color}; padding: 1rem;`)
```

## When to use css()

Use `css()` for properties without built-in utilities: `grid-template-areas`, `clip-path`, `animation`, vendor prefixes, etc. Prefer built-in utilities when available for better type safety and autocomplete.
