export interface ThemeConfig {
  name?: string
  colors?: Record<string, Record<string | number, string>>
  spacing?: Record<string | number, string>
  typography?: {
    textSizes?: Record<string, { fontSize: string; lineHeight: string }>
    fontWeights?: Record<string, string>
  }
  borders?: Record<string, string>
  shadows?: Record<string, string>
}

export interface ThemeResult {
  name: string
  cssText: string
  vars: ThemeVars
}

export interface ThemeVars {
  colors: Record<string, Record<string | number, string>>
  spacing: Record<string | number, string>
  typography: {
    textSizes: Record<string, { fontSize: string; lineHeight: string }>
    fontWeights: Record<string, string>
  }
  borders: Record<string, string>
  shadows: Record<string, string>
}

function varName(...parts: (string | number)[]): string {
  return `--twc-${parts.join('-')}`
}

function varRef(name: string): string {
  return `var(${name})`
}

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
