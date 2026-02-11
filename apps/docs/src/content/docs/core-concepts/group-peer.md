---
title: Group & Peer Modifiers
description: "Style elements based on parent or sibling state."
sidebar:
  order: 12
---

## Group modifiers

Style child elements when a parent is hovered, focused, etc. The parent needs the `group` class.

```ts
import { tw } from 'typewritingclass'

const card = tw.group.bg.slate50.rounded.lg.p(4)
const title = tw.textColor.slate900.groupHover(tw.textColor.blue600)
const icon = tw.opacity(0.5).groupHover(tw.opacity(1))
```

**Available:** `groupHover`, `groupFocus`, `groupActive`, `groupFocusVisible`, `groupFocusWithin`, `groupDisabled`, `groupChecked`, `groupEmpty`, `groupFirst`, `groupLast`, `groupOdd`, `groupEven`, `groupOpen`, `groupVisited`, `groupHas`

## Peer modifiers

Style elements based on a preceding sibling's state. The sibling needs the `peer` class.

```ts
const input = tw.peer.p(3).border(1).rounded.md
const errorMsg = tw.display.none.textColor.red500.peerInvalid(tw.display.block)
const label = tw.textColor.slate600.peerFocus(tw.textColor.blue600)
```

**Available:** `peerHover`, `peerFocus`, `peerActive`, `peerFocusVisible`, `peerDisabled`, `peerChecked`, `peerInvalid`, `peerRequired`, `peerPlaceholderShown`, `peerFocusWithin`, `peerEmpty`, `peerFirst`, `peerLast`, `peerOdd`, `peerEven`, `peerOpen`, `peerVisited`, `peerHas`
