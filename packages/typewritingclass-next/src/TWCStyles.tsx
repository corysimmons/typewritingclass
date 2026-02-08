import React from 'react'
import { getStyleSheet } from 'typewritingclass-react/server'

/**
 * Server component that injects typewritingclass CSS into the document head.
 *
 * Place this in your root layout to ensure all styles are included during SSR.
 * This component is safe to use in React Server Components — it has no client-side
 * dependencies.
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
export function TWCStyles(): React.JSX.Element {
  const css = getStyleSheet()
  return React.createElement('style', {
    'data-twc': '',
    dangerouslySetInnerHTML: { __html: css },
  })
}
