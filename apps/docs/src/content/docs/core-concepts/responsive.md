---
title: Responsive Design
description: "Mobile-first responsive styles with breakpoint modifiers."
sidebar:
  order: 4
---

Write base styles first (mobile), then add breakpoint modifiers for larger screens.

## With tw

```ts
import { tw } from 'typewritingclass'

tw.p(4).md.p(8).lg.p(12)
tw.grid(1).md.grid(2).lg.grid(3)
tw.text(sm).md.text(lg)
```

For multiple responsive utilities, use function syntax:

```ts
tw.p(4).md(tw.p(8).gap(6)).lg(tw.p(12).gap(8))
```

## Breakpoints

| Modifier | Min Width |
|----------|----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `_2xl` | 1536px |

## Combining with other modifiers

```ts
tw.bg('white').md.hover.bg('blue-50')
tw.p(4).md.p(8).dark.bg('slate-900')
```

## Responsive hiding

```ts
tw.display('none').md.display('block')  // hidden on mobile, visible on tablet+
tw.display('block').lg.display('none')  // visible on mobile, hidden on desktop
```

## With cx() + when()

```ts
import { cx, p, grid, gap, when, md, lg } from 'typewritingclass'

cx(p(4), grid(1), gap(4), when(md)(grid(2), p(6)), when(lg)(grid(3), p(8)))
```
