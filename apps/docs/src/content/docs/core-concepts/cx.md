---
title: Composing with cx()
description: "Combine multiple style rules into a single class string."
sidebar:
  order: 2
---

`cx()` is the core composition function in typewritingclass. It takes any number of `StyleRule` objects (returned by [utility functions](/core-concepts/utilities)) and plain string class names, registers each rule in the global stylesheet, and returns a single space-separated class string ready for any framework's `className` or `class` attribute.

## Basic usage

Pass utility function calls to `cx()`. Each one becomes a hashed, deterministic CSS class:

```ts
import { cx, p, bg, rounded } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'
import * as borders from 'typewritingclass/theme/borders'

const className = cx(p(4), bg(blue[500]), rounded(borders.lg))
// => "_a1b2c _d3e4f _g5h6i"
```

The generated CSS looks like:

```css
@layer l0 { ._a1b2c { padding: 1rem; } }
@layer l1 { ._d3e4f { background-color: #3b82f6; } }
@layer l2 { ._g5h6i { border-radius: 0.5rem; } }
```

Each rule is wrapped in its own `@layer`, numbered in the order they appear. This is the key to typewritingclass's override system.

---

## Override behavior

**Later arguments win.** When two rules set the same CSS property, the one that appears later in the `cx()` call takes priority. This works because later arguments get higher `@layer` numbers, which means higher CSS specificity regardless of selector specificity or source order elsewhere.

```ts
import { cx, p } from 'typewritingclass'

const className = cx(p(4), p(8))
// p(4) goes to layer 0, p(8) goes to layer 1
// layer 1 > layer 0, so padding: 2rem wins
```

Generated CSS:

```css
@layer l0 { ._a1b2c { padding: 1rem; } }
@layer l1 { ._d3e4f { padding: 2rem; } }
```

This makes composing component styles intuitive. Base styles go first, overrides go last:

```ts
import { cx, p, bg, rounded, textColor, font } from 'typewritingclass'
import { white, blue, slate } from 'typewritingclass/theme/colors'
import { semibold } from 'typewritingclass/theme/typography'
import * as borders from 'typewritingclass/theme/borders'

// Base button styles
const baseButton = [p(4), bg(blue[500]), textColor(white), rounded(borders.md), font(semibold)]

// Variant that overrides the background
const dangerButton = cx(...baseButton, bg('#dc2626'))
// bg('#dc2626') is last, so it overrides bg(blue[500])
```

---

## Mixing string class names

`cx()` passes plain strings through unchanged, so you can mix generated rules with hand-written or third-party class names:

```ts
import { cx, p, bg } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

cx('my-component', p(4), bg(white))
// => "my-component _a1b2c _d3e4f"
```

This is useful for:
- Adding semantic class names for testing (`data-testid` alternative)
- Combining with CSS Modules or global stylesheets
- Conditional classes from external libraries

```ts
import { cx, p, bg, textColor } from 'typewritingclass'
import { white, blue, slate } from 'typewritingclass/theme/colors'

function Card({ featured, className }: { featured?: boolean; className?: string }) {
  return (
    <div className={cx(
      p(4),
      bg(white),
      textColor(slate[900]),
      featured ? bg(blue[50]) : '',
      className ?? '',
    )}>
      {/* ... */}
    </div>
  )
}
```

Empty strings and falsy string values are harmless -- they just add an empty entry to the class list.

---

## Conflict detection in development mode

In development (`NODE_ENV !== 'production'`), `cx()` warns when multiple rules declare the same CSS property. This helps catch accidental duplicates:

```ts
import { cx, p } from 'typewritingclass'

cx(p(4), p(8))
// Console warning:
// [typewritingclass] cx() conflict: "padding" is set by arguments at index 0 and 1.
// The later value will override. If intentional, this warning can be ignored.
```

The warning is informational -- the code still works correctly (the later value wins). It is suppressed in production builds for zero overhead.

---

## Return value

`cx()` returns a plain `string`. This means it works with any framework or templating system that accepts class names:

### React / Preact

```tsx
import { cx, p, bg, rounded } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

function Card() {
  return <div className={cx(p(4), bg(white), rounded())}>{/* ... */}</div>
}
```

### Solid

```tsx
import { cx, p, bg, rounded } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

function Card() {
  return <div class={cx(p(4), bg(white), rounded())}>{/* ... */}</div>
}
```

