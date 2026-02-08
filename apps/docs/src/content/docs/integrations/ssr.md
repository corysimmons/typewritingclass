---
title: SSR & RSC
description: Server-side rendering and React Server Components.
sidebar:
  order: 4
---

## Two approaches

1. **Compiler static extraction (recommended):** The Vite/esbuild/Babel plugin extracts CSS at build time. No server-side work needed.
2. **Runtime SSR utilities:** For dynamic styles, use `getStyleSheet()` and `getStyleTag()` from `typewritingclass-react/server`.

## getStyleTag()

Returns a `<style data-twc>` tag for injection into the HTML head:

```tsx
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

## getStyleSheet()

Returns the raw CSS string if you need custom injection:

```ts
import { getStyleSheet } from 'typewritingclass-react/server'
const css = getStyleSheet()
```

## RSC compatibility

Both functions are safe in React Server Components -- no hooks, no browser globals. `tw` and `cx()` work in Server Components directly.

## Streaming SSR

Works with `renderToPipeableStream` / `renderToReadableStream`. Styles are registered synchronously during render.
