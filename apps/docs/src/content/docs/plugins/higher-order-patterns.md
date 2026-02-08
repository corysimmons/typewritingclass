---
title: "Higher-Order Patterns"
description: "Factory functions, utility generators, and composable HOF patterns."
sidebar:
  order: 5
---

Because utilities are functions and `cx()` is just composition, you can build **higher-order functions** (HOFs) that generate, wrap, and transform utilities. This is where Typewriting Class's function-based design really shines -- patterns that are impossible or awkward in string-based systems become natural.

## Utility factories

A utility factory is a function that **returns a utility function**. Instead of writing repetitive utility definitions, you write a single factory and use it to stamp out a family of related utilities.

### `spacingProp()` -- one factory, many utilities

Every spacing utility follows the same pattern: take a number, convert it to rem, set a CSS property. Factor that out:

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

function spacingProp(property: string) {
  return function (value: number | string): StyleRule {
    const resolved = typeof value === 'number' ? `${value * 0.25}rem` : value
    return createRule({ [property]: resolved })
  }
}

// Stamp out utilities
export const scrollPt = spacingProp('scroll-padding-top')
export const scrollPb = spacingProp('scroll-padding-bottom')
export const scrollPx = spacingProp('scroll-padding-inline')
export const scrollPy = spacingProp('scroll-padding-block')
export const scrollMt = spacingProp('scroll-margin-top')
export const scrollMb = spacingProp('scroll-margin-bottom')
```

Usage:

```ts
import { cx } from 'typewritingclass'
import { scrollPt, scrollMt } from './scroll-utilities'

const section = cx(scrollPt(20), scrollMt(4))
// scroll-padding-top: 5rem; scroll-margin-top: 1rem;
```

One factory definition, six utilities with zero duplication.

### `colorProp()` -- colors for any property

The same idea works for color utilities. Every color utility takes a color and sets a CSS property:

```ts
import type { StyleRule, CSSColor } from 'typewritingclass'
import type { DynamicValue } from 'typewritingclass'
import { createRule, createDynamicRule } from 'typewritingclass/rule'
import { isDynamic } from 'typewritingclass'

function colorProp(property: string) {
  return function (color: CSSColor | string | DynamicValue): StyleRule {
    if (isDynamic(color)) {
      return createDynamicRule(
        { [property]: `var(${color.__id})` },
        { [color.__id]: String(color.__value) },
      )
    }
    return createRule({ [property]: String(color) })
  }
}

// Stamp out color utilities
export const caretColor = colorProp('caret-color')
export const accentColor = colorProp('accent-color')
export const outlineColor = colorProp('outline-color')
export const columnRuleColor = colorProp('column-rule-color')
export const textDecorationColor = colorProp('text-decoration-color')
```

All five utilities are dynamic-aware, accept theme tokens, and work with the compiler -- all from a single factory.

---

## Modifier wrappers

HOFs can wrap utilities with modifiers, creating reusable patterns for common interactive states.

### `withHover()` -- automatic hover enhancement

Create a HOF that takes a base style and a hover style and composes them:

```ts
import type { StyleRule } from 'typewritingclass'
import { when, hover } from 'typewritingclass'

export function withHover(base: StyleRule, hovered: StyleRule): StyleRule[] {
  return [base, when(hover)(hovered)]
}
```

Usage:

```ts
import { cx, bg, textColor, shadow } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'
import { withHover } from './patterns'

const button = cx(
  ...withHover(bg(blue[500]), bg(blue[600])),
  ...withHover(shadow('md'), shadow('lg')),
  textColor(white),
)
```

### `interactive()` -- full state machine

Take it further with a HOF that handles multiple interaction states:

```ts
import type { StyleRule } from 'typewritingclass'
import { when, hover, focus, active, disabled } from 'typewritingclass'

interface InteractiveStates {
  base: StyleRule
  hover?: StyleRule
  focus?: StyleRule
  active?: StyleRule
  disabled?: StyleRule
}

export function interactive(states: InteractiveStates): StyleRule[] {
  const rules: StyleRule[] = [states.base]
  if (states.hover) rules.push(when(hover)(states.hover))
  if (states.focus) rules.push(when(focus)(states.focus))
  if (states.active) rules.push(when(active)(states.active))
  if (states.disabled) rules.push(when(disabled)(states.disabled))
  return rules
}
```

Usage:

```ts
import { cx, bg, shadow, opacity, ring } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'
import { interactive } from './patterns'

const cta = cx(
  ...interactive({
    base: bg(blue[500]),
    hover: bg(blue[600]),
    focus: ring(2),
    active: bg(blue[700]),
    disabled: opacity(0.5),
  }),
)
```

This replaces four separate `when()` calls with a single declarative object.

---

## Responsive factories

### `responsive()` -- auto-generate breakpoint variants

Create a HOF that takes a map of breakpoint values and generates responsive styles:

```ts
import type { StyleRule } from 'typewritingclass'
import { when, sm, md, lg, xl } from 'typewritingclass'

const breakpoints = { sm, md, lg, xl } as const
type Breakpoint = keyof typeof breakpoints

export function responsive<T>(
  utility: (value: T) => StyleRule,
  values: Partial<Record<'base' | Breakpoint, T>>,
): StyleRule[] {
  const rules: StyleRule[] = []

  if (values.base !== undefined) {
    rules.push(utility(values.base))
  }

  for (const [bp, value] of Object.entries(values) as [string, T][]) {
    if (bp !== 'base' && bp in breakpoints) {
      rules.push(when(breakpoints[bp as Breakpoint])(utility(value)))
    }
  }

  return rules
}
```

Usage:

```ts
import { cx, p, text, gridCols } from 'typewritingclass'
import { base, lg, _2xl } from 'typewritingclass/theme/typography'
import { responsive } from './patterns'

