---
title: Utilities
description: Complete reference for all built-in utility functions.
sidebar:
  order: 2
---

All utilities accept values and return a `StyleRule`. Use them with `tw` (chainable) or `cx()` (functional). Most accept Tailwind-style string lookups directly.

## Spacing

Numbers map to the spacing scale (`4` = `1rem`, each unit = `0.25rem`). Strings pass through as raw CSS.

### Padding

| Utility | CSS Property |
|---|---|
| `p(value)` | `padding` |
| `px(value)` | `padding-left`, `padding-right` |
| `py(value)` | `padding-top`, `padding-bottom` |
| `pt(value)`, `pr(value)`, `pb(value)`, `pl(value)` | Individual sides |

```ts
tw.p(4)         // padding: 1rem
tw.px(6)        // padding-left: 1.5rem; padding-right: 1.5rem
tw.py('10px')   // padding-top: 10px; padding-bottom: 10px
```

### Margin

| Utility | CSS Property |
|---|---|
| `m(value)` | `margin` |
| `mx(value)` | `margin-left`, `margin-right` |
| `my(value)` | `margin-top`, `margin-bottom` |
| `mt(value)`, `mr(value)`, `mb(value)`, `ml(value)` | Individual sides |

```ts
tw.m(4)         // margin: 1rem
tw.mx('auto')   // margin-left: auto; margin-right: auto
```

### Gap

| Utility | CSS Property |
|---|---|
| `gap(value)` | `gap` |
| `gapX(value)` | `column-gap` |
| `gapY(value)` | `row-gap` |

```ts
tw.gap(4)    // gap: 1rem
tw.gapX(2)   // column-gap: 0.5rem
```

---

## Colors

Accept property-access tokens, Tailwind-style string lookups, or raw CSS color strings.

| Utility | CSS Property |
|---|---|
| `bg(color)` | `background-color` |
| `textColor(color)` | `color` |
| `borderColor(color)` | `border-color` |

```ts
// Property-access tokens (recommended)
tw.bg.blue500              // background-color: #3b82f6
tw.textColor.gray900       // color: #111827
tw.borderColor.gray200     // border-color: #e5e7eb
tw.bg.blue500(50)          // with opacity: rgb(59 130 246 / 0.5)

// String lookups (equivalent)
tw.bg('blue-500')
tw.textColor('gray-900')
tw.bg('transparent')
```

---

## Typography

| Utility | CSS Property | Notes |
|---|---|---|
| `text(size)` | `font-size` + `line-height` | Accepts tokens: `tw.text.lg`, `tw.text._2xl` |
| `font(weight)` | `font-weight` | Accepts tokens: `tw.font.bold`, `tw.font.semibold` |
| `fontFamily(value)` | `font-family` | Accepts tokens: `tw.fontFamily.sans`, `tw.fontFamily.mono` |
| `tracking(value)` | `letter-spacing` | Accepts tokens: `tw.tracking.tight`, `tw.tracking.wide` |
| `leading(value)` | `line-height` | Accepts tokens: `tw.leading.tight`, `tw.leading.relaxed` |
| `textAlign(value)` | `text-align` | Accepts tokens: `tw.textAlign.center`, `tw.textAlign.right` |

```ts
// Property-access tokens (recommended)
tw.text.lg               // font-size: 1.125rem; line-height: 1.75rem
tw.text._2xl             // font-size: 1.5rem; line-height: 2rem
tw.font.bold             // font-weight: 700
tw.font.semibold         // font-weight: 600
tw.textAlign.center      // text-align: center

// String lookups (equivalent)
tw.text('lg')
tw.font('bold')
tw.tracking('-0.025em')
```

### Font families

`fontFamily()` ships with Tailwind's default font stacks built in:

```ts
tw.fontFamily('sans')   // ui-sans-serif, system-ui, sans-serif, ...
tw.fontFamily('serif')  // ui-serif, Georgia, Cambria, "Times New Roman", ...
tw.fontFamily('mono')   // ui-monospace, SFMono-Regular, Menlo, Monaco, ...
```

You can also pass any CSS font family string directly:

```ts
tw.fontFamily('Georgia, serif')
```

### Google Fonts

The built-in `googleFonts` plugin loads a Google Font and returns the family name for use with `fontFamily()`. It automatically injects the `<link>` tag in the browser.

```ts
import { tw, googleFonts } from 'typewritingclass'

// Basic usage
tw.fontFamily(googleFonts('Inter'))

// With specific weights
tw.fontFamily(googleFonts('Roboto', { weights: [400, 500, 700] }))

// With display strategy
tw.fontFamily(googleFonts('Fira Code', { display: 'block' }))
```

