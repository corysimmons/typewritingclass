---
title: SSR & RSC
description: Server-side rendering and React Server Components.
sidebar:
  order: 4
---

Typewriting Class supports server-side rendering (SSR) and React Server Components (RSC) through dedicated server utilities. The compiler extracts static CSS at build time, and the server functions provide access to the generated styles during rendering for injection into the HTML response.

## Overview

There are two approaches to getting Typewriting Class styles into server-rendered HTML:

1. **Compiler static extraction (recommended):** The Vite/esbuild/Babel compiler plugin extracts all static `cx()` calls into a CSS file at build time. This CSS file is included in the HTML as a `<link>` tag automatically. No extra server-side work is needed for static styles.

2. **Runtime SSR utilities:** For dynamic styles or when you need fine-grained control over CSS injection, use `getStyleSheet()` and `getStyleTag()` from `typewritingclass-react/server` to capture styles registered during server rendering.

In practice, most applications use the compiler for static styles and the SSR utilities for dynamic styles or critical CSS inlining.

## Installation

```bash
# bun
bun add typewritingclass typewritingclass-react

# pnpm
pnpm add typewritingclass typewritingclass-react

# npm
npm install typewritingclass typewritingclass-react
```

The server utilities are exported from the `typewritingclass-react/server` subpath.

## getStyleSheet()

Returns the raw CSS string for all style rules registered in the current render pass:

```ts
import { getStyleSheet } from 'typewritingclass-react/server'

const css = getStyleSheet()
// "@layer l0 { ._a1b2c { padding: 1rem; } }\n@layer l1 { ._d3e4f { background-color: #3b82f6; } }"
```

This is useful when you want to:

- Inject CSS into your own `<style>` tag with custom attributes.
- Write the CSS to a file for caching.
- Combine Typewriting Class CSS with other CSS sources before injecting.

### Example: custom style tag

```tsx
import { getStyleSheet } from 'typewritingclass-react/server'

export default function Document() {
  const css = getStyleSheet()

  return (
    <html>
      <head>
        <style
          id="twc-critical"
          dangerouslySetInnerHTML={{ __html: css }}
        />
      </head>
      <body>
        {/* ... */}
      </body>
    </html>
  )
}
```

## getStyleTag()

Returns a complete `<style>` tag as a string, ready to inject into the HTML document:

```ts
import { getStyleTag } from 'typewritingclass-react/server'

const tag = getStyleTag()
// '<style data-twc>._a1b2c { padding: 1rem; }</style>'
```

The tag includes a `data-twc` attribute for identification. This makes it easy to find and replace during client-side hydration, or to query from JavaScript.

### Example: inject into head

```tsx
import { getStyleTag } from 'typewritingclass-react/server'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: getStyleTag() }} />
      <body>{children}</body>
    </html>
  )
}
```

## RSC compatibility

Both `getStyleSheet()` and `getStyleTag()` are safe to call from React Server Components. They do not use:

- `useState`, `useEffect`, or any React hooks.
- `window`, `document`, or any browser globals.
- `'use client'` -- they are pure server-side functions.

They read from the in-memory style registry, which is populated as `cx()` and `dcx()` calls execute during the server render pass.

```tsx
// app/page.tsx  (React Server Component)
import { cx, p, bg, rounded, textColor } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

export default function Page() {
  // cx() works in Server Components -- no hooks needed
  const hero = cx(p(8), bg(blue[600]), textColor(white), rounded('lg'))

  return <section className={hero}>Server-rendered with RSC</section>
}
```

```tsx
// app/layout.tsx  (React Server Component)
import { getStyleTag } from 'typewritingclass-react/server'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: getStyleTag() }} />
      <body>{children}</body>
    </html>
  )
}
```

## Streaming SSR

Typewriting Class works with React's streaming SSR (`renderToPipeableStream` / `renderToReadableStream`). Since `cx()` calls are synchronous and register styles immediately, all styles used in the initial render chunk are available when `getStyleTag()` is called in the `<head>`.

