---
title: Utility Functions
description: "How typewritingclass utilities work — functions in, CSS out."
sidebar:
  order: 1
---

In typewritingclass, every CSS property is controlled by a **utility function**. A utility takes a value and returns a `StyleRule` object -- a plain data structure describing a CSS declaration. There are no magic strings, no class-name conventions, and no hidden side effects. Call a function, get a rule.

## What is a utility?

A utility is a pure function with this signature:

```ts
type Utility = (value: any) => StyleRule
```

The returned `StyleRule` is a simple object:

```ts
interface StyleRule {
  _tag: 'StyleRule'
  declarations: Record<string, string>  // CSS property-value pairs
  selectors: string[]                    // e.g. [':hover']
  mediaQueries: string[]                 // e.g. ['(min-width: 768px)']
}
```

For example, calling `p(4)` returns:

```ts
{
  _tag: 'StyleRule',
  declarations: { padding: '1rem' },
  selectors: [],
  mediaQueries: [],
}
```

The rule is inert data until you pass it to [`cx()`](/core-concepts/cx) or [`dcx()`](/api-reference/dcx), which registers it in the global stylesheet and returns a class name.

### Pure functions, predictable output

All utilities are **pure** -- same input always produces the same output. There is no hidden state, no dependency on call order, and no side effects. This makes them safe to call anywhere: in module scope, inside loops, or in memoized computations.

```ts
import { p, bg } from 'typewritingclass'

// These two calls produce identical StyleRule objects
const rule1 = p(4)
const rule2 = p(4)

// Utilities compose freely
const rules = [p(4), bg('#3b82f6')]
```

---

## Utility categories

typewritingclass ships with utilities across seven categories. Each category covers a family of related CSS properties.

### Spacing

Control padding, margin, and gap between elements. Spacing utilities accept a **theme scale number** (mapped via the spacing scale where `4` = `1rem`), a raw CSS string, or a `dynamic()` value.

| Utility | CSS Property | Example |
|---------|-------------|---------|
| `p` | `padding` | `p(4)` -- `1rem` |
| `px` | `padding-left`, `padding-right` | `px(6)` -- `1.5rem` |
| `py` | `padding-top`, `padding-bottom` | `py(2)` -- `0.5rem` |
| `pt` | `padding-top` | `pt(8)` -- `2rem` |
| `pr` | `padding-right` | `pr(3)` -- `0.75rem` |
| `pb` | `padding-bottom` | `pb(10)` -- `2.5rem` |
| `pl` | `padding-left` | `pl(5)` -- `1.25rem` |
| `m` | `margin` | `m(4)` -- `1rem` |
| `mx` | `margin-left`, `margin-right` | `mx('auto')` |
| `my` | `margin-top`, `margin-bottom` | `my(6)` -- `1.5rem` |
| `mt` | `margin-top` | `mt(2)` -- `0.5rem` |
| `mr` | `margin-right` | `mr(3)` -- `0.75rem` |
| `mb` | `margin-bottom` | `mb(4)` -- `1rem` |
| `ml` | `margin-left` | `ml(12)` -- `3rem` |
| `gap` | `gap` | `gap(4)` -- `1rem` |
| `gapX` | `column-gap` | `gapX(2)` -- `0.5rem` |
| `gapY` | `row-gap` | `gapY(3)` -- `0.75rem` |

```ts
import { cx, p, px, py, m, mx, gap } from 'typewritingclass'

// Theme scale numbers
cx(p(4))               // padding: 1rem
cx(px(6))              // padding-left: 1.5rem; padding-right: 1.5rem
cx(py(2))              // padding-top: 0.5rem; padding-bottom: 0.5rem

// Raw CSS strings
cx(m('auto'))           // margin: auto
cx(mx('auto'))          // margin-left: auto; margin-right: auto

// Fractional scale values
cx(p(0.5))             // padding: 0.125rem
cx(gap(2.5))           // gap: 0.625rem
```

