import { describe, it, expect } from 'vitest'
import { bg, textColor, borderColor } from '../../src/utilities/colors.ts'

describe('color utilities', () => {
  it('bg sets background-color', () => {
    expect(bg('#3b82f6').declarations).toEqual({ 'background-color': '#3b82f6' })
  })

  it('textColor sets color', () => {
    expect(textColor('#ef4444').declarations).toEqual({ color: '#ef4444' })
  })

  it('borderColor sets border-color', () => {
    expect(borderColor('#d1d5db').declarations).toEqual({ 'border-color': '#d1d5db' })
  })

  it('all return valid StyleRules', () => {
    expect(bg('red')._tag).toBe('StyleRule')
    expect(textColor('red')._tag).toBe('StyleRule')
    expect(borderColor('red')._tag).toBe('StyleRule')
  })
})
