---
title: Accessibility
description: "Screen reader utilities, forced colors, and ARIA/data attribute modifiers."
sidebar:
  order: 11
---

Typewriting Class includes utilities and modifiers for building accessible interfaces.

## Screen reader utilities

Hide elements visually while keeping them accessible to screen readers:

```ts
import { cx, srOnly, notSrOnly } from 'typewritingclass'

// Visually hidden, still readable by screen readers
cx(srOnly())
// position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
// overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;

// Undo sr-only (e.g., on focus)
cx(notSrOnly())
// Resets all the sr-only properties back to normal
```

### Skip link pattern

```tsx
import { cx, srOnly, notSrOnly, when, focus } from 'typewritingclass'

<a href="#main" className={cx(
  srOnly(),
  when(focus)(notSrOnly()),
)}>
  Skip to main content
</a>
```

## Forced color adjust

Control how elements render in forced colors mode (Windows High Contrast):

```ts
import { cx, forcedColorAdjust } from 'typewritingclass'

cx(forcedColorAdjust('auto'))  // forced-color-adjust: auto
cx(forcedColorAdjust('none'))  // forced-color-adjust: none
```

## ARIA attribute modifiers

Style elements based on their ARIA state:

```ts
import { cx, bg, textColor, when } from 'typewritingclass'
import { ariaExpanded, ariaChecked, ariaDisabled, ariaHidden, ariaPressed, ariaSelected, ariaRequired, ariaReadonly, aria } from 'typewritingclass'
import { blue, gray } from 'typewritingclass/theme/colors'

// Preset ARIA modifiers
cx(when(ariaExpanded)(bg(blue[50])))       // [aria-expanded="true"] { ... }
cx(when(ariaChecked)(bg(blue[500])))       // [aria-checked="true"] { ... }
cx(when(ariaDisabled)(opacity(0.5)))       // [aria-disabled="true"] { ... }
cx(when(ariaSelected)(bg(blue[100])))      // [aria-selected="true"] { ... }

// Custom ARIA attribute
cx(when(aria('busy'))(opacity(0.5)))       // [aria-busy] { ... }
cx(when(aria('current="page"'))(bg(blue[50])))  // [aria-current="page"] { ... }
```

## Data attribute modifiers

Style elements based on data attributes:

```ts
import { cx, bg, when } from 'typewritingclass'
import { data } from 'typewritingclass'
import { green, red } from 'typewritingclass/theme/colors'

cx(when(data('active'))(bg(green[100])))    // [data-active] { ... }
cx(when(data('state="error"'))(bg(red[100])))  // [data-state="error"] { ... }
```

## Media query modifiers

### Reduced motion

Respect user motion preferences:

```ts
import { cx, css, transition, duration, when } from 'typewritingclass'
import { motionReduce, motionSafe } from 'typewritingclass'

// Only animate for users who haven't requested reduced motion
cx(
  when(motionSafe)(transition(), duration(300)),
  when(motionReduce)(css({ transition: 'none' })),
)
```

### Forced colors

```ts
import { cx, css, border, when } from 'typewritingclass'
import { forcedColors } from 'typewritingclass'

cx(when(forcedColors)(border('2px'), css({ 'border-color': 'ButtonText' })))
```

### Contrast preferences

```ts
import { cx, border, shadow, when } from 'typewritingclass'
import { contrastMore, contrastLess } from 'typewritingclass'

cx(
  when(contrastMore)(border('2px'), shadow('none')),
  when(contrastLess)(opacity(0.8)),
)
```
