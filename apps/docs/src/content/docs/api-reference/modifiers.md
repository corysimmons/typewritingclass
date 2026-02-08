---
title: Modifiers
description: Complete reference for all built-in modifier functions.
sidebar:
  order: 3
---

Modifiers are functions that transform a `StyleRule` by wrapping it with a pseudo-class selector or a media query. Every modifier satisfies the `Modifier` type signature:

```ts
type Modifier = (rule: StyleRule) => StyleRule
```

Modifiers are composable. You chain them via `when()` to build multi-condition rules, and they work identically with every utility in the library.

## Using modifiers

Modifiers are always applied through the `when()` function:

```ts
import { cx, bg, when, hover } from 'typewritingclass'

cx(when(hover)(bg('#2563eb')))
// CSS: .cls:hover { background-color: #2563eb; }
```

You can stack multiple modifiers in a single `when()` call. They are applied right-to-left (the first modifier is innermost):

```ts
import { cx, bg, when, hover, md } from 'typewritingclass'

cx(when(hover, md)(bg('#1d4ed8')))
// CSS:
//   @media (min-width: 768px) {
//     .cls:hover { background-color: #1d4ed8; }
//   }
```

Multiple rules can be passed to the returned function. They are merged into a single combined rule:

```ts
import { cx, bg, textColor, p, when, hover } from 'typewritingclass'

cx(when(hover)(bg('#1d4ed8'), textColor('#ffffff'), p(8)))
// CSS: .cls:hover { background-color: #1d4ed8; color: #ffffff; padding: 2rem; }
```

---

## Pseudo-state modifiers

Pseudo-state modifiers add CSS pseudo-class selectors to a `StyleRule`. They append the selector to the generated class name (e.g. `.cls:hover`).

### hover

Applies styles when the element is hovered with a pointer device.

**Type:** `Modifier`
**Selector:** `:hover`

```ts
import { cx, bg, textColor, when, hover } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

cx(bg(blue[500]), when(hover)(bg(blue[600])))
// CSS:
//   .cls1 { background-color: #3b82f6; }
//   .cls2:hover { background-color: #2563eb; }
```

Common use cases: button hover effects, link color changes, card elevation on hover.

```ts
import { cx, shadow, when, hover } from 'typewritingclass'
import { md, lg } from 'typewritingclass/theme/shadows'

// Card with shadow lift on hover
cx(shadow(md), when(hover)(shadow(lg)))
```

### focus

Applies styles when the element has keyboard or pointer focus.

**Type:** `Modifier`
**Selector:** `:focus`

```ts
import { cx, borderColor, when, focus } from 'typewritingclass'
import { blue, gray } from 'typewritingclass/theme/colors'

cx(borderColor(gray[300]), when(focus)(borderColor(blue[500])))
// CSS:
//   .cls1 { border-color: #d1d5db; }
//   .cls2:focus { border-color: #3b82f6; }
```

Common use cases: input field focus states, button focus rings.

```ts
import { cx, ring, border, borderColor, when, focus } from 'typewritingclass'

// Input with focus ring
cx(
  border(),
  borderColor('#d1d5db'),
  when(focus)(borderColor('#3b82f6'), ring('2px', '#3b82f6')),
)
```

### active

Applies styles when the element is being actively pressed.

**Type:** `Modifier`
**Selector:** `:active`

```ts
import { cx, bg, when, active } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

cx(bg(blue[500]), when(active)(bg(blue[700])))
// CSS:
//   .cls1 { background-color: #3b82f6; }
//   .cls2:active { background-color: #1d4ed8; }
```

Common use cases: button press effect, click feedback.

```ts
import { cx, bg, css, when, hover, active } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

// Button with full interaction states
cx(
  bg(blue[500]),
  when(hover)(bg(blue[600])),
  when(active)(bg(blue[700]), css({ transform: 'scale(0.98)' })),
)
```

### disabled

Applies styles when the element is disabled.

**Type:** `Modifier`
**Selector:** `:disabled`

```ts
import { cx, opacity, cursor, when, disabled } from 'typewritingclass'

cx(opacity(1), when(disabled)(opacity(0.5), cursor('not-allowed')))
// CSS:
//   .cls1 { opacity: 1; }
//   .cls2:disabled { opacity: 0.5; cursor: not-allowed; }
```

