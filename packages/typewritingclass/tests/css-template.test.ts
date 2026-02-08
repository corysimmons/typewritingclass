import { describe, it, expect, beforeEach } from 'vitest'
import { css } from '../src/css.ts'
import { dynamic, _resetDynamicCounter } from '../src/dynamic.ts'

describe('css() tagged template literal', () => {
  beforeEach(() => {
    _resetDynamicCounter()
  })

  it('parses a single declaration', () => {
    const rule = css`color: red`
    expect(rule._tag).toBe('StyleRule')
    expect(rule.declarations).toEqual({ color: 'red' })
  })

  it('parses multiple declarations', () => {
    const rule = css`color: red; font-size: 16px`
    expect(rule.declarations).toEqual({
      color: 'red',
      'font-size': '16px',
    })
  })

  it('handles trailing semicolons', () => {
    const rule = css`color: red;`
    expect(rule.declarations).toEqual({ color: 'red' })
  })

  it('handles multi-line templates', () => {
    const rule = css`
      color: red;
      font-size: 16px;
      line-height: 1.5;
    `
    expect(rule.declarations).toEqual({
      color: 'red',
      'font-size': '16px',
      'line-height': '1.5',
    })
  })

  it('handles complex CSS values (clip-path)', () => {
    const rule = css`clip-path: polygon(50% 0%, 0% 100%, 100% 100%)`
    expect(rule.declarations['clip-path']).toBe('polygon(50% 0%, 0% 100%, 100% 100%)')
  })

  it('supports static interpolations', () => {
    const size = '16px'
    const rule = css`font-size: ${size}`
    expect(rule.declarations['font-size']).toBe('16px')
  })

  it('supports dynamic interpolations', () => {
    const color = dynamic('#ff0000')
    const rule = css`background-color: ${color}`
    expect(rule.declarations['background-color']).toBe('var(--twc-d0)')
    expect(rule.dynamicBindings).toEqual({ '--twc-d0': '#ff0000' })
  })

  it('mixes static and dynamic interpolations', () => {
    const color = dynamic('#ff0000')
    const rule = css`
      font-size: 16px;
      background-color: ${color};
      padding: 1rem;
    `
    expect(rule.declarations['font-size']).toBe('16px')
    expect(rule.declarations['background-color']).toBe('var(--twc-d0)')
    expect(rule.declarations.padding).toBe('1rem')
    expect(rule.dynamicBindings).toEqual({ '--twc-d0': '#ff0000' })
  })

  it('returns no dynamicBindings when all interpolations are static', () => {
    const rule = css`color: ${'red'}; font-size: ${16}px`
    expect(rule.dynamicBindings).toBeUndefined()
  })

  it('still works with object overload', () => {
    const rule = css({ color: 'red', 'font-size': '16px' })
    expect(rule.declarations).toEqual({ color: 'red', 'font-size': '16px' })
    expect(rule.dynamicBindings).toBeUndefined()
  })
})
