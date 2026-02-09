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

const card = tw.group.bg('slate-50').rounded('lg').p(4)
const title = tw.textColor('slate-900').groupHover.textColor('blue-600')
const icon = tw.opacity(0.5).groupHover.opacity(1)
```

**Available:** `groupHover`, `groupFocus`, `groupActive`, `groupFocusVisible`, `groupFocusWithin`, `groupDisabled`, `groupChecked`, `groupEmpty`, `groupFirst`, `groupLast`, `groupOdd`, `groupEven`, `groupOpen`, `groupVisited`, `groupHas`

## Peer modifiers

Style elements based on a preceding sibling's state. The sibling needs the `peer` class.

```ts
const input = tw.peer.p(3).border(1).rounded('md')
const errorMsg = tw.display('none').textColor('red-500').peerInvalid.display('block')
const label = tw.textColor('slate-600').peerFocus.textColor('blue-600')
```

**Available:** `peerHover`, `peerFocus`, `peerActive`, `peerFocusVisible`, `peerDisabled`, `peerChecked`, `peerInvalid`, `peerRequired`, `peerPlaceholderShown`, `peerFocusWithin`, `peerEmpty`, `peerFirst`, `peerLast`, `peerOdd`, `peerEven`, `peerOpen`, `peerVisited`, `peerHas`
