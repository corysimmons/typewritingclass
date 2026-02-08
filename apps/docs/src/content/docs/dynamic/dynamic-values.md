---
title: "dynamic() & dcx()"
description: "Use runtime values in your styles with CSS custom properties."
sidebar:
  order: 1
---

Most typewritingclass styles are **static** -- the compiler extracts them at build time and emits a stylesheet with no runtime cost. But sometimes a value is only known at runtime: a user-selected color, a progress percentage, a drag offset. The `dynamic()` and `dcx()` pair lets you handle those cases while keeping the rest of your styles fully compiled.

## How it works

The strategy is simple:

1. **`dynamic(value)`** wraps a runtime value in a `DynamicValue` object. Instead of inlining the value into the CSS rule, the compiler emits a `var(--twc-dN)` reference.
2. **`dcx()`** works like `cx()` but also collects every `DynamicValue` binding. It returns both a `className` string (for the class attribute) and a `style` object (for the inline style attribute) that maps each custom property to its current value.

Static parts become class names in the stylesheet. Dynamic parts become CSS custom property assignments on the element's inline style. When the dynamic value changes, only the inline style changes -- no new class is generated, no stylesheet is touched.

## `dynamic(value)`

Wraps a `string` or `number` value so that any utility receiving it emits a `var()` reference instead of inlining the value.

```ts
import { dynamic } from 'typewritingclass'

const color = dynamic('#e11d48')
// color._tag    => 'DynamicValue'
// color.__value => '#e11d48'
// color.__id    => '--twc-d0'
```

Each call to `dynamic()` allocates a globally unique custom property name (`--twc-d0`, `--twc-d1`, ...). Pass the returned `DynamicValue` to any utility that accepts it:

```ts
import { dynamic, bg, p, rounded } from 'typewritingclass'

const userColor = dynamic('#e11d48')

bg(userColor)
// rule.declarations => { 'background-color': 'var(--twc-d0)' }
// rule.dynamicBindings => { '--twc-d0': '#e11d48' }
```

The value itself is not baked into the generated class. Instead, the class references `var(--twc-d0)`, and the concrete value is applied through the inline style.

### Type guard: `isDynamic()`

Use `isDynamic()` to check whether an unknown value is a `DynamicValue` at runtime. This is primarily useful when writing custom utilities (see [Writing Utilities](/plugins/writing-utilities/)).

```ts
import { dynamic, isDynamic } from 'typewritingclass'

const val = dynamic('#ff0000')
isDynamic(val)       // => true
isDynamic('#ff0000') // => false
isDynamic(42)        // => false
isDynamic(null)      // => false
```

## `dcx()` -- composing dynamic styles

`dcx()` is the dynamic counterpart to `cx()`. It accepts the same arguments -- `StyleRule` objects and plain class name strings -- but returns a `DynamicResult` object instead of a plain string:

```ts
interface DynamicResult {
  className: string                  // space-separated class names
  style: Record<string, string>      // CSS custom property assignments
}
```

### Basic usage

```ts
import { dcx, bg, p, rounded, dynamic } from 'typewritingclass'

const userColor = dynamic('#e11d48')

const { className, style } = dcx(p(4), bg(userColor), rounded('lg'))
// className => "_a1b2c _d3e4f _g5h6i"
// style     => { '--twc-d0': '#e11d48' }
```

The generated CSS for the `bg` rule looks like this:

```css
._d3e4f { background-color: var(--twc-d0); }
```

And the inline style on the element sets the actual value:

```html
<div class="_a1b2c _d3e4f _g5h6i" style="--twc-d0: #e11d48;">
```

### Applying in JSX

Spread both `className` and `style` onto your element:

```tsx
import { dcx, bg, p, textColor, dynamic } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

function Banner({ color }: { color: string }) {
  const dynColor = dynamic(color)
  const { className, style } = dcx(p(6), bg(dynColor), textColor(white))

  return <div className={className} style={style}>Welcome!</div>
}
```

### Mixing static and dynamic rules

When you pass purely static rules to `dcx()`, the `style` object is empty. There is no overhead for static rules:

```ts
import { dcx, p, bg } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const { className, style } = dcx(p(4), bg(blue[500]))
// className => "_a1b2c _d3e4f"
// style     => {}
```

You can freely mix static and dynamic rules in the same `dcx()` call. Only the rules built from a `DynamicValue` contribute to the `style` object:

```ts
import { dcx, p, bg, rounded, dynamic } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const radius = dynamic('12px')
const { className, style } = dcx(
  p(4),                  // static -- goes to stylesheet only
  bg(blue[500]),         // static -- goes to stylesheet only
  rounded(radius),       // dynamic -- emits var() in stylesheet, binding in style
)
// style => { '--twc-d0': '12px' }
```

