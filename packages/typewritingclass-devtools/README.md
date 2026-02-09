# typewritingclass-devtools

VS Code extension that provides inline CSS preview for Typewriting Class utility calls.

## Features

- **Hover preview** — hover over any utility call (e.g. `p(4)`, `bg(blue[500])`) to see the generated CSS
- **`tw` chain preview** — hover over `tw.bg('blue-500').p(4)` chains to see all generated CSS
- **Composition support** — previews `cx(...)` compositions and `when(...)` modifier chains
- **SVG preview** — hover over color utilities to see a color swatch
- **Value-less property preview** — hover over properties like `flex`, `relative` to see their CSS output
- **Configurable** — toggle preview on/off and control property name display

## Settings

| Setting | Default | Description |
|---|---|---|
| `typewritingclass.enableHoverPreview` | `true` | Enable/disable CSS preview on hover |
| `typewritingclass.showPropertyNames` | `true` | Show CSS property names in preview |

## Development

```bash
bun run build    # Compile TypeScript
bun run watch    # Watch mode
bun run package  # Create .vsix extension package
```
