import { describe, it, expect, beforeEach } from 'vitest'
import { register, generateCSS, clearRegistry, getRegistry } from '../src/registry.ts'
import { createRule } from '../src/rule.ts'

describe('registry', () => {
  beforeEach(() => {
    clearRegistry()
  })

  it('registers a new rule', () => {
    const rule = createRule({ color: 'red' })
    register('_abc', rule, 0)
    expect(getRegistry().size).toBe(1)
  })

  it('deduplicates identical class names', () => {
    const rule = createRule({ color: 'red' })
    register('_abc', rule, 0)
    register('_abc', rule, 0)
    expect(getRegistry().size).toBe(1)
  })

  it('generateCSS wraps in @layer twc', () => {
    const rule = createRule({ color: 'red' })
    register('_test1', rule, 0)
    const css = generateCSS()
    expect(css).toContain('@layer twc')
    expect(css).toContain('._test1')
    expect(css).toContain('color: red')
  })

  it('generateCSS orders by layer', () => {
    register('_b', createRule({ color: 'blue' }), 1)
    register('_a', createRule({ color: 'red' }), 0)
    const css = generateCSS()
    const aPos = css.indexOf('._a')
    const bPos = css.indexOf('._b')
    expect(aPos).toBeLessThan(bPos)
  })

  it('generateCSS renders selectors', () => {
    const rule = { ...createRule({ color: 'red' }), selectors: [':hover'] }
    register('_hov', rule, 0)
    const css = generateCSS()
    expect(css).toContain('._hov:hover')
  })

  it('generateCSS renders media queries', () => {
    const rule = { ...createRule({ color: 'red' }), mediaQueries: ['(min-width: 768px)'] }
    register('_mq', rule, 0)
    const css = generateCSS()
    expect(css).toContain('@media (min-width: 768px)')
    expect(css).toContain('._mq')
  })

  it('returns empty string for empty registry', () => {
    expect(generateCSS()).toBe('')
  })
})
