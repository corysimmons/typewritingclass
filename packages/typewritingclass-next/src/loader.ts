import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync, mkdirSync } from 'fs'
import type { ThemeInput, TransformOutput, Diagnostic } from 'typewritingclass-compiler'
import { loadThemeSync } from 'typewritingclass-compiler/loadTheme'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

// Load the native addon
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
} = require(resolve(compilerDir, 'index.node'))

// Module-level state shared across all loader invocations
let themeInput: ThemeInput | null = null
let nextLayer = 0
const fileRules = new Map<string, string[]>()
// Cache the starting layer for each file so HMR reprocessing produces the same class names
const fileLayers = new Map<string, number>()

export interface TwcLoaderOptions {
  outputFile?: string
  strict?: boolean
}

/**
 * Custom webpack loader that runs the native Rust compiler transform.
 * Only transforms the source code — leaves TypeScript/JSX to SWC/Babel.
 */
export default function twcLoader(this: any, source: string): string {
  const filename: string = this.resourcePath
  const options: TwcLoaderOptions = this.getOptions?.() ?? {}
  const strict = options.strict ?? true
  const outputFile = options.outputFile ?? '.next/twc.css'

  // Skip files that don't reference typewritingclass
  if (!source.includes('typewritingclass')) return source

  // Skip node_modules
  if (filename.includes('node_modules')) return source

  // Only process JS/TS files
  if (!/\.[jt]sx?$/.test(filename)) return source

  // Load theme once
  if (!themeInput) {
    themeInput = loadThemeSync()
  }

  // Use cached layer offset for this file (ensures stable class names across HMR)
  const layer = fileLayers.get(filename) ?? nextLayer

  try {
    const result = native.transform(source, filename, layer, themeInput, strict)

    // Cache the starting layer for this file
    if (!fileLayers.has(filename)) {
      fileLayers.set(filename, layer)
    }
    // Advance the global counter past this file's rules
    nextLayer = Math.max(nextLayer, result.nextLayer)

    // Log diagnostics
    for (const diag of result.diagnostics) {
      const location = `${filename}:${diag.line}:${diag.column}`
      if (diag.severity === 'error') {
        this.emitError(new Error(`[typewritingclass] ${location} - ${diag.message}`))
      } else {
        this.emitWarning(new Error(`[typewritingclass] ${location} - ${diag.message}`))
      }
    }

    // Collect CSS rules
    if (result.rules.length > 0) {
      fileRules.set(filename, result.rules.map((r) => r.cssText))

      // Write combined CSS after each file (last file wins with complete set)
      const allRules: string[] = []
      for (const rules of fileRules.values()) {
        allRules.push(...rules)
      }
      const css = native.generateCss(JSON.stringify(allRules))
      if (css) {
        const outputDir = dirname(resolve(outputFile))
        mkdirSync(outputDir, { recursive: true })
        writeFileSync(resolve(outputFile), css, 'utf-8')
      }
    }

    return result.code
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[typewritingclass] Failed to transform ${filename}: ${message}`)
    return source
  }
}
