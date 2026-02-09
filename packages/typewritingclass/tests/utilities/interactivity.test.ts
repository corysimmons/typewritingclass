import { describe, it, expect } from 'vitest'
import { cursor, select, pointerEvents, accentColor, appearance, caretColor, resize, scrollBehavior, scrollMargin, scrollMarginX, scrollMarginY, scrollMarginT, scrollMarginR, scrollMarginB, scrollMarginL, scrollPadding, scrollPaddingX, scrollPaddingY, scrollPaddingT, scrollPaddingR, scrollPaddingB, scrollPaddingL, snapAlign, snapStop, snapType, touchAction, willChange } from '../../src/utilities/interactivity.ts'
import { dynamic } from '../../src/dynamic.ts'

describe('interactivity utilities', () => {
  it('cursor sets cursor', () => {
    expect(cursor('pointer').declarations).toEqual({ cursor: 'pointer' })
  })

  it('select sets user-select', () => {
    expect(select('none').declarations).toEqual({ 'user-select': 'none' })
  })

  it('pointerEvents sets pointer-events', () => {
    expect(pointerEvents('none').declarations).toEqual({ 'pointer-events': 'none' })
  })

  it('accentColor sets accent-color', () => {
    expect(accentColor('blue').declarations).toEqual({ 'accent-color': 'blue' })
  })

  it('appearance sets appearance', () => {
    expect(appearance('none').declarations).toEqual({ appearance: 'none' })
  })

  it('caretColor sets caret-color', () => {
    expect(caretColor('red').declarations).toEqual({ 'caret-color': 'red' })
  })

  it('resize sets resize', () => {
    expect(resize('both').declarations).toEqual({ resize: 'both' })
  })

  it('scrollBehavior sets scroll-behavior', () => {
    expect(scrollBehavior('smooth').declarations).toEqual({ 'scroll-behavior': 'smooth' })
  })

  it('scrollMargin resolves spacing scale', () => {
    expect(scrollMargin(4).declarations).toEqual({ 'scroll-margin': '1rem' })
  })

  it('scrollMarginX sets left and right', () => {
    const d = scrollMarginX(4).declarations
    expect(d['scroll-margin-left']).toBe('1rem')
    expect(d['scroll-margin-right']).toBe('1rem')
  })

  it('scrollPadding resolves spacing scale', () => {
    expect(scrollPadding(4).declarations).toEqual({ 'scroll-padding': '1rem' })
  })

  it('snapAlign sets scroll-snap-align', () => {
    expect(snapAlign('start').declarations).toEqual({ 'scroll-snap-align': 'start' })
  })

  it('snapType sets scroll-snap-type', () => {
    expect(snapType('x mandatory').declarations).toEqual({ 'scroll-snap-type': 'x mandatory' })
  })

  it('touchAction sets touch-action', () => {
    expect(touchAction('none').declarations).toEqual({ 'touch-action': 'none' })
  })

  it('willChange sets will-change', () => {
    expect(willChange('transform').declarations).toEqual({ 'will-change': 'transform' })
  })

  it('cursor() with dynamic value', () => {
    const d = dynamic('pointer')
    const rule = cursor(d)
    expect(rule.declarations.cursor).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('accentColor() with string value', () => {
    const rule = accentColor('blue-500')
    expect(rule.declarations['accent-color']).toBeDefined()
  })

  it('accentColor() with dynamic value', () => {
    const d = dynamic('#ff0000')
    const rule = accentColor(d)
    expect(rule.declarations['accent-color']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('caretColor() with dynamic value', () => {
    const d = dynamic('#0000ff')
    const rule = caretColor(d)
    expect(rule.declarations['caret-color']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('appearance() sets appearance', () => {
    const rule = appearance('none')
    expect(rule.declarations.appearance).toBe('none')
  })

  it('resize() sets resize', () => {
    const rule = resize('vertical')
    expect(rule.declarations.resize).toBe('vertical')
  })

  it('scrollBehavior() sets scroll-behavior', () => {
    const rule = scrollBehavior('smooth')
    expect(rule.declarations['scroll-behavior']).toBe('smooth')
  })

  it('scrollMargin() with string value', () => {
    const rule = scrollMargin('2rem')
    expect(rule.declarations['scroll-margin']).toBe('2rem')
  })

  it('scrollMargin() with dynamic value', () => {
    const d = dynamic('1rem')
    const rule = scrollMargin(d)
    expect(rule.declarations['scroll-margin']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('scrollMarginX() with number value', () => {
    const rule = scrollMarginX(4)
    expect(rule.declarations['scroll-margin-left']).toBeDefined()
    expect(rule.declarations['scroll-margin-right']).toBeDefined()
  })

  it('scrollMarginX() with dynamic value', () => {
    const d = dynamic('2rem')
    const rule = scrollMarginX(d)
    expect(rule.declarations['scroll-margin-left']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('scrollMarginY() with dynamic value', () => {
    const d = dynamic('1rem')
    const rule = scrollMarginY(d)
    expect(rule.declarations['scroll-margin-top']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('scrollMarginT() with number value', () => {
    const rule = scrollMarginT(4)
    expect(rule.declarations['scroll-margin-top']).toBeDefined()
  })

  it('scrollMarginR() with number value', () => {
    const rule = scrollMarginR(4)
    expect(rule.declarations['scroll-margin-right']).toBeDefined()
  })

  it('scrollMarginB() with number value', () => {
    const rule = scrollMarginB(4)
    expect(rule.declarations['scroll-margin-bottom']).toBeDefined()
  })

  it('scrollMarginL() with number value', () => {
    const rule = scrollMarginL(4)
    expect(rule.declarations['scroll-margin-left']).toBeDefined()
  })

  it('scrollPadding() with dynamic value', () => {
    const d = dynamic('1rem')
    const rule = scrollPadding(d)
    expect(rule.declarations['scroll-padding']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('scrollPaddingX() with dynamic value', () => {
    const d = dynamic('2rem')
    const rule = scrollPaddingX(d)
    expect(rule.declarations['scroll-padding-left']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('scrollPaddingY() with dynamic value', () => {
    const d = dynamic('1.5rem')
    const rule = scrollPaddingY(d)
    expect(rule.declarations['scroll-padding-top']).toContain('var(')
    expect(rule.dynamicBindings).toBeDefined()
  })

  it('scrollPaddingT() with number value', () => {
    const rule = scrollPaddingT(4)
    expect(rule.declarations['scroll-padding-top']).toBeDefined()
  })

  it('scrollPaddingR() with number value', () => {
    const rule = scrollPaddingR(4)
    expect(rule.declarations['scroll-padding-right']).toBeDefined()
  })

  it('scrollPaddingB() with number value', () => {
    const rule = scrollPaddingB(4)
    expect(rule.declarations['scroll-padding-bottom']).toBeDefined()
  })

  it('scrollPaddingL() with number value', () => {
    const rule = scrollPaddingL(4)
    expect(rule.declarations['scroll-padding-left']).toBeDefined()
  })

  it('snapAlign() sets scroll-snap-align', () => {
    const rule = snapAlign('center')
    expect(rule.declarations['scroll-snap-align']).toBe('center')
  })

  it('snapStop() sets scroll-snap-stop', () => {
    const rule = snapStop('always')
    expect(rule.declarations['scroll-snap-stop']).toBe('always')
  })

  it('snapType() sets scroll-snap-type', () => {
    const rule = snapType('x mandatory')
    expect(rule.declarations['scroll-snap-type']).toBe('x mandatory')
  })

  it('touchAction() sets touch-action', () => {
    const rule = touchAction('pan-x')
    expect(rule.declarations['touch-action']).toBe('pan-x')
  })

  it('willChange() sets will-change', () => {
    const rule = willChange('transform')
    expect(rule.declarations['will-change']).toBe('transform')
  })
})
