import { describe, it, expect } from 'vitest'
import { createRule, createDynamicRule, combineRules } from '../src/rule.ts'

describe('combineRules', () => {
  it('merges declarations from multiple rules', () => {
    const a = createRule({ color: 'red' })
    const b = createRule({ padding: '1rem' })
    const result = combineRules([a, b])
    expect(result.declarations).toEqual({ color: 'red', padding: '1rem' })
  })

  it('merges dynamicBindings from multiple rules', () => {
    const a = createDynamicRule(
      { color: 'var(--twc-d0)' },
      { '--twc-d0': '#ff0000' },
    )
    const b = createDynamicRule(
      { padding: 'var(--twc-d1)' },
      { '--twc-d1': '1rem' },
    )
    const result = combineRules([a, b])
    expect(result.declarations).toEqual({
      color: 'var(--twc-d0)',
      padding: 'var(--twc-d1)',
    })
    expect(result.dynamicBindings).toEqual({
      '--twc-d0': '#ff0000',
      '--twc-d1': '1rem',
    })
  })

  it('merges dynamicBindings when only some rules have them', () => {
    const a = createRule({ color: 'red' })
    const b = createDynamicRule(
      { padding: 'var(--twc-d0)' },
      { '--twc-d0': '2rem' },
    )
    const result = combineRules([a, b])
    expect(result.declarations).toEqual({
      color: 'red',
      padding: 'var(--twc-d0)',
    })
    expect(result.dynamicBindings).toEqual({ '--twc-d0': '2rem' })
  })

  it('omits dynamicBindings when no rules have them', () => {
    const a = createRule({ color: 'red' })
    const b = createRule({ padding: '1rem' })
    const result = combineRules([a, b])
    expect(result.dynamicBindings).toBeUndefined()
  })

  it('merges selectors and media queries', () => {
    const a = { ...createRule({ color: 'red' }), selectors: [':hover'] as string[], mediaQueries: ['(min-width: 768px)'] as string[] }
    const b = { ...createRule({ padding: '1rem' }), selectors: [':focus'] as string[], mediaQueries: ['(min-width: 1024px)'] as string[] }
    const result = combineRules([a, b])
    expect(result.selectors).toEqual([':hover', ':focus'])
    expect(result.mediaQueries).toEqual(['(min-width: 768px)', '(min-width: 1024px)'])
  })

  it('deduplicates selectors and media queries', () => {
    const a = { ...createRule({ color: 'red' }), selectors: [':hover'] as string[], mediaQueries: ['(min-width: 768px)'] as string[] }
    const b = { ...createRule({ padding: '1rem' }), selectors: [':hover'] as string[], mediaQueries: ['(min-width: 768px)'] as string[] }
    const result = combineRules([a, b])
    expect(result.selectors).toEqual([':hover'])
    expect(result.mediaQueries).toEqual(['(min-width: 768px)'])
  })
})
