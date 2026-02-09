import type { TwcBabelPluginOptions } from 'typewritingclass-babel'

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
 * Configures webpack to run the typewritingclass Babel transform on your source
 * files, extracting static CSS at build time.
 *
 * @example next.config.mjs
 * ```js
 * import { withTwc } from 'typewritingclass-next/plugin'
 *
 * export default withTwc({
 *   // your next config
 * })
 * ```
 *
 * @example With options
 * ```js
 * import { withTwc } from 'typewritingclass-next/plugin'
 *
 * export default withTwc({
 *   // your next config
 * }, { strict: true })
 * ```
 */
export function withTwc(nextConfig: NextConfig = {}, options: TwcNextPluginOptions = {}): NextConfig {
  const babelOptions: TwcBabelPluginOptions = {
    outputFile: options.outputFile ?? '.next/twc.css',
    strict: options.strict ?? true,
  }

  return {
    ...nextConfig,
    webpack(config: any, context: any) {
      // Add the typewritingclass babel plugin to the webpack babel-loader
      config.module.rules.push({
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['typewritingclass-babel', babelOptions],
            ],
          },
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
