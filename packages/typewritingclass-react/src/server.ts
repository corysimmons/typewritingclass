import { generateCSS } from 'typewritingclass'

/**
 * Returns the current generated CSS as a raw stylesheet string.
 *
 * This reads from the runtime style registry, collecting all rules that
 * have been registered so far and rendering them into a single CSS string.
 * Useful for SSR scenarios where you need the raw CSS to inject into a
 * `<style>` tag or write to a file.
 *
 * This function is safe to call from React Server Components since it
 * does not use any client-side APIs (hooks, DOM, etc.).
 *
 * @returns The full CSS string for all registered style rules, or an
 *   empty string if no rules have been registered yet.
 *
 * @example
 * ```ts
 * import { getStyleSheet } from 'typewritingclass-react/server'
 *
 * const css = getStyleSheet()
 * // "._a1b2c { padding: 1rem; }\n\n._d3e4f { margin: 0; }"
 * ```
 */
export function getStyleSheet(): string {
  return generateCSS()
}

/**
 * Returns the current generated CSS wrapped in a `<style>` tag string,
 * ready to be injected into an HTML document during SSR.
 *
 * The style tag includes a `data-twc` attribute for easy identification
 * and potential hydration on the client side.
 *
 * This function is safe to call from React Server Components since it
 * does not use any client-side APIs (hooks, DOM, etc.).
 *
 * @returns An HTML `<style>` tag string containing all registered CSS
 *   rules, or an empty `<style>` tag if no rules have been registered.
 *
 * @example
 * ```tsx
 * import { getStyleTag } from 'typewritingclass-react/server'
 *
 * // In a server component or SSR render function:
 * const styleTag = getStyleTag()
 * // '<style data-twc>._a1b2c { padding: 1rem; }</style>'
 *
 * // Inject into the document head
 * return (
 *   <html>
 *     <head dangerouslySetInnerHTML={{ __html: styleTag }} />
 *     <body>{children}</body>
 *   </html>
 * )
 * ```
 */
export function getStyleTag(): string {
  const css = generateCSS()
  return `<style data-twc>${css}</style>`
}
