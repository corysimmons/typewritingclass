---
title: Dark Mode
description: "Add dark mode support with the dark modifier."
sidebar:
  order: 5
---

Typewriting Class supports dark mode through the `dark` modifier, which wraps styles in a `@media (prefers-color-scheme: dark)` query. For manual theme switching, the library also provides `createTheme()` and `setTheme()` with a `data-theme` attribute approach.

## System-based dark mode

The simplest approach uses the `dark` modifier with `when()`. Styles apply automatically based on the user's operating system or browser color scheme preference:

```ts
import { cx, bg, textColor, when, dark } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'

cx(
  bg(white),
  textColor(slate[900]),
  when(dark)(bg(slate[900])),
  when(dark)(textColor(slate[100])),
)
```

Generated CSS:

```css
@layer l0 { ._a { background-color: #ffffff; } }
@layer l1 { ._b { color: #0f172a; } }
@layer l2 { @media (prefers-color-scheme: dark) { ._c { background-color: #0f172a; } } }
@layer l3 { @media (prefers-color-scheme: dark) { ._d { color: #f1f5f9; } } }
```

When the user's system is set to dark mode, the `@media (prefers-color-scheme: dark)` rules activate, overriding the light defaults.

### Grouping dark mode styles

Pass multiple rules to a single `when(dark)` call to produce fewer CSS rules:

```ts
import { cx, bg, textColor, borderColor, when, dark } from 'typewritingclass'
import { white, slate, gray } from 'typewritingclass/theme/colors'

cx(
  bg(white),
  textColor(slate[900]),
  borderColor(gray[200]),

  // All dark overrides in one rule
  when(dark)(bg(slate[900]), textColor(slate[100]), borderColor(slate[700])),
)
```

This generates a single dark-mode CSS rule with all three declarations, rather than three separate rules.

---

## Combining dark mode with other modifiers

`dark` composes with pseudo-state modifiers and responsive breakpoints using `when()`. All conditions must be satisfied simultaneously:

### Dark + hover

```ts
import { cx, bg, textColor, when, dark, hover } from 'typewritingclass'
import { white, blue, slate } from 'typewritingclass/theme/colors'

cx(
  bg(white),
  when(hover)(bg(blue[50])),

  when(dark)(bg(slate[900])),
  when(dark, hover)(bg(slate[800])),
)
// Dark hover: @media (prefers-color-scheme: dark) { ._abc:hover { ... } }
```

### Dark + focus

```ts
import { cx, borderColor, ring, when, dark, focus } from 'typewritingclass'
import { gray, blue, slate } from 'typewritingclass/theme/colors'

cx(
  borderColor(gray[300]),
  when(focus)(borderColor(blue[500]), ring()),

  when(dark)(borderColor(slate[600])),
  when(dark, focus)(borderColor(blue[400]), ring('3px', '#60a5fa')),
)
```

### Dark + responsive

```ts
import { cx, bg, p, when, dark, md, lg } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'

cx(
  bg(white),
  p(4),

  when(md)(p(8)),
  when(dark)(bg(slate[900])),

  // At large screens in dark mode, use a slightly different shade
  when(lg, dark)(bg(slate[800])),
)
```

---

## Full dark mode example: Card component

Here is a complete card component with full dark mode support:

```tsx
import { cx, p, bg, textColor, borderColor, border, rounded, shadow,
         font, text, leading, mb, when, hover, dark } from 'typewritingclass'
import { white, blue, slate, gray } from 'typewritingclass/theme/colors'
import { semibold } from 'typewritingclass/theme/typography'
import * as typography from 'typewritingclass/theme/typography'
import * as borders from 'typewritingclass/theme/borders'
import * as shadows from 'typewritingclass/theme/shadows'

function Card({ title, description, href }: {
  title: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      className={cx(
        // Base light styles
        p(6),
        bg(white),
        border(),
        borderColor(gray[200]),
        rounded(borders.lg),
        shadow(shadows.sm),

        // Light hover
        when(hover)(shadow(shadows.md), borderColor(blue[300])),

        // Dark base
        when(dark)(
          bg(slate[800]),
          borderColor(slate[700]),
          shadow('none'),
        ),

        // Dark hover
        when(dark, hover)(
          bg(slate[700]),
          borderColor(slate[500]),
        ),
      )}
    >
      <h3 className={cx(
        text(typography.lg),
        font(semibold),
        textColor(slate[900]),
        mb(2),

        when(dark)(textColor(white)),
      )}>
        {title}
      </h3>
      <p className={cx(
        text(typography.sm),
        textColor(slate[600]),
        leading('1.6'),

        when(dark)(textColor(slate[400])),
      )}>
        {description}
      </p>
    </a>
  )
}
```

