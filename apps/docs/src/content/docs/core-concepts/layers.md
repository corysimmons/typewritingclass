---
title: Layer Ordering
description: "How Typewriting Class uses CSS @layer for deterministic specificity."
sidebar:
  order: 6
---

CSS specificity is one of the most common sources of frustration when building UIs. Typewriting Class eliminates the problem entirely by using **CSS `@layer`** to give every style rule a deterministic, predictable priority. Later arguments in `cx()` always override earlier ones -- no `!important`, no specificity wars, no source-order surprises.

## The problem

In traditional CSS, specificity is determined by selector weight. A class selector beats an element selector. An ID beats a class. And when specificity ties, source order wins -- whichever rule appears last in the stylesheet takes effect.

This causes real problems:

```css
/* Component A defines a button */
.btn { padding: 1rem; background: blue; }

/* Component B also sets padding */
.card .btn { padding: 0.5rem; }

/* Component C wants to override both -- but which wins? */
.btn-large { padding: 2rem; }
```

The answer depends on selector weight, file import order, bundler output order, and sometimes luck. This is why utility-first CSS frameworks exist: they flatten everything to single-class selectors so specificity is uniform. But even then, source order matters.

## The solution: @layer

Typewriting Class wraps every generated rule in a numbered CSS `@layer`. Each rule in a `cx()` call gets an auto-incremented layer number. Higher layer numbers have higher priority, regardless of selector specificity:

```ts
import { cx, p, bg } from 'typewritingclass'
import { blue, red } from 'typewritingclass/theme/colors'

cx(p(4), bg(blue[500]), bg(red[500]))
```

Generated CSS:

```css
@layer l0 { ._a { padding: 1rem; } }
@layer l1 { ._b { background-color: #3b82f6; } }
@layer l2 { ._c { background-color: #ef4444; } }
```

Layer `l2` beats `l1`, so `bg(red[500])` wins. Always. Regardless of where these rules appear in the final CSS file, regardless of selector specificity, regardless of bundler output order.

### How the cascade resolves

The CSS cascade evaluates `@layer` priority **before** selector specificity. This means:

1. A rule in `@layer l2` always beats a rule in `@layer l1`, even if the `l1` rule has a more specific selector.
2. Within the same layer, normal specificity and source order rules apply.
3. Rules outside any `@layer` beat all layered rules (but Typewriting Class puts everything in layers).

This gives you complete control: position in the `cx()` argument list is your specificity.

---

## Auto-incrementing layers

By default, `cx()` assigns layer numbers automatically. Each `StyleRule` argument gets the next available number from a global counter:

```ts
import { cx, p, m, bg, textColor, rounded } from 'typewritingclass'
import { blue, white, slate } from 'typewritingclass/theme/colors'

cx(
  p(4),            // Layer 0
  m(2),            // Layer 1
  bg(white),       // Layer 2
  textColor(slate[900]),  // Layer 3
  rounded(),       // Layer 4
)
```

String arguments are passed through without consuming a layer number:

```ts
cx('external-class', p(4), bg(white))
// 'external-class' -> no layer (plain string)
// p(4) -> Layer N
// bg(white) -> Layer N+1
```

---

## Override behavior in practice

The layer system makes overrides intuitive. Later arguments win:

```ts
import { cx, p } from 'typewritingclass'

// Base component styles
const base = [p(4)]

// Override in a specific context
cx(...base, p(8))
// p(4) at some layer N, p(8) at layer N+1
// p(8) wins -- padding is 2rem
```

This works for component composition patterns:

```ts
import { cx, p, bg, textColor, rounded } from 'typewritingclass'
import { white, blue, slate, red } from 'typewritingclass/theme/colors'

// Shared base styles
const cardBase = [p(4), bg(white), textColor(slate[900]), rounded()]

// Variant overrides -- later arguments override earlier ones
const defaultCard = cx(...cardBase)
const blueCard = cx(...cardBase, bg(blue[50]))
const dangerCard = cx(...cardBase, bg(red[50]), textColor(red[900]))
```

In `dangerCard`, `bg(red[50])` overrides `bg(white)` because it appears later and gets a higher layer number. The `p(4)` and `rounded()` from `cardBase` are unaffected since no later argument conflicts with them.

---

## Explicit control with layer()

Sometimes you need to override the automatic layer assignment. The `layer()` function lets you force a rule to a specific priority level:

```ts
import { cx, layer, p, bg, textColor } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'

cx(
  layer(0)(bg(white)),        // Force to lowest priority
  p(4),                        // Auto-assigned layer
  layer(1000)(textColor(slate[900])),  // Force to highest priority
)
```

### Use case: Reset / base styles

Force foundational styles to the lowest layer so everything else can override them:

