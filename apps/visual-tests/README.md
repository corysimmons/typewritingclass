# visual-tests

Playwright-based visual regression tests that ensure pixel-perfect correctness by comparing typewritingclass output against equivalent hand-written CSS.

## How it works

Each test creates paired pages — one styled with typewritingclass utilities, one with equivalent raw CSS — then screenshots both and diffs them. The screenshots must be pixel-identical (zero-threshold by default).

## Test coverage

- Spacing (padding, margin, gap)
- Colors (background, text, border)
- Typography (font sizes, weights, line heights, letter spacing)
- Layout (flex, grid, sizing)
- Borders and effects (rounded corners, shadows, rings, opacity)
- State modifiers (hover, focus, active, disabled)
- Responsive breakpoints (sm, md, lg, xl at multiple viewports)
- Composition (override behavior, modifier stacking, layer ordering)
- Dark mode
- Dynamic values (CSS custom property injection)

## Usage

```bash
bun test          # Build and run visual tests
bun run test:update   # Update baseline snapshots
```

## Browsers

Chromium (primary), Firefox, WebKit.
