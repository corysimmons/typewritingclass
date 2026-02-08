---
title: Quick Start
description: Build your first component with Typewriting Class in 5 minutes.
sidebar:
  order: 2
---

This tutorial walks you through building a styled card component from scratch. You will learn how to use utility functions, compose them with `cx()`, add interactive states with `when()`, make the design responsive, and pull in theme tokens -- all in about five minutes.

:::note[Prerequisites]
Make sure you have completed the [Installation](/getting-started/installation) guide before starting this tutorial.
:::

## What you will build

A card component with:

- Padding, background color, rounded corners, and a box shadow
- A hover effect that lifts the card with a larger shadow
- A heading whose color changes at the `md` breakpoint
- Dark mode support

## Step 1: Basic utilities

Every style property in Typewriting Class is a TypeScript function. Call the function with a value, and it returns a `StyleRule` -- a lightweight object that describes one CSS declaration.

```ts
import { p, bg, rounded, shadow } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'
import { lg } from 'typewritingclass/theme/shadows'

// Each of these returns a StyleRule:
p(6)          // padding: 1.5rem
bg(white)     // background-color: #ffffff
rounded('lg') // border-radius: 0.5rem
shadow(lg)    // box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), ...
```

Utility functions accept either raw CSS values or **theme tokens**. Theme tokens are just constants exported from `typewritingclass/theme/*`, so you get full autocompletion and type safety with no extra configuration.

:::tip
Spacing utilities like `p()`, `m()`, and `gap()` accept a numeric scale value. `p(6)` maps to `1.5rem` (6 * 0.25rem), following the same 4px base scale you may know from Tailwind CSS.
:::

## Step 2: Compose with cx()

A `StyleRule` on its own does nothing visible. To turn rules into class names that your framework can use, compose them with `cx()`:

```ts
import { cx, p, bg, rounded, shadow } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'
import { lg } from 'typewritingclass/theme/shadows'

const card = cx(
  p(6),
  bg(white),
  rounded('lg'),
  shadow(lg),
)
// card => "_a1b2c _d3e4f _g5h6i _j7k8l"
```

`cx()` does three things:

1. **Registers** each `StyleRule` in the global stylesheet.
2. **Assigns** each one a unique, deterministic class name based on its CSS content.
3. **Returns** a space-separated string of those class names, ready for `className` or `class`.

You can use the result directly in JSX:

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className={card}>{children}</div>
}
```

### Override ordering

When two rules in the same `cx()` call set the same CSS property, the **later** one wins. Typewriting Class uses CSS cascade layers internally, so argument order is your specificity:

```ts
const box = cx(p(4), p(8))
// Only p(8) applies -- padding: 2rem
```

You can also mix in plain string class names:

```ts
const box = cx('my-card', p(6), bg(white))
// => "my-card _a1b2c _d3e4f"
```

## Step 3: Add hover effects with when()

The `when()` function wraps style rules with a modifier -- a pseudo-class, media query, or color scheme selector. It uses a curried syntax: pass the modifier first, then call the returned function with the rules:

```ts
import { cx, p, bg, shadow, when, hover } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'
import { lg, xl } from 'typewritingclass/theme/shadows'

const card = cx(
  p(6),
  bg(white),
  shadow(lg),
  when(hover)(shadow(xl)),
)
```

When the user hovers over the element, the shadow grows from `lg` to `xl`, creating a subtle lift effect.

The available pseudo-class modifiers are: `hover`, `focus`, `active`, `disabled`, `focusVisible`, `focusWithin`, `firstChild`, and `lastChild`.

## Step 4: Make it responsive with breakpoints

Responsive design works the same way -- pass a breakpoint modifier to `when()`:

```ts
import { cx, p, text, when, md, lg } from 'typewritingclass'

const card = cx(
  p(4),
  text('sm'),
  when(md)(p(6), text('base')),
  when(lg)(p(8), text('lg')),
)
```

This gives the card tighter padding and smaller text on mobile, with progressively larger values at the `md` (768px) and `lg` (1024px) breakpoints.

The available breakpoint modifiers are:

| Modifier | Min width | CSS media query                    |
| -------- | --------- | ---------------------------------- |
| `sm`     | 640px     | `@media (min-width: 640px)`        |
| `md`     | 768px     | `@media (min-width: 768px)`        |
| `lg`     | 1024px    | `@media (min-width: 1024px)`       |
| `xl`     | 1280px    | `@media (min-width: 1280px)`       |
| `_2xl`   | 1536px    | `@media (min-width: 1536px)`       |

### Stacking modifiers

You can combine multiple modifiers in a single `when()` call. They compose right-to-left, so the first argument is the innermost condition:

```ts
import { cx, bg, when, hover, md } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

