import { describe, it, expect } from 'vitest'
import { shadow, opacity, backdrop } from '../../src/utilities/effects.ts'

describe('effects utilities', () => {
  it('shadow uses default value', () => {
    const d = shadow().declarations
    expect(d['box-shadow']).toContain('rgb(0 0 0')
  })

  it('shadow accepts custom value', () => {
    expect(shadow('none').declarations).toEqual({ 'box-shadow': 'none' })
  })

  it('opacity sets opacity', () => {
    expect(opacity(0.5).declarations).toEqual({ opacity: '0.5' })
  })

  it('backdrop sets backdrop-filter', () => {
    expect(backdrop('blur(8px)').declarations).toEqual({ 'backdrop-filter': 'blur(8px)' })
  })
})
