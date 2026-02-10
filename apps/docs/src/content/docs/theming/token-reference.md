---
title: Token Reference
description: Complete reference of all default theme token values.
sidebar:
  order: 3
---

All tokens are Tailwind CSS-compatible. Most can be accessed via property-access tokens (`tw.bg.blue500`) or string lookups (`tw.bg('blue-500')`) without importing.

## Colors

22 palettes, each with shades 50-950. Import: `import { blue } from 'typewritingclass/theme/colors'`

**Neutrals:** `slate`, `gray`, `zinc`, `neutral`, `stone`

**Colors:** `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

**Standalone:** `white` (`#ffffff`), `black` (`#000000`), `transparent`, `currentColor`

## Spacing

Each unit = `0.25rem`. Key values:

| Scale | Value | Scale | Value | Scale | Value |
|-------|-------|-------|-------|-------|-------|
| `0` | `0px` | `4` | `1rem` | `16` | `4rem` |
| `1` | `0.25rem` | `6` | `1.5rem` | `24` | `6rem` |
| `2` | `0.5rem` | `8` | `2rem` | `32` | `8rem` |
| `3` | `0.75rem` | `12` | `3rem` | `64` | `16rem` |

## Typography

| Text Size | Font Size | Line Height |
|-----------|-----------|-------------|
| `xs` | `0.75rem` | `1rem` |
| `sm` | `0.875rem` | `1.25rem` |
| `base` | `1rem` | `1.5rem` |
| `lg` | `1.125rem` | `1.75rem` |
| `xl` | `1.25rem` | `1.75rem` |
| `_2xl` | `1.5rem` | `2rem` |
| `_3xl` | `1.875rem` | `2.25rem` |
| `_4xl` | `2.25rem` | `2.5rem` |

Font weights: `thin` (100), `extralight` (200), `light` (300), `normal` (400), `medium` (500), `semibold` (600), `bold` (700), `extrabold` (800)

### Font Families

| Token | Stack |
|-------|-------|
| `sans` | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| `serif` | `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif` |
| `mono` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |

## Shadows

| Token | Description |
|-------|-------------|
| `sm` | Subtle |
| `DEFAULT` | Standard |
| `md` | Medium |
| `lg` | Pronounced |
| `xl` | Heavy |
| `_2xl` | Dramatic |
| `inner` | Inset |
| `none` | Removes shadow |

## Border Radius

| Token | Value |
|-------|-------|
| `none` | `0px` |
| `sm` | `0.125rem` |
| `DEFAULT` | `0.25rem` |
| `md` | `0.375rem` |
| `lg` | `0.5rem` |
| `xl` | `0.75rem` |
| `_2xl` | `1rem` |
| `_3xl` | `1.5rem` |
| `full` | `9999px` |

## Sizes

| Token | Value |
|-------|-------|
| `full` | `100%` |
| `screen` | `100vw` |
| `screenH` | `100vh` |
| `min` | `min-content` |
| `max` | `max-content` |
| `fit` | `fit-content` |
| `auto` | `auto` |
