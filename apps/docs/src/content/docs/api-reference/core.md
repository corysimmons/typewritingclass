---
title: Core API
description: Complete reference for cx(), dcx(), when(), css(), dynamic(), and layer().
sidebar:
  order: 1
---

The core API consists of a small set of composable functions that form the foundation of typewritingclass. Every utility and modifier plugs into these functions.

## cx()

Composes style rules and string class names into a single CSS class string. This is the primary function you will use in every component.

### Signature

```ts
function cx(...args: (StyleRule | string)[]): string
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `...args` | `(StyleRule \| string)[]` | Any number of style rules from utility functions, or plain class name strings. |

### Return type

`string` -- A space-separated class string ready for `className` or `class`.

### How it works

Each `StyleRule` argument is registered in the global stylesheet and assigned a unique, deterministic class name based on its declarations. Plain strings are passed through unchanged, so you can mix generated rules with external or hand-written class names.

Later arguments override earlier ones when CSS properties conflict. This is achieved through automatic layer numbering -- each rule gets an incrementing layer number, and rules on higher layers take precedence.

### Examples

#### Basic composition

```ts
import { cx, p, bg, rounded } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const className = cx(p(4), bg(blue[500]), rounded('0.5rem'))
// => "_a1b2c _d3e4f _g5h6i"
// CSS:
//   .\_a1b2c { padding: 1rem; }
//   .\_d3e4f { background-color: #3b82f6; }
//   .\_g5h6i { border-radius: 0.5rem; }
```

#### Override earlier rules

```ts
import { cx, p } from 'typewritingclass'

cx(p(4), p(2))
// Only p(2) applies -- it is placed on a higher layer
// CSS: padding: 0.5rem;
```

#### Mix string classes with rules

```ts
import { cx, p, bg } from 'typewritingclass'

cx('my-component', p(4), bg('#ffffff'))
// => "my-component _a1b2c _d3e4f"
```

#### With modifiers

```ts
import { cx, p, bg, when, hover, md } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

cx(
  p(4),
  when(hover)(bg(blue[600])),
  when(md)(p(8)),
)
// CSS:
//   .cls1 { padding: 1rem; }
//   .cls2:hover { background-color: #2563eb; }
//   @media (min-width: 768px) { .cls3 { padding: 2rem; } }
```

### Development warnings

In development mode (`process.env.NODE_ENV !== 'production'`), `cx()` emits console warnings when multiple `StyleRule` arguments in the same call declare the same CSS property. This helps catch accidental conflicts like `cx(p(4), p(8))`.

---

## dcx()

Composes style rules into a class string **and** an inline style object, supporting runtime-dynamic CSS values.

### Signature

```ts
function dcx(...args: (StyleRule | string)[]): DynamicResult
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `...args` | `(StyleRule \| string)[]` | Any number of style rules from utility functions, or plain class name strings. |

### Return type

```ts
interface DynamicResult {
  className: string
  style: Record<string, string>
}
```

| Field | Type | Description |
|-------|------|-------------|
| `className` | `string` | A space-separated string of generated CSS class names. |
| `style` | `Record<string, string>` | An object of CSS custom property assignments to apply as inline styles. |

### How it works

Works exactly like `cx()` for static rules, but also collects `dynamicBindings` from any rule that references a `DynamicValue`. The returned `style` object maps CSS custom properties to their current values and must be spread onto the element's `style` attribute so the generated `var()` references resolve correctly.

Use `dcx` instead of `cx` whenever at least one of your style rules was built with `dynamic()`.

### Examples

#### Dynamic background color

```ts
import { dcx, bg, p, dynamic } from 'typewritingclass'

const userColor = dynamic('#e11d48')
const { className, style } = dcx(p(4), bg(userColor))
// className => "_a1b2c _d3e4f"
// style     => { '--twc-d0': '#e11d48' }

// In React JSX:
// <div className={className} style={style} />
// CSS: ._d3e4f { background-color: var(--twc-d0); }
// Inline: style="--twc-d0: #e11d48;"
```

#### Mixing static and dynamic rules

```ts
import { dcx, p, bg, rounded, dynamic } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const radius = dynamic('12px')
const { className, style } = dcx(p(4), bg(blue[500]), rounded(radius))
// className => "_a1b2c _d3e4f _g5h6i"
// style     => { '--twc-d0': '12px' }
// CSS: ._g5h6i { border-radius: var(--twc-d0); }
```

