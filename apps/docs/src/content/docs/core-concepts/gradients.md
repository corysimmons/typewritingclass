---
title: Gradients
description: "Create CSS gradients with direction and color stop utilities."
sidebar:
  order: 10
---

## Basic gradient

```ts
import { tw } from 'typewritingclass'

tw.bgGradient('to right').gradientFrom('blue-500').gradientTo('indigo-600')
```

## Three-stop gradient

```ts
tw.bgGradient('to right').gradientFrom('rose-500').gradientVia('amber-400').gradientTo('yellow-300')
```

## Direction

```ts
tw.bgGradient('to right')
tw.bgGradient('to bottom')
tw.bgGradient('to bottom right')
tw.bgGradient('135deg')
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
