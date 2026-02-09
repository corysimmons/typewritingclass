// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('injectTheme (browser)', () => {
  beforeEach(() => {
    document.getElementById('twc-theme')?.remove()
    // Reset module cache to clear the cached themeStyleEl reference
    vi.resetModules()
  })

  it('creates a <style id="twc-theme"> element and injects CSS', async () => {
    const { injectTheme } = await import('../src/theme/inject-theme.ts')
    injectTheme(':root { --color: red; }')
    const el = document.getElementById('twc-theme')
    expect(el).toBeTruthy()
    expect(el?.tagName).toBe('STYLE')
    expect(el?.textContent).toBe(':root { --color: red; }')
  })

  it('appends the style element to document.head', async () => {
    const { injectTheme } = await import('../src/theme/inject-theme.ts')
    injectTheme('body { color: blue; }')
    const el = document.getElementById('twc-theme')
    expect(el?.parentNode).toBe(document.head)
  })

  it('appends multiple themes to the same element', async () => {
    const { injectTheme } = await import('../src/theme/inject-theme.ts')
    injectTheme('[data-theme="light"] { --color: white; }')
    injectTheme('[data-theme="dark"] { --color: black; }')
    const el = document.getElementById('twc-theme')
    expect(el?.textContent).toContain('light')
    expect(el?.textContent).toContain('dark')
  })

  it('separates appended themes with a newline', async () => {
    const { injectTheme } = await import('../src/theme/inject-theme.ts')
    injectTheme('first')
    injectTheme('second')
    const el = document.getElementById('twc-theme')
    expect(el?.textContent).toBe('first\nsecond')
  })

  it('reuses existing style element on subsequent calls', async () => {
    const { injectTheme } = await import('../src/theme/inject-theme.ts')
    injectTheme('a')
    injectTheme('b')
    const all = document.querySelectorAll('#twc-theme')
    expect(all.length).toBe(1)
  })
})

describe('setTheme (browser)', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme')
    vi.resetModules()
  })

  it('sets data-theme attribute on documentElement', async () => {
    const { setTheme } = await import('../src/theme/inject-theme.ts')
    setTheme('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('can switch themes', async () => {
    const { setTheme } = await import('../src/theme/inject-theme.ts')
    setTheme('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    setTheme('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('overwrites previous data-theme value', async () => {
    const { setTheme } = await import('../src/theme/inject-theme.ts')
    setTheme('a')
    setTheme('b')
    setTheme('c')
    expect(document.documentElement.getAttribute('data-theme')).toBe('c')
  })
})
