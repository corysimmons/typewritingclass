---
title: "Higher-Order Patterns"
description: "Factory functions, utility generators, and composable HOF patterns."
sidebar:
  order: 5
---

Because utilities are functions and composition is just function calls, higher-order functions (HOFs) become natural tools for eliminating duplication.

## Utility factories

Write one factory, stamp out a family of utilities:

```ts
import { createRule } from 'typewritingclass/rule'

function spacingProp(property: string) {
  return (value: number | string) => {
    const resolved = typeof value === 'number' ? `${value * 0.25}rem` : value
    return createRule({ [property]: resolved })
  }
}

export const scrollPt = spacingProp('scroll-padding-top')
export const scrollPb = spacingProp('scroll-padding-bottom')
export const scrollMt = spacingProp('scroll-margin-top')
```

### Color property factory

Dynamic-aware, accepts theme tokens:

```ts
import { createRule, createDynamicRule } from 'typewritingclass/rule'
import { isDynamic } from 'typewritingclass'

function colorProp(property: string) {
  return (color: string | DynamicValue) => {
    if (isDynamic(color)) {
      return createDynamicRule(
        { [property]: `var(${color.__id})` },
        { [color.__id]: String(color.__value) },
      )
    }
    return createRule({ [property]: String(color) })
  }
}

export const caretColor = colorProp('caret-color')
export const accentColor = colorProp('accent-color')
export const outlineColor = colorProp('outline-color')
```

## Modifier wrappers

### `interactive()` -- state machine in one call

```ts
import { when, hover, focus, active, disabled } from 'typewritingclass'

interface InteractiveStates {
  base: StyleRule
  hover?: StyleRule
  focus?: StyleRule
  active?: StyleRule
  disabled?: StyleRule
}

export function interactive(states: InteractiveStates): StyleRule[] {
  const rules: StyleRule[] = [states.base]
  if (states.hover) rules.push(when(hover)(states.hover))
  if (states.focus) rules.push(when(focus)(states.focus))
  if (states.active) rules.push(when(active)(states.active))
  if (states.disabled) rules.push(when(disabled)(states.disabled))
  return rules
}

// Usage:
cx(...interactive({
  base: bg('blue-500'),
  hover: bg('blue-600'),
  focus: ring(2),
  disabled: opacity(0.5),
}))
```

## Responsive factory

Auto-generate breakpoint variants from a value map:

```ts
import { when, sm, md, lg, xl } from 'typewritingclass'

const breakpoints = { sm, md, lg, xl } as const

export function responsive<T>(
  utility: (value: T) => StyleRule,
  values: Partial<Record<'base' | keyof typeof breakpoints, T>>,
): StyleRule[] {
  const rules: StyleRule[] = []
  if (values.base !== undefined) rules.push(utility(values.base))
  for (const [bp, value] of Object.entries(values)) {
    if (bp !== 'base' && bp in breakpoints)
      rules.push(when(breakpoints[bp as keyof typeof breakpoints])(utility(value as T)))
  }
  return rules
}

// Usage:
cx(
  ...responsive(p, { base: 4, md: 6, lg: 8 }),
  ...responsive(gridCols, { base: 1, sm: 2, lg: 3 }),
)
```

## Theme-aware factory

Map semantic token names to utilities:

```ts
export function themed(tokens: Record<string, string>) {
  return {
    bgPrimary: () => bg(tokens.primary),
    bgDanger: () => bg(tokens.danger),
    textPrimary: () => textColor(tokens.primary),
  }
}

const t = themed({ primary: blue[500], danger: red[500] })
cx(t.bgPrimary(), t.textPrimary())
```

## Patterns summary

| Pattern | Purpose |
|---|---|
| `spacingProp(prop)` | Family of spacing utilities |
| `colorProp(prop)` | Family of color utilities with dynamic support |
| `interactive(states)` | Map state object to modifier composition |
| `responsive(utility, values)` | Breakpoint variants from a value map |
| `themed(tokens)` | Semantic utilities from token map |

All are plain TypeScript functions that work with the compiler, compose with `cx()` and `tw`, and can be published as npm packages.
