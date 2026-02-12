---
title: Editor Setup
description: Configure your editor for the best Typewriting Class experience.
sidebar:
  order: 3
---

Typewriting Class is plain TypeScript -- autocomplete, go-to-definition, and type checking work out of the box in any editor.

## VS Code extension

The [**Typewriting Class**](https://marketplace.visualstudio.com/items?itemName=corysimmons.typewritingclass-devtools) extension gives you inline CSS previews and color underlines as you write `tw` chains.

![Typewriting Class VS Code extension](/vscode-extension-header.png)

### Features

- **Per-segment hover** -- hover over any segment in a `tw` chain to see its CSS output
  - `tw` keyword shows combined CSS for the entire chain
  - Tokens like `.blue500` or `.lg` show resolved CSS with color swatches
  - Modifiers like `.hover` or `.md` show selector/media query info
  - Call segments like `.p(4)` show CSS declarations
- **Color underlines** -- color tokens get a colored underline matching their resolved color
- **Multi-line chains** -- works across line breaks
- **`when()` support** -- hover over `when()` modifier chains for CSS preview

### Install

Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=corysimmons.typewritingclass-devtools) or from the command line:

```bash
code --install-extension corysimmons.typewritingclass-devtools
```

### Settings

| Setting | Default | Description |
|---|---|---|
| `typewritingclass.enableHoverPreview` | `true` | Enable/disable CSS preview on hover |
| `typewritingclass.showPropertyNames` | `true` | Show CSS property names in preview |
| `typewritingclass.enableColorUnderlines` | `true` | Enable/disable colored underlines on color tokens |

## TypeScript configuration

Recommended `tsconfig.json` settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "module": "ESNext"
  }
}
```

Use `"moduleResolution": "bundler"` (TypeScript 5.0+) to correctly resolve `typewritingclass/theme/*` sub-path exports.

## ESLint and Prettier

No special plugins needed. Standard `@typescript-eslint` rules cover unused imports and type errors. Prettier formats Typewriting Class code with its default settings.
