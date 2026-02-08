import { describe, it, expect } from 'vitest'
import { scale, scaleX, scaleY, rotate, translateX, translateY, skewX, skewY, transformOrigin } from '../../src/utilities/transforms.ts'

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

  it('all return valid StyleRules', () => {
    expect(scale(100)._tag).toBe('StyleRule')
    expect(rotate('0deg')._tag).toBe('StyleRule')
    expect(transformOrigin('center')._tag).toBe('StyleRule')
  })
})
