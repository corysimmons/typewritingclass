---
title: Gradients
description: "Create CSS gradients with gradient direction and color stop utilities."
sidebar:
  order: 10
---

Typewriting Class provides a gradient system using CSS custom properties, matching Tailwind's `bg-gradient-to-*` + `from-*` + `via-*` + `to-*` pattern.

## Basic gradient

```ts
import { cx, bgGradient, gradientFrom, gradientTo } from 'typewritingclass'
import { blue, indigo } from 'typewritingclass/theme/colors'

cx(
  bgGradient('to right'),
  gradientFrom(blue[500]),
  gradientTo(indigo[600]),
)
// background-image: linear-gradient(to right, var(--twc-gradient-from), var(--twc-gradient-to))
```

## Three-stop gradient

Add a `via` color for three-stop gradients:

```ts
import { cx, bgGradient, gradientFrom, gradientVia, gradientTo } from 'typewritingclass'
import { rose, amber, yellow } from 'typewritingclass/theme/colors'

const sunset = cx(
  bgGradient('to right'),
  gradientFrom(rose[500]),
  gradientVia(amber[400]),
  gradientTo(yellow[300]),
)
```

## Direction

The `bgGradient` utility accepts any valid CSS gradient direction:

```ts
cx(bgGradient('to right'))        // left to right
cx(bgGradient('to left'))         // right to left
cx(bgGradient('to bottom'))       // top to bottom (default CSS direction)
cx(bgGradient('to top'))          // bottom to top
cx(bgGradient('to bottom right')) // diagonal
cx(bgGradient('135deg'))          // angle
```

## Example: gradient button

```tsx
import { cx, bgGradient, gradientFrom, gradientTo, textColor, px, py, rounded, font, transitionAll, duration, when, hover, opacity } from 'typewritingclass'
import { indigo, purple, white } from 'typewritingclass/theme/colors'
import { semibold } from 'typewritingclass/theme/typography'

const gradientButton = cx(
  px(6), py(3),
  rounded('0.5rem'),
  bgGradient('to right'),
  gradientFrom(indigo[500]),
  gradientTo(purple[600]),
  textColor(white),
  font(semibold),
  transitionAll(),
  duration(200),
  when(hover)(opacity(0.9)),
)
```

## Background utilities

Beyond gradients, Typewriting Class covers all background properties:

```ts
import { cx, bgAttachment, bgClip, bgOrigin, bgPosition, bgRepeat, bgSize, bgImage } from 'typewritingclass'

cx(bgAttachment('fixed'))           // background-attachment: fixed
cx(bgClip('text'))                  // background-clip: text
cx(bgOrigin('border-box'))          // background-origin: border-box
cx(bgPosition('center'))            // background-position: center
cx(bgRepeat('no-repeat'))           // background-repeat: no-repeat
cx(bgSize('cover'))                 // background-size: cover
cx(bgImage('url(/hero.jpg)'))       // background-image: url(/hero.jpg)
cx(bgImage('none'))                 // background-image: none
```
