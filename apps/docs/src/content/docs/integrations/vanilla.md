---
title: Vanilla JS
description: Use typewritingclass without a framework.
sidebar:
  order: 3
---

typewritingclass works without any framework. The core `cx()` function returns a plain class name string that you can assign to any DOM element's `className` property. For dynamic values, `dcx()` returns both a class string and an inline style object.

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

## Build tool setup

### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { twcPlugin } from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [twcPlugin()],
})
```

### esbuild

```ts
// build.ts
import * as esbuild from 'esbuild'
import twcEsbuildPlugin from 'typewritingclass-esbuild'

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outdir: 'dist',
  plugins: [twcEsbuildPlugin()],
})
```

Import the virtual CSS module in your entry file so the generated styles are included in the bundle:

```ts
// src/main.ts
import 'virtual:twc.css'
```

## Basic usage with cx()

Use `cx()` to compose style rules into a class string, then assign it to an element:

```ts
import { cx, p, bg, rounded, textColor } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

const card = document.createElement('div')
card.className = cx(p(6), bg(blue[500]), textColor(white), rounded('lg'))
card.textContent = 'Hello from typewritingclass!'

document.body.appendChild(card)
```

The compiler extracts `cx()` calls at build time and emits static CSS. At runtime, `cx()` returns a space-separated string of class names like `"_a1b2c _d3e4f _g5h6i _j7k8l"`.

## Querying existing elements

You can apply styles to elements that already exist in the DOM:

```ts
import { cx, p, bg, rounded, shadow, textColor, when, hover } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'

const header = document.querySelector('#app-header')
if (header) {
  header.className = cx(
    p(4),
    bg(white),
    shadow('md'),
    textColor(slate[800]),
    when(hover)(shadow('lg')),
  )
}
```

## Composing and reusing styles

Since utilities return `StyleRule` objects and `cx()` accepts any number of them, you can define reusable style fragments:

```ts
import { cx, p, bg, rounded, shadow, textColor, when, hover, md } from 'typewritingclass'
import { white, slate, blue } from 'typewritingclass/theme/colors'

// Reusable fragments
const baseCard = [p(4), bg(white), rounded('lg'), shadow('sm')]
const primaryText = textColor(slate[800])
const responsivePadding = when(md)(p(6))

// Apply to elements
function createCard(text: string): HTMLElement {
  const el = document.createElement('div')
  el.className = cx(...baseCard, primaryText, responsivePadding)
  el.textContent = text
  return el
}

document.body.appendChild(createCard('Card one'))
document.body.appendChild(createCard('Card two'))
```

## Mixing with existing classes

`cx()` accepts plain strings alongside `StyleRule` objects, so you can mix typewritingclass styles with existing CSS classes:

```ts
import { cx, p, bg } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const el = document.querySelector('.widget')!
el.className = cx('widget', 'js-active', p(4), bg(blue[100]))
// Result: "widget js-active _a1b2c _d3e4f"
```

## Dynamic values with dcx()

When a style value is not known at build time (for example, it comes from user input, an API response, or a calculation), wrap it with `dynamic()` and use `dcx()` instead of `cx()`:

```ts
import { dcx, p, bg, rounded, w, h, dynamic } from 'typewritingclass'

function createColorSwatch(color: string): HTMLElement {
  const swatch = document.createElement('div')

  const { className, style } = dcx(
    w(12),
    h(12),
    rounded('lg'),
    bg(dynamic(color)),
  )

  swatch.className = className
  Object.assign(swatch.style, style)

  return swatch
}

// Usage
document.body.appendChild(createColorSwatch('#e11d48'))
document.body.appendChild(createColorSwatch('#8b5cf6'))
```

The `dcx()` function returns `{ className, style }`. The `className` is applied normally, and the `style` object contains CSS custom property bindings (like `{ '--twc-d0': '#e11d48' }`) that must be set as inline styles on the element via `Object.assign(element.style, style)`.

### Updating dynamic values

Since dynamic values are applied as CSS custom properties on the element's inline style, you can update them directly:

```ts
import { dcx, p, bg, rounded, dynamic } from 'typewritingclass'

