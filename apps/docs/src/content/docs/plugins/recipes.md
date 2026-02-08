---
title: "Recipes & Composites"
description: "Build reusable style compositions and component recipes."
sidebar:
  order: 4
---

Utilities and modifiers are the atoms of typewritingclass. **Recipes** and **composites** are molecules -- higher-level functions that combine multiple utilities into reusable design patterns. A card, a button, a form input, a navigation bar: these are all recipes.

## What is a recipe?

A recipe is a plain function that returns one or more `StyleRule` objects (or a class string from `cx()`). It is not a new concept -- it is just a function that calls other functions:

```ts
import { cx, p, bg, rounded, shadow, textColor } from 'typewritingclass'
import { white, gray } from 'typewritingclass/theme/colors'

export function card() {
  return cx(
    p(6),
    bg(white),
    rounded('lg'),
    shadow('md'),
    textColor(gray[900]),
  )
}
```

Usage:

```tsx
import { card } from './recipes'

function ProductCard({ title }: { title: string }) {
  return <div className={card()}>{title}</div>
}
```

There is no magic. The `card()` function calls utilities, composes them with `cx()`, and returns a class string.

## Recipes with variants

Most real-world components have variants: a primary button vs. a secondary button, a small badge vs. a large badge. Model these as function parameters:

```ts
import { cx, p, px, py, bg, textColor, rounded, border, borderColor, css, when, hover } from 'typewritingclass'
import { blue, gray, white, red } from 'typewritingclass/theme/colors'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export function button(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
) {
  return cx(
    // Base styles shared by all variants
    rounded('lg'),
    css`
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    `,

    // Size
    ...sizeStyles(size),

    // Variant
    ...variantStyles(variant),
  )
}

function sizeStyles(size: ButtonSize) {
  switch (size) {
    case 'sm': return [px(3), py(1), css`font-size: 0.875rem;`]
    case 'md': return [px(4), py(2), css`font-size: 1rem;`]
    case 'lg': return [px(6), py(3), css`font-size: 1.125rem;`]
  }
}

function variantStyles(variant: ButtonVariant) {
  switch (variant) {
    case 'primary':
      return [
        bg(blue[500]),
        textColor(white),
        when(hover)(bg(blue[600])),
      ]
    case 'secondary':
      return [
        bg(white),
        textColor(gray[700]),
        border('1px solid'),
        borderColor(gray[300]),
        when(hover)(bg(gray[50])),
      ]
    case 'danger':
      return [
        bg(red[500]),
        textColor(white),
        when(hover)(bg(red[600])),
      ]
    case 'ghost':
      return [
        bg('transparent'),
        textColor(gray[700]),
        when(hover)(bg(gray[100])),
      ]
  }
}
```

Usage:

```tsx
<button className={button('primary', 'lg')}>Submit</button>
<button className={button('secondary', 'sm')}>Cancel</button>
<button className={button('danger')}>Delete</button>
<button className={button('ghost')}>More</button>
```

### Object-based variant API

For recipes with many variants, an options object is more readable:

```ts
import { cx, p, px, py, bg, textColor, rounded, shadow, css, when, hover } from 'typewritingclass'
import { blue, green, gray, white, yellow, red } from 'typewritingclass/theme/colors'

interface BadgeOptions {
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
}

const colorMap = {
  blue:   { bg: blue[100],   text: blue[800] },
  green:  { bg: green[100],  text: green[800] },
  red:    { bg: red[100],    text: red[800] },
  yellow: { bg: yellow[100], text: yellow[800] },
  gray:   { bg: gray[100],   text: gray[800] },
} as const

export function badge(options: BadgeOptions = {}) {
  const {
    color = 'gray',
    size = 'md',
    rounded: isRounded = false,
  } = options

  const { bg: bgColor, text: textCol } = colorMap[color]

  return cx(
    bg(bgColor),
    textColor(textCol),
    rounded(isRounded ? 'full' : 'md'),
    css`
      display: inline-flex;
      align-items: center;
      font-weight: 500;
    `,

    // Size
    ...(size === 'sm' ? [px(2), py(0.5), css`font-size: 0.75rem;`] : []),
    ...(size === 'md' ? [px(3), py(1), css`font-size: 0.875rem;`] : []),
    ...(size === 'lg' ? [px(4), py(1.5), css`font-size: 1rem;`] : []),
  )
}
```