#### No dynamic values -- style is an empty object

```ts
import { dcx, p } from 'typewritingclass'

const { className, style } = dcx(p(4))
// className => "_a1b2c"
// style     => {}
```

#### React component with dynamic props

```ts
import { dcx, bg, p, dynamic } from 'typewritingclass'

function Banner({ color }: { color: string }) {
  const { className, style } = dcx(p(4), bg(dynamic(color)))
  return <div className={className} style={style} />
}
```

---

## when()

Creates a conditional style applicator by composing one or more modifiers. This is the function you use to apply pseudo-states, responsive breakpoints, and color scheme conditions.

### Signature

```ts
function when(...modifiers: Modifier[]): (...rules: StyleRule[]) => StyleRule
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `...modifiers` | `Modifier[]` | One or more modifier functions (e.g. `hover`, `md`, `dark`) applied right-to-left around the inner rules. |

### Return type

`(...rules: StyleRule[]) => StyleRule` -- A function that accepts style rules and returns a single modifier-wrapped `StyleRule`.

### How it works

Returns a function that accepts style rules and wraps them with the given modifiers applied right-to-left (innermost modifier listed first). Multiple style rules passed to the returned function are merged into a single combined rule before modifiers are applied, so selectors and media queries are shared across all declarations.

### Examples

#### Single modifier -- hover state

```ts
import { cx, bg, when, hover } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

cx(when(hover)(bg(blue[600])))
// CSS: .cls:hover { background-color: #2563eb; }
```

#### Stacked modifiers -- hover at medium breakpoint

```ts
import { cx, bg, p, when, hover, md } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

cx(when(hover, md)(bg(blue[700]), p(8)))
// CSS:
//   @media (min-width: 768px) {
//     .cls:hover { background-color: #1d4ed8; padding: 2rem; }
//   }
```

#### Dark mode styling

```ts
import { cx, bg, textColor, when, dark } from 'typewritingclass'
import { slate, white } from 'typewritingclass/theme/colors'

cx(
  bg(white),
  textColor(slate[900]),
  when(dark)(bg(slate[900]), textColor(white)),
)
// CSS:
//   .cls1 { background-color: #ffffff; }
//   .cls2 { color: #0f172a; }
//   @media (prefers-color-scheme: dark) {
//     .cls3 { background-color: #0f172a; color: #ffffff; }
//   }
```

#### Multiple rules in a single when()

When you pass multiple rules to the returned function, they are merged into a single combined rule:

```ts
import { cx, p, bg, textColor, when, hover } from 'typewritingclass'

cx(when(hover)(p(8), bg('#1d4ed8'), textColor('#ffffff')))
// All three properties share the :hover selector in a single CSS rule
// CSS: .cls:hover { padding: 2rem; background-color: #1d4ed8; color: #ffffff; }
```

---

## css()

Creates a `StyleRule` from either a plain object of CSS declarations or a tagged template literal. Use this when you want to write raw CSS without reaching for a specific utility function.

### Signatures

#### Object overload

```ts
function css(declarations: Record<string, string>): StyleRule
```

#### Tagged template overload

```ts
function css(strings: TemplateStringsArray, ...values: (string | number | DynamicValue)[]): StyleRule
```

### Parameters (object overload)

| Parameter | Type | Description |
|-----------|------|-------------|
| `declarations` | `Record<string, string>` | A record mapping CSS property names to their values. |

### Parameters (tagged template overload)

| Parameter | Type | Description |
|-----------|------|-------------|
| `strings` | `TemplateStringsArray` | The static portions of the template literal (provided automatically). |
| `...values` | `(string \| number \| DynamicValue)[]` | Interpolated expressions -- strings, numbers, or `DynamicValue`s. |

### Return type

`StyleRule` -- A style rule containing the parsed declarations. If any interpolated value was created with `dynamic()`, the rule also includes `dynamicBindings`.

### Examples

#### Object form

```ts
import { cx, css } from 'typewritingclass'

cx(css({ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '1rem' }))
// CSS: display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
```

#### Tagged template with static values

```ts
import { cx, css } from 'typewritingclass'

