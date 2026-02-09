// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('googleFonts (browser)', () => {
  beforeEach(() => {
    // Remove all link elements added by previous tests
    document.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove())
    // Reset module cache to clear the injected Set
    vi.resetModules()
  })

  it('injects a <link> element into document.head', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    googleFonts('Inter')
    const links = document.querySelectorAll('link[rel="stylesheet"]')
    expect(links.length).toBe(1)
    expect(links[0].parentNode).toBe(document.head)
  })

  it('sets the href to a Google Fonts URL', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    googleFonts('Inter')
    const link = document.querySelector('link[rel="stylesheet"]') as HTMLLinkElement
    expect(link.href).toContain('fonts.googleapis.com/css2')
    expect(link.href).toContain('family=Inter')
  })

  it('returns the font family name', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    expect(googleFonts('Roboto')).toBe('Roboto')
  })

  it('includes weights in the URL when provided', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    googleFonts('Roboto', { weights: [400, 700] })
    const link = document.querySelector('link[rel="stylesheet"]') as HTMLLinkElement
    expect(link.href).toContain('wght')
    expect(link.href).toContain('400')
    expect(link.href).toContain('700')
  })

  it('formats weights with semicolons in the URL', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    googleFonts('Roboto', { weights: [300, 400, 700] })
    const link = document.querySelector('link[rel="stylesheet"]') as HTMLLinkElement
    // The URL should contain wght@300;400;700
    expect(link.href).toContain('300')
    expect(link.href).toContain('400')
    expect(link.href).toContain('700')
  })

  it('uses swap as the default display strategy', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    googleFonts('Inter')
    const link = document.querySelector('link[rel="stylesheet"]') as HTMLLinkElement
    expect(link.href).toContain('display=swap')
  })

  it('uses custom display strategy when provided', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    googleFonts('Inter', { display: 'block' })
    const link = document.querySelector('link[rel="stylesheet"]') as HTMLLinkElement
    expect(link.href).toContain('display=block')
  })

  it('does not inject duplicate links for the same family', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    googleFonts('Inter')
    googleFonts('Inter')
    const links = document.querySelectorAll('link[rel="stylesheet"]')
    expect(links.length).toBe(1)
  })

  it('injects separate links for different families', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    googleFonts('Inter')
    googleFonts('Roboto')
    const links = document.querySelectorAll('link[rel="stylesheet"]')
    expect(links.length).toBe(2)
  })

  it('handles font family names with spaces', async () => {
    const { googleFonts } = await import('../src/plugins/googleFonts.ts')
    const result = googleFonts('Open Sans')
    expect(result).toBe('Open Sans')
    const link = document.querySelector('link[rel="stylesheet"]') as HTMLLinkElement
    expect(link.href).toContain('Open+Sans')
  })
})