Common use cases: form controls, buttons.

```ts
import { cx, bg, textColor, opacity, cursor, pointerEvents, when, disabled } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

// Button that visually and functionally disables
cx(
  bg(blue[500]),
  textColor(white),
  cursor('pointer'),
  when(disabled)(
    opacity(0.5),
    cursor('not-allowed'),
    pointerEvents('none'),
  ),
)
```

### focusVisible

Applies styles only when the element has visible focus, typically from keyboard navigation.

**Type:** `Modifier`
**Selector:** `:focus-visible`

Unlike `focus`, this only matches when the user agent determines that focus should be visibly indicated (e.g. keyboard navigation, not mouse clicks). This is the recommended modifier for focus ring styles.

```ts
import { cx, ring, when, focusVisible } from 'typewritingclass'

cx(when(focusVisible)(ring('2px', '#3b82f6')))
// CSS: .cls:focus-visible { box-shadow: 0 0 0 2px #3b82f6; }
```

Common use cases: accessible focus indicators that only appear during keyboard navigation.

```ts
import { cx, ring, css, when, focusVisible } from 'typewritingclass'

// Accessible focus ring with outline offset
cx(when(focusVisible)(
  ring('2px', '#3b82f6'),
  css({ 'outline': 'none' }),
))
```

### focusWithin

Applies styles when the element or any of its descendants has focus.

**Type:** `Modifier`
**Selector:** `:focus-within`

```ts
import { cx, borderColor, when, focusWithin } from 'typewritingclass'
import { blue, gray } from 'typewritingclass/theme/colors'

cx(borderColor(gray[300]), when(focusWithin)(borderColor(blue[500])))
// CSS:
//   .cls1 { border-color: #d1d5db; }
//   .cls2:focus-within { border-color: #3b82f6; }
```

Common use cases: styling a parent container when a child input receives focus.

```ts
import { cx, border, borderColor, shadow, when, focusWithin } from 'typewritingclass'
import { blue, gray } from 'typewritingclass/theme/colors'

// Form field wrapper that highlights when any input inside is focused
cx(
  border(),
  borderColor(gray[200]),
  when(focusWithin)(
    borderColor(blue[500]),
    shadow('0 0 0 3px rgba(59, 130, 246, 0.1)'),
  ),
)
```

### firstChild

Applies styles only when the element is the first child of its parent.

**Type:** `Modifier`
**Selector:** `:first-child`

```ts
import { cx, mt, when, firstChild } from 'typewritingclass'

cx(mt(4), when(firstChild)(mt(0)))
// CSS:
//   .cls1 { margin-top: 1rem; }
//   .cls2:first-child { margin-top: 0; }
```

Common use cases: removing top margin or border from the first item in a list.

```ts
import { cx, pt, borderT, when, firstChild } from 'typewritingclass'

// List items with dividers, except the first
cx(pt(4), borderT(), when(firstChild)(pt(0), borderT('0')))
```

### lastChild

Applies styles only when the element is the last child of its parent.

**Type:** `Modifier`
**Selector:** `:last-child`

```ts
import { cx, mb, when, lastChild } from 'typewritingclass'

cx(mb(4), when(lastChild)(mb(0)))
// CSS:
//   .cls1 { margin-bottom: 1rem; }
//   .cls2:last-child { margin-bottom: 0; }
```

Common use cases: removing bottom margin or border from the last item in a list.

```ts
import { cx, pb, borderB, when, lastChild } from 'typewritingclass'

// List items with dividers, except the last
cx(pb(4), borderB(), when(lastChild)(pb(0), borderB('0')))
```

---

## Responsive breakpoint modifiers

Responsive modifiers wrap a `StyleRule` in a `@media` query using a mobile-first `min-width` approach. Styles without a breakpoint modifier apply at all screen sizes. Each breakpoint modifier adds styles that take effect at that breakpoint and above.

| Modifier | Breakpoint | Media query |
|----------|-----------|-------------|
| `sm` | 640px | `@media (min-width: 640px)` |
| `md` | 768px | `@media (min-width: 768px)` |
| `lg` | 1024px | `@media (min-width: 1024px)` |
| `xl` | 1280px | `@media (min-width: 1280px)` |
| `_2xl` | 1536px | `@media (min-width: 1536px)` |

