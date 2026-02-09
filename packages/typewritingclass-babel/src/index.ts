import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync, mkdirSync } from 'fs'

import type { ThemeInput, TransformOutput, Diagnostic } from 'typewritingclass-compiler'
import { loadThemeSync } from 'typewritingclass-compiler/loadTheme'

// Load the native addon from typewritingclass-compiler
const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const native: {
  transform(
    code: string,
    filename: string,
    layerOffset: number,
    themeInput: ThemeInput,
    strict?: boolean | null,
  ): TransformOutput
  generateCss(rulesJson: string): string
} = require(resolve(__dirname, '..', '..', 'typewritingclass-compiler', 'index.node'))

export interface TwcBabelPluginOptions {
  /** Path to write the combined CSS output file. Default: "twc.css" */
  outputFile?: string
  /** Enable strict mode for the compiler. Default: true */
  strict?: boolean
  /** Theme input to pass to the native compiler. If not provided, auto-loaded from typewritingclass package. */
  theme?: ThemeInput
}

/**
 * Babel plugin for typewritingclass.
 *
 * Transforms source files through the native Rust compiler, extracts CSS rules,
 * and writes the combined CSS to a configurable output file.
 *
 * Usage in babel config:
 * ```js
 * plugins: [
 *   ['typewritingclass-babel', { outputFile: 'dist/twc.css', strict: true }]
 * ]
 * ```
 */
export default function twcBabelPlugin() {
  let layer = 0
  const fileRules = new Map<string, string[]>()
  let cachedTheme: ThemeInput | null = null

  return {
    visitor: {
      Program(
        path: { hub: { file: { code: string } }; replaceWithSourceString: (code: string) => void },
        state: { filename?: string; opts?: TwcBabelPluginOptions },
      ) {
        const code = path.hub.file.code
        const filename = state.filename ?? 'unknown.tsx'

        // Skip files that don't reference typewritingclass
        if (!code.includes('typewritingclass')) return

        // Skip node_modules
        if (filename.includes('node_modules')) return

        // Only process JS/TS files
        if (!/\.[jt]sx?$/.test(filename)) return

        const opts = state.opts ?? {}
        const strict = opts.strict ?? true
        const outputFile = opts.outputFile ?? 'twc.css'

        // Load theme once: use provided theme or auto-load from typewritingclass package
        if (!cachedTheme) {
          cachedTheme = opts.theme ?? loadThemeSync()
        }
        const themeInput = cachedTheme

        try {
          const result = native.transform(code, filename, layer, themeInput, strict)
          layer = result.nextLayer

          // Emit diagnostics as console warnings/errors
          emitDiagnostics(result.diagnostics, filename)

          // Collect extracted CSS rules for this file
          if (result.rules.length > 0) {
            fileRules.set(
              filename,
              result.rules.map((r) => r.cssText),
            )
          }

          // Write combined CSS to the output file
          writeCssFile(outputFile, fileRules)

          // Replace the program source with the transformed code.
          // We use Babel's internal parse to replace the entire AST.
          // path.replaceWithSourceString doesn't exist on Program, so we
          // reparse and swap the body.
          const { parse } = require('@babel/parser') as typeof import('@babel/parser')
          const newAst = parse(result.code, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
          })

          // Replace the program body and directives with the transformed AST
          ;(path as any).node.body = newAst.program.body
          ;(path as any).node.directives = newAst.program.directives
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err)
          console.error(`[typewritingclass-babel] Failed to transform ${filename}: ${message}`)
        }
      },
    },
  }
}

/**
 * Emit compiler diagnostics as console warnings or errors.
 */
function emitDiagnostics(diagnostics: Diagnostic[], filename: string): void {
  for (const diag of diagnostics) {
    const location = `${filename}:${diag.line}:${diag.column}`
    if (diag.severity === 'error') {
      console.error(`[typewritingclass] ERROR ${location} - ${diag.message}`)
    } else {
      console.warn(`[typewritingclass] WARN ${location} - ${diag.message}`)
    }
  }
}

/**
 * Collect all CSS rules from all processed files and write them to a single
 * output file. Uses the native `generateCss` function to produce well-ordered CSS.
 */
function writeCssFile(outputFile: string, fileRules: Map<string, string[]>): void {
  const allRules: string[] = []
  for (const rules of fileRules.values()) {
    allRules.push(...rules)
  }

  if (allRules.length === 0) return

  const css = native.generateCss(JSON.stringify(allRules))

  // Ensure the output directory exists
  const outputDir = dirname(resolve(outputFile))
  mkdirSync(outputDir, { recursive: true })

  writeFileSync(resolve(outputFile), css, 'utf-8')
}
