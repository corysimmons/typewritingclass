# Typewriting Class

**CSS-in-TS. Composable. Compiled. Correct.**

Typewriting Class is a CSS-in-TypeScript framework where utilities are functions, not string conventions. Only two functions to learn: `cx()` to compose and `when()` to modify. Static by default — the compiler extracts CSS at build time. Dynamic when needed — CSS custom properties as an escape hatch.

```ts
import { cx, p, bg, textColor, rounded, when } from 'typewritingclass'
import { hover } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

const button = cx(
  p(4),
  bg(blue[500]),
  textColor(white),
  rounded('lg'),
  when(hover)(bg(blue[600]))
)
```

## Features

- **TypeScript-native** — CSS utilities are functions with full type safety and autocompletion
- **Two functions** — `cx()` composes styles, `when()` applies modifiers (hover, responsive, dark mode)
- **Zero runtime by default** — Rust-powered compiler extracts static CSS at build time
- **Dynamic escape hatch** — `dynamic()` wraps values as CSS custom properties when needed
- **Branded types** — prevent impossible CSS combinations at the type level
- **Layered CSS** — `@layer` ordering means class order determines specificity, not selector weight
- **Themeable** — built-in design tokens with `createTheme()` for custom themes
- **Framework agnostic** — works with React, Solid, vanilla TS, or any framework

## Getting Started

```bash
# Install the core library and compiler
bun add typewritingclass
bun add -d typewritingclass-compiler
```

Add the Vite plugin:

```ts
// vite.config.ts
import twcPlugin from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [twcPlugin()],
})
```

Import the generated CSS:

```ts
import 'virtual:twc.css'
```

Start styling:

```ts
import { cx, p, bg, textColor, rounded, flex, gap } from 'typewritingclass'
import { blue, white, slate } from 'typewritingclass/theme/colors'

document.getElementById('app')!.className = cx(
  flex(), gap(4), p(8),
  bg(white), rounded('lg'),
)
```

## Packages

| Package | Description |
|---|---|
| [`typewritingclass`](packages/typewritingclass) | Core utility functions, modifiers, and theme tokens |
| [`typewritingclass-compiler`](packages/typewritingclass-compiler) | Rust-powered Vite plugin for static CSS extraction |
| [`typewritingclass-react`](packages/typewritingclass-react) | React hook (`useStyle`) for composing styles in components |
| [`typewritingclass-babel`](packages/typewritingclass-babel) | Babel plugin for CSS extraction in non-Vite builds |
| [`typewritingclass-esbuild`](packages/typewritingclass-esbuild) | esbuild plugin for CSS extraction |
| [`typewritingclass-devtools`](packages/typewritingclass-devtools) | VS Code extension with inline CSS preview on hover |

## Apps

| App | Description |
|---|---|
| [`docs`](apps/docs) | Documentation site built with Astro Starlight |
| [`demo-react`](apps/demo-react) | Interactive React demo showcasing all features |
| [`demo-solid`](apps/demo-solid) | Solid.js demo |
| [`demo-vanilla`](apps/demo-vanilla) | Vanilla TypeScript demo |
| [`visual-tests`](apps/visual-tests) | Playwright visual regression test suite |

## Starters

Minimal project templates to get started quickly:

| Starter | Description |
|---|---|
| [`starters/react`](starters/react) | React + Vite + Typewriting Class |
| [`starters/solid`](starters/solid) | Solid.js + Vite + Typewriting Class |
| [`starters/vanilla`](starters/vanilla) | Vanilla TypeScript + Vite + Typewriting Class |

## Core Concepts

### Utilities are functions

Every CSS property is a TypeScript function that returns a style rule:

```ts
p(4)          // padding: 1rem
bg(blue[500]) // background-color: #3b82f6
text('lg')    // font-size: 1.125rem; line-height: 1.75rem
```

### `cx()` composes

Combine any number of utilities into a single class name:

```ts
cx(p(4), bg(white), rounded('lg'), shadow('md'))
```

### `when()` modifies

Apply styles conditionally with pseudo-classes, breakpoints, or color schemes:

```ts
when(hover)(bg(blue[600]))           // :hover
when(md)(flexRow(), gap(8))          // @media (min-width: 768px)
when(dark)(bg(slate[900]))           // @media (prefers-color-scheme: dark)
when(hover, focus)(ring(2))          // :hover:focus
```

### Themes

Use built-in tokens or create custom themes:

```ts
import { createTheme } from 'typewritingclass/theme/createTheme'

const myTheme = createTheme({
  colors: { brand: { 500: '#6366f1' } },
  spacing: { compact: '0.5rem' },
})
```

## Development

```bash
# Install dependencies
bun install

# Run the React demo
bun --filter demo-react dev

# Run tests
bun --filter typewritingclass test

# Run visual tests
bun --filter visual-tests test

# Build docs
bun --filter docs build
```

## License

MIT
