# typewritingclass-next

Next.js integration for Typewriting Class. Provides SSR style injection, a `useStyle` hook re-export, and an optional build-time CSS extraction plugin via Babel.

## Installation

```bash
bun add typewritingclass typewritingclass-react typewritingclass-next
```

Requires `next` (13-15), `react` (18 or 19), `typewritingclass`, and `typewritingclass-react` as peer dependencies.

## Root layout

Add `<TWCStyles />` in `<head>` for SSR styles:

```tsx
// app/layout.tsx
import { TWCStyles } from 'typewritingclass-next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <TWCStyles />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

`TWCStyles` is a Server Component that renders a `<style data-twc>` tag with all registered CSS.

## Server Components

Use `tw` directly -- no hooks, no client boundary:

```tsx
import { tw } from 'typewritingclass'

export default function Home() {
  return <h1 className={tw.text('2xl').font('700').textColor('slate-900')}>Hello</h1>
}
```

## Client Components

For dynamic values, use `useStyle()`:

```tsx
'use client'

import { useStyle } from 'typewritingclass-next'
import { p, bg, rounded, dynamic } from 'typewritingclass'

export function Banner({ color }: { color: string }) {
  const props = useStyle(p(6), bg(dynamic(color)), rounded('lg'))
  return <div {...props}>Welcome!</div>
}
```

## Build-time extraction (optional)

Wrap your Next config with `withTwc` to extract CSS at build time:

```js
// next.config.mjs
import { withTwc } from 'typewritingclass-next/plugin'

export default withTwc({
  // your Next.js config
})
```

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `outputFile` | `string` | `".next/twc.css"` | Path for extracted CSS |
| `strict` | `boolean` | `false` | Error on non-static `cx()` args |

## Exports

| Path | Contents |
|---|---|
| `typewritingclass-next` | `TWCStyles`, `useStyle`, `getStyleSheet`, `getStyleTag` |
| `typewritingclass-next/plugin` | `withTwc()` Next.js config wrapper |
