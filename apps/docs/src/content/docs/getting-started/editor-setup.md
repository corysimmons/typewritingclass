---
title: Editor Setup
description: Configure your editor for the best Typewriting Class experience.
sidebar:
  order: 3
---

Typewriting Class is plain TypeScript -- autocomplete, go-to-definition, and type checking work out of the box in any editor.

## VS Code extension

The **typewritingclass-devtools** extension adds inline CSS hover previews. Hover over any utility call or `tw` chain to see the generated CSS:

```bash
code --install-extension typewritingclass.typewritingclass-devtools
```

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
