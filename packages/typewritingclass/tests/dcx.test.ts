import { describe, it, expect, beforeEach } from 'vitest'
import { dcx } from '../src/dcx.ts'
import { _resetLayer } from '../src/layer.ts'
import { _resetDynamicCounter, dynamic } from '../src/dynamic.ts'
import { clearRegistry, generateCSS } from '../src/registry.ts'
import { createRule, createDynamicRule } from '../src/rule.ts'
import { bg, textColor, p } from '../src/utilities/index.ts'

describe('dcx()', () => {
  beforeEach(() => {
    clearRegistry()
    _resetLayer()
    _resetDynamicCounter()
  })

  it('returns className and style for static rules', () => {
    const result = dcx(createRule({ color: 'red' }))
    expect(result.className).toMatch(/^_[a-z0-9]+$/)
    expect(result.style).toEqual({})
  })

  it('passes through raw strings', () => {
    const result = dcx('my-class')
    expect(result.className).toBe('my-class')
    expect(result.style).toEqual({})
  })

  it('collects dynamic bindings into style', () => {
    const rule = createDynamicRule(
      { 'background-color': 'var(--twc-d0)' },
      { '--twc-d0': '#ff0000' },
    )
    const result = dcx(rule)
    expect(result.className).toMatch(/^_[a-z0-9]+$/)
    expect(result.style).toEqual({ '--twc-d0': '#ff0000' })
  })

  it('mixes static and dynamic rules', () => {
    const staticRule = createRule({ padding: '1rem' })
    const dynamicRule = createDynamicRule(
      { 'background-color': 'var(--twc-d0)' },
      { '--twc-d0': '#ff0000' },
    )
    const result = dcx(staticRule, dynamicRule)
    const classes = result.className.split(' ')
    expect(classes).toHaveLength(2)
    expect(result.style).toEqual({ '--twc-d0': '#ff0000' })
  })

  it('works with utility functions that accept dynamic values', () => {
    const d = dynamic('#3b82f6')
    const result = dcx(p(4), bg(d))
    const classes = result.className.split(' ')
    expect(classes).toHaveLength(2)
    expect(result.style).toHaveProperty('--twc-d0')
    expect(result.style['--twc-d0']).toBe('#3b82f6')
  })

  it('merges multiple dynamic bindings', () => {
    const d1 = dynamic('#ff0000')
    const d2 = dynamic('#00ff00')
    const result = dcx(bg(d1), textColor(d2))
    expect(Object.keys(result.style)).toHaveLength(2)
    expect(result.style['--twc-d0']).toBe('#ff0000')
    expect(result.style['--twc-d1']).toBe('#00ff00')
  })

  it('generates CSS with var() references for dynamic rules', () => {
    const d = dynamic('#ff0000')
    dcx(bg(d))
    const css = generateCSS()
    expect(css).toContain('var(--twc-d0)')
  })

  it('registers rules in the CSS registry', () => {
    dcx(createRule({ color: 'red' }))
    const css = generateCSS()
    expect(css).toContain('color: red')
  })
})
