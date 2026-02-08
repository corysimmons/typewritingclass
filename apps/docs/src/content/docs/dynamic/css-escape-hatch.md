---
title: "CSS Escape Hatch"
description: "Write raw CSS when you need properties without a utility."
sidebar:
  order: 2
---

Typewriting Class ships with utility functions for the most common CSS properties -- `p()`, `bg()`, `rounded()`, `flex()`, and many more. But CSS has hundreds of properties, and you will inevitably need one that doesn't have a built-in utility. The `css()` function is the escape hatch: it lets you write raw CSS declarations and get back a `StyleRule` that composes with everything else in the system.

## Two forms

`css()` supports two calling conventions:

1. **Object form** -- pass a record of property-value pairs.
2. **Tagged template form** -- use a tagged template literal with `prop: value;` pairs.

Both return a `StyleRule`, so you can pass them to `cx()`, `dcx()`, `when()`, and any modifier just like a utility-generated rule.

## Object form

Pass a plain object where keys are CSS property names and values are CSS value strings:

```ts
import { cx, css } from 'typewritingclass'

const className = cx(
  css({ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '1rem' })
)
```

Generated CSS:

```css
._a1b2c {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
```

### Multiple properties

You can include as many properties as you need:

```ts
css({
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  'flex-wrap': 'wrap',
  gap: '0.5rem',
})
```

### Mixing with utilities

The object form returns a `StyleRule`, so it composes naturally with other utilities via `cx()`:

```ts
import { cx, css, p, bg, rounded } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

const card = cx(
  p(6),
  bg(white),
  rounded('lg'),
  css({
    'box-shadow': '0 1px 3px rgba(0,0,0,0.12)',
    'transition': 'box-shadow 0.2s ease',
  }),
)
```

## Tagged template form

For a more natural CSS-like syntax, use `css` as a tagged template literal. Write `property: value;` pairs separated by semicolons:

