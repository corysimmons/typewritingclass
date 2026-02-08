import type { Plugin } from 'vite'
import { createRequire } from 'module'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Load native addon
const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const native: typeof import('../index.d.ts') = require(resolve(__dirname, '..', 'index.node'))

// Re-export the native transform for direct use
export const { transform: nativeTransform, generateCss } = native
export type { ThemeInput, TransformOutput, ExtractedRule } from '../index.d.ts'

const VIRTUAL_CSS_ID = 'virtual:twc.css'
const RESOLVED_VIRTUAL_CSS_ID = '\0' + VIRTUAL_CSS_ID

export default function twcPlugin(): Plugin {
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
        const result = native.transform(code, id, layer, themeInput)
        layer = result.nextLayer

        if (result.rules.length > 0) {
          fileRules.set(
            id,
            result.rules.map((r) => r.cssText),
          )
        }

        // Inject virtual CSS import so styles are included in the bundle
        let transformed = result.code
        if (!transformed.includes(VIRTUAL_CSS_ID)) {
          transformed = `import '${VIRTUAL_CSS_ID}';\n${transformed}`
        }

        return { code: transformed, map: null }
      } catch {
        // If Rust transform fails, fall back to just injecting the runtime
        if (!code.includes('typewritingclass/inject')) {
          return {
            code: `import 'typewritingclass/inject';\n${code}`,
            map: null,
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
    return native.generateCss(JSON.stringify(allRules))
  }
}

/**
 * Load theme data from the typewritingclass package.
 * This dynamically imports the theme modules so values come from the TS source,
 * not hardcoded in the compiler.
 */
async function loadTheme(): Promise<import('../index.d.ts').ThemeInput> {
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
