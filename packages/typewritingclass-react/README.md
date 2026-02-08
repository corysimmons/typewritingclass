# typewritingclass-react

React integration for Typewriting Class. Provides the `useStyle` hook for composing styles in React components, with memoized output and support for dynamic values.

## Installation

```bash
bun add typewritingclass-react
```

Requires `react` (18 or 19) and `typewritingclass` as peer dependencies.

## Usage

```tsx
import { useStyle } from 'typewritingclass-react'
import { p, bg, rounded, when } from 'typewritingclass'
import { hover } from 'typewritingclass'
import { blue, white } from 'typewritingclass/theme/colors'

function Card() {
  const props = useStyle(
    p(6),
    bg(white),
    rounded('lg'),
    when(hover)(bg(blue[50])),
  )

  return <div {...props}>Styled card</div>
}
```

`useStyle` returns `{ className, style }` — spread it directly onto JSX elements. Dynamic values are automatically handled through inline `style` with CSS custom properties.

## Exports

| Path | Description |
|---|---|
| `typewritingclass-react` | `useStyle` hook |
| `typewritingclass-react/server` | Server Components utilities (experimental) |
