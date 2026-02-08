---
title: Utilities
description: Complete reference for all built-in utility functions.
sidebar:
  order: 2
---

Utilities are functions that accept a design-token value and return a `StyleRule`. Every utility satisfies the `Utility` type signature:

```ts
type Utility = (value: any) => StyleRule
```

All utilities can be composed with `cx()` and `dcx()`, and wrapped with modifiers via `when()`.

## Spacing

Spacing utilities accept a `SpacingInput` value:
- **number** -- maps to the spacing scale (e.g. `4` becomes `1rem`)
- **string** -- passed through as a raw CSS value (e.g. `'2.5rem'`, `'auto'`)
- **DynamicValue** -- a runtime-dynamic value created with `dynamic()`

The spacing scale follows Tailwind CSS conventions where each unit equals `0.25rem`:

| Scale | Value | Scale | Value | Scale | Value |
|-------|-------|-------|-------|-------|-------|
| `0` | `0px` | `6` | `1.5rem` | `20` | `5rem` |
| `0.5` | `0.125rem` | `7` | `1.75rem` | `24` | `6rem` |
| `1` | `0.25rem` | `8` | `2rem` | `28` | `7rem` |
| `1.5` | `0.375rem` | `9` | `2.25rem` | `32` | `8rem` |
| `2` | `0.5rem` | `10` | `2.5rem` | `36` | `9rem` |
| `2.5` | `0.625rem` | `11` | `2.75rem` | `40` | `10rem` |
| `3` | `0.75rem` | `12` | `3rem` | `48` | `12rem` |
| `3.5` | `0.875rem` | `14` | `3.5rem` | `56` | `14rem` |
| `4` | `1rem` | `16` | `4rem` | `64` | `16rem` |
| `5` | `1.25rem` | | | `96` | `24rem` |

Numbers not in the predefined scale fall back to `value * 0.25rem`.

### p()

Sets padding on all sides.

```ts
function p(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `padding`

```ts
import { cx, p } from 'typewritingclass'

cx(p(4))        // padding: 1rem
cx(p(0.5))      // padding: 0.125rem
cx(p('2.5rem')) // padding: 2.5rem
```

### px()

Sets horizontal padding (left and right).

```ts
function px(value: number | string | DynamicValue): StyleRule
```

**CSS properties:** `padding-left`, `padding-right`

```ts
import { cx, px } from 'typewritingclass'

cx(px(6))     // padding-left: 1.5rem; padding-right: 1.5rem
cx(px('10px')) // padding-left: 10px; padding-right: 10px
```

### py()

Sets vertical padding (top and bottom).

```ts
function py(value: number | string | DynamicValue): StyleRule
```

**CSS properties:** `padding-top`, `padding-bottom`

```ts
import { cx, py } from 'typewritingclass'