Each font is only loaded once, even if `googleFonts()` is called multiple times with the same family name.

---

## Layout

### Flex

| Utility | CSS |
|---|---|
| `flex()` | `display: flex` |
| `flexCol()` | `display: flex; flex-direction: column` |
| `flexRow()` | `display: flex; flex-direction: row` |
| `flexWrap()` | `flex-wrap: wrap` |
| `inlineFlex()` | `display: inline-flex` |

```ts
tw.flex.flexCol.gap(4)
tw.flex.items.center.justify.between
```

### Grid

| Utility | CSS |
|---|---|
| `grid(cols?)` | `display: grid` (optionally with columns) |
| `gridCols(n)` | `grid-template-columns: repeat(n, ...)` |
| `gridRows(n)` | `grid-template-rows: repeat(n, ...)` |

```ts
tw.grid(3).gap(4)   // 3-column grid with 1rem gap
```

### Sizing

| Utility | CSS Property |
|---|---|
| `w(value)` | `width` |
| `h(value)` | `height` |
| `size(value)` | `width` + `height` |
| `minW(value)`, `minH(value)` | `min-width`, `min-height` |
| `maxW(value)`, `maxH(value)` | `max-width`, `max-height` |

```ts
tw.w('100%').h('100vh')
tw.size(10)           // width: 2.5rem; height: 2.5rem
tw.maxW('768px')
```

### Alignment

| Utility | CSS Property |
|---|---|
| `items(value)` | `align-items` |
| `justify(value)` | `justify-content` |
| `self(value)` | `align-self` |

### Overflow

| Utility | CSS Property |
|---|---|
| `overflow(value)` | `overflow` |
| `overflowX(value)` | `overflow-x` |
| `overflowY(value)` | `overflow-y` |

### Positioning

| Utility | CSS |
|---|---|
| `relative()` | `position: relative` |
| `absolute()` | `position: absolute` |
| `fixed()` | `position: fixed` |
| `sticky()` | `position: sticky` |
| `top(value)`, `right(value)`, `bottom(value)`, `left(value)` | Offsets |
| `inset(value)` | `inset` shorthand |
| `z(value)` | `z-index` |
| `display(value)` | `display` |

```ts
tw.sticky.top(0).z(10)
tw.absolute.inset(0)
tw.fixed.top(0).left(0).w('full')
```

---

## Borders

| Utility | CSS Property |
|---|---|
| `rounded(value?)` | `border-radius` (default: `0.25rem`) |
| `roundedT(value?)`, `roundedB(value?)`, `roundedL(value?)`, `roundedR(value?)` | Corner-specific |
| `border(width?)` | `border-width` + `border-style: solid` (default: `1px`) |
| `borderT(width?)`, `borderR(width?)`, `borderB(width?)`, `borderL(width?)` | Side-specific |
| `ring(width?, color?)` | `box-shadow` as focus ring (default: `3px`, `#3b82f6`) |

```ts
tw.rounded.lg          // border-radius: 0.5rem
tw.rounded.full        // border-radius: 9999px
tw.border().borderColor.gray200
tw.focusVisible.ring('2px', '#3b82f6')
```

---

## Effects

| Utility | CSS Property |
|---|---|
| `shadow(value?)` | `box-shadow` |
| `opacity(value)` | `opacity` (0-1) |
| `backdrop(value)` | `backdrop-filter` |

```ts
tw.shadow.md                      // medium shadow
tw.shadow.lg.hover.shadow.xl
tw.opacity(0.5)
tw.backdrop('blur(8px)')
```

Shadow accepts string lookups: `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'inner'`, `'none'`.

---

## Interactivity

| Utility | CSS Property |
|---|---|
| `cursor(value)` | `cursor` |
| `select(value)` | `user-select` |
| `pointerEvents(value)` | `pointer-events` |

```ts
tw.cursor.pointer
tw.select('none')
tw.pointerEvents('none')
```

---

## Dynamic values

All utilities that accept `DynamicValue` work with `dcx()`:

```ts
import { dcx, bg, rounded, p, dynamic } from 'typewritingclass'

const { className, style } = dcx(
  p(4),
  bg(dynamic(bgColor)),
  rounded(dynamic(radius)),
)
<div className={className} style={style} />
```

---

## Complete example

```ts
const card = tw
  .bg.white.rounded.xl.p(6).shadow.md
  .textColor.gray900
  .hover(tw.shadow.lg.bg.gray50)
  .md.p(8)

<div className={card}>Card content</div>
```