```ts
import { cx, layer, p, m, bg, textColor, font, rounded, when, hover } from 'typewritingclass'
import { white, blue, slate } from 'typewritingclass/theme/colors'
import { normal } from 'typewritingclass/theme/typography'

// Base reset at layer 0 -- anything else overrides
const reset = layer(0)(
  p(0),
  m(0),
  bg(white),
  textColor(slate[900]),
  font(normal),
)

// Component styles at default auto-incrementing layers
cx(
  reset,
  p(4),
  rounded(),
  when(hover)(bg(blue[50])),
)
```

### Use case: Important overrides

Force critical overrides to a high layer so they always win:

```ts
import { cx, layer, display, opacity, pointerEvents } from 'typewritingclass'

// "Visually hidden" utility that must not be overridden accidentally
const srOnly = layer(9999)(
  display('block'),
  opacity(0),
  pointerEvents('none'),
)

// Even if other styles try to set display or opacity,
// srOnly at layer 9999 wins
cx(
  display('flex'),    // Auto-layer, much lower than 9999
  srOnly,             // Wins for display, opacity, pointer-events
)
```

### Use case: Component library defaults

Library authors can assign base styles to low layers, leaving room for consumer overrides:

```ts
import { cx, layer, p, bg, textColor, rounded, shadow } from 'typewritingclass'
import { white, blue, slate } from 'typewritingclass/theme/colors'
import * as borders from 'typewritingclass/theme/borders'

// Library component -- layer 100 leaves room below and above
const libraryCard = layer(100)(
  p(4),
  bg(white),
  textColor(slate[900]),
  rounded(borders.lg),
  shadow(),
)

// Consumer can override at default layers (which will be > 100)
// or use layer() for precise control
cx(libraryCard, bg(blue[50]))  // bg(blue[50]) at auto-layer > 100, wins
```

---

## Multiple rules in layer()

`layer()` accepts multiple rules and merges them into a single `StyleRule`, just like `when()`:

```ts
import { layer, p, bg, textColor, rounded } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'

const base = layer(0)(
  p(4),
  bg(white),
  textColor(slate[900]),
  rounded(),
)
// All four declarations share layer 0
```

---

## Visualizing layer ordering

Here is a diagram of how layers work in a typical component:

```
Layer 0    ──  Reset / base styles (via layer(0))
Layer 1    ──  p(4)
Layer 2    ──  bg(white)
Layer 3    ──  textColor(slate[900])
Layer 4    ──  rounded()
Layer 5    ──  when(hover)(bg(blue[50]))
Layer 6    ──  when(md)(p(8))
Layer 7    ──  when(dark)(bg(slate[900]))
  ...
Layer 1000 ──  Critical overrides (via layer(1000))
```

Each layer is a CSS `@layer` declaration. The cascade resolves conflicts by preferring higher-numbered layers. Within the same layer, standard CSS specificity and source order apply (but since Typewriting Class generates one class per rule, ties within a layer are rare).

---

## How this differs from Tailwind

Tailwind CSS uses a different approach to specificity:

| Aspect | Tailwind | Typewriting Class |
|--------|----------|------------------|
| Override mechanism | Source order in generated CSS | CSS `@layer` numbers |
| Composability | Last class in `class=""` string wins (if same specificity) | Last argument in `cx()` wins (guaranteed by layer) |
| Explicit control | `!important` modifier | `layer(n)` function |
| Predictability | Depends on stylesheet generation order | Deterministic -- layer number is based on declaration order |
| Conflicts | Can be surprising when classes from different components interact | Always resolved by argument position in `cx()` |

The key difference is **determinism**. In Tailwind, if two utility classes set the same property, the winner depends on which one appears later in the generated stylesheet -- which can change based on component import order, purge configuration, and bundler behavior. In Typewriting Class, the winner is always the one that appears later in the `cx()` call, because it gets a higher `@layer` number.

---

## Layer numbers and hashing

The layer number is part of the hash input for class name generation. This means the same `StyleRule` at different layers produces different class names:

```ts
import { cx, layer, p } from 'typewritingclass'

cx(p(4))            // Class "_abc" at auto-layer N
cx(layer(0)(p(4)))  // Class "_def" at layer 0
cx(layer(100)(p(4)))// Class "_ghi" at layer 100
```

This is intentional -- it ensures that rules at different priority levels never collide, even if their declarations are identical.

---

## Best practices

1. **Let auto-incrementing handle most cases.** The default behavior (later arguments win) is correct for the vast majority of use cases. You rarely need `layer()`.

2. **Use `layer(0)` for resets and base defaults.** If you have foundational styles that everything else should override, pin them to layer 0.

3. **Use `layer(n)` sparingly for libraries.** Component library authors can use moderate layer numbers (e.g., 100-500) to establish defaults that consumers can override at higher layers.

4. **Reserve high numbers for critical overrides.** If you need a style that must not be overridden, use a very high layer number like `layer(9999)`. But use this sparingly -- it is the `!important` of the layer system.

5. **Avoid gaps in auto-assigned layers.** The auto-increment counter is global. If you call `cx()` in module scope across many files, the layer numbers depend on import order. This is fine -- the relative ordering within a single `cx()` call is what matters for override behavior.