For components that suspend and stream in later, styles are still registered synchronously when the component's render function executes. The CSS is included in the streamed chunk as part of the virtual CSS module (when using the compiler plugin) or via the runtime injector.

### Example: streaming with Node.js

```tsx
import { renderToPipeableStream } from 'react-dom/server'
import { getStyleTag } from 'typewritingclass-react/server'
import App from './App'

function handleRequest(req, res) {
  // Render the app to collect styles
  const { pipe } = renderToPipeableStream(
    <html>
      <head dangerouslySetInnerHTML={{ __html: getStyleTag() }} />
      <body>
        <div id="root">
          <App />
        </div>
      </body>
    </html>,
    {
      onShellReady() {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        pipe(res)
      },
    },
  )
}
```

## Next.js App Router

The Next.js App Router uses React Server Components by default. Here is a complete setup:

### Layout with style injection

```tsx
// app/layout.tsx
import { getStyleTag } from 'typewritingclass-react/server'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: getStyleTag() }} />
      <body>{children}</body>
    </html>
  )
}
```

### Server Component page

```tsx
// app/page.tsx
import { cx, p, bg, rounded, textColor, shadow, when, md } from 'typewritingclass'
import { white, slate, blue } from 'typewritingclass/theme/colors'

export default function Home() {
  return (
    <main className={cx(p(4), when(md)(p(8)))}>
      <div
        className={cx(
          p(6),
          bg(white),
          rounded('lg'),
          shadow('md'),
          textColor(slate[800]),
        )}
      >
        <h1>Welcome</h1>
        <p>Styles are server-rendered and statically extracted.</p>
      </div>
    </main>
  )
}
```

### Client Component with dynamic styles

```tsx
'use client'

// app/components/ThemePicker.tsx
import { useStyle } from 'typewritingclass-react'
import { p, bg, rounded, textColor, dynamic } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'
import { useState } from 'react'

export function ThemePicker() {
  const [color, setColor] = useState('#3b82f6')

  const preview = useStyle(
    p(6),
    bg(dynamic(color)),
    textColor(white),
    rounded('lg'),
  )

  return (
    <div>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <div {...preview}>Preview</div>
    </div>
  )
}
```

## Critical CSS extraction

For performance-sensitive applications, you can extract only the CSS used by above-the-fold content. Since `getStyleSheet()` returns styles for all rules registered during the render, you can call it at strategic points:

```tsx
import { getStyleSheet } from 'typewritingclass-react/server'

// After rendering the critical above-the-fold shell:
const criticalCSS = getStyleSheet()

// Inline it in the <head> for fastest first paint
const html = `
<!DOCTYPE html>
<html>
  <head>
    <style data-twc-critical>${criticalCSS}</style>
    <link rel="stylesheet" href="/styles/twc.css" media="print" onload="this.media='all'">
  </head>
  <body>${appHtml}</body>
</html>
`
```

This pattern inlines critical CSS for the fastest possible first paint, while deferring the full stylesheet load.

## How it works

The SSR flow for Typewriting Class:

1. During server rendering, `cx()` and `dcx()` calls execute synchronously and register style rules in an in-memory registry.
2. `getStyleSheet()` reads the registry and returns all registered CSS as a string.
3. `getStyleTag()` wraps the CSS in a `<style data-twc>` tag.
4. The tag is injected into the HTML `<head>` so styles are available before the browser parses the `<body>`.
5. On the client, the compiler's virtual CSS module (`virtual:twc.css`) takes over. If the `data-twc` style tag already contains the styles, there is no flash of unstyled content.

## API reference

| Function | Import | Returns |
|---|---|---|
| `getStyleSheet()` | `typewritingclass-react/server` | Raw CSS string |
| `getStyleTag()` | `typewritingclass-react/server` | `<style data-twc>...</style>` string |
| `cx()` | `typewritingclass` | Class name string (works in server and client) |
| `dcx()` | `typewritingclass` | `{ className, style }` (works in server and client) |