### Vanilla JavaScript

```ts
import { cx, p, bg, rounded } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

const el = document.createElement('div')
el.className = cx(p(4), bg(white), rounded())
```

### Vue

```vue
<template>
  <div :class="cardClass">...</div>
</template>

<script setup>
import { cx, p, bg, rounded } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

const cardClass = cx(p(4), bg(white), rounded())
</script>
```

### Svelte

```svelte
<script>
  import { cx, p, bg, rounded } from 'typewritingclass'
  import { white } from 'typewritingclass/theme/colors'
</script>

<div class={cx(p(4), bg(white), rounded())}>...</div>
```

---

## Deterministic class names

Class name hashing is **deterministic**: the same `StyleRule` at the same layer always produces the same class name. This means:

1. **SSR and client agree.** Server-rendered HTML and client hydration produce identical class names with no mismatch.
2. **Builds are reproducible.** The same source code always generates the same CSS output.
3. **Caching is effective.** Identical rules across different components share the same CSS class -- no duplication.

```ts
import { cx, p } from 'typewritingclass'

// Called in component A
const a = cx(p(4))

// Called in component B -- same rule, same class name
const b = cx(p(4))

// a and b contain the same class string
```

---

## Performance characteristics

`cx()` is designed for high-throughput use:

- **O(n) in arguments**: Each argument is processed exactly once.
- **Hash-based deduplication**: If the same rule at the same layer is already registered, it is a no-op (the registry uses first-write-wins semantics).
- **No runtime style computation**: Utilities return static objects. The only work `cx()` does is hashing and registration.
- **Compiled away in production**: The build-time compiler can extract `cx()` calls into static CSS, replacing the runtime call with a string literal.

---

## Composing with modifiers

`cx()` accepts `StyleRule` objects from any source, including `when()` modifier calls:

```ts
import { cx, p, bg, shadow, when, hover, md } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'
import * as shadows from 'typewritingclass/theme/shadows'

const className = cx(
  p(4),
  bg(blue[500]),
  when(hover)(bg(blue[600]), shadow(shadows.lg)),
  when(md)(p(8)),
)
```

Generated CSS:

```css
@layer l0 { ._a1b2c { padding: 1rem; } }
@layer l1 { ._d3e4f { background-color: #3b82f6; } }
@layer l2 { ._g5h6i:hover { background-color: #2563eb; box-shadow: ...; } }
@layer l3 { @media (min-width: 768px) { ._j7k8l { padding: 2rem; } } }
```

See [Modifiers with when()](/core-concepts/when) for full details.

---

## Common patterns

### Component style functions

Define reusable style sets by wrapping `cx()` in a function:

```ts
import { cx, p, bg, textColor, rounded, font, when, hover } from 'typewritingclass'
import { white, blue } from 'typewritingclass/theme/colors'
import { semibold } from 'typewritingclass/theme/typography'
import * as borders from 'typewritingclass/theme/borders'

function buttonStyles(variant: 'primary' | 'secondary' = 'primary') {
  const base = [p(4), rounded(borders.md), font(semibold)]

  if (variant === 'primary') {
    return cx(...base, bg(blue[500]), textColor(white), when(hover)(bg(blue[600])))
  }

  return cx(...base, bg(white), textColor(blue[500]), when(hover)(bg(blue[50])))
}
```

### Conditional styles

Use standard JavaScript for conditional logic. No special API needed:

```ts
import { cx, p, bg, textColor, opacity } from 'typewritingclass'
import { white, blue, gray } from 'typewritingclass/theme/colors'

function cardStyles(isActive: boolean, isDisabled: boolean) {
  return cx(
    p(4),
    bg(white),
    textColor(gray[900]),
    isActive ? bg(blue[50]) : '',
    isDisabled ? opacity(0.5) : '',
  )
}
```

### Spreading base styles

Use array spread to compose predefined rule arrays:

```ts
import { cx, p, bg, rounded, shadow, textColor } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'

// Define as an array of StyleRules (not a cx() result)
const cardBase = [p(4), bg(white), rounded(), shadow()]

// Spread into cx() and add overrides
const prominentCard = cx(...cardBase, shadow('0 10px 30px rgba(0,0,0,0.15)'))
const mutedCard = cx(...cardBase, bg(slate[50]))
```
