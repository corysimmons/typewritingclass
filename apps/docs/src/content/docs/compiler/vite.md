---
title: Vite Plugin
description: Configure the typewritingclass Vite plugin for static CSS extraction.
sidebar:
  order: 1
---

The Vite plugin is the recommended way to use typewritingclass. It statically analyzes your TypeScript/JavaScript source files at build time, extracts all `cx()` calls into optimized CSS, and serves the result through a virtual CSS module. In development, it provides full HMR support so styles update instantly as you edit.

## Installation

```bash
# pnpm
pnpm add typewritingclass
pnpm add -D typewritingclass-compiler

# npm
npm install typewritingclass
npm install -D typewritingclass-compiler

# yarn
yarn add typewritingclass
yarn add -D typewritingclass-compiler
```

The `typewritingclass-compiler` package contains both the Vite plugin and the native Rust compiler binary.

## Configuration

Add the plugin to your `vite.config.ts`:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { twcPlugin } from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [twcPlugin()],
})
```

### With React

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { twcPlugin } from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [react(), twcPlugin()],
})
```

### With Solid

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { twcPlugin } from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [solidPlugin(), twcPlugin()],
})
```

### With Svelte, Vue, or other frameworks

The plugin works with any framework that uses Vite. Add it alongside your framework's Vite plugin:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { twcPlugin } from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [
    // your framework plugin here
    twcPlugin(),
  ],
})
```

## Options

The plugin accepts an optional configuration object:

```ts
twcPlugin({
  strict: true, // default: true
})
```

### strict

- **Type:** `boolean`
- **Default:** `true`

When `strict` is enabled (the default), the compiler reports an error if a `cx()` argument cannot be statically evaluated at build time, unless the value is explicitly wrapped in `dynamic()`. This ensures maximum static extraction and prevents accidental runtime overhead.

See [Strict Mode](/compiler/strict-mode/) for a detailed explanation.

```ts
// strict: true (default)
twcPlugin()
twcPlugin({ strict: true })

// Disable strict mode
twcPlugin({ strict: false })
```

## Virtual CSS module

The plugin exposes a virtual module called `virtual:twc.css`. Import it once in your application's entry file:

```ts
// src/main.ts or src/main.tsx
import 'virtual:twc.css'
```

This import does not correspond to a file on disk. The plugin intercepts it and serves the aggregated CSS extracted from all your source files. The CSS is updated automatically during development when you change styles.

### TypeScript declaration

If TypeScript complains about the `virtual:twc.css` import, add a declaration file:

```ts
// src/vite-env.d.ts or src/env.d.ts
declare module 'virtual:twc.css' {
  const css: string
  export default css
}
```

Or add it to your existing Vite client types file:

```ts
/// <reference types="vite/client" />

declare module 'virtual:twc.css' {}
```

## How it works

The plugin operates in four phases:

### 1. Theme loading

At build start, the plugin dynamically imports all theme modules from the `typewritingclass` package (colors, spacing, typography, sizes, shadows, borders). These values are serialized and passed to the Rust compiler so it can resolve theme tokens like `blue[500]` to their actual CSS values.

### 2. Transform (per file)

For each `.ts`, `.tsx`, `.js`, or `.jsx` file that contains `typewritingclass` imports, the plugin:

1. Passes the source code to the native Rust compiler.
2. The Rust compiler parses the AST and identifies all `cx()`, `dcx()`, and utility function calls.
3. For each call, it evaluates the arguments, resolves theme tokens, and generates the corresponding CSS rules.
4. The compiler replaces the original function calls with the generated class name strings in the output code.
5. The extracted CSS rules are stored in memory, keyed by file path.

### 3. CSS generation

When the `virtual:twc.css` module is requested, the plugin collects all extracted CSS rules from all processed files and passes them to the native `generateCss()` function. This function:

- Deduplicates identical rules.
- Orders rules by their layer number (later `cx()` arguments get higher layers for correct override behavior).
- Wraps rules in `@layer` directives.
- Returns the final CSS string.

### 4. HMR (development)

When a source file changes during development:

1. Vite triggers the `handleHotUpdate` hook.
2. The plugin invalidates the `virtual:twc.css` module in Vite's module graph.
3. Vite re-requests the virtual module, which regenerates the CSS with the updated rules.
4. The browser receives the updated CSS and applies it without a full page reload.

## Source maps

The plugin generates source maps using [MagicString](https://github.com/rich-harris/magic-string). When you inspect a styled element in your browser's DevTools, the CSS rule traces back to the original TypeScript source file and line where the `cx()` call was written, not to the generated CSS.

Source maps are generated automatically and require no configuration. They work in both development and production builds.

### How source maps are generated

When the Rust compiler transforms a file, the plugin creates a `MagicString` instance from the original source. If the transformed code differs from the original, the content is overwritten. The `MagicString.generateMap()` method produces a source map that maps the output positions back to the original source:

```ts
const s = new MagicString(originalCode)
s.overwrite(0, originalCode.length, transformedCode)

return {
  code: s.toString(),
  map: s.generateMap({ source: filePath, includeContent: true }),
}
```

The `includeContent: true` option embeds the original source in the map, so DevTools can display it even without access to the source file.

## Diagnostics

The compiler produces diagnostics (warnings and errors) that are surfaced through Vite's built-in error reporting:

- **Errors** appear in Vite's error overlay in the browser during development and cause the build to fail in production.
- **Warnings** appear in the terminal output.

Common diagnostics include:

| Diagnostic | Severity | Cause |
|---|---|---|
| `Cannot statically evaluate argument` | Error (strict mode) | A `cx()` argument is a variable or expression that the compiler cannot resolve at build time. Wrap it in `dynamic()` or disable strict mode. |
| `Unknown utility function` | Warning | A function call inside `cx()` is not a recognized typewritingclass utility. |
| `Property conflict detected` | Warning | Multiple arguments in the same `cx()` call set the same CSS property. |

## Fallback behavior

If the Rust compiler fails to transform a file (for example, due to an unsupported syntax pattern), the plugin falls back gracefully:

1. The original source code is preserved.
2. A runtime import (`import 'typewritingclass/inject'`) is prepended to the file, enabling runtime CSS injection as a fallback.
3. No CSS is extracted for that file, but the application still works.

This ensures your build never breaks due to a compiler limitation.

## File filtering

The plugin only processes files that:

1. Have a `.ts`, `.tsx`, `.js`, or `.jsx` extension.
2. Are not inside `node_modules`.
3. Contain the string `typewritingclass` in their source code.

Files that do not match all three criteria are passed through unchanged, with zero overhead.

## Example project structure

```
my-app/
  src/
    main.tsx          # import 'virtual:twc.css'
    App.tsx           # Uses cx(), bg(), p(), etc.
    components/
      Button.tsx      # Uses cx(), when(hover), etc.
      Card.tsx        # Uses cx(), rounded(), shadow(), etc.
  vite.config.ts      # twcPlugin()
  package.json
```

At build time, the plugin extracts CSS from `App.tsx`, `Button.tsx`, and `Card.tsx`, deduplicates rules, and emits a single optimized CSS bundle through `virtual:twc.css`.