### sm

Applies styles at the small breakpoint and above (640px).

**Type:** `Modifier`
**Media query:** `@media (min-width: 640px)`

```ts
import { cx, p, when, sm } from 'typewritingclass'

cx(p(2), when(sm)(p(4)))
// CSS:
//   .cls1 { padding: 0.5rem; }
//   @media (min-width: 640px) { .cls2 { padding: 1rem; } }
```

### md

Applies styles at the medium breakpoint and above (768px).

**Type:** `Modifier`
**Media query:** `@media (min-width: 768px)`

```ts
import { cx, gridCols, when, md } from 'typewritingclass'

cx(gridCols(1), when(md)(gridCols(2)))
// CSS:
//   .cls1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
//   @media (min-width: 768px) { .cls2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
```

### lg

Applies styles at the large breakpoint and above (1024px).

**Type:** `Modifier`
**Media query:** `@media (min-width: 1024px)`

```ts
import { cx, maxW, when, lg } from 'typewritingclass'

cx(maxW('100%'), when(lg)(maxW('1024px')))
// CSS:
//   .cls1 { max-width: 100%; }
//   @media (min-width: 1024px) { .cls2 { max-width: 1024px; } }
```

### xl

Applies styles at the extra-large breakpoint and above (1280px).

**Type:** `Modifier`
**Media query:** `@media (min-width: 1280px)`

```ts
import { cx, maxW, when, xl } from 'typewritingclass'

cx(maxW('100%'), when(xl)(maxW('1280px')))
// CSS:
//   .cls1 { max-width: 100%; }
//   @media (min-width: 1280px) { .cls2 { max-width: 1280px; } }
```

### _2xl

Applies styles at the 2x-large breakpoint and above (1536px).

**Type:** `Modifier`
**Media query:** `@media (min-width: 1536px)`

:::note
Exported as `_2xl` because JavaScript identifiers cannot start with a digit.
:::

```ts
import { cx, maxW, when, _2xl } from 'typewritingclass'

cx(maxW('100%'), when(_2xl)(maxW('1536px')))
// CSS:
//   .cls1 { max-width: 100%; }
//   @media (min-width: 1536px) { .cls2 { max-width: 1536px; } }
```

### Responsive composition patterns

#### Progressive enhancement

Build up styles from mobile to desktop:

```ts
import { cx, p, gap, flexCol, flexRow, gridCols, when, sm, md, lg, xl } from 'typewritingclass'

const layout = cx(
  flexCol(),           // Mobile: single column
  gap(4),              // Mobile: small gap
  p(4),                // Mobile: small padding
  when(sm)(gap(6)),    // 640px+: larger gap
  when(md)(flexRow()), // 768px+: switch to row
  when(lg)(p(8)),      // 1024px+: larger padding
  when(xl)(gap(8)),    // 1280px+: largest gap
)
```

#### Responsive grid

```ts
import { cx, grid, gridCols, gap, when, sm, md, lg } from 'typewritingclass'

const responsiveGrid = cx(
  grid(),
  gap(4),
  gridCols(1),                    // Mobile: 1 column
  when(sm)(gridCols(2)),          // 640px+: 2 columns
  when(md)(gridCols(3), gap(6)),  // 768px+: 3 columns, larger gap
  when(lg)(gridCols(4), gap(8)),  // 1024px+: 4 columns, largest gap
)
```

#### Responsive typography

```ts
import { cx, text, when, md, lg } from 'typewritingclass'
import { base, lg as textLg, _2xl } from 'typewritingclass/theme/typography'

const heading = cx(
  text(base),
  when(md)(text(textLg)),
  when(lg)(text(_2xl)),
)
```

---

## Color scheme modifier

### dark

Applies styles only when the user's operating system or browser is set to a dark color scheme.

**Type:** `Modifier`
**Media query:** `@media (prefers-color-scheme: dark)`

This responds to the user's system-level preference, not a manual theme toggle. For manual theme switching, see the [Theme API](/api-reference/theme).

```ts
import { cx, bg, textColor, when, dark } from 'typewritingclass'

cx(
  bg('#ffffff'),
  textColor('#111827'),
  when(dark)(bg('#111827'), textColor('#f9fafb')),
)
// CSS:
//   .cls1 { background-color: #ffffff; }
//   .cls2 { color: #111827; }
//   @media (prefers-color-scheme: dark) {
//     .cls3 { background-color: #111827; color: #f9fafb; }
//   }
```

