import { describe, it, expect } from 'vitest'
import { rounded, roundedT, roundedB, roundedL, roundedR, border, borderT, borderR, borderB, borderL, ring, roundedTL, roundedTR, roundedBR, roundedBL, roundedSS, roundedSE, roundedEE, roundedES, borderX, borderY, borderS, borderE, borderStyle, outlineWidth, outlineColor, outlineStyle, outlineOffset, outline, outlineNone, ringInset, ringColor, ringOffsetWidth, ringOffsetColor, divideX, divideY, divideColor, divideStyle, divideXReverse, divideYReverse } from '../../src/utilities/borders.ts'
import { borderColor } from '../../src/utilities/colors.ts'
import { dynamic } from '../../src/dynamic.ts'

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

  it('roundedTL sets top-left radius', () => {
    expect(roundedTL().declarations).toEqual({ 'border-top-left-radius': '0.25rem' })
  })

  it('roundedTR sets top-right radius', () => {
    expect(roundedTR('0.5rem').declarations).toEqual({ 'border-top-right-radius': '0.5rem' })
  })

  it('roundedBR sets bottom-right radius', () => {
    expect(roundedBR().declarations).toEqual({ 'border-bottom-right-radius': '0.25rem' })
  })

  it('roundedBL sets bottom-left radius', () => {
    expect(roundedBL().declarations).toEqual({ 'border-bottom-left-radius': '0.25rem' })
  })

  it('borderX sets left and right border', () => {
    expect(borderX().declarations).toEqual({
      'border-left-width': '1px',
      'border-right-width': '1px',
      'border-style': 'solid',
    })
  })

  it('borderY sets top and bottom border', () => {
    expect(borderY().declarations).toEqual({
      'border-top-width': '1px',
      'border-bottom-width': '1px',
      'border-style': 'solid',
    })
  })

  it('borderS sets inline-start border', () => {
    expect(borderS().declarations['border-inline-start-width']).toBe('1px')
  })

  it('borderE sets inline-end border', () => {
    expect(borderE().declarations['border-inline-end-width']).toBe('1px')
  })

  it('borderStyle sets border-style', () => {
    expect(borderStyle('dashed').declarations).toEqual({ 'border-style': 'dashed' })
  })

  it('outlineWidth sets outline-width', () => {
    expect(outlineWidth('2px').declarations).toEqual({ 'outline-width': '2px' })
  })

  it('outlineColor sets outline-color', () => {
    expect(outlineColor('blue').declarations).toEqual({ 'outline-color': 'blue' })
  })

  it('outlineStyle sets outline-style', () => {
    expect(outlineStyle('dashed').declarations).toEqual({ 'outline-style': 'dashed' })
  })

  it('outlineOffset sets outline-offset', () => {
    expect(outlineOffset('2px').declarations).toEqual({ 'outline-offset': '2px' })
  })

  it('divideX sets selectorTemplate and border-left-width', () => {
    const result = divideX()
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
    expect(result.declarations['border-left-width']).toBe('1px')
  })

  it('divideY sets selectorTemplate and border-top-width', () => {
    const result = divideY('2px')
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
    expect(result.declarations['border-top-width']).toBe('2px')
  })

  it('divideColor sets selectorTemplate and border-color', () => {
    const result = divideColor('#e5e7eb')
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
    expect(result.declarations['border-color']).toBe('#e5e7eb')
  })

  it('divideStyle sets selectorTemplate and border-style', () => {
    const result = divideStyle('dashed')
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
    expect(result.declarations['border-style']).toBe('dashed')
  })

  it('outline sets outline shorthand properties', () => {
    const result = outline('2px', 'dashed', 'blue')
    expect(result.declarations).toEqual({
      'outline-width': '2px',
      'outline-style': 'dashed',
      'outline-color': 'blue',
    })
  })

  it('outline defaults to 2px solid', () => {
    const result = outline()
    expect(result.declarations['outline-width']).toBe('2px')
    expect(result.declarations['outline-style']).toBe('solid')
  })

  it('outlineNone sets transparent outline', () => {
    const result = outlineNone()
    expect(result.declarations).toEqual({
      outline: '2px solid transparent',
      'outline-offset': '2px',
    })
  })

  it('ringInset sets --twc-ring-inset', () => {
    expect(ringInset().declarations).toEqual({ '--twc-ring-inset': 'inset' })
  })

  it('divideXReverse sets selectorTemplate and --twc-divide-x-reverse', () => {
    const result = divideXReverse()
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
    expect(result.declarations['--twc-divide-x-reverse']).toBe('1')
  })

  it('divideYReverse sets selectorTemplate and --twc-divide-y-reverse', () => {
    const result = divideYReverse()
    expect(result.selectorTemplate).toBe('& > :not([hidden]) ~ :not([hidden])')
    expect(result.declarations['--twc-divide-y-reverse']).toBe('1')
  })

  it('rounded() with dynamic value', () => {
    const d = dynamic('0.5rem')
    const rule = rounded(d)
    expect(rule.declarations['border-radius']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('roundedT() with dynamic value', () => {
    const d = dynamic('1rem')
    const rule = roundedT(d)
    expect(rule.declarations['border-top-left-radius']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('roundedB() with dynamic value', () => {
    const d = dynamic('1rem')
    const rule = roundedB(d)
    expect(rule.declarations['border-bottom-left-radius']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('roundedL() with dynamic value', () => {
    const d = dynamic('0.5rem')
    const rule = roundedL(d)
    expect(rule.declarations['border-top-left-radius']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('roundedR() with dynamic value', () => {
    const d = dynamic('0.5rem')
    const rule = roundedR(d)
    expect(rule.declarations['border-top-right-radius']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('roundedTL() sets top-left radius', () => {
    const rule = roundedTL('lg')
    expect(rule.declarations['border-top-left-radius']).toBeDefined()
  })

  it('roundedTR() sets top-right radius', () => {
    const rule = roundedTR('lg')
    expect(rule.declarations['border-top-right-radius']).toBeDefined()
  })

  it('roundedBR() sets bottom-right radius', () => {
    const rule = roundedBR('lg')
    expect(rule.declarations['border-bottom-right-radius']).toBeDefined()
  })

  it('roundedBL() sets bottom-left radius', () => {
    const rule = roundedBL('lg')
    expect(rule.declarations['border-bottom-left-radius']).toBeDefined()
  })

  it('roundedTL() with dynamic value', () => {
    const d = dynamic('1rem')
    const rule = roundedTL(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('roundedSS() sets logical start-start', () => {
    const rule = roundedSS('lg')
    expect(rule.declarations).toBeDefined()
  })

  it('roundedSE() sets logical start-end', () => {
    const rule = roundedSE('lg')
    expect(rule.declarations).toBeDefined()
  })

  it('roundedEE() sets logical end-end', () => {
    const rule = roundedEE('lg')
    expect(rule.declarations).toBeDefined()
  })

  it('roundedES() sets logical end-start', () => {
    const rule = roundedES('lg')
    expect(rule.declarations).toBeDefined()
  })

  it('borderX() sets left and right borders', () => {
    const rule = borderX(1)
    expect(rule.declarations).toBeDefined()
  })

  it('borderY() sets top and bottom borders', () => {
    const rule = borderY(1)
    expect(rule.declarations).toBeDefined()
  })

  it('borderS() sets logical start border', () => {
    const rule = borderS(1)
    expect(rule.declarations).toBeDefined()
  })

  it('borderE() sets logical end border', () => {
    const rule = borderE(1)
    expect(rule.declarations).toBeDefined()
  })

  it('borderStyle() sets border-style', () => {
    const rule = borderStyle('dashed')
    expect(rule.declarations['border-style']).toBe('dashed')
  })

  it('borderColor() with dynamic value', () => {
    const d = dynamic('#ff0000')
    const rule = borderColor(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('ringColor() with dynamic value', () => {
    const d = dynamic('#3b82f6')
    const rule = ringColor(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('ringOffsetWidth() sets ring offset', () => {
    const rule = ringOffsetWidth(2)
    expect(rule.declarations).toBeDefined()
  })

  it('ringOffsetColor() with dynamic value', () => {
    const d = dynamic('#ffffff')
    const rule = ringOffsetColor(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('outlineWidth() sets outline width', () => {
    const rule = outlineWidth(2)
    expect(rule.declarations).toBeDefined()
  })

  it('outlineColor() with dynamic value', () => {
    const d = dynamic('#000000')
    const rule = outlineColor(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('outlineStyle() sets outline style', () => {
    const rule = outlineStyle('dashed')
    expect(rule.declarations['outline-style']).toBe('dashed')
  })

  it('outlineOffset() sets outline offset', () => {
    const rule = outlineOffset(2)
    expect(rule.declarations).toBeDefined()
  })

  it('outlineNone() removes outline', () => {
    const rule = outlineNone()
    expect(rule.declarations).toBeDefined()
  })

  it('divideX() with value', () => {
    const rule = divideX(1)
    expect(rule.declarations).toBeDefined()
    expect(rule.selectorTemplate).toBeDefined()
  })

  it('divideY() with value', () => {
    const rule = divideY(1)
    expect(rule.declarations).toBeDefined()
    expect(rule.selectorTemplate).toBeDefined()
  })

  it('divideColor() with dynamic value', () => {
    const d = dynamic('#e5e7eb')
    const rule = divideColor(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('divideStyle() sets divide style', () => {
    const rule = divideStyle('dashed')
    expect(rule.declarations).toBeDefined()
  })

  it('divideXReverse() sets reverse flag', () => {
    const rule = divideXReverse()
    expect(rule.declarations).toBeDefined()
  })

  it('divideYReverse() sets reverse flag', () => {
    const rule = divideYReverse()
    expect(rule.declarations).toBeDefined()
  })

  it('roundedES() with static value sets logical border radii', () => {
    const rule = roundedES('8px')
    expect(rule.declarations).toEqual({
      'border-end-start-radius': '8px',
      'border-start-start-radius': '8px',
    })
  })

  it('roundedES() with no args uses default radius', () => {
    const rule = roundedES()
    expect(rule.declarations['border-end-start-radius']).toBeDefined()
    expect(rule.declarations['border-start-start-radius']).toBeDefined()
  })

  it('ringOffsetColor() with static value sets --twc-ring-offset-color', () => {
    const rule = ringOffsetColor('red')
    expect(rule.declarations['--twc-ring-offset-color']).toBe('red')
  })

  it('ringOffsetColor() with named color resolves to hex', () => {
    const rule = ringOffsetColor('blue-500')
    expect(rule.declarations['--twc-ring-offset-color']).toBe('#3b82f6')
  })

  it('roundedEE() with dynamic value produces CSS variable binding', () => {
    const d = dynamic('12px')
    const rule = roundedEE(d)
    expect(rule.declarations['border-start-end-radius']).toContain('var(')
    expect(rule.declarations['border-end-end-radius']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('roundedES() with dynamic value produces CSS variable binding', () => {
    const d = dynamic('8px')
    const rule = roundedES(d)
    expect(rule.declarations['border-end-start-radius']).toContain('var(')
    expect(rule.declarations['border-start-start-radius']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('roundedSS() with dynamic value produces CSS variable binding', () => {
    const d = dynamic('6px')
    const rule = roundedSS(d)
    expect(rule.declarations['border-start-start-radius']).toContain('var(')
    expect(rule.declarations['border-end-start-radius']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('roundedSE() with dynamic value produces CSS variable binding', () => {
    const d = dynamic('6px')
    const rule = roundedSE(d)
    expect(rule.declarations['border-start-end-radius']).toContain('var(')
    expect(rule.declarations['border-end-end-radius']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })
})
