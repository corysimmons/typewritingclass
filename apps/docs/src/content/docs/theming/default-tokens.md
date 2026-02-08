---
title: Default Tokens
description: Built-in theme tokens for colors, spacing, typography, and more.
sidebar:
  order: 1
---

typewritingclass ships with a comprehensive set of default design tokens available through subpath imports. These tokens are plain TypeScript constants -- fully tree-shakeable, type-safe, and ready to pass directly into utility functions.

## Import pattern

Every token category has its own subpath import:

```ts
import { blue, red, slate } from 'typewritingclass/theme/colors'
import { spacingScale } from 'typewritingclass/theme/spacing'
import { base, bold } from 'typewritingclass/theme/typography'
import { lg } from 'typewritingclass/theme/shadows'
import { md } from 'typewritingclass/theme/borders'
import { full, screen } from 'typewritingclass/theme/sizes'
```

You can also import the entire theme namespace:

```ts
import { colors, spacing, typography, shadows, borders, sizes } from 'typewritingclass/theme'
```

With the namespace import, tokens are accessed as `colors.blue[500]`, `shadows.lg`, etc.

## Colors

The color module provides Tailwind CSS-compatible color palettes. Each color is an object with shades from `50` (lightest) through `950` (darkest), plus standalone values for `white`, `black`, `transparent`, and `currentColor`.

### Importing colors

```ts
import { blue, gray, emerald, white, black } from 'typewritingclass/theme/colors'
```

### Using colors with utilities

```ts
import { cx, bg, color, borderColor } from 'typewritingclass'
import { blue, gray, white } from 'typewritingclass/theme/colors'

// Background color
cx(bg(blue[500]))
// CSS: background-color: #3b82f6

// Text color
cx(color(gray[900]))
// CSS: color: #111827

// Border color
cx(borderColor(blue[300]))
// CSS: border-color: #93c5fd

// Light and dark shades for depth
cx(bg(gray[50]))   // Very light background
cx(bg(gray[900]))  // Very dark background
```

### Color with modifiers

```ts
import { cx, bg, when, hover, focus, dark } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

const button = cx(
  bg(blue[500]),
  when(hover)(bg(blue[600])),
  when(focus)(bg(blue[700])),
  when(dark)(bg(blue[400])),
)
```

### Available color palettes

**Neutral palettes:** `slate`, `gray`, `zinc`, `neutral`, `stone`

**Color palettes:** `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

**Standalone values:** `white`, `black`, `transparent`, `currentColor`

Each palette object has shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`.

```ts
import { red } from 'typewritingclass/theme/colors'

red[50]   // '#fef2f2' (lightest)
red[500]  // '#ef4444' (mid-tone)
red[950]  // '#450a0a' (darkest)
```

## Spacing

The spacing module provides a numeric scale that maps numbers to `rem` values. The scale follows a consistent pattern where each unit equals `0.25rem` (4px at default browser font size).

### Importing spacing

```ts
import { spacingScale, resolveSpacing } from 'typewritingclass/theme/spacing'
```

### Using spacing with utilities

Spacing utilities like `p()`, `m()`, `gap()`, `w()`, and `h()` accept numeric values that map to the spacing scale:

```ts
import { cx, p, m, mx, my, gap, w, h } from 'typewritingclass'

// Padding
cx(p(4))       // padding: 1rem
cx(p(0.5))     // padding: 0.125rem
cx(p(8))       // padding: 2rem

// Margin
cx(m(4))       // margin: 1rem
cx(mx(2))      // margin-left: 0.5rem; margin-right: 0.5rem

// Width and height
cx(w(64))      // width: 16rem
cx(h(12))      // height: 3rem

// Flex/Grid gap
cx(gap(6))     // gap: 1.5rem
```

### Responsive spacing

```ts
import { cx, p, gap, when, md, lg } from 'typewritingclass'

const section = cx(
  p(4),
  gap(4),
  when(md)(p(8), gap(6)),
  when(lg)(p(12), gap(8)),
)
```

### The resolveSpacing function

The `resolveSpacing` function converts a numeric scale value to its CSS equivalent. If the number is not in the predefined scale, it falls back to `value * 0.25rem`:

```ts
import { resolveSpacing } from 'typewritingclass/theme/spacing'

resolveSpacing(4)     // '1rem'
resolveSpacing(0.5)   // '0.125rem'
resolveSpacing(96)    // '24rem'
resolveSpacing(100)   // '25rem' (fallback: 100 * 0.25)
resolveSpacing('2px') // '2px' (strings pass through unchanged)
```

## Typography

The typography module provides text size presets and font weight constants.

### Text sizes

Each text size is an object with `fontSize` and `lineHeight` properties:

```ts
import { xs, sm, base, lg, xl, _2xl, _3xl, _4xl } from 'typewritingclass/theme/typography'

base  // { fontSize: '1rem', lineHeight: '1.5rem' }
lg    // { fontSize: '1.125rem', lineHeight: '1.75rem' }
_3xl  // { fontSize: '1.875rem', lineHeight: '2.25rem' }
```

:::note
Text size names that start with a number are prefixed with an underscore to be valid JavaScript identifiers: `_2xl`, `_3xl`, `_4xl`, etc.
:::

### Using text sizes

