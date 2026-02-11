# Typewriting Class Solid Starter

Minimal Solid.js + Typewriting Class project template.

## Quick start

```bash
# Copy this starter
bunx degit typewritingclass/typewritingclass/starters/solid my-app
cd my-app

# Install dependencies
bun install

# Start dev server
bun dev
```

## What's included

- Solid.js 1.9 + Vite 6
- typewritingclass
- typewritingclass-compiler (Vite plugin)
- TypeScript 5.7
- Example `App.tsx` with a hover card demo

## Plugin order

`twcPlugin()` must come **before** `solid()` in `vite.config.ts`. Both use Vite's `enforce: 'pre'` phase — if `solid()` runs first, it rewrites import paths and the compiler silently skips all `tw` chains.

```ts
plugins: [twcPlugin(), solid()]  // correct
plugins: [solid(), twcPlugin()]  // broken — tw chains won't compile
```

## Scripts

| Command | Description |
|---|---|
| `bun dev` | Start development server |
| `bun run build` | Production build |
| `bun run preview` | Preview production build |
