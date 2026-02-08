import { describe, it, expect } from 'vitest'
import { shadow, opacity, backdrop, shadowColor, mixBlendMode, bgBlendMode } from '../../src/utilities/effects.ts'

describe('effects utilities', () => {
  it('shadow uses default value', () => {
    const d = shadow().declarations
    expect(d['box-shadow']).toContain('rgb(0 0 0')
  })

  it('shadow accepts named value', () => {
    expect(shadow('none').declarations).toEqual({ 'box-shadow': '0 0 #0000' })
    expect(shadow('lg').declarations['box-shadow']).toContain('10px 15px')
  })

  it('shadow accepts raw CSS value', () => {
    expect(shadow('0 4px 6px black').declarations).toEqual({ 'box-shadow': '0 4px 6px black' })
  })

  it('opacity sets opacity', () => {
    expect(opacity(0.5).declarations).toEqual({ opacity: '0.5' })
  })

  it('backdrop sets backdrop-filter', () => {
    expect(backdrop('blur(8px)').declarations).toEqual({ 'backdrop-filter': 'blur(8px)' })
  })

  it('shadowColor sets --twc-shadow-color', () => {
    expect(shadowColor('#000').declarations).toEqual({ '--twc-shadow-color': '#000' })
  })

  it('mixBlendMode sets mix-blend-mode', () => {
    expect(mixBlendMode('multiply').declarations).toEqual({ 'mix-blend-mode': 'multiply' })
  })

  it('bgBlendMode sets background-blend-mode', () => {
    expect(bgBlendMode('overlay').declarations).toEqual({ 'background-blend-mode': 'overlay' })
  })
})
