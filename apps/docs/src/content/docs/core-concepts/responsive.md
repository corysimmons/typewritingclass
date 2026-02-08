---
title: Responsive Design
description: "Mobile-first responsive styles with breakpoint modifiers."
sidebar:
  order: 4
---

typewritingclass uses a **mobile-first** approach to responsive design. Base styles apply at all screen sizes, and breakpoint modifiers layer on adjustments for progressively larger viewports. There are no special APIs to learn -- just `when()` with a breakpoint modifier.

## Mobile-first approach

Write your base styles first. These apply everywhere, from the smallest phone to the largest desktop:

```ts
import { cx, p, grid, gap } from 'typewritingclass'

cx(p(4), grid(1), gap(4))
// padding: 1rem; display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1rem
// This applies at ALL screen sizes
```

Then layer on breakpoint modifiers to adjust the layout as more screen space becomes available:

```ts
import { cx, p, grid, gap, when, sm, md, lg } from 'typewritingclass'

cx(
  p(4),
  grid(1),
  gap(4),
  when(sm)(p(6)),     // At 640px+: padding increases
  when(md)(grid(2)),  // At 768px+: two columns
  when(lg)(grid(3)),  // At 1024px+: three columns
)
```

---

## Available breakpoints

| Modifier | Min Width | Target Devices |
|----------|----------|----------------|
| `sm` | `640px` | Large phones (landscape), small tablets |
| `md` | `768px` | Tablets (portrait) |
| `lg` | `1024px` | Tablets (landscape), small laptops |
| `xl` | `1280px` | Laptops, desktops |
| `_2xl` | `1536px` | Large desktops, ultrawide |

Each breakpoint modifier wraps the rule in a `@media (min-width: ...)` query. Because they use `min-width`, styles "cascade up" -- a `sm` style applies at 640px and above unless overridden by a larger breakpoint.

```ts
import { cx, text, when, sm, md, lg, xl, _2xl } from 'typewritingclass'
import * as typography from 'typewritingclass/theme/typography'

cx(
  text(typography.sm),        // All screens: small text
  when(sm)(text(typography.base)),   // 640px+: base text
  when(md)(text(typography.lg)),     // 768px+: large text
  when(lg)(text(typography.xl)),     // 1024px+: extra large
  when(xl)(text(typography._2xl)),   // 1280px+: 2xl text
  when(_2xl)(text(typography._3xl)), // 1536px+: 3xl text
)
```

---

## Composing responsive with other modifiers

Breakpoint modifiers compose freely with pseudo-state modifiers using `when()`. When combined, both conditions must be met:

```ts
import { cx, bg, shadow, p, when, md, lg, hover, focus } from 'typewritingclass'
import { blue } from 'typewritingclass/theme/colors'
import * as shadows from 'typewritingclass/theme/shadows'

// Hover effect only at medium screens and above
cx(when(md, hover)(bg(blue[600])))
// @media (min-width: 768px) { ._abc:hover { background-color: #2563eb; } }

// Larger shadow on hover, but only on large screens
cx(when(lg, hover)(shadow(shadows.xl)))
// @media (min-width: 1024px) { ._abc:hover { box-shadow: ...; } }

// Focus ring only visible at md+
cx(when(md, focus)(ring()))
// @media (min-width: 768px) { ._abc:focus { box-shadow: 0 0 0 3px #3b82f6; } }
```

You can also combine responsive + dark mode:

```ts
import { cx, bg, p, when, md, dark } from 'typewritingclass'
import { slate } from 'typewritingclass/theme/colors'

cx(
  p(4),
  when(md)(p(8)),
  when(dark)(bg(slate[900])),
  when(md, dark)(bg(slate[800])),
  // At md+ in dark mode, use a slightly lighter dark background
)
```

---

## Real-world examples

### Responsive navigation

A navigation bar that stacks vertically on mobile and goes horizontal on larger screens:

