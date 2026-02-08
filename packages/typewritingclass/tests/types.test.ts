import { describe, it, expect } from 'vitest'
import { createRule } from '../src/rule.ts'
import type { StyleRule } from '../src/types.ts'

describe('StyleRule', () => {
  it('createRule returns a valid StyleRule', () => {
    const rule = createRule({ color: 'red' })
    expect(rule._tag).toBe('StyleRule')
    expect(rule.declarations).toEqual({ color: 'red' })
    expect(rule.selectors).toEqual([])
    expect(rule.mediaQueries).toEqual([])
  })

  it('has correct shape with multiple declarations', () => {
    const rule = createRule({ color: 'red', 'font-size': '16px' })
    expect(rule.declarations).toEqual({ color: 'red', 'font-size': '16px' })
  })

  it('satisfies StyleRule type', () => {
    const rule: StyleRule = {
      _tag: 'StyleRule',
      declarations: { padding: '1rem' },
      selectors: [':hover'],
      mediaQueries: ['(min-width: 768px)'],
    }
    expect(rule._tag).toBe('StyleRule')
  })
})
