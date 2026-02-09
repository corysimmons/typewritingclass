import { describe, it, expect } from 'vitest'
import {
  blur, brightness, contrast, dropShadow, grayscale, hueRotate, invert, saturate, sepia,
  backdropBlur, backdropBrightness, backdropContrast, backdropGrayscale, backdropHueRotate,
  backdropInvert, backdropOpacity, backdropSaturate, backdropSepia,
} from '../../src/utilities/filters.ts'
import { dynamic } from '../../src/dynamic.ts'

describe('filter utilities', () => {
  it('blur uses default 8px', () => {
    expect(blur().declarations).toEqual({ filter: 'blur(8px)' })
  })

  it('blur accepts custom value', () => {
    expect(blur('16px').declarations).toEqual({ filter: 'blur(16px)' })
  })

  it('brightness sets filter', () => {
    expect(brightness('150%').declarations).toEqual({ filter: 'brightness(150%)' })
  })

  it('contrast sets filter', () => {
    expect(contrast('200%').declarations).toEqual({ filter: 'contrast(200%)' })
  })

  it('dropShadow sets filter', () => {
    expect(dropShadow('0 1px 2px rgb(0 0 0 / 0.1)').declarations).toEqual({
      filter: 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))',
    })
  })

  it('grayscale uses default 100%', () => {
    expect(grayscale().declarations).toEqual({ filter: 'grayscale(100%)' })
  })

  it('hueRotate sets filter', () => {
    expect(hueRotate('90deg').declarations).toEqual({ filter: 'hue-rotate(90deg)' })
  })

  it('invert uses default 100%', () => {
    expect(invert().declarations).toEqual({ filter: 'invert(100%)' })
  })

  it('saturate sets filter', () => {
    expect(saturate('200%').declarations).toEqual({ filter: 'saturate(200%)' })
  })

  it('sepia uses default 100%', () => {
    expect(sepia().declarations).toEqual({ filter: 'sepia(100%)' })
  })
})

describe('backdrop filter utilities', () => {
  it('backdropBlur uses default 8px', () => {
    expect(backdropBlur().declarations).toEqual({ 'backdrop-filter': 'blur(8px)' })
  })

  it('backdropBrightness sets backdrop-filter', () => {
    expect(backdropBrightness('125%').declarations).toEqual({ 'backdrop-filter': 'brightness(125%)' })
  })

  it('backdropContrast sets backdrop-filter', () => {
    expect(backdropContrast('150%').declarations).toEqual({ 'backdrop-filter': 'contrast(150%)' })
  })

  it('backdropGrayscale uses default 100%', () => {
    expect(backdropGrayscale().declarations).toEqual({ 'backdrop-filter': 'grayscale(100%)' })
  })

  it('backdropHueRotate sets backdrop-filter', () => {
    expect(backdropHueRotate('180deg').declarations).toEqual({ 'backdrop-filter': 'hue-rotate(180deg)' })
  })

  it('backdropInvert uses default 100%', () => {
    expect(backdropInvert().declarations).toEqual({ 'backdrop-filter': 'invert(100%)' })
  })

  it('backdropOpacity sets backdrop-filter', () => {
    expect(backdropOpacity('50%').declarations).toEqual({ 'backdrop-filter': 'opacity(50%)' })
  })

  it('backdropSaturate sets backdrop-filter', () => {
    expect(backdropSaturate('150%').declarations).toEqual({ 'backdrop-filter': 'saturate(150%)' })
  })

  it('backdropSepia uses default 100%', () => {
    expect(backdropSepia().declarations).toEqual({ 'backdrop-filter': 'sepia(100%)' })
  })

  it('all return valid StyleRules', () => {
    expect(blur()._tag).toBe('StyleRule')
    expect(backdropBlur()._tag).toBe('StyleRule')
  })

  it('brightness() with dynamic value', () => {
    const d = dynamic('150%')
    const rule = brightness(d)
    expect(rule.declarations.filter).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('contrast() with dynamic value', () => {
    const d = dynamic('200%')
    const rule = contrast(d)
    expect(rule.declarations.filter).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('hueRotate() with dynamic value', () => {
    const d = dynamic('90deg')
    const rule = hueRotate(d)
    expect(rule.declarations.filter).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('saturate() with dynamic value', () => {
    const d = dynamic('200%')
    const rule = saturate(d)
    expect(rule.declarations.filter).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('dropShadow() with dynamic value', () => {
    const d = dynamic('0 4px 6px rgba(0,0,0,0.1)')
    const rule = dropShadow(d)
    expect(rule.declarations.filter).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('backdropBlur() with dynamic value', () => {
    const d = dynamic('8px')
    const rule = backdropBlur(d)
    expect(rule.declarations['backdrop-filter']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('backdropBrightness() with dynamic value', () => {
    const d = dynamic('120%')
    const rule = backdropBrightness(d)
    expect(rule.declarations['backdrop-filter']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('backdropContrast() with dynamic value', () => {
    const d = dynamic('150%')
    const rule = backdropContrast(d)
    expect(rule.declarations['backdrop-filter']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('backdropGrayscale() with dynamic value', () => {
    const d = dynamic('100%')
    const rule = backdropGrayscale(d)
    expect(rule.declarations['backdrop-filter']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('backdropHueRotate() with dynamic value', () => {
    const d = dynamic('45deg')
    const rule = backdropHueRotate(d)
    expect(rule.declarations['backdrop-filter']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('backdropInvert() with dynamic value', () => {
    const d = dynamic('100%')
    const rule = backdropInvert(d)
    expect(rule.declarations['backdrop-filter']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('backdropOpacity() with dynamic value', () => {
    const d = dynamic('50%')
    const rule = backdropOpacity(d)
    expect(rule.declarations['backdrop-filter']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('backdropSaturate() with dynamic value', () => {
    const d = dynamic('180%')
    const rule = backdropSaturate(d)
    expect(rule.declarations['backdrop-filter']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('backdropSepia() with dynamic value', () => {
    const d = dynamic('100%')
    const rule = backdropSepia(d)
    expect(rule.declarations['backdrop-filter']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('blur() with dynamic value produces CSS variable binding', () => {
    const d = dynamic('12px')
    const rule = blur(d)
    expect(rule.declarations.filter).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
    expect(Object.values(rule.dynamicBindings!)[0]).toBe('12px')
  })
})
