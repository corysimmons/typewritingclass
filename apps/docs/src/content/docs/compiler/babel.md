---
title: Babel Plugin
description: Use typewritingclass with Babel.
sidebar:
  order: 3
---

The Babel plugin provides static CSS extraction for projects that use Babel as their transpiler. Unlike the Vite and esbuild plugins that serve CSS through a virtual module, the Babel plugin writes the extracted CSS to an output file on disk.

## Installation

Install the Babel plugin alongside the core compiler package:

```bash
# bun
bun add typewritingclass
bun add -d typewritingclass-babel typewritingclass-compiler

# pnpm
pnpm add typewritingclass
pnpm add -D typewritingclass-babel typewritingclass-compiler

# npm
npm install typewritingclass
npm install -D typewritingclass-babel typewritingclass-compiler
```

`typewritingclass-babel` depends on `typewritingclass-compiler` for the native Rust compiler binary and on `@babel/parser` for re-parsing the transformed source.

## Configuration

### babel.config.json

```json
{
  "plugins": [
    ["typewritingclass-babel", {
      "outputFile": "dist/twc.css",
      "strict": true
    }]
  ]
}
```

### babel.config.js

```js
// babel.config.js
module.exports = {
  plugins: [
    ['typewritingclass-babel', {
      outputFile: 'dist/twc.css',
      strict: true,
    }],
  ],
}
```

### .babelrc

```json
{
  "plugins": [
    ["typewritingclass-babel", {
      "outputFile": "dist/twc.css"
    }]
  ]
}
```

## Options

### outputFile

- **Type:** `string`
- **Default:** `"twc.css"`

The file path where the extracted CSS is written. The directory is created automatically if it does not exist.

```json
{
  "plugins": [
    ["typewritingclass-babel", {
      "outputFile": "build/styles/twc.css"
    }]
  ]
}
```

### strict

- **Type:** `boolean`
- **Default:** `true`

When enabled, the compiler reports an error if a `cx()` argument cannot be statically evaluated at build time, unless wrapped in `dynamic()`. See [Strict Mode](/compiler/strict-mode/) for details.

```json
{
  "plugins": [
    ["typewritingclass-babel", {
      "strict": false
    }]
  ]
}
```

## Including the CSS

Since the Babel plugin writes CSS to a file on disk (not a virtual module), you need to include it in your HTML or import it in your bundler.

### HTML link tag

```html
<link rel="stylesheet" href="/dist/twc.css" />
```

### Bundler import

If your bundler (webpack, Parcel, etc.) supports CSS imports:

```ts
// src/index.ts
import './dist/twc.css'
```

### webpack example

```js
// webpack.config.js
module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
```

```ts
// src/index.tsx
import '../dist/twc.css'
import { cx, p, bg, rounded } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const card = cx(p(6), bg(blue[500]), rounded('lg'))
```

## How it works

The Babel plugin uses a `Program` visitor that runs once per file:

1. **File filtering:** The plugin checks if the file contains `typewritingclass` in its source, has a `.ts`/`.tsx`/`.js`/`.jsx` extension, and is not inside `node_modules`. Files that do not match are skipped.

2. **Native compilation:** The source code is passed to the native Rust compiler via the `transform()` function from `typewritingclass-compiler`. The compiler analyzes the AST, extracts all `cx()` calls, resolves theme tokens, and returns transformed code with generated class name strings.

3. **AST replacement:** The plugin re-parses the transformed code using `@babel/parser` and replaces the current program's AST body with the new one. This preserves Babel's plugin pipeline for subsequent transforms.

4. **CSS collection:** Extracted CSS rules are stored in memory, keyed by file path. After each file is processed, the combined CSS from all files is written to the output file using the native `generateCss()` function.

5. **Diagnostics:** Compiler diagnostics are emitted to the console as warnings or errors with file path, line, and column information.

## Diagnostics

The Babel plugin logs diagnostics to the console:

```
[typewritingclass] ERROR src/App.tsx:12:15 - Cannot statically evaluate argument to cx()
[typewritingclass] WARN src/Button.tsx:8:5 - Property conflict detected in cx() call
```

Errors do not stop the Babel compilation -- the original source is preserved if the compiler fails.

## Usage with common setups

### Create React App (CRA)

CRA uses Babel internally. You can customize it with CRACO or react-app-rewired:

```js
// craco.config.js
module.exports = {
  babel: {
    plugins: [
      ['typewritingclass-babel', {
        outputFile: 'public/twc.css',
        strict: true,
      }],
    ],
  },
}
```

Then include the CSS in `public/index.html`:

```html
<link rel="stylesheet" href="%PUBLIC_URL%/twc.css" />
```

### Jest

If your test runner uses Babel, the plugin will also run during tests. Set the output file to a temporary location or disable it in test configuration:

```js
// babel.config.js
module.exports = (api) => {
  const isTest = api.env('test')

  return {
    plugins: isTest
      ? [] // Skip CSS extraction in tests
      : [['typewritingclass-babel', { outputFile: 'dist/twc.css' }]],
  }
}
```

### Alongside TypeScript

If you use `@babel/preset-typescript` to strip types:

```json
{
  "presets": ["@babel/preset-typescript"],
  "plugins": [
    ["typewritingclass-babel", {
      "outputFile": "dist/twc.css"
    }]
  ]
}
```

The typewritingclass Babel plugin processes the file before Babel strips TypeScript syntax, so it can analyze the full TypeScript source.

## Comparison with Vite and esbuild plugins

| Feature | Vite | esbuild | Babel |
|---|---|---|---|
| CSS output | Virtual module | Virtual module | File on disk |
| HMR | Yes | Via watch mode | No |
| Import mechanism | `import 'virtual:twc.css'` | `import 'virtual:twc.css'` | `<link>` or bundler import |
| Source maps | MagicString | esbuild built-in | Not generated |
| Bundler compatibility | Vite only | esbuild only | Any Babel pipeline |

The Babel plugin is best suited for projects that:

- Use webpack, Parcel, or another bundler with Babel integration.
- Cannot switch to Vite or esbuild.
- Need to integrate into an existing Babel pipeline with other plugins.

For new projects, the [Vite plugin](/compiler/vite/) is recommended for the best developer experience.
