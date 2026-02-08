import { describe, it, expect } from 'vitest'
import { createTheme } from '../src/theme/createTheme.ts'

describe('createTheme()', () => {
  it('generates CSS custom properties for colors', () => {
    const theme = createTheme({
      name: 'dark',
      colors: {
        primary: { 500: '#818cf8', 600: '#6366f1' },
      },
    })
    expect(theme.cssText).toContain('[data-theme="dark"]')
    expect(theme.cssText).toContain('--twc-color-primary-500: #818cf8')
    expect(theme.cssText).toContain('--twc-color-primary-600: #6366f1')
  })

  it('returns var() references in vars.colors', () => {
    const theme = createTheme({
      name: 'dark',
      colors: {
        primary: { 500: '#818cf8' },
      },
    })
    expect(theme.vars.colors.primary[500]).toBe('var(--twc-color-primary-500)')
  })

  it('uses :root selector for default theme', () => {
    const theme = createTheme({
      colors: {
        primary: { 500: '#3b82f6' },
      },
    })
    expect(theme.name).toBe('default')
    expect(theme.cssText).toContain(':root')
    expect(theme.cssText).not.toContain('data-theme')
  })

  it('generates spacing custom properties', () => {
    const theme = createTheme({
      name: 'compact',
      spacing: { 4: '0.75rem', 8: '1.5rem' },
    })
    expect(theme.cssText).toContain('--twc-spacing-4: 0.75rem')
    expect(theme.cssText).toContain('--twc-spacing-8: 1.5rem')
    expect(theme.vars.spacing[4]).toBe('var(--twc-spacing-4)')
  })

  it('generates typography custom properties', () => {
    const theme = createTheme({
      name: 'test',
      typography: {
        textSizes: {
          lg: { fontSize: '1.25rem', lineHeight: '2rem' },
        },
        fontWeights: {
          bold: '800',
        },
      },
    })
    expect(theme.cssText).toContain('--twc-text-lg-fs: 1.25rem')
    expect(theme.cssText).toContain('--twc-text-lg-lh: 2rem')
    expect(theme.cssText).toContain('--twc-font-bold: 800')
    expect(theme.vars.typography.textSizes.lg.fontSize).toBe('var(--twc-text-lg-fs)')
    expect(theme.vars.typography.fontWeights.bold).toBe('var(--twc-font-bold)')
  })

  it('generates border custom properties', () => {
    const theme = createTheme({
      name: 'rounded',
      borders: { DEFAULT: '0.5rem', lg: '1rem' },
    })
    expect(theme.cssText).toContain('--twc-border-DEFAULT: 0.5rem')
    expect(theme.vars.borders.DEFAULT).toBe('var(--twc-border-DEFAULT)')
  })

  it('generates shadow custom properties', () => {
    const theme = createTheme({
      name: 'elevated',
      shadows: { md: '0 4px 6px rgba(0,0,0,0.1)' },
    })
    expect(theme.cssText).toContain('--twc-shadow-md: 0 4px 6px rgba(0,0,0,0.1)')
    expect(theme.vars.shadows.md).toBe('var(--twc-shadow-md)')
  })

  it('returns empty cssText for empty config', () => {
    const theme = createTheme({ name: 'empty' })
    expect(theme.cssText).toBe('')
  })

  it('preserves theme name', () => {
    const theme = createTheme({ name: 'mytheme' })
    expect(theme.name).toBe('mytheme')
  })

  it('combines multiple token types', () => {
    const theme = createTheme({
      name: 'full',
      colors: { primary: { 500: '#000' } },
      spacing: { 4: '1rem' },
      shadows: { sm: '0 1px 2px #000' },
    })
    expect(theme.cssText).toContain('--twc-color-primary-500')
    expect(theme.cssText).toContain('--twc-spacing-4')
    expect(theme.cssText).toContain('--twc-shadow-sm')
  })
})