Usage:

```tsx
<span className={badge({ color: 'green', size: 'sm' })}>Active</span>
<span className={badge({ color: 'red', rounded: true })}>Error</span>
<span className={badge()}>Default</span>
```

## Composites: returning `StyleRule` instead of strings

Sometimes you want to return a `StyleRule` rather than a finished class string, so the consumer can further compose it with modifiers:

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'
import { combineRules } from 'typewritingclass/rule'
import { p, bg, rounded, shadow, textColor } from 'typewritingclass'
import { white, gray } from 'typewritingclass/theme/colors'

export function cardBase(): StyleRule {
  return combineRules([
    p(6),
    bg(white),
    rounded('lg'),
    shadow('sm'),
    textColor(gray[900]),
  ])
}
```

The consumer can wrap the composite in modifiers:

```ts
import { cx, when, hover, md } from 'typewritingclass'
import { cardBase } from './composites'

const card = cx(
  cardBase(),
  when(hover)(shadow('lg')),
  when(md)(p(8)),
)
```

## Recipes that accept additional styles

A common pattern is to accept additional styles from the consumer and merge them:

```ts
import type { StyleRule } from 'typewritingclass'
import { cx, p, bg, rounded, shadow, textColor, css } from 'typewritingclass'
import { white, gray } from 'typewritingclass/theme/colors'

export function card(...extra: (StyleRule | string)[]) {
  return cx(
    p(6),
    bg(white),
    rounded('lg'),
    shadow('sm'),
    textColor(gray[900]),
    ...extra,
  )
}
```

Usage:

```tsx
import { css, when, hover } from 'typewritingclass'
import { card } from './recipes'

// Base card
<div className={card()}>Basic card</div>

// Card with extra styles
<div className={card(
  css`border: 1px solid #e5e7eb;`,
  when(hover)(shadow('lg')),
)}>
  Enhanced card
</div>
```

Because later arguments to `cx()` override earlier ones (via CSS layer ordering), the consumer can override any of the recipe's default styles.

## Compound recipes

Recipes can compose other recipes:

```ts
import { cx, p, bg, textColor, rounded, css, when, hover } from 'typewritingclass'
import { white, gray, blue } from 'typewritingclass/theme/colors'

// Low-level composites
function surface() {
  return cx(bg(white), rounded('lg'), css`box-shadow: 0 1px 2px rgba(0,0,0,0.05);`)
}

function heading() {
  return cx(textColor(gray[900]), css`font-size: 1.25rem; font-weight: 700;`)
}

function body() {
  return cx(textColor(gray[600]), css`font-size: 0.875rem; line-height: 1.5;`)
}

// Higher-level recipe that composes them
export function articleCard(title: string, excerpt: string) {
  return {
    container: cx(surface(), p(6)),
    title: heading(),
    excerpt: body(),
  }
}
```

Usage:

```tsx
import { articleCard } from './recipes'

function Article({ title, excerpt }: { title: string; excerpt: string }) {
  const styles = articleCard(title, excerpt)

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.excerpt}>{excerpt}</p>
    </article>
  )
}
```

### Multi-element recipes

For components with multiple styled elements, return an object of class strings:

```ts
import { cx, p, px, py, bg, textColor, rounded, border, borderColor, css, when, hover } from 'typewritingclass'
import { white, gray, blue } from 'typewritingclass/theme/colors'

export function dialog() {
  return {
    overlay: cx(
      css`
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      `,
    ),
    panel: cx(
      bg(white),
      rounded('xl'),
      css`
        max-width: 32rem;
        width: 100%;
        max-height: 85vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      `,
    ),
    header: cx(
      px(6),
      py(4),
      border('0'),
      borderColor(gray[200]),
      css`border-bottom-width: 1px; border-bottom-style: solid;`,
      textColor(gray[900]),
      css`font-size: 1.125rem; font-weight: 600;`,
    ),
    body: cx(
      p(6),
      textColor(gray[700]),
    ),
    footer: cx(
      px(6),
      py(4),
      border('0'),
      borderColor(gray[200]),
      css`border-top-width: 1px; border-top-style: solid;`,
      css`display: flex; justify-content: flex-end; gap: 0.5rem;`,
    ),
  }
}
```

Usage:

```tsx
import { dialog } from './recipes'
import { button } from './button-recipe'

