---
title: Composing with cx()
description: "Combine multiple style rules into a single class string."
sidebar:
  order: 2
---

`cx()` is the functional composition API. It takes `StyleRule` objects and plain strings, and returns a space-separated class name string.

Most users will prefer the [tw chainable API](/core-concepts/tw/) instead. Use `cx()` when you need conditional logic, dynamic values, or prefer the functional style.

## Basic usage

```ts
import { cx, p, bg, rounded } from 'typewritingclass'

const className = cx(p(4), bg('blue-500'), rounded('lg'))
// => "_a1b2c _d3e4f _g5h6i"
```

## Override behavior

Later arguments win. Typewriting Class uses CSS `@layer` for deterministic ordering:

```ts
cx(p(4), p(8)) // p(8) wins -- padding: 2rem
```

## Mixing with strings

```ts
cx('my-component', p(4), bg('white'))
// => "my-component _a1b2c _d3e4f"
```

## Conditional styles

Use standard JavaScript for conditional logic:

```ts
cx(
  p(4),
  bg('white'),
  isActive ? bg('blue-50') : '',
  isDisabled ? opacity(0.5) : '',
)
```

## Composing with modifiers

```ts
import { cx, p, bg, shadow, when, hover, md } from 'typewritingclass'

cx(
  p(4),
  bg('blue-500'),
  when(hover)(bg('blue-600'), shadow('lg')),
  when(md)(p(8)),
)
```

## Spreading base styles

```ts
const cardBase = [p(4), bg('white'), rounded('lg'), shadow('sm')]

const blueCard = cx(...cardBase, bg('blue-50'))
const dangerCard = cx(...cardBase, bg('red-50'), textColor('red-900'))
```
