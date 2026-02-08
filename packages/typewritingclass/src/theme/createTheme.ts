/**
 * Configuration object for defining a theme's design tokens.
 *
 * Pass this to {@link createTheme} to generate CSS custom properties and
 * a type-safe `vars` accessor for use in style utilities.
 *
 * @example
 * ```ts
 * const config: ThemeConfig = {
 *   name: 'light',
 *   colors: {
 *     blue: { 500: '#3b82f6', 600: '#2563eb' },
 *   },
 *   spacing: { 4: '1rem', 8: '2rem' },
 * }
 * ```
 */
export interface ThemeConfig {
  /** Optional theme name. Defaults to `'default'` which targets `:root`. Any other name targets `[data-theme="<name>"]`. */
  name?: string
  /** Color palette scales, keyed by color name, then by shade (e.g., `{ blue: { 500: '#3b82f6' } }`). */
  colors?: Record<string, Record<string | number, string>>
  /** Spacing scale, keyed by size token (e.g., `{ 4: '1rem', 8: '2rem' }`). */
  spacing?: Record<string | number, string>
  /** Typography tokens for text sizes and font weights. */
  typography?: {
    /** Named text size presets with `fontSize` and `lineHeight` values. */
    textSizes?: Record<string, { fontSize: string; lineHeight: string }>
    /** Named font weight presets (e.g., `{ bold: '700' }`). */
    fontWeights?: Record<string, string>
  }
  /** Named border style tokens (e.g., `{ default: '1px solid #e5e7eb' }`). */
  borders?: Record<string, string>
  /** Named box-shadow tokens (e.g., `{ md: '0 4px 6px rgba(0,0,0,0.1)' }`). */
  shadows?: Record<string, string>
}

/**
 * The result returned by {@link createTheme}.
 *
 * Contains the generated CSS text for injection and a `vars` object whose
 * values are `var(--twc-...)` references ready to pass to style utilities.
 */
export interface ThemeResult {
  /** The theme name, matching the `name` from {@link ThemeConfig} (defaults to `'default'`). */
  name: string
  /**
   * A complete CSS rule string containing all custom property declarations.
   *
   * For the default theme this targets `:root`; for named themes it targets
   * `[data-theme="<name>"]`. Inject with {@link injectTheme}.
   */
  cssText: string
  /** Type-safe accessor whose leaf values are `var(--twc-...)` CSS references. */
  vars: ThemeVars
}

/**
 * Type-safe map of CSS `var()` references generated from a {@link ThemeConfig}.
 *
 * Every leaf value is a string like `var(--twc-color-blue-500)` that can be
 * passed directly to style utilities such as `bg()`, `color()`, and `p()`.
 *
 * @example
 * ```ts
 * const { vars } = createTheme({ colors: { blue: { 500: '#3b82f6' } } })
 * vars.colors.blue[500] // "var(--twc-color-blue-500)"
 *
 * // Use in style utilities:
 * cx(bg(vars.colors.blue[500]))
 * ```
 */
export interface ThemeVars {
  /** Color `var()` references, organized by color name and shade. */
  colors: Record<string, Record<string | number, string>>
  /** Spacing `var()` references, keyed by size token. */
  spacing: Record<string | number, string>
  /** Typography `var()` references for text sizes and font weights. */
  typography: {
    /** Text size `var()` references with `fontSize` and `lineHeight` keys. */
    textSizes: Record<string, { fontSize: string; lineHeight: string }>
    /** Font weight `var()` references keyed by weight name. */
    fontWeights: Record<string, string>
  }
  /** Border `var()` references keyed by border name. */
  borders: Record<string, string>
  /** Shadow `var()` references keyed by shadow name. */
  shadows: Record<string, string>
}

/**
 * Builds a CSS custom property name from the given path segments.
 *
 * @internal
 * @param parts - One or more name segments to join with hyphens.
 * @returns A CSS custom property name in the form `--twc-<parts joined by ->`.
 */
function varName(...parts: (string | number)[]): string {
  return `--twc-${parts.join('-')}`
}

/**
 * Wraps a CSS custom property name in a `var()` reference.
 *
 * @internal
 * @param name - The full custom property name (e.g., `--twc-color-blue-500`).
 * @returns A CSS `var()` expression (e.g., `var(--twc-color-blue-500)`).
 */
function varRef(name: string): string {
  return `var(${name})`
}

