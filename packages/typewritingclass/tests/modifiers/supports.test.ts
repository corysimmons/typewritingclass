import { describe, it, expect } from 'vitest'
import { supports } from '../../src/modifiers/supports.ts'
import { createRule } from '../../src/rule.ts'

describe('supports modifier', () => {
  const rule = createRule({ display: 'grid' })

  it('adds supportsQuery to rule', () => {
    const modifier = supports('(display: grid)')
    const result = modifier(rule)
    expect(result.supportsQueries).toEqual(['(display: grid)'])
  })

  it('preserves declarations', () => {
    const modifier = supports('(display: grid)')
    expect(modifier(rule).declarations).toEqual({ display: 'grid' })
  })

  it('preserves existing selectors and media queries', () => {
    const modified = { ...rule, selectors: [':hover'], mediaQueries: ['(min-width: 768px)'] }
    const modifier = supports('(display: grid)')
    const result = modifier(modified)
    expect(result.selectors).toEqual([':hover'])
    expect(result.mediaQueries).toEqual(['(min-width: 768px)'])
    expect(result.supportsQueries).toEqual(['(display: grid)'])
  })
})
