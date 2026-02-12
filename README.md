<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/typewriting_class_logo_light.svg">
    <source media="(prefers-color-scheme: light)" srcset=".github/typewriting_class_logo_dark.svg">
    <img alt="Typewriting Class" src=".github/typewriting_class_logo_dark.svg" width="400">
  </picture>
</p>

<p align="center"><strong>CSS-in-TS with full autocomplete.</strong></p>

```ts
import { tw } from 'typewritingclass'

const card = tw.bg.white.rounded.lg.p(6).shadow.md
const layout = tw.flex.flexCol.gap(4).items.center
```

## Install

```bash
pnpm add typewritingclass
```

## Use

```ts
import 'typewritingclass/preflight.css'
import { tw } from 'typewritingclass'

document.getElementById('app')!.className =
  tw.flex.gap(4).p(8).bg.white.rounded.lg
```

Add the Vite plugin for static CSS extraction:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import twcPlugin from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [twcPlugin()],
})
```

## Features

- **TypeScript-native** — full autocomplete and type checking
- **Property-access tokens** — `tw.bg.blue500`, `tw.rounded.lg`, `tw.font.bold`
- **Chainable** — `tw.bg.white.rounded.lg.p(6).shadow.md`
- **Modifiers** — `tw.hover.bg.blue500`, `tw.dark.bg.slate900`, `tw.md.p(8)`
- **Composable** — every chain is immutable; branch freely
- **Framework agnostic** — React, Solid, vanilla TS, anything

## Tokens

Design tokens are properties — no strings needed:

```ts
tw.bg.blue500            // background-color: #3b82f6
tw.textColor.slate900    // color: #0f172a
tw.rounded.lg            // border-radius: 0.5rem
tw.shadow.md             // box-shadow: ...
tw.text.lg               // font-size + line-height
tw.font.bold             // font-weight: 700
tw.items.center          // align-items: center
tw.cursor.pointer        // cursor: pointer

tw.bg.blue500(50)        // 50% opacity
```

Any CSS value still works as a string argument: `tw.bg('#ff6347')`.

## Modifiers

```ts
tw.hover.bg.blue500
tw.dark.bg.slate900
tw.md.p(8)
tw.hover(tw.bg.blue500.textColor.white)
```

## Standalone utilities

```ts
import { cx, bg, rounded, p } from 'typewritingclass'

cx(bg.blue500, rounded.lg, p(4))
cx(bg.blue500(25), rounded.lg, p(4))  // with opacity
```

## Starters

| Starter | Stack |
|---|---|
| [`starters/react`](starters/react) | React + Vite |
| [`starters/solid`](starters/solid) | Solid.js + Vite |
| [`starters/vanilla`](starters/vanilla) | Vanilla TS + Vite |
| [`starters/next`](starters/next) | Next.js |

## Packages

| Package | Description |
|---|---|
| [`typewritingclass`](packages/typewritingclass) | Core library |
| [`typewritingclass-compiler`](packages/typewritingclass-compiler) | Optional Vite plugin for static CSS extraction |
| [`typewritingclass-react`](packages/typewritingclass-react) | React `useStyle` hook for dynamic values |
| [`typewritingclass-next`](packages/typewritingclass-next) | Next.js integration (SSR + build-time extraction) |
| [`typewritingclass-babel`](packages/typewritingclass-babel) | Babel plugin for static extraction |
| [`typewritingclass-esbuild`](packages/typewritingclass-esbuild) | esbuild plugin for static extraction |
| [`typewritingclass-devtools`](packages/typewritingclass-devtools) | VS Code hover previews |

## License

MIT
