---
title: Modifiers with when()
description: "Apply conditional styles with hover, responsive, dark mode, and more."
sidebar:
  order: 3
---

`when()` is the functional modifier API. Most users will prefer the [tw chainable API](/core-concepts/tw/) where modifiers are functions (`tw.hover(tw.bg(...))`).

Use `when()` when working with `cx()` directly.

## Syntax

```ts
import { cx, bg, when, hover } from 'typewritingclass'

cx(when(hover)(bg.blue600))
// CSS: ._abc:hover { background-color: #2563eb; }
```

## Multiple rules

```ts
cx(when(hover)(bg.blue600, shadow.lg, textColor.white))
```

## Composing modifiers

```ts
cx(when(dark, hover)(bg.blue400))
// dark mode + hover: both conditions must be true
```

## Available modifiers

**Pseudo-states:** `hover`, `focus`, `active`, `disabled`, `focusVisible`, `focusWithin`, `firstChild`, `lastChild`

**Breakpoints:** `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `_2xl` (1536px)

**Color scheme:** `dark`

**Group/Peer:** `groupHover`, `groupFocus`, `peerFocus`, `peerInvalid`, and more

## Partial application

```ts
const onDarkHover = when(dark, hover)
cx(textColor.blue600, onDarkHover(textColor.blue300))
```
