import { describe, it, expect } from 'vitest'
import { text, font, tracking, leading, textAlign } from '../../src/utilities/typography.ts'

describe('typography utilities', () => {
  it('text with TextSize token sets font-size and line-height', () => {
    const rule = text({ fontSize: '1rem', lineHeight: '1.5rem' })
    expect(rule.declarations).toEqual({ 'font-size': '1rem', 'line-height': '1.5rem' })
  })

  it('text with string sets font-size only', () => {
    const rule = text('2rem')
    expect(rule.declarations).toEqual({ 'font-size': '2rem' })
  })

  it('font sets font-weight', () => {
    expect(font('700').declarations).toEqual({ 'font-weight': '700' })
  })

  it('tracking sets letter-spacing', () => {
    expect(tracking('0.05em').declarations).toEqual({ 'letter-spacing': '0.05em' })
  })

  it('leading sets line-height', () => {
    expect(leading('1.75').declarations).toEqual({ 'line-height': '1.75' })
  })

  it('textAlign sets text-align', () => {
    expect(textAlign('center').declarations).toEqual({ 'text-align': 'center' })
  })
})
