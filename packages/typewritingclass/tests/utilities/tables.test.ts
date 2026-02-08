import { describe, it, expect } from 'vitest'
import { borderCollapse, borderSeparate, borderSpacing, borderSpacingX, borderSpacingY, tableLayout, captionSide } from '../../src/utilities/tables.ts'

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
})