cx(
  when(hover, md)(bg(blue[700])),
)
// CSS: @media (min-width: 768px) { .cls:hover { background-color: #1d4ed8; } }
```

This applies `bg(blue[700])` only on hover AND only at the `md` breakpoint or wider.

## Step 5: Add theme tokens

Typewriting Class ships with a complete set of design tokens for colors, typography, spacing, shadows, and borders. Import them from the `typewritingclass/theme/*` modules:

```ts
import { white, slate, blue } from 'typewritingclass/theme/colors'
import { lg } from 'typewritingclass/theme/shadows'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
```

Color tokens are organized as scales with shades from 50 (lightest) to 950 (darkest):

```ts
blue[50]   // '#eff6ff'
blue[500]  // '#3b82f6'
blue[900]  // '#1e3a8a'
```

Named colors are also available: `white`, `black`, `transparent`, and `currentColor`.

## Step 6: Dark mode

The `dark` modifier applies styles when the user's color scheme is dark (or when a parent element has the `.dark` class):

```ts
import { cx, bg, textColor, when, dark } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'

const card = cx(
  bg(white),
  textColor(slate[900]),
  when(dark)(bg(slate[900]), textColor(white)),
)
```

## Putting it all together

Here is the complete card component using everything you have learned:

```tsx
import { cx, p, bg, rounded, shadow, textColor, text, font, when, hover, md, dark } from 'typewritingclass'
import { white, slate, blue } from 'typewritingclass/theme/colors'
import { lg, xl } from 'typewritingclass/theme/shadows'

// Card container
const card = cx(
  p(6),
  bg(white),
  rounded('lg'),
  shadow(lg),
  when(hover)(shadow(xl)),
  when(dark)(bg(slate[800])),
)

// Card heading
const heading = cx(
  text('xl'),
  font('semibold'),
  textColor(slate[900]),
  when(md)(text('2xl'), textColor(blue[700])),
  when(dark)(textColor(white)),
)

// Card body text
const body = cx(
  text('base'),
  textColor(slate[600]),
  when(dark)(textColor(slate[300])),
)

function Card() {
  return (
    <div className={card}>
      <h2 className={heading}>Hello, typewritingclass</h2>
      <p className={body}>
        Styles are TypeScript functions. The compiler extracts static CSS at
        build time. No runtime overhead, full type safety.
      </p>
    </div>
  )
}

export default Card
```

## Generated CSS

The compiler analyzes the code above and extracts the following CSS at build time. No JavaScript runs at runtime to generate these styles:

```css
/* Base styles */
._a1 { padding: 1.5rem; }
._a2 { background-color: #ffffff; }
._a3 { border-radius: 0.5rem; }
._a4 { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }

/* Hover */
._a5:hover { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }

/* Dark mode */
.dark ._a6 { background-color: #1e293b; }

/* Heading */
._a7 { font-size: 1.25rem; line-height: 1.75rem; }
._a8 { font-weight: 600; }
._a9 { color: #0f172a; }

/* Heading -- responsive */
@media (min-width: 768px) {
  ._a10 { font-size: 1.5rem; line-height: 2rem; }
  ._a11 { color: #1d4ed8; }
}

/* Heading -- dark */
.dark ._a12 { color: #ffffff; }

/* Body */
._a13 { font-size: 1rem; line-height: 1.5rem; }
._a14 { color: #475569; }
.dark ._a15 { color: #cbd5e1; }
```

:::note
The actual class names are short hashes like `_x7f2a`. The names above are simplified for readability.
:::

## Key takeaways

1. **Utilities are functions.** `p(6)` returns a `StyleRule`, not a string. This means you get autocomplete, type checking, and the ability to compose programmatically.
2. **`cx()` turns rules into class names.** It registers CSS and returns a space-separated class string.
3. **`when()` adds conditions.** Pseudo-classes, breakpoints, and dark mode all use the same composable pattern.
4. **Theme tokens are imports.** Colors, shadows, borders, and typography tokens are TypeScript constants -- no magic strings, no configuration files.
5. **Zero runtime.** The compiler extracts all CSS at build time. What ships to the browser is plain CSS and class name strings.

## Next steps

- [Editor Setup](/getting-started/editor-setup) -- configure VS Code for CSS hover previews
- [Composing with cx()](/core-concepts/cx) -- advanced composition patterns
- [Modifiers with when()](/core-concepts/when) -- the full modifier API
- [Responsive Design](/core-concepts/responsive) -- breakpoint strategies and mobile-first patterns
- [Dynamic Values](/dynamic/dynamic-values) -- using `dynamic()` and `dcx()` for runtime-dependent styles
