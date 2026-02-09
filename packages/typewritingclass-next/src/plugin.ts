import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

interface NextConfig {
  webpack?: (config: any, context: any) => any
  [key: string]: any
}

export interface TwcNextPluginOptions {
  /** Path to write the combined CSS output file. Default: ".next/twc.css" */
  outputFile?: string
  /** Enable strict mode for the compiler. Default: true */
  strict?: boolean
}

/**
 * Next.js plugin that integrates typewritingclass build-time CSS extraction.
 *
 * Configures webpack with a custom loader that runs the native Rust compiler
 * on source files, extracting static CSS at build time. Works alongside
 * Next.js's SWC compiler — no Babel required.
 *
 * @example next.config.mjs
 * ```js
 * import { withTwc } from 'typewritingclass-next/plugin'
 *
 * export default withTwc({
 *   // your next config
 * })
 * ```
 */
export function withTwc(nextConfig: NextConfig = {}, options: TwcNextPluginOptions = {}): NextConfig {
  const loaderOptions = {
    outputFile: options.outputFile ?? '.next/twc.css',
    strict: options.strict ?? true,
  }

  // Resolve loader path relative to this module (works in both source and dist)
  const loaderPath = resolve(__dirname, 'loader.cjs')

  return {
    ...nextConfig,
    webpack(config: any, context: any) {
      // Add the typewritingclass custom loader — runs the Rust compiler
      // transform before SWC processes TypeScript/JSX
      config.module.rules.push({
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: loaderPath,
          options: loaderOptions,
        },
      })

      // Call the user's webpack config if they provided one
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, context)
      }

      return config
    },
  }
}