### Multiple dynamic values

You can have as many dynamic values as you need. Each gets its own custom property:

```ts
import { dcx, bg, textColor, p, dynamic } from 'typewritingclass'

const bgColor = dynamic('#1e293b')
const fgColor = dynamic('#f8fafc')
const spacing = dynamic('2rem')

const { className, style } = dcx(
  bg(bgColor),
  textColor(fgColor),
  p(spacing),
)
// style => {
//   '--twc-d0': '#1e293b',
//   '--twc-d1': '#f8fafc',
//   '--twc-d2': '2rem',
// }
```

## `useStyle()` -- React hook

The `typewritingclass-react` package provides a `useStyle()` hook that wraps `dcx()` in `useMemo` for stable references across re-renders:

```tsx
import { useStyle } from 'typewritingclass-react'
import { p, bg, rounded, dynamic } from 'typewritingclass'

function Card({ color }: { color: string }) {
  const props = useStyle(p(6), bg(dynamic(color)), rounded('lg'))
  return <div {...props}>Content</div>
  // Renders: <div class="_a1b _c2d _e3f" style="--twc-d0: #ff0000">Content</div>
}
```

The returned object has `className` and `style` properties, so spreading it onto a JSX element sets both attributes at once.

### Reactivity

When the component re-renders with a new `color` value, `useStyle()` recomputes the `dcx()` result. The class names stay stable (because the CSS rule structure hasn't changed -- only the custom property value), and the inline style updates to reflect the new value:

```tsx
function ProgressBar({ percent }: { percent: number }) {
  const props = useStyle(
    css({ height: '4px' }),
    css`width: ${dynamic(`${percent}%`)}`,
    bg('#3b82f6'),
    rounded('full'),
  )

  return <div {...props} />
  // As `percent` changes, only --twc-dN in the inline style updates.
  // No new class names are generated.
}
```

### Mixing with plain class names

`useStyle()` accepts strings as well, just like `cx()` and `dcx()`:

```tsx
const props = useStyle(p(4), rounded('lg'), 'my-custom-class')
// props.className => "_a1b _c2d my-custom-class"
// props.style     => {}
```

## Compiler handling

The typewritingclass compiler statically analyzes `dynamic()` calls and the utilities that receive them. Here is what happens at build time:

1. The compiler sees `bg(dynamic(color))` and recognizes that `dynamic(color)` produces a `DynamicValue`.
2. Instead of resolving `color` to a static CSS value, it emits a rule with `var(--twc-dN)` in place of the value.
3. The generated CSS goes into the stylesheet: `._xyz { background-color: var(--twc-d0); }`.
4. At runtime, `dcx()` assigns `--twc-d0` to the actual value of `color` in the returned `style` object.

Because the class name is derived from the _shape_ of the rule (not the dynamic value), it remains stable across value changes. This means the browser does not need to recalculate which rules apply -- only the custom property value changes, triggering a repaint rather than a full style recalculation.

### Strict mode

When strict mode is enabled in the compiler, it validates that `dynamic()` values are passed only to utilities that support `DynamicValue` inputs. Passing a `DynamicValue` to a utility that does not handle it will produce a compile-time error in the Vite error overlay.

## When to use `dynamic()` vs. static values

| Scenario | Use |
|---|---|
| Value known at build time (theme token, hardcoded color) | Static: `bg(blue[500])` with `cx()` |
| Value from props, state, or user input | Dynamic: `bg(dynamic(color))` with `dcx()` |
| Value changes frequently (animations, drag) | Dynamic: keeps class names stable |
| Value changes rarely (theme selection) | Either works; static via theme tokens may be simpler |

As a rule of thumb: if the value is in your source code, use static. If the value comes from the runtime environment, use `dynamic()`.

## Full example: theme color picker

```tsx
import { useStyle } from 'typewritingclass-react'
import { cx, p, rounded, bg, textColor, dynamic, when, hover } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'
import { useState } from 'react'

function ThemePicker() {
  const [color, setColor] = useState('#3b82f6')

  const swatchProps = useStyle(
    p(8),
    bg(dynamic(color)),
    textColor(white),
    rounded('xl'),
  )

  return (
    <div>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div {...swatchProps}>
        Selected: {color}
      </div>
    </div>
  )
}
```

The swatch updates instantly as the user drags the color picker. The class names never change -- only the `--twc-d0` custom property in the inline style is updated on each render.