---

## Manual theme switching with createTheme()

For applications that need a toggle button or user preference beyond the system setting, use `createTheme()` and `setTheme()` to define and switch between named themes using the `data-theme` attribute on the document root.

### Step 1: Define themes

```ts
import { createTheme, injectTheme } from 'typewritingclass'

const lightTheme = createTheme({
  name: 'light',
  colors: {
    surface:   { bg: '#ffffff', text: '#0f172a', muted: '#64748b' },
    primary:   { 500: '#3b82f6', 600: '#2563eb' },
    border:    { default: '#e2e8f0', focus: '#3b82f6' },
  },
  shadows: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
  },
})

const darkTheme = createTheme({
  name: 'dark',
  colors: {
    surface:   { bg: '#0f172a', text: '#f1f5f9', muted: '#94a3b8' },
    primary:   { 500: '#60a5fa', 600: '#3b82f6' },
    border:    { default: '#334155', focus: '#60a5fa' },
  },
  shadows: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.3)',
  },
})

// Inject both themes' CSS custom properties
injectTheme(lightTheme.cssText)
injectTheme(darkTheme.cssText)
```

### Step 2: Use theme variables in styles

Theme variables resolve to `var(--twc-...)` CSS references, so they automatically pick up the right value based on the active theme:

```ts
import { cx, bg, textColor, shadow, borderColor } from 'typewritingclass'

// These use CSS custom properties that change when the theme switches
const cardClass = cx(
  bg(lightTheme.vars.colors.surface.bg),
  textColor(lightTheme.vars.colors.surface.text),
  borderColor(lightTheme.vars.colors.border.default),
  shadow(lightTheme.vars.shadows.card),
)
// CSS: background-color: var(--twc-color-surface-bg); etc.
```

Since both themes define the same custom property names, the `var()` references work for both light and dark -- the active `[data-theme]` selector determines which values apply.

### Step 3: Switch themes at runtime

```ts
import { setTheme } from 'typewritingclass'

// Switch to dark theme
setTheme('dark')
// Sets <html data-theme="dark"> which activates the dark theme's CSS custom properties

// Switch back to light
setTheme('light')
// Sets <html data-theme="light">
```

### Complete toggle button example

```tsx
import { useState } from 'react'
import { cx, p, bg, textColor, rounded, cursor, font, when, hover } from 'typewritingclass'
import { setTheme } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'
import { semibold } from 'typewritingclass/theme/typography'
import * as borders from 'typewritingclass/theme/borders'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  function toggle() {
    const next = !isDark
    setIsDark(next)
    setTheme(next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      className={cx(
        p(3),
        rounded(borders.md),
        bg(slate[100]),
        textColor(slate[700]),
        font(semibold),
        cursor('pointer'),
        when(hover)(bg(slate[200])),
      )}
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}
```

---

## System preference + manual override

You can combine both approaches. Use the `dark` modifier as the default, and layer `createTheme()` on top for explicit user control:

```ts
import { cx, bg, textColor, when, dark } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'

// System-based defaults
const pageClass = cx(
  bg(white),
  textColor(slate[900]),
  when(dark)(bg(slate[900]), textColor(slate[100])),
)
```

When the user explicitly picks a theme via a toggle, call `setTheme()` to override the system preference. Your `createTheme()` definitions use `[data-theme]` selectors which have higher specificity than `@media (prefers-color-scheme)`, so the manual choice wins.

---

## Color palette for dark mode

When building dark mode styles, a common pattern is to shift colors along the palette scale:

| Purpose | Light | Dark |
|---------|-------|------|
| Page background | `white` | `slate[900]` or `slate[950]` |
| Card background | `white` | `slate[800]` |
| Card hover | `slate[50]` | `slate[700]` |
| Primary text | `slate[900]` | `slate[100]` |
| Secondary text | `slate[600]` | `slate[400]` |
| Borders | `gray[200]` | `slate[700]` |
| Primary accent | `blue[600]` | `blue[400]` |
| Primary hover | `blue[700]` | `blue[300]` |

This inversion pattern keeps contrast ratios accessible in both modes.