```tsx
import { cx, flex, flexCol, flexRow, items, justify, p, px, py, gap,
         w, h, bg, textColor, font, text, display, when, md, hover } from 'typewritingclass'
import { white, blue, slate } from 'typewritingclass/theme/colors'
import { semibold } from 'typewritingclass/theme/typography'
import * as typography from 'typewritingclass/theme/typography'

function Navbar() {
  return (
    <nav className={cx(
      flexCol(),
      gap(2),
      p(4),
      bg(white),

      // At md+, switch to horizontal layout
      when(md)(flexRow(), items('center'), justify('space-between'), px(8)),
    )}>
      <a href="/" className={cx(
        text(typography.lg),
        font(semibold),
        textColor(slate[900]),
      )}>
        Logo
      </a>
      <div className={cx(
        flexCol(),
        gap(1),
        when(md)(flexRow(), gap(6)),
      )}>
        <a href="/docs" className={cx(
          textColor(slate[600]),
          when(hover)(textColor(blue[600])),
        )}>Docs</a>
        <a href="/blog" className={cx(
          textColor(slate[600]),
          when(hover)(textColor(blue[600])),
        )}>Blog</a>
      </div>
    </nav>
  )
}
```

### Responsive card grid

A grid that adapts from 1 column on mobile to 3 columns on desktop:

```tsx
import { cx, grid, gap, p, bg, rounded, shadow, text, textColor,
         when, sm, md, lg } from 'typewritingclass'
import { white, slate } from 'typewritingclass/theme/colors'
import * as borders from 'typewritingclass/theme/borders'
import * as shadows from 'typewritingclass/theme/shadows'
import * as typography from 'typewritingclass/theme/typography'

function CardGrid({ cards }: { cards: { title: string; body: string }[] }) {
  return (
    <div className={cx(
      grid(1),
      gap(4),
      when(sm)(grid(2), gap(6)),
      when(lg)(grid(3), gap(8)),
    )}>
      {cards.map(card => (
        <div key={card.title} className={cx(
          p(4),
          bg(white),
          rounded(borders.lg),
          shadow(shadows.sm),

          // More breathing room on larger screens
          when(md)(p(6)),
          when(lg)(p(8)),
        )}>
          <h3 className={cx(
            text(typography.lg),
            textColor(slate[900]),
            when(md)(text(typography.xl)),
          )}>
            {card.title}
          </h3>
          <p className={cx(textColor(slate[600]))}>
            {card.body}
          </p>
        </div>
      ))}
    </div>
  )
}
```

### Responsive typography scale

Scale heading sizes across breakpoints for better readability:

```tsx
import { cx, text, font, textColor, leading, mb, when, md, lg } from 'typewritingclass'
import * as typography from 'typewritingclass/theme/typography'
import { slate } from 'typewritingclass/theme/colors'

function PageTitle({ children }: { children: string }) {
  return (
    <h1 className={cx(
      text(typography._2xl),
      font(typography.bold),
      textColor(slate[900]),
      leading('1.2'),
      mb(4),

      when(md)(text(typography._4xl), mb(6)),
      when(lg)(text(typography._5xl), mb(8)),
    )}>
      {children}
    </h1>
  )
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className={cx(
      text(typography.xl),
      font(typography.semibold),
      textColor(slate[800]),
      mb(3),

      when(md)(text(typography._2xl), mb(4)),
      when(lg)(text(typography._3xl)),
    )}>
      {children}
    </h2>
  )
}
```

---

## Responsive hiding and showing

Control visibility at different breakpoints using the `display` utility:

```ts
import { cx, display, when, md, lg } from 'typewritingclass'

// Hidden on mobile, visible on tablet+
const tabletOnly = cx(display('none'), when(md)(display('block')))

// Visible on mobile, hidden on desktop
const mobileOnly = cx(display('block'), when(lg)(display('none')))

// Hidden everywhere except large screens
const desktopOnly = cx(display('none'), when(lg)(display('flex')))
```

---

## Generated CSS

To understand what CSS is produced, here is an expanded example:

```ts
import { cx, p, grid, gap, when, md, lg } from 'typewritingclass'

cx(
  p(4),
  grid(1),
  gap(4),
  when(md)(grid(2), p(6)),
  when(lg)(grid(3), p(8)),
)
```

Generated CSS:

```css
@layer l0 { ._a { padding: 1rem; } }
@layer l1 { ._b { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); } }
@layer l2 { ._c { gap: 1rem; } }
@layer l3 {
  @media (min-width: 768px) {
    ._d {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 1.5rem;
    }
  }
}
@layer l4 {
  @media (min-width: 1024px) {
    ._e {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      padding: 2rem;
    }
  }
}
```

Layer ordering ensures that `lg` styles override `md` styles, which override base styles. No `!important`, no specificity hacks -- just ordered layers.
