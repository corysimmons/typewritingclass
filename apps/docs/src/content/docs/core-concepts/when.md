---
title: Modifiers with when()
description: "Apply conditional styles with hover, responsive, dark mode, and more."
sidebar:
  order: 3
---

`when()` is the modifier composition function. It takes one or more **modifiers** and returns a function that wraps style rules with those conditions. The result is a `StyleRule` that only applies when all the specified conditions are met -- hover state, responsive breakpoint, dark mode, or any combination.

## Basic syntax

Pass a modifier and then call the returned function with one or more utility rules:

```ts
import { cx, bg, when, hover } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

cx(when(hover)(bg(blue[600])))
// CSS: ._abc:hover { background-color: #2563eb; }
```

The pattern is always:

```
when(<modifier>)(<...rules>)
```

`when()` returns a curried function. The first call selects the condition(s), the second call provides the rules to apply under those conditions.

---

## Multiple rules in one modifier

Pass multiple rules to apply them all under the same condition. They are merged into a single `StyleRule`:

```ts
import { cx, bg, shadow, textColor, when, hover } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'
import * as shadows from 'typewritingclass/theme/shadows'

cx(when(hover)(bg(blue[600]), shadow(shadows.lg), textColor(white)))
// CSS: ._abc:hover {
//   background-color: #2563eb;
//   box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), ...;
//   color: #ffffff;
// }
```

This is more efficient than calling `when()` separately for each rule -- it generates one CSS rule instead of three.

---

## Composing modifiers

Pass **multiple modifiers** to `when()` to create compound conditions. All conditions must be true simultaneously:

```ts
import { cx, bg, when, dark, hover } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

cx(when(dark, hover)(bg(blue[400])))
// CSS: @media (prefers-color-scheme: dark) {
//   ._abc:hover { background-color: #60a5fa; }
// }
```

Here, `bg(blue[400])` only applies when the user is in **dark mode AND hovering** the element. Both conditions must be satisfied.

Modifiers are applied **right-to-left** (innermost first). In `when(dark, hover)`, `hover` wraps the rule with a `:hover` selector first, then `dark` wraps the result in a `prefers-color-scheme: dark` media query.

More examples:

```ts
import { cx, bg, p, shadow, when, hover, focus, md, lg, dark } from 'typewritingclass'
import { blue, slate } from 'typewritingclass/theme/colors'
import * as shadows from 'typewritingclass/theme/shadows'

// Hover at medium breakpoint
cx(when(md, hover)(bg(blue[700]), shadow(shadows.xl)))
// @media (min-width: 768px) { ._abc:hover { ... } }

// Dark mode + focus state
cx(when(dark, focus)(bg(slate[700])))
// @media (prefers-color-scheme: dark) { ._abc:focus { ... } }

// Large breakpoint + dark mode + hover
cx(when(lg, dark, hover)(bg(blue[300])))
// @media (min-width: 1024px) {
//   @media (prefers-color-scheme: dark) {
//     ._abc:hover { background-color: #93c5fd; }
//   }
// }
```

---

## Partial application for reuse

Since `when()` returns a function, you can store it for reuse:

```ts
import { cx, bg, textColor, shadow, when, dark, hover, md } from 'typewritingclass'
import { blue, slate, white } from 'typewritingclass/theme/colors'
import * as shadows from 'typewritingclass/theme/shadows'

// Create reusable modifier combinations
const onDarkHover = when(dark, hover)
const onMedium = when(md)

// Use them across your codebase
const linkClass = cx(
  textColor(blue[600]),
  onDarkHover(textColor(blue[300])),
)

const cardClass = cx(
  bg(white),
  shadow(shadows.sm),
  onMedium(shadow(shadows.lg)),
  onDarkHover(bg(slate[800])),
)
```

This is particularly useful when a project has consistent interaction patterns repeated across many components.

---

## Available modifiers

### Pseudo-state modifiers

These add CSS pseudo-class selectors to the generated rule:

| Modifier | Selector | Description |
|----------|----------|-------------|
| `hover` | `:hover` | Mouse is over the element |
| `focus` | `:focus` | Element has keyboard or pointer focus |
| `active` | `:active` | Element is being pressed |
| `disabled` | `:disabled` | Form element is disabled |
| `focusVisible` | `:focus-visible` | Visible focus (typically keyboard navigation) |
| `focusWithin` | `:focus-within` | Element or a descendant has focus |
| `firstChild` | `:first-child` | Element is first child of its parent |
| `lastChild` | `:last-child` | Element is last child of its parent |

