---
title: Strict Mode
description: Ensure maximum static extraction with strict mode.
sidebar:
  order: 4
---

Strict mode is a compiler feature that ensures all `cx()` arguments can be statically evaluated at build time. It is enabled by default in all three compiler plugins (Vite, esbuild, Babel). When the compiler encounters a `cx()` argument that it cannot resolve to a concrete CSS value, it reports an error instead of silently falling back to runtime evaluation.

## Why strict mode exists

The core value proposition of Typewriting Class is that styles are extracted at build time into static CSS -- zero runtime, no style injection, no FOUC. But if a `cx()` argument contains a variable that the compiler cannot evaluate, it must either:

1. **Error** and tell you to fix the code, or
2. **Silently skip** the argument and leave it as a runtime call.

Option 2 is dangerous because you would not know that some styles are being generated at runtime instead of extracted. Your bundle would silently include runtime style injection code, and performance would degrade without any visible warning.

Strict mode chooses option 1. It makes the boundary between static and dynamic explicit and intentional.

## What strict mode checks

The compiler tries to statically evaluate every argument passed to `cx()`. An argument is "statically evaluable" if the compiler can determine its exact CSS output at build time. This includes:

- **Literal utility calls:** `p(4)`, `bg(blue[500])`, `rounded('lg')`
- **Theme token references:** `blue[500]`, `white`, `slate[200]`
- **Modifier compositions:** `when(hover)(bg(blue[600]))`, `when(md)(p(8))`
- **String literals:** `'my-class'`, `'custom-component'`
- **Calls to `dynamic()`:** The compiler recognizes `dynamic()` as an explicit opt-in to runtime values.

An argument is **not** statically evaluable if it is:

- **A variable:** `cx(p(spacing))` where `spacing` is a function parameter or local variable.
- **A function call result:** `cx(p(getSpacing()))` where `getSpacing()` is an arbitrary function.
- **A conditional expression:** `cx(isLarge ? p(8) : p(4))` (the compiler cannot choose a branch).
- **A spread of a non-literal array:** `cx(...styles)` where `styles` is a variable.

## Error messages

When strict mode detects a non-static argument, the error message explains what happened and how to fix it:

```
Cannot statically evaluate argument to cx() — wrap dynamic values in dynamic()
```

This appears in:

- **Vite:** The error overlay in the browser and the terminal.
- **esbuild:** The terminal with file, line, and column location.
- **Babel:** The console with `[typewritingclass] ERROR` prefix.

### Example: variable reference

```ts
// This causes a strict mode error:
function Card({ spacing }: { spacing: number }) {
  return <div className={cx(p(spacing))} />
  //                        ^^^^^^^^^^
  // ERROR: Cannot statically evaluate argument to cx()
}
```

The compiler cannot know the value of `spacing` at build time because it is a runtime parameter.

### Example: conditional expression

```ts
// This causes a strict mode error:
const padding = isCompact ? p(2) : p(6)
const className = cx(padding)
//                   ^^^^^^^
// ERROR: Cannot statically evaluate argument to cx()
```

The compiler cannot evaluate the ternary because `isCompact` is a runtime value.

## How to fix strict mode errors

### Option 1: Use dynamic() for truly dynamic values

If the value genuinely changes at runtime, wrap it with `dynamic()` and switch from `cx()` to `dcx()`:

```ts
import { dcx, p, bg, dynamic } from 'typewritingclass'

function Card({ color }: { color: string }) {
  // Before (strict mode error):
  // cx(bg(color))

  // After (explicit dynamic value):
  const { className, style } = dcx(bg(dynamic(color)))
  return <div className={className} style={style} />
}
```

This tells the compiler: "I know this value is dynamic -- generate a CSS custom property reference and handle it at runtime." The compiler emits `background-color: var(--twc-d0)` in the CSS and the actual color is applied through an inline style.

### Option 2: Move the static value inline

If the value is actually known at build time but written in a way the compiler cannot trace, inline it:

```ts
// Before (strict mode error):
const size = 4
cx(p(size))

// After (statically evaluable):
cx(p(4))
```

### Option 3: Use conditional class names with when()

Instead of a ternary, use the `when()` modifier for conditional styles:

