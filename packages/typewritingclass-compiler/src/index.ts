import type { Plugin } from 'vite'
import MagicString from 'magic-string'
import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { loadTheme } from './loadTheme.ts'

// Load native addon
const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const native: typeof import('../index.d.ts') = require(resolve(__dirname, '..', 'index.node'))

// Re-export the native transform for direct use
export const { transform: nativeTransform, generateCss } = native
export type { ThemeInput, TransformOutput, ExtractedRule, Diagnostic } from '../index.d.ts'

export interface TwcPluginOptions {
  strict?: boolean
}

const VIRTUAL_CSS_ID = 'virtual:twc.css'
const RESOLVED_VIRTUAL_CSS_ID = '\0' + VIRTUAL_CSS_ID

export default function twcPlugin(options?: TwcPluginOptions): Plugin {
  const strict = options?.strict ?? true

  let themeInput: import('../index.d.ts').ThemeInput
  let layer = 0
  // file path -> extracted CSS rules (css text strings ordered by layer)
  const fileRules = new Map<string, string[]>()

  return {
    name: 'typewritingclass',

    async buildStart() {
      // Load theme data from the typewritingclass package at build time.
      // The theme is the single source of truth — values come from TS, not Rust.
      themeInput = await loadTheme()
    },

    resolveId(id) {
      if (id === VIRTUAL_CSS_ID) {
        return RESOLVED_VIRTUAL_CSS_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_CSS_ID) {
        return generateAllCss()
      }
    },

    transform(code, id) {
      if (!id.match(/\.[jt]sx?$/) || id.includes('node_modules')) return
      if (!code.includes('typewritingclass')) return

      try {
        const result = native.transform(code, id, layer, themeInput, strict)
        layer = result.nextLayer

        // Surface diagnostics as Vite warnings/errors
        for (const diag of result.diagnostics) {
          if (diag.severity === 'error') {
            this.error({
              message: diag.message,
              id,
              pos: diag.line,
            })
          } else {
            this.warn({
              message: diag.message,
              id,
              pos: diag.line,
            })
          }
        }

        if (result.rules.length > 0) {
          fileRules.set(
            id,
            result.rules.map((r) => r.cssText),
          )
        }

        // Use MagicString for source map generation
        const s = new MagicString(code)

        // If the native transform changed the code, overwrite the content
        if (result.code !== code) {
          s.overwrite(0, code.length, result.code)
        }

        // Inject virtual CSS import so styles are included in the bundle
        if (!result.code.includes(VIRTUAL_CSS_ID)) {
          s.prepend(`import '${VIRTUAL_CSS_ID}';\n`)
        }

        return {
          code: s.toString(),
          map: s.generateMap({ source: id, includeContent: true }),
        }
      } catch {
        // If Rust transform fails, fall back to just injecting the runtime
        if (!code.includes('typewritingclass/inject')) {
          const s = new MagicString(code)
          s.prepend(`import 'typewritingclass/inject';\n`)
          return {
            code: s.toString(),
            map: s.generateMap({ source: id, includeContent: true }),
          }
        }
      }
    },

    handleHotUpdate({ file, server }) {
      if (file.match(/\.[jt]sx?$/) && fileRules.has(file)) {
        // Invalidate the virtual CSS module so it regenerates
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_CSS_ID)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          return [mod]
        }
      }
    },
  }

  function generateAllCss(): string {
    const allRules: string[] = []
    for (const rules of fileRules.values()) {
      allRules.push(...rules)
    }
    if (allRules.length === 0) return ''

    let css = native.generateCss(JSON.stringify(allRules))

    // Append source mapping comments referencing the original TS/TSX files
    // so devtools can trace CSS rules back to their source files
    const sourceFiles = [...fileRules.keys()]
    if (sourceFiles.length > 0) {
      css += '\n'
      for (const file of sourceFiles) {
        css += `\n/* sourceMappingURL=${file} */`
      }
    }

    return css
  }
}

