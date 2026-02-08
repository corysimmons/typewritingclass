---
title: "Writing Utilities"
description: "Create custom CSS utility functions."
sidebar:
  order: 2
---

A utility is a function that takes a value and returns a `StyleRule`. This page covers everything you need to create your own utilities, from simple single-property helpers to dynamic-aware, type-safe, theme-integrated functions ready for npm.

## `createRule()` -- static utilities

The simplest way to create a utility is with `createRule()`. It takes a `Record<string, string>` of CSS property-value pairs and returns a `StyleRule`:

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

export function textShadow(value: string): StyleRule {
  return createRule({ 'text-shadow': value })
}
```

Usage:

```ts
import { cx } from 'typewritingclass'
import { textShadow } from './my-utilities'

const heading = cx(textShadow('2px 2px 4px rgba(0,0,0,0.3)'))
// CSS: text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
```

### Multiple declarations

A single utility can set multiple CSS properties. This is common for shorthand-like utilities:

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

export function truncate(): StyleRule {
  return createRule({
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  })
}

export function absoluteFill(): StyleRule {
  return createRule({
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  })
}
```

Usage:

```ts
import { cx, p } from 'typewritingclass'
import { truncate, absoluteFill } from './my-utilities'

const label = cx(p(2), truncate())
const overlay = cx(absoluteFill())
```

### Computed values

Utilities can compute CSS values from their inputs:

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

export function gridCols(count: number): StyleRule {
  return createRule({
    display: 'grid',
    'grid-template-columns': `repeat(${count}, minmax(0, 1fr))`,
  })
}

