import type { ThemeInput } from '../index.d.ts'

/**
 * Load theme data from the typewritingclass package.
 * This dynamically imports the theme modules so values come from the TS source,
 * not hardcoded in the compiler.
 */
export async function loadTheme(): Promise<ThemeInput> {
  // Import all theme modules from the TS package
  const [colorsModule, spacingModule, typographyModule, sizesModule, shadowsModule, bordersModule] =
    await Promise.all([
      import('typewritingclass/theme/colors'),
      import('typewritingclass/theme'),
      import('typewritingclass/theme/typography'),
      import('typewritingclass/theme/sizes'),
      import('typewritingclass/theme/shadows'),
      import('typewritingclass/theme/borders'),
    ])

  // Build color scales map
  const colorScaleNames = [
    'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber',
    'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue',
    'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
  ]
  const colors: Record<string, Record<string, string>> = {}
  for (const name of colorScaleNames) {
    const scale = (colorsModule as Record<string, any>)[name]
    if (scale && typeof scale === 'object') {
      colors[name] = {}
      for (const [shade, hex] of Object.entries(scale)) {
        colors[name][String(shade)] = hex as string
      }
    }
  }

  // Named colors
  const namedColors: Record<string, string> = {
    white: colorsModule.white,
    black: colorsModule.black,
    transparent: colorsModule.transparent,
    currentColor: colorsModule.currentColor,
  }

  // Spacing scale
  const { spacing: spacingNs } = spacingModule as any
  const spacing: Record<string, string> = {}
  if (spacingNs && spacingNs.spacingScale) {
    for (const [key, val] of Object.entries(spacingNs.spacingScale)) {
      spacing[String(key)] = val as string
    }
  }

  // Text sizes
  const textSizeNames = ['xs', 'sm', 'base', 'lg', 'xl', '_2xl', '_3xl', '_4xl', '_5xl', '_6xl', '_7xl', '_8xl', '_9xl']
  const textSizes: Record<string, { fontSize: string; lineHeight: string }> = {}
  for (const name of textSizeNames) {
    const token = (typographyModule as Record<string, any>)[name]
    if (token && typeof token === 'object' && 'fontSize' in token) {
      textSizes[name] = { fontSize: token.fontSize, lineHeight: token.lineHeight }
    }
  }

  // Font weights
  const weightNames = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black_']
  const fontWeights: Record<string, string> = {}
  for (const name of weightNames) {
    const val = (typographyModule as Record<string, any>)[name]
    if (typeof val === 'string') {
      fontWeights[name] = val
    }
  }

  // Font families
  const fontFamiliesObj = (typographyModule as Record<string, any>).fontFamilies
  const fontFamilies: Record<string, string> = {}
  if (fontFamiliesObj && typeof fontFamiliesObj === 'object') {
    for (const [key, val] of Object.entries(fontFamiliesObj)) {
      fontFamilies[key] = val as string
    }
  }

  // Border radii
  const radiusNames = ['none', 'sm', 'DEFAULT', 'md', 'lg', 'xl', '_2xl', '_3xl', 'full']
  const radii: Record<string, string> = {}
  for (const name of radiusNames) {
    const val = (bordersModule as Record<string, any>)[name]
    if (typeof val === 'string') {
      radii[name] = val
    }
  }

  // Shadows
  const shadowNames = ['sm', 'DEFAULT', 'md', 'lg', 'xl', '_2xl', 'inner', 'none']
  const shadows: Record<string, string> = {}
  for (const name of shadowNames) {
    const val = (shadowsModule as Record<string, any>)[name]
    if (typeof val === 'string') {
      shadows[name] = val
    }
  }

  // Sizes
  const sizeNames = ['full', 'screen', 'screenH', 'min', 'max', 'fit', 'auto']
  const sizes: Record<string, string> = {}
  for (const name of sizeNames) {
    const val = (sizesModule as Record<string, any>)[name]
    if (typeof val === 'string') {
      sizes[name] = val
    }
  }

  return {
    colors: JSON.stringify(colors),
    namedColors: JSON.stringify(namedColors),
    spacing: JSON.stringify(spacing),
    textSizes: JSON.stringify(textSizes),
    fontWeights: JSON.stringify(fontWeights),
    fontFamilies: JSON.stringify(fontFamilies),
    radii: JSON.stringify(radii),
    shadows: JSON.stringify(shadows),
    sizes: JSON.stringify(sizes),
    defaultRadius: radii['DEFAULT'] ?? '0.25rem',
    defaultShadow: shadows['DEFAULT'] ?? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  }
}
