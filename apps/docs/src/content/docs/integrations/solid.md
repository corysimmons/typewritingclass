---
title: Solid
description: Use typewritingclass with SolidJS.
sidebar:
  order: 2
---

typewritingclass works with SolidJS out of the box. Because Solid uses the `class` attribute (not `className`), you can use the core `cx()` function directly -- no framework-specific wrapper is needed.

## Installation

Install the core package and a compiler plugin:

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

No separate `typewritingclass-solid` package exists because none is needed. The core API returns plain strings and objects that work directly with Solid's reactivity model.

## Vite configuration

SolidJS projects typically use Vite. Add the typewritingclass plugin alongside the Solid plugin:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { twcPlugin } from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [solidPlugin(), twcPlugin()],
})
```

Import the virtual CSS module in your entry file:

```ts
// src/index.tsx
import 'virtual:twc.css'
import { render } from 'solid-js/web'
import App from './App'

render(() => <App />, document.getElementById('root')!)
```

## Static styles with cx()

Use `cx()` with Solid's `class` attribute:

```tsx
import { cx, p, bg, rounded, textColor, when, hover } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

function Card(props: { children: any }) {
  const className = cx(
    p(6),
    bg(blue[500]),
    textColor(white),
    rounded('lg'),
    when(hover)(bg(blue[600])),
  )

  return <div class={className}>{props.children}</div>
}
```

Since `cx()` returns a plain string, it works exactly the same as in any other framework. The compiler extracts all static calls at build time, producing zero-runtime CSS.

## Composing styles

You can define reusable style fragments and compose them:

```tsx
import { cx, p, bg, rounded, textColor, shadow, when, hover, md } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'

// Reusable base card style
const baseCard = [p(4), bg(white), rounded('lg'), shadow('md')]

// Variant that adds hover and responsive padding
const interactiveCard = [
  ...baseCard,
  when(hover)(shadow('lg')),
  when(md)(p(6)),
]

function ProductCard(props: { title: string }) {
  return (
    <div class={cx(...interactiveCard, textColor(slate[800]))}>
      <h3>{props.title}</h3>
    </div>
  )
}
```

## Dynamic values with dcx()

When a style depends on reactive state or props, use `dcx()` with `dynamic()`. The result gives you both a `className` string and a `style` object to spread:

```tsx
import { createSignal } from 'solid-js'
import { dcx, p, bg, rounded, dynamic } from 'typewritingclass'

function ColorPicker() {
  const [color, setColor] = createSignal('#3b82f6')

  // Recomputes automatically when color() changes
  const result = () => dcx(p(6), bg(dynamic(color())), rounded('lg'))

  return (
    <div>
      <input
        type="color"
        value={color()}
        onInput={(e) => setColor(e.currentTarget.value)}
      />
      <div class={result().className} style={result().style}>
        Preview
      </div>
    </div>
  )
}
```

Because Solid's reactivity is fine-grained, wrapping `dcx()` in a derived signal (the `result` arrow function) is enough to make it reactive. Solid will only re-run the `dcx()` call when `color()` actually changes.

### Spreading className and style

Solid supports spreading attributes with the `{...spread}` syntax, but `class` and `style` need special handling. You can destructure and apply them separately:

```tsx
import { dcx, p, bg, textColor, dynamic } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

function DynamicBanner(props: { bgColor: string; children: any }) {
  const result = () => dcx(
    p(8),
    bg(dynamic(props.bgColor)),
    textColor(white),
  )

  return (
    <div class={result().className} style={result().style}>
      {props.children}
    </div>
  )
}
```

### Combining with Solid's classList

You can combine `cx()` with Solid's `classList` directive for conditional class toggling:

```tsx
import { cx, p, bg, rounded } from 'typewritingclass'
import { blue, red } from 'typewritingclass/theme/colors'

function Alert(props: { type: 'info' | 'error'; message: string }) {
  const base = cx(p(4), rounded('md'))
  const info = cx(bg(blue[100]))
  const error = cx(bg(red[100]))

  return (
    <div
      class={base}
      classList={{
        [info]: props.type === 'info',
        [error]: props.type === 'error',
      }}
    >
      {props.message}
    </div>
  )
}
```

## SolidStart SSR

SolidStart applications render on the server by default. Since typewritingclass with the compiler plugin extracts all static styles into a CSS file at build time (`virtual:twc.css`), SSR works automatically -- the CSS is included in the HTML response as a `<link>` or inlined `<style>` tag by Vite.

For dynamic values that are computed during SSR, `dcx()` will produce the correct `className` and `style` on the server. Solid's SSR serializes inline styles, so the custom property bindings survive hydration.

### SolidStart entry

A typical SolidStart project needs no special configuration beyond the Vite plugin:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import solid from 'solid-start/vite'
import { twcPlugin } from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [solid(), twcPlugin()],
})
```

The `virtual:twc.css` import in your entry or root layout ensures styles are included:

```tsx
// src/root.tsx
import 'virtual:twc.css'
import { Suspense } from 'solid-js'
import { Body, FileRoutes, Head, Html, Routes, Scripts } from 'solid-start'

export default function Root() {
  return (
    <Html lang="en">
      <Head />
      <Body>
        <Suspense>
          <Routes>
            <FileRoutes />
          </Routes>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
```

## Why no Solid-specific package?

React needs `useStyle()` because:

1. React's `className` + `style` props map directly to the `dcx()` return type, but memoization via `useMemo` is needed to avoid recalculating on every render.
2. React does not have built-in fine-grained reactivity, so a hook is the idiomatic way to bridge reactive values.

Solid has neither of these constraints. Derived signals are the natural equivalent of `useMemo`, and Solid's fine-grained reactivity means the `dcx()` call inside a derived signal only runs when its reactive dependencies change. The core API is all you need.

## API summary

| Export | Package | Description |
|---|---|---|
| `cx()` | `typewritingclass` | Compose static styles into a class string. Use with `class` attribute. |
| `dcx()` | `typewritingclass` | Compose styles with dynamic values; returns `{ className, style }`. |
| `dynamic()` | `typewritingclass` | Wrap a reactive value for use in style utilities. |
| `when()` | `typewritingclass` | Apply modifiers (hover, breakpoints, dark mode). |
