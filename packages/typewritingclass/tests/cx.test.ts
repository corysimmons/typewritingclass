import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cx, _resetLayer } from '../src/cx.ts'
import { clearRegistry, generateCSS } from '../src/registry.ts'
import { createRule } from '../src/rule.ts'
import type { StyleRule } from '../src/types.ts'

function ruleWithMedia(declarations: Record<string, string>, mediaQueries: string[]): StyleRule {
  return { _tag: 'StyleRule', declarations, selectors: [], mediaQueries, supportsQueries: [] }
}

describe('cx', () => {
  beforeEach(() => {
    clearRegistry()
    _resetLayer()
  })

  it('returns a class name for a style rule', () => {
    const result = cx(createRule({ color: 'red' }))
    expect(result).toMatch(/^_[a-z0-9]+$/)
  })

  it('passes through raw strings', () => {
    const result = cx('my-class')
    expect(result).toBe('my-class')
  })

  it('composes multiple rules into space-separated class names', () => {
    const result = cx(
      createRule({ color: 'red' }),
      createRule({ padding: '1rem' }),
    )
    const classes = result.split(' ')
    expect(classes).toHaveLength(2)
    expect(classes[0]).toMatch(/^_/)
    expect(classes[1]).toMatch(/^_/)
  })

  it('mixes rules and strings', () => {
    const result = cx(
      'static-class',
      createRule({ color: 'red' }),
      'another-class',
    )
    const classes = result.split(' ')
    expect(classes[0]).toBe('static-class')
    expect(classes[1]).toMatch(/^_/)
    expect(classes[2]).toBe('another-class')
  })

  it('registers rules in the CSS registry', () => {
    cx(createRule({ color: 'red' }))
    const css = generateCSS()
    expect(css).toContain('color: red')
  })

  it('later rules get higher layer numbers (override semantics)', () => {
    cx(
      createRule({ color: 'red' }),
      createRule({ color: 'blue' }),
    )
    const css = generateCSS()
    const redPos = css.indexOf('color: red')
    const bluePos = css.indexOf('color: blue')
    expect(redPos).toBeLessThan(bluePos)
  })

  describe('warnConflicts', () => {
    it('warns on same-context same-property conflict like cx(p(4), p(8))', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      cx(createRule({ padding: '1rem' }), createRule({ padding: '2rem' }))
      expect(spy).toHaveBeenCalledOnce()
      expect(spy.mock.calls[0][0]).toContain('cx() conflict')
      expect(spy.mock.calls[0][0]).toContain('"padding"')
      spy.mockRestore()
    })

    it('does not warn for shorthand+longhand refinement (transitionAll + duration)', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      cx(
        createRule({ 'transition-property': 'all', 'transition-duration': '150ms', 'transition-timing-function': 'ease' }),
        createRule({ 'transition-duration': '300ms' }),
      )
      expect(spy).not.toHaveBeenCalled()
      spy.mockRestore()
    })

    it('does not warn for rules in different media query contexts', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      cx(
        createRule({ 'background-color': 'red' }),
        ruleWithMedia({ 'background-color': 'blue' }, ['(min-width: 640px)']),
      )
      expect(spy).not.toHaveBeenCalled()
      spy.mockRestore()
    })

    it('warns on cascade hazard: independent media queries for same property', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      cx(
        ruleWithMedia({ 'background-color': 'blue' }, ['(min-width: 640px)']),
        ruleWithMedia({ 'background-color': 'green' }, ['(prefers-color-scheme: dark)']),
      )
      expect(spy).toHaveBeenCalledOnce()
      expect(spy.mock.calls[0][0]).toContain('cascade hazard')
      expect(spy.mock.calls[0][0]).toContain('.sm(tw.dark(...))')
      spy.mockRestore()
    })

    it('does not warn on cascade hazard when one context is a superset (nested)', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      cx(
        ruleWithMedia({ 'background-color': 'blue' }, ['(min-width: 640px)']),
        ruleWithMedia({ 'background-color': 'green' }, ['(min-width: 640px)', '(prefers-color-scheme: dark)']),
      )
      expect(spy).not.toHaveBeenCalled()
      spy.mockRestore()
    })

    it('deduplicates identical warning messages', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      cx(
        createRule({ padding: '1rem' }),
        createRule({ padding: '2rem' }),
        createRule({ padding: '3rem' }),
      )
      // "padding" conflict between 0&1, then 1&2 — two unique messages
      expect(spy).toHaveBeenCalledTimes(2)
      spy.mockRestore()
    })
  })
})
