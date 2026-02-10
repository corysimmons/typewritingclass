---
title: "dynamic() & dcx()"
description: "Use runtime values in your styles with CSS custom properties."
sidebar:
  order: 1
---

For values known only at runtime (user-selected colors, progress percentages, drag offsets), use `dynamic()` and `dcx()`.

## How it works

1. `dynamic(value)` wraps a runtime value. The compiler emits a `var(--twc-dN)` reference instead of inlining the value.
2. `dcx()` works like `cx()` but returns `{ className, style }`. The `style` object maps CSS custom properties to their current values.

```tsx
import { dcx, bg, p, rounded, dynamic } from 'typewritingclass'

function Banner({ color }: { color: string }) {
  const { className, style } = dcx(p(6), bg(dynamic(color)), rounded.lg)
  return <div className={className} style={style}>Welcome!</div>
}
```

Generated CSS: `._xyz { background-color: var(--twc-d0); }`
Inline style: `--twc-d0: #e11d48`

## React hook: useStyle()

```tsx
import { useStyle } from 'typewritingclass-react'
import { p, bg, rounded, dynamic } from 'typewritingclass'

function Card({ color }: { color: string }) {
  const props = useStyle(p(6), bg(dynamic(color)), rounded('lg'))
  return <div {...props}>Content</div>
}
```

`useStyle()` wraps `dcx()` in `useMemo` for stable references across re-renders.

## When to use dynamic()

| Scenario | Use |
|---|---|
| Value known at build time (theme token, hardcoded color) | Static: `tw.bg.blue500` |
| Value from props, state, or user input | Dynamic: `dcx(bg(dynamic(color)))` |
| Value changes frequently (animations, drag) | Dynamic: class names stay stable |
