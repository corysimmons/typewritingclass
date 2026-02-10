# Typewriting Class

Core library for the Typewriting Class CSS-in-TS framework. Provides utility functions, modifiers, theme tokens, and the composition API.

## Installation

```bash
pnpm add typewritingclass
```

## Usage

### Chainable API (recommended)

```ts
import { tw } from 'typewritingclass'

const card = tw
  .bg.white.rounded.lg.p(6).flex.gap(4)
  .hover(tw.bg('blue-50'))
  .md.p(8)
  .dark(tw.bg('slate-800'))
```

### Property-access tokens

Design tokens are accessed via property names — no strings needed:

```ts
tw.bg.blue500            // background-color: #3b82f6
tw.textColor.slate900    // color: #0f172a
tw.rounded.lg            // border-radius: 0.5rem
tw.shadow.md             // box-shadow: ...
tw.text.lg               // font-size: 1.125rem; line-height: 1.75rem
tw.font.bold             // font-weight: 700
tw.items.center          // align-items: center
tw.justify.between       // justify-content: space-between
tw.cursor.pointer        // cursor: pointer
```

Color tokens support opacity via callable syntax:

```ts
tw.bg.blue500(50)        // background-color: rgb(59 130 246 / 0.5)
```

### Individual imports with property-access tokens

```ts
import { cx, bg, rounded, p, when, hover } from 'typewritingclass'

cx(bg.blue500, rounded.lg, p(4))

// With opacity
cx(bg.blue500(25), rounded.lg, p(4))
```

### Arbitrary / custom values

Pass any CSS value as a string argument:

```ts
tw.bg('white').rounded('lg').p(6).shadow('md')
```

### Individual imports (functional style)

```ts
import { cx, p, bg, textColor, rounded, flex, gap, when } from 'typewritingclass'
import { hover, md, dark } from 'typewritingclass'
import { blue, white, slate } from 'typewritingclass/theme/colors'

const card = cx(
  p(6), bg(white), rounded('lg'),
  flex(), gap(4),
  when(hover)(bg(blue[50])),
  when(md)(p(8)),
  when(dark)(bg(slate[800])),
)
```

## API

### Chainable builder

- **`tw`** — proxy-based chainable API with access to all utilities and modifiers via a single import
  - Property-access tokens: `tw.bg.blue500`, `tw.rounded.lg`, `tw.font.bold`
  - Property syntax for modifiers: `tw.hover.bg.blue500`
  - Function syntax for multi-utility modifiers: `tw.hover(tw.bg.blue500.textColor.white)`
  - Value-less utilities as properties: `tw.flex.flexCol.relative`
  - Arbitrary values: `tw.bg('custom-color').p(6)`
  - Resolves to class string via `.toString()`, `.value`, `.className`, or template literals

### Composition

- **`cx(...rules)`** — compose utilities into a single class name
- **`when(...modifiers)(...rules)`** — apply styles conditionally

### Utilities

| Category | Functions |
|---|---|
| Spacing | `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`, `gap`, `gapX`, `gapY` |
| Colors | `bg`, `textColor`, `borderColor` |
| Typography | `text`, `font`, `tracking`, `leading`, `textAlign` |
| Layout | `flex`, `flexCol`, `flexRow`, `grid`, `gridCols`, `gridRows`, `display`, `items`, `justify`, `self` |
| Sizing | `w`, `h`, `size`, `minW`, `minH`, `maxW`, `maxH` |
| Position | `relative`, `absolute`, `fixed`, `sticky`, `top`, `right`, `bottom`, `left`, `inset`, `z` |
| Borders | `rounded`, `roundedT`, `roundedB`, `roundedL`, `roundedR`, `border`, `borderT`, `borderR`, `borderB`, `borderL`, `ring` |
| Effects | `shadow`, `opacity`, `backdrop` |
| Interactivity | `cursor`, `select`, `pointerEvents` |
| Overflow | `overflow`, `overflowX`, `overflowY` |

### Modifiers

| Type | Modifiers |
|---|---|
| Pseudo-classes | `hover`, `focus`, `active`, `disabled`, `focusVisible`, `focusWithin`, `firstChild`, `lastChild` |
| Responsive | `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `_2xl` (1536px) |
| Color scheme | `dark` |

### Theme tokens

```ts
import { blue, slate } from 'typewritingclass/theme/colors'
import { bold, lg } from 'typewritingclass/theme/typography'
import { md } from 'typewritingclass/theme/shadows'
import { lg as lgRadius } from 'typewritingclass/theme/borders'
```

### Custom themes

```ts
import { createTheme } from 'typewritingclass/theme/createTheme'

const theme = createTheme({
  colors: { brand: { 500: '#6366f1' } },
})
```

### Dynamic values

```ts
import { dcx, bg, p, dynamic } from 'typewritingclass'

// Wrap a runtime value with dynamic(), then compose via dcx()
const { className, style } = dcx(p(4), bg(dynamic(userColor)))
```

## Exports

| Path | Contents |
|---|---|
| `typewritingclass` | Core API (`cx`, `when`, all utilities and modifiers) |
| `typewritingclass/theme` | All theme token exports |
| `typewritingclass/theme/colors` | Color scales |
| `typewritingclass/theme/typography` | Font sizes, weights, line heights |
| `typewritingclass/theme/shadows` | Shadow presets |
| `typewritingclass/theme/borders` | Border radius tokens |
| `typewritingclass/theme/sizes` | Named sizes |
| `typewritingclass/theme/animations` | Animation keyframe presets |
| `typewritingclass/theme/filters` | Filter presets |
| `typewritingclass/theme/createTheme` | `createTheme()` |
| `typewritingclass/inject` | Runtime style injection (auto-initializing side-effect import) |
| `typewritingclass/runtime` | `__twcDynamic()` (internal compiler helper) |
| `typewritingclass/rule` | `createRule()`, `createDynamicRule()`, `wrapWithSelector()`, `wrapWithMediaQuery()` |
