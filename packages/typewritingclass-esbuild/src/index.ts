import type { Plugin, OnLoadArgs, OnLoadResult, OnResolveArgs, OnResolveResult } from 'esbuild'
import type { ThemeInput, TransformOutput } from 'typewritingclass-compiler'
import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'
import { loadTheme } from 'typewritingclass-compiler/loadTheme'

// Load native addon from typewritingclass-compiler
const require = createRequire(import.meta.url)
const compilerDir = dirname(require.resolve('typewritingclass-compiler/package.json'))
const native: {
  transform(
    code: string,
    filename: string,
    layerOffset: number,
    themeInput: ThemeInput,
    strict?: boolean | null,
  ): TransformOutput
  generateCss(rulesJson: string): string
} = require(
  resolve(compilerDir, 'index.node'),
)

export interface TwcEsbuildPluginOptions {
  strict?: boolean
}

const VIRTUAL_CSS_ID = 'virtual:twc.css'
const VIRTUAL_CSS_NAMESPACE = 'twc-virtual-css'

export default function twcEsbuildPlugin(options?: TwcEsbuildPluginOptions): Plugin {
  const strict = options?.strict ?? true

  let themeInput: ThemeInput
  let layer = 0
  // file path -> extracted CSS rules (css text strings ordered by layer)
  const fileRules = new Map<string, string[]>()

  return {
    name: 'typewritingclass',

    setup(build) {
      // ------------------------------------------------------------------
      // 1. Load theme once before the build starts
      // ------------------------------------------------------------------
      let themeReady: Promise<void> | undefined
      const ensureTheme = () => {
        if (!themeReady) {
          themeReady = loadTheme().then((t) => {
            themeInput = t
          })
        }
        return themeReady
      }

      // ------------------------------------------------------------------
      // 2. Resolve the virtual CSS import to our custom namespace
      // ------------------------------------------------------------------
      build.onResolve(
        { filter: new RegExp(`^${escapeRegex(VIRTUAL_CSS_ID)}$`) },
        (_args: OnResolveArgs): OnResolveResult => {
          return {
            path: VIRTUAL_CSS_ID,
            namespace: VIRTUAL_CSS_NAMESPACE,
          }
        },
      )

      // ------------------------------------------------------------------
      // 3. Load virtual CSS — generates the combined stylesheet
      // ------------------------------------------------------------------
      build.onLoad(
        { filter: /.*/, namespace: VIRTUAL_CSS_NAMESPACE },
        async (_args: OnLoadArgs): Promise<OnLoadResult> => {
          await ensureTheme()
          const css = generateAllCss()
          return {
            contents: css,
            loader: 'css',
          }
        },
      )

      // ------------------------------------------------------------------
      // 4. Transform .ts/.tsx/.js/.jsx files through the native compiler
      // ------------------------------------------------------------------
      build.onLoad(
        { filter: /\.[jt]sx?$/ },
        async (args: OnLoadArgs): Promise<OnLoadResult | undefined> => {
          // Skip node_modules
          if (args.path.includes('node_modules')) return undefined

          await ensureTheme()

          const source = await readFile(args.path, 'utf8')

          // Skip files that don't reference typewritingclass at all
          if (!source.includes('typewritingclass')) return undefined

          // Determine the right loader based on extension
          const loader = getLoader(args.path)

          try {
            const result = native.transform(source, args.path, layer, themeInput, strict)
            layer = result.nextLayer

            // Surface diagnostics as esbuild warnings/errors
            const warnings: Array<{ text: string; location: { file: string; line: number; column: number } }> = []
            const errors: Array<{ text: string; location: { file: string; line: number; column: number } }> = []

            for (const diag of result.diagnostics) {
              const msg = {
                text: diag.message,
                location: {
                  file: args.path,
                  line: diag.line,
                  column: diag.column,
                },
              }
              if (diag.severity === 'error') {
                errors.push(msg)
              } else {
                warnings.push(msg)
              }
            }

            // Store extracted CSS rules for this file
            if (result.rules.length > 0) {
              fileRules.set(
                args.path,
                result.rules.map((r) => r.cssText),
              )
            }

            // Inject virtual CSS import so styles are included in the bundle
            let transformed = result.code
            if (!transformed.includes(VIRTUAL_CSS_ID)) {
              transformed = `import '${VIRTUAL_CSS_ID}';\n${transformed}`
            }

            return {
              contents: transformed,
              loader,
              warnings,
              errors,
            }
          } catch {
            // If Rust transform fails, fall back to runtime import
            let fallback = source
            if (!fallback.includes('typewritingclass/inject')) {
              fallback = `import 'typewritingclass/inject';\n${fallback}`
            }
            return {
              contents: fallback,
              loader,
            }
          }
        },
      )
    },
  }

  // --------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------

  function generateAllCss(): string {
    const allRules: string[] = []
    for (const rules of fileRules.values()) {
      allRules.push(...rules)
    }
    if (allRules.length === 0) return ''
    return native.generateCss(JSON.stringify(allRules))
  }
}

function getLoader(filePath: string): 'ts' | 'tsx' | 'js' | 'jsx' {
  if (filePath.endsWith('.tsx')) return 'tsx'
  if (filePath.endsWith('.ts')) return 'ts'
  if (filePath.endsWith('.jsx')) return 'jsx'
  return 'js'
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

