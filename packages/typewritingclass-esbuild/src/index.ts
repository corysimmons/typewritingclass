import type { Plugin, OnLoadArgs, OnLoadResult, OnResolveArgs, OnResolveResult } from 'esbuild'
import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'

// Load native addon from typewritingclass-compiler
const require = createRequire(import.meta.url)
const compilerDir = dirname(require.resolve('typewritingclass-compiler/package.json'))
const native: typeof import('typewritingclass-compiler/index.d.ts') = require(
  resolve(compilerDir, 'index.node'),
)

export interface TwcEsbuildPluginOptions {
  strict?: boolean
}

const VIRTUAL_CSS_ID = 'virtual:twc.css'
const VIRTUAL_CSS_NAMESPACE = 'twc-virtual-css'

export default function twcEsbuildPlugin(options?: TwcEsbuildPluginOptions): Plugin {
  const strict = options?.strict ?? true

  let themeInput: import('typewritingclass-compiler/index.d.ts').ThemeInput
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

/**
 * Load theme data from the typewritingclass package.
 * This dynamically imports the theme modules so values come from the TS source,
 * not hardcoded in the compiler.
 */
async function loadTheme(): Promise<import('typewritingclass-compiler/index.d.ts').ThemeInput> {
  // Import all theme modules from the TS package
  const [colorsModule, spacingModule, typographyModule, sizesModule, shadowsModule, bordersModule] =
    await Promise.all([
      import('typewritingclass/theme/colors'),
      import('typewritingclass/theme'),
      import('typewritingclass/theme/typography'),
      import('typewritingclass/theme/sizes'),
      import('typewritingclass/theme/shadows'),
      import('typewritingclass/theme/borders'),
    ])

  // Build color scales map
  const colorScaleNames = [
    'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber',
    'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue',
    'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
  ]
  const colors: Record<string, Record<string, string>> = {}
  for (const name of colorScaleNames) {
    const scale = (colorsModule as Record<string, any>)[name]
    if (scale && typeof scale === 'object') {
      colors[name] = {}
      for (const [shade, hex] of Object.entries(scale)) {
        colors[name][String(shade)] = hex as string
      }
    }
  }

  // Named colors
  const namedColors: Record<string, string> = {
    white: colorsModule.white,
    black: colorsModule.black,
    transparent: colorsModule.transparent,
    currentColor: colorsModule.currentColor,
  }

  // Spacing scale
  const { spacing: spacingNs } = spacingModule as any
  const spacing: Record<string, string> = {}
  if (spacingNs && spacingNs.spacingScale) {
    for (const [key, val] of Object.entries(spacingNs.spacingScale)) {
      spacing[String(key)] = val as string
    }
  }

  // Text sizes
  const textSizeNames = ['xs', 'sm', 'base', 'lg', 'xl', '_2xl', '_3xl', '_4xl', '_5xl', '_6xl', '_7xl', '_8xl', '_9xl']
  const textSizes: Record<string, { fontSize: string; lineHeight: string }> = {}
  for (const name of textSizeNames) {
    const token = (typographyModule as Record<string, any>)[name]
    if (token && typeof token === 'object' && 'fontSize' in token) {
      textSizes[name] = { fontSize: token.fontSize, lineHeight: token.lineHeight }
    }
  }

  // Font weights
  const weightNames = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black_']
  const fontWeights: Record<string, string> = {}
  for (const name of weightNames) {
    const val = (typographyModule as Record<string, any>)[name]
    if (typeof val === 'string') {
      fontWeights[name] = val
    }
  }

  // Border radii
  const radiusNames = ['none', 'sm', 'DEFAULT', 'md', 'lg', 'xl', '_2xl', '_3xl', 'full']
  const radii: Record<string, string> = {}
  for (const name of radiusNames) {
    const val = (bordersModule as Record<string, any>)[name]
    if (typeof val === 'string') {
      radii[name] = val
    }
  }

  // Shadows
  const shadowNames = ['sm', 'DEFAULT', 'md', 'lg', 'xl', '_2xl', 'inner', 'none']
  const shadows: Record<string, string> = {}
  for (const name of shadowNames) {
    const val = (shadowsModule as Record<string, any>)[name]
    if (typeof val === 'string') {
      shadows[name] = val
    }
  }

  // Sizes
  const sizeNames = ['full', 'screen', 'screenH', 'min', 'max', 'fit', 'auto']
  const sizes: Record<string, string> = {}
  for (const name of sizeNames) {
    const val = (sizesModule as Record<string, any>)[name]
    if (typeof val === 'string') {
      sizes[name] = val
    }
  }

  return {
    colors: JSON.stringify(colors),
    namedColors: JSON.stringify(namedColors),
    spacing: JSON.stringify(spacing),
    textSizes: JSON.stringify(textSizes),
    fontWeights: JSON.stringify(fontWeights),
    radii: JSON.stringify(radii),
    shadows: JSON.stringify(shadows),
    sizes: JSON.stringify(sizes),
    defaultRadius: radii['DEFAULT'] ?? '0.25rem',
    defaultShadow: shadows['DEFAULT'] ?? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  }
}
