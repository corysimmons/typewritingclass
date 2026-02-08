---
title: Strict Mode
description: Ensure maximum static extraction with strict mode.
sidebar:
  order: 4
---

Strict mode (enabled by default) ensures all style arguments can be statically evaluated at build time. If the compiler encounters a value it cannot resolve, it reports an error rather than silently falling back to runtime injection.

## What is statically evaluable?

| Expression | Static? |
|---|---|
| `p(4)`, `bg('blue-500')`, `rounded('lg')` | Yes |
| `tw.p(4).bg('blue-500')` | Yes |
| `when(hover)(bg('blue-600'))` | Yes |
| `dynamic(color)` | Yes (explicit opt-in) |
| `p(spacing)` where `spacing` is a variable | No |
| `isActive ? bg('blue') : bg('gray')` | No |

## Fixing strict mode errors

### Use `dynamic()` for runtime values

```ts
import { dcx, bg, dynamic } from 'typewritingclass'

function Card({ color }: { color: string }) {
  const { className, style } = dcx(bg(dynamic(color)))
  return <div className={className} style={style} />
}
```

### Inline known values

```ts
// Before (error):
const size = 4
cx(p(size))

// After:
cx(p(4))
```

### Predefine variants

```ts
const variants = {
  primary: tw.bg('blue-500').textColor('white'),
  danger: tw.bg('red-500').textColor('white'),
} as const

// No error -- picking a precomputed string
<span className={variants[variant]} />
```

### Use separate class strings for conditionals

```ts
const compact = tw.p(2)
const spacious = tw.p(6)
<div className={isCompact ? compact : spacious} />
```

## Disabling strict mode

```ts
// Vite
twcPlugin({ strict: false })

// esbuild
twcEsbuildPlugin({ strict: false })
```

```json
// Babel
{ "plugins": [["typewritingclass-babel", { "strict": false }]] }
```

Even with strict mode off, the compiler still extracts everything it can statically. Non-static arguments fall back to runtime.

## When to disable

- Migrating a large codebase incrementally.
- Rapid prototyping.
- Library code that passes parameters through to consumers.