```ts
import { cx, css } from 'typewritingclass'

const className = cx(
  css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `
)
```

Generated CSS:

```css
._d3e4f {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
```

### Interpolation with static values

You can interpolate plain strings and numbers into the template:

```ts
import { cx, css } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const size = '2rem'
const columns = 3

const className = cx(
  css`
    width: ${size};
    height: ${size};
    background-color: ${blue[500]};
    grid-template-columns: repeat(${columns}, 1fr);
  `
)
```

Generated CSS:

```css
._g5h6i {
  width: 2rem;
  height: 2rem;
  background-color: #3b82f6;
  grid-template-columns: repeat(3, 1fr);
}
```

Interpolated values are inlined directly into the CSS string -- they behave exactly as if you had typed the value out.

### Interpolation with dynamic values

The tagged template form also supports `DynamicValue` interpolations. When the compiler encounters a `dynamic()` value inside a template, it replaces it with a `var()` reference and adds the binding to the rule's `dynamicBindings`:

```ts
import { dcx, css, dynamic } from 'typewritingclass'

const color = dynamic('#e11d48')

const { className, style } = dcx(
  css`
    background-color: ${color};
    padding: 1rem;
  `
)
// className => "_a1b2c"
// style     => { '--twc-d0': '#e11d48' }
```

Generated CSS:

```css
._a1b2c {
  background-color: var(--twc-d0);
  padding: 1rem;
}
```

The `padding` declaration is static and baked into the class. The `background-color` references a CSS custom property that is set through the inline style.

### Mixing static and dynamic interpolations

You can freely mix static strings, numbers, and `DynamicValue` objects in a single template:

```ts
import { dcx, css, dynamic } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'

const userWidth = dynamic('300px')

const { className, style } = dcx(
  css`
    background-color: ${blue[500]};
    width: ${userWidth};
    border-radius: 0.5rem;
  `
)
// style => { '--twc-d0': '300px' }
// CSS: background-color: #3b82f6; width: var(--twc-d0); border-radius: 0.5rem;
```

## Composing with modifiers

`css()` rules compose with `when()` and modifiers exactly like utility-generated rules:

```ts
import { cx, css, when, hover, md } from 'typewritingclass'

const className = cx(
  css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  `,
  when(md)(
    css({ 'grid-template-columns': '1fr 1fr' })
  ),
  when(hover)(
    css`box-shadow: 0 4px 12px rgba(0,0,0,0.15);`
  ),
)
```

Generated CSS:

```css
._a1b { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 768px) { ._c2d { grid-template-columns: 1fr 1fr; } }
._e3f:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
```

## When to use `css()`

Use `css()` when:

- **No utility exists** for the CSS property you need (`grid-template-areas`, `clip-path`, `transform`, `animation`, etc.).
- **You want shorthand properties** that don't have a dedicated utility (e.g., `transition: all 0.2s ease`).
- **You need vendor prefixes** or non-standard properties.
- **You're prototyping** and want to write CSS quickly before creating a proper utility.

Prefer built-in utilities when available, because they:

- Accept theme tokens and spacing scale numbers.
- Provide TypeScript autocompletion and type checking.
- Produce shorter, more readable code.

### Example: prefer utilities

```ts
// Prefer this:
import { cx, p, bg, rounded } from 'typewritingclass'
const card = cx(p(6), bg('#fff'), rounded('lg'))

// Over this:
import { cx, css } from 'typewritingclass'
const card = cx(css`padding: 1.5rem; background-color: #fff; border-radius: 0.5rem;`)
```

### Example: use `css()` for the gaps

```ts
import { cx, p, bg, rounded, css } from 'typewritingclass'

const card = cx(
  p(6),
  bg('#fff'),
  rounded('lg'),
  css({
    'box-shadow': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
    'transition': 'transform 0.15s ease, box-shadow 0.15s ease',
  }),
)
```

Here, padding, background, and border-radius use utilities for type safety and theme integration, while box-shadow and transition use `css()` because they have no built-in utility.

## Object form vs. tagged template form

| | Object form | Tagged template |
|---|---|---|
| Syntax | `css({ prop: 'value' })` | `` css`prop: value;` `` |
| Dynamic values | Not supported directly | Supports `${dynamic(val)}` interpolation |
| Multiple properties | Natural with object syntax | Requires semicolons between pairs |
| TypeScript autocompletion | Keys are plain strings | No autocompletion inside template |
| Best for | Programmatic construction | Writing CSS that looks like CSS |

If you need dynamic interpolation inside `css()`, use the tagged template form. If you are building declarations programmatically (e.g., in a utility function), use the object form.

## Full example: custom grid layout

```tsx
import { cx, css, p, gap, bg, rounded, when, md, lg } from 'typewritingclass'
import { white } from 'typewritingclass/theme/colors'

function Dashboard() {
  const layout = cx(
    css`
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas:
        "header"
        "sidebar"
        "main"
        "footer";
    `,
    when(md)(
      css`
        grid-template-columns: 250px 1fr;
        grid-template-areas:
          "header header"
          "sidebar main"
          "footer footer";
      `
    ),
    when(lg)(
      css`
        grid-template-columns: 300px 1fr 200px;
        grid-template-areas:
          "header header header"
          "sidebar main aside"
          "footer footer footer";
      `
    ),
    gap(4),
    p(4),
  )

  return (
    <div className={layout}>
      <header className={cx(css`grid-area: header;`, p(4), bg(white))}>
        Header
      </header>
      <aside className={cx(css`grid-area: sidebar;`, p(4))}>
        Sidebar
      </aside>
      <main className={cx(css`grid-area: main;`, p(4))}>
        Content
      </main>
      <footer className={cx(css`grid-area: footer;`, p(4))}>
        Footer
      </footer>
    </div>
  )
}
```

This example uses `css()` for `grid-template-columns`, `grid-template-areas`, and `grid-area` -- properties that do not have built-in utilities -- while using `p()`, `gap()`, and `bg()` for everything else.