const box = document.createElement('div')

const { className, style } = dcx(p(6), bg(dynamic('#3b82f6')), rounded('lg'))
box.className = className
Object.assign(box.style, style)

document.body.appendChild(box)

// Later, update the color without regenerating any CSS:
box.style.setProperty('--twc-d0', '#ef4444')
```

This works because the generated CSS rule uses `var(--twc-d0)` as the background-color value. Changing the custom property updates the rendered color immediately.

### Responding to events

A practical example of dynamic styles responding to user input:

```ts
import { dcx, p, bg, rounded, textColor, dynamic } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

const preview = document.createElement('div')
const input = document.createElement('input')
input.type = 'color'
input.value = '#3b82f6'

function updatePreview(color: string) {
  const { className, style } = dcx(
    p(8),
    bg(dynamic(color)),
    textColor(white),
    rounded('lg'),
  )
  preview.className = className
  Object.assign(preview.style, style)
  preview.textContent = color
}

input.addEventListener('input', (e) => {
  updatePreview((e.target as HTMLInputElement).value)
})

updatePreview(input.value)
document.body.append(input, preview)
```

## Runtime CSS injection

By default, when using a compiler plugin, all CSS is extracted at build time into `virtual:twc.css`. However, if you need runtime style injection (for example, in a development environment without a compiler or for lazy-loaded components), import the `inject` module:

```ts
import 'typewritingclass/inject'
```

This module creates a `<style id="twc">` element in the document `<head>` and keeps it synchronized with the style registry. Whenever a new rule is registered via `cx()` or `dcx()`, a microtask is scheduled to batch-update the style element.

The inject module:

- Looks for an existing `<style id="twc">` element, or creates one if none exists.
- Batches multiple synchronous rule registrations into a single DOM write using `queueMicrotask`.
- Is SSR-safe: in non-browser environments (where `document` is undefined), the initialization is silently skipped.

### When to use inject vs. the compiler

| Scenario | Use |
|---|---|
| Production builds with Vite/esbuild/Babel | Compiler plugin + `virtual:twc.css` |
| Development without a compiler plugin | `import 'typewritingclass/inject'` |
| Dynamic code that bypasses the compiler | `import 'typewritingclass/inject'` |
| Quick prototyping or CodePen-style environments | `import 'typewritingclass/inject'` |

In most production setups, you should rely on the compiler for static extraction and only use `inject` as a development-time fallback.

## Complete example

A full vanilla TypeScript application with Vite:

```ts
// src/main.ts
import 'virtual:twc.css'
import {
  cx, dcx, p, bg, rounded, textColor, shadow, flex, flexCol, gap,
  w, h, items, justify, when, hover, md, dynamic,
} from 'typewritingclass'
import { white, slate, blue } from 'typewritingclass/theme/colors'

// App container
const app = document.getElementById('app')!
app.className = cx(
  p(4),
  flex(),
  flexCol(),
  items('center'),
  gap(6),
  when(md)(p(8)),
)

// Heading
const heading = document.createElement('h1')
heading.textContent = 'typewritingclass + Vanilla JS'
heading.className = cx(textColor(slate[900]))
app.appendChild(heading)

// Interactive card
const card = document.createElement('div')
const { className, style } = dcx(
  p(6),
  bg(dynamic('#3b82f6')),
  textColor(white),
  rounded('lg'),
  shadow('lg'),
  when(hover)(shadow('xl')),
)
card.className = className
Object.assign(card.style, style)
card.textContent = 'Click to change color'

card.addEventListener('click', () => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
  card.style.setProperty('--twc-d0', randomColor)
})

app.appendChild(card)
```

## API summary

| Export | Package | Description |
|---|---|---|
| `cx()` | `typewritingclass` | Compose static styles into a class string. Assign to `element.className`. |
| `dcx()` | `typewritingclass` | Compose styles with dynamic values. Returns `{ className, style }`. |
| `dynamic()` | `typewritingclass` | Wrap a runtime value so it becomes a CSS custom property. |
| `inject` | `typewritingclass/inject` | Side-effect import that enables runtime CSS injection in the browser. |
