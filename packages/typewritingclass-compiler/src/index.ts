import type { Plugin, ViteDevServer } from 'vite'
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
const CLIENT_CSS_PATH = '/@id/__x00__' + VIRTUAL_CSS_ID

export default function twcPlugin(options?: TwcPluginOptions): Plugin {
  const strict = options?.strict ?? true

  let themeInput: import('../index.d.ts').ThemeInput
  // In dev mode, each file gets a stable layer offset (based on insertion order)
  // so hashes are deterministic across HMR cycles. In production, layer is
  // accumulated across all files for proper CSS ordering.
  let prodLayer = 0
  const fileLayerOffsets = new Map<string, number>()
  let nextFileLayer = 0
  // file path -> extracted CSS rules (css text strings ordered by layer)
  const fileRules = new Map<string, string[]>()
  let devServer: ViteDevServer | null = null

  return {
    name: 'typewritingclass',

    configureServer(server) {
      devServer = server
    },

    async buildStart() {
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

      // In dev mode, assign a stable layer offset per file so hashes
      // don't change across HMR cycles. In production, accumulate layers.
      let layerOffset: number
      if (devServer) {
        if (!fileLayerOffsets.has(id)) {
          fileLayerOffsets.set(id, nextFileLayer)
          nextFileLayer += 1000 // plenty of room per file
        }
        layerOffset = fileLayerOffsets.get(id)!
      } else {
        layerOffset = prodLayer
      }

      try {
        const result = native.transform(code, id, layerOffset, themeInput, strict)
        if (!devServer) {
          prodLayer = result.nextLayer
        }

        for (const diag of result.diagnostics) {
          if (diag.severity === 'error') {
            this.error({ message: diag.message, id, pos: diag.line })
          } else {
            this.warn({ message: diag.message, id, pos: diag.line })
          }
        }

        if (result.rules.length > 0) {
          fileRules.set(id, result.rules.map((r) => r.cssText))
        }

        const s = new MagicString(code)

        if (result.code !== code) {
          s.overwrite(0, code.length, result.code)
        }

        if (!result.code.includes(VIRTUAL_CSS_ID)) {
          s.prepend(`import '${VIRTUAL_CSS_ID}';\n`)
        }

        // In dev mode, after updating rules, invalidate the CSS module and
        // tell the client to re-fetch it. This runs AFTER fileRules is
        // updated, so the CSS will be fresh when the client requests it.
        if (devServer && result.rules.length > 0) {
          const mod = devServer.moduleGraph.getModuleById(RESOLVED_VIRTUAL_CSS_ID)
          if (mod) {
            devServer.moduleGraph.invalidateModule(mod)
          }
          devServer.hot.send({
            type: 'update',
            updates: [{
              type: 'css-update',
              timestamp: Date.now(),
              path: CLIENT_CSS_PATH,
              acceptedPath: CLIENT_CSS_PATH,
            }],
          })
        }

        return {
          code: s.toString(),
          map: s.generateMap({ source: id, includeContent: true }),
        }
      } catch {
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

    generateBundle(_, bundle) {
      const css = generateAllCss()
      if (!css) return

      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'asset' && chunk.fileName.endsWith('.css')) {
          const existing = typeof chunk.source === 'string' ? chunk.source : ''
          chunk.source = existing ? existing + '\n' + css : css
          return
        }
      }

      this.emitFile({
        type: 'asset',
        fileName: 'assets/twc.css',
        source: css,
      })
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
