---
title: Group & Peer Modifiers
description: "Style elements based on parent or sibling state with group and peer modifiers."
sidebar:
  order: 12
---

Group and peer modifiers let you style child elements based on the state of a parent or sibling. This is essential for patterns like card hover effects, form validation feedback, and disclosure widgets.

## Group modifiers

Style a child element when a **parent** element is in a particular state. The parent needs the `group` class.

```ts
import { cx, bg, textColor, opacity, shadow, when } from 'typewritingclass'
import { groupHover, groupFocus, groupActive } from 'typewritingclass'
import { blue, slate } from 'typewritingclass/theme/colors'

// Parent card
const card = cx('group', bg(slate[50]))

// Child elements respond to parent hover
const title = cx(
  textColor(slate[900]),
  when(groupHover)(textColor(blue[600])),
)

const icon = cx(
  opacity(0.5),
  when(groupHover)(opacity(1)),
)
```

### Available group modifiers

| Modifier | Triggers when parent... |
|----------|------------------------|
| `groupHover` | is hovered |
| `groupFocus` | is focused |
| `groupActive` | is being pressed |
| `groupFocusVisible` | has keyboard focus |
| `groupFocusWithin` | or a descendant has focus |
| `groupDisabled` | is disabled |
| `groupChecked` | is checked |
| `groupEmpty` | has no children |
| `groupFirst` | is first child |
| `groupLast` | is last child |
| `groupOdd` | is an odd child |
| `groupEven` | is an even child |

## Peer modifiers

Style an element based on the state of a **preceding sibling**. The sibling needs the `peer` class.

```ts
import { cx, textColor, display, when } from 'typewritingclass'
import { peerInvalid, peerFocus, peerPlaceholderShown } from 'typewritingclass'
import { red, blue } from 'typewritingclass/theme/colors'

// Input (the peer)
const input = cx('peer')

// Error message appears when input is invalid
const errorMsg = cx(
  display('none'),
  textColor(red[500]),
  when(peerInvalid)(display('block')),
)

// Label highlights when input is focused
const label = cx(
  textColor(slate[600]),
  when(peerFocus)(textColor(blue[600])),
)
```

### Available peer modifiers

| Modifier | Triggers when sibling... |
|----------|--------------------------|
| `peerHover` | is hovered |
| `peerFocus` | is focused |
| `peerActive` | is being pressed |
| `peerFocusVisible` | has keyboard focus |
| `peerDisabled` | is disabled |
| `peerChecked` | is checked |
| `peerInvalid` | is invalid |
| `peerRequired` | is required |
| `peerPlaceholderShown` | has placeholder visible |

## Form validation example

```tsx
import { cx, p, border, borderColor, rounded, textColor, text, display, when } from 'typewritingclass'
import { peerInvalid, peerFocus, peerPlaceholderShown } from 'typewritingclass'
import { red, blue, slate, green } from 'typewritingclass/theme/colors'

function FormField() {
  return (
    <div>
      <input
        type="email"
        required
        placeholder="Email"
        className={cx(
          'peer',
          p(3), border('1px'), borderColor(slate[300]),
          rounded('0.375rem'),
          when(focus)(borderColor(blue[500])),
        )}
      />
      <p className={cx(
        display('none'),
        text('0.875rem'),
        textColor(red[500]),
        when(peerInvalid)(display('block')),
      )}>
        Please enter a valid email.
      </p>
    </div>
  )
}
```

## How it works

Group and peer modifiers use the `selectorTemplate` system internally. For example, `groupHover` generates a CSS selector like:

```css
.group:hover .generated-class { ... }
```

And `peerInvalid` generates:

```css
.peer:invalid ~ .generated-class { ... }
```

This means:
- Group modifiers require a parent with class `group`
- Peer modifiers require a preceding sibling with class `peer`
- The `~` combinator means peer targets **subsequent** siblings only
