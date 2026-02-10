---
title: Modifiers
description: Complete reference for all built-in modifier functions.
sidebar:
  order: 3
---

Modifiers wrap a `StyleRule` with a pseudo-class selector or media query. Use them as `tw` chain properties or with `when()`.

```ts
// tw chain syntax
tw.hover.bg('blue-600')
tw.md.p(8)
tw.hover(tw.bg('blue-600').textColor('white'))

// when() syntax
cx(when(hover)(bg('blue-600')))
cx(when(hover, md)(bg('blue-700')))  // stacked: hover inside md
```

---

## Pseudo-state modifiers

| Modifier | Selector | Common use |
|---|---|---|
| `hover` | `:hover` | Button/link color changes |
| `focus` | `:focus` | Input focus states |
| `active` | `:active` | Button press effect |
| `disabled` | `:disabled` | Disabled form controls |
| `focusVisible` | `:focus-visible` | Keyboard-only focus rings |
| `focusWithin` | `:focus-within` | Parent highlight on child focus |
| `firstChild` | `:first-child` | Remove top margin/border on first item |
| `lastChild` | `:last-child` | Remove bottom margin/border on last item |

```ts
// tw syntax
tw.bg.blue500
  .hover.bg.blue600
  .active.bg.blue700
  .focusVisible.ring('2px', '#3b82f6')
  .disabled.opacity(0.5)

// cx syntax
cx(
  bg.blue500,
  when(hover)(bg.blue600),
  when(disabled)(opacity(0.5), cursor.notAllowed),
  when(focusVisible)(ring('2px', '#3b82f6')),
)
```

---

## Responsive breakpoints

Mobile-first `min-width` approach:

| Modifier | Breakpoint | Media query |
|---|---|---|
| `sm` | 640px | `@media (min-width: 640px)` |
| `md` | 768px | `@media (min-width: 768px)` |
| `lg` | 1024px | `@media (min-width: 1024px)` |
| `xl` | 1280px | `@media (min-width: 1280px)` |
| `_2xl` | 1536px | `@media (min-width: 1536px)` |

### Max-width breakpoints

Desktop-first `max-width` approach:

| Modifier | Breakpoint | Media query |
|---|---|---|
| `maxSm` | 640px | `@media (max-width: 639px)` |
| `maxMd` | 768px | `@media (max-width: 767px)` |
| `maxLg` | 1024px | `@media (max-width: 1023px)` |
| `maxXl` | 1280px | `@media (max-width: 1279px)` |
| `max2xl` | 1536px | `@media (max-width: 1535px)` |

```ts
// tw syntax -- progressive enhancement
tw.flexCol.gap(4).p(4)
  .sm.gap(6)
  .md.flexRow
  .lg.p(8)

// cx syntax
cx(
  flexCol(), gap(4), p(4),
  when(sm)(gap(6)),
  when(md)(flexRow()),
  when(lg)(p(8)),
)
```

### Responsive grid example

```ts
tw.grid(1).gap(4)
  .sm.grid(2)
  .md.grid(3).md.gap(6)
  .lg.grid(4).lg.gap(8)
```

---

## Dark mode

| Modifier | Media query |
|---|---|
| `dark` | `@media (prefers-color-scheme: dark)` |

Responds to the user's system preference. For manual theme toggling, use the [Theme API](/api-reference/theme/).

```ts
tw.bg.white.textColor.gray900
  .dark(tw.bg.slate900.textColor.slate100)

// With hover in dark mode (cx syntax):
cx(
  when(hover)(bg.gray100),
  when(dark, hover)(bg.slate700),
)
```

---

## Stacking modifiers

Pass multiple modifiers to `when()` -- they apply right-to-left:

```ts
when(hover, md)(bg('blue-700'))
// @media (min-width: 768px) { .cls:hover { background-color: ... } }

when(dark, md)(bg('slate-800'))
// @media (min-width: 768px) { @media (prefers-color-scheme: dark) { ... } }
```

---

## Custom modifiers

Since `Modifier` is `(rule: StyleRule) => StyleRule`, you can create your own:

```ts
import { wrapWithSelector, wrapWithMediaQuery } from 'typewritingclass/rule'

const checked: Modifier = (rule) => wrapWithSelector(rule, ':checked')
const print: Modifier = (rule) => wrapWithMediaQuery(rule, 'print')
const reducedMotion: Modifier = (rule) =>
  wrapWithMediaQuery(rule, '(prefers-reduced-motion: reduce)')
```

Custom modifiers compose with `when()` and all built-in modifiers. See [Writing Modifiers](/plugins/writing-modifiers/) for full details.
