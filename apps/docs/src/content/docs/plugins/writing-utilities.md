---
title: "Writing Utilities"
description: "Create custom CSS utility functions."
sidebar:
  order: 2
---

A utility is a function that takes a value and returns a `StyleRule`. Use `createRule()` for static values and `createDynamicRule()` for dynamic ones.

## Static utilities with `createRule()`

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

export function textShadow(value: string): StyleRule {
  return createRule({ 'text-shadow': value })
}
```

### Multiple declarations

```ts
export function truncate(): StyleRule {
  return createRule({
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  })
}
```

### Computed values

```ts
export function gridCols(count: number): StyleRule {
  return createRule({
    display: 'grid',
    'grid-template-columns': `repeat(${count}, minmax(0, 1fr))`,
  })
}

export function lineClamp(lines: number): StyleRule {
  return createRule({
    display: '-webkit-box',
    '-webkit-line-clamp': String(lines),
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  })
}
```

## Dynamic-aware utilities with `createDynamicRule()`

Accept `DynamicValue` inputs for runtime values:

```ts
import type { StyleRule, DynamicValue } from 'typewritingclass'
import { createRule, createDynamicRule } from 'typewritingclass/rule'
import { isDynamic } from 'typewritingclass'

export function textShadow(value: string | DynamicValue): StyleRule {
  if (isDynamic(value)) {
    return createDynamicRule(
      { 'text-shadow': `var(${value.__id})` },
      { [value.__id]: String(value.__value) },
    )
  }
  return createRule({ 'text-shadow': value })
}
```

The pattern: check `isDynamic()`, use `var()` reference + bindings if dynamic, raw value if static.

## Type safety

Use union types or branded types for restricted inputs:

```ts
type CursorValue = 'pointer' | 'default' | 'wait' | 'not-allowed' | 'grab'

export function cursor(value: CursorValue): StyleRule {
  return createRule({ cursor: value })
}
```

## Multiple parameters

```ts
export function transition(
  property: string,
  duration = '150ms',
  easing = 'ease',
): StyleRule {
  return createRule({
    'transition-property': property,
    'transition-duration': duration,
    'transition-timing-function': easing,
  })
}
```

## Publishing as npm

Custom utilities are plain TypeScript exports:

```json
{
  "name": "my-twc-utilities",
  "peerDependencies": { "typewritingclass": ">=0.2.0" }
}
```

Consumers import and use them directly -- no registration needed.
