import { describe, it, expect } from 'vitest'
import { hover, focus, active, disabled, focusVisible, focusWithin, firstChild, lastChild, visited, checked, indeterminate, default_, required_, valid, invalid, inRange, outOfRange, placeholderShown, autofill, readOnly, empty, even, odd, firstOfType, lastOfType, onlyChild, onlyOfType, target, open_ } from '../../src/modifiers/pseudo.ts'
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

  it('visited adds :visited selector', () => {
    expect(visited(rule).selectors).toEqual([':visited'])
  })

  it('checked adds :checked selector', () => {
    expect(checked(rule).selectors).toEqual([':checked'])
  })

  it('indeterminate adds :indeterminate selector', () => {
    expect(indeterminate(rule).selectors).toEqual([':indeterminate'])
  })

  it('default_ adds :default selector', () => {
    expect(default_(rule).selectors).toEqual([':default'])
  })

  it('required_ adds :required selector', () => {
    expect(required_(rule).selectors).toEqual([':required'])
  })

  it('valid adds :valid selector', () => {
    expect(valid(rule).selectors).toEqual([':valid'])
  })

  it('invalid adds :invalid selector', () => {
    expect(invalid(rule).selectors).toEqual([':invalid'])
  })

  it('inRange adds :in-range selector', () => {
    expect(inRange(rule).selectors).toEqual([':in-range'])
  })

  it('outOfRange adds :out-of-range selector', () => {
    expect(outOfRange(rule).selectors).toEqual([':out-of-range'])
  })

  it('placeholderShown adds :placeholder-shown selector', () => {
    expect(placeholderShown(rule).selectors).toEqual([':placeholder-shown'])
  })

  it('autofill adds :autofill selector', () => {
    expect(autofill(rule).selectors).toEqual([':autofill'])
  })

  it('readOnly adds :read-only selector', () => {
    expect(readOnly(rule).selectors).toEqual([':read-only'])
  })

  it('empty adds :empty selector', () => {
    expect(empty(rule).selectors).toEqual([':empty'])
  })

  it('even adds :nth-child(even) selector', () => {
    expect(even(rule).selectors).toEqual([':nth-child(even)'])
  })

  it('odd adds :nth-child(odd) selector', () => {
    expect(odd(rule).selectors).toEqual([':nth-child(odd)'])
  })

  it('firstOfType adds :first-of-type selector', () => {
    expect(firstOfType(rule).selectors).toEqual([':first-of-type'])
  })

  it('lastOfType adds :last-of-type selector', () => {
    expect(lastOfType(rule).selectors).toEqual([':last-of-type'])
  })

  it('onlyChild adds :only-child selector', () => {
    expect(onlyChild(rule).selectors).toEqual([':only-child'])
  })

  it('onlyOfType adds :only-of-type selector', () => {
    expect(onlyOfType(rule).selectors).toEqual([':only-of-type'])
  })

  it('target adds :target selector', () => {
    expect(target(rule).selectors).toEqual([':target'])
  })

  it('open_ adds [open] selector', () => {
    expect(open_(rule).selectors).toEqual(['[open]'])
  })
})