const layout = cx(
  ...responsive(p, { base: 4, md: 6, lg: 8 }),
  ...responsive(text, { base: base, md: lg, lg: _2xl }),
  ...responsive(gridCols, { base: 1, sm: 2, lg: 3 }),
)
```

Three responsive utility sets in three lines. Without the HOF, this would be nine separate declarations with six `when()` wrappers.

---

## Transition composers

### `withTransition()` -- animate any property change

Create a HOF that wraps a utility with a CSS transition so the change animates when toggled:

```ts
import type { StyleRule } from 'typewritingclass'
import { combineRules } from 'typewritingclass/rule'
import { createRule } from 'typewritingclass/rule'

export function withTransition(
  property: string,
  duration = '150ms',
  easing = 'ease',
) {
  return function (...rules: StyleRule[]): StyleRule {
    return combineRules([
      createRule({
        'transition-property': property,
        'transition-duration': duration,
        'transition-timing-function': easing,
      }),
      ...rules,
    ])
  }
}
```

Usage:

```ts
import { cx, bg, shadow, when, hover } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'
import { withTransition } from './patterns'

const animateBg = withTransition('background-color', '200ms')
const animateShadow = withTransition('box-shadow', '300ms', 'ease-out')

const card = cx(
  animateBg(bg(white)),
  animateShadow(shadow('sm')),
  when(hover)(bg('#f8fafc'), shadow('lg')),
)
```

The transition definitions are reusable. Apply `animateBg` to any utility that sets `background-color` and the transition follows.

---

## Theme-aware factories

### `themed()` -- build utilities that read from a theme

Create a factory that maps semantic token names to a utility:

```ts
import type { StyleRule, CSSColor } from 'typewritingclass'
import { bg, textColor } from 'typewritingclass'

interface SemanticTokens {
  primary: CSSColor | string
  secondary: CSSColor | string
  danger: CSSColor | string
  muted: CSSColor | string
}

export function themed(tokens: SemanticTokens) {
  return {
    bgPrimary: () => bg(tokens.primary),
    bgSecondary: () => bg(tokens.secondary),
    bgDanger: () => bg(tokens.danger),
    bgMuted: () => bg(tokens.muted),
    textPrimary: () => textColor(tokens.primary),
    textSecondary: () => textColor(tokens.secondary),
    textDanger: () => textColor(tokens.danger),
    textMuted: () => textColor(tokens.muted),
  }
}
```

Usage:

```ts
import { cx, p, rounded } from 'typewritingclass'
import { blue, gray, red } from 'typewritingclass/theme/colors'
import { themed } from './patterns'

const t = themed({
  primary: blue[500],
  secondary: gray[500],
  danger: red[500],
  muted: gray[300],
})

const alert = cx(p(4), rounded('lg'), t.bgDanger(), t.textDanger())
const hint = cx(p(4), rounded('lg'), t.bgMuted(), t.textMuted())
```

Switch the entire palette by passing different tokens to `themed()`. The generated utilities stay fully static and compiler-friendly.

---

## Constraint utilities

### `clamp()` -- generate fluid spacing from min/max

A factory that creates fluid utilities using CSS `clamp()`:

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

function fluidProp(property: string) {
  return function (min: string, max: string, viewportMin = '320px', viewportMax = '1280px'): StyleRule {
    const slope = `(${max} - ${min}) / (${viewportMax} - ${viewportMin})`
    const value = `clamp(${min}, calc(${min} + (100vw - ${viewportMin}) * ${slope}), ${max})`
    return createRule({ [property]: value })
  }
}

export const fluidPadding = fluidProp('padding')
export const fluidFontSize = fluidProp('font-size')
export const fluidGap = fluidProp('gap')
```

Usage:

```ts
import { cx } from 'typewritingclass'
import { fluidPadding, fluidFontSize } from './fluid'

const hero = cx(
  fluidPadding('1rem', '4rem'),
  fluidFontSize('1.5rem', '3rem'),
)
```

The padding and font size scale smoothly from mobile to desktop without breakpoints.

---

## Composing HOFs

HOFs compose. Stack them to build powerful, reusable abstractions:

```ts
import { cx, p, bg, textColor, rounded, shadow, when, hover, focus } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'
import { responsive } from './patterns'
import { interactive } from './patterns'

// Combine responsive + interactive patterns
const primaryButton = cx(
  ...responsive(p, { base: 3, md: 4 }),
  ...interactive({
    base: bg(blue[500]),
    hover: bg(blue[600]),
    focus: shadow('0 0 0 3px rgba(99, 102, 241, 0.5)'),
  }),
  textColor(white),
  rounded('lg'),
)
```

Each HOF handles one concern. Composition handles the rest. This is the power of treating CSS utilities as functions -- they are inherently composable, and HOFs let you compose them at a higher level.

---

## Patterns summary

| Pattern | What it does | When to use |
|---|---|---|
| `spacingProp(prop)` | Returns a spacing utility for any CSS property | Creating families of related utilities |
| `colorProp(prop)` | Returns a color utility with dynamic support | Adding color variants for new properties |
| `withHover(base, hovered)` | Pairs base + hover styles | Any element with a simple hover effect |
| `interactive(states)` | Maps state object to modifier composition | Buttons, links, interactive controls |
| `responsive(utility, values)` | Generates breakpoint variants from a value map | Any utility that changes across breakpoints |
| `withTransition(prop, dur)` | Wraps utilities with CSS transition | Animated property changes |
| `themed(tokens)` | Creates semantic utilities from token map | Design system theming |
| `fluidProp(prop)` | Creates fluid `clamp()` utilities | Smooth scaling without breakpoints |

All of these are plain TypeScript functions. They work with the compiler, they compose with `cx()`, and they can be published as npm packages.
