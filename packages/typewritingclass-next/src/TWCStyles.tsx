import React from 'react'
import { getStyleSheet } from 'typewritingclass-react/server'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export interface TWCStylesProps {
  /** Path to the compiler-generated CSS file. Default: ".next/twc.css" */
  cssFile?: string
}

/**
 * Server component that injects typewritingclass CSS into the document head.
 *
 * Combines both compiler-extracted CSS (from the build-time Rust transform)
 * and runtime-generated CSS (from dynamic styles resolved during SSR).
 *
 * Place this in your root layout to ensure all styles are included during SSR.
 *
 * @example app/layout.tsx
 * ```tsx
 * import { TWCStyles } from 'typewritingclass-next'
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html>
 *       <head>
 *         <TWCStyles />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   )
 * }
 * ```
 */
export function TWCStyles({ cssFile }: TWCStylesProps = {}): React.JSX.Element {
  const runtimeCss = getStyleSheet()

  // Read compiler-extracted CSS if the withTwc plugin is configured
  let compiledCss = ''
  try {
    const filePath = resolve(process.cwd(), cssFile || '.next/twc.css')
    compiledCss = readFileSync(filePath, 'utf-8')
  } catch {
    // Primary file missing (Next.js may have cleaned .next/) — try cache fallback
    try {
      compiledCss = readFileSync(
        resolve(process.cwd(), '.next/cache/twc/compiled.css'),
        'utf-8',
      )
    } catch {
      // No cached CSS either — that's fine
    }
  }

  const css = [compiledCss, runtimeCss].filter(Boolean).join('\n')
  return React.createElement('style', {
    'data-twc': '',
    dangerouslySetInnerHTML: { __html: css },
  })
}