cx(css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`)
// CSS: display: flex; align-items: center; gap: 0.5rem;
```

#### Tagged template with interpolated values

```ts
import { cx, css } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const size = '2rem'
cx(css`
  width: ${size};
  height: ${size};
  background-color: ${blue[500]};
`)
// CSS: width: 2rem; height: 2rem; background-color: #3b82f6;
```

#### Tagged template with dynamic values

```ts
import { dcx, css, dynamic } from 'typewritingclass'

const color = dynamic('#e11d48')
const { className, style } = dcx(css`
  background-color: ${color};
  padding: 1rem;
`)
// className => "_a1b2c"
// style     => { '--twc-d0': '#e11d48' }
// CSS: ._a1b2c { background-color: var(--twc-d0); padding: 1rem; }
```

### Notes

- In the tagged template form, each `prop: value;` pair is parsed by splitting on `;` and then on `:`. Every declaration must be terminated with a semicolon.
- Dynamic values in the tagged template are replaced with `var(--twc-dN)` references. Use `dcx()` to apply both the class name and the inline style bindings.
- The object form does not support dynamic values directly in the object. Use the tagged template form or individual utilities for dynamic values.

---

## dynamic()

Wraps a value so it becomes a runtime-dynamic CSS custom property. The returned `DynamicValue` can be passed to any utility that accepts dynamic values.

### Signature

```ts
function dynamic<T extends string | number>(value: T): DynamicValue<T>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `T extends string \| number` | The initial CSS value (e.g. a color hex string, a pixel value). |

### Return type

```ts
interface DynamicValue<T extends string | number = string | number> {
  _tag: 'DynamicValue'
  __value: T
  __id: string
}
```

| Field | Type | Description |
|-------|------|-------------|
| `_tag` | `'DynamicValue'` | Discriminant tag for runtime type checking. Always `'DynamicValue'`. |
| `__value` | `T` | The current runtime value (e.g. `'#e11d48'` or `16`). |
| `__id` | `string` | The generated CSS custom property name (e.g. `'--twc-d0'`). |

### How it works

Instead of baking the value directly into the generated CSS, a `DynamicValue` is replaced with a CSS custom property reference (`var(--twc-dN)`). The actual value is applied at runtime through an inline `style` attribute, allowing it to change without regenerating the stylesheet.

Each call to `dynamic()` allocates a new, globally unique custom property name (`--twc-d0`, `--twc-d1`, ...).

### Examples

#### Dynamic background color in React

```ts
import { dcx, bg, p, dynamic } from 'typewritingclass'

function Banner({ color }: { color: string }) {
  const { className, style } = dcx(p(4), bg(dynamic(color)))
  return <div className={className} style={style} />
}
// CSS: ._xyz { background-color: var(--twc-d0); padding: 1rem; }
// Inline style: --twc-d0: <whatever `color` is at render time>
```

#### Dynamic spacing

```ts
import { dcx, p, dynamic } from 'typewritingclass'

const spacing = dynamic('2.5rem')
const { className, style } = dcx(p(spacing))
// className => "_a1b2c"
// style     => { '--twc-d0': '2.5rem' }
// CSS: ._a1b2c { padding: var(--twc-d0); }
```

#### Multiple dynamic values

```ts
import { dcx, bg, textColor, dynamic } from 'typewritingclass'

const bgColor = dynamic('#1e293b')
const fgColor = dynamic('#f8fafc')
const { className, style } = dcx(bg(bgColor), textColor(fgColor))
// style => { '--twc-d0': '#1e293b', '--twc-d1': '#f8fafc' }
```

### Notes

- Each `dynamic()` call produces a globally unique ID. Do not call `dynamic()` inside a render loop unless you intend to create a new binding each time.
- Dynamic values are only resolved at runtime when using `dcx()`. If you pass a `DynamicValue` to `cx()`, the CSS custom property reference is emitted but the inline style bindings are lost.

---

## isDynamic()

Type-guard that checks whether an unknown value is a `DynamicValue`.

### Signature

```ts
function isDynamic(v: unknown): v is DynamicValue
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `v` | `unknown` | Any value to test. |

### Return type

`boolean` -- `true` if `v` is a `DynamicValue`, narrowing its type accordingly.

### Examples

```ts
import { dynamic, isDynamic } from 'typewritingclass'

const val = dynamic('#ff0000')
isDynamic(val)       // => true
isDynamic('#ff0000') // => false
isDynamic(42)        // => false
isDynamic(null)      // => false
```

### Notes

- This is primarily useful when building custom utilities that need to handle both static and dynamic inputs.
- The check is based on the `_tag` property being `'DynamicValue'`.

---

## layer()

Assigns an explicit layer priority to style rules, overriding the automatic layer numbering.

### Signature

```ts
function layer(priority: number): (...rules: StyleRule[]) => StyleRule
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `priority` | `number` | The explicit layer number to assign. Higher numbers take higher priority (override lower). |

### Return type

`(...rules: StyleRule[]) => StyleRule` -- A function that accepts style rules and returns a combined `StyleRule` with the given layer priority.

### How it works

By default, rules receive auto-incremented layer numbers based on declaration order within a `cx()` or `dcx()` call. Use `layer()` to override this and force a rule to a specific priority level. Higher layer numbers always override lower ones, regardless of declaration order.

When multiple rules are passed, they are merged into a single combined rule before the layer is assigned.

### Examples

#### Force a reset to lowest priority

```ts
import { cx, layer, p, bg } from 'typewritingclass'

cx(layer(0)(bg('#ffffff')), p(4))
// bg('#ffffff') is forced to layer 0, p(4) gets auto-assigned layer 1
// p(4) overrides any conflicting property from bg('#ffffff')
```

#### Force an override to highest priority

```ts
import { cx, layer, p } from 'typewritingclass'

cx(p(4), layer(1000)(p(8)))
// p(8) at layer 1000 always overrides p(4) regardless of order
```

#### Base styles pattern

```ts
import { cx, layer, p, bg, rounded, textColor } from 'typewritingclass'

// Base styles at priority 0 -- easily overridden
const base = layer(0)(
  p(4),
  bg('#ffffff'),
  textColor('#111827'),
  rounded('0.25rem'),
)

// Component-specific overrides at default (auto) priority
cx(base, bg('#3b82f6'), textColor('#ffffff'))
// The blue background and white text override the base styles
```

### Notes

- Layer numbers can be any integer. Negative numbers are valid and place rules below the default starting point.
- The layer number is embedded into the generated class name hash, so the same declarations at different layer numbers produce different class names.

---

## createRule()

Low-level function to create a `StyleRule` from a set of CSS declarations.

### Signature

```ts
function createRule(declarations: Record<string, string>): StyleRule
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `declarations` | `Record<string, string>` | A record of CSS property-value pairs (e.g. `{ padding: '1rem' }`). |

### Return type

`StyleRule` -- A new style rule with the given declarations and empty `selectors` and `mediaQueries` arrays.

### Examples

```ts
import { createRule } from 'typewritingclass'

const rule = createRule({ padding: '1rem', margin: '0' })
// rule._tag         => 'StyleRule'
// rule.declarations => { padding: '1rem', margin: '0' }
// rule.selectors    => []
// rule.mediaQueries => []
```

### Notes

- This is primarily useful when building custom utilities. Most users should prefer the `css()` helper or the built-in utilities.
- The returned rule has no selectors, media queries, or dynamic bindings attached.

---

## createDynamicRule()

Low-level function to create a `StyleRule` that includes dynamic CSS custom property bindings.

### Signature

```ts
function createDynamicRule(
  declarations: Record<string, string>,
  dynamicBindings: Record<string, string>,
): StyleRule
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `declarations` | `Record<string, string>` | A record of CSS property-value pairs, where values may reference CSS custom properties (e.g. `{ color: 'var(--twc-d0)' }`). |
| `dynamicBindings` | `Record<string, string>` | A record mapping CSS custom property names to their runtime values (e.g. `{ '--twc-d0': '#ff0000' }`). |

### Return type

`StyleRule` -- A new style rule with declarations, empty selectors/mediaQueries, and the given `dynamicBindings`.

### Examples

```ts
import { createDynamicRule } from 'typewritingclass'

const rule = createDynamicRule(
  { color: 'var(--twc-d0)' },
  { '--twc-d0': '#ff0000' },
)
// rule.declarations    => { color: 'var(--twc-d0)' }
// rule.dynamicBindings => { '--twc-d0': '#ff0000' }
```

### Notes

- This is primarily useful when building custom utilities that support dynamic values. Most users should use `dynamic()` with built-in utilities instead.
- The `dynamicBindings` are collected by `dcx()` and applied as inline styles on the element.

---

## generateCSS()

Returns a complete CSS stylesheet string from all registered rules.

### Signature

```ts
function generateCSS(): string
```

### Parameters

None.

### Return type

`string` -- The full CSS string for all registered style rules, or an empty string if no rules have been registered.

### How it works

Rules are sorted by their layer number (ascending) so that later-declared utilities naturally override earlier ones in the cascade. Rules are separated by blank lines.

### Examples

```ts
import { cx, p, bg, generateCSS } from 'typewritingclass'

cx(p(4))
cx(bg('#3b82f6'))

const css = generateCSS()
// "._a1b2c {\n  padding: 1rem;\n}\n\n._d3e4f {\n  background-color: #3b82f6;\n}"
```

### Notes

- This function is primarily used by the compiler, SSR integration, and testing. In typical client-side usage, the runtime injection module manages CSS output automatically.
- The function returns a snapshot of all currently registered rules. Rules registered after the call are not included.

---

## Types

### StyleRule

The fundamental unit of the typewritingclass system. Every utility returns a `StyleRule`, and composing functions like `cx()` and `dcx()` consume them.

```ts
interface StyleRule {
  _tag: 'StyleRule'
  declarations: Record<string, string>
  selectors: string[]
  mediaQueries: string[]
  dynamicBindings?: Record<string, string>
}
```

| Field | Type | Description |
|-------|------|-------------|
| `_tag` | `'StyleRule'` | Discriminant tag. Always `'StyleRule'`. |
| `declarations` | `Record<string, string>` | CSS property-value pairs (e.g. `{ padding: '1rem' }`). |
| `selectors` | `string[]` | Pseudo-class selectors appended to the class name (e.g. `[':hover']`). Empty array means unconditional. |
| `mediaQueries` | `string[]` | Media query conditions wrapping the rule (e.g. `['(min-width: 768px)']`). Empty array means no `@media` wrapper. |
| `dynamicBindings` | `Record<string, string> \| undefined` | CSS custom property bindings for runtime values. Present only when `dynamic()` values are used. |

### DynamicResult

The return type of `dcx()`.

```ts
interface DynamicResult {
  className: string
  style: Record<string, string>
}
```

### DynamicValue

A wrapper around a runtime-changeable CSS value. Create instances with `dynamic()`.

```ts
interface DynamicValue<T extends string | number = string | number> {
  _tag: 'DynamicValue'
  __value: T
  __id: string
}
```

### Utility

A function that accepts a design-token value and returns a `StyleRule`. Every spacing, color, typography, and layout helper satisfies this type.

```ts
type Utility = (value: any) => StyleRule
```

### Modifier

A function that transforms a `StyleRule` by wrapping it with a pseudo-class selector or a media query. Modifiers are composable via `when()`.

```ts
type Modifier = (rule: StyleRule) => StyleRule
```

### Branded types

Branded types provide nominal typing on top of `string` to prevent accidental misuse. At runtime, branded types are indistinguishable from plain strings.

```ts
type Brand<T, B extends string> = T & { readonly [__brand]: B }

type CSSColor = Brand<string, 'css-color'>
type CSSLength = Brand<string, 'css-length'>
type CSSShadow = Brand<string, 'css-shadow'>
type CSSFontWeight = Brand<string, 'css-font-weight'>
```

### Input types

Input types define what values each category of utility function accepts:

```ts
type ColorInput = CSSColor | string | DynamicValue
type SpacingInput = number | CSSLength | string | DynamicValue
type SizeInput = number | CSSLength | string | DynamicValue
type RadiusInput = CSSLength | string | DynamicValue
type ShadowInput = CSSShadow | string | DynamicValue
```

| Type | Accepted values | Used by |
|------|----------------|---------|
| `ColorInput` | Theme color tokens, raw CSS color strings, `dynamic()` values | `bg()`, `textColor()`, `borderColor()` |
| `SpacingInput` | Theme scale numbers, raw CSS strings, theme length tokens, `dynamic()` values | `p()`, `m()`, `gap()` and variants |
| `SizeInput` | Theme scale numbers, raw CSS strings, theme size tokens, `dynamic()` values | `w()`, `h()`, `size()`, `minW()`, etc. |
| `RadiusInput` | Theme radius tokens, raw CSS strings, `dynamic()` values | `rounded()` and variants |
| `ShadowInput` | Theme shadow tokens, raw CSS strings, `dynamic()` values | `shadow()` |