#### Spacing scale reference

The built-in spacing scale maps numbers to `rem` values. A few key points:

| Scale | Value | Scale | Value | Scale | Value |
|-------|-------|-------|-------|-------|-------|
| `0` | `0px` | `4` | `1rem` | `16` | `4rem` |
| `0.5` | `0.125rem` | `5` | `1.25rem` | `20` | `5rem` |
| `1` | `0.25rem` | `6` | `1.5rem` | `24` | `6rem` |
| `2` | `0.5rem` | `8` | `2rem` | `32` | `8rem` |
| `3` | `0.75rem` | `12` | `3rem` | `64` | `16rem` |

Values not in the scale are computed as `value * 0.25rem`. For instance, `p(7)` produces `padding: 1.75rem`.

---

### Colors

Set background, text, and border colors. Color utilities accept any valid CSS color string -- hex, `rgb()`, `hsl()`, named colors, or theme color tokens.

| Utility | CSS Property |
|---------|-------------|
| `bg` | `background-color` |
| `textColor` | `color` |
| `borderColor` | `border-color` |

```ts
import { cx, bg, textColor, borderColor } from 'typewritingclass'
import { blue, slate, white } from 'typewritingclass/theme/colors'

// Theme color tokens
cx(bg(blue[500]))           // background-color: #3b82f6
cx(textColor(slate[900]))   // color: #0f172a
cx(borderColor(slate[200])) // border-color: #e2e8f0

// Raw CSS color strings
cx(bg('#ff6347'))           // background-color: #ff6347
cx(textColor('inherit'))    // color: inherit
cx(bg('transparent'))       // background-color: transparent

// Named exports for common values
cx(bg(white))               // background-color: #ffffff
```

The theme ships with a full palette of color scales (50--950): `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`. Plus standalone values: `white`, `black`, `transparent`, `currentColor`.

---

### Typography

Control font size, weight, letter spacing, line height, and text alignment.

| Utility | CSS Property | Accepts |
|---------|-------------|---------|
| `text` | `font-size` (+ `line-height`) | `TextSize` preset, raw string |
| `font` | `font-weight` | weight string (`'700'`, `'bold'`) |
| `tracking` | `letter-spacing` | CSS string (`'-0.025em'`) |
| `leading` | `line-height` | CSS string (`'1.5'`, `'2rem'`) |
| `textAlign` | `text-align` | `'left'`, `'center'`, `'right'`, `'justify'` |

```ts
import { cx, text, font, tracking, leading, textAlign } from 'typewritingclass'
import * as typography from 'typewritingclass/theme/typography'

// TextSize preset -- sets both font-size and line-height
cx(text(typography.lg))     // font-size: 1.125rem; line-height: 1.75rem
cx(text(typography._2xl))   // font-size: 1.5rem; line-height: 2rem

// Raw font-size string
cx(text('2rem'))            // font-size: 2rem

// Font weight with theme token
cx(font(typography.bold))   // font-weight: 700
cx(font(typography.medium)) // font-weight: 500

// Raw font weight
cx(font('600'))             // font-weight: 600

// Letter spacing and line height
cx(tracking('-0.025em'))    // letter-spacing: -0.025em
cx(leading('1.5'))          // line-height: 1.5

// Text alignment
cx(textAlign('center'))     // text-align: center
```

#### Text size presets

| Token | Font Size | Line Height |
|-------|-----------|-------------|
| `xs` | `0.75rem` | `1rem` |
| `sm` | `0.875rem` | `1.25rem` |
| `base` | `1rem` | `1.5rem` |
| `lg` | `1.125rem` | `1.75rem` |
| `xl` | `1.25rem` | `1.75rem` |
| `_2xl` | `1.5rem` | `2rem` |
| `_3xl` | `1.875rem` | `2.25rem` |
| `_4xl` | `2.25rem` | `2.5rem` |
| `_5xl`--`_9xl` | `3rem`--`8rem` | `1` |