#### Dark mode patterns

Full component with dark mode:

```ts
import { cx, bg, textColor, borderColor, border, shadow, p, rounded, when, dark } from 'typewritingclass'
import { white, gray, slate } from 'typewritingclass/theme/colors'

const card = cx(
  bg(white),
  textColor(gray[900]),
  border(),
  borderColor(gray[200]),
  shadow(),
  p(6),
  rounded('0.5rem'),
  when(dark)(
    bg(slate[800]),
    textColor(slate[100]),
    borderColor(slate[700]),
  ),
)
```

Combining dark mode with hover:

```ts
import { cx, bg, when, hover, dark } from 'typewritingclass'
import { gray, slate } from 'typewritingclass/theme/colors'

const listItem = cx(
  bg('transparent'),
  when(hover)(bg(gray[100])),
  when(dark)(bg('transparent')),
  when(dark, hover)(bg(slate[700])),
)
// The (dark, hover) combination produces:
//   @media (prefers-color-scheme: dark) {
//     .cls:hover { background-color: #334155; }
//   }
```

---

## Modifier composition

### Stacking modifiers

When multiple modifiers are passed to `when()`, they are applied right-to-left. The first modifier is innermost (closest to the element), and the last modifier is outermost:

```ts
import { cx, bg, when, hover, md } from 'typewritingclass'

// hover is inner, md is outer
cx(when(hover, md)(bg('#1d4ed8')))
// CSS:
//   @media (min-width: 768px) {
//     .cls:hover { background-color: #1d4ed8; }
//   }
```

The order matters -- `when(hover, md)` means "at the `md` breakpoint, on hover". Reversing the order to `when(md, hover)` would mean "on hover, wrapped in the `md` media query", which produces the same CSS in this case but conceptually reads differently.

### Combining responsive and pseudo-state

```ts
import { cx, bg, textColor, p, when, hover, focus, md, lg } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const button = cx(
  p(3),
  bg(blue[500]),
  textColor('#ffffff'),
  when(hover)(bg(blue[600])),            // Hover at all sizes
  when(focus)(bg(blue[700])),            // Focus at all sizes
  when(md)(p(4)),                        // Larger padding at md
  when(hover, md)(bg(blue[700])),        // Different hover color at md
  when(hover, lg)(bg(blue[800])),        // Different hover color at lg
)
```

### Combining dark mode and responsive

```ts
import { cx, bg, textColor, when, dark, md } from 'typewritingclass'
import { gray, slate } from 'typewritingclass/theme/colors'

cx(
  bg('#ffffff'),
  textColor(gray[900]),
  when(dark)(bg(slate[900]), textColor(slate[100])),
  when(md)(bg(gray[50])),
  when(dark, md)(bg(slate[800])),
)
// The (dark, md) combination produces:
//   @media (min-width: 768px) {
//     @media (prefers-color-scheme: dark) {
//       .cls { background-color: #1e293b; }
//     }
//   }
```

---

## Creating custom modifiers

Since `Modifier` is simply a function from `StyleRule` to `StyleRule`, you can create custom modifiers by importing the internal rule helpers:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'

// Custom pseudo-class modifier
const checked: Modifier = (rule: StyleRule): StyleRule => ({
  ...rule,
  selectors: [...rule.selectors, ':checked'],
})

// Custom media query modifier
const print: Modifier = (rule: StyleRule): StyleRule => ({
  ...rule,
  mediaQueries: [...rule.mediaQueries, 'print'],
})

// Custom reduced motion modifier
const reducedMotion: Modifier = (rule: StyleRule): StyleRule => ({
  ...rule,
  mediaQueries: [...rule.mediaQueries, '(prefers-reduced-motion: reduce)'],
})
```

Custom modifiers compose with `when()` and all built-in modifiers exactly the same way:

```ts
import { cx, css, when } from 'typewritingclass'

cx(
  css({ transition: 'all 0.3s ease' }),
  when(reducedMotion)(css({ transition: 'none' })),
  when(hover)(css({ transform: 'scale(1.05)' })),
  when(hover, reducedMotion)(css({ transform: 'none' })),
)
```
