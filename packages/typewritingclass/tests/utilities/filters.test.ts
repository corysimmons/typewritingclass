import { describe, it, expect } from 'vitest'
import {
  blur, brightness, contrast, dropShadow, grayscale, hueRotate, invert, saturate, sepia,
  backdropBlur, backdropBrightness, backdropContrast, backdropGrayscale, backdropHueRotate,
  backdropInvert, backdropOpacity, backdropSaturate, backdropSepia,
} from '../../src/utilities/filters.ts'

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
})
