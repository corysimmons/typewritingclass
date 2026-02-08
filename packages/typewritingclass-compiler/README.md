# typewritingclass-compiler

Rust-powered compiler and Vite plugin for typewritingclass. Statically analyzes TypeScript source files, extracts CSS at build time, and replaces utility calls with generated class names — producing zero-runtime CSS output.

## Installation

```bash
bun add -d typewritingclass-compiler
```

## Vite Plugin

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import twcPlugin from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [twcPlugin()],
})
```

Then import the virtual CSS module:

```ts
import 'virtual:twc.css'
```

## Options

```ts
twcPlugin({
  strict: true,  // Error on dynamic values not wrapped with dynamic() (default: true)
  theme: {       // Custom theme input
    colors: { brand: { 500: '#6366f1' } },
  },
})
```

## How it works

1. **Static analysis** — the Rust extractor scans TS/JS files for `cx()`, `when()`, and utility calls
2. **CSS generation** — extracted rules are compiled into deterministic class names and CSS declarations
3. **Code transform** — utility call sites are replaced with the generated class name strings
4. **Virtual module** — `virtual:twc.css` aggregates all extracted CSS, respecting `@layer` ordering
5. **Dynamic fallback** — values that can't be statically resolved fall back to runtime CSS custom properties

## Strict mode

Strict mode (default) requires dynamic values to be explicitly wrapped with `dynamic()`. This makes the boundary between static and runtime CSS explicit. Set `strict: false` to allow implicit dynamic values.

## Exports

| Export | Description |
|---|---|
| `default` | Vite plugin factory |
| `nativeTransform` | Core transform function (Rust via NAPI) |
| `generateCss` | CSS aggregation utility |
| `ThemeInput` | Theme configuration type |
| `TransformOutput` | Transform result type |
| `ExtractedRule` | Individual extracted rule type |
| `Diagnostic` | Compiler diagnostic type |
