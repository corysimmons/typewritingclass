---
title: Accessibility
description: "Screen reader utilities, forced colors, and ARIA/data attribute modifiers."
sidebar:
  order: 11
---

## Screen reader utilities

```ts
tw.srOnly              // visually hidden, readable by screen readers
tw.srOnly.focus(tw.notSrOnly)  // visible on focus (skip link pattern)
```

## ARIA attribute modifiers

```ts
tw.ariaExpanded(tw.bg.blue50)          // [aria-expanded="true"]
tw.ariaChecked(tw.bg.blue500)          // [aria-checked="true"]
tw.ariaDisabled(tw.opacity(0.5))       // [aria-disabled="true"]
```

## Data attribute modifiers

```ts
// With cx()/when()
import { cx, bg, when, data } from 'typewritingclass'

cx(when(data('active'))(bg('green-100')))
cx(when(data('state="error"'))(bg('red-100')))
```

## Motion preferences

```ts
// With cx()/when()
import { cx, transition, duration, transitionNone, when, motionSafe, motionReduce } from 'typewritingclass'

cx(
  when(motionSafe)(transition(), duration(300)),
  when(motionReduce)(transitionNone()),
)
```

## Forced colors and contrast

```ts
import { cx, border, shadow, when, forcedColors, contrastMore } from 'typewritingclass'

cx(when(forcedColors)(border('2px')))
cx(when(contrastMore)(border('2px'), shadow('none')))
```
