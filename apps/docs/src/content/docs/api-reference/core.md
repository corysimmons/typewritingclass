---
title: Core API
description: Complete reference for tw, cx(), dcx(), when(), css(), dynamic(), and layer().
sidebar:
  order: 1
---

## tw

Proxy-based chainable style builder. The recommended way to write styles.

```ts
import { tw } from 'typewritingclass'
```

### Utilities with arguments

```ts
tw.bg('blue-500').p(4).rounded('lg').shadow('md')
```

### Value-less utilities

```ts
tw.flex.flexCol.relative.truncate
```

### Single-utility modifiers (property syntax)

The modifier applies to the next utility in the chain:

```ts
tw.hover.bg('blue-500')
tw.md.p(8)
tw.dark.bg('slate-900')
```

### Multi-utility modifiers (function syntax)

```ts
tw.hover(tw.bg('blue-500').textColor('white').shadow('lg'))
tw.dark(tw.bg('slate-800').textColor('slate-100'))
```

### Resolution

Resolves to a class string automatically:

```ts
<div className={tw.p(4).bg('blue-500')} />
tw.p(4).toString()
tw.p(4).value
tw.p(4).className
```

### Immutability

Every chain is immutable -- property access and method calls return new chains:

```ts
const base = tw.flex.flexCol
const a = base.gap(4)  // flex + flexCol + gap(4)
const b = base.gap(8)  // flex + flexCol + gap(8)
```

### Reserved name remappings

| tw name | Maps to |
|---|---|
| `tw.content` | `content_()` |
| `tw.float` | `float_()` |
| `tw.static` | `static_()` |
| `tw.placeholder` | `placeholder_` modifier |
| `tw.selection` | `selection_` modifier |
| `tw.has` | `has_()` modifier |

---

## cx()

Composes style rules and string class names into a single CSS class string.

```ts
function cx(...args: (StyleRule | string)[]): string
```

Later arguments override earlier ones via CSS layer ordering.

```ts
import { cx, p, bg, rounded } from 'typewritingclass'

cx(p(4), bg('blue-500'), rounded('lg'))
// => "_a1b2c _d3e4f _g5h6i"

// Mix with plain strings
cx('my-class', p(4), bg('white'))

// With modifiers
cx(p(4), when(hover)(bg('blue-600')), when(md)(p(8)))
```

---

## dcx()

Like `cx()` but also returns an inline style object for dynamic CSS values.

```ts
function dcx(...args: (StyleRule | string)[]): { className: string; style: Record<string, string> }
```

```ts
import { dcx, bg, p, dynamic } from 'typewritingclass'

const { className, style } = dcx(p(4), bg(dynamic('#e11d48')))
// className => "_a1b2c _d3e4f"
// style     => { '--twc-d0': '#e11d48' }

<div className={className} style={style} />
```

---

## when()

Applies modifiers (pseudo-states, breakpoints, dark mode) to style rules.

```ts
function when(...modifiers: Modifier[]): (...rules: StyleRule[]) => StyleRule
```

Modifiers are applied right-to-left (first modifier is innermost):

```ts
when(hover)(bg('blue-600'))              // :hover
when(md)(p(8))                            // @media (min-width: 768px)
when(hover, md)(bg('blue-700'))          // hover inside md breakpoint
when(dark)(bg('slate-900'), textColor('white'))  // dark mode
```

---

## css()

Escape hatch for raw CSS declarations.

```ts
// Object form
css({ display: 'grid', 'grid-template-columns': '1fr 1fr' })

// Tagged template
css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

// With dynamic values
const color = dynamic('#e11d48')
dcx(css`background-color: ${color}; padding: 1rem;`)
```

---

## dynamic()

Wraps a value for runtime CSS custom property injection.

```ts
function dynamic<T extends string | number>(value: T): DynamicValue<T>
```

Use with `dcx()` -- the value becomes a `var(--twc-dN)` reference in CSS and is applied via inline style:

```ts
const { className, style } = dcx(bg(dynamic(color)))
<div className={className} style={style} />
```

---

## isDynamic()

Type guard for `DynamicValue`. Useful when building custom utilities:

```ts
function isDynamic(v: unknown): v is DynamicValue
```

---

## layer()

Assigns explicit layer priority, overriding automatic layer numbering:

```ts
function layer(priority: number): (...rules: StyleRule[]) => StyleRule
```

```ts
const base = layer(0)(p(4), bg('white'))  // low priority, easily overridden
cx(base, bg('blue-500'))                   // blue overrides white
```

---

## createRule() / createDynamicRule()

Low-level functions for building custom utilities. See [Writing Utilities](/plugins/writing-utilities/).

```ts
createRule({ padding: '1rem' })
createDynamicRule({ color: 'var(--twc-d0)' }, { '--twc-d0': '#ff0000' })
```

---

## generateCSS()

Returns the full CSS string for all registered rules. Used by the compiler and SSR integrations:

```ts
function generateCSS(): string
```

---

## Types

```ts
interface StyleRule {
  _tag: 'StyleRule'
  declarations: Record<string, string>
  selectors: string[]
  mediaQueries: string[]
  dynamicBindings?: Record<string, string>
}

interface DynamicValue<T = string | number> {
  _tag: 'DynamicValue'
  __value: T
  __id: string
}

interface DynamicResult {
  className: string
  style: Record<string, string>
}

type Utility = (value: any) => StyleRule
type Modifier = (rule: StyleRule) => StyleRule
```

### Input types

| Type | Accepted values | Used by |
|---|---|---|
| `ColorInput` | Theme tokens, CSS color strings, `dynamic()` | `bg()`, `textColor()`, `borderColor()` |
| `SpacingInput` | Numbers (spacing scale), CSS strings, `dynamic()` | `p()`, `m()`, `gap()` and variants |
| `SizeInput` | Numbers, CSS strings, size tokens, `dynamic()` | `w()`, `h()`, `size()`, `minW()`, etc. |
| `RadiusInput` | Radius tokens, CSS strings, `dynamic()` | `rounded()` and variants |
| `ShadowInput` | Shadow tokens, CSS strings, `dynamic()` | `shadow()` |
