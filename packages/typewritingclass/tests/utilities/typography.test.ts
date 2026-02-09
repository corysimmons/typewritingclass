import { describe, it, expect } from 'vitest'
import { text, font, tracking, leading, textAlign, fontFamily, antialiased, subpixelAntialiased, italic, notItalic, normalNums, ordinal, slashedZero, liningNums, oldstyleNums, proportionalNums, tabularNums, diagonalFractions, stackedFractions, lineClamp, listStyleImage, listStylePosition, listStyleType, textDecoration, textDecorationColor, textDecorationStyle, textDecorationThickness, textUnderlineOffset, textTransform, textOverflow, textWrap, textIndent, verticalAlign, whitespace, wordBreak, hyphens, content_, truncate } from '../../src/utilities/typography.ts'
import { dynamic } from '../../src/dynamic.ts'

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

  it('text() with dynamic value', () => {
    const d = dynamic('1.5rem')
    const rule = text(d)
    expect(rule.declarations['font-size']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('font() with dynamic value', () => {
    const d = dynamic('700')
    const rule = font(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('tracking() with dynamic value', () => {
    const d = dynamic('0.05em')
    const rule = tracking(d)
    expect(rule.declarations['letter-spacing']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('leading() with dynamic value', () => {
    const d = dynamic('2rem')
    const rule = leading(d)
    expect(rule.declarations['line-height']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('fontFamily() with dynamic value', () => {
    const d = dynamic('Inter, sans-serif')
    const rule = fontFamily(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('lineClamp() sets overflow properties', () => {
    const rule = lineClamp(3)
    expect(rule.declarations.overflow).toBe('hidden')
    expect(rule.declarations.display).toBe('-webkit-box')
    expect(rule.declarations['-webkit-line-clamp']).toBe('3')
    expect(rule.declarations['-webkit-box-orient']).toBe('vertical')
  })

  it('listStyleImage() sets list-style-image', () => {
    const rule = listStyleImage('url(bullet.png)')
    expect(rule.declarations['list-style-image']).toBe('url(bullet.png)')
  })

  it('listStylePosition() sets list-style-position', () => {
    const rule = listStylePosition('inside')
    expect(rule.declarations['list-style-position']).toBe('inside')
  })

  it('listStyleType() sets list-style-type', () => {
    const rule = listStyleType('disc')
    expect(rule.declarations['list-style-type']).toBe('disc')
  })

  it('textDecoration() sets text-decoration', () => {
    const rule = textDecoration('underline')
    expect(rule.declarations['text-decoration-line']).toBe('underline')
  })

  it('textDecorationColor() with dynamic value', () => {
    const d = dynamic('#ff0000')
    const rule = textDecorationColor(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('textDecorationStyle() sets style', () => {
    const rule = textDecorationStyle('wavy')
    expect(rule.declarations['text-decoration-style']).toBe('wavy')
  })

  it('textDecorationThickness() with dynamic value', () => {
    const d = dynamic('2px')
    const rule = textDecorationThickness(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('textUnderlineOffset() with dynamic value', () => {
    const d = dynamic('4px')
    const rule = textUnderlineOffset(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('textTransform() sets text-transform', () => {
    const rule = textTransform('uppercase')
    expect(rule.declarations['text-transform']).toBe('uppercase')
  })

  it('textOverflow() sets text-overflow', () => {
    const rule = textOverflow('ellipsis')
    expect(rule.declarations['text-overflow']).toBe('ellipsis')
  })

  it('textWrap() sets text-wrap', () => {
    const rule = textWrap('balance')
    expect(rule.declarations['text-wrap']).toBe('balance')
  })

  it('textIndent() with dynamic value', () => {
    const d = dynamic('2rem')
    const rule = textIndent(d)
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('verticalAlign() sets vertical-align', () => {
    const rule = verticalAlign('middle')
    expect(rule.declarations['vertical-align']).toBe('middle')
  })

  it('whitespace() sets white-space', () => {
    const rule = whitespace('nowrap')
    expect(rule.declarations['white-space']).toBe('nowrap')
  })

  it('wordBreak() sets word-break', () => {
    const rule = wordBreak('break-all')
    expect(rule.declarations['word-break']).toBe('break-all')
  })

  it('hyphens() sets hyphens', () => {
    const rule = hyphens('auto')
    expect(rule.declarations.hyphens).toBe('auto')
  })

  it('content_() sets content', () => {
    const rule = content_('""')
    expect(rule.declarations.content).toBe('""')
  })

  it('textDecorationThickness() with static value sets text-decoration-thickness', () => {
    const rule = textDecorationThickness('2px')
    expect(rule.declarations['text-decoration-thickness']).toBe('2px')
    expect(rule.dynamicBindings).toBeUndefined()
  })

  it('textDecorationThickness() with auto value', () => {
    const rule = textDecorationThickness('auto')
    expect(rule.declarations['text-decoration-thickness']).toBe('auto')
  })

  it('textUnderlineOffset() with static value sets text-underline-offset', () => {
    const rule = textUnderlineOffset('4px')
    expect(rule.declarations['text-underline-offset']).toBe('4px')
    expect(rule.dynamicBindings).toBeUndefined()
  })

  it('textUnderlineOffset() with auto value', () => {
    const rule = textUnderlineOffset('auto')
    expect(rule.declarations['text-underline-offset']).toBe('auto')
  })

  it('diagonalFractions sets font-variant-numeric', () => {
    expect(diagonalFractions().declarations).toEqual({ 'font-variant-numeric': 'diagonal-fractions' })
  })

  it('stackedFractions sets font-variant-numeric', () => {
    expect(stackedFractions().declarations).toEqual({ 'font-variant-numeric': 'stacked-fractions' })
  })

  it('oldstyleNums sets font-variant-numeric', () => {
    expect(oldstyleNums().declarations).toEqual({ 'font-variant-numeric': 'oldstyle-nums' })
  })

  it('proportionalNums sets font-variant-numeric', () => {
    expect(proportionalNums().declarations).toEqual({ 'font-variant-numeric': 'proportional-nums' })
  })
})
