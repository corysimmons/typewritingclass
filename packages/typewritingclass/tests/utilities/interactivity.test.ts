import { describe, it, expect } from 'vitest'
import { cursor, select, pointerEvents, accentColor, appearance, caretColor, resize, scrollBehavior, scrollMargin, scrollMarginX, scrollPadding, snapAlign, snapType, touchAction, willChange } from '../../src/utilities/interactivity.ts'

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
})
