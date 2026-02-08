---
title: "Writing Modifiers"
description: "Create custom modifier functions for conditional styles."
sidebar:
  order: 3
---

A modifier is a function that takes a `StyleRule` and returns a new `StyleRule` with additional selectors or media queries. This page covers creating custom pseudo-state modifiers, media query modifiers, and composing them with `when()`.

## Recap: the Modifier signature

```ts
import type { Modifier, StyleRule } from 'typewritingclass'

type Modifier = (rule: StyleRule) => StyleRule
```

A modifier does not modify the CSS declarations. It copies the rule and appends a selector (for pseudo-classes/pseudo-elements) or a media query (for responsive/preference conditions) to the appropriate array on the `StyleRule`.

## Building blocks

Typewriting Class provides two internal functions for constructing modifiers:

- **`wrapWithSelector(rule, selector)`** -- appends a CSS selector string (e.g., `':hover'`, `'::before'`) to the rule's `selectors` array.
- **`wrapWithMediaQuery(rule, query)`** -- appends a media query string (e.g., `'(min-width: 768px)'`) to the rule's `mediaQueries` array.

Both return a new `StyleRule` without mutating the original.

## Custom pseudo-state modifiers

### Single pseudo-class

The simplest modifier wraps a rule with a single pseudo-class:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithSelector } from 'typewritingclass/rule'

export const visited: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, ':visited')

export const checked: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, ':checked')

export const placeholder: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, '::placeholder')

export const selection: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, '::selection')
```

Usage:

```ts
import { cx, when, textColor, bg } from 'typewritingclass'
import { visited, selection } from './my-modifiers'

const link = cx(
  textColor('#3b82f6'),
  when(visited)(textColor('#7c3aed')),
)
// CSS: .abc { color: #3b82f6; }
//      .def:visited { color: #7c3aed; }

const content = cx(
  when(selection)(bg('#dbeafe'), textColor('#1e3a5f')),
)
// CSS: .ghi::selection { background-color: #dbeafe; color: #1e3a5f; }
```

### Structural pseudo-classes

You can create modifiers for any CSS pseudo-class, including functional ones:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithSelector } from 'typewritingclass/rule'

export const odd: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, ':nth-child(odd)')

export const even: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, ':nth-child(even)')

export function nthChild(n: string): Modifier {
  return (rule: StyleRule) =>
    wrapWithSelector(rule, `:nth-child(${n})`)
}
```

Notice that `nthChild` is a **modifier factory** -- a function that returns a modifier. This is the pattern to use when the modifier itself needs a parameter:

```ts
import { cx, when, bg } from 'typewritingclass'
import { odd, even, nthChild } from './my-modifiers'

const listItem = cx(
  bg('#ffffff'),
  when(odd)(bg('#f9fafb')),
)
// CSS: .abc { background-color: #ffffff; }
//      .def:nth-child(odd) { background-color: #f9fafb; }

const thirdItem = cx(
  when(nthChild('3n'))(bg('#dbeafe')),
)
// CSS: .ghi:nth-child(3n) { background-color: #dbeafe; }
```

### Parent and sibling selectors

Modifiers are not limited to pseudo-classes. You can use any CSS selector suffix:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithSelector } from 'typewritingclass/rule'

// Styles apply when a parent has the `.dark` class
export const darkClass: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, '.dark &')

// Styles apply to direct children
export const child: (selector: string) => Modifier = (selector) =>
  (rule: StyleRule) => wrapWithSelector(rule, ` > ${selector}`)

// Styles apply when preceded by a sibling
export const afterSibling: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, ' + &')
```

## Custom media query modifiers

### Breakpoints

Create custom breakpoint modifiers for any screen size:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithMediaQuery } from 'typewritingclass/rule'

export const tablet: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(min-width: 600px) and (max-width: 1023px)')

export const desktop: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(min-width: 1024px)')

export const widescreen: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(min-width: 1920px)')
```

Usage:

```ts
import { cx, when, p, gap } from 'typewritingclass'
import { tablet, desktop, widescreen } from './my-modifiers'

const layout = cx(
  p(4),
  gap(2),
  when(tablet)(p(6), gap(4)),
  when(desktop)(p(8), gap(6)),
  when(widescreen)(p(12), gap(8)),
)
```

### Custom breakpoint factory

If your project uses a custom set of breakpoints, create a factory:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithMediaQuery } from 'typewritingclass/rule'

export function minWidth(px: number): Modifier {
  return (rule: StyleRule) =>
    wrapWithMediaQuery(rule, `(min-width: ${px}px)`)
}

export function maxWidth(px: number): Modifier {
  return (rule: StyleRule) =>
    wrapWithMediaQuery(rule, `(max-width: ${px}px)`)
}

export function between(minPx: number, maxPx: number): Modifier {
  return (rule: StyleRule) =>
    wrapWithMediaQuery(rule, `(min-width: ${minPx}px) and (max-width: ${maxPx}px)`)
}
```

Usage:

```ts
import { cx, when, p } from 'typewritingclass'
import { minWidth, between } from './my-modifiers'