/**
 * Creates a theme from a configuration of design tokens.
 *
 * Converts all token values into CSS custom properties and returns:
 * - `cssText`: a string ready to inject into a `<style>` element via {@link injectTheme}
 * - `vars`: a mirrored object whose leaf values are `var(--twc-...)` references,
 *   suitable for passing directly into style utilities like `bg()`, `color()`, `p()`, etc.
 *
 * The default theme (no `name` or `name: 'default'`) targets the `:root` selector.
 * Named themes target `[data-theme="<name>"]` and can be activated with {@link setTheme}.
 *
 * @param config - The theme configuration containing design tokens.
 * @returns A {@link ThemeResult} with `name`, `cssText`, and `vars`.
 *
 * @example
 * ```ts
 * import { createTheme, injectTheme } from 'typewritingclass/theme'
 * import { cx, bg, p } from 'typewritingclass'
 *
 * const { cssText, vars } = createTheme({
 *   name: 'light',
 *   colors: {
 *     blue: { 500: '#3b82f6', 600: '#2563eb' },
 *     gray: { 100: '#f3f4f6', 900: '#111827' },
 *   },
 *   spacing: { 4: '1rem', 8: '2rem' },
 *   shadows: { md: '0 4px 6px rgba(0,0,0,0.1)' },
 * })
 *
 * // Inject the generated CSS custom properties into the document
 * injectTheme(cssText)
 *
 * // Use vars in style utilities — they resolve to var(--twc-...) references
 * cx(bg(vars.colors.blue[500]), p(vars.spacing[4]))
 * // CSS: .abc { background-color: var(--twc-color-blue-500); padding: var(--twc-spacing-4); }
 * ```
 */
export function createTheme(config: ThemeConfig): ThemeResult {
  const name = config.name ?? 'default'
  const properties: string[] = []

  // Build vars proxy objects that resolve to var() references
  const colorVars: Record<string, Record<string | number, string>> = {}
  const spacingVars: Record<string | number, string> = {}
  const typographyVars: ThemeVars['typography'] = { textSizes: {}, fontWeights: {} }
  const borderVars: Record<string, string> = {}
  const shadowVars: Record<string, string> = {}

  // Colors
  if (config.colors) {
    for (const [colorName, scale] of Object.entries(config.colors)) {
      colorVars[colorName] = {}
      for (const [shade, hex] of Object.entries(scale)) {
        const vn = varName('color', colorName, shade)
        properties.push(`  ${vn}: ${hex};`)
        colorVars[colorName][shade] = varRef(vn)
      }
    }
  }

  // Spacing
  if (config.spacing) {
    for (const [key, value] of Object.entries(config.spacing)) {
      const vn = varName('spacing', key)
      properties.push(`  ${vn}: ${value};`)
      spacingVars[key] = varRef(vn)
    }
  }

  // Typography
  if (config.typography?.textSizes) {
    for (const [sizeName, size] of Object.entries(config.typography.textSizes)) {
      const fsvn = varName('text', sizeName, 'fs')
      const lhvn = varName('text', sizeName, 'lh')
      properties.push(`  ${fsvn}: ${size.fontSize};`)
      properties.push(`  ${lhvn}: ${size.lineHeight};`)
      typographyVars.textSizes[sizeName] = {
        fontSize: varRef(fsvn),
        lineHeight: varRef(lhvn),
      }
    }
  }
  if (config.typography?.fontWeights) {
    for (const [weightName, weight] of Object.entries(config.typography.fontWeights)) {
      const vn = varName('font', weightName)
      properties.push(`  ${vn}: ${weight};`)
      typographyVars.fontWeights[weightName] = varRef(vn)
    }
  }

  // Borders
  if (config.borders) {
    for (const [borderName, value] of Object.entries(config.borders)) {
      const vn = varName('border', borderName)
      properties.push(`  ${vn}: ${value};`)
      borderVars[borderName] = varRef(vn)
    }
  }

  // Shadows
  if (config.shadows) {
    for (const [shadowName, value] of Object.entries(config.shadows)) {
      const vn = varName('shadow', shadowName)
      properties.push(`  ${vn}: ${value};`)
      shadowVars[shadowName] = varRef(vn)
    }
  }

  // Build CSS text
  const selector = name === 'default' ? ':root' : `[data-theme="${name}"]`
  const cssText = properties.length > 0
    ? `${selector} {\n${properties.join('\n')}\n}`
    : ''

  return {
    name,
    cssText,
    vars: {
      colors: colorVars,
      spacing: spacingVars,
      typography: typographyVars,
      borders: borderVars,
      shadows: shadowVars,
    },
  }
}