```ts
import { cx, bg, borderColor, opacity, ring, mt, mb, when,
         hover, focus, active, disabled, focusVisible, focusWithin,
         firstChild, lastChild } from 'typewritingclass'
import { blue, slate, gray } from 'typewritingclass/theme/colors'

// Hover -- change background on mouseover
cx(bg(blue[500]), when(hover)(bg(blue[600])))

// Focus -- highlight border when focused
cx(borderColor(gray[300]), when(focus)(borderColor(blue[500])))

// Active -- darken on press
cx(bg(blue[500]), when(active)(bg(blue[700])))

// Disabled -- reduce opacity when disabled
cx(opacity(1), when(disabled)(opacity(0.5)))

// Focus-visible -- show ring only on keyboard focus
cx(when(focusVisible)(ring()))

// Focus-within -- style parent when child input is focused
cx(borderColor(gray[200]), when(focusWithin)(borderColor(blue[500])))

// First/last child -- remove spacing on edges
cx(mt(4), when(firstChild)(mt('0')))
cx(mb(4), when(lastChild)(mb('0')))
```

### Responsive breakpoint modifiers

These wrap the rule in a `@media (min-width: ...)` query. See [Responsive Design](/core-concepts/responsive) for full details.

| Modifier | Breakpoint | Media Query |
|----------|-----------|-------------|
| `sm` | 640px | `@media (min-width: 640px)` |
| `md` | 768px | `@media (min-width: 768px)` |
| `lg` | 1024px | `@media (min-width: 1024px)` |
| `xl` | 1280px | `@media (min-width: 1280px)` |
| `_2xl` | 1536px | `@media (min-width: 1536px)` |

### Color scheme modifier

| Modifier | Media Query |
|----------|-------------|
| `dark` | `@media (prefers-color-scheme: dark)` |

See [Dark Mode](/core-concepts/dark-mode) for full details.

---

## How modifiers work internally

A **modifier** is just a function with this signature:

```ts
type Modifier = (rule: StyleRule) => StyleRule
```

It takes a `StyleRule` and returns a new `StyleRule` with additional selectors or media queries. For example, the `hover` modifier adds `':hover'` to the rule's `selectors` array:

```ts
import { p, hover } from 'typewritingclass'

const base = p(4)
// { _tag: 'StyleRule', declarations: { padding: '1rem' }, selectors: [], mediaQueries: [] }

const hovered = hover(base)
// { _tag: 'StyleRule', declarations: { padding: '1rem' }, selectors: [':hover'], mediaQueries: [] }
```

The `md` breakpoint modifier adds a media query string:

```ts
import { p, md } from 'typewritingclass'

const responsive = md(p(4))
// { _tag: 'StyleRule', declarations: { padding: '1rem' }, selectors: [], mediaQueries: ['(min-width: 768px)'] }
```

When you pass multiple modifiers to `when()`, they are composed **right-to-left** using `reduceRight`. This means the last modifier listed wraps the rule first, and the first modifier wraps the outermost layer:

```ts
import { p, when, dark, hover } from 'typewritingclass'

const rule = when(dark, hover)(p(4))
// Step 1: hover(p(4))       => selectors: [':hover'], mediaQueries: []
// Step 2: dark(step1)        => selectors: [':hover'], mediaQueries: ['(prefers-color-scheme: dark)']
```

---

## Using when() inside cx()

The most common pattern is using `when()` directly inside `cx()` alongside base styles:

```ts
import { cx, p, bg, textColor, shadow, rounded, when, hover, focus, md, dark } from 'typewritingclass'
import { blue, slate, white } from 'typewritingclass/theme/colors'
import * as shadows from 'typewritingclass/theme/shadows'
import * as borders from 'typewritingclass/theme/borders'

const button = cx(
  // Base styles
  p(4),
  bg(blue[500]),
  textColor(white),
  rounded(borders.md),
  shadow(shadows.sm),

  // Interactive states
  when(hover)(bg(blue[600]), shadow(shadows.md)),
  when(focus)(ring()),
  when(active)(bg(blue[700])),

  // Responsive adjustments
  when(md)(p(6)),

  // Dark mode
  when(dark)(bg(blue[600])),
  when(dark, hover)(bg(blue[500])),
)
```

Each `when()` call produces a `StyleRule` that `cx()` treats like any other rule -- it gets its own layer number, class name, and CSS output.

---

## Building custom modifiers

Since a modifier is just a `(StyleRule) => StyleRule` function, you can create your own:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'

// A modifier for :checked state
const checked: Modifier = (rule: StyleRule): StyleRule => ({
  ...rule,
  selectors: [...rule.selectors, ':checked'],
})

// A modifier for print media
const print: Modifier = (rule: StyleRule): StyleRule => ({
  ...rule,
  mediaQueries: [...rule.mediaQueries, 'print'],
})

// Use with when() just like built-in modifiers
import { cx, bg, display, when } from 'typewritingclass'

cx(
  when(checked)(bg('#22c55e')),
  when(print)(display('none')),
)
```

Custom modifiers compose with `when()` and with other modifiers identically to built-in ones.
