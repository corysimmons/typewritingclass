import { describe, it, expect } from 'vitest'
import { googleFonts } from '../src/plugins/googleFonts.ts'

describe('googleFonts', () => {
  it('returns the font family name', () => {
    expect(googleFonts('Inter')).toBe('Inter')
  })

  it('returns family with spaces', () => {
    expect(googleFonts('Open Sans')).toBe('Open Sans')
  })

  it('returns family when weights are provided', () => {
    expect(googleFonts('Roboto', { weights: [400, 700] })).toBe('Roboto')
  })

  it('returns family when display is provided', () => {
    expect(googleFonts('Lato', { display: 'block' })).toBe('Lato')
  })

  it('handles repeated calls for the same family', () => {
    expect(googleFonts('Inter')).toBe('Inter')
    expect(googleFonts('Inter')).toBe('Inter')
  })
})
