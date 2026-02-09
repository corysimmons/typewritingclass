import { describe, it, expect } from 'vitest'
import { fill, stroke, strokeWidth } from '../../src/utilities/svg.ts'
import { dynamic } from '../../src/dynamic.ts'

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

  it('fill() with dynamic value', () => {
    const d = dynamic('#ff0000')
    const rule = fill(d)
    expect(rule.declarations.fill).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('stroke() with dynamic value', () => {
    const d = dynamic('#0000ff')
    const rule = stroke(d)
    expect(rule.declarations.stroke).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('strokeWidth() with dynamic value', () => {
    const d = dynamic(3)
    const rule = strokeWidth(d)
    expect(rule.declarations['stroke-width']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })
})
