---
title: Filters
description: "Apply CSS filter effects like blur, brightness, contrast, and grayscale."
sidebar:
  order: 7
---

typewritingclass provides utility functions for all CSS filter properties, including both element filters and backdrop filters.

## Element filters

Apply visual effects directly to an element:

```ts
import { cx, blur, brightness, contrast, grayscale, saturate, hueRotate, invert, sepia, dropShadow } from 'typewritingclass'

cx(blur('8px'))          // filter: blur(8px)
cx(brightness('150%'))   // filter: brightness(150%)
cx(contrast('125%'))     // filter: contrast(125%)
cx(grayscale('100%'))    // filter: grayscale(100%)
cx(saturate('200%'))     // filter: saturate(200%)
cx(hueRotate('90deg'))   // filter: hue-rotate(90deg)
cx(invert('100%'))       // filter: invert(100%)
cx(sepia('100%'))        // filter: sepia(100%)
cx(dropShadow('0 4px 3px rgb(0 0 0 / 0.07)'))  // filter: drop-shadow(...)
```

## Backdrop filters

Apply filter effects to the area behind an element -- useful for frosted glass effects:

```ts
import { cx, backdropBlur, backdropBrightness, backdropContrast, backdropGrayscale, backdropSaturate } from 'typewritingclass'

cx(backdropBlur('12px'))        // backdrop-filter: blur(12px)
cx(backdropBrightness('150%'))  // backdrop-filter: brightness(150%)
cx(backdropContrast('75%'))     // backdrop-filter: contrast(75%)
cx(backdropGrayscale('50%'))    // backdrop-filter: grayscale(50%)
cx(backdropSaturate('200%'))    // backdrop-filter: saturate(200%)
```

## Frosted glass example

```ts
import { cx, bg, backdropBlur, rounded, p, border, borderColor } from 'typewritingclass'

const frostedCard = cx(
  bg('rgb(255 255 255 / 0.1)'),
  backdropBlur('16px'),
  rounded('1rem'),
  p(6),
  border('1px'),
  borderColor('rgb(255 255 255 / 0.2)'),
)
```

## Available filter utilities

| Utility | CSS Property | Value |
|---------|-------------|-------|
| `blur` | `filter` | `blur(value)` |
| `brightness` | `filter` | `brightness(value)` |
| `contrast` | `filter` | `contrast(value)` |
| `dropShadow` | `filter` | `drop-shadow(value)` |
| `grayscale` | `filter` | `grayscale(value)` |
| `hueRotate` | `filter` | `hue-rotate(value)` |
| `invert` | `filter` | `invert(value)` |
| `saturate` | `filter` | `saturate(value)` |
| `sepia` | `filter` | `sepia(value)` |
| `backdropBlur` | `backdrop-filter` | `blur(value)` |
| `backdropBrightness` | `backdrop-filter` | `brightness(value)` |
| `backdropContrast` | `backdrop-filter` | `contrast(value)` |
| `backdropGrayscale` | `backdrop-filter` | `grayscale(value)` |
| `backdropHueRotate` | `backdrop-filter` | `hue-rotate(value)` |
| `backdropInvert` | `backdrop-filter` | `invert(value)` |
| `backdropOpacity` | `backdrop-filter` | `opacity(value)` |
| `backdropSaturate` | `backdrop-filter` | `saturate(value)` |
| `backdropSepia` | `backdrop-filter` | `sepia(value)` |
