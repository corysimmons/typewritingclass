# typewritingclass-esbuild

esbuild plugin for typewritingclass static CSS extraction.

## Installation

```bash
pnpm add -D typewritingclass-esbuild
```

Requires `esbuild` >= 0.17.0 as a peer dependency.

## Usage

```ts
import esbuild from 'esbuild'
import twcPlugin from 'typewritingclass-esbuild'

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  plugins: [twcPlugin()],
})
```

Import the virtual CSS module in your source:

```ts
import 'virtual:twc.css'
```

## Options

```ts
twcPlugin({
  strict: true,  // Error on unwrapped dynamic values (default: true)
  theme: {},     // Custom theme configuration
})
```

## How it works

The plugin uses a three-phase pipeline:

1. **onResolve** — intercepts `virtual:twc.css` imports
2. **onLoad (transform)** — passes TS/JS files through the Rust compiler
3. **onLoad (virtual CSS)** — aggregates all extracted rules into the virtual CSS module