cx(py(2))    // padding-top: 0.5rem; padding-bottom: 0.5rem
cx(py('1em')) // padding-top: 1em; padding-bottom: 1em
```

### pt()

Sets top padding.

```ts
function pt(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `padding-top`

```ts
import { cx, pt } from 'typewritingclass'

cx(pt(8))      // padding-top: 2rem
cx(pt('0.5em')) // padding-top: 0.5em
```

### pr()

Sets right padding.

```ts
function pr(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `padding-right`

```ts
import { cx, pr } from 'typewritingclass'

cx(pr(3))     // padding-right: 0.75rem
cx(pr('1rem')) // padding-right: 1rem
```

### pb()

Sets bottom padding.

```ts
function pb(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `padding-bottom`

```ts
import { cx, pb } from 'typewritingclass'

cx(pb(10))    // padding-bottom: 2.5rem
cx(pb('2em')) // padding-bottom: 2em
```

### pl()

Sets left padding.

```ts
function pl(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `padding-left`

```ts
import { cx, pl } from 'typewritingclass'

cx(pl(5))    // padding-left: 1.25rem
cx(pl('3ch')) // padding-left: 3ch
```

### m()

Sets margin on all sides.

```ts
function m(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `margin`

```ts
import { cx, m } from 'typewritingclass'

cx(m(4))      // margin: 1rem
cx(m('auto')) // margin: auto
```

### mx()

Sets horizontal margin (left and right).

```ts
function mx(value: number | string | DynamicValue): StyleRule
```

**CSS properties:** `margin-left`, `margin-right`

```ts
import { cx, mx } from 'typewritingclass'

cx(mx(8))      // margin-left: 2rem; margin-right: 2rem
cx(mx('auto')) // margin-left: auto; margin-right: auto
```

### my()

Sets vertical margin (top and bottom).

```ts
function my(value: number | string | DynamicValue): StyleRule
```

**CSS properties:** `margin-top`, `margin-bottom`

```ts
import { cx, my } from 'typewritingclass'

cx(my(6))       // margin-top: 1.5rem; margin-bottom: 1.5rem
cx(my('0.5em')) // margin-top: 0.5em; margin-bottom: 0.5em
```

### mt()

Sets top margin.

```ts
function mt(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `margin-top`

```ts
import { cx, mt } from 'typewritingclass'

cx(mt(2))     // margin-top: 0.5rem
cx(mt('10px')) // margin-top: 10px
```

### mr()

Sets right margin.

```ts
function mr(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `margin-right`

```ts
import { cx, mr } from 'typewritingclass'

cx(mr(3))      // margin-right: 0.75rem
cx(mr('auto')) // margin-right: auto
```

### mb()

Sets bottom margin.

```ts
function mb(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `margin-bottom`

```ts
import { cx, mb } from 'typewritingclass'

cx(mb(4))     // margin-bottom: 1rem
cx(mb('20px')) // margin-bottom: 20px
```

### ml()

Sets left margin.

```ts
function ml(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `margin-left`

```ts
import { cx, ml } from 'typewritingclass'

cx(ml(12))     // margin-left: 3rem
cx(ml('auto')) // margin-left: auto
```

### gap()

Sets gap between flex or grid children on both axes.

```ts
function gap(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `gap`

```ts
import { cx, gap } from 'typewritingclass'

cx(gap(4))       // gap: 1rem
cx(gap('1.5em')) // gap: 1.5em
```

### gapX()

Sets horizontal (column) gap between flex or grid children.

```ts
function gapX(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `column-gap`

```ts
import { cx, gapX } from 'typewritingclass'

cx(gapX(2))     // column-gap: 0.5rem
cx(gapX('12px')) // column-gap: 12px
```

### gapY()

Sets vertical (row) gap between flex or grid children.

```ts
function gapY(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `row-gap`

```ts
import { cx, gapY } from 'typewritingclass'

cx(gapY(3))    // row-gap: 0.75rem
cx(gapY('8px')) // row-gap: 8px
```

### Dynamic spacing example

All spacing utilities accept `DynamicValue` for runtime values:

```ts
import { dcx, p, mx, gap, dynamic } from 'typewritingclass'

const spacing = dynamic('1.5rem')
const { className, style } = dcx(p(spacing), mx(spacing), gap(spacing))
// style => { '--twc-d0': '1.5rem' }
// All three utilities reference the same custom property
```

---

## Colors

Color utilities accept a `ColorInput` value:
- **string** -- a raw CSS color string (e.g. `'#3b82f6'`, `'red'`, `'rgb(59, 130, 246)'`)
- **CSSColor** -- a branded theme color token
- **DynamicValue** -- a runtime-dynamic value created with `dynamic()`

### bg()

Sets the background color of an element.

```ts
function bg(color: string | DynamicValue): StyleRule
```

**CSS property:** `background-color`

```ts
import { cx, bg } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

cx(bg('#3b82f6'))     // background-color: #3b82f6
cx(bg(blue[500]))     // background-color: #3b82f6
cx(bg('transparent')) // background-color: transparent
cx(bg('rgb(59, 130, 246)')) // background-color: rgb(59, 130, 246)
```

Dynamic background:

```ts
import { dcx, bg, dynamic } from 'typewritingclass'

const { className, style } = dcx(bg(dynamic('#e11d48')))
// CSS: background-color: var(--twc-d0)
// style: { '--twc-d0': '#e11d48' }
```

### textColor()

Sets the text color of an element.

```ts
function textColor(color: string | DynamicValue): StyleRule
```

**CSS property:** `color`

```ts
import { cx, textColor } from 'typewritingclass'
import { gray } from 'typewritingclass/theme/colors'

cx(textColor('#111827'))   // color: #111827
cx(textColor(gray[900]))   // color: #111827
cx(textColor('inherit'))   // color: inherit
```

Dynamic text color:

```ts
import { dcx, textColor, dynamic } from 'typewritingclass'

const { className, style } = dcx(textColor(dynamic('#ffffff')))
// CSS: color: var(--twc-d0)
// style: { '--twc-d0': '#ffffff' }
```

### borderColor()

Sets the border color of an element.

```ts
function borderColor(color: string | DynamicValue): StyleRule
```

**CSS property:** `border-color`

```ts
import { cx, borderColor } from 'typewritingclass'
import { gray } from 'typewritingclass/theme/colors'

cx(borderColor('#e5e7eb'))       // border-color: #e5e7eb
cx(borderColor(gray[200]))       // border-color: #e5e7eb
cx(borderColor('currentColor')) // border-color: currentColor
```

Dynamic border color:

```ts
import { dcx, borderColor, dynamic } from 'typewritingclass'

const { className, style } = dcx(borderColor(dynamic('#ef4444')))
// CSS: border-color: var(--twc-d0)
// style: { '--twc-d0': '#ef4444' }
```

---

## Typography

### text()

Sets the font size (and optionally line height) of an element.

```ts
function text(size: TextSize | string | DynamicValue): StyleRule
```

**CSS properties:** `font-size`, and optionally `line-height` (when a `TextSize` object is passed)

When passed a `TextSize` object from the typography theme (which has both `fontSize` and `lineHeight`), both properties are set. When passed a raw string, only `font-size` is set.

```ts
import { cx, text } from 'typewritingclass'
import { lg, _2xl } from 'typewritingclass/theme/typography'

// TextSize preset -- sets both font-size and line-height
cx(text(lg))
// font-size: 1.125rem; line-height: 1.75rem

cx(text(_2xl))
// font-size: 1.5rem; line-height: 2rem

// Raw string -- sets font-size only
cx(text('2rem'))
// font-size: 2rem
```

Dynamic font size:

```ts
import { dcx, text, dynamic } from 'typewritingclass'

const { className, style } = dcx(text(dynamic('1.5rem')))
// CSS: font-size: var(--twc-d0)
// style: { '--twc-d0': '1.5rem' }
```

### font()

Sets the font weight of an element.

```ts
function font(weight: string | DynamicValue): StyleRule
```

**CSS property:** `font-weight`

```ts
import { cx, font } from 'typewritingclass'
import { bold, semibold } from 'typewritingclass/theme/typography'

cx(font(bold))     // font-weight: 700
cx(font(semibold)) // font-weight: 600
cx(font('400'))    // font-weight: 400
```

### tracking()

Sets the letter spacing (tracking) of an element.

```ts
function tracking(value: string | DynamicValue): StyleRule
```

**CSS property:** `letter-spacing`

```ts
import { cx, tracking } from 'typewritingclass'

cx(tracking('-0.025em')) // letter-spacing: -0.025em
cx(tracking('0.05em'))   // letter-spacing: 0.05em
cx(tracking('0.1em'))    // letter-spacing: 0.1em
```

### leading()

Sets the line height (leading) of an element.

```ts
function leading(value: string | DynamicValue): StyleRule
```

**CSS property:** `line-height`

```ts
import { cx, leading } from 'typewritingclass'

cx(leading('1.5'))  // line-height: 1.5
cx(leading('2rem')) // line-height: 2rem
cx(leading('1'))    // line-height: 1
```

### textAlign()

Sets the text alignment of an element.

```ts
function textAlign(value: string): StyleRule
```

**CSS property:** `text-align`

```ts
import { cx, textAlign } from 'typewritingclass'

cx(textAlign('center'))  // text-align: center
cx(textAlign('right'))   // text-align: right
cx(textAlign('justify')) // text-align: justify
cx(textAlign('left'))    // text-align: left
```

:::note
`textAlign()` does not accept `DynamicValue` since text alignment rarely changes at runtime.
:::

---

## Layout

### flex()

Sets the element to `display: flex`.

```ts
function flex(): StyleRule
```

**CSS property:** `display: flex`

```ts
import { cx, flex, items, justify, gap } from 'typewritingclass'

cx(flex(), items('center'), justify('space-between'), gap(4))
// display: flex; align-items: center; justify-content: space-between; gap: 1rem
```

### flexCol()

Sets the element to a column-oriented flex container.

```ts
function flexCol(): StyleRule
```

**CSS properties:** `display: flex`, `flex-direction: column`

```ts
import { cx, flexCol, gap } from 'typewritingclass'

cx(flexCol(), gap(4))
// display: flex; flex-direction: column; gap: 1rem
```

### flexRow()

Sets the element to a row-oriented flex container.

```ts
function flexRow(): StyleRule
```

**CSS properties:** `display: flex`, `flex-direction: row`

```ts
import { cx, flexRow, gap } from 'typewritingclass'

cx(flexRow(), gap(2))
// display: flex; flex-direction: row; gap: 0.5rem
```

### flexWrap()

Sets `flex-wrap: wrap` on a flex container.

```ts
function flexWrap(): StyleRule
```

**CSS property:** `flex-wrap: wrap`

```ts
import { cx, flex, flexWrap, gap } from 'typewritingclass'

cx(flex(), flexWrap(), gap(4))
// display: flex; flex-wrap: wrap; gap: 1rem
```

### inlineFlex()

Sets the element to `display: inline-flex`.

```ts
function inlineFlex(): StyleRule
```

**CSS property:** `display: inline-flex`

```ts
import { cx, inlineFlex, items, gap } from 'typewritingclass'

cx(inlineFlex(), items('center'), gap(2))
// display: inline-flex; align-items: center; gap: 0.5rem
```

### grid()

Sets the element to `display: grid`, optionally defining equal-width columns.

```ts
function grid(cols?: number): StyleRule
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `cols` | `number \| undefined` | Optional number of equal-width columns. |

**CSS properties:** `display: grid`, and optionally `grid-template-columns`

```ts
import { cx, grid, gap } from 'typewritingclass'

cx(grid())
// display: grid

cx(grid(3))
// display: grid; grid-template-columns: repeat(3, minmax(0, 1fr))

cx(grid(3), gap(4))
// display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem
```

### gridCols()

Sets the number of equal-width grid columns.

```ts
function gridCols(n: number): StyleRule
```

**CSS property:** `grid-template-columns`

```ts
import { cx, gridCols } from 'typewritingclass'

cx(gridCols(4))
// grid-template-columns: repeat(4, minmax(0, 1fr))
```

### gridRows()

Sets the number of equal-height grid rows.

```ts
function gridRows(n: number): StyleRule
```

**CSS property:** `grid-template-rows`

```ts
import { cx, gridRows } from 'typewritingclass'

cx(gridRows(3))
// grid-template-rows: repeat(3, minmax(0, 1fr))
```

### w()

Sets the width of an element.

```ts
function w(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `width`

```ts
import { cx, w } from 'typewritingclass'
import { full, screen } from 'typewritingclass/theme/sizes'

cx(w(64))      // width: 16rem
cx(w('100%'))  // width: 100%
cx(w(full))    // width: 100%
cx(w(screen))  // width: 100vw
```

### h()

Sets the height of an element.

```ts
function h(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `height`

```ts
import { cx, h } from 'typewritingclass'
import { screenH } from 'typewritingclass/theme/sizes'

cx(h(12))       // height: 3rem
cx(h('100vh'))  // height: 100vh
cx(h(screenH))  // height: 100vh
```

### size()

Sets both width and height to the same value.

```ts
function size(value: number | string | DynamicValue): StyleRule
```

**CSS properties:** `width`, `height`

```ts
import { cx, size } from 'typewritingclass'

cx(size(10))     // width: 2.5rem; height: 2.5rem
cx(size('48px')) // width: 48px; height: 48px
```

### minW()

Sets the minimum width of an element.

```ts
function minW(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `min-width`

```ts
import { cx, minW } from 'typewritingclass'

cx(minW(48))    // min-width: 12rem
cx(minW('0'))   // min-width: 0
```

### minH()

Sets the minimum height of an element.

```ts
function minH(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `min-height`

```ts
import { cx, minH } from 'typewritingclass'

cx(minH(96))      // min-height: 24rem
cx(minH('100vh')) // min-height: 100vh
```

### maxW()

Sets the maximum width of an element.

```ts
function maxW(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `max-width`

```ts
import { cx, maxW } from 'typewritingclass'

cx(maxW(80))      // max-width: 20rem
cx(maxW('768px')) // max-width: 768px
```

### maxH()

Sets the maximum height of an element.

```ts
function maxH(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `max-height`

```ts
import { cx, maxH } from 'typewritingclass'

cx(maxH(40))      // max-height: 10rem
cx(maxH('100vh')) // max-height: 100vh
```

### display()

Sets the CSS `display` property.

```ts
function display(value: string): StyleRule
```

**CSS property:** `display`

```ts
import { cx, display } from 'typewritingclass'

cx(display('block'))        // display: block
cx(display('inline-block')) // display: inline-block
cx(display('none'))         // display: none
```

### items()

Sets the `align-items` property on a flex or grid container.

```ts
function items(value: string): StyleRule
```

**CSS property:** `align-items`

```ts
import { cx, items } from 'typewritingclass'

cx(items('center'))     // align-items: center
cx(items('flex-start')) // align-items: flex-start
cx(items('stretch'))    // align-items: stretch
cx(items('baseline'))   // align-items: baseline
```

### justify()

Sets the `justify-content` property on a flex or grid container.

```ts
function justify(value: string): StyleRule
```

**CSS property:** `justify-content`

```ts
import { cx, justify } from 'typewritingclass'

cx(justify('center'))        // justify-content: center
cx(justify('space-between')) // justify-content: space-between
cx(justify('flex-end'))      // justify-content: flex-end
cx(justify('space-around'))  // justify-content: space-around
```

### self()

Sets the `align-self` property on a flex or grid child.

```ts
function self(value: string): StyleRule
```

**CSS property:** `align-self`

```ts
import { cx, self } from 'typewritingclass'

cx(self('center'))    // align-self: center
cx(self('flex-start')) // align-self: flex-start
cx(self('stretch'))   // align-self: stretch
```

### overflow()

Sets the `overflow` behavior on both axes.

```ts
function overflow(value: string): StyleRule
```

**CSS property:** `overflow`

```ts
import { cx, overflow } from 'typewritingclass'

cx(overflow('hidden'))  // overflow: hidden
cx(overflow('auto'))    // overflow: auto
cx(overflow('scroll'))  // overflow: scroll
cx(overflow('visible')) // overflow: visible
```

### overflowX()

Sets the horizontal overflow behavior.

```ts
function overflowX(value: string): StyleRule
```

**CSS property:** `overflow-x`

```ts
import { cx, overflowX } from 'typewritingclass'

cx(overflowX('auto'))   // overflow-x: auto
cx(overflowX('hidden')) // overflow-x: hidden
cx(overflowX('scroll')) // overflow-x: scroll
```

### overflowY()

Sets the vertical overflow behavior.

```ts
function overflowY(value: string): StyleRule
```

**CSS property:** `overflow-y`

```ts
import { cx, overflowY } from 'typewritingclass'

cx(overflowY('auto'))   // overflow-y: auto
cx(overflowY('hidden')) // overflow-y: hidden
cx(overflowY('scroll')) // overflow-y: scroll
```

### relative()

Sets the element to `position: relative`.

```ts
function relative(): StyleRule
```

**CSS property:** `position: relative`

```ts
import { cx, relative } from 'typewritingclass'

cx(relative())
// position: relative
```

### absolute()

Sets the element to `position: absolute`.

```ts
function absolute(): StyleRule
```

**CSS property:** `position: absolute`

```ts
import { cx, absolute, top, left } from 'typewritingclass'

cx(absolute(), top(0), left(0))
// position: absolute; top: 0px; left: 0px
```

### fixed()

Sets the element to `position: fixed`.

```ts
function fixed(): StyleRule
```

**CSS property:** `position: fixed`

```ts
import { cx, fixed, top, inset } from 'typewritingclass'

cx(fixed(), top(0))
// position: fixed; top: 0px

cx(fixed(), inset(0))
// position: fixed; inset: 0px
```

### sticky()

Sets the element to `position: sticky`.

```ts
function sticky(): StyleRule
```

**CSS property:** `position: sticky`

```ts
import { cx, sticky, top, z } from 'typewritingclass'

cx(sticky(), top(0), z(10))
// position: sticky; top: 0px; z-index: 10
```

### top()

Sets the `top` position offset.

```ts
function top(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `top`

```ts
import { cx, top } from 'typewritingclass'

cx(top(0))     // top: 0px
cx(top(4))     // top: 1rem
cx(top('50%')) // top: 50%
```

### right()

Sets the `right` position offset.

```ts
function right(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `right`

```ts
import { cx, right } from 'typewritingclass'

cx(right(0))   // right: 0px
cx(right(4))   // right: 1rem
cx(right('0')) // right: 0
```

### bottom()

Sets the `bottom` position offset.

```ts
function bottom(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `bottom`

```ts
import { cx, bottom } from 'typewritingclass'

cx(bottom(0))     // bottom: 0px
cx(bottom('2rem')) // bottom: 2rem
```

### left()

Sets the `left` position offset.

```ts
function left(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `left`

```ts
import { cx, left } from 'typewritingclass'

cx(left(4))    // left: 1rem
cx(left('50%')) // left: 50%
```

### inset()

Sets the `inset` shorthand property (top, right, bottom, left).

```ts
function inset(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `inset`

```ts
import { cx, inset } from 'typewritingclass'

cx(inset(0))   // inset: 0px
cx(inset('0')) // inset: 0
```

### z()

Sets the `z-index` stacking order.

```ts
function z(value: number | string | DynamicValue): StyleRule
```

**CSS property:** `z-index`

Numeric values are converted to strings. Also accepts string values like `'auto'`.

```ts
import { cx, z } from 'typewritingclass'

cx(z(10))      // z-index: 10
cx(z(50))      // z-index: 50
cx(z(-1))      // z-index: -1
cx(z('auto'))  // z-index: auto
```

---

## Borders

### rounded()

Sets the `border-radius` on all corners.

```ts
function rounded(value?: string | DynamicValue): StyleRule
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `string \| DynamicValue \| undefined` | `'0.25rem'` | CSS border-radius string or `dynamic()` value. |

**CSS property:** `border-radius`

When called without arguments, uses the default border radius of `0.25rem`.

```ts
import { cx, rounded } from 'typewritingclass'
import { lg, full, none } from 'typewritingclass/theme/borders'

cx(rounded())           // border-radius: 0.25rem
cx(rounded('0.5rem'))   // border-radius: 0.5rem
cx(rounded(lg))         // border-radius: 0.5rem
cx(rounded(full))       // border-radius: 9999px (pill/circle)
cx(rounded(none))       // border-radius: 0px
cx(rounded('9999px'))   // border-radius: 9999px
```

### roundedT()

Sets the border-radius on the top-left and top-right corners.

```ts
function roundedT(value?: string | DynamicValue): StyleRule
```

**CSS properties:** `border-top-left-radius`, `border-top-right-radius`

```ts
import { cx, roundedT } from 'typewritingclass'

cx(roundedT())        // border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem
cx(roundedT('1rem'))  // border-top-left-radius: 1rem; border-top-right-radius: 1rem
```

### roundedB()

Sets the border-radius on the bottom-left and bottom-right corners.

```ts
function roundedB(value?: string | DynamicValue): StyleRule
```

**CSS properties:** `border-bottom-left-radius`, `border-bottom-right-radius`

```ts
import { cx, roundedB } from 'typewritingclass'

cx(roundedB())        // border-bottom-left-radius: 0.25rem; border-bottom-right-radius: 0.25rem
cx(roundedB('1rem'))  // border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem
```

### roundedL()

Sets the border-radius on the top-left and bottom-left corners.

```ts
function roundedL(value?: string | DynamicValue): StyleRule
```

**CSS properties:** `border-top-left-radius`, `border-bottom-left-radius`

```ts
import { cx, roundedL } from 'typewritingclass'

cx(roundedL())           // border-top-left-radius: 0.25rem; border-bottom-left-radius: 0.25rem
cx(roundedL('0.75rem'))  // border-top-left-radius: 0.75rem; border-bottom-left-radius: 0.75rem
```

### roundedR()

Sets the border-radius on the top-right and bottom-right corners.

```ts
function roundedR(value?: string | DynamicValue): StyleRule
```

**CSS properties:** `border-top-right-radius`, `border-bottom-right-radius`

```ts
import { cx, roundedR } from 'typewritingclass'

cx(roundedR())           // border-top-right-radius: 0.25rem; border-bottom-right-radius: 0.25rem
cx(roundedR('0.75rem'))  // border-top-right-radius: 0.75rem; border-bottom-right-radius: 0.75rem
```

### border()

Sets a solid border on all sides.

```ts
function border(width?: string): StyleRule
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | `string \| undefined` | `'1px'` | CSS border-width string. |

**CSS properties:** `border-width`, `border-style: solid`

```ts
import { cx, border } from 'typewritingclass'

cx(border())      // border-width: 1px; border-style: solid
cx(border('2px')) // border-width: 2px; border-style: solid
cx(border('0'))   // border-width: 0; border-style: solid
```

### borderT()

Sets a solid border on the top side.

```ts
function borderT(width?: string): StyleRule
```

**CSS properties:** `border-top-width`, `border-style: solid`

```ts
import { cx, borderT } from 'typewritingclass'

cx(borderT())      // border-top-width: 1px; border-style: solid
cx(borderT('2px')) // border-top-width: 2px; border-style: solid
```

### borderR()

Sets a solid border on the right side.

```ts
function borderR(width?: string): StyleRule
```

**CSS properties:** `border-right-width`, `border-style: solid`

```ts
import { cx, borderR } from 'typewritingclass'

cx(borderR())      // border-right-width: 1px; border-style: solid
cx(borderR('3px')) // border-right-width: 3px; border-style: solid
```

### borderB()

Sets a solid border on the bottom side.

```ts
function borderB(width?: string): StyleRule
```

**CSS properties:** `border-bottom-width`, `border-style: solid`

```ts
import { cx, borderB } from 'typewritingclass'

cx(borderB())      // border-bottom-width: 1px; border-style: solid
cx(borderB('2px')) // border-bottom-width: 2px; border-style: solid
```

### borderL()

Sets a solid border on the left side.

```ts
function borderL(width?: string): StyleRule
```

**CSS properties:** `border-left-width`, `border-style: solid`

```ts
import { cx, borderL } from 'typewritingclass'

cx(borderL())      // border-left-width: 1px; border-style: solid
cx(borderL('4px')) // border-left-width: 4px; border-style: solid
```

### ring()

Creates a focus-ring-style `box-shadow` around an element.

```ts
function ring(width?: string, color?: string): StyleRule
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | `string \| undefined` | `'3px'` | The ring width. |
| `color` | `string \| undefined` | `'#3b82f6'` | The ring color. |

**CSS property:** `box-shadow`

Produces a `box-shadow` with zero offset and zero blur, acting as an outline alternative that respects border-radius.

```ts
import { cx, ring } from 'typewritingclass'

cx(ring())               // box-shadow: 0 0 0 3px #3b82f6
cx(ring('2px'))          // box-shadow: 0 0 0 2px #3b82f6
cx(ring('2px', '#ef4444')) // box-shadow: 0 0 0 2px #ef4444
cx(ring('1px'))          // box-shadow: 0 0 0 1px #3b82f6
```

Combine with modifiers for focus rings:

```ts
import { cx, ring, when, focusVisible } from 'typewritingclass'

cx(when(focusVisible)(ring('2px', '#3b82f6')))
// CSS: .cls:focus-visible { box-shadow: 0 0 0 2px #3b82f6; }
```

---

## Effects

### shadow()

Sets the `box-shadow` of an element.

```ts
function shadow(value?: string | DynamicValue): StyleRule
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `string \| DynamicValue \| undefined` | Theme `DEFAULT` shadow | CSS box-shadow string or `dynamic()` value. |

**CSS property:** `box-shadow`

When called without arguments, uses the default shadow: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`.

```ts
import { cx, shadow } from 'typewritingclass'
import { sm, md, lg, xl, _2xl, inner, none } from 'typewritingclass/theme/shadows'

cx(shadow())       // Default shadow
cx(shadow(sm))     // Subtle shadow
cx(shadow(md))     // Moderate shadow
cx(shadow(lg))     // Pronounced shadow
cx(shadow(xl))     // Heavy shadow
cx(shadow(_2xl))   // Most dramatic shadow
cx(shadow(inner))  // Inset shadow
cx(shadow(none))   // Remove shadow
cx(shadow('none')) // Remove shadow (raw string)
```

Shadow with hover effect:

```ts
import { cx, shadow, when, hover } from 'typewritingclass'
import { md, lg } from 'typewritingclass/theme/shadows'

cx(shadow(md), when(hover)(shadow(lg)))
```

### opacity()

Sets the opacity of an element.

```ts
function opacity(value: number | DynamicValue): StyleRule
```

**CSS property:** `opacity`

The numeric value (between `0` and `1`) is converted to a string.

```ts
import { cx, opacity } from 'typewritingclass'

cx(opacity(1))    // opacity: 1
cx(opacity(0.5))  // opacity: 0.5
cx(opacity(0))    // opacity: 0
cx(opacity(0.75)) // opacity: 0.75
```

With modifiers:

```ts
import { cx, opacity, when, hover, disabled } from 'typewritingclass'

cx(opacity(1), when(hover)(opacity(0.8)), when(disabled)(opacity(0.5)))
```

### backdrop()

Sets the `backdrop-filter` CSS property.

```ts
function backdrop(value: string | DynamicValue): StyleRule
```

**CSS property:** `backdrop-filter`

Applies graphical effects (blurring, color shifting) to the area behind the element.

```ts
import { cx, backdrop } from 'typewritingclass'

cx(backdrop('blur(8px)'))                  // backdrop-filter: blur(8px)
cx(backdrop('saturate(180%)'))             // backdrop-filter: saturate(180%)
cx(backdrop('blur(12px) saturate(150%)'))  // backdrop-filter: blur(12px) saturate(150%)
```

---

## Interactivity

### cursor()

Sets the cursor style of an element.

```ts
function cursor(value: string | DynamicValue): StyleRule
```

**CSS property:** `cursor`

```ts
import { cx, cursor } from 'typewritingclass'

cx(cursor('pointer'))      // cursor: pointer
cx(cursor('grab'))         // cursor: grab
cx(cursor('not-allowed'))  // cursor: not-allowed
cx(cursor('text'))         // cursor: text
cx(cursor('move'))         // cursor: move
cx(cursor('default'))      // cursor: default
```

### select()

Sets the `user-select` behavior of an element.

```ts
function select(value: string): StyleRule
```

**CSS property:** `user-select`

```ts
import { cx, select } from 'typewritingclass'

cx(select('none')) // user-select: none
cx(select('text')) // user-select: text
cx(select('all'))  // user-select: all
cx(select('auto')) // user-select: auto
```

### pointerEvents()

Sets the `pointer-events` behavior of an element.

```ts
function pointerEvents(value: string): StyleRule
```

**CSS property:** `pointer-events`

```ts
import { cx, pointerEvents } from 'typewritingclass'

cx(pointerEvents('none')) // pointer-events: none
cx(pointerEvents('auto')) // pointer-events: auto
```

---

## Composition patterns

All utilities compose naturally with each other through `cx()` and with modifiers through `when()`:

### Responsive layout

```ts
import { cx, flex, flexCol, flexRow, gap, p, when, md, lg } from 'typewritingclass'

const container = cx(
  flexCol(),
  gap(4),
  p(4),
  when(md)(flexRow(), gap(6), p(6)),
  when(lg)(gap(8), p(8)),
)
```

### Interactive button

```ts
import { cx, p, px, bg, textColor, rounded, font, cursor, opacity, shadow, when, hover, active, disabled, focusVisible, ring } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'
import { bold } from 'typewritingclass/theme/typography'

const button = cx(
  px(6),
  p(3),
  bg(blue[500]),
  textColor(white),
  rounded('0.375rem'),
  font(bold),
  cursor('pointer'),
  shadow(),
  when(hover)(bg(blue[600])),
  when(active)(bg(blue[700])),
  when(focusVisible)(ring('2px', blue[400])),
  when(disabled)(opacity(0.5), cursor('not-allowed')),
)
```

### Dynamic values

```ts
import { dcx, bg, textColor, rounded, p, dynamic } from 'typewritingclass'

function ThemedCard({ bgColor, radius }: { bgColor: string; radius: string }) {
  const { className, style } = dcx(
    p(4),
    bg(dynamic(bgColor)),
    rounded(dynamic(radius)),
    textColor('#111827'),
  )
  return <div className={className} style={style} />
}
```
