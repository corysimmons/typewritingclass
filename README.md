<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./typewriting_class_logo_light.svg">
    <source media="(prefers-color-scheme: light)" srcset="./typewriting_class_logo_dark.svg">
    <img alt="Typewriting Class" src="./typewriting_class_logo_dark.svg" width="400">
  </picture>
</p>

<p align="center"><strong>CSS-in-TS. Composable. Compiled. Correct.</strong></p>

Typewriting Class is a CSS-in-TypeScript framework where utilities are functions, not string conventions. Chain them with `tw`, the primary API. Static by default — the compiler extracts CSS at build time. Dynamic when needed — CSS custom properties as an escape hatch.

```ts
import { tw } from 'typewritingclass'

const card = tw.bg('white').rounded('lg').p(6).shadow('md')
const layout = tw.flex.flexCol.gap(4)
```

## Features

- **TypeScript-native** — CSS utilities are functions with full type safety and autocompletion
- **Chainable `tw` API** — fluent builder syntax with zero-argument utilities as properties
- **Zero runtime by default** — Rust-powered compiler extracts static CSS at build time
- **Modifiers built in** — hover, responsive, dark mode via `tw.hover`, `tw.md`, `tw.dark`
- **Composable and immutable** — every chain returns a new value; the original is unchanged
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
import { tw } from 'typewritingclass'

document.getElementById('app')!.className =
  `${tw.flex.gap(4).p(8).bg('white').rounded('lg')}`
```

## The `tw` API

### Chain utilities

```ts
tw.bg('white').rounded('lg').p(6).shadow('md')
```

### Value-less utilities as properties

```ts
tw.flex.flexCol.items('center')
```

### Modifiers

```ts
// Single utility
tw.hover.bg('blue-500')
tw.dark.bg('slate-900')
tw.md.p(8)

// Multiple utilities under one modifier
tw.hover(tw.bg('blue-500').textColor('white'))
```

### Use in JSX

```tsx
<div className={`${tw.p(4).bg('blue-500')}`} />
```

### Composable and immutable

Every chain returns a new instance — the original is never mutated:

```ts
const base = tw.flex.flexCol
const withGap = base.gap(4)  // base unchanged
```

## Advanced: `cx()` and `when()`

For dynamic values, runtime conditionals, or when you prefer a functional style:

```ts
import { cx, bg, p, textColor, rounded, when } from 'typewritingclass'
import { hover } from 'typewritingclass'

cx(p(4), bg('blue-500'), textColor('white'), rounded('lg'), when(hover)(bg('blue-600')))
```

## Packages

| Package | Description |
|---|---|
| [`typewritingclass`](packages/typewritingclass) | Core utility functions, modifiers, and theme tokens |
| [`typewritingclass-compiler`](packages/typewritingclass-compiler) | Rust-powered Vite plugin for static CSS extraction |
| [`typewritingclass-react`](packages/typewritingclass-react) | React hook (`useStyle`) for composing styles in components |
| [`typewritingclass-babel`](packages/typewritingclass-babel) | Babel plugin for CSS extraction in non-Vite builds |
| [`typewritingclass-esbuild`](packages/typewritingclass-esbuild) | esbuild plugin for CSS extraction |
| [`typewritingclass-next`](packages/typewritingclass-next) | Next.js integration (SSR styles, build-time extraction) |
| [`typewritingclass-devtools`](packages/typewritingclass-devtools) | VS Code extension with inline CSS preview on hover |

## Apps

| App | Description |
|---|---|
| [`docs`](apps/docs) | Documentation site built with Astro Starlight |
| [`demo-react`](apps/demo-react) | Interactive React demo showcasing all features |
| [`demo-solid`](apps/demo-solid) | Solid.js demo |
| [`demo-vanilla`](apps/demo-vanilla) | Vanilla TypeScript demo |
| [`demo-next`](apps/demo-next) | Next.js demo |
| [`comparison`](apps/comparison) | Performance and feature comparison |
| [`visual-tests`](apps/visual-tests) | Playwright visual regression test suite |

## Starters

Minimal project templates to get started quickly:

| Starter | Description |
|---|---|
| [`starters/react`](starters/react) | React + Vite + Typewriting Class |
| [`starters/solid`](starters/solid) | Solid.js + Vite + Typewriting Class |
| [`starters/vanilla`](starters/vanilla) | Vanilla TypeScript + Vite + Typewriting Class |
| [`starters/next`](starters/next) | Next.js + Typewriting Class |

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
