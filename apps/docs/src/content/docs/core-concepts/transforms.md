---
title: Transforms
description: "Scale, rotate, translate, and skew elements with transform utilities."
sidebar:
  order: 8
---

Typewriting Class provides utilities for all CSS transform operations.

## Scale

```ts
import { cx, scale, scaleX, scaleY } from 'typewritingclass'

cx(scale(110))    // transform: scale(1.1)
cx(scale(75))     // transform: scale(0.75)
cx(scaleX(150))   // transform: scaleX(1.5)
cx(scaleY(50))    // transform: scaleY(0.5)
```

Numeric values are divided by 100 (e.g., `110` becomes `1.1`). Pass a string for raw values: `scale('1.5')`.

## Rotate

```ts
import { cx, rotate } from 'typewritingclass'

cx(rotate('45deg'))     // transform: rotate(45deg)
cx(rotate('-12deg'))    // transform: rotate(-12deg)
cx(rotate('0.25turn'))  // transform: rotate(0.25turn)
```

## Translate

```ts
import { cx, translateX, translateY } from 'typewritingclass'

cx(translateX('1rem'))    // transform: translateX(1rem)
cx(translateY('-50%'))    // transform: translateY(-50%)
cx(translateX('100%'))    // transform: translateX(100%)
```

## Skew

```ts
import { cx, skewX, skewY } from 'typewritingclass'

cx(skewX('6deg'))    // transform: skewX(6deg)
cx(skewY('-3deg'))   // transform: skewY(-3deg)
```

## Transform origin

```ts
import { cx, transformOrigin } from 'typewritingclass'

cx(transformOrigin('center'))       // transform-origin: center
cx(transformOrigin('top left'))     // transform-origin: top left
cx(transformOrigin('bottom right')) // transform-origin: bottom right
```

## Combining with transitions

Transforms pair naturally with transition utilities for hover effects:

```ts
import { cx, scale, transition, duration, when, hover } from 'typewritingclass'

const zoomCard = cx(
  transition(),
  duration(200),
  when(hover)(scale(105)),
)
```

## Available transform utilities

| Utility | CSS Property | Example |
|---------|-------------|---------|
| `scale` | `transform` | `scale(110)` -- `scale(1.1)` |
| `scaleX` | `transform` | `scaleX(150)` -- `scaleX(1.5)` |
| `scaleY` | `transform` | `scaleY(50)` -- `scaleY(0.5)` |
| `rotate` | `transform` | `rotate('45deg')` |
| `translateX` | `transform` | `translateX('1rem')` |
| `translateY` | `transform` | `translateY('-50%')` |
| `skewX` | `transform` | `skewX('6deg')` |
| `skewY` | `transform` | `skewY('-3deg')` |
| `transformOrigin` | `transform-origin` | `transformOrigin('center')` |