#### Font weight tokens

| Token | Weight |
|-------|--------|
| `thin` | `100` |
| `extralight` | `200` |
| `light` | `300` |
| `normal` | `400` |
| `medium` | `500` |
| `semibold` | `600` |
| `bold` | `700` |
| `extrabold` | `800` |

---

### Layout

Control display, flex, grid, sizing, positioning, and alignment.

#### Flex

```ts
import { cx, flex, flexCol, flexRow, flexWrap, inlineFlex, items, justify, gap } from 'typewritingclass'

cx(flex())                  // display: flex
cx(flexCol())               // display: flex; flex-direction: column
cx(flexRow())               // display: flex; flex-direction: row
cx(flexWrap())              // flex-wrap: wrap
cx(inlineFlex())            // display: inline-flex

// Alignment
cx(flex(), items('center'), justify('space-between'))
// display: flex; align-items: center; justify-content: space-between
```

#### Grid

```ts
import { cx, grid, gridCols, gridRows, gap } from 'typewritingclass'

cx(grid())                  // display: grid
cx(grid(3))                 // display: grid; grid-template-columns: repeat(3, minmax(0, 1fr))
cx(gridCols(4))             // grid-template-columns: repeat(4, minmax(0, 1fr))
cx(gridRows(3))             // grid-template-rows: repeat(3, minmax(0, 1fr))

// Grid with gap
cx(grid(3), gap(4))         // 3-column grid with 1rem gap
```

#### Sizing

| Utility | CSS Property | Example |
|---------|-------------|---------|
| `w` | `width` | `w('100%')`, `w(64)` -- `16rem` |
| `h` | `height` | `h('100vh')`, `h(12)` -- `3rem` |
| `size` | `width` + `height` | `size(10)` -- `2.5rem` square |
| `minW` | `min-width` | `minW('0')` |
| `minH` | `min-height` | `minH('100vh')` |
| `maxW` | `max-width` | `maxW('768px')` |
| `maxH` | `max-height` | `maxH('100vh')` |

```ts
import { cx, w, h, size, minH, maxW } from 'typewritingclass'

cx(w('100%'))               // width: 100%
cx(h('100vh'))              // height: 100vh
cx(size(10))                // width: 2.5rem; height: 2.5rem
cx(minH('100vh'))           // min-height: 100vh
cx(maxW('768px'))           // max-width: 768px
```

#### Positioning

```ts
import { cx, relative, absolute, fixed, sticky, top, left, inset, z } from 'typewritingclass'

cx(relative())              // position: relative
cx(absolute())              // position: absolute
cx(fixed())                 // position: fixed
cx(sticky())                // position: sticky

cx(top(0))                  // top: 0px
cx(left('50%'))             // left: 50%
cx(inset(0))                // inset: 0px
cx(z(10))                   // z-index: 10
```

#### Other layout utilities

```ts
import { cx, display, self, overflow, overflowX, overflowY } from 'typewritingclass'

cx(display('block'))        // display: block
cx(display('none'))         // display: none
cx(self('center'))          // align-self: center
cx(overflow('hidden'))      // overflow: hidden
cx(overflowY('auto'))       // overflow-y: auto
```

---

### Borders

Control border radius, border width, and focus rings.

```ts
import { cx, rounded, roundedT, border, borderB, borderColor, ring } from 'typewritingclass'
import * as borders from 'typewritingclass/theme/borders'

// Border radius
cx(rounded())               // border-radius: 0.25rem (default)
cx(rounded(borders.lg))     // border-radius: 0.5rem
cx(rounded(borders.full))   // border-radius: 9999px (pill shape)
cx(roundedT(borders.lg))    // top corners only: 0.5rem

// Border width
cx(border())                // border-width: 1px; border-style: solid
cx(border('2px'))           // border-width: 2px; border-style: solid
cx(borderB())               // border-bottom-width: 1px; border-style: solid

// Focus ring (box-shadow based)
cx(ring())                  // box-shadow: 0 0 0 3px #3b82f6
cx(ring('2px', '#ef4444'))  // box-shadow: 0 0 0 2px #ef4444
```