function ConfirmDialog({ onConfirm, onCancel }: Props) {
  const d = dialog()

  return (
    <div className={d.overlay}>
      <div className={d.panel}>
        <div className={d.header}>Confirm Action</div>
        <div className={d.body}>
          Are you sure you want to proceed?
        </div>
        <div className={d.footer}>
          <button className={button('ghost')} onClick={onCancel}>Cancel</button>
          <button className={button('danger')} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
```

## Dynamic recipes

Recipes can use `dcx()` and `dynamic()` for runtime values:

```ts
import { dcx, bg, textColor, p, rounded, dynamic } from 'typewritingclass'

export function colorSwatch(color: string) {
  return dcx(
    bg(dynamic(color)),
    textColor('#ffffff'),
    p(4),
    rounded('lg'),
  )
}
```

Usage:

```tsx
import { colorSwatch } from './recipes'

function Swatch({ color }: { color: string }) {
  const { className, style } = colorSwatch(color)
  return <div className={className} style={style}>{color}</div>
}
```

## Sharing recipes via npm

Recipes are plain TypeScript modules, so publishing them follows the same pattern as utilities.

### Package structure

```
@mycompany/twc-recipes/
  src/
    index.ts
    button.ts
    card.ts
    dialog.ts
    form.ts
    layout.ts
  package.json
```

### package.json

```json
{
  "name": "@mycompany/twc-recipes",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },
    "./button": {
      "types": "./src/button.ts",
      "default": "./src/button.ts"
    },
    "./card": {
      "types": "./src/card.ts",
      "default": "./src/card.ts"
    }
  },
  "peerDependencies": {
    "typewritingclass": ">=0.2.0"
  }
}
```

### Consumer usage

```tsx
import { button } from '@mycompany/twc-recipes/button'
import { card } from '@mycompany/twc-recipes/card'

function App() {
  return (
    <div className={card()}>
      <button className={button('primary', 'md')}>Click me</button>
    </div>
  )
}
```

### Theming considerations

When building recipes for distribution, avoid hardcoding colors. Instead, accept theme tokens as parameters or use CSS custom properties that consumers can override:

```ts
import { cx, p, bg, textColor, rounded, css } from 'typewritingclass'
import type { CSSColor } from 'typewritingclass'

interface CardTheme {
  background: CSSColor | string
  text: CSSColor | string
  radius: string
}

const defaultTheme: CardTheme = {
  background: '#ffffff',
  text: '#111827',
  radius: 'lg',
}

export function card(theme: Partial<CardTheme> = {}) {
  const t = { ...defaultTheme, ...theme }
  return cx(
    p(6),
    bg(t.background),
    textColor(t.text),
    rounded(t.radius),
    css`box-shadow: 0 1px 3px rgba(0,0,0,0.1);`,
  )
}
```

Consumers can customize the recipe without forking it:

```tsx
import { card } from '@mycompany/twc-recipes'
import { slate } from 'typewritingclass/theme/colors'

// Use the default theme
<div className={card()}>Default card</div>

// Override with a dark theme
<div className={card({ background: slate[800], text: '#f8fafc' })}>
  Dark card
</div>
```

## Patterns summary

| Pattern | When to use |
|---|---|
| Simple recipe (returns `string`) | Component with a single styled element |
| Multi-element recipe (returns `object`) | Component with multiple styled children |
| Recipe with variants (enum params) | Component with visual variants (primary, secondary) |
| Recipe with options (object param) | Component with many optional configuration knobs |
| Composable recipe (accepts `...extra`) | Component that consumers need to extend |
| Dynamic recipe (uses `dcx`) | Component with runtime-determined values |
| Composite (returns `StyleRule`) | Reusable style fragment meant for further composition |

All patterns are just functions. There is no special API to learn, no registration step, and no configuration to maintain. Write functions, export them, import them where you need them.
