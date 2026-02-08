---
title: React
description: Use Typewriting Class with React and Next.js.
sidebar:
  order: 1
---

Typewriting Class integrates with React through the optional `typewritingclass-react` package, which provides the `useStyle()` hook for memoized style composition and server utilities for SSR. The core `cx()` function also works directly since it returns a plain class name string.

## Installation

Install the core package and the React integration:

```bash
# bun
bun add typewritingclass typewritingclass-react

# pnpm
pnpm add typewritingclass typewritingclass-react

# npm
npm install typewritingclass typewritingclass-react
```

You also need a compiler plugin for static CSS extraction. See the [Vite Plugin](/compiler/vite/) or [Installation](/getting-started/installation/) guide for setup.

## Static styles with cx()

For components with no runtime-dynamic values, use `cx()` directly. It returns a space-separated class name string that you pass to `className`:

```tsx
import { cx, p, bg, rounded, textColor, when, hover } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

function Card({ children }: { children: React.ReactNode }) {
  const className = cx(
    p(6),
    bg(blue[500]),
    textColor(white),
    rounded('lg'),
    when(hover)(bg(blue[600])),
  )

  return <div className={className}>{children}</div>
}
```

The compiler extracts all of these calls at build time. There is no runtime style generation -- the CSS is emitted into `virtual:twc.css` as static rules.

## The useStyle() hook

When your styles depend on props or state that change at runtime, use `useStyle()` from `typewritingclass-react`. It wraps `dcx()` in `useMemo` so the result is recalculated only when inputs change, and it returns an object with both `className` and `style` that you can spread onto your JSX element:

```tsx
import { useStyle } from 'typewritingclass-react'
import { p, bg, rounded, dynamic } from 'typewritingclass'

function Banner({ color }: { color: string }) {
  const props = useStyle(p(6), bg(dynamic(color)), rounded('lg'))

  return <div {...props}>Welcome!</div>
  // Renders: <div class="_a1b _c2d _e3f" style="--twc-d0: #3b82f6">Welcome!</div>
}
```

The `dynamic()` wrapper tells the compiler that the value is not statically known. The generated CSS uses a `var(--twc-d0)` reference, and the actual value is applied through an inline `style` attribute at runtime.

### Spreading the result

The return type of `useStyle()` is `{ className: string; style: Record<string, string> }`, which matches what JSX elements expect. You can spread it directly:

```tsx
const props = useStyle(p(4), bg(dynamic(themeColor)))
return <div {...props}>Content</div>
```

Or destructure if you need to merge with other props:

```tsx
const { className, style } = useStyle(p(4), bg(dynamic(themeColor)))
return (
  <div
    className={`${className} my-extra-class`}
    style={{ ...style, position: 'relative' }}
  >
    Content
  </div>
)
```

### Mixing static and dynamic values

You can pass any combination of static `StyleRule` values, `dynamic()` values, and plain class name strings to `useStyle()`:

```tsx
import { useStyle } from 'typewritingclass-react'
import { p, bg, textColor, rounded, shadow, dynamic } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

function ProgressBar({ percent, color }: { percent: number; color: string }) {
  const track = useStyle(
    bg(white),
    rounded('full'),
    p(1),
  )

  const bar = useStyle(
    bg(dynamic(color)),
    rounded('full'),
    'transition-all duration-300',
  )

  return (
    <div {...track}>
      <div {...bar} style={{ ...bar.style, width: `${percent}%` }} />
    </div>
  )
}
```

When all arguments to `useStyle()` are static (no `dynamic()` calls), the `style` object is empty `{}` and no inline styles are applied.

## Dynamic values with dcx()

If you prefer not to use the React-specific package, you can use `dcx()` directly from the core:

```tsx
import { dcx, p, bg, dynamic } from 'typewritingclass'

function Avatar({ size }: { size: string }) {
  const { className, style } = dcx(
    p(2),
    bg(dynamic(size)),
  )

  return <img className={className} style={style} alt="avatar" />
}
```

The difference from `useStyle()` is that `dcx()` does not memoize -- it recalculates on every render. In most cases the cost is negligible, but for components that re-render frequently with the same inputs, `useStyle()` avoids unnecessary work.

## Server-side rendering (SSR)

The `typewritingclass-react/server` subpath provides two functions for extracting CSS during server rendering:

```tsx
import { getStyleSheet } from 'typewritingclass-react/server'
import { getStyleTag } from 'typewritingclass-react/server'
```

### getStyleSheet()

Returns the raw CSS string for all style rules that have been registered so far:

```tsx
import { getStyleSheet } from 'typewritingclass-react/server'

const css = getStyleSheet()
// "._a1b2c { padding: 1rem; }\n._d3e4f { background-color: #3b82f6; }"
```

Use this when you want to inject the CSS into your own `<style>` tag or write it to a file.

### getStyleTag()

Returns a complete `<style>` tag string with a `data-twc` attribute for identification:

```tsx
import { getStyleTag } from 'typewritingclass-react/server'

const tag = getStyleTag()
// '<style data-twc>._a1b2c { padding: 1rem; }</style>'
```

Both functions are safe to call from any server environment -- they do not use DOM APIs, `useEffect`, or any other client-only features.

## Next.js App Router

Typewriting Class works with the Next.js App Router and React Server Components. Here is a typical `layout.tsx` setup:

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

### Using cx() in Server Components

Server Components can use `cx()` directly since it has no client-side dependencies:

```tsx
// app/page.tsx  (Server Component)
import { cx, p, bg, rounded, textColor } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

export default function Page() {
  const hero = cx(p(8), bg(blue[500]), textColor(white), rounded('lg'))

  return <section className={hero}>Server-rendered content</section>
}
```

### Client Components with useStyle()

For interactive Client Components that need dynamic values, add the `'use client'` directive and use `useStyle()`:

```tsx
'use client'

import { useStyle } from 'typewritingclass-react'
import { p, bg, textColor, rounded, dynamic } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

export function ThemeCard({ bgColor }: { bgColor: string }) {
  const props = useStyle(
    p(6),
    bg(dynamic(bgColor)),
    textColor(white),
    rounded('lg'),
  )

  return <div {...props}>Themed card</div>
}
```

The `useStyle` hook is marked with `'use client'` internally, so it works correctly in the Next.js client/server boundary.

## React Server Components compatibility

The server utilities (`getStyleSheet`, `getStyleTag`) are explicitly designed to work in React Server Components:

- They do not call `useState`, `useEffect`, or any other hooks.
- They do not access `window`, `document`, or other browser globals.
- They read from the in-memory style registry, which is populated when `cx()` or `dcx()` calls execute during server rendering.

This means you can call `getStyleTag()` inside a Server Component's render body, and it will return the CSS for all styles registered during that render pass.

## Vite + React setup

A complete `vite.config.ts` for a React project:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { twcPlugin } from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [react(), twcPlugin()],
})
```

And in your entry file:

```ts
// src/main.tsx
import 'virtual:twc.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## API summary

| Export | Package | Description |
|---|---|---|
| `cx()` | `typewritingclass` | Compose static styles into a class string. |
| `dcx()` | `typewritingclass` | Compose styles with dynamic values; returns `{ className, style }`. |
| `dynamic()` | `typewritingclass` | Wrap a runtime value for use in style utilities. |
| `useStyle()` | `typewritingclass-react` | Memoized `dcx()` wrapper for React components. |
| `getStyleSheet()` | `typewritingclass-react/server` | Get raw CSS string for SSR. |
| `getStyleTag()` | `typewritingclass-react/server` | Get `<style data-twc>` tag string for SSR. |
