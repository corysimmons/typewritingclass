import { describe, it, expect, beforeEach } from 'vitest'
import { register, generateCSS, clearRegistry, getRegistry, onChange } from '../src/registry.ts'
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

  it('generateCSS renders rules', () => {
    const rule = createRule({ color: 'red' })
    register('_test1', rule, 0)
    const css = generateCSS()
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

  it('generateCSS renders @supports queries', () => {
    const rule = { ...createRule({ display: 'grid' }), supportsQueries: ['(display: grid)'] }
    register('_sq', rule, 0)
    const css = generateCSS()
    expect(css).toContain('@supports (display: grid)')
    expect(css).toContain('._sq')
  })

  it('returns empty string for empty registry', () => {
    expect(generateCSS()).toBe('')
  })

  it('onChange listener is called when a rule is registered', () => {
    let callCount = 0
    onChange(() => { callCount++ })
    const rule = createRule({ color: 'red' })
    register('_onChange1', rule, 0)
    expect(callCount).toBe(1)
  })

  it('onChange returns an unsubscribe function that removes the listener', () => {
    let callCount = 0
    const unsubscribe = onChange(() => { callCount++ })
    const rule1 = createRule({ color: 'red' })
    register('_unsub1', rule1, 0)
    expect(callCount).toBe(1)

    // Unsubscribe
    unsubscribe()

    // Register another rule — listener should NOT fire again
    const rule2 = createRule({ color: 'blue' })
    register('_unsub2', rule2, 1)
    expect(callCount).toBe(1)
  })
})
