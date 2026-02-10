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
const VIRTUAL_CSS_JS_ID = 'virtual:twc-css-inject'
const RESOLVED_VIRTUAL_CSS_JS_ID = '\0' + VIRTUAL_CSS_JS_ID

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
  let cssInvalidateTimer: ReturnType<typeof setTimeout> | null = null

  function scheduleCssUpdate() {
    if (!devServer) return
    if (cssInvalidateTimer) clearTimeout(cssInvalidateTimer)
    cssInvalidateTimer = setTimeout(() => {
      cssInvalidateTimer = null
      if (!devServer) return
      devServer.ws.send({
        type: 'custom',
        event: 'twc:css-update',
        data: {},
      })
    }, 100)
  }

  return {
    name: 'typewritingclass',
    enforce: 'pre' as const,

    configureServer(server) {
      devServer = server
      // Serve current compiled CSS from an endpoint (always fresh, no caching issues)
      server.middlewares.use('/__twc_css', (_req, res) => {
        const css = generateAllCss()
        res.setHeader('Content-Type', 'text/plain')
        res.setHeader('Cache-Control', 'no-store')
        res.end(css)
      })
    },

    async buildStart() {
      themeInput = await loadTheme()
    },

    resolveId(id) {
      if (id === VIRTUAL_CSS_ID) {
        if (devServer) {
          // Dev mode: use JS module that injects CSS dynamically and accepts HMR updates
          return RESOLVED_VIRTUAL_CSS_JS_ID
        }
        return RESOLVED_VIRTUAL_CSS_ID
      }
      if (id === VIRTUAL_CSS_JS_ID) {
        return RESOLVED_VIRTUAL_CSS_JS_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_CSS_ID) {
        return generateAllCss()
      }
      if (id === RESOLVED_VIRTUAL_CSS_JS_ID) {
        // Dev-only JS module: fetches compiled CSS from server endpoint.
        // Uses a fetch() instead of inline CSS to avoid stale caching.
        return `
const style = document.createElement('style');
style.setAttribute('data-twc-compiled', '');
document.head.appendChild(style);

async function updateCss() {
  const res = await fetch('/__twc_css');
  style.textContent = await res.text();
}

// Initial load: wait briefly for all transforms to complete, then fetch CSS
setTimeout(updateCss, 200);

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.on('twc:css-update', () => updateCss());
}
`
      }
    },

    async handleHotUpdate(ctx) {
      const { file, read, server, modules } = ctx
      if (!file.match(/\.[jt]sx?$/) || file.includes('node_modules')) return
      const code = await read()
      if (!code.includes('typewritingclass')) return

      // Assign stable layer offset
      if (!fileLayerOffsets.has(file)) {
        fileLayerOffsets.set(file, nextFileLayer)
        nextFileLayer += 1000
      }
      const layerOffset = fileLayerOffsets.get(file)!

      try {
        // Pre-extract rules so fileRules is fresh BEFORE modules are re-loaded.
        // This eliminates the race condition where the CSS module could be
        // fetched before the component's transform hook updates fileRules.
        const result = native.transform(code, file, layerOffset, themeInput, strict)
        fileRules.set(file, result.rules.map((r) => r.cssText))
      } catch {
        // Extraction failed — transform hook will handle it
      }

      // In dev mode, notify the client to re-fetch compiled CSS.
      // In prod mode, invalidate the virtual CSS module directly.
      const cssMod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_CSS_ID)
      if (cssMod) {
        server.moduleGraph.invalidateModule(cssMod)
        return [...modules, cssMod]
      }
      // Dev mode uses the JS inject module — notify via custom event
      server.ws.send({ type: 'custom', event: 'twc:css-update', data: {} })
      return modules
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
          nextFileLayer += 1000
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
          scheduleCssUpdate()
        }

        const s = new MagicString(code)

        if (result.code !== code) {
          s.overwrite(0, code.length, result.code)
        }

        if (!result.code.includes(VIRTUAL_CSS_ID)) {
          s.prepend(`import '${VIRTUAL_CSS_ID}';\n`)
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
