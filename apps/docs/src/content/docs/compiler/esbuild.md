---
title: esbuild Plugin
description: Use typewritingclass with esbuild.
sidebar:
  order: 2
---

The esbuild plugin provides static CSS extraction for projects that use esbuild as their bundler. It uses esbuild's `onResolve` and `onLoad` hooks to intercept source files, pass them through the native Rust compiler, and serve the extracted CSS through a virtual module.

## Installation

Install the esbuild plugin alongside the core compiler package:

```bash
# pnpm
pnpm add typewritingclass
pnpm add -D typewritingclass-esbuild typewritingclass-compiler

# npm
npm install typewritingclass
npm install -D typewritingclass-esbuild typewritingclass-compiler

# yarn
yarn add typewritingclass
yarn add -D typewritingclass-esbuild typewritingclass-compiler
```

`typewritingclass-esbuild` depends on `typewritingclass-compiler` as a peer dependency. The compiler package contains the native Rust binary that performs the actual AST analysis and CSS extraction.

## Configuration

Add the plugin to your esbuild build script:

```ts
// build.ts
import * as esbuild from 'esbuild'
import twcEsbuildPlugin from 'typewritingclass-esbuild'

await esbuild.build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  plugins: [twcEsbuildPlugin()],
})
```

### Options

The plugin accepts the same `strict` option as the Vite plugin:

```ts
twcEsbuildPlugin({
  strict: true, // default: true
})
```

#### strict

- **Type:** `boolean`
- **Default:** `true`

When enabled, the compiler reports an error if a `cx()` argument cannot be statically evaluated at build time, unless wrapped in `dynamic()`. See [Strict Mode](/compiler/strict-mode/) for details.

```ts
// Default: strict mode on
twcEsbuildPlugin()

// Explicitly enable
twcEsbuildPlugin({ strict: true })

// Disable strict mode
twcEsbuildPlugin({ strict: false })
```

## Virtual CSS module

Like the Vite plugin, the esbuild plugin uses a virtual module to serve the extracted CSS. Import it in your entry file:

```ts
// src/main.ts or src/main.tsx
import 'virtual:twc.css'
```

The plugin intercepts this import using `onResolve` and resolves it to a custom namespace. The `onLoad` hook then generates the combined CSS from all extracted rules and returns it with `loader: 'css'`, so esbuild treats it as a CSS file and includes it in the output bundle.

## How it works

The esbuild plugin operates through two hook types:

### onResolve

The plugin registers an `onResolve` hook that matches the `virtual:twc.css` import path. When esbuild encounters this import, the hook redirects it to a custom namespace (`twc-virtual-css`) instead of looking for a file on disk.

### onLoad

Two `onLoad` hooks are registered:

1. **Virtual CSS loader:** Matches the `twc-virtual-css` namespace. When triggered, it collects all CSS rules extracted from source files and returns them as a CSS string.

2. **Source file transformer:** Matches `.ts`, `.tsx`, `.js`, and `.jsx` files. For each file that contains `typewritingclass` imports:
   - Reads the file contents.
   - Passes the source to the native Rust compiler.
   - Stores the extracted CSS rules.
   - Returns the transformed JavaScript with the `virtual:twc.css` import prepended.
   - Surfaces any diagnostics as esbuild warnings or errors.

### File filtering

The source file transformer only processes files that:

1. Have a `.ts`, `.tsx`, `.js`, or `.jsx` extension.
2. Are not inside `node_modules`.
3. Contain the string `typewritingclass` in their source code.

The correct esbuild loader (`ts`, `tsx`, `js`, or `jsx`) is automatically selected based on the file extension.

## Build script examples

### Basic build

```ts
// build.ts
import * as esbuild from 'esbuild'
import twcEsbuildPlugin from 'typewritingclass-esbuild'

await esbuild.build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  plugins: [twcEsbuildPlugin()],
})
```

### With React JSX transform

```ts
// build.ts
import * as esbuild from 'esbuild'
import twcEsbuildPlugin from 'typewritingclass-esbuild'

await esbuild.build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  format: 'esm',
  jsx: 'automatic',
  plugins: [twcEsbuildPlugin()],
})
```

### Watch mode

```ts
// dev.ts
import * as esbuild from 'esbuild'
import twcEsbuildPlugin from 'typewritingclass-esbuild'

const ctx = await esbuild.context({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  plugins: [twcEsbuildPlugin()],
})

await ctx.watch()
console.log('Watching for changes...')
```

### Serve mode

```ts
// serve.ts
import * as esbuild from 'esbuild'
import twcEsbuildPlugin from 'typewritingclass-esbuild'

const ctx = await esbuild.context({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist',
  plugins: [twcEsbuildPlugin()],
})

const { host, port } = await ctx.serve({
  servedir: 'dist',
})

console.log(`Serving at http://${host}:${port}`)
```

## Diagnostics

The plugin surfaces compiler diagnostics through esbuild's native warning and error system:

- **Errors** cause the build to fail and are displayed with file path, line, and column information.
- **Warnings** are displayed in the terminal but do not fail the build.

```
✘ [ERROR] Cannot statically evaluate argument to cx() — wrap dynamic values in dynamic()

    src/App.tsx:12:15:
      12 │ const style = cx(p(spacing), bg(color))
         ╵                  ~~~~~~~
```

## Fallback behavior

If the Rust compiler fails to transform a file, the plugin falls back gracefully:

1. The original source code is preserved.
2. A runtime import (`import 'typewritingclass/inject'`) is prepended so styles work at runtime.
3. No CSS is extracted for that file, but the application still functions.

## Comparison with the Vite plugin

| Feature | Vite Plugin | esbuild Plugin |
|---|---|---|
| Package | `typewritingclass-compiler` | `typewritingclass-esbuild` |
| HMR support | Yes (full) | Via esbuild watch/serve |
| Virtual CSS module | `virtual:twc.css` | `virtual:twc.css` |
| Strict mode | Yes | Yes |
| Source maps | Yes (MagicString) | Handled by esbuild |
| Diagnostics | Vite error overlay | esbuild terminal output |

Both plugins use the same native Rust compiler binary from `typewritingclass-compiler` and produce identical CSS output.
