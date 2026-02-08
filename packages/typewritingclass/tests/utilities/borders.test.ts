import { describe, it, expect } from 'vitest'
import { rounded, roundedT, roundedB, roundedL, roundedR, border, borderT, borderR, borderB, borderL, ring } from '../../src/utilities/borders.ts'

describe('border utilities', () => {
  it('rounded uses default radius', () => {
    expect(rounded().declarations).toEqual({ 'border-radius': '0.25rem' })
  })

  it('rounded accepts custom value', () => {
    expect(rounded('9999px').declarations).toEqual({ 'border-radius': '9999px' })
  })

  it('roundedT sets top radii', () => {
    const d = roundedT().declarations
    expect(d['border-top-left-radius']).toBe('0.25rem')
    expect(d['border-top-right-radius']).toBe('0.25rem')
  })

  it('roundedB sets bottom radii', () => {
    const d = roundedB('0.5rem').declarations
    expect(d['border-bottom-left-radius']).toBe('0.5rem')
    expect(d['border-bottom-right-radius']).toBe('0.5rem')
  })

  it('roundedL sets left radii', () => {
    const d = roundedL().declarations
    expect(d['border-top-left-radius']).toBe('0.25rem')
    expect(d['border-bottom-left-radius']).toBe('0.25rem')
  })

  it('roundedR sets right radii', () => {
    const d = roundedR().declarations
    expect(d['border-top-right-radius']).toBe('0.25rem')
    expect(d['border-bottom-right-radius']).toBe('0.25rem')
  })

  it('border sets default 1px solid', () => {
    expect(border().declarations).toEqual({ 'border-width': '1px', 'border-style': 'solid' })
  })

  it('border accepts custom width', () => {
    expect(border('2px').declarations).toEqual({ 'border-width': '2px', 'border-style': 'solid' })
  })

  it('borderT sets top border', () => {
    expect(borderT().declarations).toEqual({ 'border-top-width': '1px', 'border-style': 'solid' })
  })

  it('borderR sets right border', () => {
    expect(borderR().declarations).toEqual({ 'border-right-width': '1px', 'border-style': 'solid' })
  })

  it('borderB sets bottom border', () => {
    expect(borderB().declarations).toEqual({ 'border-bottom-width': '1px', 'border-style': 'solid' })
  })

  it('borderL sets left border', () => {
    expect(borderL().declarations).toEqual({ 'border-left-width': '1px', 'border-style': 'solid' })
  })

  it('ring sets box-shadow with defaults', () => {
    expect(ring().declarations).toEqual({ 'box-shadow': '0 0 0 3px #3b82f6' })
  })

  it('ring accepts custom width and color', () => {
    expect(ring('2px', 'red').declarations).toEqual({ 'box-shadow': '0 0 0 2px red' })
  })
})