const content = cx(
  p(4),
  when(minWidth(1400))(p(12)),
  when(between(600, 900))(p(6)),
)
```

### Preference queries

Create modifiers for user preferences beyond dark mode:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithMediaQuery } from 'typewritingclass/rule'

export const reducedMotion: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(prefers-reduced-motion: reduce)')

export const highContrast: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(prefers-contrast: high)')

export const print: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, 'print')

export const landscape: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(orientation: landscape)')

export const portrait: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(orientation: portrait)')

export const coarsePointer: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(pointer: coarse)')

export const finePointer: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(rule, '(pointer: fine)')
```

Usage:

```ts
import { cx, css, when } from 'typewritingclass'
import { reducedMotion, print, highContrast } from './my-modifiers'

const animated = cx(
  css`transition: transform 0.3s ease;`,
  when(reducedMotion)(css`transition: none;`),
)

const content = cx(
  bg('#ffffff'),
  when(print)(bg('transparent'), css`color: black;`),
)

const border = cx(
  borderColor('#e5e7eb'),
  when(highContrast)(borderColor('#000000'), css`border-width: 2px;`),
)
```

## Composability with `when()`

All custom modifiers compose naturally with `when()`, just like the built-in ones. You can stack multiple modifiers:

```ts
import { cx, when, bg, p, hover } from 'typewritingclass'
import { desktop, reducedMotion } from './my-modifiers'

const card = cx(
  p(4),
  bg('#ffffff'),
  // Hover effect only on desktop
  when(hover, desktop)(bg('#f3f4f6')),
  // Disable transitions for reduced motion
  when(reducedMotion)(css`transition: none;`),
)
```

When `when()` receives multiple modifiers, it applies them right-to-left. So `when(hover, desktop)` means "at the desktop breakpoint, on hover" -- the rule is first wrapped in `desktop` (adding the media query), then in `hover` (adding the pseudo-class):

```css
@media (min-width: 1024px) {
  ._abc:hover { background-color: #f3f4f6; }
}
```

### Custom modifiers as `when()` arguments

Since your modifiers satisfy the `Modifier` type, they are interchangeable with built-in ones in `when()` calls:

```ts
import { cx, when, bg, textColor, hover, md } from 'typewritingclass'
import { reducedMotion, finePointer } from './my-modifiers'

const button = cx(
  bg('#3b82f6'),
  textColor('#ffffff'),
  // Only animate on hover, for desktop-like devices with fine pointers
  when(hover, finePointer)(
    bg('#2563eb'),
    css`transform: translateY(-1px); transition: all 0.15s ease;`,
  ),
  // Remove animation for reduced motion preference
  when(reducedMotion)(
    css`transition: none; transform: none;`,
  ),
)
```

## Building compound modifiers

You can compose modifiers into new modifiers that combine multiple conditions:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithSelector, wrapWithMediaQuery } from 'typewritingclass/rule'

// Hover only on devices with a fine pointer (not touch)
export const hoverFine: Modifier = (rule: StyleRule) =>
  wrapWithMediaQuery(wrapWithSelector(rule, ':hover'), '(pointer: fine)')

// Focus styles only when keyboard-navigating
export const keyboardFocus: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, ':focus-visible:not(:hover)')
```

Usage:

```ts
import { cx, when, bg } from 'typewritingclass'
import { hoverFine, keyboardFocus } from './my-modifiers'

const interactive = cx(
  bg('#3b82f6'),
  when(hoverFine)(bg('#2563eb')),
  when(keyboardFocus)(css`outline: 2px solid #60a5fa; outline-offset: 2px;`),
)
```

Generated CSS:

```css
._abc { background-color: #3b82f6; }
@media (pointer: fine) { ._def:hover { background-color: #2563eb; } }
._ghi:focus-visible:not(:hover) { outline: 2px solid #60a5fa; outline-offset: 2px; }
```

## Container query modifiers

Use `wrapWithMediaQuery` with `@container` syntax for container query support:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithMediaQuery } from 'typewritingclass/rule'

export function containerMin(name: string, minWidth: string): Modifier {
  return (rule: StyleRule) =>
    wrapWithMediaQuery(rule, `(min-width: ${minWidth})`)
  // Note: container query syntax depends on your browser targets.
  // You may need to adjust the output format.
}
```

## Complete example: a responsive utilities module

```ts
// responsive.ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithMediaQuery, wrapWithSelector } from 'typewritingclass/rule'

// Breakpoints for a custom design system
export const mobile: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(max-width: 639px)')

export const tablet: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(min-width: 640px) and (max-width: 1023px)')

export const desktop: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(min-width: 1024px)')

export const wide: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(min-width: 1440px)')

// Preference modifiers
export const reducedMotion: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(prefers-reduced-motion: reduce)')

export const print: Modifier = (rule) =>
  wrapWithMediaQuery(rule, 'print')

// Interaction modifiers
export const hoverCapable: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(hover: hover)')

export const touchDevice: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(hover: none) and (pointer: coarse)')
```

Usage:

```ts
import { cx, when, p, gap, css } from 'typewritingclass'
import { mobile, tablet, desktop, wide, reducedMotion, print } from './responsive'

const page = cx(
  p(4),
  gap(2),
  when(tablet)(p(6), gap(4)),
  when(desktop)(p(8), gap(6)),
  when(wide)(p(12), gap(8)),
  when(mobile)(css`font-size: 14px;`),
  when(print)(css`background: none; color: black;`),
  when(reducedMotion)(css`animation: none; transition: none;`),
)
```
