---
title: Transitions & Animation
description: "Smooth property transitions and CSS animations."
sidebar:
  order: 9
---

## Transitions

Transition presets are value-less utilities — access them as properties:

```ts
import { tw } from 'typewritingclass'

tw.transitionColors.duration(200).hover(tw.bg.indigo600)
tw.transitionAll.duration(300).ease('ease-out')
tw.transitionOpacity.delay(150)
```

**Presets:** `transition`, `transitionAll`, `transitionColors`, `transitionOpacity`, `transitionShadow`, `transitionTransform`, `transitionNone`

## Animation

```ts
tw.animate('spin 1s linear infinite')
tw.animate('bounce 1s infinite')
```

## Hover transition example

```ts
const button = tw
  .px(5).py(2.5)
  .bg.indigo500
  .textColor.white
  .rounded.lg
  .transitionColors.duration(200)
  .hover(tw.bg.indigo600)
```
