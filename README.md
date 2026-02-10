<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/typewriting_class_logo_light.svg">
    <source media="(prefers-color-scheme: light)" srcset=".github/typewriting_class_logo_dark.svg">
    <img alt="Typewriting Class" src=".github/typewriting_class_logo_dark.svg" width="400">
  </picture>
</p>

<p align="center"><strong>CSS-in-TS. Composable. Compiled. Correct.</strong></p>

Typewriting Class is a CSS-in-TypeScript framework where utilities are functions, not string conventions. Chain them with `tw`, the primary API. Static by default — the compiler extracts CSS at build time. Dynamic when needed — CSS custom properties as an escape hatch.

```ts
import { tw } from 'typewritingclass'

const card = tw.bg.white.rounded.lg.p(6).shadow.md
const layout = tw.flex.flexCol.gap(4).items.center
```

## Features

- **TypeScript-native** — CSS utilities are functions with full type safety and autocompletion
- **Property-access tokens** — `tw.bg.blue500`, `tw.rounded.lg`, `tw.font.bold` — no strings for design tokens
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
pnpm add typewritingclass
pnpm add -D typewritingclass-compiler
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
  tw.flex.gap(4).p(8).bg.white.rounded.lg
```

## The `tw` API

### Property-access tokens

Design tokens are accessed via property names — no strings needed:

```ts
tw.bg.blue500            // background-color: #3b82f6
tw.textColor.slate900    // color: #0f172a
tw.rounded.lg            // border-radius: 0.5rem
tw.shadow.md             // box-shadow: ...
tw.text.lg               // font-size: 1.125rem; line-height: 1.75rem
tw.font.bold             // font-weight: 700
tw.items.center          // align-items: center
tw.justify.between       // justify-content: space-between
tw.cursor.pointer        // cursor: pointer
```

Color tokens support opacity via callable syntax:

```ts
tw.bg.blue500(50)        // background-color: rgb(59 130 246 / 0.5)
```

### Chain utilities

```ts
tw.bg.white.rounded.lg.p(6).shadow.md
```

### Value-less utilities as properties

```ts
tw.flex.flexCol.items.center
```

### Arbitrary values

Pass any CSS value as a string argument:

```ts
tw.bg('white').rounded('lg').p(6).shadow('md')
```

### Modifiers

```ts
// Single utility
tw.hover.bg.blue500
tw.dark.bg.slate900
tw.md.p(8)

// Multiple utilities under one modifier
tw.hover(tw.bg.blue500.textColor.white)
```

### Use in JSX

```tsx
<div className={tw.p(4).bg.blue500} />
```

### Composable and immutable

Every chain returns a new instance — the original is never mutated:

```ts
const base = tw.flex.flexCol
const withGap = base.gap(4)  // base unchanged
```

## Standalone utilities with `cx()`

Utilities can be imported individually. They also support property-access tokens:

```ts
import { cx, bg, rounded, p, when, hover } from 'typewritingclass'

cx(bg.blue500, rounded.lg, p(4))

// With opacity
cx(bg.blue500(25), rounded.lg, p(4))

// With modifiers
cx(p(4), bg.blue500, when(hover)(bg.blue600))
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
pnpm install

# Run a starter
pnpm --filter twc-starter-react dev

# Run tests
pnpm --filter typewritingclass test

# Run visual tests
pnpm --filter visual-tests test

# Build docs
pnpm --filter docs build
```

## License

MIT
