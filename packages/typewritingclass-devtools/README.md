# typewritingclass-devtools

VS Code extension that provides inline CSS preview and color underlines for Typewriting Class chain-style utilities.

## Features

- **Per-segment hover** — hover over any segment in a `tw` chain to see its CSS output
  - `tw` keyword → combined CSS for the entire chain
  - Utilities (e.g. `.bg`, `.p`) → CSS declarations for that utility + token
  - Tokens (e.g. `.blue500`, `.lg`) → resolved CSS with color swatch for color tokens
  - Valueless utilities (e.g. `.flex`, `.relative`) → CSS output
  - Modifiers (e.g. `.hover`, `.md`) → selector or media query info
  - Call segments (e.g. `.p(4)`, `.bg('blue-500')`) → CSS declarations
- **Color underlines** — color tokens in chains get a colored underline matching their resolved color
- **`when()` support** — hover over `when()` modifier chains for CSS preview
- **SVG color swatch** — hover over color utilities to see a color swatch
- **Configurable** — toggle hover preview, property names, and color underlines

## Settings

| Setting | Default | Description |
|---|---|---|
| `typewritingclass.enableHoverPreview` | `true` | Enable/disable CSS preview on hover |
| `typewritingclass.showPropertyNames` | `true` | Show CSS property names in preview |
| `typewritingclass.enableColorUnderlines` | `true` | Enable/disable colored underlines on color tokens |

## Development

```bash
bun run build    # Compile TypeScript
bun run watch    # Watch mode
bun run package  # Create .vsix extension package
bun run test     # Run tests
```
