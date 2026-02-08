import { describe, it, expect } from 'vitest'
import { hover, focus, active, disabled, focusVisible, focusWithin, firstChild, lastChild } from '../../src/modifiers/pseudo.ts'
import { createRule } from '../../src/rule.ts'

describe('pseudo-class modifiers', () => {
  const rule = createRule({ color: 'red' })

  it('hover adds :hover selector', () => {
    const result = hover(rule)
    expect(result.selectors).toEqual([':hover'])
    expect(result.declarations).toEqual({ color: 'red' })
  })

  it('focus adds :focus selector', () => {
    expect(focus(rule).selectors).toEqual([':focus'])
  })

  it('active adds :active selector', () => {
    expect(active(rule).selectors).toEqual([':active'])
  })

  it('disabled adds :disabled selector', () => {
    expect(disabled(rule).selectors).toEqual([':disabled'])
  })

  it('focusVisible adds :focus-visible selector', () => {
    expect(focusVisible(rule).selectors).toEqual([':focus-visible'])
  })

  it('focusWithin adds :focus-within selector', () => {
    expect(focusWithin(rule).selectors).toEqual([':focus-within'])
  })

  it('firstChild adds :first-child selector', () => {
    expect(firstChild(rule).selectors).toEqual([':first-child'])
  })

  it('lastChild adds :last-child selector', () => {
    expect(lastChild(rule).selectors).toEqual([':last-child'])
  })

  it('preserves existing selectors', () => {
    const withHover = hover(rule)
    const withHoverAndFocus = focus(withHover)
    expect(withHoverAndFocus.selectors).toEqual([':hover', ':focus'])
  })
})