```ts
// Before (strict mode error):
const padding = isCompact ? p(2) : p(6)
cx(padding)

// After (two static rules, toggled at runtime):
// Option A: use CSS, not JS, for the condition
cx(p(6), when(md)(p(2)))

// Option B: use two class strings and toggle in JS
const compact = cx(p(2))
const spacious = cx(p(6))
<div className={isCompact ? compact : spacious} />
```

Option B works because each `cx()` call contains only static arguments. The conditional happens at the class name string level, not inside `cx()`.

### Option 4: Predefine variants as constants

If you have a known set of variants, define them as constants:

```ts
import { cx, p, bg, rounded } from 'typewritingclass'
import { blue, green, red } from 'typewritingclass/theme/colors'

// All statically evaluable — the compiler extracts these at build time
const variants = {
  primary: cx(bg(blue[500])),
  success: cx(bg(green[500])),
  danger: cx(bg(red[500])),
} as const

function Badge({ variant }: { variant: keyof typeof variants }) {
  // No strict mode error — we're just picking a precomputed string
  return <span className={`${cx(p(2), rounded('full'))} ${variants[variant]}`} />
}
```

## When to turn strict mode off

Disable strict mode by passing `{ strict: false }` to the compiler plugin:

```ts
// Vite
twcPlugin({ strict: false })

// esbuild
twcEsbuildPlugin({ strict: false })
```

```json
// Babel
{
  "plugins": [
    ["typewritingclass-babel", { "strict": false }]
  ]
}
```

You might turn it off when:

- **Migrating a large codebase** where many callsites use variables in `cx()` and you want to convert them incrementally.
- **Rapid prototyping** where you prioritize speed of development over optimal extraction.
- **Library code** that intentionally passes parameters through to `cx()`, with the expectation that consumer projects perform the static extraction.

Even with strict mode off, the compiler still attempts to statically extract every argument it can. Arguments it cannot evaluate are left as runtime calls, and the fallback `typewritingclass/inject` module handles them in the browser.

## Strict mode and dynamic()

The `dynamic()` function is the escape hatch from strict mode. When the compiler sees `dynamic()`, it knows the value is intentionally runtime-dynamic and does not report an error:

```ts
import { dcx, bg, p, dynamic } from 'typewritingclass'

function UserAvatar({ themeColor }: { themeColor: string }) {
  // No strict mode error — dynamic() explicitly opts out of static extraction
  const { className, style } = dcx(
    p(4),           // static: extracted at build time
    bg(dynamic(themeColor)), // dynamic: CSS custom property at runtime
  )
  return <div className={className} style={style} />
}
```

The rule of thumb: if the value is known at build time, keep it static. If it comes from props, state, an API, or user input, wrap it in `dynamic()`.

## How the compiler evaluates arguments

The Rust compiler performs a limited form of constant folding and value tracing to evaluate `cx()` arguments:

| Expression | Evaluable? | Notes |
|---|---|---|
| `p(4)` | Yes | Literal number argument to a known utility. |
| `bg(blue[500])` | Yes | Theme token access with literal key. |
| `rounded('lg')` | Yes | Literal string argument. |
| `when(hover)(bg(blue[600]))` | Yes | Known modifier with static inner rule. |
| `'my-class'` | Yes | Plain string literal. |
| `bg(dynamic(color))` | Yes | `dynamic()` is recognized as an explicit runtime value. |
| `p(spacing)` | No | `spacing` is a variable -- value unknown at build time. |
| `bg(getColor())` | No | Arbitrary function call -- result unknown at build time. |
| `isActive ? bg(blue[500]) : bg(gray[500])` | No | Conditional expression -- branch unknown at build time. |

## Summary

| Aspect | Strict Mode ON (default) | Strict Mode OFF |
|---|---|---|
| Non-static `cx()` args | Compile error | Silent runtime fallback |
| Static `cx()` args | Extracted to CSS | Extracted to CSS |
| `dynamic()` values | Allowed (CSS custom property) | Allowed (CSS custom property) |
| Runtime CSS injection | Never (for static args) | May happen silently |
| Recommended for | Production apps, new projects | Migrations, prototyping |

Strict mode is the recommended default. It ensures that you always know exactly which styles are static and which are dynamic, making performance characteristics predictable and explicit.
