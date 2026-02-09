import { describe, it, expect } from 'vitest'
import { getStyleSheet, getStyleTag } from '../src/server.ts'
import { generateCSS, p, bg, cx } from 'typewritingclass'

describe('getStyleSheet', () => {
  it('returns the same result as generateCSS()', () => {
    // Register a rule via the public API
    cx(p(4))
    expect(getStyleSheet()).toBe(generateCSS())
  })

  it('returns a string', () => {
    expect(typeof getStyleSheet()).toBe('string')
  })

  it('contains CSS after registering rules', () => {
    cx(bg('blue-500'))
    const css = getStyleSheet()
    expect(css).toContain('background-color')
  })
})

describe('getStyleTag', () => {
  it('wraps CSS in a style tag with data-twc attribute', () => {
    cx(p(4))
    const tag = getStyleTag()
    expect(tag).toMatch(/^<style data-twc>[\s\S]*<\/style>$/)
  })

  it('contains the same CSS as getStyleSheet()', () => {
    const css = getStyleSheet()
    const tag = getStyleTag()
    expect(tag).toBe(`<style data-twc>${css}</style>`)
  })

  it('returns a string', () => {
    expect(typeof getStyleTag()).toBe('string')
  })
})
