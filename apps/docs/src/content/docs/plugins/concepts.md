---
title: "Plugin Concepts"
description: "The two function signatures that power the entire Typewriting Class ecosystem."
sidebar:
  order: 1
---

There is no plugin registry, no config file, no provider. The entire system is built on two function signatures: **Utilities** and **Modifiers**. Every built-in function follows the same pattern your custom functions will.

## The two signatures

### Utility: `(value) => StyleRule`

Takes a value, returns CSS declarations:

```ts
p(4)             // => { padding: '1rem' }
bg('#3b82f6')    // => { 'background-color': '#3b82f6' }
rounded('lg')    // => { 'border-radius': '0.5rem' }
```

### Modifier: `(rule: StyleRule) => StyleRule`

Takes a `StyleRule`, returns it wrapped with a selector or media query:

```ts
hover(bg('#2563eb'))  // adds :hover selector
md(p(8))              // adds @media (min-width: 768px)
```

## Building blocks

| Function | Purpose |
|---|---|
| `createRule(declarations)` | Create a static `StyleRule` from CSS property-value pairs |
| `createDynamicRule(declarations, bindings)` | Create a `StyleRule` with dynamic CSS custom property bindings |
| `wrapWithSelector(rule, selector)` | Copy the rule with a CSS selector appended |
| `wrapWithMediaQuery(rule, query)` | Copy the rule wrapped in a media query |
| `wrapWithSelectorTemplate(rule, template)` | Copy the rule with a complex selector pattern (`&` = generated class) |
| `wrapWithSupportsQuery(rule, query)` | Copy the rule wrapped in an `@supports` query |

These functions are all you need to build any utility or modifier.

## No registration needed

Write a function, import it, use it with `tw` or `cx()`. The compiler handles the rest:

```ts
// my-utilities.ts
import { createRule } from 'typewritingclass/rule'

export function textShadow(value: string) {
  return createRule({ 'text-shadow': value })
}

// App.tsx
import { tw } from 'typewritingclass'
import { textShadow } from './my-utilities'

// Use with cx()
cx(textShadow('2px 2px 4px rgba(0,0,0,0.3)'))
```

Custom utilities and modifiers are first-class citizens with the same capabilities as built-ins. See [Writing Utilities](/plugins/writing-utilities/) and [Writing Modifiers](/plugins/writing-modifiers/) for detailed guides.
