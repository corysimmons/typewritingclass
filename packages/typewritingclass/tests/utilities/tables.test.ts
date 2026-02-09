import { describe, it, expect } from 'vitest'
import { borderCollapse, borderSeparate, borderSpacing, borderSpacingX, borderSpacingY, tableLayout, captionSide } from '../../src/utilities/tables.ts'
import { dynamic } from '../../src/dynamic.ts'

describe('table utilities', () => {
  it('borderCollapse sets collapse', () => {
    expect(borderCollapse().declarations).toEqual({ 'border-collapse': 'collapse' })
  })

  it('borderSeparate sets separate', () => {
    expect(borderSeparate().declarations).toEqual({ 'border-collapse': 'separate' })
  })

  it('borderSpacing resolves numeric value', () => {
    expect(borderSpacing(4).declarations).toEqual({ 'border-spacing': '1rem' })
  })

  it('borderSpacing passes through string', () => {
    expect(borderSpacing('8px').declarations).toEqual({ 'border-spacing': '8px' })
  })

  it('borderSpacingX sets horizontal spacing', () => {
    expect(borderSpacingX(2).declarations).toEqual({ 'border-spacing': '0.5rem 0' })
  })

  it('borderSpacingY sets vertical spacing', () => {
    expect(borderSpacingY(2).declarations).toEqual({ 'border-spacing': '0 0.5rem' })
  })

  it('tableLayout sets layout', () => {
    expect(tableLayout('fixed').declarations).toEqual({ 'table-layout': 'fixed' })
  })

  it('captionSide sets side', () => {
    expect(captionSide('bottom').declarations).toEqual({ 'caption-side': 'bottom' })
  })

  it('all return valid StyleRules', () => {
    expect(borderCollapse()._tag).toBe('StyleRule')
    expect(tableLayout('auto')._tag).toBe('StyleRule')
  })

  it('borderSpacing() with dynamic value', () => {
    const d = dynamic('0.5rem')
    const rule = borderSpacing(d)
    expect(rule.declarations['border-spacing']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('borderSpacingX() with dynamic value', () => {
    const d = dynamic('1rem')
    const rule = borderSpacingX(d)
    expect(rule.declarations['border-spacing']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('borderSpacingY() with dynamic value', () => {
    const d = dynamic('0.75rem')
    const rule = borderSpacingY(d)
    expect(rule.declarations['border-spacing']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('borderSpacing() with string value', () => {
    const rule = borderSpacing('10px')
    expect(rule.declarations['border-spacing']).toBe('10px')
  })

  it('borderSpacingX() with string value', () => {
    const rule = borderSpacingX('8px')
    expect(rule.declarations['border-spacing']).toBe('8px 0')
  })

  it('borderSpacingY() with string value', () => {
    const rule = borderSpacingY('8px')
    expect(rule.declarations['border-spacing']).toBe('0 8px')
  })

  it('tableLayout() sets table-layout', () => {
    const rule = tableLayout('fixed')
    expect(rule.declarations['table-layout']).toBe('fixed')
  })

  it('captionSide() sets caption-side', () => {
    const rule = captionSide('bottom')
    expect(rule.declarations['caption-side']).toBe('bottom')
  })
})
