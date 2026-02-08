---
title: Transitions & Animation
description: "Smooth property transitions and CSS animations with duration, easing, and delay control."
sidebar:
  order: 9
---

typewritingclass provides utilities for CSS transitions and animations, making it easy to add smooth interactive effects.

## Transition presets

Use preset transition utilities for common property groups:

```ts
import { cx, transition, transitionAll, transitionColors, transitionOpacity, transitionShadow, transitionTransform, transitionNone } from 'typewritingclass'

cx(transition())           // transition-property: color, background-color, border-color, ...
cx(transitionAll())        // transition-property: all
cx(transitionColors())     // transition-property: color, background-color, border-color, ...
cx(transitionOpacity())    // transition-property: opacity
cx(transitionShadow())     // transition-property: box-shadow
cx(transitionTransform())  // transition-property: transform
cx(transitionNone())       // transition-property: none
```

All presets include default `duration` (150ms) and `timing-function` (cubic-bezier).

## Duration

```ts
import { cx, transitionColors, duration } from 'typewritingclass'

cx(transitionColors(), duration(75))    // 75ms
cx(transitionColors(), duration(150))   // 150ms
cx(transitionColors(), duration(300))   // 300ms
cx(transitionColors(), duration(500))   // 500ms
cx(transitionColors(), duration(1000))  // 1000ms
cx(transitionColors(), duration('2s'))  // 2s (string pass-through)
```

Numeric values automatically get `ms` appended.

## Timing function

```ts
import { cx, transition, ease } from 'typewritingclass'

cx(transition(), ease('linear'))                         // linear
cx(transition(), ease('ease-in'))                        // ease-in
cx(transition(), ease('ease-out'))                       // ease-out
cx(transition(), ease('ease-in-out'))                    // ease-in-out
cx(transition(), ease('cubic-bezier(0.4, 0, 0.2, 1)'))  // custom bezier
```

## Delay

```ts
import { cx, transitionAll, delay } from 'typewritingclass'

cx(transitionAll(), delay(75))    // transition-delay: 75ms
cx(transitionAll(), delay(150))   // transition-delay: 150ms
cx(transitionAll(), delay(300))   // transition-delay: 300ms
```

## Animation

```ts
import { cx, animate } from 'typewritingclass'

cx(animate('spin 1s linear infinite'))    // animation: spin 1s linear infinite
cx(animate('ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'))
cx(animate('bounce 1s infinite'))
cx(animate('none'))                        // animation: none
```

Pre-built animation keyframes are available from the theme:

```ts
import { spin, ping, pulse, bounce, keyframes } from 'typewritingclass/theme/animations'

cx(animate(spin))    // spin animation
cx(animate(pulse))   // pulse animation
cx(animate(bounce))  // bounce animation
```

## Hover transition example

```tsx
import { cx, bg, textColor, transitionColors, duration, rounded, px, py, when, hover } from 'typewritingclass'
import { indigo, white } from 'typewritingclass/theme/colors'

const button = cx(
  px(5), py(2.5),
  rounded('0.5rem'),
  bg(indigo[500]),
  textColor(white),
  transitionColors(),
  duration(200),
  when(hover)(bg(indigo[600])),
)
```
