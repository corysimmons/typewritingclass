import { describe, it, expect } from 'vitest'
import { scale, scaleX, scaleY, rotate, translateX, translateY, skewX, skewY, transformOrigin, transformGpu, transformNone } from '../../src/utilities/transforms.ts'
import { dynamic } from '../../src/dynamic.ts'

describe('transform utilities', () => {
  it('scale converts number to decimal', () => {
    expect(scale(50).declarations).toEqual({ transform: 'scale(0.5)' })
  })

  it('scale 100 = 1', () => {
    expect(scale(100).declarations).toEqual({ transform: 'scale(1)' })
  })

  it('scaleX converts number to decimal', () => {
    expect(scaleX(75).declarations).toEqual({ transform: 'scaleX(0.75)' })
  })

  it('scaleY converts number to decimal', () => {
    expect(scaleY(150).declarations).toEqual({ transform: 'scaleY(1.5)' })
  })

  it('rotate sets transform', () => {
    expect(rotate('45deg').declarations).toEqual({ transform: 'rotate(45deg)' })
  })

  it('translateX sets transform', () => {
    expect(translateX('10px').declarations).toEqual({ transform: 'translateX(10px)' })
  })

  it('translateY sets transform', () => {
    expect(translateY('-50%').declarations).toEqual({ transform: 'translateY(-50%)' })
  })

  it('skewX sets transform', () => {
    expect(skewX('12deg').declarations).toEqual({ transform: 'skewX(12deg)' })
  })

  it('skewY sets transform', () => {
    expect(skewY('6deg').declarations).toEqual({ transform: 'skewY(6deg)' })
  })

  it('transformOrigin sets transform-origin', () => {
    expect(transformOrigin('center').declarations).toEqual({ 'transform-origin': 'center' })
  })

  it('transformOrigin accepts compound values', () => {
    expect(transformOrigin('top left').declarations).toEqual({ 'transform-origin': 'top left' })
  })

  it('transformGpu sets translate3d', () => {
    expect(transformGpu().declarations).toEqual({ transform: 'translate3d(0, 0, 0)' })
  })

  it('transformNone sets transform none', () => {
    expect(transformNone().declarations).toEqual({ transform: 'none' })
  })

  it('all return valid StyleRules', () => {
    expect(scale(100)._tag).toBe('StyleRule')
    expect(rotate('0deg')._tag).toBe('StyleRule')
    expect(transformOrigin('center')._tag).toBe('StyleRule')
    expect(transformGpu()._tag).toBe('StyleRule')
    expect(transformNone()._tag).toBe('StyleRule')
  })

  it('scale() with dynamic value', () => {
    const d = dynamic(150)
    const rule = scale(d)
    expect(rule.declarations.transform).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('scaleX() with dynamic value', () => {
    const d = dynamic(120)
    const rule = scaleX(d)
    expect(rule.declarations.transform).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('scaleY() with dynamic value', () => {
    const d = dynamic('1.1')
    const rule = scaleY(d)
    expect(rule.declarations.transform).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('rotate() with dynamic value', () => {
    const d = dynamic('45deg')
    const rule = rotate(d)
    expect(rule.declarations.transform).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('translateX() with dynamic value', () => {
    const d = dynamic('2rem')
    const rule = translateX(d)
    expect(rule.declarations.transform).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('translateY() with dynamic value', () => {
    const d = dynamic('3rem')
    const rule = translateY(d)
    expect(rule.declarations.transform).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('skewX() with dynamic value', () => {
    const d = dynamic('10deg')
    const rule = skewX(d)
    expect(rule.declarations.transform).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('skewY() with dynamic value', () => {
    const d = dynamic('5deg')
    const rule = skewY(d)
    expect(rule.declarations.transform).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('transformOrigin() with dynamic value', () => {
    const d = dynamic('center bottom')
    const rule = transformOrigin(d)
    expect(rule.declarations['transform-origin']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('translateX() with string value', () => {
    const rule = translateX('50%')
    expect(rule.declarations.transform).toBe('translateX(50%)')
  })

  it('translateY() with string value', () => {
    const rule = translateY('-10px')
    expect(rule.declarations.transform).toBe('translateY(-10px)')
  })
})
