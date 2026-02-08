---
title: "Writing Modifiers"
description: "Create custom modifier functions for conditional styles."
sidebar:
  order: 3
---

A modifier takes a `StyleRule` and returns a new one with additional selectors or media queries.

## Pseudo-class modifiers

Use `wrapWithSelector()`:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithSelector } from 'typewritingclass/rule'

export const visited: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, ':visited')

export const selection: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, '::selection')

export const odd: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, ':nth-child(odd)')
```

### Parameterized modifiers

Return a modifier from a factory function:

```ts
export function nthChild(n: string): Modifier {
  return (rule: StyleRule) => wrapWithSelector(rule, `:nth-child(${n})`)
}

// Usage: when(nthChild('3n'))(bg('#dbeafe'))
```

## Media query modifiers

Use `wrapWithMediaQuery()`:

```ts
import { wrapWithMediaQuery } from 'typewritingclass/rule'

export const tablet: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(min-width: 600px) and (max-width: 1023px)')

export const desktop: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(min-width: 1024px)')

export const reducedMotion: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(prefers-reduced-motion: reduce)')

export const print: Modifier = (rule) =>
  wrapWithMediaQuery(rule, 'print')
```

### Breakpoint factory

```ts
export function minWidth(px: number): Modifier {
  return (rule) => wrapWithMediaQuery(rule, `(min-width: ${px}px)`)
}

// Usage: when(minWidth(1400))(p(12))
```

## Compound modifiers

Compose selector and media query wrappers:

```ts
export const hoverFine: Modifier = (rule) =>
  wrapWithMediaQuery(wrapWithSelector(rule, ':hover'), '(pointer: fine)')

export const keyboardFocus: Modifier = (rule) =>
  wrapWithSelector(rule, ':focus-visible:not(:hover)')
```

## Composability

All custom modifiers compose with `when()` and stack with built-in modifiers:

```ts
tw.p(4).bg('white')
  .hover.bg('gray-100')
  // Or with when():
cx(
  p(4), bg('white'),
  when(hover, desktop)(bg('#f3f4f6')),
  when(reducedMotion)(css`transition: none;`),
)
```
