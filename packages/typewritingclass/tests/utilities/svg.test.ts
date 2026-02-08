import { describe, it, expect } from 'vitest'
import { fill, stroke, strokeWidth } from '../../src/utilities/svg.ts'

describe('SVG utilities', () => {
  it('fill sets fill color', () => {
    expect(fill('currentColor').declarations).toEqual({ fill: 'currentColor' })
  })

  it('fill sets fill to none', () => {
    expect(fill('none').declarations).toEqual({ fill: 'none' })
  })

  it('stroke sets stroke color', () => {
    expect(stroke('#3b82f6').declarations).toEqual({ stroke: '#3b82f6' })
  })

  it('strokeWidth sets stroke-width', () => {
    expect(strokeWidth(2).declarations).toEqual({ 'stroke-width': '2' })
  })

  it('strokeWidth with string', () => {
    expect(strokeWidth('1.5').declarations).toEqual({ 'stroke-width': '1.5' })
  })

  it('all return valid StyleRules', () => {
    expect(fill('red')._tag).toBe('StyleRule')
    expect(stroke('red')._tag).toBe('StyleRule')
    expect(strokeWidth(1)._tag).toBe('StyleRule')
  })
})
