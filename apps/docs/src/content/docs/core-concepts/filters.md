---
title: Filters
description: "Apply CSS filter effects like blur, brightness, and grayscale."
sidebar:
  order: 7
---

## Element filters

```ts
import { tw } from 'typewritingclass'

tw.blur('8px')
tw.brightness('150%')
tw.contrast('125%')
tw.grayscale('100%')
tw.saturate('200%')
tw.hueRotate('90deg')
tw.dropShadow('0 4px 3px rgb(0 0 0 / 0.07)')
```

## Backdrop filters

For frosted glass effects:

```ts
tw.backdropBlur('12px')
tw.backdropBrightness('150%')
tw.backdropSaturate('200%')
```

## Frosted glass example

```ts
const frosted = tw
  .bg('rgb(255 255 255 / 0.1)')
  .backdropBlur('16px')
  .rounded.xl
  .p(6)
  .border('1px')
  .borderColor('rgb(255 255 255 / 0.2)')
```