#### Border radius tokens

| Token | Value |
|-------|-------|
| `none` | `0px` |
| `sm` | `0.125rem` |
| `DEFAULT` | `0.25rem` |
| `md` | `0.375rem` |
| `lg` | `0.5rem` |
| `xl` | `0.75rem` |
| `_2xl` | `1rem` |
| `_3xl` | `1.5rem` |
| `full` | `9999px` |

---

### Effects

Control shadows, opacity, and backdrop filters.

```ts
import { cx, shadow, opacity, backdrop } from 'typewritingclass'
import * as shadows from 'typewritingclass/theme/shadows'

// Box shadow
cx(shadow())                // default shadow
cx(shadow(shadows.lg))      // large shadow
cx(shadow('none'))          // no shadow

// Opacity
cx(opacity(1))              // opacity: 1
cx(opacity(0.5))            // opacity: 0.5
cx(opacity(0))              // opacity: 0

// Backdrop filter
cx(backdrop('blur(8px)'))   // backdrop-filter: blur(8px)
cx(backdrop('blur(12px) saturate(150%)'))
```

#### Shadow tokens

| Token | Description |
|-------|-------------|
| `sm` | Subtle small shadow |
| `DEFAULT` | Standard shadow (used when no argument given) |
| `md` | Medium shadow |
| `lg` | Large shadow |
| `xl` | Extra-large shadow |
| `_2xl` | Massive shadow |
| `inner` | Inset shadow |
| `none` | No shadow |

---

### Interactivity

Control cursor behavior, text selection, and pointer events.

```ts
import { cx, cursor, select, pointerEvents } from 'typewritingclass'

// Cursor
cx(cursor('pointer'))       // cursor: pointer
cx(cursor('not-allowed'))   // cursor: not-allowed
cx(cursor('grab'))          // cursor: grab

// User selection
cx(select('none'))          // user-select: none
cx(select('text'))          // user-select: text
cx(select('all'))           // user-select: all

// Pointer events
cx(pointerEvents('none'))   // pointer-events: none
cx(pointerEvents('auto'))   // pointer-events: auto
```

---

## Theme tokens vs. raw values

Most utilities accept **both** theme tokens and raw CSS strings. Theme tokens provide consistency and type safety; raw strings give you escape hatches for one-off values.

```ts
import { cx, p, bg, rounded } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'
import * as borders from 'typewritingclass/theme/borders'

// Theme tokens -- consistent, autocomplete-friendly
cx(p(4), bg(blue[500]), rounded(borders.lg))

// Raw CSS strings -- full flexibility
cx(p('clamp(1rem, 2vw, 2rem)'), bg('oklch(0.7 0.15 240)'), rounded('0.625rem'))

// Mix and match freely
cx(p(4), bg('oklch(0.7 0.15 240)'), rounded(borders.lg))
```

---

## Building custom utilities

Since utilities are just functions that return `StyleRule` objects, you can create your own. Import the internal `createRule` helper or construct the object directly:

```ts
import type { StyleRule } from 'typewritingclass'

// Option 1: Build the StyleRule manually
function textTransform(value: 'uppercase' | 'lowercase' | 'capitalize' | 'none'): StyleRule {
  return {
    _tag: 'StyleRule',
    declarations: { 'text-transform': value },
    selectors: [],
    mediaQueries: [],
  }
}

// Use it exactly like a built-in utility
import { cx, p, font } from 'typewritingclass'
import { bold } from 'typewritingclass/theme/typography'

cx(textTransform('uppercase'), p(4), font(bold))
```

Custom utilities compose with `cx()`, `when()`, and `layer()` identically to built-in ones -- no registration or configuration required.
