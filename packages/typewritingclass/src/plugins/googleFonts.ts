const injected = new Set<string>()

/**
 * Loads a Google Font and returns the font family name for use with {@link fontFamily}.
 *
 * In browser environments this injects a `<link>` tag for the Google Fonts CSS.
 * The returned string is the font family name, ready to pass to `fontFamily()`.
 *
 * @param family - The Google Font family name, e.g. `'Inter'` or `'Fira Code'`.
 * @param options - Optional settings for weights and display strategy.
 * @returns The font family name string.
 *
 * @example
 * ```ts
 * import { tw, googleFonts } from 'typewritingclass'
 *
 * const heading = tw.fontFamily(googleFonts('Inter'))
 * ```
 *
 * @example With specific weights
 * ```ts
 * const body = tw.fontFamily(googleFonts('Roboto', { weights: [400, 700] }))
 * ```
 */
export function googleFonts(
  family: string,
  options?: { weights?: number[]; display?: string },
): string {
  if (typeof document !== 'undefined' && !injected.has(family)) {
    injected.add(family)
    const params = new URLSearchParams()
    const weights = options?.weights
    if (weights && weights.length > 0) {
      params.set('family', `${family}:wght@${weights.join(';')}`)
    } else {
      params.set('family', family)
    }
    params.set('display', options?.display ?? 'swap')
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?${params.toString()}`
    document.head.appendChild(link)
  }
  return family
}
