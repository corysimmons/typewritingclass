import { describe, it, expect } from 'vitest'
import { text, font, tracking, leading, textAlign, fontFamily, antialiased, subpixelAntialiased, italic, notItalic, normalNums, ordinal, slashedZero, liningNums, oldstyleNums, proportionalNums, tabularNums, diagonalFractions, stackedFractions, lineClamp, listStyleImage, listStylePosition, listStyleType, textDecoration, textDecorationColor, textDecorationStyle, textDecorationThickness, textUnderlineOffset, textTransform, textOverflow, textWrap, textIndent, verticalAlign, whitespace, wordBreak, hyphens, content_, truncate } from '../../src/utilities/typography.ts'

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

  it('fontFamily sets font-family', () => {
    expect(fontFamily('sans-serif').declarations).toEqual({ 'font-family': 'sans-serif' })
  })

  it('antialiased sets webkit and moz smoothing', () => {
    const d = antialiased().declarations
    expect(d['-webkit-font-smoothing']).toBe('antialiased')
    expect(d['-moz-osx-font-smoothing']).toBe('grayscale')
  })

  it('subpixelAntialiased resets smoothing', () => {
    const d = subpixelAntialiased().declarations
    expect(d['-webkit-font-smoothing']).toBe('auto')
  })

  it('italic sets font-style: italic', () => {
    expect(italic().declarations).toEqual({ 'font-style': 'italic' })
  })

  it('notItalic sets font-style: normal', () => {
    expect(notItalic().declarations).toEqual({ 'font-style': 'normal' })
  })

  it('normalNums sets font-variant-numeric: normal', () => {
    expect(normalNums().declarations).toEqual({ 'font-variant-numeric': 'normal' })
  })

  it('ordinal sets font-variant-numeric: ordinal', () => {
    expect(ordinal().declarations).toEqual({ 'font-variant-numeric': 'ordinal' })
  })

  it('tabularNums sets font-variant-numeric: tabular-nums', () => {
    expect(tabularNums().declarations).toEqual({ 'font-variant-numeric': 'tabular-nums' })
  })

  it('lineClamp sets overflow and clamp', () => {
    const d = lineClamp(3).declarations
    expect(d.overflow).toBe('hidden')
    expect(d['-webkit-line-clamp']).toBe('3')
  })

  it('listStylePosition sets list-style-position', () => {
    expect(listStylePosition('inside').declarations).toEqual({ 'list-style-position': 'inside' })
  })

  it('listStyleType sets list-style-type', () => {
    expect(listStyleType('disc').declarations).toEqual({ 'list-style-type': 'disc' })
  })

  it('textDecoration sets text-decoration-line', () => {
    expect(textDecoration('underline').declarations).toEqual({ 'text-decoration-line': 'underline' })
  })

  it('textDecorationColor sets color', () => {
    expect(textDecorationColor('red').declarations).toEqual({ 'text-decoration-color': 'red' })
  })

  it('textDecorationStyle sets style', () => {
    expect(textDecorationStyle('wavy').declarations).toEqual({ 'text-decoration-style': 'wavy' })
  })

  it('textTransform sets text-transform', () => {
    expect(textTransform('uppercase').declarations).toEqual({ 'text-transform': 'uppercase' })
  })

  it('textOverflow sets text-overflow', () => {
    expect(textOverflow('ellipsis').declarations).toEqual({ 'text-overflow': 'ellipsis' })
  })

  it('textWrap sets text-wrap', () => {
    expect(textWrap('balance').declarations).toEqual({ 'text-wrap': 'balance' })
  })

  it('textIndent sets text-indent', () => {
    expect(textIndent('2rem').declarations).toEqual({ 'text-indent': '2rem' })
  })

  it('verticalAlign sets vertical-align', () => {
    expect(verticalAlign('middle').declarations).toEqual({ 'vertical-align': 'middle' })
  })

  it('whitespace sets white-space', () => {
    expect(whitespace('nowrap').declarations).toEqual({ 'white-space': 'nowrap' })
  })

  it('wordBreak sets word-break', () => {
    expect(wordBreak('break-all').declarations).toEqual({ 'word-break': 'break-all' })
  })

  it('hyphens sets hyphens', () => {
    expect(hyphens('auto').declarations).toEqual({ hyphens: 'auto' })
  })

  it('content_ sets content', () => {
    expect(content_('""').declarations).toEqual({ content: '""' })
  })

  it('truncate sets overflow, text-overflow, and white-space', () => {
    expect(truncate().declarations).toEqual({
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
    })
  })
})
