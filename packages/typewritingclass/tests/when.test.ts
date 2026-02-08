import { describe, it, expect } from 'vitest'
import { when } from '../src/when.ts'
import { createRule, wrapWithSelector, wrapWithMediaQuery } from '../src/rule.ts'
import type { Modifier } from '../src/types.ts'

describe('when', () => {
  const hoverMod: Modifier = (rule) => wrapWithSelector(rule, ':hover')
  const mdMod: Modifier = (rule) => wrapWithMediaQuery(rule, '(min-width: 768px)')

  it('applies a single modifier', () => {
    const rule = when(hoverMod)(createRule({ color: 'red' }))
    expect(rule.selectors).toEqual([':hover'])
    expect(rule.declarations).toEqual({ color: 'red' })
  })

  it('combines multiple rules', () => {
    const rule = when(hoverMod)(
      createRule({ color: 'red' }),
      createRule({ padding: '1rem' }),
    )
    expect(rule.declarations).toEqual({ color: 'red', padding: '1rem' })
    expect(rule.selectors).toEqual([':hover'])
  })

  it('stacks multiple modifiers', () => {
    const rule = when(mdMod, hoverMod)(createRule({ color: 'red' }))
    expect(rule.selectors).toEqual([':hover'])
    expect(rule.mediaQueries).toEqual(['(min-width: 768px)'])
  })

  it('returns a valid StyleRule', () => {
    const rule = when(hoverMod)(createRule({ color: 'red' }))
    expect(rule._tag).toBe('StyleRule')
  })

  it('supports partial application pattern', () => {
    const hoverStyles = when(hoverMod)
    const rule = hoverStyles(createRule({ color: 'blue' }))
    expect(rule.selectors).toEqual([':hover'])
    expect(rule.declarations).toEqual({ color: 'blue' })
  })
})
