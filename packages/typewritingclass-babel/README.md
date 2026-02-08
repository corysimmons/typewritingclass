# typewritingclass-babel

Babel plugin for typewritingclass static CSS extraction. Use this for Babel-based build systems where the Vite plugin isn't applicable.

## Installation

```bash
bun add -d typewritingclass-babel
```

Requires `@babel/core` 7.x as a peer dependency.

## Configuration

```json
// babel.config.json
{
  "plugins": [
    ["typewritingclass-babel", {
      "outputFile": "twc.css",
      "strict": true,
      "theme": {}
    }]
  ]
}
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `outputFile` | `string` | `"twc.css"` | Path for the generated CSS file |
| `strict` | `boolean` | `true` | Error on dynamic values not wrapped with `dynamic()` |
| `theme` | `ThemeInput` | `{}` | Custom theme configuration |

## How it works

The plugin uses Babel's visitor pattern to transform each file through the native Rust compiler, collecting extracted CSS rules and writing the combined output to the configured file.