export function aspectRatio(width: number, height: number): StyleRule {
  return createRule({
    'aspect-ratio': `${width} / ${height}`,
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

Usage:

```ts
import { cx, gap } from 'typewritingclass'
import { gridCols, aspectRatio, lineClamp } from './my-utilities'

const photoGrid = cx(gridCols(3), gap(4))
const thumbnail = cx(aspectRatio(16, 9))
const preview = cx(lineClamp(3))
```

## `createDynamicRule()` -- dynamic-aware utilities

If your utility should accept `DynamicValue` inputs (values that change at runtime), use `createDynamicRule()` alongside the `isDynamic()` type guard:

```ts
import type { StyleRule } from 'typewritingclass'
import type { DynamicValue } from 'typewritingclass'
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

The pattern is consistent across all dynamic-aware utilities:

1. Check if the input `isDynamic()`.
2. If dynamic: use `createDynamicRule()`, reference `var(${value.__id})` in the declaration, and map `value.__id` to `String(value.__value)` in the bindings.
3. If static: use `createRule()` with the value directly.

Usage with `dcx()`:

```ts
import { dcx, dynamic } from 'typewritingclass'
import { textShadow } from './my-utilities'

// Static -- goes into stylesheet directly
cx(textShadow('2px 2px 4px rgba(0,0,0,0.3)'))

// Dynamic -- emits var() in stylesheet, value in inline style
const { className, style } = dcx(textShadow(dynamic('2px 2px 4px rgba(0,0,0,0.3)')))
```

### Multiple declarations with dynamic values

When a utility sets multiple properties from a single dynamic value, reference the same `var()` in each declaration:

```ts
import type { StyleRule } from 'typewritingclass'
import type { DynamicValue } from 'typewritingclass'
import { createRule, createDynamicRule } from 'typewritingclass/rule'
import { isDynamic } from 'typewritingclass'

export function square(size: string | DynamicValue): StyleRule {
  if (isDynamic(size)) {
    return createDynamicRule(
      { width: `var(${size.__id})`, height: `var(${size.__id})` },
      { [size.__id]: String(size.__value) },
    )
  }
  return createRule({ width: size, height: size })
}
```

## Accepting theme tokens

typewritingclass theme tokens are branded strings. You can accept them in your utilities for type-safe theme integration:

```ts
import type { StyleRule, CSSColor } from 'typewritingclass'
import type { DynamicValue } from 'typewritingclass'
import { createRule, createDynamicRule } from 'typewritingclass/rule'
import { isDynamic } from 'typewritingclass'

export function highlight(color: CSSColor | string | DynamicValue): StyleRule {
  if (isDynamic(color)) {
    return createDynamicRule(
      { 'background-color': `var(${color.__id})`, color: 'inherit' },
      { [color.__id]: String(color.__value) },
    )
  }
  return createRule({ 'background-color': String(color), color: 'inherit' })
}
```

Usage with theme tokens:

```ts
import { cx } from 'typewritingclass'
import { yellow } from 'typewritingclass/theme/colors'
import { highlight } from './my-utilities'

const marked = cx(highlight(yellow[200]))
```

Because `yellow[200]` carries the `CSSColor` brand, TypeScript will accept it. Plain strings like `'#fef08a'` also work since the union includes `string`.

## Type safety with branded types

For maximum type safety, you can define your own branded types to prevent misuse:

```ts
import type { Brand, StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

// Define a branded type for animation duration
type Duration = Brand<string, 'duration'>

// Create token values
export const fast: Duration = '150ms' as Duration
export const normal: Duration = '300ms' as Duration
export const slow: Duration = '500ms' as Duration

// The utility only accepts Duration-branded values
export function transitionDuration(value: Duration): StyleRule {
  return createRule({ 'transition-duration': value })
}
```

Usage:

```ts
import { cx } from 'typewritingclass'
import { transitionDuration, fast, normal } from './my-utilities'

cx(transitionDuration(fast))     // OK
cx(transitionDuration(normal))   // OK
cx(transitionDuration('300ms'))  // Type error -- not branded
```

This prevents accidentally passing a spacing value where a duration is expected, or vice versa.

## Utilities with multiple parameters

Nothing limits a utility to a single parameter. You can accept multiple values:

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

export function transition(
  property: string,
  duration: string = '150ms',
  easing: string = 'ease',
): StyleRule {
  return createRule({
    'transition-property': property,
    'transition-duration': duration,
    'transition-timing-function': easing,
  })
}
```

Usage:

```ts
import { cx, bg, when, hover } from 'typewritingclass'
import { transition } from './my-utilities'

const button = cx(
  bg('#3b82f6'),
  transition('background-color', '200ms', 'ease-in-out'),
  when(hover)(bg('#2563eb')),
)
```

## Utilities with union/enum parameters

Use TypeScript union types or string literal unions for utilities that accept a fixed set of values:

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

type TextTransformValue = 'uppercase' | 'lowercase' | 'capitalize' | 'none'

export function textTransform(value: TextTransformValue): StyleRule {
  return createRule({ 'text-transform': value })
}

type CursorValue = 'pointer' | 'default' | 'wait' | 'text' | 'move' | 'not-allowed' | 'grab'

export function cursor(value: CursorValue): StyleRule {
  return createRule({ cursor: value })
}
```

TypeScript will provide autocompletion for the allowed values and error on invalid ones.

## Utilities with conditional logic

Utilities can contain arbitrary logic. Use this for utilities that map between different value formats:

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

const spacingScale: Record<number, string> = {
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  6: '1.5rem',
  8: '2rem',
  12: '3rem',
  16: '4rem',
}

export function inset(value: number | string): StyleRule {
  const resolved = typeof value === 'number'
    ? spacingScale[value] ?? `${value * 0.25}rem`
    : value

  return createRule({
    top: resolved,
    right: resolved,
    bottom: resolved,
    left: resolved,
  })
}
```

## Publishing as an npm package

Custom utilities are plain TypeScript exports, so publishing them is straightforward.

### Package structure

```
my-twc-utilities/
  src/
    index.ts          # re-exports everything
    text.ts           # text-related utilities
    layout.ts         # layout-related utilities
    animation.ts      # animation-related utilities
  package.json
  tsconfig.json
```

### package.json

```json
{
  "name": "my-twc-utilities",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    }
  },
  "peerDependencies": {
    "typewritingclass": ">=0.2.0"
  }
}
```

### Entry point

```ts
// src/index.ts
export { textShadow, truncate, lineClamp } from './text'
export { gridCols, aspectRatio, absoluteFill } from './layout'
export { transition, transitionDuration } from './animation'
```

### Consumer usage

```ts
import { cx, p, bg } from 'typewritingclass'
import { textShadow, gridCols, transition } from 'my-twc-utilities'

const card = cx(
  p(6),
  bg('#fff'),
  textShadow('0 1px 2px rgba(0,0,0,0.1)'),
  transition('all', '200ms'),
)
```

The consumer does not need to register anything. They import the functions and pass them to `cx()`. The typewritingclass compiler handles the rest.

## Complete example: a gradient utility

Here is a complete, production-ready utility with type safety, dynamic support, and documentation:

```ts
import type { StyleRule } from 'typewritingclass'
import type { DynamicValue } from 'typewritingclass'
import { createRule, createDynamicRule } from 'typewritingclass/rule'
import { isDynamic } from 'typewritingclass'

type GradientDirection =
  | 'to-t' | 'to-tr' | 'to-r' | 'to-br'
  | 'to-b' | 'to-bl' | 'to-l' | 'to-tl'

const directionMap: Record<GradientDirection, string> = {
  'to-t': 'to top',
  'to-tr': 'to top right',
  'to-r': 'to right',
  'to-br': 'to bottom right',
  'to-b': 'to bottom',
  'to-bl': 'to bottom left',
  'to-l': 'to left',
  'to-tl': 'to top left',
}

/**
 * Creates a linear gradient background.
 *
 * @param direction - The gradient direction (e.g., 'to-r', 'to-b').
 * @param from - Start color (string or DynamicValue).
 * @param to - End color (string or DynamicValue).
 */
export function gradient(
  direction: GradientDirection,
  from: string | DynamicValue,
  to: string | DynamicValue,
): StyleRule {
  const dir = directionMap[direction]
  const bindings: Record<string, string> = {}
  let fromStr: string
  let toStr: string

  if (isDynamic(from)) {
    bindings[from.__id] = String(from.__value)
    fromStr = `var(${from.__id})`
  } else {
    fromStr = from
  }

  if (isDynamic(to)) {
    bindings[to.__id] = String(to.__value)
    toStr = `var(${to.__id})`
  } else {
    toStr = to
  }

  const value = `linear-gradient(${dir}, ${fromStr}, ${toStr})`

  if (Object.keys(bindings).length > 0) {
    return createDynamicRule({ background: value }, bindings)
  }
  return createRule({ background: value })
}
```

Usage:

```ts
import { cx } from 'typewritingclass'
import { blue, purple } from 'typewritingclass/theme/colors'
import { gradient } from './gradient'

const banner = cx(gradient('to-r', blue[500], purple[600]))
// CSS: background: linear-gradient(to right, #3b82f6, #9333ea);
```

With dynamic colors:

```ts
import { dcx, dynamic } from 'typewritingclass'
import { gradient } from './gradient'

const userStart = dynamic('#ff0000')
const userEnd = dynamic('#0000ff')

const { className, style } = dcx(gradient('to-r', userStart, userEnd))
// CSS: background: linear-gradient(to right, var(--twc-d0), var(--twc-d1));
// style: { '--twc-d0': '#ff0000', '--twc-d1': '#0000ff' }
```
