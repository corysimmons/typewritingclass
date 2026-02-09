import { describe, it, expect } from 'vitest'
import { loadTheme } from '../src/loadTheme.ts'

describe('loadTheme', () => {
  it('returns a ThemeInput object', async () => {
    const theme = await loadTheme()
    expect(theme).toBeDefined()
    expect(typeof theme).toBe('object')
  })

  it('has all required string fields', async () => {
    const theme = await loadTheme()
    const fields = [
      'colors', 'namedColors', 'spacing', 'textSizes',
      'fontWeights', 'fontFamilies', 'radii', 'shadows', 'sizes',
      'defaultRadius', 'defaultShadow',
    ]
    for (const field of fields) {
      expect(theme).toHaveProperty(field)
      expect(typeof (theme as any)[field]).toBe('string')
    }
  })

  it('colors contains valid JSON with all 22 color scales', async () => {
    const theme = await loadTheme()
    const colors = JSON.parse(theme.colors)
    const expectedScales = [
      'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber',
      'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue',
      'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
    ]
    for (const scale of expectedScales) {
      expect(colors).toHaveProperty(scale)
      expect(typeof colors[scale]).toBe('object')
    }
  })

  it('each color scale has shade values', async () => {
    const theme = await loadTheme()
    const colors = JSON.parse(theme.colors)
    const blueScale = colors['blue']
    // Should have shades 50-950
    expect(blueScale).toHaveProperty('50')
    expect(blueScale).toHaveProperty('500')
    expect(blueScale).toHaveProperty('900')
    // Values should be hex strings
    expect(blueScale['500']).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('namedColors contains white, black, transparent, currentColor', async () => {
    const theme = await loadTheme()
    const namedColors = JSON.parse(theme.namedColors)
    expect(namedColors).toHaveProperty('white')
    expect(namedColors).toHaveProperty('black')
    expect(namedColors).toHaveProperty('transparent')
    expect(namedColors).toHaveProperty('currentColor')
  })

  it('spacing contains valid JSON with scale values', async () => {
    const theme = await loadTheme()
    const spacing = JSON.parse(theme.spacing)
    expect(typeof spacing).toBe('object')
    // Should have some standard spacing values
    expect(Object.keys(spacing).length).toBeGreaterThan(0)
  })

  it('textSizes contains valid JSON with standard sizes', async () => {
    const theme = await loadTheme()
    const textSizes = JSON.parse(theme.textSizes)
    const expectedSizes = ['xs', 'sm', 'base', 'lg', 'xl']
    for (const size of expectedSizes) {
      expect(textSizes).toHaveProperty(size)
      expect(textSizes[size]).toHaveProperty('fontSize')
      expect(textSizes[size]).toHaveProperty('lineHeight')
    }
  })

  it('fontWeights contains valid JSON', async () => {
    const theme = await loadTheme()
    const fontWeights = JSON.parse(theme.fontWeights)
    expect(typeof fontWeights).toBe('object')
    // Should have standard font weights
    expect(Object.keys(fontWeights).length).toBeGreaterThan(0)
  })

  it('fontFamilies contains valid JSON', async () => {
    const theme = await loadTheme()
    const fontFamilies = JSON.parse(theme.fontFamilies)
    expect(typeof fontFamilies).toBe('object')
  })

  it('radii contains valid JSON with standard values', async () => {
    const theme = await loadTheme()
    const radii = JSON.parse(theme.radii)
    expect(radii).toHaveProperty('sm')
    expect(radii).toHaveProperty('md')
    expect(radii).toHaveProperty('lg')
    expect(radii).toHaveProperty('full')
  })

  it('shadows contains valid JSON with standard values', async () => {
    const theme = await loadTheme()
    const shadows = JSON.parse(theme.shadows)
    expect(shadows).toHaveProperty('sm')
    expect(shadows).toHaveProperty('md')
    expect(shadows).toHaveProperty('lg')
  })

  it('sizes contains valid JSON', async () => {
    const theme = await loadTheme()
    const sizes = JSON.parse(theme.sizes)
    expect(typeof sizes).toBe('object')
  })

  it('defaultRadius is a valid CSS value', async () => {
    const theme = await loadTheme()
    expect(theme.defaultRadius).toMatch(/^\d+(\.\d+)?(rem|px|em)$/)
  })

  it('defaultShadow is a valid CSS shadow value', async () => {
    const theme = await loadTheme()
    expect(theme.defaultShadow).toContain('rgb')
  })
})
