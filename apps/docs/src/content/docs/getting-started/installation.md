---
title: Installation
description: Install typewritingclass and set up your build tool.
sidebar:
  order: 1
---

This guide walks you through installing typewritingclass and configuring your build tool so the compiler can extract static CSS at build time.

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** -- typewritingclass uses modern JavaScript features that require Node 18 or later. You can check your version with `node --version`.
- A package manager: **pnpm** (recommended), **npm**, or **yarn**.
- A project using a supported build tool: **Vite**, **esbuild**, or **Babel**.

## Step 1: Install the core package

The `typewritingclass` package contains all the utility functions, modifiers, theme tokens, and the `cx()` / `when()` composition API.

import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="pnpm">
    ```bash
    pnpm add typewritingclass
    ```
  </TabItem>
  <TabItem label="npm">
    ```bash
    npm install typewritingclass
    ```
  </TabItem>
  <TabItem label="yarn">
    ```bash
    yarn add typewritingclass
    ```
  </TabItem>
</Tabs>

## Step 2: Install the compiler plugin

typewritingclass works by statically analyzing your TypeScript at build time. A Rust-based compiler extracts utility calls, resolves theme tokens, and emits optimized CSS -- so there is zero runtime style generation in production. Choose the plugin that matches your build tool.

### Vite

The Vite plugin is the recommended setup for most projects. It provides full HMR support, so styles update instantly as you edit.

<Tabs>
  <TabItem label="pnpm">
    ```bash
    pnpm add -D typewritingclass-compiler
    ```
  </TabItem>
  <TabItem label="npm">
    ```bash
    npm install -D typewritingclass-compiler
    ```
  </TabItem>
  <TabItem label="yarn">
    ```bash
    yarn add -D typewritingclass-compiler
    ```
  </TabItem>
</Tabs>

Add the plugin to your Vite config:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { twcPlugin } from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [react(), twcPlugin()],
})
```

The `twcPlugin()` function accepts an optional configuration object:

```ts
twcPlugin({
  strict: true, // default: true -- enables strict mode for compile-time diagnostics
})
```

When `strict` is enabled, the compiler reports errors for invalid utility arguments (for example, passing a string where a number is expected) directly in Vite's error overlay.

### esbuild

If you are using esbuild directly, install the esbuild-specific plugin package. It depends on `typewritingclass-compiler` as a peer dependency, so install both.

<Tabs>
  <TabItem label="pnpm">
    ```bash
    pnpm add -D typewritingclass-esbuild typewritingclass-compiler
    ```
  </TabItem>
  <TabItem label="npm">
    ```bash
    npm install -D typewritingclass-esbuild typewritingclass-compiler
    ```
  </TabItem>
  <TabItem label="yarn">
    ```bash
    yarn add -D typewritingclass-esbuild typewritingclass-compiler
    ```
  </TabItem>
</Tabs>

Add the plugin to your esbuild build script:

```ts
// build.ts
import * as esbuild from 'esbuild'
import twcEsbuildPlugin from 'typewritingclass-esbuild'

await esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outdir: 'dist',
  plugins: [twcEsbuildPlugin()],
})
```

The esbuild plugin accepts the same `strict` option:

```ts
twcEsbuildPlugin({ strict: true })
```

### Babel

For projects that use Babel (such as older Create React App setups or custom Babel pipelines), install the Babel plugin. It also depends on `typewritingclass-compiler`.

<Tabs>
  <TabItem label="pnpm">
    ```bash
    pnpm add -D typewritingclass-babel typewritingclass-compiler
    ```
  </TabItem>
  <TabItem label="npm">
    ```bash
    npm install -D typewritingclass-babel typewritingclass-compiler
    ```
  </TabItem>
  <TabItem label="yarn">
    ```bash
    yarn add -D typewritingclass-babel typewritingclass-compiler
    ```
  </TabItem>
</Tabs>

Add it to your Babel configuration:

```json
// babel.config.json
{
  "plugins": [
    ["typewritingclass-babel", {
      "outputFile": "dist/twc.css",
      "strict": true
    }]
  ]
}
```

Or in a `.babelrc.js` / `babel.config.js` file:

```js
// babel.config.js
module.exports = {
  plugins: [
    ['typewritingclass-babel', { outputFile: 'dist/twc.css', strict: true }],
  ],
}
```

The Babel plugin writes the extracted CSS to a file on disk (defaulting to `twc.css`). You need to include this file in your HTML or import it in your entry point.

## Step 3: Import the generated CSS

For **Vite** and **esbuild**, the compiler emits styles through a virtual CSS module. Import it once in your application's entry file so the generated styles are included in your bundle:

```ts
// src/main.tsx (or src/index.ts, src/entry.ts, etc.)
import 'virtual:twc.css'
```

This import does not correspond to a real file on disk. The compiler plugin intercepts it and serves the aggregated CSS extracted from all your source files.

For **Babel**, link the generated CSS file in your HTML instead:

```html
<link rel="stylesheet" href="/dist/twc.css" />
```

Or import it in your entry file if your bundler supports CSS imports:

```ts
import './dist/twc.css'
```

## Step 4: Verify the setup

Create a simple component to confirm everything is wired up correctly:

```tsx
// src/App.tsx
import { cx, p, bg, rounded, textColor } from 'typewritingclass'
import { white, blue } from 'typewritingclass/theme/colors'

function App() {
  const box = cx(p(6), bg(blue[500]), textColor(white), rounded('lg'))

  return <div className={box}>It works!</div>
}

export default App
```

Start your dev server. You should see a blue rounded box with white text and `1.5rem` of padding. If styles appear correctly, typewritingclass is installed and the compiler is extracting CSS as expected.

If you do not see styles, double-check that:

1. The compiler plugin is listed in your build tool's config.
2. You have imported `virtual:twc.css` in your entry file (Vite/esbuild) or linked the output CSS (Babel).
3. Your file uses a `.ts`, `.tsx`, `.js`, or `.jsx` extension -- the compiler only processes these file types.

## Step 5 (optional): Framework integration

typewritingclass works with any framework out of the box since `cx()` returns a plain class name string. For React-specific ergonomics, you can optionally install the React integration package:

<Tabs>
  <TabItem label="pnpm">
    ```bash
    pnpm add typewritingclass-react
    ```
  </TabItem>
  <TabItem label="npm">
    ```bash
    npm install typewritingclass-react
    ```
  </TabItem>
  <TabItem label="yarn">
    ```bash
    yarn add typewritingclass-react
    ```
  </TabItem>
</Tabs>

This package provides the `useStyle` hook for working with dynamic values in React components:

```tsx
import { useStyle } from 'typewritingclass-react'
import { dynamic } from 'typewritingclass'

function ProgressBar({ percent }: { percent: number }) {
  const style = useStyle(() => ({
    width: dynamic(percent, (v) => `${v}%`),
  }))

  return <div {...style} />
}
```

See the [React integration guide](/integrations/react) for more details.

## Next steps

Now that typewritingclass is installed, continue to the [Quick Start](/getting-started/quick-start) tutorial to build your first component, or jump to [Editor Setup](/getting-started/editor-setup) to configure hover previews in VS Code.
