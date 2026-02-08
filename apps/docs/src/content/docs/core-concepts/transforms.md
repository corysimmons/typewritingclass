---
title: Transforms
description: "Scale, rotate, translate, and skew elements."
sidebar:
  order: 8
---

```ts
import { tw } from 'typewritingclass'

tw.scale(110)              // transform: scale(1.1)
tw.rotate('45deg')         // transform: rotate(45deg)
tw.translateX('1rem')      // transform: translateX(1rem)
tw.translateY('-50%')      // transform: translateY(-50%)
tw.skewX('6deg')           // transform: skewX(6deg)
tw.transformOrigin('center')
```

## With transitions

```ts
const zoomCard = tw.transition().duration(200).hover.scale(105)
```

## Available utilities

| Utility | Example |
|---------|---------|
| `scale` | `scale(110)` -- `scale(1.1)` |
| `scaleX` / `scaleY` | `scaleX(150)` -- `scaleX(1.5)` |
| `rotate` | `rotate('45deg')` |
| `translateX` / `translateY` | `translateX('1rem')` |
| `skewX` / `skewY` | `skewX('6deg')` |
| `transformOrigin` | `transformOrigin('center')` |
