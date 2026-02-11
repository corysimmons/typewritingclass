---
title: Gradients
description: "Create CSS gradients with direction and color stop utilities."
sidebar:
  order: 10
---

## Basic gradient

```ts
import { tw } from 'typewritingclass'

// Property-access tokens
tw.bgGradient.toRight
  .gradientFrom.blue500
  .gradientTo.indigo600

// String lookups (equivalent)
tw.bgGradient.toRight
  .gradientFrom('blue-500')
  .gradientTo('indigo-600')
```

## Three-stop gradient

```ts
tw.bgGradient.toRight
  .gradientFrom.rose500
  .gradientVia.amber400
  .gradientTo.yellow300
```

## Direction

```ts
tw.bgGradient.toRight
tw.bgGradient.toBottom
tw.bgGradient.toBottomRight
tw.bgGradient('135deg')          // arbitrary angle
```

## Background utilities

```ts
tw.bgAttachment('fixed')
tw.bgClip('text')
tw.bgPosition('center')
tw.bgRepeat('no-repeat')
tw.bgSize('cover')
tw.bgImage('url(/hero.jpg)')
```
