---
title: Layer Ordering
description: "How Typewriting Class uses CSS @layer for deterministic specificity."
sidebar:
  order: 6
---

Typewriting Class wraps every generated rule in a numbered CSS `@layer`. Later arguments always override earlier ones -- no `!important`, no specificity wars.

## How it works

```ts
tw.p(4).bg('blue-500').bg('red-500')
```

```css
@layer l0 { ._a { padding: 1rem; } }
@layer l1 { ._b { background-color: #3b82f6; } }
@layer l2 { ._c { background-color: #ef4444; } }
```

Layer `l2` beats `l1`, so `bg('red-500')` wins. Always.

## Override patterns

```ts
const base = tw.p(4).bg('white').rounded('lg')
const danger = tw.p(4).bg('white').rounded('lg').bg('red-50').textColor('red-900')
// bg('red-50') overrides bg('white') because it has a higher layer
```

## Explicit control with layer()

Force a rule to a specific priority level:

```ts
import { cx, layer, p, bg } from 'typewritingclass'

cx(
  layer(0)(bg('white')),    // lowest priority
  p(4),
  layer(1000)(textColor('slate-900')), // highest priority
)
```

Use `layer(0)` for resets, high numbers for critical overrides.
