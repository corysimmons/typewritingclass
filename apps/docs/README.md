# docs

Documentation site for Typewriting Class, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Development

```bash
bun dev    # Start dev server
bun run build  # Build static site
bun run preview # Preview production build
```

## Structure

Documentation lives in `src/content/docs/` organized by topic:

- **Getting Started** — installation, quick start, editor setup, migration from Tailwind
- **Core Concepts** — utilities, `cx()`, `when()`, responsive design, dark mode, layers, strict mode
- **Theming** — default tokens, custom themes, token reference
- **Plugins** — utility plugins, modifier plugins, composites, recipes
- **Compiler** — Vite, esbuild, and Babel configuration
- **Dynamic Values** — runtime CSS custom properties
- **Integrations** — framework-specific guides
- **API Reference** — auto-generated from TSDoc
