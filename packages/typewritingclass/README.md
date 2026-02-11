# Typewriting Class

CSS-in-TypeScript with full autocomplete. Design tokens as properties, not strings.

## Install

```bash
pnpm add typewritingclass
```

## Use

```ts
import 'typewritingclass/inject'
import { tw } from 'typewritingclass'

const card = tw.bg.white.rounded.lg.p(6).shadow.md
```

## Property-access tokens

```ts
tw.bg.blue500            // background-color: #3b82f6
tw.textColor.slate900    // color: #0f172a
tw.rounded.lg            // border-radius: 0.5rem
tw.shadow.md             // box-shadow: ...
tw.text.lg               // font-size + line-height
tw.font.bold             // font-weight: 700
tw.items.center          // align-items: center
tw.cursor.pointer        // cursor: pointer

tw.bg.blue500(50)        // 50% opacity
```

Any CSS value works as a string argument: `tw.bg('#ff6347')`.

## Modifiers

```ts
tw.hover.bg.blue500
tw.dark.bg.slate900
tw.md.p(8)
tw.hover(tw.bg.blue500.textColor.white)
```

## Standalone utilities

```ts
import { cx, bg, rounded, p } from 'typewritingclass'

cx(bg.blue500, rounded.lg, p(4))
cx(bg.blue500(25), rounded.lg, p(4))
```

## Immutable chains

```ts
const base = tw.flex.flexCol
const a = base.gap(4)  // base unchanged
const b = base.gap(8)
```

## Dynamic values

```ts
import { dcx, bg, p, dynamic } from 'typewritingclass'

const { className, style } = dcx(p(4), bg(dynamic(userColor)))
```

## Exports

| Path | Contents |
|---|---|
| `typewritingclass` | Core API (`tw`, `cx`, `when`, all utilities and modifiers) |
| `typewritingclass/inject` | Runtime style injection (import once in your entry file) |
| `typewritingclass/preflight.css` | Optional CSS reset |
| `typewritingclass/theme/colors` | Color scales |
| `typewritingclass/theme/typography` | Font sizes, weights, line heights |
| `typewritingclass/theme/shadows` | Shadow presets |
| `typewritingclass/theme/borders` | Border radius tokens |
| `typewritingclass/theme/createTheme` | `createTheme()` for custom themes |
| `typewritingclass/rule` | `createRule()`, `wrapWithSelector()`, etc. for custom utilities |