```ts
import { cx, fontSize, lineHeight } from 'typewritingclass'
import { lg, _2xl } from 'typewritingclass/theme/typography'

// Apply both font-size and line-height
cx(fontSize(lg.fontSize), lineHeight(lg.lineHeight))

// Responsive typography
import { when, md } from 'typewritingclass'

const heading = cx(
  fontSize(_2xl.fontSize),
  lineHeight(_2xl.lineHeight),
  when(md)(
    fontSize(_3xl.fontSize),
    lineHeight(_3xl.lineHeight),
  ),
)
```

### Font weights

Font weights are exported as string constants representing CSS `font-weight` values:

```ts
import { thin, light, normal, medium, semibold, bold, extrabold, black_ } from 'typewritingclass/theme/typography'

normal    // '400'
semibold  // '600'
bold      // '700'
```

:::note
The `black` font weight is exported as `black_` (with trailing underscore) to avoid conflicting with the `black` color export.
:::

### Using font weights

```ts
import { cx, fontWeight } from 'typewritingclass'
import { bold, semibold } from 'typewritingclass/theme/typography'

cx(fontWeight(bold))      // font-weight: 700
cx(fontWeight(semibold))  // font-weight: 600
```

## Shadows

The shadows module provides box-shadow values at multiple intensity levels.

### Importing and using shadows

```ts
import { cx, shadow } from 'typewritingclass'
import { sm, md, lg, xl, _2xl, inner, none } from 'typewritingclass/theme/shadows'

cx(shadow(sm))    // A subtle shadow
cx(shadow(md))    // A moderate shadow
cx(shadow(lg))    // A pronounced shadow
cx(shadow(xl))    // A heavy shadow
cx(shadow(_2xl))  // The most dramatic shadow
cx(shadow(inner)) // An inset shadow
cx(shadow(none))  // Remove shadow
```

There is also a `DEFAULT` export for a baseline shadow between `sm` and `md`:

```ts
import { DEFAULT } from 'typewritingclass/theme/shadows'

cx(shadow(DEFAULT))
// CSS: box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
```

### Shadow with hover effects

```ts
import { cx, shadow, when, hover } from 'typewritingclass'
import { md, lg } from 'typewritingclass/theme/shadows'

const card = cx(
  shadow(md),
  when(hover)(shadow(lg)),
)
```

## Border radius

The borders module provides border-radius values from subtle rounding to fully circular.

### Importing and using borders

```ts
import { cx, rounded } from 'typewritingclass'
import { sm, md, lg, xl, _2xl, _3xl, full, none } from 'typewritingclass/theme/borders'

cx(rounded(sm))    // border-radius: 0.125rem
cx(rounded(md))    // border-radius: 0.375rem
cx(rounded(lg))    // border-radius: 0.5rem
cx(rounded(xl))    // border-radius: 0.75rem
cx(rounded(full))  // border-radius: 9999px (pill/circle shape)
cx(rounded(none))  // border-radius: 0px
```

There is also a `DEFAULT` export for a standard radius:

```ts
import { DEFAULT } from 'typewritingclass/theme/borders'

cx(rounded(DEFAULT))  // border-radius: 0.25rem
```

## Sizes

The sizes module provides named dimension values useful for width and height utilities.

### Importing and using sizes

```ts
import { cx, w, h, maxW, minH } from 'typewritingclass'
import { full, screen, screenH, min, max, fit, auto } from 'typewritingclass/theme/sizes'

cx(w(full))      // width: 100%
cx(w(screen))    // width: 100vw
cx(h(screenH))   // height: 100vh
cx(w(min))       // width: min-content
cx(w(max))       // width: max-content
cx(w(fit))       // width: fit-content
cx(w(auto))      // width: auto
cx(maxW(screen)) // max-width: 100vw
cx(minH(full))   // min-height: 100%
```

## Putting it all together

Here is a complete example composing tokens from multiple categories:

```ts
import { cx, bg, color, p, m, gap, rounded, shadow, fontWeight, fontSize, lineHeight, w, when, hover, md } from 'typewritingclass'
import { blue, gray, white } from 'typewritingclass/theme/colors'
import { lg as shadowLg } from 'typewritingclass/theme/shadows'
import { lg as borderLg } from 'typewritingclass/theme/borders'
import { lg as textLg, bold } from 'typewritingclass/theme/typography'

const card = cx(
  bg(white),
  color(gray[900]),
  p(6),
  rounded(borderLg),
  shadow(shadowLg),
  when(hover)(shadow('xl')),
)

const cardTitle = cx(
  fontSize(textLg.fontSize),
  lineHeight(textLg.lineHeight),
  fontWeight(bold),
  color(gray[900]),
  m(0),
)

const cardBody = cx(
  color(gray[600]),
  fontSize('0.875rem'),
  lineHeight('1.25rem'),
)

const cardButton = cx(
  bg(blue[500]),
  color(white),
  fontWeight(bold),
  p(2),
  rounded(borderLg),
  when(hover)(bg(blue[600])),
  when(md)(p(4)),
)
```

:::tip
When importing tokens that share names across modules (like `lg` from shadows, borders, and typography), use import aliases to disambiguate:
```ts
import { lg as shadowLg } from 'typewritingclass/theme/shadows'
import { lg as borderLg } from 'typewritingclass/theme/borders'
import { lg as textLg } from 'typewritingclass/theme/typography'
```
:::
