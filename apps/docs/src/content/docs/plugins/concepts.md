---
title: "Plugin Concepts"
description: "The two function signatures that power the entire typewritingclass ecosystem."
sidebar:
  order: 1
---

typewritingclass has no plugin registry, no configuration file, and no provider component. The entire system is built on two function signatures: **Utilities** and **Modifiers**. Every built-in function -- `p()`, `bg()`, `hover`, `md`, `dark` -- follows exactly the same pattern that your custom functions will follow.

## Philosophy

Traditional CSS frameworks have a concept of "plugins" that register themselves with a central configuration object. You modify a config file, restart your build, and hope the types align. typewritingclass takes a different approach:

- **No registration.** A utility is just a function that returns a `StyleRule`. Import it and use it.
- **No configuration.** There is no central config file. Functions accept their values directly.
- **No providers or context.** The system is plain functions in, class names out.
- **Type safety for free.** Since utilities are TypeScript functions, you get autocompletion, type checking, and refactoring support from your editor.

This means extending typewritingclass is the same as writing any TypeScript module: export functions from a file, import them where you need them.

## The two signatures

Everything in the typewritingclass ecosystem fits one of two shapes:

### Utility: `(value) => StyleRule`

A **utility** takes a value and returns a `StyleRule` containing one or more CSS declarations:

```ts
import type { Utility } from 'typewritingclass'

// This is the exact signature of `p`, `bg`, `rounded`, and every other utility:
type Utility = (value: any) => StyleRule
```

Examples of built-in utilities:

```ts
import { p, bg, textColor, rounded, opacity } from 'typewritingclass'

p(4)                   // => StyleRule { declarations: { padding: '1rem' } }
bg('#3b82f6')          // => StyleRule { declarations: { 'background-color': '#3b82f6' } }
textColor('#111827')   // => StyleRule { declarations: { color: '#111827' } }
rounded('lg')          // => StyleRule { declarations: { 'border-radius': '0.5rem' } }
opacity('0.5')         // => StyleRule { declarations: { opacity: '0.5' } }
```

A `StyleRule` is a simple data object:

```ts
interface StyleRule {
  _tag: 'StyleRule'
  declarations: Record<string, string>    // CSS property-value pairs
  selectors: string[]                     // e.g., [':hover'], [':focus']
  mediaQueries: string[]                  // e.g., ['(min-width: 768px)']
  dynamicBindings?: Record<string, string> // e.g., { '--twc-d0': '#ff0000' }
}
```

When you pass a `StyleRule` to `cx()`, the system hashes the declarations into a unique class name, registers the CSS, and returns the class string.

### Modifier: `(rule: StyleRule) => StyleRule`

A **modifier** takes a `StyleRule` and returns a new `StyleRule` with additional selectors or media queries:

```ts
import type { Modifier } from 'typewritingclass'

// This is the exact signature of `hover`, `focus`, `md`, `dark`, and every other modifier:
type Modifier = (rule: StyleRule) => StyleRule
```

Examples of built-in modifiers:

```ts
import { hover, focus, md, dark } from 'typewritingclass'
import { p, bg } from 'typewritingclass'

hover(bg('#2563eb'))
// => StyleRule {
//   declarations: { 'background-color': '#2563eb' },
//   selectors: [':hover'],
//   mediaQueries: [],
// }

md(p(8))
// => StyleRule {
//   declarations: { padding: '2rem' },
//   selectors: [],
//   mediaQueries: ['(min-width: 768px)'],
// }
```

A modifier does not change the declarations. It copies the rule and appends a selector or media query to the appropriate array.

## How they compose

Utilities and modifiers compose through `cx()` and `when()`:

```ts
import { cx, when, p, bg, hover, md } from 'typewritingclass'

const className = cx(
  p(4),                           // Utility: padding
  bg('#3b82f6'),                  // Utility: background
  when(hover)(bg('#2563eb')),     // Modifier(Utility): hover background
  when(md)(p(8)),                 // Modifier(Utility): responsive padding
  when(hover, md)(bg('#1d4ed8')), // Stacked modifiers: hover + responsive
)
```

`when()` accepts one or more modifiers and returns a function that accepts style rules. The modifiers are applied right-to-left, so `when(hover, md)` means "at the `md` breakpoint, on hover."

This composability is the core insight: because both utilities and modifiers operate on the same `StyleRule` data structure, they can be freely combined without any special glue code.

## Built-ins follow the same pattern

This is important to internalize: **there is nothing special about the built-in utilities and modifiers.** They are defined using the exact same primitives you will use to write your own.

Here is the actual source code of the built-in `hover` modifier:

```ts
import type { StyleRule, Modifier } from 'typewritingclass'
import { wrapWithSelector } from 'typewritingclass/rule'

export const hover: Modifier = (rule: StyleRule) =>
  wrapWithSelector(rule, ':hover')
```

And here is the actual source code of the built-in `bg` utility (simplified):

```ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

export function bg(color: string): StyleRule {
  return createRule({ 'background-color': color })
}
```

Your custom utilities and modifiers are first-class citizens. They have the same capabilities, the same performance characteristics, and the same composability as the built-ins.

## The building blocks

typewritingclass provides four low-level functions for constructing `StyleRule` objects:

| Function | Purpose |
|---|---|
| `createRule(declarations)` | Creates a static `StyleRule` from CSS property-value pairs |
| `createDynamicRule(declarations, bindings)` | Creates a `StyleRule` with dynamic CSS custom property bindings |
| `wrapWithSelector(rule, selector)` | Returns a copy of the rule with a CSS selector appended |
| `wrapWithMediaQuery(rule, query)` | Returns a copy of the rule wrapped in a media query |

These four functions are all you need to build any utility or modifier. The following pages walk through each in detail:

- [Writing Utilities](/plugins/writing-utilities/) -- creating custom utility functions with `createRule` and `createDynamicRule`.
- [Writing Modifiers](/plugins/writing-modifiers/) -- creating custom modifier functions with `wrapWithSelector` and `wrapWithMediaQuery`.
- [Recipes & Composites](/plugins/recipes/) -- composing multiple utilities and modifiers into reusable higher-level abstractions.

## No build step required

Because plugins are just functions, they work immediately. There is no registration, no build step, and no configuration change needed. Write a function, import it, pass it to `cx()`. The compiler handles everything else.

```ts
// my-utilities.ts
import type { StyleRule } from 'typewritingclass'
import { createRule } from 'typewritingclass/rule'

export function textShadow(value: string): StyleRule {
  return createRule({ 'text-shadow': value })
}

// App.tsx
import { cx, p } from 'typewritingclass'
import { textShadow } from './my-utilities'

const heading = cx(p(4), textShadow('2px 2px 4px rgba(0,0,0,0.3)'))
// Just works. No registration. No config. No restart.
```

## Sharing via npm

Since plugins are plain TypeScript modules, publishing them to npm is straightforward:

1. Create a package with your utility and modifier functions.
2. Export them from the package's entry point.
3. Publish to npm.
4. Consumers `bun add your-package` and import the functions.

No peer dependency on a specific typewritingclass version is needed beyond the `StyleRule` type, which is stable. See [Recipes & Composites](/plugins/recipes/) for patterns around packaging and distributing reusable style compositions.
